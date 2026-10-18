'use client';

import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from 'react';

type RevealProps = {children: ReactNode; className?: string; delay?: number; as?: 'div'|'section'|'article'|'aside'|'header'};

/** Lightweight, progressively-enhanced reveal: content remains visible if JS/IO is unavailable. */
export function Reveal({children, className = '', delay = 0, as = 'div'}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    document.documentElement.classList.add('motion-ready');
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, {threshold: 0.12, rootMargin: '0px 0px -42px 0px'});
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const Tag = as;
  return <Tag ref={ref as never} className={`reveal ${ready ? 'is-visible' : ''} ${className}`} style={{'--reveal-delay': `${delay}ms`} as CSSProperties}>{children}</Tag>;
}
