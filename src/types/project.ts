export interface Project {
  slug: string;
  title: string;
  subtitle: string; // 카드 및 상세 페이지에 표시될 소제목
  period: string;
  tags: string[];
  summary: string; // 카드에 보여질 짧은 요약
  sections: {
    summary: string; // 상세 페이지의 [요약] 내용
    problem: string; // [문제 상황] 내용
    solution: string; // [해결 과정] 내용 (마크다운 포맷 권장)
    result: string; // [결과 및 임팩트] 내용
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}
