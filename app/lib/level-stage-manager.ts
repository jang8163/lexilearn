// LexiLearn - 단계별 진행 관리 시스템

export interface StageInfo {
    level: string;
    category: string;
    stage: number;
    isUnlocked: boolean;
    isCompleted: boolean;
    score: number;
    completedAt?: Date;
    type?: 'expression' | 'vocabulary'; // 학습 타입 추가
  }
  
  export interface UserProgress {
    userId: string;
    totalExpressions: number;
    completedExpressions: number;
    totalWords: number;
    completedWords: number;
    overallAccuracy: number;
    currentLevel: string;
    achievements: string[];
    lastActivity: Date;
  }
  
  export class LevelStageManager {
    private stages: Map<string, StageInfo> = new Map();
    private userProgress: UserProgress | null = null;
    private readonly STORAGE_KEY = 'lexilearn-stage-progress';

    constructor() {
      this.initializeStages();
      this.initializeUserProgress();
      this.loadProgressFromStorage();
    }
  
    private initializeStages(): void {
      const levels = ['beginner', 'intermediate', 'advanced'];
      const categories = [
        'daily_conversation',
        'business_english',
        'travel_phrases',
        'academic_english',
        'social_interaction',
        'professional_communication'
      ];
  
      // 표현 학습용 단계들 생성
      levels.forEach(level => {
        categories.forEach(category => {
          for (let stage = 1; stage <= 30; stage++) {
            const key = `${level}_${category}_${stage}`;
            this.stages.set(key, {
              level,
              category,
              stage,
              isUnlocked: stage === 1, // 첫 번째 단계만 잠금 해제
              isCompleted: false,
              score: 0,
              type: 'expression'
            });
          }
        });
      });

      // 단어 학습용 단계들 생성 (별도 키 사용)
      levels.forEach(level => {
        for (let stage = 1; stage <= 30; stage++) {
          const key = `vocabulary_${level}_${stage}`;
          this.stages.set(key, {
            level,
            category: 'daily_conversation',
            stage,
            isUnlocked: stage === 1, // 첫 번째 단계만 잠금 해제
            isCompleted: false,
            score: 0,
            type: 'vocabulary'
          });
        }
      });
    }
  
    private initializeUserProgress(): void {
      this.userProgress = {
        userId: 'default_user',
        totalExpressions: 5400,
        completedExpressions: 0,
        totalWords: 1350,
        completedWords: 0,
        overallAccuracy: 0,
        currentLevel: 'beginner',
        achievements: [],
        lastActivity: new Date()
      };
    }
  
    getStageInfo(level: string, category: string, stage: number, type?: 'expression' | 'vocabulary'): StageInfo | null {
      let key: string;
      
      if (type === 'vocabulary') {
        // 단어 학습의 경우 별도 키 사용
        key = `vocabulary_${level}_${stage}`;
      } else {
        // 표현 학습의 경우 기존 키 사용
        key = `${level}_${category}_${stage}`;
      }
      
      const stageInfo = this.stages.get(key);
      
      if (stageInfo && type) {
        // 타입이 지정된 경우, 해당 타입의 진행 상황을 반환
        return {
          ...stageInfo,
          type
        };
      }
      
      return stageInfo || null;
    }
  
    getAllStages(): StageInfo[] {
      return Array.from(this.stages.values());
    }
  
    getStagesByLevel(level: string, type?: 'expression' | 'vocabulary'): StageInfo[] {
      return Array.from(this.stages.values()).filter(stage => 
        stage.level === level && (!type || stage.type === type)
      );
    }
  
    getStagesByCategory(category: string, type?: 'expression' | 'vocabulary'): StageInfo[] {
      return Array.from(this.stages.values()).filter(stage => 
        stage.category === category && (!type || stage.type === type)
      );
    }
  
    unlockStage(level: string, category: string, stage: number): boolean {
      const key = `${level}_${category}_${stage}`;
      const stageInfo = this.stages.get(key);
      
      if (stageInfo) {
        stageInfo.isUnlocked = true;
        return true;
      }
      return false;
    }
  
    completeStage(level: string, category: string, stage: number, score: number, type?: 'expression' | 'vocabulary'): boolean {
      let key: string;
      
      if (type === 'vocabulary') {
        // 단어 학습의 경우 별도 키 사용
        key = `vocabulary_${level}_${stage}`;
      } else {
        // 표현 학습의 경우 기존 키 사용
        key = `${level}_${category}_${stage}`;
      }
      
      const stageInfo = this.stages.get(key);
      
      if (stageInfo && stageInfo.isUnlocked) {
        stageInfo.isCompleted = true;
        stageInfo.score = score;
        stageInfo.completedAt = new Date();
        if (type) {
          stageInfo.type = type;
        }

        // 다음 단계 잠금 해제 (같은 타입의 경우에만)
        let nextStageKey: string;
        if (type === 'vocabulary') {
          nextStageKey = `vocabulary_${level}_${stage + 1}`;
        } else {
          nextStageKey = `${level}_${category}_${stage + 1}`;
        }
        
        const nextStage = this.stages.get(nextStageKey);
        if (nextStage) {
          // 같은 타입이거나 타입이 없는 경우에만 잠금 해제
          if (!nextStage.type || nextStage.type === type) {
            nextStage.isUnlocked = true;
            if (type) {
              nextStage.type = type;
            }
          }
        }

        // 사용자 진행 상황 업데이트
        if (this.userProgress) {
          if (type === 'expression') {
            this.userProgress.completedExpressions++;
          } else if (type === 'vocabulary') {
            this.userProgress.completedWords++;
          }
          this.userProgress.lastActivity = new Date();
          this.updateOverallAccuracy();
        }

        // localStorage에 진행 상황 저장
        this.saveProgressToStorage();

        return true;
      }
      return false;
    }
  
    getUserProgress(): UserProgress | null {
      return this.userProgress;
    }
  
    private updateOverallAccuracy(): void {
      if (!this.userProgress) return;
  
      const completedStages = Array.from(this.stages.values()).filter(stage => stage.isCompleted);
      if (completedStages.length > 0) {
        const totalScore = completedStages.reduce((sum, stage) => sum + stage.score, 0);
        this.userProgress.overallAccuracy = totalScore / completedStages.length;
      }
    }
  
    resetProgress(): void {
      this.initializeStages();
      this.initializeUserProgress();
      this.saveProgressToStorage();
    }

    private saveProgressToStorage(): void {
      if (typeof window === 'undefined') return;
      
      const progressData = {
        stages: Array.from(this.stages.entries()),
        userProgress: this.userProgress
      };
      
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progressData));
      } catch (error) {
        console.error('Failed to save progress to localStorage:', error);
      }
    }

    private loadProgressFromStorage(): void {
      if (typeof window === 'undefined') return;
      
      try {
        const savedData = localStorage.getItem(this.STORAGE_KEY);
        if (savedData) {
          const progressData = JSON.parse(savedData);
          
          // 단계 정보 복원
          if (progressData.stages) {
            this.stages = new Map(progressData.stages);
          }
          
          // 사용자 진행 상황 복원
          if (progressData.userProgress) {
            this.userProgress = {
              ...progressData.userProgress,
              lastActivity: new Date(progressData.userProgress.lastActivity)
            };
          }
        }
      } catch (error) {
        console.error('Failed to load progress from localStorage:', error);
      }
    }
  
    getAchievements(): string[] {
      if (!this.userProgress) return [];
      
      const achievements: string[] = [];
      const completedStages = Array.from(this.stages.values()).filter(stage => stage.isCompleted);
      
      if (completedStages.length >= 10) {
        achievements.push('first_10_stages');
      }
      if (completedStages.length >= 50) {
        achievements.push('dedicated_learner');
      }
      if (this.userProgress.overallAccuracy >= 90) {
        achievements.push('accuracy_master');
      }
      
      return achievements;
    }
  }
  
  export const stageManager = new LevelStageManager();