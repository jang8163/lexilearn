// LexiLearn - 발음 연습 및 AI 평가 시스템

// Web Speech API 타입 정의
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechGrammarList {
  length: number;
  item(index: number): SpeechGrammar;
  addFromURI(src: string, weight?: number): void;
  addFromString(string: string, weight?: number): void;
}

interface SpeechGrammar {
  src: string;
  weight: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  serviceURI: string;
  grammars: SpeechGrammarList;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

export interface SpeakingResult {
    accuracy: number;
    fluency: number;
    pronunciation: number;
    overallScore: number;
    feedback: string;
    timestamp: Date;
  }
  
  export interface PracticeSession {
    id: string;
    expressions: string[];
    currentIndex: number;
    results: SpeakingResult[];
    startTime: Date;
    endTime?: Date;
  }
  
  export class SpeakingPracticeManager {
    private currentSession: PracticeSession | null = null;
    private practiceHistory: SpeakingResult[] = [];
    private readonly STORAGE_KEY = 'lexilearn-speaking-history';

    constructor() {
      this.loadFromStorage();
    }
  
    startPracticeSession(expressions: string[]): PracticeSession {
      this.currentSession = {
        id: this.generateSessionId(),
        expressions,
        currentIndex: 0,
        results: [],
        startTime: new Date()
      };
      return this.currentSession;
    }
  
    private generateSessionId(): string {
      return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  
    getCurrentExpression(): string | null {
      if (!this.currentSession) return null;
      return this.currentSession.expressions[this.currentSession.currentIndex] || null;
    }
  
    // AI 발음 평가 시뮬레이션 (실제로는 음성 인식 API 사용)
    evaluatePronunciation(_audioBlob: Blob, targetText: string): SpeakingResult {
      // 실제 구현에서는 음성 인식 및 발음 평가 API 호출
      // 더 관대한 점수 분포로 조정 (정확히 했는데 실패하는 문제 해결)
      const baseScore = Math.random() * 40 + 50; // 50-90% 기본 점수 (더 높게)
      const difficultyBonus = this.calculateDifficultyBonus(targetText);
      const randomVariation = (Math.random() - 0.5) * 15; // ±7.5% 변동 (줄임)
      
      const mockAccuracy = Math.max(0, Math.min(100, baseScore + difficultyBonus + randomVariation));
      const mockFluency = Math.max(0, Math.min(100, mockAccuracy + (Math.random() - 0.5) * 10));
      const mockPronunciation = Math.max(0, Math.min(100, mockAccuracy + (Math.random() - 0.5) * 8));
      
      const overallScore = (mockAccuracy + mockFluency + mockPronunciation) / 3;
      
      const result: SpeakingResult = {
        accuracy: Math.round(mockAccuracy),
        fluency: Math.round(mockFluency),
        pronunciation: Math.round(mockPronunciation),
        overallScore: Math.round(overallScore),
        feedback: this.generateFeedback(overallScore),
        timestamp: new Date()
      };
  
      if (this.currentSession) {
        this.currentSession.results.push(result);
      }
      
      this.practiceHistory.push(result);
      this.saveToStorage();
      return result;
    }
  
    private calculateDifficultyBonus(text: string): number {
      // 텍스트 길이와 복잡도에 따른 난이도 보너스 (더 관대하게 조정)
      const length = text.length;
      const wordCount = text.split(' ').length;
      const hasSpecialChars = /[^a-zA-Z\s]/.test(text);
      
      let bonus = 5; // 기본 보너스 추가
      if (length > 50) bonus -= 3; // 긴 문장은 어려움 (완화)
      if (wordCount > 8) bonus -= 2; // 많은 단어는 어려움 (완화)
      if (hasSpecialChars) bonus -= 1; // 특수문자는 어려움 (완화)
      if (length < 10) bonus += 8; // 짧은 문장은 쉬움 (증가)
      if (length < 20) bonus += 3; // 중간 길이도 보너스
      
      return bonus;
    }

    private generateFeedback(score: number): string {
      if (score >= 90) {
        return "Excellent pronunciation! You're speaking very clearly and naturally.";
      } else if (score >= 80) {
        return "Good job! Your pronunciation is clear with minor improvements needed.";
      } else if (score >= 70) {
        return "Not bad! Keep practicing to improve your pronunciation and fluency.";
      } else if (score >= 60) {
        return "Keep practicing! Focus on clear pronunciation and natural rhythm.";
      } else {
        return "Don't give up! Practice more to improve your speaking skills.";
      }
    }
  
    nextExpression(): boolean {
      if (!this.currentSession) return false;
      
      this.currentSession.currentIndex++;
      return this.currentSession.currentIndex < this.currentSession.expressions.length;
    }
  
    finishSession(): SpeakingResult[] | null {
      if (!this.currentSession) return null;
      
      this.currentSession.endTime = new Date();
      const results = [...this.currentSession.results];
      this.currentSession = null;
      return results;
    }
  
    getSessionResults(): SpeakingResult[] {
      return this.currentSession ? [...this.currentSession.results] : [];
    }
  
    getPracticeHistory(): SpeakingResult[] {
      return [...this.practiceHistory];
    }
  
    getAverageScore(): number {
      if (this.practiceHistory.length === 0) return 0;
      
      const totalScore = this.practiceHistory.reduce((sum, result) => sum + result.overallScore, 0);
      return Math.round(totalScore / this.practiceHistory.length);
    }
  
    resetHistory(): void {
      this.practiceHistory = [];
      this.saveToStorage();
    }

    /**
     * 로컬 스토리지에서 데이터를 불러옵니다.
     */
    private loadFromStorage(): void {
      if (typeof window === 'undefined') return;
      
      try {
        const savedData = localStorage.getItem(this.STORAGE_KEY);
        if (savedData) {
          const data = JSON.parse(savedData);
          this.practiceHistory = data.map((result: SpeakingResult & { timestamp: string }) => ({
            ...result,
            timestamp: new Date(result.timestamp)
          }));
        }
      } catch (error) {
        console.error('Failed to load speaking history from storage:', error);
      }
    }

    /**
     * 로컬 스토리지에 데이터를 저장합니다.
     */
    private saveToStorage(): void {
      if (typeof window === 'undefined') return;
      
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.practiceHistory));
      } catch (error) {
        console.error('Failed to save speaking history to storage:', error);
      }
    }
  
  // Web Speech API를 사용한 음성 인식
  private recognition: SpeechRecognition | null = null;
  private isListening = false;

  initializeSpeechRecognition(): boolean {
    if (typeof window === 'undefined') return false;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported');
      return false;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 1;

    return true;
  }

  async startSpeechRecognition(): Promise<string> {
    return new Promise((resolve, reject) => {
      // 매번 새로운 음성 인식 객체 생성
      if (!this.initializeSpeechRecognition()) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      if (this.isListening) {
        // 이미 실행 중이면 기존 인식을 중지
        this.recognition!.stop();
        this.isListening = false;
      }

      // 잠시 대기 후 새로운 인식 시작
      setTimeout(() => {
        this.startNewRecognition(resolve, reject);
      }, 100);
    });
  }

  private startNewRecognition(resolve: (value: string) => void, reject: (reason?: Error) => void): void {
    this.isListening = true;

    // 음성 인식 설정 최적화
    this.recognition!.continuous = false;
    this.recognition!.interimResults = true; // 중간 결과도 받기
    this.recognition!.lang = 'en-US';
    this.recognition!.maxAlternatives = 3; // 여러 대안 결과 받기

    let finalResult = '';

    this.recognition!.onresult = (event) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }
      
      if (finalTranscript) {
        finalResult = finalTranscript.trim();
        this.isListening = false;
        resolve(finalResult);
      }
    };

    this.recognition!.onerror = (event) => {
      this.isListening = false;
      
      // aborted 오류는 사용자가 의도적으로 중단한 경우이므로 에러로 처리하지 않음
      if (event.error === 'aborted') {
        console.log('Speech recognition was aborted');
        return;
      }
      
      console.error('Speech recognition error:', event.error);
      
      // 특정 에러들은 재시도 가능
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        reject(new Error(`음성 인식 에러: ${event.error}. 다시 시도해주세요.`));
      } else if (event.error === 'network') {
        reject(new Error('네트워크 연결을 확인해주세요.'));
      } else if (event.error === 'not-allowed') {
        reject(new Error('마이크 권한이 허용되지 않았습니다.'));
      } else {
        reject(new Error(`음성 인식 에러: ${event.error}`));
      }
    };

    this.recognition!.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition!.start();
    } catch (error) {
      this.isListening = false;
      console.error('Recognition start error:', error);
      reject(new Error('음성 인식 시작 실패'));
    }
  }

  stopSpeechRecognition(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // 실제 음성 인식 기반 발음 평가 (개선된 버전)
  evaluatePronunciationWithSpeechRecognition(recognizedText: string, targetText: string): SpeakingResult {
    const similarity = this.calculateTextSimilarity(recognizedText.toLowerCase(), targetText.toLowerCase());
    
    // 유사도 기반 점수 계산 (더 관대한 기준)
    let accuracy = similarity * 100;
    
    // 유사도에 따른 보너스 점수 추가 (100점 초과 방지)
    if (similarity >= 0.8) {
      accuracy = Math.min(100, accuracy + 15); // 높은 유사도에 보너스
    } else if (similarity >= 0.6) {
      accuracy = Math.min(100, accuracy + 10); // 중간 유사도에 보너스
    } else if (similarity >= 0.4) {
      accuracy = Math.min(100, accuracy + 5); // 낮은 유사도에도 보너스
    }
    
    // 유창성과 발음 점수 계산 (더 관대하게)
    let fluency = Math.min(100, accuracy + (Math.random() - 0.3) * 15); // 범위 확대
    let pronunciation = Math.min(100, accuracy + (Math.random() - 0.3) * 12); // 범위 확대
    
    // 최소 점수 보장 (더 관대하게)
    accuracy = Math.max(accuracy, 50); // 30 → 50으로 상향
    fluency = Math.max(fluency, 45); // 30 → 45로 상향
    pronunciation = Math.max(pronunciation, 45); // 30 → 45로 상향
    
    // 최대 점수 100점 보장
    accuracy = Math.min(100, accuracy);
    fluency = Math.min(100, fluency);
    pronunciation = Math.min(100, pronunciation);
    
    // 전체 점수 계산 (가중치 적용)
    const overallScore = Math.min(100, (accuracy * 0.5 + fluency * 0.25 + pronunciation * 0.25));
    
    const result: SpeakingResult = {
      accuracy: Math.round(accuracy),
      fluency: Math.round(fluency),
      pronunciation: Math.round(pronunciation),
      overallScore: Math.round(overallScore),
      feedback: this.generateFeedbackWithRecognition(overallScore),
      timestamp: new Date()
    };

    if (this.currentSession) {
      this.currentSession.results.push(result);
    }
    
    this.practiceHistory.push(result);
    return result;
  }

  private calculateTextSimilarity(text1: string, text2: string): number {
    // 개선된 문자열 유사도 계산
    const normalized1 = this.normalizeText(text1);
    const normalized2 = this.normalizeText(text2);
    
    // 완전 일치 확인
    if (normalized1 === normalized2) return 1.0;
    
    // 부분 일치 확인 (단어 단위)
    const words1 = normalized1.split(/\s+/);
    const words2 = normalized2.split(/\s+/);
    
    let matchCount = 0;
    const maxWords = Math.max(words1.length, words2.length);
    
    // 각 단어에 대해 가장 유사한 단어 찾기
    for (const word1 of words1) {
      let bestMatch = 0;
      for (const word2 of words2) {
        const similarity = this.calculateWordSimilarity(word1, word2);
        bestMatch = Math.max(bestMatch, similarity);
      }
      matchCount += bestMatch;
    }
    
    // 전체 유사도 계산
    const wordSimilarity = matchCount / maxWords;
    
    // Levenshtein distance 기반 유사도도 계산
    const longer = normalized1.length > normalized2.length ? normalized1 : normalized2;
    const shorter = normalized1.length > normalized2.length ? normalized2 : normalized1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    const charSimilarity = (longer.length - distance) / longer.length;
    
    // 단어 유사도와 문자 유사도를 결합 (단어 유사도에 더 가중치)
    return (wordSimilarity * 0.7 + charSimilarity * 0.3);
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // 특수문자 제거
      .replace(/\s+/g, ' ') // 여러 공백을 하나로
      .trim();
  }

  private calculateWordSimilarity(word1: string, word2: string): number {
    // 단어 유사도 계산 (발음 유사성 고려)
    if (word1 === word2) return 1.0;
    
    // 길이 차이가 너무 크면 낮은 점수
    const lengthDiff = Math.abs(word1.length - word2.length);
    if (lengthDiff > Math.max(word1.length, word2.length) * 0.5) {
      return 0.1;
    }
    
    // Levenshtein distance 기반 유사도
    const distance = this.levenshteinDistance(word1, word2);
    const maxLength = Math.max(word1.length, word2.length);
    
    let similarity = (maxLength - distance) / maxLength;
    
    // 발음 유사성 보정 (일반적인 발음 오류 패턴)
    similarity = this.applyPronunciationCorrections(word1, word2, similarity);
    
    return Math.max(0, similarity);
  }

  private applyPronunciationCorrections(word1: string, word2: string, baseSimilarity: number): number {
    // 일반적인 발음 오류 패턴에 대한 보정
    const corrections = [
      // 모음 교체
      { pattern: /[aeiou]/g, replacement: '[aeiou]' },
      // 유사한 자음
      { pattern: /[bp]/g, replacement: '[bp]' },
      { pattern: /[td]/g, replacement: '[td]' },
      { pattern: /[kg]/g, replacement: '[kg]' },
      { pattern: /[fv]/g, replacement: '[fv]' },
      { pattern: /[sz]/g, replacement: '[sz]' },
      { pattern: /[lr]/g, replacement: '[lr]' },
      { pattern: /[mn]/g, replacement: '[mn]' }
    ];
    
    let correctedSimilarity = baseSimilarity;
    
    // 각 보정 패턴 적용
    for (const correction of corrections) {
      const regex1 = new RegExp(correction.pattern.source, 'g');
      const regex2 = new RegExp(correction.pattern.source, 'g');
      
      const normalized1 = word1.replace(regex1, correction.replacement);
      const normalized2 = word2.replace(regex2, correction.replacement);
      
      if (normalized1 === normalized2) {
        correctedSimilarity = Math.max(correctedSimilarity, baseSimilarity + 0.2);
      }
    }
    
    return Math.min(1.0, correctedSimilarity);
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  private generateFeedbackWithRecognition(score: number): string {
    
    if (score >= 90) {
      return "🎉 완벽해요! 발음이 정말 훌륭합니다!";
    } else if (score >= 80) {
      return "👏 잘했어요! 발음이 매우 좋습니다!";
    } else if (score >= 70) {
      return "👍 좋아요! 조금만 더 연습하면 완벽할 거예요!";
    } else if (score >= 60) {
      return "💪 괜찮아요! 조금 더 천천히 발음해보세요!";
    } else if (score >= 50) {
      return "🌟 계속 연습해보세요! 오디오를 다시 들어보고 따라해보세요!";
    } else {
      return "💫 포기하지 마세요! 천천히 다시 시도해보세요!";
    }
  }

  // 기존 녹음 시스템 (백업용)
  async startRecording(): Promise<MediaRecorder> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    return mediaRecorder;
  }

  stopRecording(mediaRecorder: MediaRecorder): Promise<Blob> {
    return new Promise((resolve) => {
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        resolve(blob);
      };
      
      mediaRecorder.stop();
    });
  }
  }
  
  export const speakingManager = new SpeakingPracticeManager();