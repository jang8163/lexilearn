// LexiLearn - 오답 추적 시스템

export interface WrongAnswerItem {
  id: string;
  type: 'expression' | 'vocabulary';
  content: string;
  korean: string;
  level: string;
  category?: string;
  stage: number;
  wrongCount: number;
  lastWrongAttempt: Date;
  mistakes: string[];
  difficulty: number;
  attempts: number;
  lastAttempt: Date;
}

export interface WrongAnswerStats {
  totalWrongAnswers: number;
  expressionWrongAnswers: number;
  vocabularyWrongAnswers: number;
  mostDifficultItems: WrongAnswerItem[];
}

export class WrongAnswerTracker {
  private wrongAnswers: Map<string, WrongAnswerItem> = new Map();
  private readonly STORAGE_KEY = 'lexilearn-wrong-answers';
  private readonly WRONG_THRESHOLD = 3; // 3번 틀려야 오답노트에 추가

  constructor() {
    this.loadFromStorage();
  }

  /**
   * 틀린 답안을 기록합니다.
   * @param itemId 아이템 ID
   * @param type 표현 또는 단어
   * @param content 영어 내용
   * @param korean 한국어 내용
   * @param level 레벨
   * @param category 카테고리 (표현일 때만)
   * @param stage 단계
   * @param mistake 틀린 부분 설명
   * @param score 점수 (0-100)
   */
  recordWrongAnswer(
    itemId: string,
    type: 'expression' | 'vocabulary',
    content: string,
    korean: string,
    level: string,
    category: string | undefined,
    stage: number,
    mistake: string,
    score: number,
    sessionWrongCount?: number
  ): boolean {
    const key = `${type}_${itemId}`;
    const existing = this.wrongAnswers.get(key);
    
    console.log('오답 추적기 - 기록 시도:', {
      key,
      existing: !!existing,
      existingWrongCount: existing?.wrongCount || 0,
      sessionWrongCount: sessionWrongCount || 0
    });
    
    if (existing) {
      // 기존 항목 업데이트
      existing.wrongCount++;
      existing.lastWrongAttempt = new Date();
      existing.attempts++;
      existing.lastAttempt = new Date();
      existing.difficulty = Math.max(existing.difficulty, 100 - score);
      
      // 새로운 실수 추가 (중복 방지)
      if (!existing.mistakes.includes(mistake)) {
        existing.mistakes.push(mistake);
      }
      
      // 3번째 틀림이면 오답노트에 추가 (정확히 3번째일 때만)
      if (existing.wrongCount === this.WRONG_THRESHOLD) {
        console.log('3번째 틀림 - 오답노트에 추가:', content, '틀린 횟수:', existing.wrongCount);
        this.saveToStorage();
        return true; // 오답노트에 새로 추가됨
      }
    } else {
      // 새로운 항목 생성
      const newItem: WrongAnswerItem = {
        id: key,
        type,
        content,
        korean,
        level,
        category,
        stage,
        wrongCount: 1,
        lastWrongAttempt: new Date(),
        mistakes: [mistake],
        difficulty: 100 - score,
        attempts: 1,
        lastAttempt: new Date()
      };
      
      this.wrongAnswers.set(key, newItem);
      console.log('새로운 오답 항목 생성:', content, '틀린 횟수: 1');
      
      // 세션 내에서 3번째 틀림이면 오답노트에 추가 (정확히 3번째일 때만)
      if (sessionWrongCount && sessionWrongCount === this.WRONG_THRESHOLD) {
        console.log('세션 내 3번째 틀림 - 오답노트에 추가:', content, '세션 틀린 횟수:', sessionWrongCount);
        this.saveToStorage();
        return true;
      }
    }
    
    this.saveToStorage();
    return false; // 아직 오답노트에 추가되지 않음
  }

  /**
   * 정답을 맞혔을 때 해당 항목을 제거합니다.
   */
  recordCorrectAnswer(itemId: string, type: 'expression' | 'vocabulary'): void {
    const key = `${type}_${itemId}`;
    this.wrongAnswers.delete(key);
    this.saveToStorage();
  }

  /**
   * 오답노트에 추가된 항목들을 반환합니다 (3번 이상 틀린 것들).
   */
  getWrongAnswerNotes(): WrongAnswerItem[] {
    const allItems = Array.from(this.wrongAnswers.values());
    console.log('오답 추적기 - 모든 항목:', allItems);
    console.log('오답 추적기 - 항목 개수:', allItems.length);
    
    const filteredItems = allItems.filter(item => item.wrongCount >= this.WRONG_THRESHOLD);
    console.log('오답 추적기 - 3번 이상 틀린 항목:', filteredItems);
    console.log('오답 추적기 - 3번 이상 틀린 항목 개수:', filteredItems.length);
    
    return filteredItems.sort((a, b) => b.lastWrongAttempt.getTime() - a.lastWrongAttempt.getTime());
  }

  /**
   * 특정 타입의 오답노트를 반환합니다.
   */
  getWrongAnswerNotesByType(type: 'expression' | 'vocabulary'): WrongAnswerItem[] {
    return this.getWrongAnswerNotes().filter(item => item.type === type);
  }

  /**
   * 특정 항목의 틀린 횟수를 반환합니다.
   */
  getWrongCount(itemId: string, type: 'expression' | 'vocabulary'): number {
    const key = `${type}_${itemId}`;
    const item = this.wrongAnswers.get(key);
    return item ? item.wrongCount : 0;
  }

  /**
   * 오답 통계를 반환합니다.
   */
  getStats(): WrongAnswerStats {
    const wrongAnswerNotes = this.getWrongAnswerNotes();
    
    return {
      totalWrongAnswers: wrongAnswerNotes.length,
      expressionWrongAnswers: wrongAnswerNotes.filter(item => item.type === 'expression').length,
      vocabularyWrongAnswers: wrongAnswerNotes.filter(item => item.type === 'vocabulary').length,
      mostDifficultItems: wrongAnswerNotes
        .sort((a, b) => b.difficulty - a.difficulty)
        .slice(0, 10)
    };
  }

  /**
   * 오답노트에서 항목을 제거합니다.
   */
  removeFromNotes(itemId: string, type: 'expression' | 'vocabulary'): void {
    const key = `${type}_${itemId}`;
    this.wrongAnswers.delete(key);
    this.saveToStorage();
  }

  /**
   * 오답노트 항목의 시도 횟수를 업데이트합니다.
   */
  updateAttempts(itemId: string, type: 'expression' | 'vocabulary'): void {
    const key = `${type}_${itemId}`;
    const item = this.wrongAnswers.get(key);
    if (item) {
      item.attempts++;
      item.lastAttempt = new Date();
      this.saveToStorage();
    }
  }

  /**
   * 모든 오답 데이터를 초기화합니다.
   */
  clearAll(): void {
    this.wrongAnswers.clear();
    this.saveToStorage();
  }

  /**
   * 로컬 스토리지에서 데이터를 불러옵니다.
   */
  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      console.log('오답 추적기 - 로드 시도:', savedData);
      if (savedData) {
        const data = JSON.parse(savedData);
        this.wrongAnswers = new Map(data);
        
        // Date 객체 복원
        this.wrongAnswers.forEach(item => {
          item.lastWrongAttempt = new Date(item.lastWrongAttempt);
          item.lastAttempt = new Date(item.lastAttempt);
        });
        console.log('오답 추적기 - 로드 완료:', this.wrongAnswers.size, '개 항목');
      } else {
        console.log('오답 추적기 - 저장된 데이터 없음');
      }
    } catch (error) {
      console.error('Failed to load wrong answers from storage:', error);
    }
  }

  /**
   * 로컬 스토리지에 데이터를 저장합니다.
   */
  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const data = Array.from(this.wrongAnswers.entries());
      console.log('오답 추적기 - 저장 중:', data);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      console.log('오답 추적기 - 저장 완료');
    } catch (error) {
      console.error('Failed to save wrong answers to storage:', error);
    }
  }
}

export const wrongAnswerTracker = new WrongAnswerTracker();
