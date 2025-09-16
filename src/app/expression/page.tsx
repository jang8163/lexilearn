'use client';

import { useState } from 'react';

const LEVELS = [
  { id: 'beginner', name: '초급', color: 'from-green-400 to-green-600' },
  { id: 'intermediate', name: '중급', color: 'from-yellow-400 to-orange-500' },
  { id: 'advanced', name: '고급', color: 'from-red-400 to-red-600' }
];

const CATEGORIES = [
  { id: 'daily_conversation', name: '일상 대화', icon: '💬', description: '일상생활에서 자주 사용하는 표현들' },
  { id: 'business_english', name: '비즈니스 영어', icon: '💼', description: '업무와 비즈니스 상황에서 필요한 표현들' },
  { id: 'travel_phrases', name: '여행 표현', icon: '✈️', description: '여행 중에 유용한 영어 표현들' },
  { id: 'academic_english', name: '학술 영어', icon: '🎓', description: '학술적이고 정식적인 표현들' },
  { id: 'social_interaction', name: '사회적 상호작용', icon: '🤝', description: '사교적 상황에서의 표현들' },
  { id: 'professional_communication', name: '전문적 소통', icon: '📋', description: '전문 분야에서의 소통 표현들' }
];

export default function ExpressionPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleStartLearning = () => {
    if (selectedLevel && selectedCategory) {
      window.location.href = `/expression/stages?level=${selectedLevel}&category=${selectedCategory}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← 돌아가기
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">💬 표현 학습</h1>
          <p className="text-lg text-gray-600">난이도와 카테고리를 선택하여 표현을 학습해보세요</p>
        </div>

        {/* 난이도 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">1. 난이도 선택</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEVELS.map(level => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                  selectedLevel === level.id
                    ? 'border-blue-500 shadow-xl'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${level.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
                  {level.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{level.name}</h3>
                <p className="text-gray-600">
                  {level.id === 'beginner' && '기초적인 표현들로 시작'}
                  {level.id === 'intermediate' && '중간 수준의 실용적 표현'}
                  {level.id === 'advanced' && '고급 수준의 정교한 표현'}
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  각 카테고리별 30단계 × 10개 표현
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 카테고리 선택 */}
        {selectedLevel && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">2. 카테고리 선택</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'border-blue-500 shadow-xl'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    30단계 × 10개 = 300개 표현
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 시작 버튼 */}
        {selectedLevel && selectedCategory && (
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">학습 준비 완료!</h2>
            <div className="mb-6">
              <div className="inline-flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  {LEVELS.find(l => l.id === selectedLevel)?.name}
                </span>
                <span className="text-gray-400">×</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              총 300개의 표현을 단계별로 학습합니다.<br />
              각 단계마다 10개씩, 70점 이상 통과 시 다음 단계로 진행됩니다.
            </p>
            <button
              onClick={handleStartLearning}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all text-xl"
            >
              🚀 학습 시작하기
            </button>
          </div>
        )}

        {/* 학습 규칙 안내 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 학습 규칙</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">🎯 통과 기준</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 70점 이상 획득 시 다음 단계 진행</li>
                <li>• 3번 실패 시 자동으로 다음 단계로 이동</li>
                <li>• 실패한 문제는 오답노트에 자동 저장</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">🎤 발음 평가</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 정확도: 발음의 정확성</li>
                <li>• 유창성: 말의 흐름과 속도</li>
                <li>• 발음: 단어별 발음 품질</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
