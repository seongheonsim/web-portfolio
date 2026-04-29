'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      themeVariables: {
        primaryColor: '#1e293b', // slate-800
        primaryTextColor: '#f8fafc', // slate-50
        primaryBorderColor: '#0ea5e9', // sky-500
        lineColor: '#94a3b8', // slate-400
        secondaryColor: 'transparent', 
        tertiaryColor: '#334155', 
        textColor: '#e2e8f0', 
        mainBkg: 'transparent', 
        nodeBorder: '#38bdf8', 
        clusterBkg: 'transparent',
        clusterBorder: '#475569',
        labelTextColor: '#f8fafc',
        edgeLabelBackground: '#1e293b',
        arrowheadColor: '#0ea5e9',
      },
    });

    if (containerRef.current) {
      mermaid
        .render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, chart)
        .then(({ svg }) => {
          if (containerRef.current) {
            // SVG 내부의 배경 사각형 및 하드코딩된 남색 계열 색상 제거
            const cleanedSvg = svg
              .replace(/<rect\s+[^>]*class=["']background["'][^>]*>/g, '')
              .replace(/fill=["']#(0f172a|1e293b|0b0f19)["']/gi, 'fill="transparent"')
              .replace(/background-color:\s*#(0f172a|1e293b|0b0f19)/gi, 'background-color: transparent');
            containerRef.current.innerHTML = cleanedSvg;
          }
        })
        .catch((e) => {
          console.error('Mermaid render error', e);
        });
    }
  }, [chart]);

  return (
    <div className="my-8 rounded-2xl border border-border bg-card-bg/30 backdrop-blur-sm p-6 shadow-sm overflow-x-auto [&_svg]:!bg-transparent mermaid-wrapper">
      <div ref={containerRef} className="flex justify-center" />
    </div>
  );
}
