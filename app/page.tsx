'use client';

export default function Home() {
  const handleExpressionLearning = () => {
    window.location.href = '/expression';
  };

  const handleVocabularyLearning = () => {
    window.location.href = '/vocabulary';
  };

  const handleProgressView = () => {
    window.location.href = '/progress';
  };

  const handleExpressionNotes = () => {
    window.location.href = '/notes/expression';
  };

  const handleVocabularyNotes = () => {
    window.location.href = '/notes/vocabulary';
  };

  const handleResetProgress = () => {
    if (confirm('정말로 진행상황을 초기화하시겠습니까?')) {
      // 실제 진행상황 초기화 로직
      localStorage.removeItem('lexilearn-notes');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">LexiLearn</h1>
          <p className="text-xl text-gray-600 mb-2">영어 발음 연습 AI 시스템</p>
          <p className="text-lg text-gray-500">표현과 단어로 영어 실력을 향상시켜보세요!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div 
            className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer border-4 border-transparent hover:border-blue-300 flex flex-col"
            onClick={handleExpressionLearning}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">💬</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">표현 학습</h3>
            <p className="text-lg text-gray-600 mb-6">실용적인 영어 표현을 학습하고 발음을 연습하세요</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">포함 내용:</p>
              <p className="font-medium text-gray-700">초급/중급/고급 × 6개 카테고리</p>
              <p className="font-medium text-gray-700">각 카테고리별 30단계</p>
              <p className="font-medium text-gray-700">총 5,400개 표현</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full mt-auto">표현 학습 시작 →</div>
          </div>
          
          <div 
            className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer border-4 border-transparent hover:border-orange-300 flex flex-col"
            onClick={handleVocabularyLearning}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">📚</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">단어 학습</h3>
            <p className="text-lg text-gray-600 mb-6">1,350개의 실제 단어로 어휘력을 늘려보세요</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">포함 내용:</p>
              <p className="font-medium text-gray-700">초급/중급/고급 × 30단계</p>
              <p className="font-medium text-gray-700">각 단계별 15개 단어</p>
              <p className="font-medium text-gray-700">총 1,350개 단어</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-full mt-auto mb-2">단어 학습 시작 →</div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={handleProgressView}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              📊 전체 진행 현황 보기
            </button>
            <button 
              onClick={handleExpressionNotes}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              📝 표현 오답노트
            </button>
            <button 
              onClick={handleVocabularyNotes}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              📝 단어 오답노트
            </button>
            <button 
              onClick={handleResetProgress}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              🔄 진행상황 초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}