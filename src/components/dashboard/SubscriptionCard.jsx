import { useState } from 'react';
import { Link } from 'react-router-dom';
import { paymentService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function SubscriptionCard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const sub = user?.subscription;

  const openPortal = async () => {
    setLoading(true);
    try { const r = await paymentService.createPortal(); window.location.href = r.data.url; }
    catch { toast.error('Could not open billing portal'); } finally { setLoading(false); }
  };

  const st = { active:'badge-green', inactive:'badge-gray', cancelled:'badge-red', lapsed:'badge-yellow' }[sub?.status] || 'badge-gray';

  return (
    <div className="card" style={{ background:'rgba(45,16,24,0.8)' }}>
      <div className="flex items-start justify-between mb-5">
        <h2 className="font-display font-semibold text-xl" style={{ color:'var(--cream)' }}>Subscription</h2>
        <span className={st}>{sub?.status||'inactive'}</span>
      </div>
      {sub?.status==='active' ? (
        <div className="space-y-3">
          {[
            { label:'Plan', val:sub.plan||'—', capitalize:true },
            { label:'Renews', val:sub.currentPeriodEnd?format(new Date(sub.currentPeriodEnd),'dd MMM yyyy'):'—' },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center p-3 rounded-xl" style={{ background:'rgba(245,200,66,0.03)', border:'1px solid rgba(245,200,66,0.06)' }}>
              <span className="text-xs uppercase tracking-widest" style={{ color:'rgba(253,244,236,0.35)' }}>{row.label}</span>
              <span className="font-medium text-sm capitalize" style={{ color:'var(--cream)' }}>{row.val}</span>
            </div>
          ))}
          {sub.cancelAtPeriodEnd && (
            <div className="p-3 rounded-xl text-xs" style={{ background:'rgba(245,200,66,0.06)', border:'1px solid rgba(245,200,66,0.12)', color:'var(--gold)' }}>
              ⚠️ Cancels at end of billing period
            </div>
          )}
          <button onClick={openPortal} disabled={loading} className="btn-secondary w-full py-2.5 text-sm mt-1">
            {loading?'Opening…':'⚙️ Manage Billing'}
          </button>
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="text-4xl mb-3">🎯</div>
          <p className="text-sm mb-5" style={{ color:'rgba(253,244,236,0.4)' }}>Subscribe to enter monthly draws and support charity.</p>
          <Link to="/subscribe" className="btn-gold py-3 px-8 inline-block text-sm">Subscribe Now →</Link>
        </div>
      )}
    </div>
  );
}
