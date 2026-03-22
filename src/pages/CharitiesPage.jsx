import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { charityService } from '../services/api';

const CATEGORY_THEMES = {
  health:      { color:'var(--rose)',   bg:'rgba(251,113,133,0.08)', border:'rgba(251,113,133,0.15)', emoji:'🏥' },
  environment: { color:'var(--green)',  bg:'rgba(74,222,128,0.08)',  border:'rgba(74,222,128,0.15)',  emoji:'🌿' },
  sport:       { color:'var(--gold)',   bg:'rgba(245,200,66,0.08)',  border:'rgba(245,200,66,0.15)',  emoji:'⛳' },
  education:   { color:'var(--blue)',   bg:'rgba(56,189,248,0.08)',  border:'rgba(56,189,248,0.15)',  emoji:'🎓' },
  community:   { color:'var(--violet)', bg:'rgba(167,139,250,0.08)', border:'rgba(167,139,250,0.15)', emoji:'🤝' },
  other:       { color:'var(--gold)',   bg:'rgba(245,200,66,0.08)',  border:'rgba(245,200,66,0.15)',  emoji:'💛' },
};

const CATEGORIES = ['all','health','environment','education','sport','community','other'];

export default function CharitiesPage() {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('all');

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (category !== 'all') params.category = category;
    setLoading(true);
    charityService.getAll(params).then(r => setCharities(r.data.charities)).finally(() => setLoading(false));
  }, [search, category]);

  const featured = charities.filter(c => c.isFeatured);
  const rest      = charities.filter(c => !c.isFeatured);

  const catTheme = CATEGORY_THEMES[category] || { color:'var(--gold)', bg:'transparent', border:'transparent' };

  return (
    <div style={{ paddingTop:'80px' }}>

      {/* Header */}
      <section className="py-20 relative overflow-hidden" style={{
        background:`radial-gradient(ellipse 80% 60% at 50% 0%, ${category!=='all'?catTheme.bg:'rgba(245,200,66,0.08)'} 0%, transparent 60%), var(--burg-900)`,
        transition:'background 0.6s ease',
      }}>
        <div className="page-container text-center">
          <div className="badge-gold mb-5 inline-flex text-xs tracking-widest uppercase animate-fade-up">18 verified partners</div>
          <h1 className="font-display font-semibold mb-4 animate-fade-up delay-100"
            style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', color:'var(--cream)', lineHeight:1.1 }}>
            Causes worth<br /><span className="text-gradient-full">playing for.</span>
          </h1>
          <p className="text-lg max-w-lg mx-auto animate-fade-up delay-200"
            style={{ color:'rgba(253,244,236,0.45)' }}>
            Every subscription automatically funds a charity you believe in. Browse and choose yours.
          </p>
        </div>
      </section>

      {/* Sticky filters */}
      <div className="sticky top-16 z-30 py-4"
        style={{ background:'rgba(26,10,14,0.95)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(245,200,66,0.06)' }}>
        <div className="page-container flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color:'rgba(245,200,66,0.4)' }}>🔍</span>
            <input type="text" className="input pl-10" placeholder="Search charities…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => {
              const t = CATEGORY_THEMES[c] || {};
              const isActive = category === c;
              return (
                <button key={c} onClick={() => setCategory(c)}
                  className="px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200"
                  style={{
                    background: isActive ? (t.bg || 'rgba(245,200,66,0.12)') : 'rgba(45,16,24,0.8)',
                    color: isActive ? (t.color || 'var(--gold)') : 'rgba(253,244,236,0.4)',
                    border: isActive ? `1px solid ${t.border || 'rgba(245,200,66,0.3)'}` : '1px solid rgba(245,200,66,0.06)',
                    fontWeight: isActive ? 700 : 400,
                  }}>
                  {CATEGORY_THEMES[c]?.emoji || '✨'} {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="page-container py-10">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_,i) => <div key={i} className="card animate-pulse" style={{ height:240 }} />)}
          </div>
        ) : (
          <>
            {featured.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="badge-gold text-xs tracking-widest uppercase">⭐ Featured charities</span>
                  <div className="flex-1 h-px" style={{ background:'rgba(245,200,66,0.1)' }} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {featured.map(c => <CharityCard key={c._id} charity={c} />)}
                </div>
              </div>
            )}
            {rest.length > 0 && (
              <div>
                {featured.length > 0 && (
                  <div className="flex items-center gap-3 mb-6">
                    <span className="badge-gray text-xs tracking-widest uppercase">All charities</span>
                    <div className="flex-1 h-px" style={{ background:'rgba(255,255,255,0.04)' }} />
                  </div>
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map(c => <CharityCard key={c._id} charity={c} />)}
                </div>
              </div>
            )}
            {charities.length === 0 && (
              <div className="text-center py-24">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-display text-xl" style={{ color:'rgba(253,244,236,0.35)' }}>No charities found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CharityCard({ charity }) {
  const theme = CATEGORY_THEMES[charity.category] || CATEGORY_THEMES.other;
  return (
    <Link to={`/charities/${charity.slug || charity._id}`} className="block group">
      <div className="card-hover h-full" style={{ borderColor:'rgba(245,200,66,0.06)', transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = theme.border}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(245,200,66,0.06)'}>
        {charity.coverImage ? (
          <div className="h-36 rounded-xl overflow-hidden mb-5 -mx-1"
            style={{ background:theme.bg }}>
            <img src={charity.coverImage} alt={charity.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        ) : (
          <div className="h-36 rounded-xl mb-5 flex items-center justify-center text-5xl"
            style={{ background:theme.bg, border:`1px dashed ${theme.border}` }}>
            {theme.emoji}
          </div>
        )}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
            style={{ background:theme.bg, color:theme.color }}>
            {charity.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1 truncate" style={{ color:'var(--cream)' }}>{charity.name}</h3>
            <p className="text-sm leading-relaxed line-clamp-2" style={{ color:'rgba(253,244,236,0.4)' }}>
              {charity.shortDescription || charity.description}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="badge capitalize" style={{ background:theme.bg, color:theme.color, border:`1px solid ${theme.border}`, fontSize:'0.68rem' }}>
                {theme.emoji} {charity.category}
              </span>
              {charity.subscriberCount > 0 && (
                <span className="text-xs" style={{ color:`${theme.color}80` }}>{charity.subscriberCount} supporters</span>
              )}
            </div>
          </div>
        </div>
        <div className="progress-bar mt-4">
          <div className="progress-fill" style={{ width:`${Math.min(100,(charity.subscriberCount||0)*5)}%`, background:`linear-gradient(90deg, ${theme.color}, ${theme.color}80)` }} />
        </div>
      </div>
    </Link>
  );
}
