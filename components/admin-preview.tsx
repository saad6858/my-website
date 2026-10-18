'use client';
import type {SitePage} from '@/lib/content';
import {SectionRenderer} from '@/components/section-renderer';

/** Uses the same section renderer as public routes so CMS previews inherit the real typography and motion system. */
export function AdminPreview({value,onClose}:{value:any;onClose:()=>void}){
  const page=value as Partial<SitePage>;
  const sections=Array.isArray(page.sections)?page.sections:[];
  return <div role="dialog" aria-modal="true" aria-label="Private page preview" className="preview-overlay">
    <div className="preview-window">
      <div className="preview-toolbar">
        <div><p className="eyebrow">PRIVATE PREVIEW / NOT PUBLISHED</p><strong>{page.title||'Untitled page'}</strong></div>
        <button type="button" className="admin-button" onClick={onClose}>Close preview ✕</button>
      </div>
      <div className="preview-content">
        {sections.length?<SectionRenderer sections={sections as any}/>:<p className="empty-state">No page sections yet. Add a supported section block in the editor to preview it.</p>}
      </div>
      <div className="preview-footer">Preview uses the same section components, theme tokens and animation presets as published CMS pages. Nothing is published until you explicitly publish it.</div>
    </div>
  </div>;
}
