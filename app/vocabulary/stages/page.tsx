'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { stageManager, StageInfo } from '../../lib/level-stage-manager';

const LEVELS = [
  { id: 'beginner', name: '초급', color: 'from-green-400 to-green-600' },
  { id: 'intermediate', name: '중급', color: 'from-yellow-400 to-orange-500' },
  { id: 'advanced', name: '고급', color: 'from-red-400 to-red-600' }
];

function VocabularyStagesContent() {
  const searchParams = useSearchParams();
  const level = searchParams.get('level') || 'beginner';
  
  const [stages, setStages] = useState<StageInfo[]>([]);
  const [selectedLevel, setSelectedLevel] = useState(level);

  useEffect(() => {
    // 해당 레벨의 모든 단계 정보 가져오기 (단어 학습만)
    const allStages = stageManager.getAllStages();
    console.log('모든 단계:', allStages);
    
    let filteredStages = allStages.filter(stage => 
      stage.level === selectedLevel && 
      stage.category === 'daily_conversation' &&
      stage.type === 'vocabulary' // 단어 학습만
    );
    
    console.log('필터링된 단계:', filteredStages);
    console.log('선택된 레벨:', selectedLevel);
    
    // 단어 학습 단계가 없으면 기본 단계들 생성
    if (filteredStages.length === 0) {
      console.log('단어 학습 단계가 없음. 기본 단계들 생성 중...');
      filteredStages = Array.from({ length: 30 }, (_, index) => ({
        level: selectedLevel,
        category: 'daily_conversation',
        stage: index + 1,
        isUnlocked: index === 0, // 첫 번째 단계만 잠금 해제
        isCompleted: false,
        score: 0,
        type: 'vocabulary' as const
      }));
    }
    
    setStages(filteredStages.sort((a, b) => a.stage - b.stage));
  }, [selectedLevel]);

  const handleStageClick = (stage: StageInfo | number) => {
    const stageNumber = typeof stage === 'number' ? stage : stage.stage;
    const stageInfo = typeof stage === 'number' ? stages.find(s => s.stage === stageNumber) : stage;
    
    if (stageInfo?.isUnlocked || stageNumber === 1) {
      console.log('단계 클릭:', stageNumber);
      window.location.href = `/learn?type=vocabulary&level=${selectedLevel}&stage=${stageNumber}`;
    }
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => window.location.href = '/'}
            className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← 돌아가기
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📚 단어 학습 - 단계 선택</h1>
          <p className="text-lg text-gray-600">원하는 단계를 선택하여 학습을 시작하세요</p>
        </div>

        {/* 레벨 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">난이도 선택</h2>
          <div className="flex space-x-4">
            {LEVELS.map(lev => (
              <button
                key={lev.id}
                onClick={() => setSelectedLevel(lev.id)}
                className={`px-8 py-4 rounded-lg font-medium transition-all ${
                  selectedLevel === lev.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lev.name}
              </button>
            ))}
          </div>
        </div>

        {/* 진행 상황 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">진행 상황</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium text-gray-700">
              {getLevelName(selectedLevel)} 레벨
            </span>
            <span className="text-sm text-gray-500">
              {getCompletedCount()} / {stages.length} 완료
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-600 h-4 rounded-full transition-all duration-500"
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
                  onClick={() => handleStageClick(stageNumber)}
                  disabled={!isUnlocked}
                  className={`relative p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                    isCompleted
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : isUnlocked
                      ? 'bg-orange-50 border-orange-300 text-orange-800 hover:bg-orange-100'
                      : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{stageNumber}</div>
                    <div className="text-xs">
                      {isCompleted ? (
                        <div>
                          <div className="text-green-600 font-medium">완료</div>
                          <div className="text-green-500">{Math.round(score)}점</div>
                        </div>
                      ) : isUnlocked ? (
                        <div className="text-orange-600">시작</div>
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
                <li>• 각 단계마다 15개 단어</li>
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

export default function VocabularyStagesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <VocabularyStagesContent />
    </Suspense>
  );
}
