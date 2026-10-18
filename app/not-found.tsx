import Link from 'next/link';
import {Reveal} from '@/components/reveal';
export default function NotFound(){return <main id="main" className="not-found"><Reveal><p className="eyebrow">404 / NOT FOUND</p><h1>This page took<br/>a different path.</h1><p>The page may have moved, or the address may be incorrect.</p><Link className="button button-primary" href="/">Return home ↗</Link></Reveal></main>}
