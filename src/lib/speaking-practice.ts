// LexiLearn - 발음 연습 및 AI 평가 시스템

// Web Speech API 타입 정의
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
      if (!this.recognition) {
        if (!this.initializeSpeechRecognition()) {
          reject(new Error('Speech recognition not supported'));
          return;
        }
      }

      if (this.isListening) {
        reject(new Error('Already listening'));
        return;
      }

      this.isListening = true;

      this.recognition!.onresult = (event) => {
        const result = event.results[0];
        if (result.isFinal) {
          const transcript = result[0].transcript.trim();
          this.isListening = false;
          resolve(transcript);
        }
      };

      this.recognition!.onerror = (event) => {
        this.isListening = false;
        console.error('Speech recognition error:', event.error);
        
        // 특정 에러들은 재시도 가능
        if (event.error === 'no-speech' || event.error === 'audio-capture') {
          reject(new Error(`음성 인식 에러: ${event.error}. 다시 시도해주세요.`));
        } else {
          reject(new Error(`음성 인식 에러: ${event.error}`));
        }
      };

      this.recognition!.onend = () => {
        this.isListening = false;
      };

      try {
        this.recognition!.start();
      } catch (_error) {
        this.isListening = false;
        reject(new Error('음성 인식 시작 실패'));
      }
    });
  }

  stopSpeechRecognition(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // 실제 음성 인식 기반 발음 평가
  evaluatePronunciationWithSpeechRecognition(recognizedText: string, targetText: string): SpeakingResult {
    const similarity = this.calculateTextSimilarity(recognizedText.toLowerCase(), targetText.toLowerCase());
    
    // 유사도 기반 점수 계산
    let accuracy = similarity * 100;
    let fluency = Math.min(100, accuracy + (Math.random() - 0.5) * 10);
    let pronunciation = Math.min(100, accuracy + (Math.random() - 0.5) * 8);
    
    // 최소 점수 보장 (너무 낮은 점수 방지)
    accuracy = Math.max(accuracy, 30);
    fluency = Math.max(fluency, 30);
    pronunciation = Math.max(pronunciation, 30);
    
    const overallScore = (accuracy + fluency + pronunciation) / 3;
    
    const result: SpeakingResult = {
      accuracy: Math.round(accuracy),
      fluency: Math.round(fluency),
      pronunciation: Math.round(pronunciation),
      overallScore: Math.round(overallScore),
      feedback: this.generateFeedbackWithRecognition(overallScore, recognizedText, targetText),
      timestamp: new Date()
    };

    if (this.currentSession) {
      this.currentSession.results.push(result);
    }
    
    this.practiceHistory.push(result);
    return result;
  }

  private calculateTextSimilarity(text1: string, text2: string): number {
    // 간단한 문자열 유사도 계산 (Levenshtein distance 기반)
    const longer = text1.length > text2.length ? text1 : text2;
    const shorter = text1.length > text2.length ? text2 : text1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
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

  private generateFeedbackWithRecognition(score: number, recognized: string, target: string): string {
    const similarity = this.calculateTextSimilarity(recognized.toLowerCase(), target.toLowerCase());
    
    if (similarity > 0.9) {
      return "Perfect! Your pronunciation is excellent and very clear.";
    } else if (similarity > 0.8) {
      return "Great job! Your pronunciation is very good with minor differences.";
    } else if (similarity > 0.7) {
      return "Good effort! Try to focus on the pronunciation of each word.";
    } else if (similarity > 0.5) {
      return "Keep practicing! Listen carefully and try to match the pronunciation.";
    } else {
      return "Don't give up! Try listening to the audio again and practice more.";
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