import { Award, Terminal } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="border-t border-border py-16 scroll-mt-20">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
        About Me
      </h2>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {/* 자기소개 요약 */}
        <div className="space-y-5 text-muted leading-relaxed md:col-span-2">
          <p>
            <strong className="text-foreground font-semibold">4년 8개월 차 백엔드/풀스택 개발자</strong>로서 복잡한 이커머스 도메인의 문제를 깊이 분석하고, 비즈니스 임팩트로 이어지는 기술적 해결책을 제시하는 데 강점이 있습니다.
          </p>
          <p>
            대규모 트래픽 환경에서의 동시성 제어, 레거시 시스템 리팩토링, 이벤트 주도 아키텍처(EDA) 설계를 통해 서비스의 안정성과 확장성을 개선해 왔습니다. 단순히 스펙을 구현하는 것을 넘어, <strong className="text-foreground font-semibold">'도메인에 대한 깊은 고민'</strong>과 <strong className="text-foreground font-semibold">'빠른 실행력'</strong>을 바탕으로 고객과 비즈니스 모두를 만족시키는 시스템을 만듭니다.
          </p>
          <p>
            항상 팀원들과의 소통과 시행착오를 통해 성장하며, 프로젝트의 완주를 목표로 끈기 있게 설계하고 구현합니다.
          </p>
        </div>

        {/* 학력, 자격증, 스킬 요약 */}
        <div className="space-y-8 rounded-2xl border border-border bg-card-bg p-6">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
              <Award className="h-4 w-4 text-accent" />
              Education & Certifications
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <div className="font-medium text-foreground">정보처리기사</div>
                <div className="text-xs">한국산업인력공단 (2022.06)</div>
              </li>
              <li>
                <div className="font-medium text-foreground">서경대학교</div>
                <div className="text-xs">뮤지컬공연학과 (2013.03 - 2019.02)</div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
              <Terminal className="h-4 w-4 text-accent" />
              Core Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Java', 'Kotlin', 'Spring Boot', 'JPA', 'MySQL', 'PostgreSQL', 'Redis', 'Kafka', 'AWS', 'Vanilla JS', 'Thymeleaf'].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
