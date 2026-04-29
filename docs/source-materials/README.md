# 포트폴리오 케이스 스터디 — 심성헌

교보문고 주문결제 도메인에서 작업한 결과물 중 가장 깊이 있게 풀어낸 사례들입니다.
백엔드(Spring Boot / JPA / Kafka / MyBatis) 위주이며, 결제 트랜잭션의 정합성과 외부 시스템 연동을 중심으로 정리했습니다.

---

## 메인 라인업 — "결제 도메인의 신뢰성을 어떻게 만들었는가"

세 케이스가 한 가지 큰 서사로 묶입니다 — **트랜잭션·동시성·비동기 이벤트가 얽힌 결제 흐름에서, 패턴·락·아웃박스 세 각도로 안정성을 어떻게 보장했는가**.

### 1. 주문 완료 처리 — 거대 단일 메서드를 Command/Provider 패턴으로 분해하기
**파일:** [`case_study_1_order_completion_refactoring.md`](./case_study_1_order_completion_refactoring.md)
**기간:** 2025-02 ~ 2025-09 (7개월) · **44 커밋** · 단독 설계·구현

수십 개 외부 시스템 연동(결제 연동 API 서버, e교환권, 통합포인트, SAM 등)이 한 메서드에 엮여 있던 거대 로직을 **Command + Provider 패턴**으로 분해. 인터페이스 한 곳에 `execute()`와 `undo()`를 같이 두어 **외부 호출의 보상(롤백)을 일급 시민으로 만든** 케이스. RestTemplate → Spring Cloud OpenFeign 마이그레이션과 RequestContextHolder 기반 인증 토큰 캐싱을 함께 진행.

핵심 키워드: Command Pattern · Provider Pattern · 보상 트랜잭션 · OCP · 마커 인터페이스 · OpenFeign

---

### 2. 기프트카드 발급 — 결제와 발급 트랜잭션 분리 (Spring AFTER_COMMIT + 비동기 Kafka 발행)
**파일:** [`case_study_3_outbox_kafka_gift_card.md`](./case_study_3_outbox_kafka_gift_card.md)
**기간:** 2024-04 ~ 2024-11 · 인프라 단독 구축 + 기프트카드 응용 주도

별도 배치 서버가 주문 API 서버 DB를 폴링해 결제 연동 API 서버에 발급을 트리거하던 구조를 **Spring `@TransactionalEventListener`(AFTER_COMMIT) + `@Async` + Kafka 비동기 발행 + 감사 로그**로 대체. `EventMessage`, `EventPort`, `EventService`, `EventPublishAdapter`, `KafkaEventListener`를 사흘 동안 단독 설계·구현하고, 기프트카드 발급에 적용해 **발급 지연 최대 15분 → 즉시**. AFTER_COMMIT phase 덕분에 rollback 시 Kafka로 메시지가 안 새는 보장.

> 정직한 패턴 명칭 표기: 본 구조는 종종 "트랜잭셔널 아웃박스"라고 부르지만 엄밀히 보면 **Outbox-inspired**다 — `event_history`는 감사 로그이고, CDC/폴링 워커가 그걸 읽어 발행하지 않으므로. JVM 다운 시 손실 가능성은 후속 단계(CDC 도입)로 보강할 자리.
>
> 또 참고: 배송 도메인 작업은 팀 작업으로 같이 진행했지만 본인 AtoZ가 아니므로 도메인 지식으로만 활용. 인프라 + 기프트카드 적용은 본인 단독.

핵심 키워드: `@TransactionalEventListener` (AFTER_COMMIT) · `@Async` · Kafka · 이중 쓰기 문제 (rollback ghost message 차단) · 감사 로그 테이블 · 별도 배치 서버 종료 · CDC 발전 방향

---

### 3. 주문 완료 동시성 제어 — 한 번 되돌렸다가 비관적 락으로 다시 풀기
**파일:** [`case_study_4_pessimistic_lock_concurrency.md`](./case_study_4_pessimistic_lock_concurrency.md)
**기간:** 2026-04 (3주) · **11 커밋** · 단독 설계·구현

사용자 더블클릭 등으로 발생하는 동시 주문 완료 요청을 차단하는 작업. **v1(단순 차단) → revert → v2(비관적 락 + 상태 머신 분기)** 흐름이 git history에 그대로 남아 있음. JPA `@Lock(LockModeType.PESSIMISTIC_WRITE)`로 단일 row를 직렬화하고, 락 획득 후 상태 4분기로 분기해서 **결제수단 변경 같은 정상 재시도는 통과시키고 진짜 중복만 차단**.

핵심 키워드: 비관적 락 · `SELECT FOR UPDATE` · 상태 머신 · 락 vs Idempotency Key trade-off · revert → 재설계의 정직함

---

## 추가 케이스 — "도메인 모델링이 다른 모든 개선의 토대"

색깔이 다른 케이스라 별도 섹션으로 분리. 결제 도메인이 아니라 공통 인프라 작업이며, 캐시 적용 의사결정과 운영 데이터 검증이 헤드라인.

### 4. 회원 인증 일원화와 캐시를 어디에 적용할지 결정하기
**파일:** [`case_study_2_aop_session_cache_decision.md`](./case_study_2_aop_session_cache_decision.md)
**기간:** 2025-11 ~ 2026-03 · **21 커밋** · 단독 설계·구현

회원 데이터를 `Box`(Map-like 무타입) → typed record(`MemberDetail`, `CompactMemberDetail`)로 마이그레이션하면서 그 위에 AOP 인증 일원화와 단일키 메모리 캐시(`BoSessionKeyManager`)를 올린 사례. **회원 정보 Redis 캐싱은 도메인 적합성(낮은 캐시 히트율) 검토 후 일부 영역에서 보류**. 운영 메트릭으로 사내 인증 시스템 세션키 발급 API 호출량 **피크 148K/일 → 0**을 측정.

핵심 키워드: Strangler Fig (`toBox()` 어댑터) · AOP · 단일키 vs 다중키 캐시 분기 · 운영 데이터로 의사결정 검증 · typed record 마이그레이션

---

## 참고 — 이 포트폴리오 작성 과정에서 나온 보조 자료

- [`portfolio_inventory.md`](./portfolio_inventory.md) — git log 자동 스캔으로 도출한 작업 인벤토리 (1,177 커밋·160 티켓·2년 6개월). 케이스 스터디 후보 6개 추천 포함.
- [`portfolio_deep_dive.md`](./portfolio_deep_dive.md) — 6개 후보별 변경 파일·핵심 클래스·아키텍처 단서·다이어그램 재료 정리. 케이스 스터디 본문의 원자료.

---

## 다음 단계 (포트폴리오 사이트 구축)

1. **사이트 구축**: 본인 추천은 Astro + Tailwind + MDX 조합 (백엔드 개발자가 직접 만든다는 점에서 가볍고 결과가 깔끔). Vercel 또는 Cloudflare Pages 무료 호스팅
2. **다이어그램 렌더링**: Mermaid는 Astro·MDX·Notion·GitHub README 모두에서 그대로 렌더됨. 변환 필요 없음
3. **운영 데이터 첨부**: 각 케이스의 "운영 임팩트 데이터 첨부 자리"를 사내 모니터링 캡처/지표로 채워넣기
4. **About 페이지**: 자기소개 + 강점(백엔드 위주, 프론트는 JS/HTML 보조 작업, Vue.js는 과거 경험으로 구분 표기) + 연락처
5. **사이드 프로젝트 1개 추가** (선택): 회사 코드 공개 제한이 있으니 균형 맞추기에 유용. "코드 품질 증거" 역할
6. **기술 블로그 섹션** (선택): 본 케이스 스터디 4편을 시작점으로 디버깅 회고·ADR 글로 확장

---

*작성: 2026-04-28*
