'use client';

import { useState, useEffect } from 'react';
import { stageManager, UserProgress, StageInfo } from '../../lib/level-stage-manager';

export default function ProgressPage() {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [stages, setStages] = useState<StageInfo[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('beginner');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'expression' | 'vocabulary' | 'all'>('all');

  useEffect(() => {
    const progress = stageManager.getUserProgress();
    const allStages = stageManager.getAllStages();
    setUserProgress(progress);
    setStages(allStages);
  }, []);

  const getLevelStages = (level: string) => {
    let filteredStages = stages.filter(stage => stage.level === level);
    
    if (selectedType === 'expression') {
      filteredStages = filteredStages.filter(stage => stage.category !== 'daily_conversation' || selectedCategory === 'all');
    } else if (selectedType === 'vocabulary') {
      filteredStages = filteredStages.filter(stage => stage.category === 'daily_conversation');
    }
    
    if (selectedCategory !== 'all') {
      filteredStages = filteredStages.filter(stage => stage.category === selectedCategory);
    }
    
    return filteredStages;
  };

  const getCompletedCount = (level: string) => {
    return getLevelStages(level).filter(stage => stage.isCompleted).length;
  };

  const getTotalCount = (level: string) => {
    return getLevelStages(level).length;
  };

  const getProgressPercentage = (level: string) => {
    const completed = getCompletedCount(level);
    const total = getTotalCount(level);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getCategoryProgress = (level: string) => {
    const categories = ['daily_conversation', 'business_english', 'travel_phrases', 'academic_english', 'social_interaction', 'professional_communication'];
    return categories.map(category => {
      const categoryStages = stages.filter(stage => stage.level === level && stage.category === category);
      const completed = categoryStages.filter(stage => stage.isCompleted).length;
      const total = categoryStages.length;
      return {
        category,
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
      };
    });
  };

  if (!userProgress) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📊 전체 진행 현황</h1>
          <p className="text-lg text-gray-600">학습 진행 상황을 확인해보세요</p>
        </div>

        {/* 전체 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{userProgress.completedExpressions}</div>
            <div className="text-gray-600">완료된 표현</div>
            <div className="text-sm text-gray-500">/ {userProgress.totalExpressions}</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{userProgress.completedWords}</div>
            <div className="text-gray-600">완료된 단어</div>
            <div className="text-sm text-gray-500">/ {userProgress.totalWords}</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{userProgress.overallAccuracy.toFixed(1)}%</div>
            <div className="text-gray-600">전체 정확도</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{userProgress.achievements.length}</div>
            <div className="text-gray-600">달성한 업적</div>
          </div>
        </div>

        {/* 필터 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">필터</h2>
          
          {/* 학습 타입 필터 */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-3">학습 타입</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedType === 'all'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedType('expression')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedType === 'expression'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                표현 학습
              </button>
              <button
                onClick={() => setSelectedType('vocabulary')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedType === 'vocabulary'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                단어 학습
              </button>
            </div>
          </div>

          {/* 레벨 필터 */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-3">난이도</h3>
            <div className="flex space-x-4">
              {['beginner', 'intermediate', 'advanced'].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedLevel === level
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level === 'beginner' ? '초급' : level === 'intermediate' ? '중급' : '고급'}
                </button>
              ))}
            </div>
          </div>

          {/* 카테고리 필터 (표현 학습일 때만) */}
          {selectedType === 'expression' && (
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">카테고리</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  전체
                </button>
                {['daily_conversation', 'business_english', 'travel_phrases', 'academic_english', 'social_interaction', 'professional_communication'].map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'daily_conversation' ? '일상 대화' :
                     category === 'business_english' ? '비즈니스 영어' :
                     category === 'travel_phrases' ? '여행 표현' :
                     category === 'academic_english' ? '학술 영어' :
                     category === 'social_interaction' ? '사회적 상호작용' :
                     '전문적 소통'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 레벨별 진행 상황 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">진행 상황</h2>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium text-gray-700">
                {selectedLevel === 'beginner' ? '초급' : selectedLevel === 'intermediate' ? '중급' : '고급'} 레벨
              </span>
              <span className="text-sm text-gray-500">
                {getCompletedCount(selectedLevel)} / {getTotalCount(selectedLevel)} 완료
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage(selectedLevel)}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-500 mt-1">
              {getProgressPercentage(selectedLevel)}%
            </div>
          </div>

          {/* 카테고리별 진행 상황 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getCategoryProgress(selectedLevel).map(category => (
              <div key={category.category} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">
                    {category.category === 'daily_conversation' ? '일상 대화' :
                     category.category === 'business_english' ? '비즈니스 영어' :
                     category.category === 'travel_phrases' ? '여행 표현' :
                     category.category === 'academic_english' ? '학술 영어' :
                     category.category === 'social_interaction' ? '사회적 상호작용' :
                     '전문적 소통'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {category.completed}/{category.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {category.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">최근 활동</h2>
          <div className="text-gray-600">
            마지막 학습: {userProgress.lastActivity.toLocaleDateString('ko-KR')}
          </div>
          {userProgress.achievements.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">달성한 업적</h3>
              <div className="flex flex-wrap gap-2">
                {userProgress.achievements.map(achievement => (
                  <span
                    key={achievement}
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                  >
                    {achievement === 'first_10_stages' ? '첫 10단계 완료' :
                     achievement === 'dedicated_learner' ? '헌신적 학습자' :
                     achievement === 'accuracy_master' ? '정확도 마스터' : achievement}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
          >
            ← 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
