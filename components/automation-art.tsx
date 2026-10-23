'use client';
import {motion} from 'motion/react';
import {BrainCircuit, Database, Workflow, ArrowUpRight, Zap} from 'lucide-react';

/**
 * Hero visual v2 — same energy as before, cleaner composition.
 * No fake coordinates, no "SYSTEM 001", no random SM watermark board.
 * Soft orbits + three capability cards with purposeful motion.
 */
export function AutomationArt() {
  return (
    <div className="automation-art hero-visual-v2" aria-hidden="true">
      <div className="hv-glow hv-glow-a" />
      <div className="hv-glow hv-glow-b" />
      <motion.div
        className="hv-ring hv-ring-outer"
        animate={{rotate: 360}}
        transition={{duration: 80, repeat: Infinity, ease: 'linear'}}
      />
      <motion.div
        className="hv-ring hv-ring-inner"
        animate={{rotate: -360}}
        transition={{duration: 55, repeat: Infinity, ease: 'linear'}}
      />
      <motion.div
        className="hv-core"
        initial={{opacity: 0, scale: 0.92}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.9, ease: [0.16, 1, 0.3, 1]}}
      >
        <span className="hv-core-label">SM Automations</span>
        <span className="hv-core-sub">Intelligent systems</span>
      </motion.div>

      <motion.div
        className="hv-card hv-card-top"
        initial={{opacity: 0, y: 16, x: 12}}
        animate={{opacity: 1, y: 0, x: 0}}
        transition={{duration: 0.75, delay: 0.25}}
      >
        <span className="hv-card-icon">
          <Workflow size={16} />
        </span>
        <span>
          <b>Workflow orchestration</b>
          <small>Trigger → decide → act</small>
        </span>
        <span className="hv-live" />
      </motion.div>

      <motion.div
        className="hv-card hv-card-mid"
        initial={{opacity: 0, y: 16, x: -12}}
        animate={{opacity: 1, y: 0, x: 0}}
        transition={{duration: 0.75, delay: 0.4}}
      >
        <span className="hv-card-icon violet">
          <BrainCircuit size={16} />
        </span>
        <span>
          <b>Agentic systems</b>
          <small>Context-aware execution</small>
        </span>
        <ArrowUpRight size={14} className="hv-arrow" />
      </motion.div>

      <motion.div
        className="hv-card hv-card-bot"
        animate={{y: [0, -6, 0]}}
        transition={{duration: 5.5, repeat: Infinity, ease: 'easeInOut'}}
      >
        <span className="hv-card-icon blue">
          <Database size={16} />
        </span>
        <span>
          <b>Knowledge layer</b>
          <small>Retrieval grounded</small>
        </span>
        <Zap size={14} className="hv-zap" />
      </motion.div>
    </div>
  );
}
