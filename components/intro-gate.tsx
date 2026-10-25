'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {usePathname} from 'next/navigation';
import {Monogram} from './monogram';

export type IntroScene = {
  eyebrow?: string;
  title: string;
  body?: string;
  durationMs?: number;
};

export const INTRO_PRESETS: Record<string, {label: string; totalMs: number; scenes: IntroScene[]}> = {
  pulse: {
    label: '1 · Pulse (2.2s)',
    totalMs: 2200,
    scenes: [{eyebrow: 'SM AUTOMATIONS', title: 'SM', durationMs: 2200}]
  },
  breath: {
    label: '2 · Breath (4s)',
    totalMs: 4000,
    scenes: [
      {
        eyebrow: 'SM AUTOMATIONS / INTELLIGENT SYSTEMS',
        title: 'Thoughtfully built.\nPurposefully useful.',
        durationMs: 4000
      }
    ]
  },
  who: {
    label: '3 · Who we are (6s)',
    totalMs: 6000,
    scenes: [
      {eyebrow: 'WHO WE ARE', title: 'A systems practice.', body: 'Not a tool dump. Not a demo reel.', durationMs: 3000},
      {eyebrow: 'FOCUS', title: 'Intelligent systems.', body: 'Assistants, automation, agents that earn their place.', durationMs: 3000}
    ]
  },
  story: {
    label: '4 · Origin (8s)',
    totalMs: 8000,
    scenes: [
      {eyebrow: 'ORIGIN', title: 'It started with friction.', body: 'Repetition. Knowledge trapped in heads.', durationMs: 2800},
      {eyebrow: 'THE SHIFT', title: 'Design around real work.', body: 'Build for how teams already operate.', durationMs: 2600},
      {eyebrow: 'NOW', title: 'Systems with intention.', body: 'Clear outcomes. Human oversight by design.', durationMs: 2600}
    ]
  },
  value: {
    label: '5 · Value (10s)',
    totalMs: 10000,
    scenes: [
      {eyebrow: 'WHAT WE DO', title: 'Cut the busywork.', body: 'Automate the steps that steal attention.', durationMs: 2500},
      {eyebrow: 'AI', title: 'Context that compounds.', body: 'Retrieval, decisions, handoffs that stay consistent.', durationMs: 2500},
      {eyebrow: 'ROLE', title: 'Partner, not a pitch.', body: 'Shaped to your constraints and goals.', durationMs: 2500},
      {eyebrow: 'RESULT', title: 'Momentum you feel.', body: 'Fewer manual loops. Clearer ownership.', durationMs: 2500}
    ]
  },
  full: {
    label: '6 · Full narrative (14s)',
    totalMs: 14000,
    scenes: [
      {eyebrow: 'SM AUTOMATIONS', title: 'Who we are', body: 'Builders of intelligent systems for teams that care about the work.', durationMs: 2800},
      {eyebrow: 'WHAT WE DO', title: 'Workflows that think.', body: 'Assistants, automation and agents wired to real operations.', durationMs: 2800},
      {eyebrow: 'HOW WE STARTED', title: 'From friction to systems.', body: 'We got tired of busywork and trapped knowledge.', durationMs: 2800},
      {eyebrow: 'FOR YOU', title: 'AI that earns its place.', body: 'Clear role. Measurable outcomes. Human oversight.', durationMs: 2800},
      {eyebrow: 'NEXT', title: 'Let’s build.', body: 'Start with one workflow that matters.', durationMs: 2800}
    ]
  },
  deep: {
    label: '7 · Deep story (18s)',
    totalMs: 18000,
    scenes: [
      {eyebrow: 'CHAPTER 1', title: 'The problem is quiet.', body: 'Hours lost to the same clicks. Answers stuck in inboxes.', durationMs: 3600},
      {eyebrow: 'CHAPTER 2', title: 'Tools are not enough.', body: 'Another login does not fix a broken process.', durationMs: 3600},
      {eyebrow: 'CHAPTER 3', title: 'Systems change the day.', body: 'When the right step runs itself, attention returns to judgment.', durationMs: 3600},
      {eyebrow: 'CHAPTER 4', title: 'That is our work.', body: 'Purpose-built AI and automation around how you already operate.', durationMs: 3600},
      {eyebrow: 'CHAPTER 5', title: 'Ready when you are.', body: 'One conversation. One workflow. Clear next step.', durationMs: 3600}
    ]
  },
  cinema: {
    label: '8 · Cinematic (22s)',
    totalMs: 22000,
    scenes: [
      {eyebrow: 'OPEN', title: 'Less busywork.', durationMs: 4400},
      {eyebrow: 'THEN', title: 'More momentum.', durationMs: 4400},
      {eyebrow: 'HOW', title: 'Intelligent systems.', body: 'Designed around real workflows — not demos.', durationMs: 4400},
      {eyebrow: 'WHY', title: 'Human oversight, by design.', durationMs: 4400},
      {eyebrow: 'CLOSE', title: 'SM Automations.', body: 'Intelligent systems for real work.', durationMs: 4400}
    ]
  },
  epic: {
    label: '9 · Epic (28s)',
    totalMs: 28000,
    scenes: [
      {eyebrow: '01', title: 'Who we are', body: 'SM Automations — a systems practice for AI that belongs in the work.', durationMs: 4000},
      {eyebrow: '02', title: 'What we do', body: 'Custom assistants, workflow automation, and agentic systems.', durationMs: 4000},
      {eyebrow: '03', title: 'How we started', body: 'By refusing tools that create more noise than leverage.', durationMs: 4000},
      {eyebrow: '04', title: 'How AI helps', body: 'It removes repetition and surfaces the knowledge your team already has.', durationMs: 4000},
      {eyebrow: '05', title: 'Our role', body: 'Design, build, and hand over systems you can run with confidence.', durationMs: 4000},
      {eyebrow: '06', title: 'What you get', body: 'Clear ownership, fewer manual loops, and room to think.', durationMs: 4000},
      {eyebrow: '07', title: 'Begin', body: 'Tell us one workflow that should run better.', durationMs: 4000}
    ]
  },
  maximus: {
    label: '10 · Maximus (36s)',
    totalMs: 36000,
    scenes: [
      {eyebrow: 'SM AUTOMATIONS', title: 'Intelligent systems for real work.', durationMs: 4000},
      {eyebrow: 'WHO WE ARE', title: 'Operators of intelligent systems.', body: 'We build what your team will actually use.', durationMs: 4000},
      {eyebrow: 'WHAT WE DO', title: 'Assistants. Automation. Agents.', body: 'Purpose-built around your constraints.', durationMs: 4000},
      {eyebrow: 'ORIGIN', title: 'It started with friction.', body: 'Repetitive work and knowledge that never moved.', durationMs: 4000},
      {eyebrow: 'AI’S ROLE', title: 'Not magic — leverage.', body: 'Reduce busywork. Keep humans on judgment.', durationMs: 4000},
      {eyebrow: 'HOW WE HELP', title: 'Design → build → handoff.', body: 'You own the system. We make it reliable.', durationMs: 4000},
      {eyebrow: 'FOR BUSINESS', title: 'Outcomes you can feel.', body: 'Faster cycles. Cleaner handoffs. Less chaos.', durationMs: 4000},
      {eyebrow: 'NEXT STEP', title: 'Start a conversation.', body: 'One workflow. One clear improvement.', durationMs: 4000},
      {eyebrow: 'WELCOME', title: 'SM Automations.', durationMs: 4000}
    ]
  }
};

function parseCustomScenes(json?: string): IntroScene[] | null {
  if (!json || !String(json).trim()) return null;
  try {
    const raw = JSON.parse(String(json));
    if (!Array.isArray(raw) || !raw.length) return null;
    const scenes: IntroScene[] = [];
    for (const item of raw) {
      if (!item || typeof item !== 'object') continue;
      const title = String((item as any).title || '').trim();
      if (!title) continue;
      const n = Number((item as any).durationMs);
      const durationMs = Number.isFinite(n) && n > 0 ? n : 4000;
      scenes.push({
        eyebrow: (item as any).eyebrow != null ? String((item as any).eyebrow) : undefined,
        title,
        body: (item as any).body != null ? String((item as any).body) : undefined,
        durationMs
      });
    }
    return scenes.length ? scenes : null;
  } catch {
    return null;
  }
}

/**
 * Intro timing — absolute wall-clock deadlines.
 * All scene end times are computed once at start from performance.now().
 * A single requestAnimationFrame loop advances the scene index and calls finish.
 * No setTimeout chains. No Math.max(1200) floor.
 */
export function IntroGate({
  enabled = true,
  everyVisit = false,
  mode,
  preset = 'breath',
  customScenesJson,
  customEnabled = false
}: {
  enabled?: boolean;
  everyVisit?: boolean;
  mode?: 'off' | 'first' | 'always';
  preset?: string;
  customScenesJson?: string;
  customEnabled?: boolean;
}) {
  const pathname = usePathname() || '';
  const isAdminRoute = pathname.startsWith('/admin');

  const resolved: 'off' | 'first' | 'always' = isAdminRoute
    ? 'off'
    : mode || (!enabled ? 'off' : everyVisit ? 'always' : 'first');

  const scenes = useMemo(() => {
    if (customEnabled) {
      const custom = parseCustomScenes(customScenesJson);
      if (custom && custom.length) return custom;
    }
    const key = String(preset || 'breath').trim().toLowerCase();
    const p = INTRO_PRESETS[key] || INTRO_PRESETS.breath;
    return p.scenes.map(s => ({
      ...s,
      durationMs: Number.isFinite(Number(s.durationMs)) && Number(s.durationMs) > 0 ? Number(s.durationMs) : 4000
    }));
  }, [preset, customScenesJson, customEnabled]);

  const scenesKey = useMemo(
    () => scenes.map(s => `${s.title}|${s.durationMs}`).join('||'),
    [scenes]
  );

  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [barKey, setBarKey] = useState(0);
  const [sceneDuration, setSceneDuration] = useState(4000);

  const pausedRef = useRef(false);
  const indexRef = useRef(0);
  const rafRef = useRef(0);
  const pauseStartedRef = useRef(0);
  const pausedTotalRef = useRef(0);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) {
      pauseStartedRef.current = performance.now();
    } else if (pauseStartedRef.current) {
      pausedTotalRef.current += performance.now() - pauseStartedRef.current;
      pauseStartedRef.current = 0;
    }
  }, [paused]);

  function finish() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    try {
      if (resolved === 'first') sessionStorage.setItem('sm-intro-seen', '1');
    } catch {}
    setVisible(false);
  }

  // Show / hide
  useEffect(() => {
    if (resolved === 'off') {
      setVisible(false);
      return;
    }
    try {
      if (resolved === 'first' && sessionStorage.getItem('sm-intro-seen')) {
        setVisible(false);
        return;
      }
    } catch {}
    setVisible(true);
    setIndex(0);
    indexRef.current = 0;
    setPaused(false);
    pausedTotalRef.current = 0;
    pauseStartedRef.current = 0;
    setBarKey(k => k + 1);
  }, [resolved, preset, customEnabled, customScenesJson]);

  // Absolute-time driver
  useEffect(() => {
    if (!visible || resolved === 'off' || !scenes.length) return;

    if (typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = window.setTimeout(() => finish(), 900);
      return () => window.clearTimeout(id);
    }

    const start = performance.now();
    pausedTotalRef.current = 0;
    pauseStartedRef.current = 0;

    // Cumulative end timestamps relative to start (ms)
    const ends: number[] = [];
    let acc = 0;
    for (const s of scenes) {
      const d = Number(s.durationMs) > 0 ? Number(s.durationMs) : 4000;
      acc += d;
      ends.push(acc);
    }
    const total = acc;

    indexRef.current = 0;
    setIndex(0);
    setSceneDuration(Number(scenes[0]?.durationMs) > 0 ? Number(scenes[0].durationMs) : 4000);
    setBarKey(k => k + 1);

    const tick = (now: number) => {
      // Effective elapsed excludes time spent paused
      let pausedExtra = pausedTotalRef.current;
      if (pausedRef.current && pauseStartedRef.current) {
        pausedExtra += now - pauseStartedRef.current;
      }
      const elapsed = now - start - pausedExtra;

      if (elapsed >= total) {
        finish();
        return;
      }

      // Scene index from absolute deadlines
      let next = 0;
      while (next < ends.length && elapsed >= ends[next]) next += 1;
      if (next >= scenes.length) {
        finish();
        return;
      }
      if (next !== indexRef.current) {
        indexRef.current = next;
        setIndex(next);
        const d = Number(scenes[next]?.durationMs) > 0 ? Number(scenes[next].durationMs) : 4000;
        setSceneDuration(d);
        setBarKey(k => k + 1);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, scenesKey, resolved]);

  if (resolved === 'off' || !visible) return null;
  const scene = scenes[index] || scenes[0];
  if (!scene) return null;
  const titleLines = String(scene.title).split('\n');

  return (
    <div
      className="intro-gate intro-gate-square"
      role="dialog"
      aria-label="Site introduction"
      aria-live="polite"
      data-intro-preset={String(preset || 'breath')}
    >
      <div className="intro-progress" aria-hidden="true">
        <div
          key={barKey}
          className={'intro-progress-bar' + (paused ? ' is-paused' : '')}
          style={{animationDuration: `${sceneDuration}ms`}}
        />
      </div>
      <div className="intro-inner" key={`${index}-${barKey}`}>
        <Monogram className="intro-monogram" />
        {scene.eyebrow ? <p className="eyebrow intro-eyebrow">{scene.eyebrow}</p> : null}
        <p className="intro-title">
          {titleLines.map((line, li) => (
            <span key={li}>
              {li > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </p>
        {scene.body ? <p className="intro-body">{scene.body}</p> : null}
      </div>
      <div className="intro-footer">
        <button
          type="button"
          className="intro-stop"
          onClick={() => setPaused(p => !p)}
          aria-pressed={paused}
        >
          {paused ? 'Resume' : 'Stop'}
        </button>
        <button type="button" onClick={finish} className="intro-skip">
          Skip intro ↗
        </button>
      </div>
    </div>
  );
}
