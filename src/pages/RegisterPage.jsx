import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const set = f => e => setForm(p => ({ ...p, [f]:e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    if (form.password.length < 8) return toast.error('Password must be at least 8 characters');
    setLoading(true);
    try { await register(form.name, form.email, form.password); toast.success('Welcome! 🎉'); navigate('/subscribe'); }
    catch (err) { toast.error(err.response?.data?.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{
      background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251,113,133,0.08) 0%, rgba(245,200,66,0.05) 40%, transparent 70%), var(--burg-900)',
    }}>
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold"
              style={{ background:'linear-gradient(135deg,#f5c842,#e6b020)', color:'#1a0a0e' }}>G</div>
            <span className="font-display font-bold text-lg" style={{ color:'var(--cream)' }}>
              Golf<span style={{ color:'var(--gold)' }}>Gives</span>
            </span>
          </Link>
          <h1 className="font-display text-3xl font-semibold mb-2" style={{ color:'var(--cream)' }}>Create your account</h1>
          <p className="text-sm" style={{ color:'rgba(253,244,236,0.4)' }}>Join GolfGives and start playing for purpose</p>
        </div>
        <div className="card" style={{ padding:'36px', background:'rgba(45,16,24,0.9)' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { f:'name', label:'Full Name', type:'text', ph:'John Smith' },
              { f:'email', label:'Email', type:'email', ph:'you@example.com' },
              { f:'password', label:'Password', type:'password', ph:'Min 8 characters' },
              { f:'confirm', label:'Confirm Password', type:'password', ph:'Repeat password' },
            ].map(field => (
              <div key={field.f}>
                <label className="label">{field.label}</label>
                <input type={field.type} className="input" placeholder={field.ph} required value={form[field.f]} onChange={set(field.f)} />
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-gold w-full py-3.5 mt-2">
              {loading ? 'Creating…' : 'Create Account →'}
            </button>
          </form>
          <div className="mt-4 p-3 rounded-xl text-xs text-center"
            style={{ background:'rgba(251,113,133,0.06)', border:'1px solid rgba(251,113,133,0.12)', color:'rgba(253,244,236,0.45)' }}>
            ❤️ Min <strong style={{ color:'var(--rose)' }}>10%</strong> of your subscription goes to charity
          </div>
          <div className="mt-4 text-center text-sm" style={{ color:'rgba(253,244,236,0.35)' }}>
            Already have an account? <Link to="/login" style={{ color:'var(--gold)' }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
