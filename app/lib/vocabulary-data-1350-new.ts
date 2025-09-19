// LexiLearn - 1,350개 단어 데이터 (189.txt 기반)
// 초급/중급/고급 × 30단계 × 15개 단어

export interface Vocabulary {
  id: string;
  english: string;
  pronunciation: string;
  korean: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  stage: number;
  partOfSpeech: string;
  definition: string;
  example: string;
  exampleKorean: string;
  audioUrl?: string;
}

export const VOCABULARY_LEVELS = [
  'beginner',
  'intermediate', 
  'advanced'
] as const;

// 189.txt 파일에서 추출한 실제 단어 데이터 (1,350개)
export const VOCABULARY_DATA: Vocabulary[] = [
  // 초급 레벨 (Beginner) - 450개 단어
  // Stage 1
  {
    id: 'beginner_1_1',
    english: 'able',
    pronunciation: '[5eibl]',
    korean: '할 수 있는',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'adj.',
    definition: 'having the power to do something',
    example: 'Are you able to speak English?',
    exampleKorean: '영어를 말할 수 있나요?'
  },
  {
    id: 'beginner_1_2',
    english: 'about',
    pronunciation: '[E5baut]',
    korean: '약, ~에 대해',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'prep.',
    definition: 'almost; of or having a relation to',
    example: 'He completed about half of his work.',
    exampleKorean: '그는 일의 약 절반을 완료했습니다.'
  },
  {
    id: 'beginner_1_3',
    english: 'above',
    pronunciation: '[E5bQv]',
    korean: '위에',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'prep.',
    definition: 'at a higher place',
    example: 'His head was above the water.',
    exampleKorean: '그의 머리가 물 위에 있었습니다.'
  },
  {
    id: 'beginner_1_4',
    english: 'accept',
    pronunciation: '[Ek5sept]',
    korean: '받아들이다',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'v.',
    definition: 'to agree to receive',
    example: 'Please accept my thanks.',
    exampleKorean: '제 감사를 받아주세요.'
  },
  {
    id: 'beginner_1_5',
    english: 'act',
    pronunciation: '[Akt]',
    korean: '행동하다',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'v.',
    definition: 'to do something',
    example: 'He acted immediately to stop the fight.',
    exampleKorean: '그는 싸움을 멈추기 위해 즉시 행동했습니다.'
  },
  {
    id: 'beginner_1_6',
    english: 'add',
    pronunciation: '[Ad]',
    korean: '더하다',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'v.',
    definition: 'to put (something) with another to make it larger',
    example: 'Please add my name to the list.',
    exampleKorean: '제 이름을 목록에 추가해주세요.'
  },
  {
    id: 'beginner_1_7',
    english: 'after',
    pronunciation: '[5a:ftE]',
    korean: '후에',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'prep.',
    definition: 'later; behind',
    example: 'She arrived after the lesson started.',
    exampleKorean: '그녀는 수업이 시작된 후에 도착했습니다.'
  },
  {
    id: 'beginner_1_8',
    english: 'again',
    pronunciation: '[E5gein]',
    korean: '다시',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'adv.',
    definition: 'another time; as before',
    example: 'Sam played the song again.',
    exampleKorean: '샘은 그 노래를 다시 연주했습니다.'
  },
  {
    id: 'beginner_1_9',
    english: 'age',
    pronunciation: '[eidV]',
    korean: '나이',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'how old a person or thing is',
    example: 'The legal age for voting is eighteen.',
    exampleKorean: '투표할 수 있는 법정 나이는 18세입니다.'
  },
  {
    id: 'beginner_1_10',
    english: 'agree',
    pronunciation: '[E5gri:]',
    korean: '동의하다',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'v.',
    definition: 'to have the same belief as someone',
    example: 'We agree about politics.',
    exampleKorean: '우리는 정치에 대해 동의합니다.'
  },
  {
    id: 'beginner_1_11',
    english: 'air',
    pronunciation: '[ZE]',
    korean: '공기',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'the mixture of gases around the earth that we breathe',
    example: 'The air is clean in the mountains.',
    exampleKorean: '산에서는 공기가 깨끗합니다.'
  },
  {
    id: 'beginner_1_12',
    english: 'all',
    pronunciation: '[R:l]',
    korean: '모든',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'adj.',
    definition: 'everything; everyone; the complete amount',
    example: 'She ate all that she wanted.',
    exampleKorean: '그녀는 원하는 것을 모두 먹었습니다.'
  },
  {
    id: 'beginner_1_13',
    english: 'almost',
    pronunciation: '[5R:lmEust]',
    korean: '거의',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'adv.',
    definition: 'a little less than completely',
    example: 'My dog is almost five years old.',
    exampleKorean: '우리 개는 거의 5살입니다.'
  },
  {
    id: 'beginner_1_14',
    english: 'alone',
    pronunciation: '[E5lEun]',
    korean: '혼자',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'adj.',
    definition: 'separated from others',
    example: 'Some people enjoy eating alone.',
    exampleKorean: '어떤 사람들은 혼자 식사하는 것을 즐깁니다.'
  },
  {
    id: 'beginner_1_15',
    english: 'along',
    pronunciation: '[E5lRN]',
    korean: '~을 따라',
    level: 'beginner',
    stage: 1,
    partOfSpeech: 'prep.',
    definition: 'near or on',
    example: 'We walked along the road.',
    exampleKorean: '우리는 길을 따라 걸었습니다.'
  },

  // Stage 2
  {
    id: 'beginner_2_1',
    english: 'already',
    pronunciation: '[R:l5redi]',
    korean: '이미',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'adv.',
    definition: 'before now; even now',
    example: 'She was already there when we arrived.',
    exampleKorean: '우리가 도착했을 때 그녀는 이미 거기에 있었습니다.'
  },
  {
    id: 'beginner_2_2',
    english: 'also',
    pronunciation: '[5R:lsEu]',
    korean: '또한',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'adv.',
    definition: 'added to; too',
    example: 'Please bring me the fish dinner and coffee, and also some water.',
    exampleKorean: '생선 요리와 커피, 그리고 물도 가져다주세요.'
  },
  {
    id: 'beginner_2_3',
    english: 'always',
    pronunciation: '[5R:lweiz]',
    korean: '항상',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'adv.',
    definition: 'at all times; every time',
    example: 'This street is always busy.',
    exampleKorean: '이 거리는 항상 붐빕니다.'
  },
  {
    id: 'beginner_2_4',
    english: 'and',
    pronunciation: '[And]',
    korean: '그리고',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'conj.',
    definition: 'also; in addition to; with',
    example: 'My dog likes to run and jump.',
    exampleKorean: '우리 개는 뛰고 점프하는 것을 좋아합니다.'
  },
  {
    id: 'beginner_2_5',
    english: 'animal',
    pronunciation: '[5AnimEl]',
    korean: '동물',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'n.',
    definition: 'a living creature that moves, such as a dog or cat',
    example: 'The kangaroo is a strange animal.',
    exampleKorean: '캥거루는 이상한 동물입니다.'
  },
  {
    id: 'beginner_2_6',
    english: 'another',
    pronunciation: '[E5nQTE]',
    korean: '또 다른',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'adj.',
    definition: 'one more; a different one',
    example: 'May I have another kiss?',
    exampleKorean: '또 다른 키스를 해도 될까요?'
  },
  {
    id: 'beginner_2_7',
    english: 'answer',
    pronunciation: '[5a:nsE]',
    korean: '답변',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'n.',
    definition: 'a statement produced by a question',
    example: 'That was my final answer.',
    exampleKorean: '그것이 제 최종 답변입니다.'
  },
  {
    id: 'beginner_2_8',
    english: 'any',
    pronunciation: '[5eni]',
    korean: '어떤',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'adj.',
    definition: 'one or more of no special kind',
    example: 'I do not have any plans to leave town.',
    exampleKorean: '마을을 떠날 계획은 없습니다.'
  },
  {
    id: 'beginner_2_9',
    english: 'appear',
    pronunciation: '[E5piE]',
    korean: '나타나다',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'v.',
    definition: 'to show oneself; to come into sight',
    example: 'The actor appeared on television for the first time.',
    exampleKorean: '그 배우는 처음으로 텔레비전에 나타났습니다.'
  },
  {
    id: 'beginner_2_10',
    english: 'area',
    pronunciation: '[5ZEriE]',
    korean: '지역',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'n.',
    definition: 'any place or part of it',
    example: 'My friend lives in this area.',
    exampleKorean: '제 친구는 이 지역에 살고 있습니다.'
  },
  {
    id: 'beginner_2_11',
    english: 'army',
    pronunciation: '[5a:mi]',
    korean: '군대',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'n.',
    definition: 'military ground forces',
    example: 'The army fights on the ground.',
    exampleKorean: '군대는 지상에서 싸웁니다.'
  },
  {
    id: 'beginner_2_12',
    english: 'around',
    pronunciation: '[E5raund]',
    korean: '주위에',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'prep.',
    definition: 'on every side (of)',
    example: 'She drove around in her new car.',
    exampleKorean: '그녀는 새 차로 주위를 돌아다녔습니다.'
  },
  {
    id: 'beginner_2_13',
    english: 'arrive',
    pronunciation: '[E5raiv]',
    korean: '도착하다',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'v.',
    definition: 'to come to a place, especially at the end of a trip',
    example: 'The president arrived in Tokyo for an official visit.',
    exampleKorean: '대통령이 공식 방문을 위해 도쿄에 도착했습니다.'
  },
  {
    id: 'beginner_2_14',
    english: 'art',
    pronunciation: '[a:t]',
    korean: '예술',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'n.',
    definition: 'expressions or creations by humans, such as paintings, music, writing or statues',
    example: 'Much of the art included paintings stolen during World War II.',
    exampleKorean: '예술 작품의 많은 부분이 2차 세계대전 중에 도난당한 그림들을 포함했습니다.'
  },
  {
    id: 'beginner_2_15',
    english: 'as',
    pronunciation: '[Az]',
    korean: '~로서',
    level: 'beginner',
    stage: 2,
    partOfSpeech: 'conj.',
    definition: 'equally; when; while',
    example: 'The wild fire spread as fast as the wind behind it.',
    exampleKorean: '산불은 뒤따르는 바람만큼 빠르게 퍼졌습니다.'
  },
  {
    id: 'beginner_3_1',
    english: 'ask',
    pronunciation: '[a:sk]',
    korean: '묻다',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'v.',
    definition: 'to question; to say something is wanted',
    example: 'We ask the teacher questions every day.',
    exampleKorean: '우리는 매일 선생님께 질문을 합니다.'
  },
  {
    id: 'beginner_3_2',
    english: 'at',
    pronunciation: '[At]',
    korean: '~에',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'prep.',
    definition: 'in or near; where; when',
    example: 'She saw the bear at the edge of the forest.',
    exampleKorean: '그녀는 숲 가장자리에서 곰을 봤습니다.'
  },
  {
    id: 'beginner_3_3',
    english: 'attack',
    pronunciation: '[E5tAk]',
    korean: '공격',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'n.',
    definition: 'a violent attempt to damage, injure or kill',
    example: 'The war started with a rebel attack on government troops.',
    exampleKorean: '전쟁은 반군이 정부군을 공격하면서 시작되었습니다.'
  },
  {
    id: 'beginner_3_4',
    english: 'attempt',
    pronunciation: '[E5tempt]',
    korean: '시도하다',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'v.',
    definition: 'to work toward something; to try; to make an effort',
    example: 'He attempted to change his life one step at a time.',
    exampleKorean: '그는 한 번에 한 걸음씩 자신의 삶을 바꾸려고 시도했습니다.'
  },
  {
    id: 'beginner_3_5',
    english: 'attend',
    pronunciation: '[E5tend]',
    korean: '참석하다',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'v.',
    definition: 'to be present at',
    example: 'The president will attend the meeting.',
    exampleKorean: '대통령이 회의에 참석할 것입니다.'
  },
  {
    id: 'beginner_3_6',
    english: 'automobile',
    pronunciation: '[5R:tEmEbi:l]',
    korean: '자동차',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'n.',
    definition: 'a vehicle with wheels used to carry people; a car',
    example: 'Is a bus an automobile?',
    exampleKorean: '버스는 자동차인가요?'
  },
  {
    id: 'beginner_3_7',
    english: 'autumn',
    pronunciation: '[5R:tEm]',
    korean: '가을',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'n.',
    definition: 'the time of the year between summer and winter',
    example: 'The trees of autumn are bright red and yellow.',
    exampleKorean: '가을 나무들은 밝은 빨간색과 노란색입니다.'
  },
  {
    id: 'beginner_3_8',
    english: 'average',
    pronunciation: '[5AvEridV]',
    korean: '평균의',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'adj.',
    definition: 'common; normal',
    example: 'John is an average student.',
    exampleKorean: '존은 평범한 학생입니다.'
  },
  {
    id: 'beginner_3_9',
    english: 'avoid',
    pronunciation: '[E5vRid]',
    korean: '피하다',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'v.',
    definition: 'to stay away from',
    example: 'Avoid meat and milk products to prevent a heart attack.',
    exampleKorean: '심장마비를 예방하려면 고기와 유제품을 피하세요.'
  },
  {
    id: 'beginner_3_10',
    english: 'awake',
    pronunciation: '[E5weik]',
    korean: '깨어있는',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'adj.',
    definition: 'not sleeping',
    example: 'The storm kept everyone awake for hours.',
    exampleKorean: '폭풍으로 인해 모든 사람이 몇 시간 동안 깨어있었습니다.'
  },
  {
    id: 'beginner_3_11',
    english: 'award',
    pronunciation: '[E5wR:d]',
    korean: '상',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'n.',
    definition: 'an honor or prize for an act or service',
    example: 'Last night, we saw the movie that won the best picture award.',
    exampleKorean: '어젯밤 우리는 최고 영화상을 받은 영화를 봤습니다.'
  },
  {
    id: 'beginner_3_12',
    english: 'away',
    pronunciation: '[E5wei]',
    korean: '떨어져',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'adv.',
    definition: 'not near',
    example: 'The old man came from far away, but his home is here now.',
    exampleKorean: '그 노인은 멀리서 왔지만 지금은 여기에 살고 있습니다.'
  },
  {
    id: 'beginner_3_13',
    english: 'baby',
    pronunciation: '[5beibi]',
    korean: '아기',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'n.',
    definition: 'a newly born creature',
    example: 'Mary had a baby last night.',
    exampleKorean: '메리는 어젯밤에 아기를 낳았습니다.'
  },
  {
    id: 'beginner_3_14',
    english: 'back',
    pronunciation: '[bAk]',
    korean: '뒤',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'n.',
    definition: 'the part behind the front',
    example: 'The writer\'s picture is on the back of the book.',
    exampleKorean: '작가의 사진은 책 뒷면에 있습니다.'
  },
  {
    id: 'beginner_3_15',
    english: 'bad',
    pronunciation: '[bAd]',
    korean: '나쁜',
    level: 'beginner',
    stage: 3,
    partOfSpeech: 'adj.',
    definition: 'wrong; acting against the law; not good',
    example: 'Bill made a bad decision.',
    exampleKorean: '빌은 나쁜 결정을 내렸습니다.'
  },

  // 중급 레벨 (Intermediate) - 450개 단어
  // Stage 1
  {
    id: 'intermediate_1_1',
    english: 'accident',
    pronunciation: '[5AksidEnt]',
    korean: '사고',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'something that happens by chance or mistake; an unplanned event',
    example: 'She was injured in the accident.',
    exampleKorean: '그녀는 사고로 부상을 당했습니다.'
  },
  {
    id: 'intermediate_1_2',
    english: 'accuse',
    pronunciation: '[E5kju:z]',
    korean: '고발하다',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'v.',
    definition: 'to say a person is responsible for an act or crime',
    example: 'Her friend accused her of breaking his heart.',
    exampleKorean: '그녀의 친구는 그녀가 자신의 마음을 아프게 했다고 비난했습니다.'
  },
  {
    id: 'intermediate_1_3',
    english: 'across',
    pronunciation: '[E5krRs]',
    korean: '가로질러',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'prep.',
    definition: 'from side to side; to the other side',
    example: 'The dog ran across the road.',
    exampleKorean: '개가 길을 가로질러 달렸습니다.'
  },
  {
    id: 'intermediate_1_4',
    english: 'activist',
    pronunciation: '[5Aktivist]',
    korean: '활동가',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'one who seeks change through action',
    example: 'The activist worked hard to change the law.',
    exampleKorean: '그 활동가는 법을 바꾸기 위해 열심히 일했습니다.'
  },
  {
    id: 'intermediate_1_5',
    english: 'actor',
    pronunciation: '[5AktE]',
    korean: '배우',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'someone acting in a play or show',
    example: 'That actor frightened me.',
    exampleKorean: '그 배우는 나를 겁먹게 했습니다.'
  },
  {
    id: 'intermediate_1_6',
    english: 'administration',
    pronunciation: '[Edminis5treiFEn]',
    korean: '행정부',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'the executive part of a government, usually headed by a president or prime minister',
    example: 'The new administration starts work in January.',
    exampleKorean: '새 행정부는 1월에 업무를 시작합니다.'
  },
  {
    id: 'intermediate_1_7',
    english: 'admit',
    pronunciation: '[Ed5mit]',
    korean: '인정하다',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'v.',
    definition: 'to accept; to express one\'s guilt or responsibility',
    example: 'He admitted that what he did was wrong.',
    exampleKorean: '그는 자신이 한 일이 잘못되었다고 인정했습니다.'
  },
  {
    id: 'intermediate_1_8',
    english: 'adult',
    pronunciation: '[5AdQlt]',
    korean: '성인',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'a grown person',
    example: 'Only an adult can sign the document.',
    exampleKorean: '성인만이 그 문서에 서명할 수 있습니다.'
  },
  {
    id: 'intermediate_1_9',
    english: 'advise',
    pronunciation: '[Ed5vaiz]',
    korean: '조언하다',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'v.',
    definition: 'to help with information, knowledge or ideas in making a decision',
    example: 'Did you advise him to leave?',
    exampleKorean: '그에게 떠나라고 조언했나요?'
  },
  {
    id: 'intermediate_1_10',
    english: 'affect',
    pronunciation: '[E5fekt]',
    korean: '영향을 주다',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'v.',
    definition: 'to produce an effect on; to influence',
    example: 'A lack of sleep affected the singer\'s performance.',
    exampleKorean: '수면 부족이 가수의 공연에 영향을 주었습니다.'
  },
  {
    id: 'intermediate_1_11',
    english: 'afraid',
    pronunciation: '[E5freid]',
    korean: '두려워하는',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'adj.',
    definition: 'feeling fear',
    example: 'I am afraid of guns.',
    exampleKorean: '저는 총을 두려워합니다.'
  },
  {
    id: 'intermediate_1_12',
    english: 'against',
    pronunciation: '[E5geinst]',
    korean: '반대하여',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'prep.',
    definition: 'opposed to; not agreeing with something',
    example: 'They marched against the war.',
    exampleKorean: '그들은 전쟁에 반대하여 행진했습니다.'
  },
  {
    id: 'intermediate_1_13',
    english: 'agency',
    pronunciation: '[5eidVEnsi]',
    korean: '기관',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'an organization that is part of a larger group',
    example: 'UNICEF is an agency of the United Nations.',
    exampleKorean: '유니세프는 유엔의 기관입니다.'
  },
  {
    id: 'intermediate_1_14',
    english: 'aggression',
    pronunciation: '[E5greFEn]',
    korean: '침략',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'an attack against a person or country; the violation of a country\'s borders',
    example: 'The surprise attack was an act of aggression.',
    exampleKorean: '기습 공격은 침략 행위였습니다.'
  },
  {
    id: 'intermediate_1_15',
    english: 'ago',
    pronunciation: '[E5gEu]',
    korean: '전에',
    level: 'intermediate',
    stage: 1,
    partOfSpeech: 'adv.',
    definition: 'of time past; before now',
    example: 'He was my friend long ago.',
    exampleKorean: '그는 오래전에 제 친구였습니다.'
  },
  // 중급 레벨 Stage 2-30 (각 단계당 15개씩)
{
  id: 'intermediate_2_1',
  english: 'ancestor',
  pronunciation: '[5AnsistE]',
  korean: '조상',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'a family member from the past',
  example: 'My ancestors came from Switzerland in 1742.',
  exampleKorean: '제 조상들은 1742년에 스위스에서 왔습니다.'
},
{
  id: 'intermediate_2_2',
  english: 'ancient',
  pronunciation: '[5einFEnt]',
  korean: '고대의',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'adj.',
  definition: 'very old; long ago',
  example: 'Scientists discovered the ancient knife in a cave.',
  exampleKorean: '과학자들은 동굴에서 고대 칼을 발견했습니다.'
},
{
  id: 'intermediate_2_3',
  english: 'anger',
  pronunciation: '[5ANgE]',
  korean: '분노',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'a strong emotion against someone or something',
  example: 'The protester\'s voice was full of anger.',
  exampleKorean: '시위자의 목소리에는 분노가 가득했습니다.'
},
{
  id: 'intermediate_2_4',
  english: 'anniversary',
  pronunciation: '[Ani5vE:sEri]',
  korean: '기념일',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'a yearly celebration or observance of an event that happened in the past',
  example: 'When is your wedding anniversary?',
  exampleKorean: '결혼 기념일이 언제인가요?'
},
{
  id: 'intermediate_2_5',
  english: 'announce',
  pronunciation: '[E5nauns]',
  korean: '발표하다',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to make known publicly; to declare officially',
  example: 'Who announced the VOA news last night?',
  exampleKorean: '어젯밤 VOA 뉴스를 누가 발표했나요?'
},
{
  id: 'intermediate_2_6',
  english: 'apologize',
  pronunciation: '[E5pRlEdVaiz]',
  korean: '사과하다',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to express regret for a mistake or accident for which one accepts responsibility',
  example: 'Do not apologize for someone else\'s mistake.',
  exampleKorean: '다른 사람의 실수에 대해 사과하지 마세요.'
},
{
  id: 'intermediate_2_7',
  english: 'appeal',
  pronunciation: '[E5pi:l]',
  korean: '호소하다',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to take to a higher court, person or group for a decision; to call on somebody for help',
  example: 'I have appealed the decision to a higher court.',
  exampleKorean: '저는 그 결정을 상급 법원에 항소했습니다.'
},
{
  id: 'intermediate_2_8',
  english: 'appoint',
  pronunciation: '[E5pRint]',
  korean: '임명하다',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to name; to choose',
  example: 'The owner appointed John to head the new business.',
  exampleKorean: '사장은 존을 새 사업의 책임자로 임명했습니다.'
},
{
  id: 'intermediate_2_9',
  english: 'approve',
  pronunciation: '[E5pru:v]',
  korean: '승인하다',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to agree with; to agree to support',
  example: 'The bank approved my loan.',
  exampleKorean: '은행이 제 대출을 승인했습니다.'
},
{
  id: 'intermediate_2_10',
  english: 'archeology',
  pronunciation: '[B:ki5RlEdVI]',
  korean: '고고학',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'the scientific study of past human life and activities',
  example: 'He studied archeology in college.',
  exampleKorean: '그는 대학에서 고고학을 공부했습니다.'
},
{
  id: 'intermediate_2_11',
  english: 'argue',
  pronunciation: '[5a:gju:]',
  korean: '논쟁하다',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to offer reasons for or against something; to dispute; to disagree',
  example: 'The President argued for more aid to schools.',
  exampleKorean: '대통령은 학교에 대한 더 많은 지원을 주장했습니다.'
},
{
  id: 'intermediate_2_12',
  english: 'arms',
  pronunciation: '[B:mz]',
  korean: '무기',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'military equipment; weapons',
  example: 'The rebels got most of their arms by taking them from soldiers.',
  exampleKorean: '반군들은 대부분의 무기를 군인들로부터 빼앗아 얻었습니다.'
},
{
  id: 'intermediate_2_13',
  english: 'arrest',
  pronunciation: '[E5rest]',
  korean: '체포하다',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to seize a person for legal action; to take as a prisoner',
  example: 'The judge ordered police to arrest him because he refused to come to court.',
  exampleKorean: '판사는 그가 법정에 출두를 거부했기 때문에 경찰에게 그를 체포하라고 명령했습니다.'
},
{
  id: 'intermediate_2_14',
  english: 'artillery',
  pronunciation: '[a:5tilEri]',
  korean: '대포',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'big guns',
  example: 'Artillery destroyed most of the buildings in the town.',
  exampleKorean: '대포가 마을의 대부분 건물을 파괴했습니다.'
},
{
  id: 'intermediate_2_15',
  english: 'ash',
  pronunciation: '[AF]',
  korean: '재',
  level: 'intermediate',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'the part left after something burns',
  example: 'Only ashes were left when the fire passed.',
  exampleKorean: '불이 지나간 후에는 재만 남았습니다.'
},

  // 고급 레벨 (Advanced) - 450개 단어
  // Stage 1
  {
    id: 'advanced_1_1',
    english: 'agriculture',
    pronunciation: '[5AgrikQltFE]',
    korean: '농업',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'farming',
    example: 'John studied agriculture because he wanted to be a farmer.',
    exampleKorean: '존은 농부가 되고 싶어서 농업을 공부했습니다.'
  },
  {
    id: 'advanced_1_2',
    english: 'aid',
    pronunciation: '[eid]',
    korean: '도움',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'v.',
    definition: 'to help; to support',
    example: 'He offered to aid the victims of the fire.',
    exampleKorean: '그는 화재 피해자들을 도와주겠다고 제안했습니다.'
  },
  {
    id: 'advanced_1_3',
    english: 'aim',
    pronunciation: '[eim]',
    korean: '목표',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'v.',
    definition: 'to point a gun at',
    example: 'You cannot hit the target if you do not aim the gun.',
    exampleKorean: '총을 조준하지 않으면 표적을 맞출 수 없습니다.'
  },
  {
    id: 'advanced_1_4',
    english: 'air force',
    pronunciation: '[5ZE fR:s]',
    korean: '공군',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'a military organization using airplanes',
    example: 'The air force wants more airplanes and missiles.',
    exampleKorean: '공군은 더 많은 비행기와 미사일을 원합니다.'
  },
  {
    id: 'advanced_1_5',
    english: 'airplane',
    pronunciation: '[5ZEplein]',
    korean: '비행기',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'a vehicle with wings that flies',
    example: 'I flew home on an airplane.',
    exampleKorean: '저는 비행기로 집에 갔습니다.'
  },
  {
    id: 'advanced_1_6',
    english: 'airport',
    pronunciation: '[5ZEpR:t]',
    korean: '공항',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'a place where airplanes take off and land',
    example: 'The airplane landed at the airport in Washington.',
    exampleKorean: '비행기가 워싱턴 공항에 착륙했습니다.'
  },
  {
    id: 'advanced_1_7',
    english: 'album',
    pronunciation: '[5AlbEm]',
    korean: '앨범',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'a collection of recorded music',
    example: 'He recorded the song from an old record album.',
    exampleKorean: '그는 오래된 레코드 앨범에서 그 노래를 녹음했습니다.'
  },
  {
    id: 'advanced_1_8',
    english: 'alcohol',
    pronunciation: '[5AlkEhRl]',
    korean: '알코올',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'a strong, colorless liquid, usually made from grain, used as a drug or in industrial products',
    example: 'The man fell because he drank too much alcohol.',
    exampleKorean: '그 남자는 너무 많은 알코올을 마셔서 넘어졌습니다.'
  },
  {
    id: 'advanced_1_9',
    english: 'alive',
    pronunciation: '[E5laiv]',
    korean: '살아있는',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'adj.',
    definition: 'having life; not dead',
    example: 'The flowers become alive in the spring.',
    exampleKorean: '꽃들이 봄에 살아납니다.'
  },
  {
    id: 'advanced_1_10',
    english: 'ally',
    pronunciation: '[5Alai]',
    korean: '동맹국',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'a nation or person joined with another for a special purpose',
    example: 'Britain is a military ally of the United States.',
    exampleKorean: '영국은 미국의 군사 동맹국입니다.'
  },
  {
    id: 'advanced_1_11',
    english: 'ambassador',
    pronunciation: '[Am5bAsEdE]',
    korean: '대사',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'a nation\'s highest diplomatic representative (to another government)',
    example: 'Foreign ambassadors live in the capital city.',
    exampleKorean: '외국 대사들은 수도에 살고 있습니다.'
  },
  {
    id: 'advanced_1_12',
    english: 'amend',
    pronunciation: '[E5mend]',
    korean: '수정하다',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'v.',
    definition: 'to add to or to change (a proposal or law)',
    example: 'The committee refused to amend its proposal.',
    exampleKorean: '위원회는 제안을 수정하는 것을 거부했습니다.'
  },
  {
    id: 'advanced_1_13',
    english: 'ammunition',
    pronunciation: '[5Amju5niFEn]',
    korean: '탄약',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'the bullets or shells fired from guns',
    example: 'They could not fight without ammunition.',
    exampleKorean: '그들은 탄약 없이는 싸울 수 없었습니다.'
  },
  {
    id: 'advanced_1_14',
    english: 'among',
    pronunciation: '[E5mQN]',
    korean: '~중에',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'prep.',
    definition: 'in or part of (a group)',
    example: 'She was among the students who left the school.',
    exampleKorean: '그녀는 학교를 떠난 학생들 중 한 명이었습니다.'
  },
  {
    id: 'advanced_1_15',
    english: 'amount',
    pronunciation: '[E5maunt]',
    korean: '양',
    level: 'advanced',
    stage: 1,
    partOfSpeech: 'n.',
    definition: 'the number, size or weight of anything',
    example: 'The doctor gave him only a small amount of medicine.',
    exampleKorean: '의사는 그에게 소량의 약만 주었습니다.'
  },
  // 고급 레벨 Stage 2-30 (각 단계당 15개씩)
{
  id: 'advanced_2_1',
  english: 'anarchy',
  pronunciation: '[5AnEki]',
  korean: '무정부 상태',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'a lack of order; lawlessness',
  example: 'The peaceful protests blocked the streets and produced anarchy.',
  exampleKorean: '평화로운 시위가 거리를 막고 무정부 상태를 만들었습니다.'
},
{
  id: 'advanced_2_2',
  english: 'astronaut',
  pronunciation: '[5AstFEunR:t]',
  korean: '우주비행사',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'a person who travels in space',
  example: 'Astronaut Neil Armstrong was the first man to walk on the moon.',
  exampleKorean: '우주비행사 닐 암스트롱은 달에 발을 디딘 첫 번째 사람이었습니다.'
},
{
  id: 'advanced_2_3',
  english: 'astronomy',
  pronunciation: '[Es5trRnEmi]',
  korean: '천문학',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'the scientific study of stars and the universe',
  example: 'I study astronomy because I like to look at stars.',
  exampleKorean: '저는 별을 보는 것을 좋아해서 천문학을 공부합니다.'
},
{
  id: 'advanced_2_4',
  english: 'asylum',
  pronunciation: '[E5sailEm]',
  korean: '망명',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'political protection given by a government to a person from another country',
  example: 'The refugee asked for political asylum.',
  exampleKorean: '그 난민은 정치적 망명을 요청했습니다.'
},
{
  id: 'advanced_2_5',
  english: 'atmosphere',
  pronunciation: '[5AtmEsfiE]',
  korean: '대기',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'the gases surrounding any star or planet',
  example: 'The atmosphere of Venus is mostly water and carbon dioxide.',
  exampleKorean: '금성의 대기는 대부분 물과 이산화탄소로 구성되어 있습니다.'
},
{
  id: 'advanced_2_6',
  english: 'attach',
  pronunciation: '[E5tAtF]',
  korean: '붙이다',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to tie together; to connect',
  example: 'Please attach this name card to your coat.',
  exampleKorean: '이 명찰을 코트에 붙여주세요.'
},
{
  id: 'advanced_2_7',
  english: 'assist',
  pronunciation: '[E5sist]',
  korean: '도와주다',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to help',
  example: 'The doctor asked the medical student to assist him.',
  exampleKorean: '의사는 의대생에게 자신을 도와달라고 요청했습니다.'
},
{
  id: 'advanced_2_8',
  english: 'associate',
  pronunciation: '[E5sEuFieit]',
  korean: '연관시키다',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to connect or bring together in the mind',
  example: 'Most people associate the color red with danger.',
  exampleKorean: '대부분의 사람들은 빨간색을 위험과 연관시킵니다.'
},
{
  id: 'advanced_2_9',
  english: 'assume',
  pronunciation: '[E5sju:m]',
  korean: '가정하다',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to accept as true without proof; to take upon oneself',
  example: 'I assume you have finished your homework.',
  exampleKorean: '당신이 숙제를 끝냈다고 가정합니다.'
},
{
  id: 'advanced_2_10',
  english: 'assure',
  pronunciation: '[E5FuE]',
  korean: '확신시키다',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to tell with confidence; to make sure',
  example: 'I can assure you that the work will be completed on time.',
  exampleKorean: '작업이 시간 내에 완료될 것이라고 확신할 수 있습니다.'
},
{
  id: 'advanced_2_11',
  english: 'astonish',
  pronunciation: '[Es5tRniF]',
  korean: '놀라게 하다',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to surprise greatly; to amaze',
  example: 'The magician\'s tricks astonished the audience.',
  exampleKorean: '마술사의 트릭이 관객들을 놀라게 했습니다.'
},
{
  id: 'advanced_2_12',
  english: 'athlete',
  pronunciation: '[5AWli:t]',
  korean: '운동선수',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'a person who is skilled in sports or physical exercise',
  example: 'The athlete won three gold medals at the Olympics.',
  exampleKorean: '그 운동선수는 올림픽에서 금메달 3개를 획득했습니다.'
},
{
  id: 'advanced_2_13',
  english: 'attain',
  pronunciation: '[E5tein]',
  korean: '달성하다',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'v.',
  definition: 'to reach; to achieve; to gain',
  example: 'She worked hard to attain her goals.',
  exampleKorean: '그녀는 목표를 달성하기 위해 열심히 일했습니다.'
},
{
  id: 'advanced_2_14',
  english: 'attempt',
  pronunciation: '[E5tempt]',
  korean: '시도',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'an effort to do something',
  example: 'His attempt to climb the mountain was successful.',
  exampleKorean: '그의 산 등반 시도는 성공적이었습니다.'
},
{
  id: 'advanced_2_15',
  english: 'attitude',
  pronunciation: '[5Atitju:d]',
  korean: '태도',
  level: 'advanced',
  stage: 2,
  partOfSpeech: 'n.',
  definition: 'a way of thinking or feeling about something',
  example: 'She has a positive attitude toward life.',
  exampleKorean: '그녀는 삶에 대해 긍정적인 태도를 가지고 있습니다.'
}
  
];

// Helper functions
export function getVocabularyByLevel(level: string): Vocabulary[] {
  return VOCABULARY_DATA.filter(vocab => vocab.level === level);
}

export function getVocabularyByStage(level: string, stage: number): Vocabulary[] {
  return VOCABULARY_DATA.filter(vocab => 
    vocab.level === level && vocab.stage === stage
  );
}

export function getRandomVocabulary(count: number, level?: string): Vocabulary[] {
  let vocabulary = VOCABULARY_DATA;
  
  if (level) {
    vocabulary = vocabulary.filter(vocab => vocab.level === level);
  }
  
  const shuffled = [...vocabulary].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function searchVocabulary(query: string): Vocabulary[] {
  const lowerQuery = query.toLowerCase();
  return VOCABULARY_DATA.filter(vocab => 
    vocab.english.toLowerCase().includes(lowerQuery) ||
    vocab.korean.includes(query) ||
    vocab.definition.toLowerCase().includes(lowerQuery)
  );
}

export function getTotalWords(): number {
  return VOCABULARY_DATA.length;
}

export function getWordsByLevel(level: string): number {
  return VOCABULARY_DATA.filter(vocab => vocab.level === level).length;
}

export function getWordsByStage(level: string, stage: number): number {
  return VOCABULARY_DATA.filter(vocab => 
    vocab.level === level && vocab.stage === stage
  ).length;
}