'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { stageManager, StageInfo } from '../lib/level-stage-manager';
import { speakingManager, SpeakingResult } from '../lib/speaking-practice';
import { getExpressionsByStage } from '../lib/expressions-5400-complete';
import { getVocabularyByStage } from '../lib/vocabulary-data-1350-new';

interface LearningItem {
  id: string;
  english: string;
  korean: string;
  level?: string;
  category?: string;
  stage?: number;
  pronunciation?: string;
  partOfSpeech?: string;
  definition?: string;
  example?: string;
  exampleKorean?: string;
}

function LearnPageContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as 'expression' | 'vocabulary';
  const level = searchParams.get('level') || 'beginner';
  const category = searchParams.get('category') || 'daily_conversation';
  const stage = parseInt(searchParams.get('stage') || '1');

  const [items, setItems] = useState<LearningItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [currentResult, setCurrentResult] = useState<SpeakingResult | null>(null);
  const [sessionResults, setSessionResults] = useState<SpeakingResult[]>([]);
  const [attempts, setAttempts] = useState<{[key: number]: number}>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [stageInfo, setStageInfo] = useState<StageInfo | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<LearningItem[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionTimeout, setRecognitionTimeout] = useState<NodeJS.Timeout | null>(null);
  const [recognitionError, setRecognitionError] = useState<string>('');

  useEffect(() => {
    // 음성 인식 지원 여부 확인
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSpeechSupported(!!SpeechRecognition);

    // 단계 정보 가져오기
    const info = stageManager.getStageInfo(level, category, stage);
    setStageInfo(info);

    // 학습 아이템 가져오기
    if (type === 'expression') {
      const expressions = getExpressionsByStage(level, category, stage);
      setItems(expressions);
    } else {
      const vocabulary = getVocabularyByStage(level, stage);
      // Vocabulary 타입을 LearningItem 타입으로 변환
      const vocabularyItems: LearningItem[] = vocabulary.map(vocab => ({
        id: vocab.id,
        english: vocab.english,
        korean: vocab.korean,
        level: vocab.level,
        stage: vocab.stage,
        pronunciation: vocab.pronunciation,
        partOfSpeech: vocab.partOfSpeech,
        definition: vocab.definition,
        example: vocab.example,
        exampleKorean: vocab.exampleKorean
      }));
      setItems(vocabularyItems);
    }
  }, [type, level, category, stage]);

  // 컴포넌트 언마운트 시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (recognitionTimeout) {
        clearTimeout(recognitionTimeout);
      }
    };
  }, [recognitionTimeout]);

  // 문제가 바뀔 때마다 상태 초기화 (시도 횟수는 유지)
  useEffect(() => {
    setCurrentResult(null);
    setRecognizedText('');
    setIsRecording(false);
    setRecognitionError('');
    
    // 타임아웃이 있다면 클리어
    if (recognitionTimeout) {
      clearTimeout(recognitionTimeout);
      setRecognitionTimeout(null);
    }
  }, [currentIndex, recognitionTimeout]);

  const currentItem = items[currentIndex];

  const playAudio = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    // TTS 시뮬레이션 (실제로는 Web Speech API 사용)
    const utterance = new SpeechSynthesisUtterance(currentItem.english);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
    };
    
    speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    // 이미 녹음 중이면 중복 실행 방지
    if (isRecording) {
      return;
    }
    
    try {
      setIsRecording(true);
      setRecognizedText('');
      setRecognitionError('');
      
      // 기존 타임아웃 클리어
      if (recognitionTimeout) {
        clearTimeout(recognitionTimeout);
      }
      
      if (speechSupported) {
        // Web Speech API 사용
        try {
          // 4초 타임아웃 설정
          const timeout = setTimeout(() => {
            console.log('음성 인식 타임아웃');
            speakingManager.stopSpeechRecognition();
            setIsRecording(false);
            setRecognizedText('');
            setRecognitionError('음성 인식 시간이 초과되었습니다. 다시 시도해주세요.');
            
            // 타임아웃 시에는 평가하지 않고 사용자에게 알림만 표시
            // 자동으로 시도 횟수를 차감하지 않음
          }, 4000);
          
          setRecognitionTimeout(timeout);
          
          const recognized = await speakingManager.startSpeechRecognition();
          
          // 성공적으로 인식된 경우 타임아웃 클리어
          if (recognitionTimeout) {
            clearTimeout(recognitionTimeout);
            setRecognitionTimeout(null);
          }
          
          setRecognizedText(recognized);
          
          // 실제 음성 인식 기반 평가
          const result = speakingManager.evaluatePronunciationWithSpeechRecognition(recognized, currentItem.english);
          setCurrentResult(result);
          setSessionResults(prev => [...prev, result]);
          setAttempts(prev => ({
            ...prev,
            [currentIndex]: (prev[currentIndex] || 0) + 1
          }));
          
          // 70점 미만이면 오답노트에 추가
          if (result.overallScore < 70) {
            setWrongAnswers(prev => [...prev, currentItem]);
          }
          
          // 3번 시도 후 자동으로 다음 문제로 넘어가기
          const currentAttempts = (attempts[currentIndex] || 0) + 1;
          if (currentAttempts >= 3 && result.overallScore < 70) {
            // 3번 시도 후 2초 뒤에 자동으로 다음 문제로 넘어가기
            setTimeout(() => {
              if (currentIndex < items.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setCurrentResult(null);
                setRecognizedText('');
              } else {
                completeStage();
              }
            }, 2000);
          }
          
        } catch (error) {
          console.error('음성 인식 실패:', error);
          
          // 타임아웃 클리어
          if (recognitionTimeout) {
            clearTimeout(recognitionTimeout);
            setRecognitionTimeout(null);
          }
          
          // 에러 메시지에 따라 다른 처리
          const errorMessage = error instanceof Error ? error.message : '음성 인식에 실패했습니다.';
          
          // aborted 오류는 사용자에게 알리지 않음 (의도적인 중단)
          if (!errorMessage.includes('aborted')) {
            setRecognitionError(errorMessage);
          }
        }
      } else {
        // 음성 인식 미지원 시에는 평가하지 않고 사용자에게 알림만 표시
        setRecognitionError('현재 브라우저에서 음성 인식을 지원하지 않습니다.');
        console.log('음성 인식 미지원 - 평가하지 않음');
      }
      
      setIsRecording(false);
      
    } catch (error) {
      console.error('녹음 시작 실패:', error);
      setIsRecording(false);
      
      // 에러 시 타임아웃 클리어
      if (recognitionTimeout) {
        clearTimeout(recognitionTimeout);
        setRecognitionTimeout(null);
      }
    }
  };

  const handleNext = () => {
    if (currentResult && currentResult.overallScore >= 70) {
      // 70점 이상일 때만 다음 문제로 진행
      if (currentIndex < items.length - 1) {
        // 다음 문제로 이동하면서 상태 초기화 (시도 횟수는 유지)
        setCurrentIndex(currentIndex + 1);
        setCurrentResult(null);
        setRecognizedText(''); // 인식된 텍스트 초기화
      } else {
        // 단계 완료
        completeStage();
      }
    }
  };

  const completeStage = () => {
    if (stageInfo) {
      const averageScore = sessionResults.length > 0 
        ? sessionResults.reduce((sum, result) => sum + result.overallScore, 0) / sessionResults.length
        : 0;
      
      stageManager.completeStage(level, category, stage, averageScore);
      
      // 오답노트 저장
      if (wrongAnswers.length > 0) {
        saveWrongAnswers();
      }
      
      setIsCompleted(true);
    }
  };

  const saveWrongAnswers = () => {
    const existingNotes = JSON.parse(localStorage.getItem('lexilearn-notes') || '[]');
    const newNotes = wrongAnswers.map((item, index) => {
      const itemIndex = items.findIndex(i => i.id === item.id);
      const itemAttempts = attempts[itemIndex] || 0;
      const itemResult = sessionResults.find(r => r.overallScore < 70);
      
      return {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: type,
        content: item.english,
        korean: item.korean,
        difficulty: 100 - (itemResult?.overallScore || 0),
        attempts: itemAttempts,
        lastAttempt: new Date(),
        mistakes: ['발음 정확도 부족'],
        level: level,
        category: type === 'expression' ? category : undefined,
        stage: stage
      };
    });
    
    localStorage.setItem('lexilearn-notes', JSON.stringify([...existingNotes, ...newNotes]));
  };

  const getCategoryName = (cat: string) => {
    const names: { [key: string]: string } = {
      'daily_conversation': '일상 대화',
      'business_english': '비즈니스 영어',
      'travel_phrases': '여행 표현',
      'academic_english': '학술 영어',
      'social_interaction': '사회적 상호작용',
      'professional_communication': '전문적 소통'
    };
    return names[cat] || cat;
  };

  const getLevelName = (lev: string) => {
    const names: { [key: string]: string } = {
      'beginner': '초급',
      'intermediate': '중급',
      'advanced': '고급'
    };
    return names[lev] || lev;
  };

  if (isCompleted) {
    const averageScore = sessionResults.length > 0 
      ? Math.round(sessionResults.reduce((sum, result) => sum + result.overallScore, 0) / sessionResults.length)
      : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="text-8xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">단계 완료!</h1>
            <p className="text-xl text-gray-600 mb-8">
              {getLevelName(level)} - {type === 'expression' ? getCategoryName(category) : '단어'} - {stage}단계를 완료했습니다!
            </p>
            
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl p-8 mb-8">
              <div className="text-6xl font-bold mb-2">{averageScore}점</div>
              <div className="text-xl">평균 점수</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">{items.length}</div>
                <div className="text-gray-600">총 문제</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-2xl font-bold text-green-600 mb-2">{sessionResults.length}</div>
                <div className="text-gray-600">총 시도</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {sessionResults.filter(r => r.overallScore >= 70).length}
                </div>
                <div className="text-gray-600">통과</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-2xl font-bold text-red-600 mb-2">{wrongAnswers.length}</div>
                <div className="text-gray-600">오답노트</div>
              </div>
            </div>

            {wrongAnswers.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">📝 오답노트에 저장됨</h3>
                <p className="text-yellow-700">
                  {wrongAnswers.length}개의 문제가 오답노트에 자동으로 저장되었습니다.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
                >
                  🏠 홈으로 돌아가기
                </button>
                
                <button
                  onClick={() => {
                    if (type === 'expression') {
                      window.location.href = `/expression/stages?level=${level}&category=${category}`;
                    } else {
                      window.location.href = `/vocabulary/stages?level=${level}`;
                    }
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
                >
                  📋 30단계 선택으로
                </button>
                
                <button
                  onClick={() => window.location.href = `/learn?type=${type}&level=${level}&category=${category}&stage=${stage + 1}`}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
                >
                  ➡️ 다음 단계로
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => window.location.href = type === 'expression' ? '/notes/expression' : '/notes/vocabulary'}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
                >
                  📝 오답노트 보기
                </button>
                
                <button
                  onClick={() => window.location.href = '/progress'}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
                >
                  📊 진행현황 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-xl text-gray-600">학습 내용을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <div className="mb-6">
          <button
            onClick={() => {
              if (type === 'expression') {
                window.location.href = `/expression/stages?level=${level}&category=${category}`;
              } else {
                window.location.href = `/vocabulary/stages?level=${level}`;
              }
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← 돌아가기
          </button>
        </div>

        {/* 진행 상황 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {type === 'expression' ? '표현 학습' : '단어 학습'}
            </h1>
            <span className="text-sm text-gray-500">
              문제 {currentIndex + 1} / {items.length}
            </span>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{getLevelName(level)} - {type === 'expression' ? getCategoryName(category) : '단어'} - {stage}단계</span>
              <span className="flex items-center space-x-2">
                <span>시도 횟수: {attempts[currentIndex] || 0}/3</span>
                <span>{stageInfo?.isUnlocked ? '🔓' : '🔒'}</span>
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 학습 내용 */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-8 text-center">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">{currentItem.english}</h2>
            <p className="text-3xl text-gray-600 mb-6">{currentItem.korean}</p>
            
            {/* 발음 기호 표시 (단어 학습일 때만) */}
            {type === 'vocabulary' && currentItem.pronunciation && (
              <div className="text-xl text-gray-500 mb-4">
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {currentItem.pronunciation}
                </span>
              </div>
            )}
            
            {/* 품사 표시 (단어 학습일 때만) */}
            {type === 'vocabulary' && currentItem.partOfSpeech && (
              <div className="text-lg text-gray-500 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {currentItem.partOfSpeech}
                </span>
              </div>
            )}
            
            {/* 레벨, 카테고리, 단계 표시 */}
            <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {getLevelName(currentItem.level || level)}
              </span>
              {type === 'expression' && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {getCategoryName(currentItem.category || category)}
                </span>
              )}
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                {currentItem.stage || stage}단계
              </span>
            </div>

            {/* 예문 표시 (단어 학습일 때만) */}
            {type === 'vocabulary' && currentItem.example && currentItem.exampleKorean && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-700 mb-3">📝 예문</h3>
                <div className="text-xl text-gray-800 mb-3 font-medium">
                  &ldquo;{currentItem.example}&rdquo;
                </div>
                <div className="text-lg text-gray-600">
                  &ldquo;{currentItem.exampleKorean}&rdquo;
                </div>
              </div>
            )}

            {/* 정의 표시 (단어 학습일 때만) */}
            {type === 'vocabulary' && currentItem.definition && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-bold text-gray-600 mb-2">정의</h3>
                <p className="text-gray-700 italic">{currentItem.definition}</p>
              </div>
            )}
          </div>

          {/* 인식된 텍스트 표시 */}
          {recognizedText && (
            <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
              <h3 className="text-sm font-bold text-blue-800 mb-2">🎤 인식된 텍스트</h3>
              <p className="text-blue-700 font-medium">&ldquo;{recognizedText}&rdquo;</p>
            </div>
          )}

          {/* 음성 인식 지원 여부 알림 */}
          {!speechSupported && (
            <div className="bg-yellow-50 rounded-xl p-4 mb-6 border border-yellow-200">
              <h3 className="text-sm font-bold text-yellow-800 mb-2">⚠️ 음성 인식 미지원</h3>
              <p className="text-yellow-700 text-sm">
                현재 브라우저에서 음성 인식을 지원하지 않습니다. Chrome이나 Edge 브라우저를 사용해보세요.
              </p>
            </div>
          )}

          {/* 음성 인식 에러 메시지 */}
          {recognitionError && (
            <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
              <h3 className="text-sm font-bold text-red-800 mb-2">❌ 음성 인식 오류</h3>
              <p className="text-red-700 text-sm">{recognitionError}</p>
            </div>
          )}

          {/* 발음 평가 결과 */}
          {currentResult && (
            <div className={`rounded-2xl p-6 mb-8 ${
              currentResult.overallScore >= 70 
                ? 'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200' 
                : 'bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200'
            }`}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">발음 평가 결과</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${currentResult.accuracy >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                    {currentResult.accuracy}%
                  </div>
                  <div className="text-sm text-gray-600">정확도</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${currentResult.fluency >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                    {currentResult.fluency}%
                  </div>
                  <div className="text-sm text-gray-600">유창성</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${currentResult.pronunciation >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                    {currentResult.pronunciation}%
                  </div>
                  <div className="text-sm text-gray-600">발음</div>
                </div>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${currentResult.overallScore >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                  {currentResult.overallScore}점
                </div>
                <p className="text-gray-600 mb-2">{currentResult.feedback}</p>
              </div>
            </div>
          )}

          {/* 듣기 및 녹음 버튼 */}
          <div className="mb-8 flex flex-col items-center space-y-4">
            {/* 듣기 버튼 */}
            <button
              onClick={playAudio}
              disabled={isPlaying}
              className={`font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all ${
                isPlaying 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isPlaying ? '🔊 재생 중...' : '🔊 듣기'}
            </button>

            {/* 녹음 버튼 */}
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={(attempts[currentIndex] || 0) >= 3 || isRecording}
                className={`font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all text-xl ${
                  (attempts[currentIndex] || 0) >= 3 || isRecording
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {(attempts[currentIndex] || 0) >= 3 ? '❌ 시도 횟수 초과' : 
                 speechSupported ? '🎤 음성 인식 시작' : '🎤 발음 연습하기'}
              </button>
            ) : (
              <div className="bg-red-500 text-white font-bold py-4 px-8 rounded-full shadow-lg text-xl animate-pulse">
                {speechSupported ? '🎤 음성 인식 중... 말씀해주세요!' : '🎤 녹음 중...'}
              </div>
            )}
          </div>

          {/* 정답(70점 이상)일 때만 다음 문제 버튼 표시 */}
          {currentResult && currentResult.overallScore >= 70 && (
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
              >
                {currentIndex < items.length - 1 ? '다음 문제 →' : '단계 완료!'}
              </button>
            </div>
          )}
          
          {/* 오답(70점 미만) 시에는 안내 메시지만 표시 */}
          {currentResult && currentResult.overallScore < 70 && (
            <div className="text-center">
              {(attempts[currentIndex] || 0) >= 3 ? (
                <p className="text-orange-600 font-medium">
                  3번 시도 완료. 잠시 후 다음 문제로 넘어갑니다...
                </p>
              ) : (
                <p className="text-red-600 font-medium">
                  70점 이상이 필요합니다. 다시 음성 인식 버튼을 눌러 시도해주세요.
                </p>
              )}
            </div>
          )}
        </div>

        {/* 세션 통계 */}
        {sessionResults.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">현재 세션 통계</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(sessionResults.reduce((sum, result) => sum + result.overallScore, 0) / sessionResults.length)}
                </div>
                <div className="text-sm text-gray-600">평균 점수</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{sessionResults.length}</div>
                <div className="text-sm text-gray-600">총 시도</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {sessionResults.filter(r => r.overallScore >= 70).length}
                </div>
                <div className="text-sm text-gray-600">통과</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{wrongAnswers.length}</div>
                <div className="text-sm text-gray-600">오답노트</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <LearnPageContent />
    </Suspense>
  );
}