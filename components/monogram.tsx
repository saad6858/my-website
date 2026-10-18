export function Monogram({className='brand-symbol'}:{className?:string}) {
  return <svg className={className} viewBox="0 0 96 72" role="img" aria-label="SM Automations monogram" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path d="M43.9 10.8C36.1 4.8 23.3 6.5 16.7 13.4c-7.3 7.7-3.5 16.4 8.4 20.5l13.6 4.7c10.8 3.8 12.8 11.5 6.1 18.3-7.1 7.3-20.6 7.1-29.1-1.1" stroke="currentColor" strokeWidth="5.2" strokeLinecap="square" strokeLinejoin="round"/>
    <path d="M52.5 60.8V12.1L70.4 36 88 12.1v48.7" stroke="currentColor" strokeWidth="5.2" strokeLinecap="square" strokeLinejoin="round"/>
    <path d="M5 68H91" stroke="currentColor" strokeOpacity=".36" strokeWidth="1.4"/>
    <circle cx="88" cy="7" r="3" fill="var(--signal,#ff4d57)"/>
  </svg>;
}
