"use client";

import { Eye, GitBranch, PenTool, Rocket, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionLabel } from "@/components/layout/SectionLabel";

const steps: Array<[string, string, LucideIcon, string]> = [
  [
    "01",
    "Discover the workflow",
    Eye,
    "Clarify the problem, inputs, outputs, constraints, and what success actually means.",
  ],
  [
    "02",
    "Design the system",
    PenTool,
    "Choose the right architecture, data flow, interfaces, and human checkpoints.",
  ],
  [
    "03",
    "Build & connect",
    GitBranch,
    "Implement the product, integrations, dashboards, and safety rails as modular pieces.",
  ],
  [
    "04",
    "Launch & iterate",
    Rocket,
    "Deploy, observe, improve, and keep the system easy to evolve.",
  ],
];

export function Process() {
  return (
    <SectionWrapper className="bg-slate-900/30">
      <Container>
        <SectionLabel text="PROCESS" />
        <h2 className="mt-5 text-4xl font-bold md:text-5xl">
          How It Works
        </h2>

        <div className="relative mt-12 grid gap-8 lg:grid-cols-4">
          {steps.map(([n, title, Icon, desc], i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-4 lg:block">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                  <Icon size={21} />
                </div>

                <div className="lg:mt-5">
                  <div className="font-mono text-xs tracking-[.25em] text-emerald-400">
                    {n}
                  </div>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {desc}
                  </p>
                </div>
              </div>

              {i < 3 ? (
                <div className="absolute right-[-20px] top-6 hidden w-10 border-t border-dashed border-emerald-500/30 lg:block" />
              ) : null}
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}