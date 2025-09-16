// LexiLearn - 단어 학습 시스템

import { Vocabulary, VOCABULARY_DATA, getVocabularyByLevel, getVocabularyByStage } from './vocabulary-data-1350-new';

export interface VocabularyProgress {
  level: string;
  stage: number;
  totalWords: number;
  learnedWords: number;
  masteredWords: number;
  accuracy: number;
  lastStudied: Date;
}

export interface StudySession {
  id: string;
  vocabulary: Vocabulary[];
  currentIndex: number;
  correctAnswers: number;
  totalAnswers: number;
  startTime: Date;
  endTime?: Date;
  studyMode: 'learning' | 'review' | 'test';
}

export interface StudyResult {
  vocabularyId: string;
  isCorrect: boolean;
  responseTime: number;
  attempts: number;
  timestamp: Date;
}

export class VocabularySystem {
  private progress: Map<string, VocabularyProgress> = new Map();
  private currentSession: StudySession | null = null;
  private studyHistory: StudyResult[] = [];
  private learnedWords: Set<string> = new Set();
  private masteredWords: Set<string> = new Set();

  constructor() {
    this.initializeProgress();
  }

  private initializeProgress(): void {
    const levels = ['beginner', 'intermediate', 'advanced'];
    
    levels.forEach(level => {
      for (let stage = 1; stage <= 30; stage++) {
        const key = `${level}_${stage}`;
        const words = getVocabularyByStage(level, stage);
        
        this.progress.set(key, {
          level,
          stage,
          totalWords: words.length,
          learnedWords: 0,
          masteredWords: 0,
          accuracy: 0,
          lastStudied: new Date()
        });
      }
    });
  }

  getProgress(level: string, stage: number): VocabularyProgress | null {
    const key = `${level}_${stage}`;
    return this.progress.get(key) || null;
  }

  getAllProgress(): VocabularyProgress[] {
    return Array.from(this.progress.values());
  }

  startStudySession(level: string, stage: number, mode: 'learning' | 'review' | 'test' = 'learning'): StudySession {
    const vocabulary = getVocabularyByStage(level, stage);
    
    this.currentSession = {
      id: this.generateSessionId(),
      vocabulary,
      currentIndex: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      startTime: new Date(),
      studyMode: mode
    };

    return this.currentSession;
  }

  private generateSessionId(): string {
    return `vocab_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getCurrentWord(): Vocabulary | null {
    if (!this.currentSession) return null;
    return this.currentSession.vocabulary[this.currentSession.currentIndex] || null;
  }

  submitAnswer(isCorrect: boolean, responseTime: number = 0): boolean {
    if (!this.currentSession) return false;

    const currentWord = this.getCurrentWord();
    if (!currentWord) return false;

    this.currentSession.totalAnswers++;
    if (isCorrect) {
      this.currentSession.correctAnswers++;
      this.learnedWords.add(currentWord.id);
    }

    // 학습 결과 기록
    const result: StudyResult = {
      vocabularyId: currentWord.id,
      isCorrect,
      responseTime,
      attempts: 1, // 간단화
      timestamp: new Date()
    };

    this.studyHistory.push(result);

    // 다음 단어로 이동
    this.currentSession.currentIndex++;
    
    return this.currentSession.currentIndex < this.currentSession.vocabulary.length;
  }

  finishSession(): VocabularyProgress | null {
    if (!this.currentSession) return null;

    const accuracy = this.currentSession.totalAnswers > 0 
      ? (this.currentSession.correctAnswers / this.currentSession.totalAnswers) * 100 
      : 0;

    // 진행 상황 업데이트
    const key = `${this.currentSession.vocabulary[0]?.level}_${this.currentSession.vocabulary[0]?.stage}`;
    const progress = this.progress.get(key);
    
    if (progress) {
      progress.learnedWords = this.learnedWords.size;
      progress.accuracy = accuracy;
      progress.lastStudied = new Date();
      
      // 정확도가 90% 이상이면 마스터로 간주
      if (accuracy >= 90) {
        this.currentSession.vocabulary.forEach(word => {
          this.masteredWords.add(word.id);
        });
        progress.masteredWords = this.masteredWords.size;
      }
    }

    this.currentSession.endTime = new Date();
    const result = progress || null;
    this.currentSession = null;
    return result;
  }

  getStudyHistory(): StudyResult[] {
    return [...this.studyHistory];
  }

  getLearnedWords(): string[] {
    return Array.from(this.learnedWords);
  }

  getMasteredWords(): string[] {
    return Array.from(this.masteredWords);
  }

  getOverallStats(): {
    totalWords: number;
    learnedWords: number;
    masteredWords: number;
    overallAccuracy: number;
  } {
    const totalWords = VOCABULARY_DATA.length;
    const learnedWords = this.learnedWords.size;
    const masteredWords = this.masteredWords.size;
    
    const correctAnswers = this.studyHistory.filter(result => result.isCorrect).length;
    const totalAnswers = this.studyHistory.length;
    const overallAccuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

    return {
      totalWords,
      learnedWords,
      masteredWords,
      overallAccuracy: Math.round(overallAccuracy)
    };
  }

  // 복습 시스템
  getWordsForReview(): Vocabulary[] {
    const reviewWords: Vocabulary[] = [];
    
    // 학습했지만 마스터하지 않은 단어들
    this.learnedWords.forEach(wordId => {
      if (!this.masteredWords.has(wordId)) {
        const word = VOCABULARY_DATA.find(v => v.id === wordId);
        if (word) reviewWords.push(word);
      }
    });

    return reviewWords;
  }

  // 테스트 모드
  generateTest(level: string, count: number = 20): Vocabulary[] {
    const levelWords = getVocabularyByLevel(level);
    const shuffled = [...levelWords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  resetProgress(): void {
    this.progress.clear();
    this.studyHistory = [];
    this.learnedWords.clear();
    this.masteredWords.clear();
    this.initializeProgress();
  }

  // 단어 검색
  searchWords(query: string): Vocabulary[] {
    const lowerQuery = query.toLowerCase();
    return VOCABULARY_DATA.filter(vocab => 
      vocab.english.toLowerCase().includes(lowerQuery) ||
      vocab.korean.includes(query)
    );
  }

  // 즐겨찾기 단어 관리
  private favoriteWords: Set<string> = new Set();

  addToFavorites(wordId: string): void {
    this.favoriteWords.add(wordId);
  }

  removeFromFavorites(wordId: string): void {
    this.favoriteWords.delete(wordId);
  }

  getFavoriteWords(): Vocabulary[] {
    return VOCABULARY_DATA.filter(vocab => this.favoriteWords.has(vocab.id));
  }
}

export const vocabularySystem = new VocabularySystem();