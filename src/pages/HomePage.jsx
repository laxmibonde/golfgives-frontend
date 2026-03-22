import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ParticleCanvas from '../components/ui/ParticleCanvas';

function Counter({ target, prefix='', suffix='', duration=2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(tick); else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const MARQUEE_ITEMS = [
  '🏥 Cancer Research UK','🌿 WWF','🎓 Education for All','⛳ Golf Foundation',
  '❤️ British Heart Foundation','🌍 Oxfam','🏃 Sport Relief','🧠 Mind UK',
  '🌱 Trees for Cities','⚽ Street League','🏥 Macmillan','🎗️ Breast Cancer Now',
];

const HOW_IT_WORKS = [
  { n:'01', icon:'💳', title:'Subscribe', desc:'Choose monthly or yearly. Part of every subscription goes directly to your chosen charity — guaranteed.', color:'var(--gold)' },
  { n:'02', icon:'⛳', title:'Enter Scores', desc:'Log your latest Stableford scores. We keep a rolling window of your best 5 at all times.', color:'var(--rose)' },
  { n:'03', icon:'🎯', title:'Join the Draw', desc:'Five numbers drawn monthly. Match 3, 4, or all 5 to win your share of the prize pool.', color:'var(--blue)' },
  { n:'04', icon:'🏆', title:'Win & Give', desc:'Winners get paid. Your charity receives their share every month — win or lose.', color:'var(--violet)' },
];

const TESTIMONIALS = [
  { name:'James R.', role:'Member since 2024', quote:"Won £3,200 last March. But what keeps me here is knowing my Cancer Research donation happens automatically.", avatar:'JR', color:'var(--rose)' },
  { name:'Sarah M.', role:'Golf Club Captain', quote:"Introduced it to our whole club. We're collectively raising thousands for local charities. Amazing concept.", avatar:'SM', color:'var(--blue)' },
  { name:'David K.', role:'5-number winner', quote:"Hit all 5 in December. Jackpot had rolled over twice — walked away with £47,000. Still can't believe it.", avatar:'DK', color:'var(--gold)' },
];

export default function HomePage() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [activeTesti, setActiveTesti] = useState(0);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const t = setInterval(() => setActiveTesti(v => (v+1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <ParticleCanvas />

      {/* ── HERO ── */}
      <section className="hero-bg relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(245,200,66,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,200,66,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Ripple rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[200,380,560].map((s,i) => (
            <div key={i} className="ripple-ring absolute -translate-x-1/2 -translate-y-1/2"
              style={{ width:s, height:s, borderColor: i===0?'rgba(245,200,66,0.25)':i===1?'rgba(251,113,133,0.15)':'rgba(167,139,250,0.1)', animationDelay:`${i*1.3}s` }} />
          ))}
        </div>

        <div className="page-container relative z-10 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className={`inline-flex items-center gap-2 badge-gold mb-8 text-sm px-5 py-2.5 transition-all duration-700 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-4'}`}>
                <span className="w-2 h-2 rounded-full" style={{ background:'var(--gold)', animation:'pulseGold 1.5s infinite', display:'inline-block' }} />
                Monthly draw open · £42,000 pool
              </div>

              <h1 className={`font-display font-semibold leading-none mb-6 transition-all duration-700 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}
                style={{ fontSize:'clamp(3rem,7vw,5.5rem)', transitionDelay:'0.15s' }}>
                Golf that<br />
                <span className="text-gradient-full">changes lives.</span>
              </h1>

              <p className={`text-lg mb-10 leading-relaxed transition-all duration-700 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}
                style={{ color:'rgba(253,244,236,0.6)', transitionDelay:'0.3s', maxWidth:480 }}>
                Subscribe. Track your scores. Win monthly prizes.
                <span style={{ color:'var(--rose)' }}> And automatically support the charity you love</span> — every single month.
              </p>

              <div className={`flex flex-wrap gap-4 mb-10 transition-all duration-700 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-4'}`}
                style={{ transitionDelay:'0.45s' }}>
                {user ? (
                  <Link to="/dashboard" className="btn-gold text-lg px-10 py-4">Go to Dashboard →</Link>
                ) : (
                  <>
                    <Link to="/register" className="btn-gold text-lg px-10 py-4">❤️ Start Giving Today</Link>
                    <Link to="/charities" className="btn-outline text-base">Explore Charities ↓</Link>
                  </>
                )}
              </div>

              <div className={`flex flex-wrap gap-5 text-sm transition-all duration-700 ${visible?'opacity-100':'opacity-0'}`}
                style={{ color:'rgba(253,244,236,0.3)', transitionDelay:'0.6s' }}>
                {['No lock-in','10% min. to charity','Stripe-secured','Cancel anytime'].map((t,i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span style={{ color:'var(--gold)', fontSize:'0.65rem' }}>✓</span>{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — 3D orbit */}
            <div className={`flex items-center justify-center transition-all duration-1000 ${visible?'opacity-100 translate-x-0':'opacity-0 translate-x-12'}`}
              style={{ transitionDelay:'0.3s' }}>
              <div className="orbit-container">
                <div className="orbit-ring-outer" />
                <div className="orbit-ring-mid" />
                <div className="orbit-center">⛳</div>
                <div className="orbit-dot orbit-dot-1">🏆</div>
                <div className="orbit-dot orbit-dot-2">❤️</div>
                <div className="orbit-dot orbit-dot-3">🎯</div>
                {/* Labels */}
                {[
                  { label:'Play', angle:0, color:'var(--gold)' },
                  { label:'Win', angle:90, color:'var(--rose)' },
                  { label:'Give', angle:180, color:'var(--violet)' },
                  { label:'Repeat', angle:270, color:'var(--blue)' },
                ].map((item,i) => {
                  const rad = (item.angle * Math.PI) / 180;
                  const r = 148;
                  return (
                    <div key={i} className="absolute text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
                      style={{
                        left:`calc(50% + ${Math.cos(rad)*r}px)`, top:`calc(50% + ${Math.sin(rad)*r}px)`,
                        transform:'translate(-50%,-50%)',
                        background:'rgba(45,16,24,0.95)', border:`1px solid ${item.color}44`,
                        color:item.color, backdropFilter:'blur(8px)', fontSize:'0.72rem',
                      }}>
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { val:42000, pre:'£', suf:'+', label:'Prize Pool', color:'var(--gold)', delay:'0.7s' },
              { val:1200,  pre:'',  suf:'+', label:'Members', color:'var(--rose)', delay:'0.8s' },
              { val:18,    pre:'',  suf:'',  label:'Charities', color:'var(--blue)', delay:'0.9s' },
              { val:97,    pre:'£', suf:'K', label:'Raised', color:'var(--violet)', delay:'1s' },
            ].map((s,i) => (
              <div key={i} className={`card text-center transition-all duration-700 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}
                style={{ transitionDelay:s.delay, background:'rgba(45,16,24,0.75)', backdropFilter:'blur(20px)' }}>
                <div className="font-display font-bold mb-1" style={{ fontSize:'clamp(1.6rem,4vw,2.2rem)', color:s.color }}>
                  <Counter target={s.val} prefix={s.pre} suffix={s.suf} />
                </div>
                <div style={{ color:'rgba(253,244,236,0.4)', fontSize:'0.75rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-800"
          style={{ color:'rgba(253,244,236,0.25)' }}>
          <span style={{ fontSize:'0.65rem', letterSpacing:'0.15em', textTransform:'uppercase' }}>Scroll</span>
          <div style={{ width:1, height:40, background:'linear-gradient(to bottom, rgba(245,200,66,0.5), transparent)' }} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-5 border-y" style={{ borderColor:'rgba(245,200,66,0.06)', background:'rgba(26,10,14,0.8)' }}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((c,i) => (
              <span key={i} className="flex items-center gap-3 mx-8 whitespace-nowrap text-sm"
                style={{ color:'rgba(253,244,236,0.3)', letterSpacing:'0.03em' }}>
                {c}
                <span style={{ color:'var(--gold)', fontSize:'0.4rem', opacity:0.4 }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── IMPACT ── */}
      <section className="py-28">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge-rose mb-6 inline-flex text-xs tracking-widest uppercase">Why GolfGives</div>
              <h2 className="section-title mb-6">
                Every round you play<br />
                <em style={{ fontStyle:'italic', color:'var(--gold)' }}>funds something real.</em>
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color:'rgba(253,244,236,0.55)' }}>
                We built a platform that doesn't ask you to do more — just play the golf you already play.
                Your subscription automatically sends money to a charity you believe in.
              </p>
              <div className="space-y-3">
                {[
                  { icon:'❤️', title:'Charity first', desc:'Min 10% of every subscription goes directly to your chosen charity.', color:'var(--rose)' },
                  { icon:'🎯', title:'Monthly draws', desc:'Five numbers drawn monthly. Match them to your Stableford scores and win.', color:'var(--blue)' },
                  { icon:'📊', title:'Full transparency', desc:'See exactly how much your charity has received. Every penny accounted for.', color:'var(--violet)' },
                ].map((item,i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl transition-all hover:bg-white/5"
                    style={{ background:'rgba(245,200,66,0.02)', border:'1px solid rgba(245,200,66,0.06)' }}>
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold mb-1" style={{ color:item.color }}>{item.title}</div>
                      <div className="text-sm leading-relaxed" style={{ color:'rgba(253,244,236,0.45)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative flex items-center justify-center">
              <div style={{ position:'relative', width:320, height:320 }}>
                <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1px dashed rgba(245,200,66,0.15)', animation:'spinSlow 22s linear infinite' }} />
                <div style={{ position:'absolute', inset:32, borderRadius:'50%', border:'1px solid rgba(251,113,133,0.12)', animation:'spinSlow 32s linear infinite reverse' }} />
                <div style={{ position:'absolute', inset:64, borderRadius:'50%', border:'1px solid rgba(167,139,250,0.1)', animation:'spinSlow 18s linear infinite' }} />
                <div style={{ position:'absolute', inset:90, borderRadius:'50%',
                  background:'radial-gradient(circle, rgba(245,200,66,0.15), rgba(245,200,66,0.03))',
                  border:'1px solid rgba(245,200,66,0.25)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'3rem',
                  animation:'float 4s ease-in-out infinite'
                }}>
                  ❤️
                </div>
                {/* Corner accent orbs */}
                {[
                  { c:'var(--gold)',   top:'5%',  left:'50%', e:'🏆' },
                  { c:'var(--rose)',   top:'50%', left:'95%', e:'❤️' },
                  { c:'var(--blue)',   top:'95%', left:'50%', e:'🎯' },
                  { c:'var(--violet)', top:'50%', left:'5%',  e:'⛳' },
                ].map((dot,i) => (
                  <div key={i} className="absolute text-base font-bold w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      top:dot.top, left:dot.left, transform:'translate(-50%,-50%)',
                      background:'rgba(45,16,24,0.95)',
                      border:`1.5px solid ${dot.c}44`,
                      color:dot.c, backdropFilter:'blur(8px)',
                    }}>
                    {dot.e}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28" style={{ background:'rgba(26,10,14,0.7)', borderTop:'1px solid rgba(245,200,66,0.05)', borderBottom:'1px solid rgba(245,200,66,0.05)' }}>
        <div className="page-container">
          <div className="text-center mb-16">
            <div className="badge-blue mb-4 inline-flex text-xs tracking-widest uppercase">Simple as a birdie</div>
            <h2 className="section-title mb-4">How it works</h2>
            <p className="text-lg max-w-lg mx-auto" style={{ color:'rgba(253,244,236,0.45)' }}>
              Four steps between you and a life-changing prize — while funding causes you love.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step,i) => (
              <div key={i} className="card-hover relative group" style={{ padding:'32px 24px' }}>
                <div className="absolute top-4 right-5 font-mono font-bold"
                  style={{ fontSize:'4rem', color:'rgba(255,255,255,0.025)', lineHeight:1, userSelect:'none' }}>
                  {step.n}
                </div>
                {i < HOW_IT_WORKS.length-1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-5 z-10"
                    style={{ height:1, background:`linear-gradient(90deg, ${step.color}40, transparent)` }} />
                )}
                <div className="text-3xl mb-5">{step.icon}</div>
                <h3 className="font-display font-semibold text-xl mb-3" style={{ color:step.color }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:'rgba(253,244,236,0.45)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIZES ── */}
      <section className="py-28">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="badge-gold mb-6 inline-flex text-xs tracking-widest uppercase">Monthly prizes</div>
              <h2 className="section-title mb-6">
                Three ways to<br />
                <span className="text-gradient-gold">win every month.</span>
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color:'rgba(253,244,236,0.5)' }}>
                Your golf scores become your lottery numbers. The jackpot rolls over if unclaimed — building month after month.
              </p>
              {/* Numbers display */}
              <div className="flex gap-3 flex-wrap mb-8">
                {[7,14,23,31,38].map((n,i) => (
                  <div key={i} className="number-ball animate-fade-up" style={{ animationDelay:`${i*0.1}s` }}>{n}</div>
                ))}
              </div>
              <Link to={user?'/dashboard':'/register'} className="btn-gold">Enter This Month's Draw →</Link>
            </div>
            <div className="space-y-4">
              {[
                { match:'5 Numbers',share:'40%',label:'Jackpot',rollover:true,color:'var(--gold)',icon:'🏆',example:'£24,000+' },
                { match:'4 Numbers',share:'35%',label:'Major Win',rollover:false,color:'var(--rose)',icon:'🥇',example:'£21,000' },
                { match:'3 Numbers',share:'25%',label:'Win',rollover:false,color:'var(--violet)',icon:'🎯',example:'£15,000' },
              ].map((p,i) => (
                <div key={i} className="card-hover flex items-center gap-4" style={{ padding:'20px 24px' }}>
                  <div className="number-ball flex-shrink-0 font-mono text-sm"
                    style={{ borderColor:`${p.color}55`, color:p.color, background:`${p.color}10`, fontSize:'0.8rem' }}>
                    {p.share}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-0.5" style={{ color:'var(--cream)' }}>{p.match}</div>
                    <div className="text-sm" style={{ color:'rgba(253,244,236,0.4)' }}>
                      Example: <span style={{ color:p.color }}>{p.example}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl">{p.icon}</div>
                    {p.rollover && <span className="badge-gold" style={{ fontSize:'0.62rem' }}>Jackpot</span>}
                  </div>
                </div>
              ))}
              {/* Pool bar */}
              <div className="card" style={{ padding:'20px 24px' }}>
                <div className="text-xs font-medium mb-3" style={{ color:'rgba(253,244,236,0.45)' }}>Prize pool split</div>
                <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                  <div style={{ width:'40%', background:'var(--gold)', borderRadius:'4px 0 0 4px' }} />
                  <div style={{ width:'35%', background:'var(--rose)' }} />
                  <div style={{ width:'25%', background:'var(--violet)', borderRadius:'0 4px 4px 0' }} />
                </div>
                <div className="flex justify-between mt-2 text-xs" style={{ color:'rgba(253,244,236,0.35)' }}>
                  <span style={{ color:'var(--gold)' }}>5-match 40%</span>
                  <span style={{ color:'var(--rose)' }}>4-match 35%</span>
                  <span style={{ color:'var(--violet)' }}>3-match 25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28" style={{ background:'rgba(26,10,14,0.7)', borderTop:'1px solid rgba(245,200,66,0.05)' }}>
        <div className="page-container">
          <div className="text-center mb-14">
            <div className="badge-violet mb-4 inline-flex text-xs tracking-widest uppercase">From our members</div>
            <h2 className="section-title">Real stories, <span className="text-gradient-gold">real impact.</span></h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="card relative overflow-hidden" style={{ padding:'40px', background:'rgba(45,16,24,0.8)' }}>
              <div className="absolute top-5 left-7 font-display text-7xl" style={{ color:'rgba(245,200,66,0.08)', lineHeight:1 }}>"</div>
              <div key={activeTesti} className="animate-fade-in">
                <p className="text-lg leading-relaxed mb-6 relative z-10"
                  style={{ color:'rgba(253,244,236,0.8)', fontStyle:'italic' }}>
                  "{TESTIMONIALS[activeTesti].quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background:`${TESTIMONIALS[activeTesti].color}20`, color:TESTIMONIALS[activeTesti].color }}>
                    {TESTIMONIALS[activeTesti].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color:'var(--cream)' }}>{TESTIMONIALS[activeTesti].name}</div>
                    <div className="text-xs" style={{ color:'rgba(253,244,236,0.4)' }}>{TESTIMONIALS[activeTesti].role}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              {TESTIMONIALS.map((_,i) => (
                <button key={i} onClick={() => setActiveTesti(i)} className="rounded-full transition-all"
                  style={{ width:activeTesti===i?24:8, height:8,
                    background:activeTesti===i?TESTIMONIALS[i].color:'rgba(245,200,66,0.15)' }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-28">
        <div className="page-container">
          <div className="text-center mb-14">
            <div className="badge-gold mb-4 inline-flex text-xs tracking-widest uppercase">Simple pricing</div>
            <h2 className="section-title">One subscription.<br /><span className="text-gradient-full">Unlimited impact.</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { id:'monthly', name:'Monthly', price:'£9.99', per:'/month', desc:'Perfect for trying it out',
                features:['Full draw entry each month','5-score tracking','Charity contribution 10%+','Winner notifications'],
                cta:'Start Monthly', highlight:false, color:'var(--rose)' },
              { id:'yearly', name:'Yearly', price:'£99', per:'/year', desc:'Save 2 months — best value',
                features:['Everything in Monthly','2 months completely free','Priority support','Exclusive bonus draw'],
                cta:'Start Yearly', highlight:true, color:'var(--gold)', badge:'Most Popular' },
            ].map((plan,i) => (
              <div key={i} className="card-hover relative"
                style={{ border:plan.highlight?`1.5px solid rgba(245,200,66,0.35)`:'1px solid rgba(245,200,66,0.08)',
                  background:plan.highlight?'rgba(61,21,32,0.8)':'rgba(45,16,24,0.65)' }}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge-gold px-4 py-1 text-xs">{plan.badge}</span>
                  </div>
                )}
                <div className="mb-5">
                  <div className="font-display text-xl font-semibold mb-1" style={{ color:plan.color }}>{plan.name}</div>
                  <div className="text-xs" style={{ color:'rgba(253,244,236,0.35)' }}>{plan.desc}</div>
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display font-bold" style={{ fontSize:'3rem', color:'var(--cream)', lineHeight:1 }}>{plan.price}</span>
                  <span style={{ color:'rgba(253,244,236,0.35)' }}>{plan.per}</span>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f,j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color:'rgba(253,244,236,0.6)' }}>
                      <span style={{ color:plan.color, flexShrink:0, marginTop:2 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link to={user?'/subscribe':'/register'}
                  className={plan.highlight?'btn-gold w-full py-3 text-center block':'btn-rose w-full py-3 text-center block'}>
                  {plan.cta} →
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-sm" style={{ color:'rgba(253,244,236,0.25)' }}>
            🔒 Secure via Stripe. Cancel anytime. No hidden fees.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,200,66,0.06), transparent 60%)',
        }} />
        <div className="page-container text-center relative z-10">
          <div className="inline-flex mb-6 animate-bounce-ball text-5xl">⛳</div>
          <h2 className="section-title mb-4">
            Your next round could<br />
            <span className="text-gradient-full">change everything.</span>
          </h2>
          <p className="text-lg mb-10 max-w-lg mx-auto" style={{ color:'rgba(253,244,236,0.45)' }}>
            Join 1,200+ golfers competing for life-changing prizes while supporting causes that matter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={user?'/dashboard':'/register'} className="btn-gold text-lg px-12 py-4">
              ❤️ {user?'Go to Dashboard':'Join GolfGives Free'}
            </Link>
            <Link to="/charities" className="btn-outline text-base">Browse Charities →</Link>
          </div>
          <div className="mt-10 glow-line-multi max-w-sm mx-auto" />
        </div>
      </section>
    </div>
  );
}
