import {getPublishedPage,getPublishedCollection} from '@/lib/public-data';
import {SectionRenderer} from '@/components/section-renderer';
import {Reveal,RevealItem} from '@/components/motion-system';
import Link from 'next/link';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Projects'};
export default async function Projects(){
  const p=await getPublishedPage('projects');
  const projects=await getPublishedCollection('projects');
  return <main id="main"><SectionRenderer sections={p?.sections||[]}/><section className="content-section section-wrap"><Reveal className="section-intro"><p className="eyebrow">CASE STUDIES</p><h2>More about the work</h2></Reveal>{projects.length?<div className="card-grid">{projects.map((x:any,i:number)=><RevealItem key={x.id} index={i} className="service-card-wrap"><article className="service-card project-card"><span className="card-index">PROJECT / {String(i+1).padStart(2,'0')}</span>{typeof x.thumbnail==='string'&&x.thumbnail.startsWith('https://')?<img className="project-thumbnail" src={x.thumbnail} alt={typeof x.thumbnailAlt==='string'?x.thumbnailAlt:`${x.title} thumbnail`} loading="lazy"/>:null}<h3>{x.title}</h3><p>{x.summary||x.body}</p><Link className="card-link" href={`/projects/${x.slug}`}>Read case study ↗</Link>{x.url&&<a className="card-link" href={x.url} target="_blank" rel="noreferrer">Open live project ↗</a>}</article></RevealItem>)}</div>:<Reveal className="empty-state">New projects will appear here when published.</Reveal>}</section></main>
}
