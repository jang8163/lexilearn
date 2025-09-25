'use client';

import { useState, useEffect } from 'react';
import { wrongAnswerTracker, WrongAnswerItem } from '../../lib/wrong-answer-tracker';

const LEVELS = [
  { id: 'beginner', name: '초급', color: 'from-green-400 to-green-600' },
  { id: 'intermediate', name: '중급', color: 'from-yellow-400 to-orange-500' },
  { id: 'advanced', name: '고급', color: 'from-red-400 to-red-600' }
];

const CATEGORIES = [
  { id: 'daily_conversation', name: '일상 대화', icon: '💬' },
  { id: 'business_english', name: '비즈니스 영어', icon: '💼' },
  { id: 'travel_phrases', name: '여행 표현', icon: '✈️' },
  { id: 'academic_english', name: '학술 영어', icon: '🎓' },
  { id: 'social_interaction', name: '사회적 상호작용', icon: '🤝' },
  { id: 'professional_communication', name: '전문적 소통', icon: '📋' }
];

export default function ExpressionNotesPage() {
  const [notes, setNotes] = useState<WrongAnswerItem[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // 새로운 오답 추적 시스템에서 표현 오답노트만 불러오기
    const expressionNotes = wrongAnswerTracker.getWrongAnswerNotesByType('expression');
    console.log('표현 오답노트 페이지 - 불러온 표현 오답노트:', expressionNotes);
    console.log('표현 오답노트 페이지 - 표현 오답노트 개수:', expressionNotes.length);
    setNotes(expressionNotes);
  }, []);

  const removeNote = (id: string) => {
    // ID에서 타입과 아이템 ID 추출
    const parts = id.split('_');
    const type = parts[0] as 'expression' | 'vocabulary';
    const itemId = parts.slice(1).join('_');
    
    wrongAnswerTracker.removeFromNotes(itemId, type);
    
    // 상태 업데이트
    const updatedNotes = wrongAnswerTracker.getWrongAnswerNotesByType('expression');
    setNotes(updatedNotes);
  };

  // const updateAttempts = (id: string) => { // 사용하지 않으므로 주석 처리
  //   // ID에서 타입과 아이템 ID 추출
  //   const parts = id.split('_');
  //   const type = parts[0] as 'expression' | 'vocabulary';
  //   const itemId = parts.slice(1).join('_');
  //   
  //   wrongAnswerTracker.updateAttempts(itemId, type);
  //   
  //   // 상태 업데이트
  //   const updatedNotes = wrongAnswerTracker.getWrongAnswerNotesByType('expression');
  //   setNotes(updatedNotes);
  // };

  const practiceWrongAnswer = (note: WrongAnswerItem) => {
    // 오답 연습을 위한 URL 생성
    const practiceUrl = `/learn?type=${note.type}&level=${note.level}&stage=${note.stage}&practice=${note.id}`;
    if (note.type === 'expression' && note.category) {
      window.location.href = `${practiceUrl}&category=${note.category}`;
    } else {
      window.location.href = practiceUrl;
    }
  };

  const filteredNotes = notes.filter(note => {
    const levelMatch = selectedLevel === 'all' || note.level === selectedLevel;
    const categoryMatch = selectedCategory === 'all' || note.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  const getDifficultyColor = (wrongCount: number) => {
    if (wrongCount >= 5) return 'text-red-600 bg-red-100';
    if (wrongCount >= 3) return 'text-orange-600 bg-orange-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const getDifficultyText = (wrongCount: number) => {
    if (wrongCount >= 5) return '매우 어려움';
    if (wrongCount >= 3) return '어려움';
    return '보통';
  };

  const getLevelName = (level: string) => {
    return LEVELS.find(l => l.id === level)?.name || level;
  };

  const getCategoryName = (category: string) => {
    return CATEGORIES.find(c => c.id === category)?.name || category;
  };

  const getCategoryIcon = (category: string) => {
    return CATEGORIES.find(c => c.id === category)?.icon || '📝';
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">💬 표현 오답노트</h1>
          <p className="text-lg text-gray-600">표현 학습에서 틀린 문제들을 복습해보세요</p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{notes.length}</div>
            <div className="text-gray-600">총 표현 오답</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {notes.filter(note => note.level === 'beginner').length}
            </div>
            <div className="text-gray-600">초급 오답</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {notes.filter(note => note.level === 'intermediate').length}
            </div>
            <div className="text-gray-600">중급 오답</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {notes.filter(note => note.level === 'advanced').length}
            </div>
            <div className="text-gray-600">고급 오답</div>
          </div>
        </div>

        {/* 필터 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">필터</h2>
          
          {/* 레벨 필터 */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-3">난이도</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedLevel('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedLevel === 'all'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
              {LEVELS.map(level => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedLevel === level.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          {/* 카테고리 필터 */}
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
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 오답노트 목록 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">오답노트 목록</h2>
          
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-xl text-gray-600 mb-2">해당 조건의 오답노트가 없습니다</p>
              <p className="text-gray-500">다른 필터를 선택하거나 학습을 시작해보세요!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotes.map(note => (
                <div key={note.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          표현
                        </span>
                        {note.level && (
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            {getLevelName(note.level)}
                          </span>
                        )}
                        {note.category && (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {getCategoryIcon(note.category)} {getCategoryName(note.category)}
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(note.wrongCount)}`}>
                          {getDifficultyText(note.wrongCount)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{note.content}</h3>
                      <p className="text-lg text-gray-600 mb-2">{note.korean}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>틀린 횟수: {note.wrongCount}회</span>
                        <span>시도 횟수: {note.attempts}회</span>
                        <span>마지막 시도: {new Date(note.lastAttempt).toLocaleDateString('ko-KR')}</span>
                        {note.stage && <span>단계: {note.stage}</span>}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => practiceWrongAnswer(note)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        다시 연습
                      </button>
                      <button
                        onClick={() => removeNote(note.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  
                  {note.mistakes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">자주 틀리는 부분:</h4>
                      <div className="flex flex-wrap gap-2">
                        {note.mistakes.map((mistake, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                            {mistake}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
