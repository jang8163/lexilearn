'use client';

import { useState, useEffect } from 'react';

const LEVELS = [
  { id: 'beginner', name: '초급', color: 'from-green-400 to-green-600' },
  { id: 'intermediate', name: '중급', color: 'from-yellow-400 to-orange-500' },
  { id: 'advanced', name: '고급', color: 'from-red-400 to-red-600' }
];

interface NoteItem {
  id: string;
  type: 'expression' | 'vocabulary';
  content: string;
  korean: string;
  difficulty: number;
  attempts: number;
  lastAttempt: Date;
  mistakes: string[];
  level?: string;
  stage?: number;
}

export default function VocabularyNotesPage() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  useEffect(() => {
    // 로컬 스토리지에서 단어 오답노트만 불러오기
    const savedNotes = localStorage.getItem('lexilearn-notes');
    if (savedNotes) {
      const allNotes = JSON.parse(savedNotes);
      const vocabularyNotes = allNotes.filter((note: NoteItem) => note.type === 'vocabulary');
      setNotes(vocabularyNotes);
    }
  }, []);

  const saveNotes = (newNotes: NoteItem[]) => {
    const allNotes = JSON.parse(localStorage.getItem('lexilearn-notes') || '[]');
    const expressionNotes = allNotes.filter((note: NoteItem) => note.type === 'expression');
    const updatedNotes = [...expressionNotes, ...newNotes];
    localStorage.setItem('lexilearn-notes', JSON.stringify(updatedNotes));
    setNotes(newNotes);
  };

  const removeNote = (id: string) => {
    const newNotes = notes.filter(note => note.id !== id);
    saveNotes(newNotes);
  };

  const updateAttempts = (id: string) => {
    const newNotes = notes.map(note => 
      note.id === id 
        ? { ...note, attempts: note.attempts + 1, lastAttempt: new Date() }
        : note
    );
    saveNotes(newNotes);
  };

  const filteredNotes = selectedLevel === 'all' 
    ? notes 
    : notes.filter(note => note.level === selectedLevel);

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 80) return 'text-red-600 bg-red-100';
    if (difficulty >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const getDifficultyText = (difficulty: number) => {
    if (difficulty >= 80) return '매우 어려움';
    if (difficulty >= 60) return '어려움';
    return '보통';
  };

  const getLevelName = (level: string) => {
    return LEVELS.find(l => l.id === level)?.name || level;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← 돌아가기
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📚 단어 오답노트</h1>
          <p className="text-lg text-gray-600">단어 학습에서 틀린 문제들을 복습해보세요</p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{notes.length}</div>
            <div className="text-gray-600">총 단어 오답</div>
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
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedLevel === 'all'
                  ? 'bg-orange-500 text-white shadow-lg'
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
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.name}
              </button>
            ))}
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
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          단어
                        </span>
                        {note.level && (
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            {getLevelName(note.level)}
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(note.difficulty)}`}>
                          {getDifficultyText(note.difficulty)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{note.content}</h3>
                      <p className="text-lg text-gray-600 mb-2">{note.korean}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>시도 횟수: {note.attempts}회</span>
                        <span>마지막 시도: {new Date(note.lastAttempt).toLocaleDateString('ko-KR')}</span>
                        {note.stage && <span>단계: {note.stage}</span>}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateAttempts(note.id)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
