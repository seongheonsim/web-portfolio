'use client';

import { useState, useEffect } from 'react';

const Hero = () => {
  const line1 = '0.1초의 결제 순간을 위해';
  const line2 = '견고한 시스템을 설계하는 개발자';
  const name = '심성헌';
  const suffix = '입니다.';

  const totalLength = line1.length + line2.length + name.length + suffix.length;
  const [currentLength, setCurrentLength] = useState(0);

  useEffect(() => {
    if (currentLength < totalLength) {
      const timer = setTimeout(() => {
        setCurrentLength((prev) => prev + 1);
      }, 70); // 타이핑 속도 조절 (ms)
      return () => clearTimeout(timer);
    }
  }, [currentLength, totalLength]);

  const renderLine1 = line1.slice(0, currentLength);
  const renderLine2 = line2.slice(
    0,
    Math.max(0, currentLength - line1.length)
  );
  const renderName = name.slice(
    0,
    Math.max(0, currentLength - line1.length - line2.length)
  );
  const renderSuffix = suffix.slice(
    0,
    Math.max(0, currentLength - line1.length - line2.length - name.length)
  );

  return (
    <section className="flex min-h-[400px] flex-col justify-center py-24 md:py-32">
      {/* 텍스트가 늘어나면서 레이아웃이 뛰는 것을 방지하기 위해 최소 높이 부여 */}
      <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:leading-[1.2]">
          {renderLine1}
          {currentLength >= line1.length && <br />}
          {renderLine2}
          {currentLength >= line1.length + line2.length && <br />}
          <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
            {renderName}
          </span>
          {renderSuffix}
          <span
            className={`font-light ${
              currentLength === totalLength ? 'animate-pulse' : ''
            }`}
          >
            |
          </span>
        </h1>
      </div>

      <p
        className={`mt-6 text-lg font-medium leading-relaxed text-muted md:text-xl md:leading-relaxed transition-opacity duration-1000 ${
          currentLength === totalLength ? 'opacity-100' : 'opacity-0'
        }`}
      >
        교보문고 주문결제 시스템에서 3년간 대규모 트래픽과 데이터 정합성 문제를 다루었습니다.
        <br />
        안정적인 아키텍처 설계와 점진적 리팩토링을 통해 비즈니스의 성장을 든든하게 뒷받침합니다.
      </p>
    </section>
  );
};

export default Hero;
