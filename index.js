// cg-aos/index.js
const hasWindow = typeof window !== 'undefined';
const hasDoc = typeof document !== 'undefined';

const prefersReduced = () =>
  (hasWindow && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) ?? false;

const setStyle = (el, s) => { for (const k in s) el.style[k] = s[k]; };

const initial = {
  fade:{opacity:'0'},
  'fade-up':{opacity:'0',transform:'translateY(16px)'},
  'fade-down':{opacity:'0',transform:'translateY(-16px)'},
  'fade-left':{opacity:'0',transform:'translateX(16px)'},
  'fade-right':{opacity:'0',transform:'translateX(-16px)'},
  'zoom-in':{opacity:'0',transform:'scale(.96)'},
  'zoom-out':{opacity:'0',transform:'scale(1.04)'}
};
const fin = {
  fade:{opacity:'1',transform:'none'},
  'fade-up':{opacity:'1',transform:'none'},
  'fade-down':{opacity:'1',transform:'none'},
  'fade-left':{opacity:'1',transform:'none'},
  'fade-right':{opacity:'1',transform:'none'},
  'zoom-in':{opacity:'1',transform:'none'},
  'zoom-out':{opacity:'1',transform:'none'}
};

const num  = (v,d=0)=> (v!=null && v!=='' && !Number.isNaN(+v) ? +v : d);
const bool = (v,d=false)=> (v==null ? d : v==='true' || v==='');

function prep(el, onceDefault){
  if (el.__cgObserved__) return;
  el.__cgObserved__ = true;

  const type = el.dataset.cg || 'fade';
  const duration = num(el.dataset.cgDuration,500);
  const delay = num(el.dataset.cgDelay,0);
  const easing = el.dataset.cgEasing || 'cubic-bezier(.2,.7,.2,1)';
  const once = bool(el.dataset.cgOnce, onceDefault);

  el.__cgOnce__ = once;
  el.__cgRepeat__ = !once;

  setStyle(el, {
    willChange:'opacity, transform',
    transition:`opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
    ...(initial[type] ?? {opacity:'0'})
  });
  if (delay) el.style.transitionDelay = `${delay}ms`;

  const stagger = num(el.dataset.cgStagger,0);
  if (stagger) {
    el.querySelectorAll(':scope > *').forEach((c,i)=>{
      c.style.transitionDelay = `${num(c.dataset?.cgDelay,delay)+i*stagger}ms`;
    });
  }
}

export const cgAOS = {
  init(opts = {}){
    if (!hasDoc || !hasWindow) return { destroy(){}, observe(){}, unobserve(){} };

    const sel = opts.selector ?? '[data-cg]';

    if (prefersReduced() && opts.reducedMotion !== 'none') {
      document.querySelectorAll(sel).forEach(el=>{
        if (opts.reducedMotion === 'skip') el.removeAttribute('data-cg');
        const t = el.dataset.cg || 'fade';
        setStyle(el, fin[t] ?? {opacity:'1',transform:'none'});
      });
      return { destroy(){}, observe(){}, unobserve(){} };
    }

    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll(sel).forEach(el=>{
        const t = el.dataset.cg || 'fade';
        setStyle(el, fin[t] ?? {opacity:'1',transform:'none'});
      });
      return { destroy(){}, observe(){}, unobserve(){} };
    }

    const io = new IntersectionObserver((entries)=>{
      for (const e of entries) {
        const el = e.target; const t = el.dataset.cg || 'fade';
        if (e.isIntersecting) {
          setStyle(el, fin[t] ?? {opacity:'1',transform:'none'});
          el.classList.add('cg-in');
          el.dispatchEvent(new CustomEvent('cg:enter'));
          if (el.__cgOnce__) io.unobserve(el);
        } else if (el.__cgRepeat__) {
          setStyle(el, initial[t] ?? {opacity:'0'});
          el.classList.remove('cg-in');
          el.dispatchEvent(new CustomEvent('cg:exit'));
        }
      }
    }, { root: opts.root ?? null, rootMargin: opts.rootMargin ?? '0px 0px -10% 0px', threshold: opts.threshold ?? 0.1 });

    document.querySelectorAll(sel).forEach(el=>{ prep(el, opts.once ?? true); io.observe(el); });

    let mo = null;
    if (opts.autoObserve !== false) {
      mo = new MutationObserver(muts=>{
        muts.forEach(m=>m.addedNodes.forEach(n=>{
          if (!(n instanceof HTMLElement)) return;
          if (n.matches?.(sel)) { prep(n, opts.once ?? true); io.observe(n); }
          n.querySelectorAll?.(sel)?.forEach(el=>{ prep(el, opts.once ?? true); io.observe(el); });
        }));
      });
      mo.observe(document.documentElement, { childList:true, subtree:true });
    }

    return {
      destroy(){ io.disconnect(); mo?.disconnect(); },
      observe(el){ prep(el, opts.once ?? true); io.observe(el); },
      unobserve(el){ io.unobserve(el); }
    };
  }
};
