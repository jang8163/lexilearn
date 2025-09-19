'use client';

import { useState, useEffect } from 'react';
import { speakingManager, SpeakingResult } from '../lib/speaking-practice';

interface NoteItem {
  id: string;
  type: 'expression' | 'vocabulary';
  content: string;
  korean: string;
  difficulty: number;
  attempts: number;
  lastAttempt: Date;
  mistakes: string[];
}

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [selectedType, setSelectedType] = useState<'expression' | 'vocabulary' | 'all'>('all');
  const [practiceHistory, setPracticeHistory] = useState<SpeakingResult[]>([]);

  useEffect(() => {
    // 로컬 스토리지에서 오답노트 불러오기
    const savedNotes = localStorage.getItem('lexilearn-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    // 연습 기록 불러오기
    const history = speakingManager.getPracticeHistory();
    setPracticeHistory(history);
  }, []);

  const saveNotes = (newNotes: NoteItem[]) => {
    setNotes(newNotes);
    localStorage.setItem('lexilearn-notes', JSON.stringify(newNotes));
  };


  const removeNote = (id: string) => {
    saveNotes(notes.filter(note => note.id !== id));
  };

  const updateAttempts = (id: string) => {
    saveNotes(notes.map(note => 
      note.id === id 
        ? { ...note, attempts: note.attempts + 1, lastAttempt: new Date() }
        : note
    ));
  };

  const filteredNotes = selectedType === 'all' 
    ? notes 
    : notes.filter(note => note.type === selectedType);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📝 오답노트</h1>
          <p className="text-lg text-gray-600">틀린 문제들을 다시 복습해보세요</p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{notes.length}</div>
            <div className="text-gray-600">총 오답노트</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {notes.filter(note => note.type === 'expression').length}
            </div>
            <div className="text-gray-600">표현 오답</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {notes.filter(note => note.type === 'vocabulary').length}
            </div>
            <div className="text-gray-600">단어 오답</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {practiceHistory.length}
            </div>
            <div className="text-gray-600">연습 기록</div>
          </div>
        </div>

        {/* 필터 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">필터</h2>
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
              표현
            </button>
            <button
              onClick={() => setSelectedType('vocabulary')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedType === 'vocabulary'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              단어
            </button>
          </div>
        </div>

        {/* 오답노트 목록 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">오답노트 목록</h2>
          
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-xl text-gray-600 mb-2">아직 오답노트가 없습니다</p>
              <p className="text-gray-500">학습을 시작하고 틀린 문제들을 모아보세요!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotes.map(note => (
                <div key={note.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          note.type === 'expression' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {note.type === 'expression' ? '표현' : '단어'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(note.difficulty)}`}>
                          {getDifficultyText(note.difficulty)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{note.content}</h3>
                      <p className="text-lg text-gray-600 mb-2">{note.korean}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>시도 횟수: {note.attempts}회</span>
                        <span>마지막 시도: {note.lastAttempt.toLocaleDateString('ko-KR')}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateAttempts(note.id)}
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

        {/* 연습 기록 */}
        {practiceHistory.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">최근 연습 기록</h2>
            <div className="space-y-4">
              {practiceHistory.slice(-5).reverse().map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      {result.timestamp.toLocaleDateString('ko-KR')} {result.timestamp.toLocaleTimeString('ko-KR')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                      result.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {result.overallScore}점
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">정확도:</span>
                      <span className="ml-2 font-medium">{result.accuracy}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">유창성:</span>
                      <span className="ml-2 font-medium">{result.fluency}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">발음:</span>
                      <span className="ml-2 font-medium">{result.pronunciation}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{result.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
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
