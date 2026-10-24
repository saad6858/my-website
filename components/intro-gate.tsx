'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {Monogram} from './monogram';

export type IntroScene = {
  eyebrow?: string;
  title: string;
  body?: string;
  durationMs?: number;
};

/** 10 presets — first frames intentionally distinct; durations are wall-clock */
export const INTRO_PRESETS: Record<string, {label: string; totalMs: number; scenes: IntroScene[]}> = {
  pulse: {
    label: '1 · Pulse (2.2s)',
    totalMs: 2200,
    scenes: [{title: 'SM', eyebrow: 'AUTOMATIONS', durationMs: 2200}]
  },
  breath: {
    label: '2 · Breath (4s)',
    totalMs: 4000,
    scenes: [
      {eyebrow: 'SM AUTOMATIONS', title: 'Thoughtfully built.', body: 'Purposefully useful.', durationMs: 4000}
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
      {eyebrow: 'WHAT WE DO', title: 'Assistants · workflows · agents', body: 'Purpose-built automation that fits existing tools.', durationMs: 2800},
      {eyebrow: 'ORIGIN', title: 'From friction to systems', body: 'Started by solving operational drag—not chasing trends.', durationMs: 2800},
      {eyebrow: 'AI', title: 'Leverage without chaos', body: 'AI handles repetition. People handle judgment.', durationMs: 2800},
      {eyebrow: 'NEXT', title: 'Start a conversation', body: 'Tell us what takes time. We find the useful next step.', durationMs: 2800}
    ]
  },
  deep: {
    label: '7 · Deep story (18s)',
    totalMs: 18000,
    scenes: [
      {eyebrow: 'WHO', title: 'Who we are', body: 'SM Automations — intelligent systems for real work.', durationMs: 3000},
      {eyebrow: 'WHAT', title: 'What we build', body: 'Custom AI assistants, workflow automation, agentic systems.', durationMs: 3000},
      {eyebrow: 'ORIGIN', title: 'How we started', body: 'Practical problems: repetitive tasks, scattered knowledge.', durationMs: 3000},
      {eyebrow: 'AI', title: 'How AI helps', body: 'Faster decisions, consistent processes, more capacity.', durationMs: 3000},
      {eyebrow: 'ROLE', title: 'Our role', body: 'Design, integrate, refine—so it stays useful after launch.', durationMs: 3000},
      {eyebrow: 'OUTCOME', title: 'What good looks like', body: 'Less busywork. More momentum. Human oversight.', durationMs: 3000}
    ]
  },
  cinema: {
    label: '8 · Cinematic (22s)',
    totalMs: 22000,
    scenes: [
      {eyebrow: 'INTELLIGENT SYSTEMS', title: 'Less busywork.', body: 'More momentum.', durationMs: 3500},
      {eyebrow: 'WHO', title: 'A focused practice', body: 'Systems that hold up in production.', durationMs: 3500},
      {eyebrow: 'WHAT', title: 'AI that earns its place', body: 'Measured by outcomes, not demos.', durationMs: 3500},
      {eyebrow: 'ORIGIN', title: 'Started with real workflows', body: 'The friction you already feel.', durationMs: 3500},
      {eyebrow: 'AI × BUSINESS', title: 'Capacity without chaos', body: 'Automate the repeatable. Keep people on judgment.', durationMs: 4000},
      {eyebrow: 'PARTNERSHIP', title: 'We stay with the system', body: 'Design, integrate, refine until it fits.', durationMs: 4000}
    ]
  },
  epic: {
    label: '9 · Epic (28s)',
    totalMs: 28000,
    scenes: [
      {eyebrow: 'SM AUTOMATIONS', title: 'Thoughtfully built.', body: 'Purposefully useful.', durationMs: 3500},
      {eyebrow: 'WHO WE ARE', title: 'Operators of intelligent systems', body: 'Reduce repetitive work. Unlock trapped knowledge.', durationMs: 4000},
      {eyebrow: 'WHAT WE DO', title: 'Assistants · automation · agents', body: 'Custom systems connected to tools you already use.', durationMs: 4000},
      {eyebrow: 'ORIGIN', title: 'One problem at a time', body: 'From experiments to production under pressure.', durationMs: 4000},
      {eyebrow: 'AI', title: 'Leverage for real businesses', body: 'Speed and consistency without replacing judgment.', durationMs: 4500},
      {eyebrow: 'ROLE', title: 'Design with intention', body: 'Around your constraints—then refine.', durationMs: 4000},
      {eyebrow: 'NEXT', title: 'Start a conversation', body: 'Bring the messy workflow. We make it clear.', durationMs: 4000}
    ]
  },
  maximus: {
    label: '10 · Maximus (36s)',
    totalMs: 36000,
    scenes: [
      {eyebrow: 'SM AUTOMATIONS', title: 'Intelligent systems for real work', body: 'Welcome.', durationMs: 3500},
      {eyebrow: 'WHO WE ARE', title: 'A practice, not a product dump', body: 'Automation around how your team already operates.', durationMs: 4500},
      {eyebrow: 'WHAT WE BUILD', title: 'Assistants · orchestration · agents', body: 'AI assistants, workflow layers, knowledge systems.', durationMs: 4500},
      {eyebrow: 'ORIGIN', title: 'How it started', body: 'From friction—repetition, scattered context—to systems that stick.', durationMs: 4500},
      {eyebrow: 'AI FOR BUSINESS', title: 'How AI helps your business', body: 'More throughput. Fewer manual loops. Clearer ownership.', durationMs: 5000},
      {eyebrow: 'OUR ROLE', title: 'The role we play', body: 'Partner through design, integration, iteration.', durationMs: 4500},
      {eyebrow: 'OVERSIGHT', title: 'Human oversight, by design', body: 'Automation reduces load. It does not remove accountability.', durationMs: 4500},
      {eyebrow: 'NEXT STEP', title: 'Find the useful next step', body: 'Start a conversation. Bring the friction.', durationMs: 5000}
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
        durationMs: Math.max(1200, Math.min(20000, Number(s.durationMs) || 3000))
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
    const key = String(preset || 'breath').trim().toLowerCase();
    const p = INTRO_PRESETS[key] || INTRO_PRESETS.breath;
    return p.scenes.map(s => ({
      ...s,
      durationMs: Math.max(1200, Number(s.durationMs) || 3000)
    }));
  }, [preset, customScenesJson, customEnabled]);

  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [barKey, setBarKey] = useState(0);
  const timers = useRef<number[]>([]);
  const pausedRef = useRef(false);
  const indexRef = useRef(0);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  function clearTimers() {
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
  }

  function finish() {
    clearTimers();
    try {
      if (resolved === 'first') sessionStorage.setItem('sm-intro-seen', '1');
    } catch {}
    setVisible(false);
  }

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
    setBarKey(k => k + 1);
  }, [resolved, preset, customEnabled, customScenesJson]);

  useEffect(() => {
    if (!visible || resolved === 'off') return;
    clearTimers();

    const reduce =
      typeof window !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      const t = window.setTimeout(() => finish(), 600);
      timers.current.push(t);
      return () => clearTimers();
    }

    indexRef.current = 0;
    setIndex(0);
    setBarKey(k => k + 1);

    function arm(i: number) {
      if (i >= scenes.length) {
        finish();
        return;
      }
      const dur = Math.max(1200, scenes[i].durationMs || 3000);
      const started = Date.now();
      let remaining = dur;

      function tick() {
        if (pausedRef.current) {
          const t = window.setTimeout(tick, 150);
          timers.current.push(t);
          return;
        }
        const t = window.setTimeout(() => {
          const next = i + 1;
          if (next >= scenes.length) {
            finish();
            return;
          }
          indexRef.current = next;
          setIndex(next);
          setBarKey(k => k + 1);
          arm(next);
        }, remaining);
        timers.current.push(t);
      }
      tick();
    }

    arm(0);
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, scenes, resolved]);

  if (resolved === 'off' || !visible) return null;
  const scene = scenes[index] || scenes[0];
  if (!scene) return null;
  const dur = Math.max(1200, scene.durationMs || 3000);

  return (
    <div
      className="intro-gate intro-gate-narrative"
      role="dialog"
      aria-label="Site introduction"
      aria-live="polite"
      data-intro-preset={String(preset || 'breath')}
    >
      <div className="intro-progress" aria-hidden="true">
        <div
          key={barKey}
          className={'intro-progress-bar' + (paused ? ' is-paused' : '')}
          style={{animationDuration: `${dur}ms`}}
        />
      </div>
      <div className="intro-inner" key={`${index}-${barKey}`}>
        <Monogram className="intro-monogram" />
        {scene.eyebrow ? <p className="eyebrow intro-eyebrow">{scene.eyebrow}</p> : null}
        <p className="intro-title">{scene.title}</p>
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
