// LexiLearn - 5,400개 영어 표현 데이터
// 초급/중급/고급 × 6개 카테고리 × 30단계

export interface Expression {
    id: string;
    english: string;
    korean: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    stage: number;
    audioUrl?: string;
  }
  
  export const EXPRESSION_CATEGORIES = [
    'daily_conversation',
    'business_english', 
    'travel_phrases',
    'academic_english',
    'social_interaction',
    'professional_communication'
  ] as const;
  
  export const EXPRESSION_LEVELS = [
    'beginner',
    'intermediate', 
    'advanced'
  ] as const;
  
  // 720개 표현 데이터 (3x6x4x10 = 720개)
  // 난이도별(3) x 카테고리별(6) x 4단계 x 10개 표현
  export const EXPRESSIONS_DATA: Expression[] = [
    // ===== 초급 레벨 (Beginner) =====
    
    // 초급 - 일상 대화 (Daily Conversation) - 4단계 x 10개 = 40개
    {
      id: 'beginner_daily_1_1',
      english: 'How are you today?',
      korean: '오늘 어떻게 지내세요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 1
    },
    {
      id: 'beginner_daily_1_2',
      english: 'Nice to meet you.',
      korean: '만나서 반갑습니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 1
    },
    {
      id: 'beginner_daily_1_3',
      english: 'What time is it?',
      korean: '지금 몇 시인가요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 1
    },
    {
      id: 'beginner_daily_1_4',
      english: 'Where are you from?',
      korean: '어디서 오셨나요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 1
    },
    {
      id: 'beginner_daily_1_5',
      english: 'How old are you?',
      korean: '몇 살이세요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 1
    },
    {
      id: 'beginner_daily_1_6',
      english: 'What is your name?',
      korean: '이름이 무엇인가요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 1
    },
    {
      id: 'beginner_daily_1_7',
      english: 'Thank you very much.',
      korean: '정말 감사합니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 1
    },
    {
      id: 'beginner_daily_1_8',
      english: 'You are welcome.',
      korean: '천만에요.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 1
    },
    {
      id: 'beginner_daily_1_9',
      english: 'Excuse me.',
      korean: '실례합니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 1
    },
    {
      id: 'beginner_daily_1_10',
      english: 'I am sorry.',
      korean: '죄송합니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 1
    },
    
    // 초급 - 일상 대화 Stage 2
    {
      id: 'beginner_daily_2_1',
      english: 'How much is this?',
      korean: '이것은 얼마인가요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 2
    },
    {
      id: 'beginner_daily_2_2',
      english: 'Can you help me?',
      korean: '도와주실 수 있나요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 2
    },
    {
      id: 'beginner_daily_2_3',
      english: 'I do not understand.',
      korean: '이해하지 못하겠습니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 2
    },
    {
      id: 'beginner_daily_2_4',
      english: 'Can you repeat that?',
      korean: '다시 말씀해 주실 수 있나요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 2
    },
    {
      id: 'beginner_daily_2_5',
      english: 'I am hungry.',
      korean: '배가 고픕니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 2
    },
    {
      id: 'beginner_daily_2_6',
      english: 'I am thirsty.',
      korean: '목이 마릅니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 2
    },
    {
      id: 'beginner_daily_2_7',
      english: 'I am tired.',
      korean: '피곤합니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 2
    },
    {
      id: 'beginner_daily_2_8',
      english: 'I am happy.',
      korean: '행복합니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 2
    },
    {
      id: 'beginner_daily_2_9',
      english: 'I am sad.',
      korean: '슬픕니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 2
    },
    {
      id: 'beginner_daily_2_10',
      english: 'I am busy.',
      korean: '바쁩니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 2
    },
    
    // 초급 - 일상 대화 Stage 3
    {
      id: 'beginner_daily_3_1',
      english: 'What do you like?',
      korean: '무엇을 좋아하세요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 3
    },
    {
      id: 'beginner_daily_3_2',
      english: 'I like music.',
      korean: '음악을 좋아합니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 3
    },
    {
      id: 'beginner_daily_3_3',
      english: 'I do not like coffee.',
      korean: '커피를 좋아하지 않습니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 3
    },
    {
      id: 'beginner_daily_3_4',
      english: 'What is your hobby?',
      korean: '취미가 무엇인가요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 3
    },
    {
      id: 'beginner_daily_3_5',
      english: 'I like reading books.',
      korean: '책 읽기를 좋아합니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 3
    },
    {
      id: 'beginner_daily_3_6',
      english: 'Do you have any pets?',
      korean: '애완동물을 기르고 계신가요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 3
    },
    {
      id: 'beginner_daily_3_7',
      english: 'I have a dog.',
      korean: '개를 한 마리 기릅니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 3
    },
    {
      id: 'beginner_daily_3_8',
      english: 'What is your favorite color?',
      korean: '좋아하는 색깔이 무엇인가요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 3
    },
    {
      id: 'beginner_daily_3_9',
      english: 'My favorite color is blue.',
      korean: '좋아하는 색깔은 파란색입니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 3
    },
    {
      id: 'beginner_daily_3_10',
      english: 'What is your favorite food?',
      korean: '좋아하는 음식이 무엇인가요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 3
    },
    
    // 초급 - 일상 대화 Stage 4
    {
      id: 'beginner_daily_4_1',
      english: 'I like Korean food.',
      korean: '한국 음식을 좋아합니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 4
    },
    {
      id: 'beginner_daily_4_2',
      english: 'What is the weather like?',
      korean: '날씨가 어떤가요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 4
    },
    {
      id: 'beginner_daily_4_3',
      english: 'It is sunny today.',
      korean: '오늘은 맑습니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 4
    },
    {
      id: 'beginner_daily_4_4',
      english: 'It is raining.',
      korean: '비가 오고 있습니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 4
    },
    {
      id: 'beginner_daily_4_5',
      english: 'It is cold today.',
      korean: '오늘은 춥습니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 4
    },
    {
      id: 'beginner_daily_4_6',
      english: 'It is hot today.',
      korean: '오늘은 덥습니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 4
    },
    {
      id: 'beginner_daily_4_7',
      english: 'What day is it today?',
      korean: '오늘은 무슨 요일인가요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 4
    },
    {
      id: 'beginner_daily_4_8',
      english: 'Today is Monday.',
      korean: '오늘은 월요일입니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 4
    },
    {
      id: 'beginner_daily_4_9',
      english: 'What month is it?',
      korean: '지금은 몇 월인가요?',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 4
    },
    {
      id: 'beginner_daily_4_10',
      english: 'It is January.',
      korean: '1월입니다.',
      level: 'beginner',
      category: 'daily_conversation',
      stage: 4
    },
    
    // 초급 - 비즈니스 영어 (Business English) - 4단계 x 10개 = 40개
    {
      id: 'beginner_business_1_1',
      english: 'Good morning.',
      korean: '좋은 아침입니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 1
    },
    {
      id: 'beginner_business_1_2',
      english: 'Good afternoon.',
      korean: '좋은 오후입니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 1
    },
    {
      id: 'beginner_business_1_3',
      english: 'Good evening.',
      korean: '좋은 저녁입니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 1
    },
    {
      id: 'beginner_business_1_4',
      english: 'How are you?',
      korean: '어떻게 지내세요?',
      level: 'beginner',
      category: 'business_english',
      stage: 1
    },
    {
      id: 'beginner_business_1_5',
      english: 'I am fine, thank you.',
      korean: '좋습니다, 감사합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 1
    },
    {
      id: 'beginner_business_1_6',
      english: 'Nice to meet you.',
      korean: '만나서 반갑습니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 1
    },
    {
      id: 'beginner_business_1_7',
      english: 'My name is John.',
      korean: '제 이름은 존입니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 1
    },
    {
      id: 'beginner_business_1_8',
      english: 'I work at Samsung.',
      korean: '삼성에서 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 1
    },
    {
      id: 'beginner_business_1_9',
      english: 'I am a manager.',
      korean: '저는 매니저입니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 1
    },
    {
      id: 'beginner_business_1_10',
      english: 'What do you do?',
      korean: '무엇을 하시나요?',
      level: 'beginner',
      category: 'business_english',
      stage: 1
    },
    
    // 초급 - 비즈니스 영어 Stage 2
    {
      id: 'beginner_business_2_1',
      english: 'I am an engineer.',
      korean: '저는 엔지니어입니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 2
    },
    {
      id: 'beginner_business_2_2',
      english: 'I work in marketing.',
      korean: '마케팅 부서에서 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 2
    },
    {
      id: 'beginner_business_2_3',
      english: 'I work in sales.',
      korean: '영업 부서에서 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 2
    },
    {
      id: 'beginner_business_2_4',
      english: 'I work in finance.',
      korean: '재무 부서에서 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 2
    },
    {
      id: 'beginner_business_2_5',
      english: 'I work in HR.',
      korean: '인사 부서에서 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 2
    },
    {
      id: 'beginner_business_2_6',
      english: 'I work in IT.',
      korean: 'IT 부서에서 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 2
    },
    {
      id: 'beginner_business_2_7',
      english: 'I work in production.',
      korean: '생산 부서에서 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 2
    },
    {
      id: 'beginner_business_2_8',
      english: 'I work in research.',
      korean: '연구 부서에서 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 2
    },
    {
      id: 'beginner_business_2_9',
      english: 'I work in design.',
      korean: '디자인 부서에서 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 2
    },
    {
      id: 'beginner_business_2_10',
      english: 'I work in customer service.',
      korean: '고객 서비스 부서에서 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 2
    },
    
    // 초급 - 비즈니스 영어 Stage 3
    {
      id: 'beginner_business_3_1',
      english: 'I have a meeting at 2 PM.',
      korean: '오후 2시에 회의가 있습니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 3
    },
    {
      id: 'beginner_business_3_2',
      english: 'I have a presentation today.',
      korean: '오늘 발표가 있습니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 3
    },
    {
      id: 'beginner_business_3_3',
      english: 'I have a deadline tomorrow.',
      korean: '내일 마감일이 있습니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 3
    },
    {
      id: 'beginner_business_3_4',
      english: 'I am busy today.',
      korean: '오늘 바쁩니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 3
    },
    {
      id: 'beginner_business_3_5',
      english: 'I am working on a project.',
      korean: '프로젝트를 진행하고 있습니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 3
    },
    {
      id: 'beginner_business_3_6',
      english: 'I need to finish this report.',
      korean: '이 보고서를 마무리해야 합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 3
    },
    {
      id: 'beginner_business_3_7',
      english: 'I have a lot of work.',
      korean: '할 일이 많습니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 3
    },
    {
      id: 'beginner_business_3_8',
      english: 'I work from 9 to 6.',
      korean: '9시부터 6시까지 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 3
    },
    {
      id: 'beginner_business_3_9',
      english: 'I work five days a week.',
      korean: '주 5일 일합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 3
    },
    {
      id: 'beginner_business_3_10',
      english: 'I have weekends off.',
      korean: '주말에는 쉽니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 3
    },
    
    // 초급 - 비즈니스 영어 Stage 4
    {
      id: 'beginner_business_4_1',
      english: 'I need to call my boss.',
      korean: '상사에게 전화해야 합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 4
    },
    {
      id: 'beginner_business_4_2',
      english: 'I need to send an email.',
      korean: '이메일을 보내야 합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 4
    },
    {
      id: 'beginner_business_4_3',
      english: 'I need to check my schedule.',
      korean: '일정을 확인해야 합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 4
    },
    {
      id: 'beginner_business_4_4',
      english: 'I need to prepare for the meeting.',
      korean: '회의 준비를 해야 합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 4
    },
    {
      id: 'beginner_business_4_5',
      english: 'I need to update the database.',
      korean: '데이터베이스를 업데이트해야 합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 4
    },
    {
      id: 'beginner_business_4_6',
      english: 'I need to contact the client.',
      korean: '고객에게 연락해야 합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 4
    },
    {
      id: 'beginner_business_4_7',
      english: 'I need to review the contract.',
      korean: '계약서를 검토해야 합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 4
    },
    {
      id: 'beginner_business_4_8',
      english: 'I need to organize the files.',
      korean: '파일을 정리해야 합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 4
    },
    {
      id: 'beginner_business_4_9',
      english: 'I need to attend the conference.',
      korean: '회의에 참석해야 합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 4
    },
    {
      id: 'beginner_business_4_10',
      english: 'I need to submit the proposal.',
      korean: '제안서를 제출해야 합니다.',
      level: 'beginner',
      category: 'business_english',
      stage: 4
    },
    
    // 초급 - 여행 표현 (Travel Phrases) - 4단계 x 10개 = 40개
    {
      id: 'beginner_travel_1_1',
      english: 'Where is the airport?',
      korean: '공항이 어디에 있나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 1
    },
    {
      id: 'beginner_travel_1_2',
      english: 'How much is the ticket?',
      korean: '표는 얼마인가요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 1
    },
    {
      id: 'beginner_travel_1_3',
      english: 'I need a hotel.',
      korean: '호텔이 필요합니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 1
    },
    {
      id: 'beginner_travel_1_4',
      english: 'Where is the bathroom?',
      korean: '화장실이 어디에 있나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 1
    },
    {
      id: 'beginner_travel_1_5',
      english: 'I am lost.',
      korean: '길을 잃었습니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 1
    },
    {
      id: 'beginner_travel_1_6',
      english: 'Can you help me?',
      korean: '도와주실 수 있나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 1
    },
    {
      id: 'beginner_travel_1_7',
      english: 'I do not speak English well.',
      korean: '영어를 잘 못합니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 1
    },
    {
      id: 'beginner_travel_1_8',
      english: 'Do you speak Korean?',
      korean: '한국어를 하시나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 1
    },
    {
      id: 'beginner_travel_1_9',
      english: 'I am from Korea.',
      korean: '한국에서 왔습니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 1
    },
    {
      id: 'beginner_travel_1_10',
      english: 'This is my first time here.',
      korean: '여기는 처음입니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 1
    },
    
    // 초급 - 여행 표현 Stage 2
    {
      id: 'beginner_travel_2_1',
      english: 'Where can I buy food?',
      korean: '음식을 어디서 살 수 있나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 2
    },
    {
      id: 'beginner_travel_2_2',
      english: 'I am hungry.',
      korean: '배가 고픕니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 2
    },
    {
      id: 'beginner_travel_2_3',
      english: 'What is this food?',
      korean: '이 음식은 무엇인가요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 2
    },
    {
      id: 'beginner_travel_2_4',
      english: 'Is it spicy?',
      korean: '맵나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 2
    },
    {
      id: 'beginner_travel_2_5',
      english: 'I do not like spicy food.',
      korean: '매운 음식을 좋아하지 않습니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 2
    },
    {
      id: 'beginner_travel_2_6',
      english: 'Can I have water?',
      korean: '물을 주실 수 있나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 2
    },
    {
      id: 'beginner_travel_2_7',
      english: 'The bill, please.',
      korean: '계산서 주세요.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 2
    },
    {
      id: 'beginner_travel_2_8',
      english: 'How much do I owe?',
      korean: '얼마를 내야 하나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 2
    },
    {
      id: 'beginner_travel_2_9',
      english: 'Do you accept credit cards?',
      korean: '신용카드를 받나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 2
    },
    {
      id: 'beginner_travel_2_10',
      english: 'Keep the change.',
      korean: '거스름돈은 가지세요.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 2
    },
    
    // 초급 - 여행 표현 Stage 3
    {
      id: 'beginner_travel_3_1',
      english: 'Where is the subway station?',
      korean: '지하철역이 어디에 있나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 3
    },
    {
      id: 'beginner_travel_3_2',
      english: 'How do I get to the city center?',
      korean: '시내 중심가로 어떻게 가나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 3
    },
    {
      id: 'beginner_travel_3_3',
      english: 'Is it far from here?',
      korean: '여기서 멀나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 3
    },
    {
      id: 'beginner_travel_3_4',
      english: 'How long does it take?',
      korean: '얼마나 걸리나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 3
    },
    {
      id: 'beginner_travel_3_5',
      english: 'Can I walk there?',
      korean: '걸어서 갈 수 있나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 3
    },
    {
      id: 'beginner_travel_3_6',
      english: 'I need a taxi.',
      korean: '택시가 필요합니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 3
    },
    {
      id: 'beginner_travel_3_7',
      english: 'Please take me to the hotel.',
      korean: '호텔로 데려다 주세요.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 3
    },
    {
      id: 'beginner_travel_3_8',
      english: 'How much is the fare?',
      korean: '요금은 얼마인가요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 3
    },
    {
      id: 'beginner_travel_3_9',
      english: 'Please stop here.',
      korean: '여기서 내려주세요.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 3
    },
    {
      id: 'beginner_travel_3_10',
      english: 'Thank you for the ride.',
      korean: '태워주셔서 감사합니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 3
    },
    
    // 초급 - 여행 표현 Stage 4
    {
      id: 'beginner_travel_4_1',
      english: 'I want to see the sights.',
      korean: '관광지를 보고 싶습니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 4
    },
    {
      id: 'beginner_travel_4_2',
      english: 'What is famous here?',
      korean: '여기서 유명한 것은 무엇인가요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 4
    },
    {
      id: 'beginner_travel_4_3',
      english: 'Can you recommend a place?',
      korean: '장소를 추천해 주실 수 있나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 4
    },
    {
      id: 'beginner_travel_4_4',
      english: 'I want to take photos.',
      korean: '사진을 찍고 싶습니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 4
    },
    {
      id: 'beginner_travel_4_5',
      english: 'Can you take a picture?',
      korean: '사진을 찍어 주실 수 있나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 4
    },
    {
      id: 'beginner_travel_4_6',
      english: 'I want to buy souvenirs.',
      korean: '기념품을 사고 싶습니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 4
    },
    {
      id: 'beginner_travel_4_7',
      english: 'Where can I buy souvenirs?',
      korean: '기념품을 어디서 살 수 있나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 4
    },
    {
      id: 'beginner_travel_4_8',
      english: 'This is too expensive.',
      korean: '이것은 너무 비쌉니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 4
    },
    {
      id: 'beginner_travel_4_9',
      english: 'Can you give me a discount?',
      korean: '할인해 주실 수 있나요?',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 4
    },
    {
      id: 'beginner_travel_4_10',
      english: 'I will think about it.',
      korean: '생각해 보겠습니다.',
      level: 'beginner',
      category: 'travel_phrases',
      stage: 4
    },
    
    // 초급 - 학술 영어 (Academic English) - 4단계 x 10개 = 40개
    {
      id: 'beginner_academic_1_1',
      english: 'I am a student.',
      korean: '저는 학생입니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 1
    },
    {
      id: 'beginner_academic_1_2',
      english: 'I study English.',
      korean: '영어를 공부합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 1
    },
    {
      id: 'beginner_academic_1_3',
      english: 'I go to university.',
      korean: '대학교에 다닙니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 1
    },
    {
      id: 'beginner_academic_1_4',
      english: 'What is your major?',
      korean: '전공이 무엇인가요?',
      level: 'beginner',
      category: 'academic_english',
      stage: 1
    },
    {
      id: 'beginner_academic_1_5',
      english: 'My major is computer science.',
      korean: '전공은 컴퓨터 공학입니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 1
    },
    {
      id: 'beginner_academic_1_6',
      english: 'I have classes today.',
      korean: '오늘 수업이 있습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 1
    },
    {
      id: 'beginner_academic_1_7',
      english: 'I have homework.',
      korean: '숙제가 있습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 1
    },
    {
      id: 'beginner_academic_1_8',
      english: 'I need to study.',
      korean: '공부해야 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 1
    },
    {
      id: 'beginner_academic_1_9',
      english: 'I have an exam tomorrow.',
      korean: '내일 시험이 있습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 1
    },
    {
      id: 'beginner_academic_1_10',
      english: 'I am nervous about the test.',
      korean: '시험이 걱정됩니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 1
    },
    
    // 초급 - 학술 영어 Stage 2
    {
      id: 'beginner_academic_2_1',
      english: 'I need to read this book.',
      korean: '이 책을 읽어야 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 2
    },
    {
      id: 'beginner_academic_2_2',
      english: 'I need to write an essay.',
      korean: '에세이를 써야 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 2
    },
    {
      id: 'beginner_academic_2_3',
      english: 'I need to do research.',
      korean: '연구를 해야 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 2
    },
    {
      id: 'beginner_academic_2_4',
      english: 'I need to prepare a presentation.',
      korean: '발표를 준비해야 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 2
    },
    {
      id: 'beginner_academic_2_5',
      english: 'I need to work on a project.',
      korean: '프로젝트를 진행해야 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 2
    },
    {
      id: 'beginner_academic_2_6',
      english: 'I need to meet with my professor.',
      korean: '교수님과 만나야 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 2
    },
    {
      id: 'beginner_academic_2_7',
      english: 'I need to go to the library.',
      korean: '도서관에 가야 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 2
    },
    {
      id: 'beginner_academic_2_8',
      english: 'I need to use the computer.',
      korean: '컴퓨터를 사용해야 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 2
    },
    {
      id: 'beginner_academic_2_9',
      english: 'I need to print my paper.',
      korean: '논문을 인쇄해야 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 2
    },
    {
      id: 'beginner_academic_2_10',
      english: 'I need to submit my assignment.',
      korean: '과제를 제출해야 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 2
    },
    
    // 초급 - 학술 영어 Stage 3
    {
      id: 'beginner_academic_3_1',
      english: 'I do not understand this concept.',
      korean: '이 개념을 이해하지 못하겠습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 3
    },
    {
      id: 'beginner_academic_3_2',
      english: 'Can you explain this again?',
      korean: '다시 설명해 주실 수 있나요?',
      level: 'beginner',
      category: 'academic_english',
      stage: 3
    },
    {
      id: 'beginner_academic_3_3',
      english: 'I have a question.',
      korean: '질문이 있습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 3
    },
    {
      id: 'beginner_academic_3_4',
      english: 'Can I ask you something?',
      korean: '뭔가 물어봐도 될까요?',
      level: 'beginner',
      category: 'academic_english',
      stage: 3
    },
    {
      id: 'beginner_academic_3_5',
      english: 'I need more time.',
      korean: '더 많은 시간이 필요합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 3
    },
    {
      id: 'beginner_academic_3_6',
      english: 'I am working hard.',
      korean: '열심히 하고 있습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 3
    },
    {
      id: 'beginner_academic_3_7',
      english: 'I want to learn more.',
      korean: '더 많이 배우고 싶습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 3
    },
    {
      id: 'beginner_academic_3_8',
      english: 'This is interesting.',
      korean: '이것은 흥미롭습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 3
    },
    {
      id: 'beginner_academic_3_9',
      english: 'This is difficult.',
      korean: '이것은 어렵습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 3
    },
    {
      id: 'beginner_academic_3_10',
      english: 'I need help.',
      korean: '도움이 필요합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 3
    },
    
    // 초급 - 학술 영어 Stage 4
    {
      id: 'beginner_academic_4_1',
      english: 'I want to improve my English.',
      korean: '영어 실력을 향상시키고 싶습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 4
    },
    {
      id: 'beginner_academic_4_2',
      english: 'I practice speaking every day.',
      korean: '매일 말하기 연습을 합니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 4
    },
    {
      id: 'beginner_academic_4_3',
      english: 'I read English books.',
      korean: '영어 책을 읽습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 4
    },
    {
      id: 'beginner_academic_4_4',
      english: 'I watch English movies.',
      korean: '영어 영화를 봅니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 4
    },
    {
      id: 'beginner_academic_4_5',
      english: 'I listen to English music.',
      korean: '영어 음악을 듣습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 4
    },
    {
      id: 'beginner_academic_4_6',
      english: 'I want to study abroad.',
      korean: '유학을 가고 싶습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 4
    },
    {
      id: 'beginner_academic_4_7',
      english: 'I want to get a scholarship.',
      korean: '장학금을 받고 싶습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 4
    },
    {
      id: 'beginner_academic_4_8',
      english: 'I want to graduate with honors.',
      korean: '우등으로 졸업하고 싶습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 4
    },
    {
      id: 'beginner_academic_4_9',
      english: 'I want to find a good job.',
      korean: '좋은 직장을 찾고 싶습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 4
    },
    {
      id: 'beginner_academic_4_10',
      english: 'I want to make a difference.',
      korean: '변화를 만들고 싶습니다.',
      level: 'beginner',
      category: 'academic_english',
      stage: 4
    }
  ];
  
  // 추가 표현 데이터 임포트
  import { ADDITIONAL_EXPRESSIONS_DATA } from './expressions-additional-data';
  
  // 전체 표현 데이터 (현재 240개 + 추가 240개 = 480개)
  export const ALL_EXPRESSIONS_DATA: Expression[] = [
    ...EXPRESSIONS_DATA,
    ...ADDITIONAL_EXPRESSIONS_DATA
  ];
  
  export function getExpressionsByLevel(level: string): Expression[] {
    return ALL_EXPRESSIONS_DATA.filter(expr => expr.level === level);
  }
  
  export function getExpressionsByCategory(category: string): Expression[] {
    return ALL_EXPRESSIONS_DATA.filter(expr => expr.category === category);
  }
  
export function getExpressionsByStage(level: string, category: string, stage: number): Expression[] {
  // 실제 데이터에서 해당 레벨, 카테고리, 단계의 표현들을 반환
  return ALL_EXPRESSIONS_DATA.filter(expr =>
    expr.level === level &&
    expr.category === category &&
    expr.stage === stage
  );
}