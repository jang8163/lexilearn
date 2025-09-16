'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { stageManager, StageInfo } from '../../../lib/level-stage-manager';

const CATEGORIES = [
  { id: 'daily_conversation', name: '일상 대화', icon: '💬' },
  { id: 'business_english', name: '비즈니스 영어', icon: '💼' },
  { id: 'travel_phrases', name: '여행 표현', icon: '✈️' },
  { id: 'academic_english', name: '학술 영어', icon: '🎓' },
  { id: 'social_interaction', name: '사회적 상호작용', icon: '🤝' },
  { id: 'professional_communication', name: '전문적 소통', icon: '📋' }
];

const LEVELS = [
  { id: 'beginner', name: '초급', color: 'from-green-400 to-green-600' },
  { id: 'intermediate', name: '중급', color: 'from-yellow-400 to-orange-500' },
  { id: 'advanced', name: '고급', color: 'from-red-400 to-red-600' }
];

function ExpressionStagesContent() {
  const searchParams = useSearchParams();
  const level = searchParams.get('level') || 'beginner';
  const category = searchParams.get('category') || 'daily_conversation';
  
  const [stages, setStages] = useState<StageInfo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedLevel, setSelectedLevel] = useState(level);

  useEffect(() => {
    // 해당 레벨과 카테고리의 모든 단계 정보 가져오기
    const allStages = stageManager.getAllStages();
    const filteredStages = allStages.filter(stage => 
      stage.level === selectedLevel && stage.category === selectedCategory
    );
    setStages(filteredStages.sort((a, b) => a.stage - b.stage));
  }, [selectedLevel, selectedCategory]);

  const handleStageClick = (stage: StageInfo) => {
    if (stage.isUnlocked) {
      window.location.href = `/learn?type=expression&level=${selectedLevel}&category=${selectedCategory}&stage=${stage.stage}`;
    }
  };

  const getCategoryName = (cat: string) => {
    return CATEGORIES.find(c => c.id === cat)?.name || cat;
  };

  const getLevelName = (lev: string) => {
    return LEVELS.find(l => l.id === lev)?.name || lev;
  };

  const getCompletedCount = () => {
    return stages.filter(stage => stage.isCompleted).length;
  };

  const getProgressPercentage = () => {
    return stages.length > 0 ? Math.round((getCompletedCount() / stages.length) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => window.location.href = '/'}
            className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← 돌아가기
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">💬 표현 학습 - 단계 선택</h1>
          <p className="text-lg text-gray-600">원하는 단계를 선택하여 학습을 시작하세요</p>
        </div>

        {/* 레벨 및 카테고리 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">학습 설정</h2>
          
          {/* 레벨 선택 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">난이도</h3>
            <div className="flex space-x-4">
              {LEVELS.map(lev => (
                <button
                  key={lev.id}
                  onClick={() => setSelectedLevel(lev.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedLevel === lev.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lev.name}
                </button>
              ))}
            </div>
          </div>

          {/* 카테고리 선택 */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">카테고리</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCategory === cat.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="text-sm font-medium">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 진행 상황 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">진행 상황</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium text-gray-700">
              {getLevelName(selectedLevel)} - {getCategoryName(selectedCategory)}
            </span>
            <span className="text-sm text-gray-500">
              {getCompletedCount()} / {stages.length} 완료
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-gray-500 mt-1">
            {getProgressPercentage()}%
          </div>
        </div>

        {/* 단계별 그리드 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">단계 선택</h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
            {Array.from({ length: 30 }, (_, index) => {
              const stageNumber = index + 1;
              const stageInfo = stages.find(s => s.stage === stageNumber);
              const isUnlocked = stageInfo?.isUnlocked || stageNumber === 1;
              const isCompleted = stageInfo?.isCompleted || false;
              const score = stageInfo?.score || 0;

              return (
                <button
                  key={stageNumber}
                  onClick={() => stageInfo && handleStageClick(stageInfo)}
                  disabled={!isUnlocked}
                  className={`relative p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                    isCompleted
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : isUnlocked
                      ? 'bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100'
                      : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{stageNumber}</div>
                    <div className="text-xs">
                      {isCompleted ? (
                        <div>
                          <div className="text-green-600 font-medium">완료</div>
                          <div className="text-green-500">{score}점</div>
                        </div>
                      ) : isUnlocked ? (
                        <div className="text-blue-600">시작</div>
                      ) : (
                        <div className="text-gray-400">🔒</div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 학습 규칙 안내 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 학습 규칙</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">🔓 단계 잠금 해제</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 1단계는 처음부터 잠금 해제</li>
                <li>• 이전 단계 완료 시 다음 단계 잠금 해제</li>
                <li>• 70점 이상 획득 시 단계 완료</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">🎯 학습 내용</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 각 단계마다 10개 표현</li>
                <li>• 음성 녹음 및 AI 발음 평가</li>
                <li>• 3번 시도 후 자동 다음 단계</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpressionStagesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <ExpressionStagesContent />
    </Suspense>
  );
}
