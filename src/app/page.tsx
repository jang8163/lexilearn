export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <div style={{fontSize: '4rem', marginBottom: '1.5rem'}}>🎯</div>
        <h1 className="title">LexiLearn</h1>
        <p className="subtitle">영어 발음 연습 AI 시스템</p>
        <p className="description">표현과 단어로 영어 실력을 향상시켜보세요!</p>
      </div>
      
      <div className="grid">
        <div className="card">
          <div className="card-icon blue">💬</div>
          <h3 className="card-title">표현 학습</h3>
          <p className="card-description">실용적인 영어 표현을 학습하고 발음을 연습하세요</p>
          <div className="card-content">
            <p className="card-content-title">포함 내용:</p>
            <p className="card-content-item">초급/중급/고급 × 6개 카테고리</p>
            <p className="card-content-item">각 카테고리별 30단계</p>
            <p className="card-content-item">총 5,400개 표현</p>
          </div>
          <button className="card-button">표현 학습 시작 →</button>
        </div>
        
        <div className="card">
          <div className="card-icon orange">📚</div>
          <h3 className="card-title">단어 학습</h3>
          <p className="card-description">1,350개의 실제 단어로 어휘력을 늘려보세요</p>
          <div className="card-content">
            <p className="card-content-title">포함 내용:</p>
            <p className="card-content-item">초급/중급/고급 × 30단계</p>
            <p className="card-content-item">각 단계 15개 단어</p>
            <p className="card-content-item">총 1,350개 단어 (189.txt 기반)</p>
          </div>
          <button className="card-button">단어 학습 시작 →</button>
        </div>
      </div>
      
      <div className="buttons">
        <button className="button purple">📊 전체 진행 현황 보기</button>
        <button className="button red">📝 표현 오답노트</button>
        <button className="button orange">📝 단어 오답노트</button>
        <button className="button gray">🔄 진행상황 초기화</button>
      </div>
    </div>
  );
}