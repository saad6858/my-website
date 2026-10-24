'use client';


import {useEffect, useMemo, useState} from 'react';
import {Monogram} from './monogram';

export type IntroScene = {
  eyebrow?: string;
  title: string;
  body?: string;
  durationMs?: number;
};

/** 10 narrative presets — duration is total sequence length (ms). */
export const INTRO_PRESETS: Record<string, {label: string; totalMs: number; scenes: IntroScene[]}> = {
  pulse: {
    label: '1 · Pulse (2.2s) — logo only',
    totalMs: 2200,
    scenes: [{title: 'SM Automations', eyebrow: 'INTELLIGENT SYSTEMS', durationMs: 2200}]
  },
  breath: {
    label: '2 · Breath (4s) — short line',
    totalMs: 4000,
    scenes: [
      {eyebrow: 'SM AUTOMATIONS', title: 'Thoughtfully built.', body: 'Purposefully useful.', durationMs: 4000}
    ]
  },
  who: {
    label: '3 · Who we are (6s)',
    totalMs: 6000,
    scenes: [
      {eyebrow: 'WHO WE ARE', title: 'SM Automations', body: 'A practice built around real workflows—not demos.', durationMs: 3000},
      {eyebrow: 'FOCUS', title: 'Intelligent systems.', body: 'Assistants, automation and agents that earn their place.', durationMs: 3000}
    ]
  },
  story: {
    label: '4 · Origin (8s)',
    totalMs: 8000,
    scenes: [
      {eyebrow: 'HOW IT STARTED', title: 'One workflow problem.', body: 'Repetition, friction, knowledge trapped in heads.', durationMs: 2800},
      {eyebrow: 'THE SHIFT', title: 'AI that respects the work.', body: 'Design around how teams already operate.', durationMs: 2600},
      {eyebrow: 'TODAY', title: 'Systems with intention.', body: 'Clear outcomes. Human oversight by design.', durationMs: 2600}
    ]
  },
  value: {
    label: '5 · Value (10s)',
    totalMs: 10000,
    scenes: [
      {eyebrow: 'WHAT WE DO', title: 'Reduce busywork.', body: 'Automate the steps that steal attention.', durationMs: 2500},
      {eyebrow: 'HOW AI HELPS', title: 'Context that compounds.', body: 'Knowledge retrieval, decisions, and handoffs that stay consistent.', durationMs: 2500},
      {eyebrow: 'OUR ROLE', title: 'Partner, not a platform pitch.', body: 'We shape systems to your constraints and goals.', durationMs: 2500},
      {eyebrow: 'OUTCOME', title: 'Momentum you can feel.', body: 'Fewer manual loops. Clearer ownership.', durationMs: 2500}
    ]
  },
  full: {
    label: '6 · Full narrative (14s)',
    totalMs: 14000,
    scenes: [
      {eyebrow: 'SM AUTOMATIONS', title: 'Who we are', body: 'Builders of intelligent systems for teams that care about the work.', durationMs: 2800},
      {eyebrow: 'WHAT WE DO', title: 'Assistants · workflows · agents', body: 'Purpose-built automation that fits existing tools and habits.', durationMs: 2800},
      {eyebrow: 'HOW IT STARTED', title: 'From friction to systems', body: 'Started by solving real operational drag—not chasing trends.', durationMs: 2800},
      {eyebrow: 'HOW AI HELPS', title: 'Leverage without chaos', body: 'AI handles repetition and retrieval so people handle judgment.', durationMs: 2800},
      {eyebrow: 'YOUR NEXT STEP', title: 'Start a conversation', body: 'Tell us what takes time. We will find the useful next step.', durationMs: 2800}
    ]
  },
  deep: {
    label: '7 · Deep story (18s)',
    totalMs: 18000,
    scenes: [
      {eyebrow: '01', title: 'Who we are', body: 'SM Automations — intelligent systems designed around real work.', durationMs: 3000},
      {eyebrow: '02', title: 'What we build', body: 'Custom AI assistants, workflow automation, and agentic systems.', durationMs: 3000},
      {eyebrow: '03', title: 'How we started', body: 'From practical problems: repetitive tasks, scattered knowledge, slow handoffs.', durationMs: 3000},
      {eyebrow: '04', title: 'How AI helps your business', body: 'Faster decisions, consistent processes, and capacity without headcount spikes.', durationMs: 3000},
      {eyebrow: '05', title: 'The role we play', body: 'We design, integrate, and refine—so the system stays useful after launch.', durationMs: 3000},
      {eyebrow: '06', title: 'What good looks like', body: 'Less busywork. More momentum. Human oversight by design.', durationMs: 3000}
    ]
  },
  cinema: {
    label: '8 · Cinematic (22s)',
    totalMs: 22000,
    scenes: [
      {eyebrow: 'INTELLIGENT SYSTEMS', title: 'Less busywork.', body: 'More momentum.', durationMs: 3500},
      {eyebrow: 'WHO', title: 'A focused automation practice', body: 'Built for operators who need systems that hold up in production.', durationMs: 3500},
      {eyebrow: 'WHAT', title: 'AI that earns its place', body: 'Assistants, orchestration, and knowledge layers—measured by outcomes.', durationMs: 3500},
      {eyebrow: 'ORIGIN', title: 'Started with real workflows', body: 'Not slides. Not demos. The friction you already feel.', durationMs: 3500},
      {eyebrow: 'AI × BUSINESS', title: 'Capacity without chaos', body: 'Automate the repeatable. Keep people on the decisions that matter.', durationMs: 4000},
      {eyebrow: 'PARTNERSHIP', title: 'We stay with the system', body: 'Design, integrate, refine—until it fits the way you work.', durationMs: 4000}
    ]
  },
  epic: {
    label: '9 · Epic (28s)',
    totalMs: 28000,
    scenes: [
      {eyebrow: 'SM AUTOMATIONS', title: 'Thoughtfully built.', body: 'Purposefully useful.', durationMs: 3500},
      {eyebrow: 'WHO WE ARE', title: 'Operators of intelligent systems', body: 'We help teams reduce repetitive work and unlock trapped knowledge.', durationMs: 4000},
      {eyebrow: 'WHAT WE DO', title: 'Assistants · automation · agents', body: 'Custom systems that connect the tools you already rely on.', durationMs: 4000},
      {eyebrow: 'HOW IT STARTED', title: 'One problem at a time', body: 'From early experiments to production workflows that hold under pressure.', durationMs: 4000},
      {eyebrow: 'HOW AI HELPS', title: 'Leverage for real businesses', body: 'Speed, consistency, and clarity—without replacing human judgment.', durationMs: 4500},
      {eyebrow: 'OUR ROLE', title: 'Design with intention', body: 'We shape the system around your constraints, then stay for the refinement.', durationMs: 4000},
      {eyebrow: 'NEXT', title: 'Start a conversation', body: 'You do not need a perfect brief. Tell us what creates friction.', durationMs: 4000}
    ]
  },
  maximus: {
    label: '10 · Maximus (36s) — longest preset',
    totalMs: 36000,
    scenes: [
      {eyebrow: '00 · OPEN', title: 'SM Automations', body: 'Intelligent systems for real work.', durationMs: 3500},
      {eyebrow: '01 · WHO', title: 'A practice, not a product dump', body: 'We design automation around how your team already operates.', durationMs: 4500},
      {eyebrow: '02 · WHAT', title: 'What we build', body: 'AI assistants, workflow orchestration, knowledge layers, and agentic flows.', durationMs: 4500},
      {eyebrow: '03 · ORIGIN', title: 'How it started', body: 'From practical friction—repetition, scattered context, slow handoffs—to systems that stick.', durationMs: 4500},
      {eyebrow: '04 · AI', title: 'How AI helps your business', body: 'More throughput, fewer manual loops, clearer ownership of every step.', durationMs: 5000},
      {eyebrow: '05 · ROLE', title: 'The role we play', body: 'Partner through design, integration, and iteration—not a one-week handoff.', durationMs: 4500},
      {eyebrow: '06 · APPROACH', title: 'Human oversight, by design', body: 'Automation should reduce load, not remove accountability.', durationMs: 4500},
      {eyebrow: '07 · INVITE', title: 'Find the useful next step', body: 'Start a conversation. Bring the messy workflow. We will make it clear.', durationMs: 5000}
    ]
  }
};

function parseCustomScenes(json: string | undefined): IntroScene[] | null {
  if (!json || typeof json !== 'string' || !json.trim()) return null;
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed) || !parsed.length) return null;
    return parsed
      .filter((s: any) => s && typeof s.title === 'string' && s.title.trim())
      .map((s: any) => ({
        eyebrow: typeof s.eyebrow === 'string' ? s.eyebrow : '',
        title: String(s.title),
        body: typeof s.body === 'string' ? s.body : '',
        durationMs: Math.max(800, Math.min(20000, Number(s.durationMs) || 3000))
      }));
  } catch {
    return null;
  }
}

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
  const resolved: 'off' | 'first' | 'always' =
    mode || (!enabled ? 'off' : everyVisit ? 'always' : 'first');

  const scenes = useMemo(() => {
    if (customEnabled) {
      const custom = parseCustomScenes(customScenesJson);
      if (custom && custom.length) return custom;
    }
    const p = INTRO_PRESETS[preset] || INTRO_PRESETS.breath;
    return p.scenes;
  }, [preset, customScenesJson, customEnabled]);

  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (resolved === 'off') return;
    try {
      if (resolved === 'first' && sessionStorage.getItem('sm-intro-seen')) return;
      setVisible(true);
      setIndex(0);
      setProgress(0);
    } catch {}
  }, [resolved]);

  useEffect(() => {
    if (!visible || resolved === 'off') return;
    const reduce = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      const t = window.setTimeout(() => finish(), 400);
      return () => clearTimeout(t);
    }

    let sceneIdx = 0;
    let raf = 0;
    let start = performance.now();
    let sceneStart = start;
    const durations = scenes.map(s => Math.max(800, s.durationMs || 3000));

    function tick(now: number) {
      const dur = durations[sceneIdx] || 3000;
      const elapsed = now - sceneStart;
      setProgress(Math.min(1, elapsed / dur));
      if (elapsed >= dur) {
        if (sceneIdx >= scenes.length - 1) {
          finish();
          return;
        }
        sceneIdx += 1;
        setIndex(sceneIdx);
        sceneStart = now;
        setProgress(0);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, scenes, resolved]);

  function finish() {
    try {
      if (resolved === 'first') sessionStorage.setItem('sm-intro-seen', '1');
    } catch {}
    setVisible(false);
  }

  function skip() {
    finish();
  }

  if (resolved === 'off' || !visible) return null;
  const scene = scenes[index] || scenes[0];
  if (!scene) return null;

  return (
    <div className="intro-gate intro-gate-narrative" role="dialog" aria-label="Site introduction" aria-live="polite">
      <div className="intro-progress" aria-hidden="true">
        <div className="intro-progress-bar" style={{transform: `scaleX(${progress})`}} />
      </div>
      <div className="intro-scene-dots" aria-hidden="true">
        {scenes.map((_, i) => (
          <span key={i} className={i === index ? 'is-active' : i < index ? 'is-done' : ''} />
        ))}
      </div>
      <div className="intro-inner" key={index}>
        <Monogram className="intro-monogram" />
        {scene.eyebrow ? <p className="eyebrow intro-eyebrow">{scene.eyebrow}</p> : null}
        <p className="intro-title">{scene.title}</p>
        {scene.body ? <p className="intro-body">{scene.body}</p> : null}
      </div>
      <div className="intro-footer">
        <span className="intro-count">
          {index + 1} / {scenes.length}
        </span>
        <button type="button" onClick={skip} className="intro-skip">
          Skip intro ↗
        </button>
      </div>
    </div>
  );
}
