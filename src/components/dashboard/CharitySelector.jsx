// CharitySelector.jsx
import { useState, useEffect } from 'react';
import { charityService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export function CharitySelector() {
  const { user, refreshUser } = useAuth();
  const [charities, setCharities] = useState([]);
  const [selected, setSelected]   = useState(user?.selectedCharity?._id||user?.selectedCharity||'');
  const [percent, setPercent]     = useState(user?.charityContributionPercent||10);
  const [saving, setSaving]       = useState(false);

  useEffect(() => { charityService.getAll({ limit:50 }).then(r=>setCharities(r.data.charities)).catch(()=>{}); }, []);

  const handleSave = async () => {
    if (!selected) return toast.error('Please select a charity');
    setSaving(true);
    try { await charityService.select({ charityId:selected, contributionPercent:percent }); await refreshUser(); toast.success('Charity saved ❤️'); }
    catch (err) { toast.error(err.response?.data?.message||'Failed'); } finally { setSaving(false); }
  };

  const currentCharity = charities.find(c=>c._id===selected);

  return (
    <div className="card" style={{ background:'rgba(45,16,24,0.8)' }}>
      <h2 className="font-display font-semibold text-xl mb-1" style={{ color:'var(--cream)' }}>Your Charity</h2>
      <p className="text-xs mb-5" style={{ color:'rgba(253,244,236,0.35)' }}>Choose who benefits from your subscription</p>
      {currentCharity && (
        <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background:'rgba(251,113,133,0.06)', border:'1px solid rgba(251,113,133,0.12)' }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background:'rgba(251,113,133,0.15)', color:'var(--rose)' }}>{currentCharity.name.charAt(0)}</div>
          <div>
            <div className="text-sm font-medium" style={{ color:'var(--cream)' }}>{currentCharity.name}</div>
            <div className="text-xs capitalize" style={{ color:'rgba(253,244,236,0.35)' }}>{currentCharity.category}</div>
          </div>
          <span className="badge-rose ml-auto" style={{ fontSize:'0.62rem' }}>Selected</span>
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label className="label">Choose Charity</label>
          <select className="input" value={selected} onChange={e=>setSelected(e.target.value)}>
            <option value="">— Select a charity —</option>
            {charities.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Contribution: <span style={{ color:'var(--rose)' }}>{percent}%</span></label>
          <input type="range" min={10} max={100} step={5} value={percent} onChange={e=>setPercent(Number(e.target.value))} className="w-full mt-1" style={{ accentColor:'var(--rose)' }} />
          <div className="flex justify-between text-xs mt-1" style={{ color:'rgba(253,244,236,0.25)' }}>
            <span>10% minimum</span><span>100%</span>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving||!selected} className="btn-rose w-full py-3 text-sm">
          {saving?'Saving…':'❤️ Save Charity Preference'}
        </button>
      </div>
    </div>
  );
}

export default CharitySelector;
