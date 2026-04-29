const Hero = () => {
  return (
    <section className="py-20 md:py-32">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
        결제 도메인의 신뢰성을 만드는
        <br className="hidden sm:block" />
        <span className="text-accent"> 백엔드 개발자 심성헌</span>입니다.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        교보문고 주문결제 시스템에서 3년 간 대규모 트래픽과 데이터 정합성 문제를 다루었습니다. 단일 거대 메서드를 설계 패턴으로 분해하고, 분산 환경의 동시성 이슈를 제어하며, 레거시 시스템을 중단 없이 마이그레이션한 경험들을 아래에 기록합니다.
      </p>
    </section>
  );
};

export default Hero;
