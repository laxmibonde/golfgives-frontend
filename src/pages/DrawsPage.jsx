import { useState, useEffect } from 'react';
import { drawService } from '../services/api';
import { format } from 'date-fns';
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function DrawsPage() {
  const [draws, setDraws]     = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Promise.all([drawService.getAll(), drawService.getCurrent()])
      .then(([a,c]) => { setDraws(a.data.draws); setCurrent(c.data.draw); if(a.data.draws.length>0) setSelected(a.data.draws[0]); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ paddingTop:'80px' }}>
      <section className="py-20 relative overflow-hidden" style={{
        background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,200,66,0.1) 0%, rgba(251,113,133,0.06) 40%, transparent 65%), var(--burg-900)',
      }}>
        <div className="page-container text-center">
          <div className="badge-gold mb-5 inline-flex text-xs tracking-widest uppercase animate-fade-up">Monthly prize draw</div>
          <h1 className="font-display font-semibold mb-4 animate-fade-up delay-100" style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', color:'var(--cream)', lineHeight:1.1 }}>
            Five numbers.<br /><span className="text-gradient-full">Life-changing prizes.</span>
          </h1>
          <p className="text-lg max-w-lg mx-auto animate-fade-up delay-200" style={{ color:'rgba(253,244,236,0.45)' }}>
            Match your Stableford scores against the monthly drawn numbers. Match 3, 4, or all 5 to win.
          </p>
        </div>
      </section>

      <div className="page-container py-12">
        {/* Current draw */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="badge-gold text-xs tracking-widest uppercase">Current draw</span>
            <div className="flex-1 h-px" style={{ background:'rgba(245,200,66,0.08)' }} />
          </div>
          {loading ? <div className="card animate-pulse" style={{ height:160 }} />
          : current?.status==='published' ? (
            <div className="card animate-fade-up" style={{ background:'rgba(45,16,24,0.85)', border:'1px solid rgba(245,200,66,0.2)', boxShadow:'0 0 60px rgba(245,200,66,0.06)' }}>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div>
                  <div className="font-display font-semibold text-2xl mb-1" style={{ color:'var(--cream)' }}>{MONTHS[(current.month||1)-1]} {current.year}</div>
                  <div className="text-sm" style={{ color:'rgba(253,244,236,0.35)' }}>{current.participantCount} participants · Pool: £{((current.totalPool||0)/100).toFixed(0)}</div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {current.drawnNumbers?.map((n,i) => <div key={i} className="number-ball animate-fade-up" style={{ animationDelay:`${i*0.1}s`, width:64, height:64, fontSize:'1.2rem' }}>{n}</div>)}
                </div>
                <div className="md:ml-auto text-center">
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color:'rgba(253,244,236,0.3)' }}>Jackpot</div>
                  <div className="font-display font-bold text-2xl" style={{ color:'var(--gold)' }}>£{((current.pools?.fiveMatch?.amount||0)/100).toFixed(0)}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12" style={{ border:'1px dashed rgba(245,200,66,0.1)' }}>
              <div className="text-4xl mb-3">🎯</div>
              <p className="font-display text-lg" style={{ color:'rgba(253,244,236,0.4)' }}>Draw not published yet</p>
              <p className="text-sm mt-1" style={{ color:'rgba(253,244,236,0.25)' }}>Numbers drawn on the 1st of every month</p>
            </div>
          )}
        </div>

        {/* Prize tiers */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="badge-gold text-xs tracking-widest uppercase">Prize tiers</span>
            <div className="flex-1 h-px" style={{ background:'rgba(245,200,66,0.06)' }} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { match:'5 Numbers',share:'40%',icon:'🏆',rollover:true,color:'var(--gold)' },
              { match:'4 Numbers',share:'35%',icon:'🥇',rollover:false,color:'var(--rose)' },
              { match:'3 Numbers',share:'25%',icon:'🎯',rollover:false,color:'var(--violet)' },
            ].map((t,i) => (
              <div key={i} className="card-hover text-center" style={{ padding:'28px 20px' }}>
                <div className="text-3xl mb-3">{t.icon}</div>
                <div className="font-display font-semibold text-lg mb-1" style={{ color:t.color }}>{t.match}</div>
                <div className="font-mono font-bold text-3xl mb-2" style={{ color:'var(--cream)' }}>{t.share}</div>
                <div className="text-xs" style={{ color:'rgba(253,244,236,0.35)' }}>of prize pool</div>
                {t.rollover && <div className="badge-gold mt-3 justify-center text-xs">🔄 Jackpot rolls over</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Past draws */}
        {!loading && draws.length>0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="badge-gray text-xs tracking-widest uppercase">Past draws</span>
              <div className="flex-1 h-px" style={{ background:'rgba(255,255,255,0.04)' }} />
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                {draws.map(d => (
                  <button key={d._id} onClick={()=>setSelected(d)} className="w-full text-left p-4 rounded-xl transition-all" style={{
                    background:selected?._id===d._id?'rgba(245,200,66,0.08)':'rgba(45,16,24,0.5)',
                    border:selected?._id===d._id?'1px solid rgba(245,200,66,0.25)':'1px solid rgba(245,200,66,0.05)',
                  }}>
                    <div className="font-medium text-sm" style={{ color:selected?._id===d._id?'var(--gold)':'var(--cream)' }}>{MONTHS[(d.month||1)-1]} {d.year}</div>
                    <div className="text-xs mt-0.5" style={{ color:'rgba(253,244,236,0.3)' }}>£{((d.totalPool||0)/100).toFixed(0)} pool · {d.participantCount} players</div>
                  </button>
                ))}
              </div>
              {selected && (
                <div className="lg:col-span-2 card animate-fade-in" style={{ background:'rgba(45,16,24,0.85)' }}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="font-display font-semibold text-xl" style={{ color:'var(--cream)' }}>{MONTHS[(selected.month||1)-1]} {selected.year}</h3>
                      <p className="text-xs mt-0.5" style={{ color:'rgba(253,244,236,0.3)' }}>{selected.publishedAt?format(new Date(selected.publishedAt),'dd MMM yyyy'):''} · {selected.drawLogic} logic</p>
                    </div>
                    <span className="badge-gold text-xs">Published</span>
                  </div>
                  <div className="flex gap-3 mb-5 flex-wrap">
                    {selected.drawnNumbers?.map((n,i) => <div key={i} className="number-ball">{n}</div>)}
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label:'5 Match', amount:selected.pools?.fiveMatch?.amount, rolled:selected.pools?.fiveMatch?.isRolledOver, color:'var(--gold)' },
                      { label:'4 Match', amount:selected.pools?.fourMatch?.amount, color:'var(--rose)' },
                      { label:'3 Match', amount:selected.pools?.threeMatch?.amount, color:'var(--violet)' },
                    ].map(t => (
                      <div key={t.label} className="text-center p-3 rounded-xl" style={{ background:'rgba(0,0,0,0.2)' }}>
                        <div className="font-display font-bold text-lg" style={{ color:t.color }}>£{((t.amount||0)/100).toFixed(0)}</div>
                        <div className="text-xs mt-0.5" style={{ color:'rgba(253,244,236,0.35)' }}>{t.label}</div>
                        {t.rolled && <div className="text-xs mt-1" style={{ color:'var(--gold)' }}>Rolled →</div>}
                      </div>
                    ))}
                  </div>
                  {selected.winners?.length>0 ? (
                    <div className="space-y-2">
                      {selected.winners.map(w => (
                        <div key={w._id} className="flex items-center justify-between p-3 rounded-xl" style={{ background:'rgba(245,200,66,0.03)', border:'1px solid rgba(245,200,66,0.06)' }}>
                          <div><div className="text-sm font-medium" style={{ color:'var(--cream)' }}>{w.user?.name||'Anonymous'}</div><div className="text-xs" style={{ color:'rgba(253,244,236,0.35)' }}>{w.matchType}</div></div>
                          <div className="text-right"><div className="font-mono font-bold text-sm" style={{ color:'var(--gold)' }}>£{((w.prizeAmount||0)/100).toFixed(2)}</div><span className={w.paymentStatus==='paid'?'badge-green':'badge-yellow'} style={{ fontSize:'0.62rem' }}>{w.paymentStatus}</span></div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-center py-4" style={{ color:'rgba(253,244,236,0.25)' }}>No winners this draw.</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
