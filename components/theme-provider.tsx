'use client';
import type {ReactNode} from 'react';
import {MotionConfig} from 'motion/react';

/** One site-wide motion policy. The active visual theme is selected by the owner in Admin. */
export function ThemeProvider({children}:{children:ReactNode}) {
  return <MotionConfig reducedMotion="user" transition={{duration:0.65,ease:[0.16,1,0.3,1]}}>{children}</MotionConfig>;
}
