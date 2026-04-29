import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'order-completion-refactoring',
    title: '주문 완료 처리 시스템 리팩토링',
    subtitle: '거대 단일 메서드를 Command/Provider 패턴으로 분해',
    period: '2025.02 - 2025.09',
    tags: ['Java', 'Spring Boot', 'Command Pattern', '보상 트랜잭션'],
    summary:
      '수십 개 외부 시스템 호출이 얽힌 거대 메서드를 Command/Provider 패턴으로 분해하여, 새로운 결제 수단을 추가할 때 기존 코드 수정 없이 100% 확장이 가능하도록 리팩토링했습니다.',
    sections: {
      summary:
        '단일 거대 메서드로 이루어진 주문 완료 처리를 7개월에 걸친 점진적 리팩토링을 통해 분해했습니다. Command 패턴과 마커 인터페이스 기반 Provider를 도입하여 외부 시스템 호출의 보상(rollback) 메커니즘을 규격화하고, OCP를 만족하는 구조로 개선했습니다.',
      problem: `
주문 완료 처리는 결제 승인, 포인트 차감, 쿠폰 사용, 배송 요청 등 수십 개의 외부 시스템이 **하나의 거대 메서드**에 분기와 try/catch로 얽혀 있었습니다. 

이로 인해 새 결제수단을 추가할 때마다 메서드는 무한정 길어졌고, 특정 단계에서 예외 발생 시 **이전 외부 시스템 호출을 어떻게 되돌릴지(보상 트랜잭션) 명확하지 않아** 부분 성공 및 데이터 정합성 불일치 위험이 늘 깔려 있었습니다.
      `.trim(),
      solution: `
세 가지 주요 결정을 통해 구조를 개선했습니다.

1. **Command + Provider 두 단계 분리**
가장 핵심적인 결정으로, 인터페이스에 \`execute()\`와 \`undo()\`를 같은 위계로 두는 Command 패턴을 택했습니다. 보상(rollback)을 일급 시민으로 끌어올리고, 객체 생성과 데이터 준비는 Provider에게 위임하여 책임을 분리했습니다.

2. **마커 인터페이스로 주문 유형 분기**
바로드림(매장 픽업)과 일반 주문의 분기를 런타임 if문에서 컴파일 타임 마커 인터페이스로 옮겼습니다. Spring의 의존성 주입을 활용해 새 주문 유형이 추가되더라도 기존 Factory 코드를 전혀 수정하지 않도록 구성했습니다.

3. **OpenFeign 마이그레이션**
제각각이던 외부 통신 모듈(RestTemplate 등)을 Spring Cloud OpenFeign으로 일원화하여 응답 모델의 타입 안전성을 확보했고, RequestContextHolder를 활용해 동일 트랜잭션 내 사내 인증 토큰의 중복 발급을 차단했습니다.

### 🏗️ 아키텍처 다이어그램

\`\`\`mermaid
sequenceDiagram
    participant C as Controller
    participant S as Service
    participant CP as Provider
    participant F as Factory
    participant O as Orchestrator
    participant Cmd as Commands

    C->>S: 주문 완료 요청
    S->>CP: createContext(req)
    S->>F: createCommandList(ctx)
    F-->>S: List<Command>
    S->>O: executeAll()

    loop 각 Command 순차 실행
        O->>Cmd: execute()
    end

    alt 모두 성공
        O-->>S: 정상 완료
    else 예외 발생
        O->>O: rollbackAll()
        loop 역순(LIFO)
            O->>Cmd: undo()
        end
        O-->>S: 예외 전파
    end
\`\`\`
      `.trim(),
      result: `
- 21개 이상의 Command/Provider가 구현되어, 각 비즈니스가 **단일 책임 단위**로 완전히 분리되었습니다.
- **새로운 기능 추가 시 기존 로직 무수정**: 1개의 Command와 1개의 Provider만 추가하면 대응 가능합니다.
- 롤백 코드가 인터페이스 단에서 강제되면서 **데이터 정합성 보장**이 강화되었고, 거대 로직이 분해되어 독립적인 단위 테스트가 가능해졌습니다.
      `.trim(),
    },
  },
  {
    slug: 'auth-unification-aop-cache',
    title: '회원 도메인 마이그레이션 및 인증 일원화',
    subtitle: '무타입 Box에서 Typed Record로의 전환과 AOP 인증',
    period: '2025.11 - 2026.03',
    tags: ['AOP', 'Strangler Fig Pattern', 'Redis', 'DDD'],
    summary:
      '무타입 Box 객체로 관리되던 회원 도메인을 Typed Record로 마이그레이션하고, AOP를 통해 흩어진 인증 로직을 일원화하여 인증 API 트래픽을 최적화했습니다.',
    sections: {
      summary:
        '회원 정보가 무타입 Box 객체로 흐르며 발생하던 유지보수 문제를 해결하기 위해 Typed Record 모델을 도입했습니다. 또한, AOP로 인증 로직을 분리하고 단일키 세션 메모리 캐시를 적용하여 인증 API 호출 부하를 피크 기준 148K 건에서 0건으로 대폭 절감했습니다.',
      problem: `
회원 정보가 SQL 컬럼명 그대로 키가 되는 \`Box\`(무타입 Map-like) 컨테이너로 서비스 레이어를 가로지르고 있어 타입 안정성이 전혀 없었습니다. 

또한 모든 In-DTO마다 회원 토큰을 복호화하고 본인인증 여부를 확인하는 로직이 중복으로 흩어져 있었으며, 이로 인해 사내 인증 시스템의 세션키 발급 API 호출이 피크 시간대 일간 **148K건 이상 집중되는 심각한 병목**이 존재했습니다.
      `.trim(),
      solution: `
1. **Box → Typed Record 마이그레이션 (Strangler Fig)**
\`CompactMemberDetail\` 레코드를 도입해 도메인 타입을 정의했습니다. 동시에 레거시 코드와의 공존을 위해 \`toBox()\` 어댑터를 구현하는 Strangler Fig 패턴을 적용하여, 흩어져 있던 임직원 판정 등의 비즈니스 규칙을 도메인에 응집시켰습니다.

2. **AOP 인증 책임 분리**
\`BaseRequestAspect\`를 도입하여 컨트롤러 진입 전 토큰 복호화 및 ROLE 검증을 횡단 관심사로 일원화하고 중복되던 외부 API 호출을 제거했습니다.

3. **세션키 메모리 캐시 전환 및 캐시 의사결정**
사내 인증 시스템 세션키를 3단 게이트 방식의 메모리 캐시(\`BoSessionKeyManager\`)로 전환했습니다. 반면, 다중키(회원별) 회원 정보의 Redis 캐싱은 트래픽 패턴 상 히트율이 낮아 오히려 비용이 증가할 것으로 분석하여 **적용을 보류하는 데이터 기반 의사결정**을 내렸습니다.

### 📊 사내 인증 시스템 세션키 발급 API 정량 지표

| 호출 주체 | 배포 직전 (5분 윈도우) | 배포 직후 (5분 윈도우) | 그 이후 |
|---|---|---|---|
| **API 서비스** | 5,629건 | 40건 | **0건** |
| **UI 서비스** | 2,059건 | 31건 | **0건** |

단일키 메모리 캐시 설계가 캐시 히트율 ~100%를 달성하며 피크 시간 기준 148,000건/일 호출량을 완전히 소거했습니다.
      `.trim(),
      result: `
- 사내 인증 시스템 세션키 발급 API 호출이 피크 기준 **148,000건에서 배포 10분 만에 0건으로 100% 최적화**되었습니다.
- 모든 인입 요청에서 평균 30ms 이상의 외부 통신 의존을 덜어내 응답 속도가 크게 향상되었습니다.
- 도메인 모델에 타입 안정성이 확보되어 IDE 자동완성 및 컴파일 타임 키 검증이 가능해졌습니다.
      `.trim(),
    },
  },
  {
    slug: 'giftcard-kafka-infrastructure',
    title: '기프트카드 비동기 발급 시스템 구축',
    subtitle: '결제와 발급의 트랜잭션 분리 및 이벤트 발행 인프라 적용',
    period: '2024.04 - 2024.11',
    tags: ['Kafka', 'Spring Events', 'Outbox Pattern', '비동기'],
    summary:
      '기존 폴링 방식의 15분 지연 발급을 비동기 이벤트 기반으로 개선하여, 결제 즉시 기프트카드가 발급되도록 처리 속도와 일관성을 획기적으로 개선했습니다.',
    sections: {
      summary:
        'Spring의 @TransactionalEventListener(AFTER_COMMIT)와 Kafka를 조합하여 트랜잭션 분리와 이중 쓰기 문제를 해결했습니다. 이벤트 발행 인프라를 처음부터 설계하고 구축하여 타 도메인까지 확장 가능한 기반을 마련했습니다.',
      problem: `
사용자가 기프트카드를 결제하면 내부 결제 처리는 즉시 끝나지만, 카드 번호 발급은 외부 배치 서버가 15분마다 미발급 건을 폴링하여 진행되는 구조여서 사용자에게 **최대 15분의 발급 지연**이 발생했습니다. 

단순히 결제 트랜잭션 내에서 발급 시스템을 동기 호출할 경우 결제 처리 시간이 지연되고 부분 성공(결제 됨, 발급 실패) 위험이 존재해, **결제의 일관성과 발급의 즉시성을 동시에 보장할 아키텍처**가 필요했습니다.
      `.trim(),
      solution: `
1. **Spring AFTER_COMMIT 기반 후처리 발행**
이중 쓰기 문제(rollback ghost message)를 방지하기 위해 \`@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)\`를 도입했습니다. 트랜잭션이 성공적으로 커밋된 직후에만 Kafka 발행을 수행하도록 하여 이벤트 유실과 가짜 메시지를 차단했습니다.

2. **비동기 처리로 성능 영향 최소화**
리스너에 \`@Async\`를 적용하여, Kafka 메시지 브로커로의 송신 통신 시간이 결제 트랜잭션의 응답 시간에 합산되지 않도록 완벽히 분리했습니다.

3. **공유 EventMessage 제네릭 모델 설계**
확장성을 고려해 모든 도메인이 공유하는 단일 봉투 형태의 메시지 구조를 정의했고, 내부의 JSON 페이로드와 Enum 코드로 이벤트를 구분하여 새 이벤트를 손쉽게 추가하도록 설계했습니다.

### 🏗️ 트랜잭션 기반 비동기 발행 시퀀스

\`\`\`mermaid
sequenceDiagram
    participant U as 사용자
    participant OC as OrderService
    participant DB as event_history
    participant KEL as KafkaEventListener
    participant KFK as Kafka Topic
    participant CSM as Consumer
    participant PG as 발급 서버

    U->>OC: 기프트카드 결제
    activate OC
    OC->>DB: INSERT event_history (감사 로그)
    Note over OC: 결제 트랜잭션 commit
    deactivate OC

    Note over KEL: @TransactionalEventListener (AFTER_COMMIT) + @Async
    KEL->>KFK: kafkaTemplate.send
    KFK->>CSM: consume
    CSM->>PG: 발급 API 즉시 호출
    PG-->>CSM: 발급 성공
    CSM-->>U: SMS 즉시 발송
\`\`\`
      `.trim(),
      result: `
- **발급 지연 제거**: 최대 15분 소요되던 발급이 **결제 즉시(0초)** 이루어져 사용자 경험이 향상되었습니다.
- **배치 서버 의존성 제거**: 노후화된 외부 폴링 배치 서버를 비활성화하여 단일 실패 지점(SPOF)을 제거하고 운영 부담을 줄였습니다.
- 설계한 이벤트 인프라가 배송, 배송지 변경 등 **사내 타 도메인의 표준 비동기 파이프라인으로 확산** 적용되었습니다.
      `.trim(),
    },
  },
  {
    slug: 'order-concurrency-control',
    title: '중복 주문 방어를 위한 동시성 제어',
    subtitle: '비관적 락과 상태 머신을 활용한 트랜잭션 직렬화',
    period: '2026.04',
    tags: ['동시성 제어', 'Pessimistic Lock', 'JPA', '상태 머신'],
    summary:
      '동일 주문 ID로 발생하는 중복 결제 요청 문제를 비관적 락과 상태 머신으로 해결하여, 정상 재시도 흐름은 보장하고 비정상 동시 진입만 직렬화 차단했습니다.',
    sections: {
      summary:
        '단순 차단 방식의 한계를 인지하고 빠르게 v1 코드를 롤백한 뒤, DB 레벨의 비관적 락(SELECT FOR UPDATE)과 상태 머신 분기를 통해 정상 결제 재시도와 비정상 더블클릭을 명확히 구분하는 v2 구조로 재설계했습니다.',
      problem: `
클라이언트 네트워크 재시도나 사용자의 결제 버튼 더블클릭으로 인해 같은 주문 ID에 대해 주문 완료 요청이 짧은 시간에 중복 유입되는 이슈가 발생했습니다.

초기(v1)에는 단순하게 DB 조회 후 차단하는 로직을 배포했으나, **READ COMMITTED 격리 수준의 한계로 동시성 누수**가 발생했고, 설상가상으로 '이전 결제가 실패하여 수단을 변경한 후의 정상 재시도'마저 차단되는 치명적인 운영 이슈가 발생했습니다.
      `.trim(),
      solution: `
운영 데이터를 토대로 v1 코드를 롤백(Revert)한 뒤, 두 가지 축으로 아키텍처를 재설계했습니다.

1. **비관적 락(Pessimistic Write)으로 동시성 직렬화**
충돌 빈도가 높은 '더블클릭' 케이스 특성 상 낙관적 락은 적합하지 않았고, DB만으로 해결 가능한 JPA의 \`@Lock(LockModeType.PESSIMISTIC_WRITE)\`을 적용했습니다. 락 범위는 단일 Row로 한정해 다른 주문에 미치는 성능 저하를 방지했습니다.

2. **락 획득 후 다분법 상태 머신 분기**
무조건 차단하는 것이 아니라 락 획득 후 현재 처리 상태를 4가지로 검사했습니다. 이전 결제가 실패한 **'정상 재시도'는 통과**시키고, '결제 진행 중'이거나 '이미 완료'인 경우만 상태에 맞는 명확한 예외 메시지로 반환하도록 세분화했습니다.

### 🏗️ 상태 머신 플로우

\`\`\`mermaid
flowchart TD
    L[락 획득: SELECT FOR UPDATE]
    L --> Q{데이터 있음?}
    Q -- 없음 --> P[정상 진행 ✓]
    Q -- 있음 --> R{ordrProsRsltCode == null?}
    R -- yes --> P
    R -- no --> S{isRequestedSettlement?}
    S -- yes --> B1[❌ 차단: 결제 진행 중 메시지]
    S -- no --> C{isCompleted?}
    C -- yes --> B2[❌ 차단: 이미 완료 메시지]
    C -- no --> B3[❌ 차단: 일반 오류 메시지]
\`\`\`
      `.trim(),
      result: `
- DB 레벨의 완벽한 직렬화를 통해 중복 결제로 인한 데이터 오염 및 **보상 운영 업무 건수를 100% 차단**했습니다.
- 정상적인 결제 수단 변경 및 재시도 흐름을 복구하여 이탈률과 UX 하락을 방지했습니다.
- 사용자에게 실패 원인에 맞는 정확한 안내 메시지가 노출되어 CS 문의가 대폭 감소했습니다.
      `.trim(),
    },
  },
];
