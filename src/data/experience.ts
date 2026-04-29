export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    id: 'kyobo',
    period: '2023.08 - Present',
    company: '교보문고',
    role: 'Backend Engineer',
    description:
      '주문결제개발팀에서 주문/결제 시스템의 백엔드를 개발하고 유지보수합니다. 대규모 트래픽 처리, 결제 시스템 동시성 제어, 그리고 복잡한 레거시 코드를 Command/Provider 패턴을 이용해 리팩토링하는 등 시스템 안정성 향상에 주력했습니다. 특히 기프트카드 비동기 발급 시스템, AOP 기반 인증 일원화 등 전사적인 성능 개선 및 마이그레이션 프로젝트를 주도했습니다.',
  },
  {
    id: 'things',
    period: '2020.12 - 2023.06',
    company: '주식회사 씽즈',
    role: 'Full-stack Engineer',
    description:
      '백오피스, 쿠폰 도메인, 주문/결제 등 초기 커머스 플랫폼의 전반적인 시스템 설계와 개발을 담당했습니다. AWS SQS를 활용한 비동기 재고 처리로 주문 응답 속도를 대폭 개선했으며, 유연한 확장을 위한 쿠폰 도메인 재설계, Vue.js를 도입한 차세대 백오피스 구축 등 프론트엔드와 백엔드를 아우르는 기술 기반을 다졌습니다.',
  },
];
