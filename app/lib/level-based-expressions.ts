// LexiLearn - 레벨별 표현 관리 시스템

import { Expression, EXPRESSIONS_DATA, EXPRESSION_LEVELS, EXPRESSION_CATEGORIES } from './expressions-5400-complete';

export interface LevelProgress {
  level: string;
  category: string;
  currentStage: number;
  totalStages: number;
  completedExpressions: number;
  totalExpressions: number;
  accuracy: number;
}

export interface ExpressionSession {
  expressions: Expression[];
  currentIndex: number;
  correctAnswers: number;
  totalAnswers: number;
  startTime: Date;
}

export class LevelBasedExpressionManager {
  private progress: Map<string, LevelProgress> = new Map();
  private currentSession: ExpressionSession | null = null;

  constructor() {
    this.initializeProgress();
  }

  private initializeProgress(): void {
    EXPRESSION_LEVELS.forEach(level => {
      EXPRESSION_CATEGORIES.forEach(category => {
        const key = `${level}_${category}`;
        const expressions = EXPRESSIONS_DATA.filter(
          expr => expr.level === level && expr.category === category
        );
        
        this.progress.set(key, {
          level,
          category,
          currentStage: 1,
          totalStages: 30,
          completedExpressions: 0,
          totalExpressions: expressions.length,
          accuracy: 0
        });
      });
    });
  }

  getProgress(level: string, category: string): LevelProgress | null {
    const key = `${level}_${category}`;
    return this.progress.get(key) || null;
  }

  getAllProgress(): LevelProgress[] {
    return Array.from(this.progress.values());
  }

  startSession(level: string, category: string, stage: number): ExpressionSession {
    const expressions = EXPRESSIONS_DATA.filter(
      expr => expr.level === level && expr.category === category && expr.stage === stage
    ) as Expression[];

    this.currentSession = {
      expressions,
      currentIndex: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      startTime: new Date()
    };

    return this.currentSession;
  }

  getCurrentExpression(): Expression | null {
    if (!this.currentSession) return null;
    return this.currentSession.expressions[this.currentSession.currentIndex] || null;
  }

  submitAnswer(isCorrect: boolean): boolean {
    if (!this.currentSession) return false;

    this.currentSession.totalAnswers++;
    if (isCorrect) {
      this.currentSession.correctAnswers++;
    }

    // 다음 표현으로 이동
    this.currentSession.currentIndex++;
    
    return this.currentSession.currentIndex < this.currentSession.expressions.length;
  }

  finishSession(): LevelProgress | null {
    if (!this.currentSession) return null;

    const accuracy = this.currentSession.totalAnswers > 0 
      ? (this.currentSession.correctAnswers / this.currentSession.totalAnswers) * 100 
      : 0;

    // 진행 상황 업데이트
    const key = `${this.currentSession.expressions[0]?.level}_${this.currentSession.expressions[0]?.category}`;
    const progress = this.progress.get(key);
    
    if (progress) {
      progress.completedExpressions += this.currentSession.correctAnswers;
      progress.accuracy = accuracy;
      
      // 정확도가 80% 이상이면 다음 단계로
      if (accuracy >= 80 && progress.currentStage < progress.totalStages) {
        progress.currentStage++;
      }
    }

    const result = progress || null;
    this.currentSession = null;
    return result;
  }

  resetProgress(level?: string, category?: string): void {
    if (level && category) {
      const key = `${level}_${category}`;
      const progress = this.progress.get(key);
      if (progress) {
        progress.currentStage = 1;
        progress.completedExpressions = 0;
        progress.accuracy = 0;
      }
    } else {
      this.initializeProgress();
    }
  }
}

export const expressionManager = new LevelBasedExpressionManager();