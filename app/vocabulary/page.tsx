'use client';

import { useState } from 'react';

const LEVELS = [
  { id: 'beginner', name: '초급', color: 'from-green-400 to-green-600', description: '기초적인 단어들로 시작' },
  { id: 'intermediate', name: '중급', color: 'from-yellow-400 to-orange-500', description: '중간 수준의 실용적 단어' },
  { id: 'advanced', name: '고급', color: 'from-red-400 to-red-600', description: '고급 수준의 전문적 단어' }
];

export default function VocabularyPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const handleStartLearning = () => {
    if (selectedLevel) {
      window.location.href = `/vocabulary/stages?level=${selectedLevel}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← 돌아가기
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📚 단어 학습</h1>
          <p className="text-lg text-gray-600">난이도를 선택하여 단어를 학습해보세요</p>
        </div>

        {/* 난이도 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">난이도 선택</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEVELS.map(level => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`p-8 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                  selectedLevel === level.id
                    ? 'border-orange-500 shadow-xl'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${level.color} rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold`}>
                  {level.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{level.name}</h3>
                <p className="text-gray-600 mb-4">{level.description}</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-2">학습 내용:</div>
                  <div className="text-lg font-medium text-gray-700">30단계 × 15개 = 450개 단어</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 시작 버튼 */}
        {selectedLevel && (
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">학습 준비 완료!</h2>
            <div className="mb-6">
              <div className="inline-flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium text-lg">
                  {LEVELS.find(l => l.id === selectedLevel)?.name} 레벨
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              총 450개의 단어를 단계별로 학습합니다.<br />
              각 단계마다 15개씩, 70점 이상 통과 시 다음 단계로 진행됩니다.
            </p>
            <button
              onClick={handleStartLearning}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all text-xl"
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
                <li>• 실패한 단어는 오답노트에 자동 저장</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">🎤 발음 평가</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 정확도: 단어 발음의 정확성</li>
                <li>• 유창성: 말의 흐름과 속도</li>
                <li>• 발음: 각 음절의 발음 품질</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 단어 학습 특징 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 단어 학습의 특징</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">체계적 학습</h3>
              <p className="text-gray-600 text-sm">난이도별로 체계적으로 구성된 1,350개 단어</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">정확한 발음</h3>
              <p className="text-gray-600 text-sm">AI 발음 평가로 정확한 발음 습득</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">오답 관리</h3>
              <p className="text-gray-600 text-sm">틀린 단어는 자동으로 오답노트에 저장</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
