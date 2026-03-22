import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams, Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ScoreManager from '../components/dashboard/ScoreManager';
import SubscriptionCard from '../components/dashboard/SubscriptionCard';
import CharitySelector from '../components/dashboard/CharitySelector';
import WinningsCard from '../components/dashboard/WinningsCard';

export default function DashboardPage() {
  const { user, refreshUser, isSubscribed, isAdmin } = useAuth();
  const [params] = useSearchParams();

  // Redirect admin to admin panel
  if (isAdmin) return <Navigate to="/admin" replace />;

  useEffect(() => {
    if (params.get('subscribed') === 'true') {
      refreshUser();
      toast.success('🎉 Subscription activated! Welcome to GolfGives.');
    }
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div style={{ paddingTop: '70px' }}>

      {/* Subscriber header */}
      <section className="py-12 relative overflow-hidden border-b" style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,200,66,0.08), rgba(251,113,133,0.04) 40%, transparent 65%), var(--burg-900)',
        borderColor: 'rgba(245,200,66,0.06)',
      }}>
        <div className="page-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                  style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.2)', color: 'var(--gold)' }}>
                  {user?.name?.charAt(0) || '?'}
                </div>
                <div>
                  <span className="badge-gold text-xs uppercase tracking-widest">⛳ Subscriber</span>
                </div>
              </div>
              <h1 className="font-display font-semibold" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--cream)' }}>
                Welcome back, {firstName}!
              </h1>
              <p className="mt-2 text-sm" style={{ color: 'rgba(253,244,236,0.45)' }}>
                {isSubscribed
                  ? '✅ You\'re entered into the next monthly draw. Keep your scores updated!'
                  : '⚠️ Subscribe to enter monthly draws and support your chosen charity.'}
              </p>
            </div>
            {!isSubscribed && (
              <Link to="/subscribe" className="btn-gold py-3 px-8 flex-shrink-0">
                Subscribe Now →
              </Link>
            )}
          </div>

          {/* Quick stat pills */}
          {isSubscribed && (
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                { label: 'Plan', value: user?.subscription?.plan || 'Active', color: 'var(--gold)' },
                { label: 'Draws entered', value: user?.drawsEntered?.length || 0, color: 'var(--rose)' },
                { label: 'Total won', value: `£${((user?.totalWinnings || 0) / 100).toFixed(2)}`, color: 'var(--violet)' },
                { label: 'Charity contribution', value: `${user?.charityContributionPercent || 10}%`, color: 'var(--green)' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{ background: `${stat.color}10`, border: `1px solid ${stat.color}20` }}>
                  <span className="text-xs" style={{ color: 'rgba(253,244,236,0.45)' }}>{stat.label}:</span>
                  <span className="font-mono font-bold text-sm capitalize" style={{ color: stat.color }}>{stat.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dashboard grid */}
      <div className="page-container py-10">
        <div className="grid lg:grid-cols-3 gap-5">

          {/* Left col — scores + winnings */}
          <div className="lg:col-span-2 space-y-5">
            {isSubscribed ? (
              <ScoreManager />
            ) : (
              <div className="card text-center py-16"
                style={{ border: '1px dashed rgba(245,200,66,0.12)', background: 'rgba(45,16,24,0.4)' }}>
                <div className="text-6xl mb-4">⛳</div>
                <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--cream)' }}>
                  Score tracking locked
                </h3>
                <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: 'rgba(253,244,236,0.4)' }}>
                  Subscribe to start tracking your Stableford scores and entering monthly prize draws.
                </p>
                <Link to="/subscribe" className="btn-gold py-3 px-10">
                  Subscribe to Unlock →
                </Link>
              </div>
            )}

            <WinningsCard />

            {/* How draws work info card */}
            <div className="card" style={{ background: 'rgba(45,16,24,0.6)', border: '1px solid rgba(56,189,248,0.1)' }}>
              <h3 className="font-semibold mb-3" style={{ color: 'var(--blue)', fontSize: '1rem' }}>
                🎯 How the monthly draw works
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                {[
                  { step: '1', text: '5 numbers drawn each month', color: 'var(--gold)' },
                  { step: '2', text: 'Your scores are matched against them', color: 'var(--rose)' },
                  { step: '3', text: 'Match 3, 4 or 5 to win a prize!', color: 'var(--violet)' },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-xl"
                    style={{ background: `${s.color}08`, border: `1px solid ${s.color}15` }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: s.color, color: '#1a0a0e' }}>{s.step}</span>
                    <span style={{ color: 'rgba(253,244,236,0.5)' }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className="space-y-5">
            <SubscriptionCard />
            <CharitySelector />
          </div>
        </div>
      </div>
    </div>
  );
}
