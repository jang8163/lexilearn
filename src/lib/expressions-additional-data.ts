// LexiLearn - 추가 표현 데이터 (나머지 카테고리 및 중급/고급 레벨)
// 초급의 나머지 3개 카테고리 + 중급/고급 전체 = 5x6x4x10 = 1,200개

import { Expression } from './expressions-5400-complete';

export const ADDITIONAL_EXPRESSIONS_DATA: Expression[] = [
  // ===== 초급 레벨 (Beginner) - 나머지 3개 카테고리 =====
  
  // 초급 - 사회적 상호작용 (Social Interaction) - 4단계 x 10개 = 40개
  {
    id: 'beginner_social_1_1',
    english: 'Hello, how are you?',
    korean: '안녕하세요, 어떻게 지내세요?',
    level: 'beginner',
    category: 'social_interaction',
    stage: 1
  },
  {
    id: 'beginner_social_1_2',
    english: 'Nice to meet you.',
    korean: '만나서 반갑습니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 1
  },
  {
    id: 'beginner_social_1_3',
    english: 'What is your name?',
    korean: '이름이 무엇인가요?',
    level: 'beginner',
    category: 'social_interaction',
    stage: 1
  },
  {
    id: 'beginner_social_1_4',
    english: 'My name is Sarah.',
    korean: '제 이름은 사라입니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 1
  },
  {
    id: 'beginner_social_1_5',
    english: 'Where are you from?',
    korean: '어디서 오셨나요?',
    level: 'beginner',
    category: 'social_interaction',
    stage: 1
  },
  {
    id: 'beginner_social_1_6',
    english: 'I am from Seoul.',
    korean: '서울에서 왔습니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 1
  },
  {
    id: 'beginner_social_1_7',
    english: 'How old are you?',
    korean: '몇 살이세요?',
    level: 'beginner',
    category: 'social_interaction',
    stage: 1
  },
  {
    id: 'beginner_social_1_8',
    english: 'I am twenty-five years old.',
    korean: '25살입니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 1
  },
  {
    id: 'beginner_social_1_9',
    english: 'What do you do?',
    korean: '무엇을 하시나요?',
    level: 'beginner',
    category: 'social_interaction',
    stage: 1
  },
  {
    id: 'beginner_social_1_10',
    english: 'I am a teacher.',
    korean: '저는 선생님입니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 1
  },
  
  // 초급 - 사회적 상호작용 Stage 2
  {
    id: 'beginner_social_2_1',
    english: 'Do you have any hobbies?',
    korean: '취미가 있으신가요?',
    level: 'beginner',
    category: 'social_interaction',
    stage: 2
  },
  {
    id: 'beginner_social_2_2',
    english: 'I like reading books.',
    korean: '책 읽기를 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 2
  },
  {
    id: 'beginner_social_2_3',
    english: 'I enjoy playing sports.',
    korean: '운동하는 것을 즐깁니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 2
  },
  {
    id: 'beginner_social_2_4',
    english: 'I love listening to music.',
    korean: '음악 듣는 것을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 2
  },
  {
    id: 'beginner_social_2_5',
    english: 'I like watching movies.',
    korean: '영화 보는 것을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 2
  },
  {
    id: 'beginner_social_2_6',
    english: 'I enjoy cooking.',
    korean: '요리하는 것을 즐깁니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 2
  },
  {
    id: 'beginner_social_2_7',
    english: 'I like traveling.',
    korean: '여행하는 것을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 2
  },
  {
    id: 'beginner_social_2_8',
    english: 'I enjoy photography.',
    korean: '사진 찍는 것을 즐깁니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 2
  },
  {
    id: 'beginner_social_2_9',
    english: 'I like dancing.',
    korean: '춤추는 것을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 2
  },
  {
    id: 'beginner_social_2_10',
    english: 'I enjoy painting.',
    korean: '그림 그리는 것을 즐깁니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 2
  },
  
  // 초급 - 사회적 상호작용 Stage 3
  {
    id: 'beginner_social_3_1',
    english: 'What is your favorite food?',
    korean: '좋아하는 음식이 무엇인가요?',
    level: 'beginner',
    category: 'social_interaction',
    stage: 3
  },
  {
    id: 'beginner_social_3_2',
    english: 'I like Korean food.',
    korean: '한국 음식을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 3
  },
  {
    id: 'beginner_social_3_3',
    english: 'I love pizza.',
    korean: '피자를 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 3
  },
  {
    id: 'beginner_social_3_4',
    english: 'I enjoy Italian cuisine.',
    korean: '이탈리아 요리를 즐깁니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 3
  },
  {
    id: 'beginner_social_3_5',
    english: 'I like spicy food.',
    korean: '매운 음식을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 3
  },
  {
    id: 'beginner_social_3_6',
    english: 'I do not like seafood.',
    korean: '해산물을 좋아하지 않습니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 3
  },
  {
    id: 'beginner_social_3_7',
    english: 'I am vegetarian.',
    korean: '저는 채식주의자입니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 3
  },
  {
    id: 'beginner_social_3_8',
    english: 'I do not eat meat.',
    korean: '고기를 먹지 않습니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 3
  },
  {
    id: 'beginner_social_3_9',
    english: 'I have food allergies.',
    korean: '음식 알레르기가 있습니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 3
  },
  {
    id: 'beginner_social_3_10',
    english: 'I cannot eat nuts.',
    korean: '견과류를 먹을 수 없습니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 3
  },
  
  // 초급 - 사회적 상호작용 Stage 4
  {
    id: 'beginner_social_4_1',
    english: 'What is your favorite color?',
    korean: '좋아하는 색깔이 무엇인가요?',
    level: 'beginner',
    category: 'social_interaction',
    stage: 4
  },
  {
    id: 'beginner_social_4_2',
    english: 'I like blue.',
    korean: '파란색을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 4
  },
  {
    id: 'beginner_social_4_3',
    english: 'My favorite color is green.',
    korean: '좋아하는 색깔은 초록색입니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 4
  },
  {
    id: 'beginner_social_4_4',
    english: 'I love red.',
    korean: '빨간색을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 4
  },
  {
    id: 'beginner_social_4_5',
    english: 'I prefer black.',
    korean: '검은색을 선호합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 4
  },
  {
    id: 'beginner_social_4_6',
    english: 'I like bright colors.',
    korean: '밝은 색깔을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 4
  },
  {
    id: 'beginner_social_4_7',
    english: 'I prefer dark colors.',
    korean: '어두운 색깔을 선호합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 4
  },
  {
    id: 'beginner_social_4_8',
    english: 'I like pastel colors.',
    korean: '파스텔 색깔을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 4
  },
  {
    id: 'beginner_social_4_9',
    english: 'I love rainbow colors.',
    korean: '무지개 색깔을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 4
  },
  {
    id: 'beginner_social_4_10',
    english: 'I like neutral colors.',
    korean: '중성적인 색깔을 좋아합니다.',
    level: 'beginner',
    category: 'social_interaction',
    stage: 4
  },
  
  // 초급 - 전문적 소통 (Professional Communication) - 4단계 x 10개 = 40개
  {
    id: 'beginner_professional_1_1',
    english: 'Good morning, everyone.',
    korean: '좋은 아침입니다, 여러분.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 1
  },
  {
    id: 'beginner_professional_1_2',
    english: 'Thank you for coming.',
    korean: '참석해 주셔서 감사합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 1
  },
  {
    id: 'beginner_professional_1_3',
    english: 'Let me introduce myself.',
    korean: '자기소개를 하겠습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 1
  },
  {
    id: 'beginner_professional_1_4',
    english: 'I am the project manager.',
    korean: '저는 프로젝트 매니저입니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 1
  },
  {
    id: 'beginner_professional_1_5',
    english: 'I work in the IT department.',
    korean: 'IT 부서에서 일합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 1
  },
  {
    id: 'beginner_professional_1_6',
    english: 'I have five years of experience.',
    korean: '5년의 경험이 있습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 1
  },
  {
    id: 'beginner_professional_1_7',
    english: 'I specialize in web development.',
    korean: '웹 개발을 전문으로 합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 1
  },
  {
    id: 'beginner_professional_1_8',
    english: 'I am responsible for this project.',
    korean: '이 프로젝트를 담당하고 있습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 1
  },
  {
    id: 'beginner_professional_1_9',
    english: 'I report to the director.',
    korean: '이사에게 보고합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 1
  },
  {
    id: 'beginner_professional_1_10',
    english: 'I work with a team of five.',
    korean: '5명의 팀과 함께 일합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 1
  },
  
  // 초급 - 전문적 소통 Stage 2
  {
    id: 'beginner_professional_2_1',
    english: 'Let me explain the project.',
    korean: '프로젝트를 설명하겠습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 2
  },
  {
    id: 'beginner_professional_2_2',
    english: 'The deadline is next Friday.',
    korean: '마감일은 다음 주 금요일입니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 2
  },
  {
    id: 'beginner_professional_2_3',
    english: 'We need to finish this by tomorrow.',
    korean: '내일까지 이것을 마무리해야 합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 2
  },
  {
    id: 'beginner_professional_2_4',
    english: 'The budget is limited.',
    korean: '예산이 제한적입니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 2
  },
  {
    id: 'beginner_professional_2_5',
    english: 'We need more resources.',
    korean: '더 많은 자원이 필요합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 2
  },
  {
    id: 'beginner_professional_2_6',
    english: 'The client is not satisfied.',
    korean: '고객이 만족하지 않습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 2
  },
  {
    id: 'beginner_professional_2_7',
    english: 'We need to improve the quality.',
    korean: '품질을 개선해야 합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 2
  },
  {
    id: 'beginner_professional_2_8',
    english: 'The schedule is tight.',
    korean: '일정이 촉박합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 2
  },
  {
    id: 'beginner_professional_2_9',
    english: 'We need to work overtime.',
    korean: '야근을 해야 합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 2
  },
  {
    id: 'beginner_professional_2_10',
    english: 'The team is working hard.',
    korean: '팀이 열심히 일하고 있습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 2
  },
  
  // 초급 - 전문적 소통 Stage 3
  {
    id: 'beginner_professional_3_1',
    english: 'I need to update the status.',
    korean: '상태를 업데이트해야 합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 3
  },
  {
    id: 'beginner_professional_3_2',
    english: 'I will send you the report.',
    korean: '보고서를 보내드리겠습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 3
  },
  {
    id: 'beginner_professional_3_3',
    english: 'I need to check the data.',
    korean: '데이터를 확인해야 합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 3
  },
  {
    id: 'beginner_professional_3_4',
    english: 'I will review the document.',
    korean: '문서를 검토하겠습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 3
  },
  {
    id: 'beginner_professional_3_5',
    english: 'I need to contact the client.',
    korean: '고객에게 연락해야 합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 3
  },
  {
    id: 'beginner_professional_3_6',
    english: 'I will schedule a meeting.',
    korean: '회의를 예약하겠습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 3
  },
  {
    id: 'beginner_professional_3_7',
    english: 'I need to prepare the presentation.',
    korean: '발표를 준비해야 합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 3
  },
  {
    id: 'beginner_professional_3_8',
    english: 'I will organize the files.',
    korean: '파일을 정리하겠습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 3
  },
  {
    id: 'beginner_professional_3_9',
    english: 'I need to backup the data.',
    korean: '데이터를 백업해야 합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 3
  },
  {
    id: 'beginner_professional_3_10',
    english: 'I will test the system.',
    korean: '시스템을 테스트하겠습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 3
  },
  
  // 초급 - 전문적 소통 Stage 4
  {
    id: 'beginner_professional_4_1',
    english: 'The project is on track.',
    korean: '프로젝트가 순조롭게 진행되고 있습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 4
  },
  {
    id: 'beginner_professional_4_2',
    english: 'We are ahead of schedule.',
    korean: '일정보다 앞서 있습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 4
  },
  {
    id: 'beginner_professional_4_3',
    english: 'We are behind schedule.',
    korean: '일정보다 뒤처져 있습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 4
  },
  {
    id: 'beginner_professional_4_4',
    english: 'The quality is excellent.',
    korean: '품질이 훌륭합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 4
  },
  {
    id: 'beginner_professional_4_5',
    english: 'The client is happy.',
    korean: '고객이 만족합니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 4
  },
  {
    id: 'beginner_professional_4_6',
    english: 'The team is motivated.',
    korean: '팀이 동기부여되어 있습니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 4
  },
  {
    id: 'beginner_professional_4_7',
    english: 'The results are impressive.',
    korean: '결과가 인상적입니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 4
  },
  {
    id: 'beginner_professional_4_8',
    english: 'The feedback is positive.',
    korean: '피드백이 긍정적입니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 4
  },
  {
    id: 'beginner_professional_4_9',
    english: 'The performance is outstanding.',
    korean: '성과가 뛰어납니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 4
  },
  {
    id: 'beginner_professional_4_10',
    english: 'The project is successful.',
    korean: '프로젝트가 성공적입니다.',
    level: 'beginner',
    category: 'professional_communication',
    stage: 4
  }
];
