import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { charityService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

/* Charity category → color theme mapping */
const CATEGORY_THEMES = {
  health:      { color:'var(--rose)',   bg:'rgba(251,113,133,0.08)', border:'rgba(251,113,133,0.2)',  glow:'rgba(251,113,133,0.12)', emoji:'🏥', elements:['💊','🩺','❤️‍🩹','🧬','💉'] },
  environment: { color:'var(--green)',  bg:'rgba(74,222,128,0.08)',  border:'rgba(74,222,128,0.2)',   glow:'rgba(74,222,128,0.12)',  emoji:'🌿', elements:['🌳','🍃','🌱','♻️','🌍'] },
  sport:       { color:'var(--gold)',   bg:'rgba(245,200,66,0.08)',  border:'rgba(245,200,66,0.2)',   glow:'rgba(245,200,66,0.12)',  emoji:'⛳', elements:['🏆','🥇','🎯','⛳','🏌️'] },
  education:   { color:'var(--blue)',   bg:'rgba(56,189,248,0.08)',  border:'rgba(56,189,248,0.2)',   glow:'rgba(56,189,248,0.12)',  emoji:'🎓', elements:['📚','✏️','🎓','📖','🔬'] },
  community:   { color:'var(--violet)', bg:'rgba(167,139,250,0.08)', border:'rgba(167,139,250,0.2)',  glow:'rgba(167,139,250,0.12)', emoji:'🤝', elements:['🏘️','🤝','👥','🌟','🏡'] },
  other:       { color:'var(--gold)',   bg:'rgba(245,200,66,0.08)',  border:'rgba(245,200,66,0.2)',   glow:'rgba(245,200,66,0.12)',  emoji:'💛', elements:['⭐','✨','💛','🌟','🎗️'] },
};

/* Floating 3D element */
function Float3D({ emoji, style }) {
  return (
    <div style={{ position:'absolute', fontSize:'3rem', opacity:0.12, pointerEvents:'none', animation:'float 6s ease-in-out infinite', ...style }}>
      {emoji}
    </div>
  );
}

export default function CharityPage() {
  const { id } = useParams();
  const { user, isSubscribed, refreshUser } = useAuth();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    charityService.getOne(id)
      .then(r => setCharity(r.data.charity))
      .catch(() => toast.error('Charity not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const theme = CATEGORY_THEMES[charity?.category] || CATEGORY_THEMES.other;
  const isSelected = user?.selectedCharity?._id === charity?._id || user?.selectedCharity === charity?._id;

  const handleSelect = async () => {
    if (!isSubscribed) return toast.error('Subscribe first to support a charity');
    setSelecting(true);
    try {
      await charityService.select({ charityId: charity._id, contributionPercent: 10 });
      await refreshUser();
      toast.success(`Now supporting ${charity.name}! ❤️`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to select charity');
    } finally { setSelecting(false); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ paddingTop:80 }}>
      <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor:'var(--gold)', borderTopColor:'transparent' }} />
    </div>
  );

  if (!charity) return (
    <div className="min-h-screen flex items-center justify-center text-center px-4" style={{ paddingTop:80 }}>
      <div>
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="font-display text-2xl mb-3" style={{ color:'var(--cream)' }}>Charity not found</h2>
        <Link to="/charities" className="btn-gold">← Back to charities</Link>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop:'80px', minHeight:'100vh', transition:'background 0.8s ease' }}>
      {/* Dynamic hero section with category color */}
      <section className="relative overflow-hidden py-20"
        style={{
          background:`radial-gradient(ellipse 100% 70% at 50% -5%, ${theme.glow} 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 80% 60%, ${theme.bg} 0%, transparent 50%), var(--burg-900)`,
          borderBottom:`1px solid ${theme.border}`,
          transition:'background 0.8s ease',
        }}>

        {/* Floating 3D elements */}
        {theme.elements.map((e,i) => (
          <Float3D key={i} emoji={e} style={{
            right:`${5 + i*18}%`,
            top:`${10 + (i%3)*25}%`,
            animationDelay:`${i*0.8}s`,
            animationDuration:`${5 + i*0.7}s`,
            fontSize: i===0?'5rem':i===1?'3.5rem':'2.5rem',
          }} />
        ))}

        <div className="page-container max-w-4xl relative z-10">
          <Link to="/charities" className="inline-flex items-center gap-2 mb-8 text-sm transition-colors"
            style={{ color:`${theme.color}80` }}
            onMouseEnter={e => e.currentTarget.style.color = theme.color}
            onMouseLeave={e => e.currentTarget.style.color = `${theme.color}80`}>
            ← Back to all charities
          </Link>

          {charity.coverImage && (
            <div className="h-64 md:h-80 rounded-2xl overflow-hidden mb-8"
              style={{ border:`1px solid ${theme.border}`, boxShadow:`0 0 60px ${theme.glow}` }}>
              <img src={charity.coverImage} alt={charity.name} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="flex-1">
              <span className="badge mb-4 inline-flex capitalize text-xs"
                style={{ background:theme.bg, color:theme.color, border:`1px solid ${theme.border}` }}>
                {theme.emoji} {charity.category}
              </span>
              <h1 className="font-display font-semibold mb-4"
                style={{ fontSize:'clamp(2rem,5vw,3.5rem)', color:'var(--cream)', lineHeight:1.1 }}>
                {charity.name}
              </h1>
              <p className="text-lg leading-relaxed mb-5" style={{ color:'rgba(253,244,236,0.65)' }}>
                {charity.description}
              </p>
              {charity.website && (
                <a href={charity.website} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm transition-colors"
                  style={{ color:theme.color }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                  Visit website ↗
                </a>
              )}
            </div>

            {/* Action card */}
            <div className="card w-full md:w-64 flex-shrink-0"
              style={{ background:'rgba(45,16,24,0.95)', border:`1px solid ${theme.border}`, boxShadow:`0 0 40px ${theme.glow}` }}>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="text-center p-3 rounded-xl" style={{ background:theme.bg }}>
                  <div className="font-display font-bold text-xl" style={{ color:theme.color }}>
                    {charity.subscriberCount || 0}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color:'rgba(253,244,236,0.4)' }}>Supporters</div>
                </div>
                <div className="text-center p-3 rounded-xl" style={{ background:theme.bg }}>
                  <div className="font-display font-bold text-xl" style={{ color:theme.color }}>
                    £{((charity.totalContributions || 0) / 100).toFixed(0)}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color:'rgba(253,244,236,0.4)' }}>Raised</div>
                </div>
              </div>

              {isSelected ? (
                <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background:theme.bg, color:theme.color, border:`1px solid ${theme.border}` }}>
                  ❤️ Your chosen charity
                </div>
              ) : (
                <button onClick={handleSelect} disabled={selecting}
                  className="w-full py-3 rounded-xl text-sm font-bold transition-all"
                  style={{ background:theme.color, color:'var(--burg-900)', cursor:'pointer' }}
                  onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
                  {selecting ? 'Selecting…' : '❤️ Support This Charity'}
                </button>
              )}

              {!isSubscribed && (
                <Link to="/subscribe" className="btn-outline w-full text-center mt-2 py-2 text-sm block"
                  style={{ borderColor:`${theme.color}30` }}>
                  Subscribe to support
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats section with theme color */}
      <section className="py-12" style={{ background:theme.bg, borderBottom:`1px solid ${theme.border}` }}>
        <div className="page-container max-w-4xl">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { val:`${charity.subscriberCount || 0}`, label:'Active Supporters' },
              { val:`£${((charity.totalContributions || 0)/100).toFixed(0)}`, label:'Total Raised' },
              { val:'10%+', label:'Of Each Subscription' },
            ].map((s,i) => (
              <div key={i}>
                <div className="font-display font-bold text-3xl mb-1" style={{ color:theme.color }}>{s.val}</div>
                <div className="text-xs" style={{ color:'rgba(253,244,236,0.45)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      {charity.upcomingEvents?.length > 0 && (
        <section className="py-16">
          <div className="page-container max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="badge text-xs tracking-widest uppercase"
                style={{ background:theme.bg, color:theme.color, border:`1px solid ${theme.border}` }}>
                Golf Days & Events
              </span>
              <div className="flex-1 h-px" style={{ background:`${theme.color}15` }} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {charity.upcomingEvents.map(ev => (
                <div key={ev._id} className="card-hover flex gap-5"
                  style={{ borderColor:`${theme.color}15` }}>
                  <div className="flex-shrink-0 text-center w-14">
                    <div className="font-display font-bold text-2xl" style={{ color:theme.color, lineHeight:1 }}>
                      {format(new Date(ev.date), 'dd')}
                    </div>
                    <div className="text-xs uppercase tracking-wide mt-0.5" style={{ color:'rgba(253,244,236,0.35)' }}>
                      {format(new Date(ev.date), 'MMM')}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1" style={{ color:'var(--cream)' }}>{ev.title}</div>
                    {ev.location && <div className="text-sm mb-1" style={{ color:'rgba(253,244,236,0.4)' }}>📍 {ev.location}</div>}
                    {ev.description && <div className="text-xs leading-relaxed" style={{ color:'rgba(253,244,236,0.3)' }}>{ev.description}</div>}
                    {ev.registrationUrl && (
                      <a href={ev.registrationUrl} target="_blank" rel="noreferrer"
                        className="text-xs mt-2 inline-block" style={{ color:theme.color }}>
                        Register ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
