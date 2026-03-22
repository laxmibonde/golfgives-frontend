import { useState, useEffect } from 'react';
import { adminService, drawService, charityService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const TABS = [
  { id: 'overview',  label: '📊 Overview',     desc: 'Platform at a glance' },
  { id: 'users',     label: '👥 Users',         desc: 'Manage subscribers' },
  { id: 'draw',      label: '🎯 Draw Engine',   desc: 'Configure & run draws' },
  { id: 'charities', label: '❤️ Charities',     desc: 'Manage listings' },
  { id: 'winners',   label: '🏆 Winners',       desc: 'Verify & pay winners' },
  { id: 'analytics', label: '📈 Analytics',     desc: 'Reports & insights' },
];

export default function AdminPage() {
  const [tab, setTab] = useState('overview');
  const { user } = useAuth();

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>

      {/* Admin header */}
      <section className="py-10 border-b" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(167,139,250,0.1), transparent 60%), var(--burg-900)',
        borderColor: 'rgba(167,139,250,0.1)',
      }}>
        <div className="page-container">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)' }}>
                  ⚙️
                </div>
                <span className="badge-violet text-xs uppercase tracking-widest">Administrator</span>
              </div>
              <h1 className="font-display font-semibold" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--cream)' }}>
                Admin Control Panel
              </h1>
              <p className="mt-1 text-sm" style={{ color: 'rgba(253,244,236,0.4)' }}>
                Welcome, {user?.name} — manage users, draws, charities and platform analytics
              </p>
            </div>
            {/* Quick stats */}
            <div className="hidden lg:flex gap-3">
              <QuickStatBadge label="Platform Status" value="🟢 Live" color="var(--green)" />
            </div>
          </div>
        </div>
      </section>

      <div className="page-container py-8">
        {/* Tab navigation */}
        <div className="flex gap-1 flex-wrap mb-8 p-1.5 rounded-2xl w-fit"
          style={{ background: 'rgba(45,16,24,0.9)', border: '1px solid rgba(167,139,250,0.1)' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
              style={{
                background: tab === t.id ? 'var(--violet)' : 'transparent',
                color: tab === t.id ? '#1a0a0e' : 'rgba(253,244,236,0.45)',
                fontWeight: tab === t.id ? 700 : 400,
                fontSize: '0.9rem',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'overview'  && <AdminOverview />}
        {tab === 'users'     && <AdminUsers />}
        {tab === 'draw'      && <AdminDrawEngine />}
        {tab === 'charities' && <AdminCharities />}
        {tab === 'winners'   && <AdminWinners />}
        {tab === 'analytics' && <AdminAnalytics />}
      </div>
    </div>
  );
}

function QuickStatBadge({ label, value, color }) {
  return (
    <div className="px-4 py-2 rounded-xl text-center" style={{ background: 'rgba(45,16,24,0.8)', border: '1px solid rgba(167,139,250,0.1)' }}>
      <div className="text-sm font-bold" style={{ color }}>{value}</div>
      <div className="text-xs mt-0.5" style={{ color: 'rgba(253,244,236,0.35)' }}>{label}</div>
    </div>
  );
}

/* ── OVERVIEW ── */
function AdminOverview() {
  const [stats, setStats] = useState(null);
  useEffect(() => { adminService.getStats().then(r => setStats(r.data.stats)); }, []);

  if (!stats) return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => <div key={i} className="card animate-pulse" style={{ height: 120 }} />)}
    </div>
  );

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: '👤', color: 'var(--blue)', sub: 'Registered accounts' },
    { label: 'Active Subscribers', value: stats.activeSubscribers, icon: '✅', color: 'var(--green)', sub: 'Paying members' },
    { label: 'Charity Partners', value: stats.totalCharities, icon: '❤️', color: 'var(--rose)', sub: 'Active charities' },
    { label: 'Latest Prize Pool', value: `£${((stats.latestDrawPool || 0) / 100).toFixed(0)}`, icon: '🏆', color: 'var(--gold)', sub: 'Current draw' },
    { label: 'Total Raised', value: `£${((stats.totalContributions || 0) / 100).toFixed(0)}`, icon: '🌿', color: 'var(--violet)', sub: 'For charities' },
    { label: 'Conversion Rate', value: `${stats.totalUsers > 0 ? Math.round((stats.activeSubscribers / stats.totalUsers) * 100) : 0}%`, icon: '📊', color: 'var(--blue)', sub: 'Visitors to subscribers' },
  ];

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="card-hover animate-fade-up" style={{ animationDelay: `${i * 0.08}s`, background: 'rgba(45,16,24,0.8)' }}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{c.icon}</span>
              <span className="badge text-xs" style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}25` }}>Live</span>
            </div>
            <div className="font-display font-bold mb-1" style={{ fontSize: '2.2rem', color: c.color, lineHeight: 1 }}>
              {c.value}
            </div>
            <div className="font-medium text-sm" style={{ color: 'var(--cream)' }}>{c.label}</div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(253,244,236,0.35)' }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--cream)' }}>Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Run Draw Simulation', icon: '🎯', color: 'var(--gold)', tab: 'draw' },
            { label: 'Verify Winners', icon: '✅', color: 'var(--green)', tab: 'winners' },
            { label: 'Add New Charity', icon: '❤️', color: 'var(--rose)', tab: 'charities' },
            { label: 'View Analytics', icon: '📈', color: 'var(--blue)', tab: 'analytics' },
          ].map((a, i) => (
            <div key={i} className="card-hover flex items-center gap-3 cursor-pointer" style={{ padding: '16px 20px' }}>
              <span className="text-xl">{a.icon}</span>
              <span className="text-sm font-medium" style={{ color: 'var(--cream)' }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── USERS ── */
function AdminUsers() {
  const [users, setUsers]   = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    const params = { search, limit: 50 };
    if (filter !== 'all') params.status = filter;
    adminService.getUsers(params).then(r => setUsers(r.data.users)).finally(() => setLoading(false));
  };
  useEffect(() => { fetchUsers(); }, [search, filter]);

  const toggleStatus = async (id, current) => {
    const next = current === 'active' ? 'inactive' : 'active';
    await adminService.updateSubscription(id, next);
    toast.success(`Subscription set to ${next}`);
    fetchUsers();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" className="input max-w-sm" placeholder="🔍 Search name or email…"
          value={search} onChange={e => setSearch(e.target.value)} style={{ fontSize: '0.95rem' }} />
        <div className="flex gap-2">
          {['all','active','inactive','lapsed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-sm capitalize transition-all"
              style={{
                background: filter === f ? 'var(--violet)' : 'rgba(45,16,24,0.8)',
                color: filter === f ? '#1a0a0e' : 'rgba(253,244,236,0.4)',
                border: filter === f ? 'none' : '1px solid rgba(167,139,250,0.1)',
                fontWeight: filter === f ? 700 : 400,
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card p-0 overflow-hidden" style={{ background: 'rgba(45,16,24,0.8)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
                {['Name', 'Email', 'Plan', 'Status', 'Charity', 'Contribution', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-4 uppercase tracking-widest font-semibold"
                    style={{ color: 'rgba(167,139,250,0.6)', fontSize: '0.75rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>{[...Array(8)].map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-3.5 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.05)', width: '75%' }} />
                    </td>
                  ))}</tr>
                ))
              ) : users.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(167,139,250,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td className="px-5 py-4 font-semibold" style={{ color: 'var(--cream)', fontSize: '0.95rem' }}>{u.name}</td>
                  <td className="px-5 py-4" style={{ color: 'rgba(253,244,236,0.45)', fontSize: '0.85rem' }}>{u.email}</td>
                  <td className="px-5 py-4 capitalize" style={{ color: 'rgba(253,244,236,0.45)', fontSize: '0.85rem' }}>{u.subscription?.plan || '—'}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs capitalize ${u.subscription?.status === 'active' ? 'badge-green' : u.subscription?.status === 'lapsed' ? 'badge-yellow' : 'badge-gray'}`}>
                      {u.subscription?.status || 'inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs truncate max-w-32" style={{ color: 'rgba(253,244,236,0.35)' }}>
                    {u.selectedCharity?.name || '—'}
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: 'var(--rose)' }}>
                    {u.charityContributionPercent || 10}%
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: 'rgba(253,244,236,0.3)' }}>
                    {format(new Date(u.createdAt), 'dd MMM yy')}
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleStatus(u._id, u.subscription?.status)}
                      className="text-xs font-medium underline transition-colors"
                      style={{ color: 'rgba(167,139,250,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
                      onMouseEnter={e => e.target.style.color = 'var(--violet)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(167,139,250,0.7)'}>
                      Toggle Sub
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && users.length === 0 && (
            <div className="text-center py-12 text-sm" style={{ color: 'rgba(253,244,236,0.25)' }}>No users found</div>
          )}
        </div>
      </div>

      <p className="text-xs" style={{ color: 'rgba(253,244,236,0.25)' }}>
        {users.length} user{users.length !== 1 ? 's' : ''} shown
      </p>
    </div>
  );
}

/* ── DRAW ENGINE ── */
function AdminDrawEngine() {
  const [logic, setLogic]   = useState('random');
  const [sim, setSim]       = useState(null);
  const [loading, setLoading] = useState(false);

  const simulate = async () => {
    setLoading(true);
    try {
      const r = await drawService.simulate({ logic });
      setSim(r.data.simulation);
      toast.success('Simulation complete ✅');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Simulation failed');
    } finally { setLoading(false); }
  };

  const publish = async () => {
    if (!confirm('Publish this draw? This cannot be undone.')) return;
    setLoading(true);
    try {
      await drawService.publish({ logic });
      toast.success('Draw published! 🎉');
      setSim(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Publish failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-5">
        <div className="card" style={{ background: 'rgba(45,16,24,0.8)' }}>
          <h2 className="font-display font-semibold text-xl mb-5" style={{ color: 'var(--cream)' }}>Configure Draw</h2>
          <div className="mb-5">
            <label className="label">Draw Logic</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'random', label: 'Random', icon: '🎲', desc: 'Standard lottery-style draw' },
                { id: 'algorithmic', label: 'Algorithmic', icon: '🧮', desc: 'Weighted by score frequency' },
              ].map(l => (
                <button key={l.id} onClick={() => setLogic(l.id)}
                  className="p-4 rounded-xl text-left transition-all"
                  style={{
                    background: logic === l.id ? 'rgba(167,139,250,0.1)' : 'rgba(0,0,0,0.15)',
                    border: logic === l.id ? '1.5px solid rgba(167,139,250,0.4)' : '1px solid rgba(255,255,255,0.04)',
                    cursor: 'pointer',
                  }}>
                  <div className="font-medium text-sm mb-0.5" style={{ color: logic === l.id ? 'var(--violet)' : 'var(--cream)' }}>
                    {l.icon} {l.label}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(253,244,236,0.3)' }}>{l.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={simulate} disabled={loading} className="btn-secondary py-3">
              {loading ? '⏳ Running…' : '🔍 Simulate'}
            </button>
            <button onClick={publish} disabled={loading} className="btn-gold py-3">
              {loading ? '…' : '🚀 Publish Draw'}
            </button>
          </div>
        </div>

        {/* Draw info */}
        <div className="card" style={{ background: 'rgba(45,16,24,0.8)', border: '1px solid rgba(245,200,66,0.08)' }}>
          <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--gold)' }}>How the Draw Works</h3>
          <ul className="space-y-2 text-sm" style={{ color: 'rgba(253,244,236,0.5)' }}>
            <li className="flex gap-2"><span style={{ color: 'var(--gold)' }}>1.</span>5 numbers (1–45) are drawn each month</li>
            <li className="flex gap-2"><span style={{ color: 'var(--gold)' }}>2.</span>Subscribers' Stableford scores are matched</li>
            <li className="flex gap-2"><span style={{ color: 'var(--gold)' }}>3.</span>Match 3, 4, or 5 numbers to win</li>
            <li className="flex gap-2"><span style={{ color: 'var(--gold)' }}>4.</span>Jackpot rolls over if no 5-number winner</li>
          </ul>
        </div>
      </div>

      {/* Simulation result */}
      {sim && (
        <div className="card animate-fade-in" style={{ background: 'rgba(45,16,24,0.85)', border: '1px solid rgba(167,139,250,0.25)' }}>
          <h3 className="font-display font-semibold text-xl mb-4" style={{ color: 'var(--violet)' }}>Simulation Result</h3>
          <div className="mb-5">
            <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: 'rgba(253,244,236,0.35)' }}>Drawn Numbers</p>
            <div className="flex gap-3 flex-wrap">
              {sim.drawn?.map((n, i) => (
                <div key={i} className="number-ball animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>{n}</div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: '5-match', count: sim.winners?.fiveMatch?.length || 0, color: 'var(--gold)' },
              { label: '4-match', count: sim.winners?.fourMatch?.length || 0, color: 'var(--rose)' },
              { label: '3-match', count: sim.winners?.threeMatch?.length || 0, color: 'var(--violet)' },
            ].map(t => (
              <div key={t.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <div className="font-bold text-2xl" style={{ color: t.color }}>{t.count}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(253,244,236,0.35)' }}>{t.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex justify-between"><span style={{ color: 'rgba(253,244,236,0.4)' }}>Participants</span><span style={{ color: 'var(--cream)' }}>{sim.participantCount}</span></div>
            <div className="flex justify-between"><span style={{ color: 'rgba(253,244,236,0.4)' }}>Total Pool</span><span style={{ color: 'var(--gold)' }}>£{((sim.totalPool || 0) / 100).toFixed(2)}</span></div>
          </div>
          {!sim.hasJackpotWinner && (
            <div className="mt-3 p-3 rounded-xl text-xs" style={{ background: 'rgba(245,200,66,0.06)', border: '1px solid rgba(245,200,66,0.15)', color: 'var(--gold)' }}>
              🔄 No 5-match winner — jackpot rolls over to next month
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── CHARITIES ── */
function AdminCharities() {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    charityService.getAll({ limit: 50 }).then(r => setCharities(r.data.charities)).finally(() => setLoading(false));
  }, []);

  const toggleFeatured = async (id, current) => {
    await charityService.update(id, { isFeatured: !current });
    setCharities(cs => cs.map(c => c._id === id ? { ...c, isFeatured: !current } : c));
    toast.success('Updated!');
  };

  const COLORS = { health: 'var(--rose)', environment: 'var(--green)', sport: 'var(--gold)', education: 'var(--blue)', community: 'var(--violet)', other: 'var(--gold)' };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--cream)' }}>
          Charity Listings ({charities.length})
        </h2>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="card animate-pulse" style={{ height: 120 }} />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {charities.map(c => {
            const color = COLORS[c.category] || 'var(--gold)';
            return (
              <div key={c._id} className="card flex items-start gap-4" style={{ background: 'rgba(45,16,24,0.8)', padding: '20px 24px' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0"
                  style={{ background: `${color}15`, color }}>
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm truncate" style={{ color: 'var(--cream)' }}>{c.name}</span>
                    {c.isFeatured && <span className="badge-gold" style={{ fontSize: '0.62rem' }}>Featured</span>}
                  </div>
                  <div className="text-xs capitalize mb-2" style={{ color }}>{c.category}</div>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(253,244,236,0.35)' }}>
                    <span>{c.subscriberCount || 0} supporters</span>
                    <span>£{((c.totalContributions || 0) / 100).toFixed(0)} raised</span>
                  </div>
                </div>
                <button onClick={() => toggleFeatured(c._id, c.isFeatured)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all flex-shrink-0"
                  style={{
                    background: c.isFeatured ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.05)',
                    color: c.isFeatured ? 'var(--gold)' : 'rgba(253,244,236,0.4)',
                    border: c.isFeatured ? '1px solid rgba(245,200,66,0.25)' : '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                  }}>
                  {c.isFeatured ? '⭐ Featured' : 'Feature'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── WINNERS ── */
function AdminWinners() {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getWinners().then(r => setWinners(r.data.winners)).finally(() => setLoading(false));
  }, []);

  const verify = async (drawId, winnerId, status) => {
    await adminService.verifyWinner(drawId, winnerId, status);
    toast.success(`Winner ${status} ✅`);
    setWinners(ws => ws.map(w =>
      w._id === winnerId ? { ...w, verificationStatus: status, paymentStatus: status === 'approved' ? 'paid' : w.paymentStatus } : w
    ));
  };

  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--cream)' }}>
        Winner Verification
      </h2>
      <div className="card p-0 overflow-hidden" style={{ background: 'rgba(45,16,24,0.8)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(245,200,66,0.06)' }}>
                {['Winner', 'Draw', 'Match', 'Prize', 'Proof', 'Verification', 'Payment', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-4 uppercase tracking-widest font-semibold"
                    style={{ color: 'rgba(245,200,66,0.5)', fontSize: '0.75rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i}>{[...Array(8)].map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-3.5 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
                    </td>
                  ))}</tr>
                ))
              ) : winners.map(w => (
                <tr key={w._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,200,66,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td className="px-5 py-4 font-semibold" style={{ color: 'var(--cream)', fontSize: '0.95rem' }}>{w.user?.name || '—'}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'rgba(253,244,236,0.4)' }}>{w.drawMonth}/{w.drawYear}</td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'rgba(253,244,236,0.4)' }}>{w.matchType}</td>
                  <td className="px-5 py-4 font-mono font-bold" style={{ color: 'var(--gold)', fontSize: '0.95rem' }}>£{((w.prizeAmount || 0) / 100).toFixed(2)}</td>
                  <td className="px-5 py-4">
                    {w.proofUploaded
                      ? <a href={w.proofUrl} target="_blank" rel="noreferrer" className="text-xs underline" style={{ color: 'var(--blue)' }}>View</a>
                      : <span className="text-xs" style={{ color: 'rgba(253,244,236,0.2)' }}>None</span>}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs ${w.verificationStatus === 'approved' ? 'badge-green' : w.verificationStatus === 'rejected' ? 'badge-red' : w.verificationStatus === 'pending' ? 'badge-yellow' : 'badge-gray'}`}>
                      {w.verificationStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs ${w.paymentStatus === 'paid' ? 'badge-green' : 'badge-gray'}`}>{w.paymentStatus}</span>
                  </td>
                  <td className="px-5 py-4">
                    {w.verificationStatus === 'pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => verify(w.drawId, w._id, 'approved')}
                          className="text-xs font-medium" style={{ color: 'var(--green)', background: 'none', border: 'none', cursor: 'pointer' }}>
                          ✓ Approve
                        </button>
                        <button onClick={() => verify(w.drawId, w._id, 'rejected')}
                          className="text-xs font-medium" style={{ color: 'var(--rose)', background: 'none', border: 'none', cursor: 'pointer' }}>
                          ✕ Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && winners.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🏆</div>
              <p className="text-sm" style={{ color: 'rgba(253,244,236,0.25)' }}>No winners to review yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── ANALYTICS ── */
function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  useEffect(() => { adminService.getStats().then(r => setStats(r.data.stats)); }, []);

  if (!stats) return <div className="card animate-pulse" style={{ height: 300 }} />;

  const convRate = stats.totalUsers > 0 ? Math.round((stats.activeSubscribers / stats.totalUsers) * 100) : 0;
  const avgCharity = stats.activeSubscribers > 0
    ? Math.round(((stats.totalContributions || 0) / 100) / stats.activeSubscribers)
    : 0;

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--cream)' }}>
        Reports & Analytics
      </h2>

      {/* KPI row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Conversion Rate', value: `${convRate}%`, sub: 'Visitors → Subscribers', color: 'var(--blue)', bar: convRate },
          { label: 'Avg Charity Contribution', value: `£${avgCharity}`, sub: 'Per active subscriber', color: 'var(--rose)', bar: Math.min(100, avgCharity * 10) },
          { label: 'Prize Pool Growth', value: `£${((stats.latestDrawPool || 0) / 100).toFixed(0)}`, sub: 'Current month pool', color: 'var(--gold)', bar: 65 },
          { label: 'Charity Impact', value: `£${((stats.totalContributions || 0) / 100).toFixed(0)}`, sub: 'Total raised across all', color: 'var(--violet)', bar: 80 },
        ].map((k, i) => (
          <div key={i} className="card" style={{ background: 'rgba(45,16,24,0.8)' }}>
            <div className="font-display font-bold text-2xl mb-1" style={{ color: k.color }}>{k.value}</div>
            <div className="font-medium text-sm mb-0.5" style={{ color: 'var(--cream)' }}>{k.label}</div>
            <div className="text-xs mb-3" style={{ color: 'rgba(253,244,236,0.35)' }}>{k.sub}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${k.bar}%`, background: k.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Breakdown tables */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card" style={{ background: 'rgba(45,16,24,0.8)' }}>
          <h3 className="font-display font-semibold text-lg mb-4" style={{ color: 'var(--gold)' }}>
            Subscription Breakdown
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Active Subscribers', value: stats.activeSubscribers, color: 'var(--green)', pct: Math.round((stats.activeSubscribers / Math.max(stats.totalUsers, 1)) * 100) },
              { label: 'Inactive / Cancelled', value: stats.totalUsers - stats.activeSubscribers, color: 'var(--rose)', pct: Math.round(((stats.totalUsers - stats.activeSubscribers) / Math.max(stats.totalUsers, 1)) * 100) },
              { label: 'Total Registered', value: stats.totalUsers, color: 'var(--blue)', pct: 100 },
            ].map((row, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: 'rgba(253,244,236,0.6)' }}>{row.label}</span>
                  <span className="font-mono font-bold" style={{ color: row.color }}>{row.value}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${row.pct}%`, background: row.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ background: 'rgba(45,16,24,0.8)' }}>
          <h3 className="font-display font-semibold text-lg mb-4" style={{ color: 'var(--rose)' }}>
            Charity Impact Summary
          </h3>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Total Charities Listed', value: stats.totalCharities, color: 'var(--rose)' },
              { label: 'Total Raised for Charities', value: `£${((stats.totalContributions || 0) / 100).toFixed(0)}`, color: 'var(--gold)' },
              { label: 'Avg per Charity', value: `£${stats.totalCharities > 0 ? Math.round(((stats.totalContributions || 0) / 100) / stats.totalCharities) : 0}`, color: 'var(--violet)' },
              { label: 'Min Contribution Rate', value: '10% per subscription', color: 'var(--green)' },
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-xl"
                style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ color: 'rgba(253,244,236,0.55)' }}>{row.label}</span>
                <span className="font-mono font-bold" style={{ color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prize pool breakdown */}
      <div className="card" style={{ background: 'rgba(45,16,24,0.8)' }}>
        <h3 className="font-display font-semibold text-lg mb-4" style={{ color: 'var(--blue)' }}>
          Draw Statistics
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: '5-match Pool (Jackpot)', share: '40%', color: 'var(--gold)', example: '£' + Math.round(((stats.latestDrawPool || 0) / 100) * 0.4) },
            { label: '4-match Pool', share: '35%', color: 'var(--rose)', example: '£' + Math.round(((stats.latestDrawPool || 0) / 100) * 0.35) },
            { label: '3-match Pool', share: '25%', color: 'var(--violet)', example: '£' + Math.round(((stats.latestDrawPool || 0) / 100) * 0.25) },
          ].map((pool, i) => (
            <div key={i} className="text-center p-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="font-display font-bold text-2xl mb-1" style={{ color: pool.color }}>{pool.share}</div>
              <div className="font-mono text-sm mb-1" style={{ color: 'var(--cream)' }}>{pool.example}</div>
              <div className="text-xs" style={{ color: 'rgba(253,244,236,0.35)' }}>{pool.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
