// ScoreManager.jsx
import { useState, useEffect } from 'react';
import { scoreService } from '../../services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const scoreColor = v => v>=36?'var(--gold)':v>=28?'var(--rose)':v>=20?'var(--violet)':'rgba(253,244,236,0.35)';

export function ScoreManager() {
  const [scores, setScores]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding]   = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm]       = useState({ value:'', date:new Date().toISOString().split('T')[0] });

  useEffect(() => { fetch(); }, []);
  const fetch = async () => { try { const r = await scoreService.getScores(); setScores(r.data.scores); } catch {} finally { setLoading(false); } };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.value||form.value<1||form.value>45) return toast.error('Score must be 1–45');
    setAdding(true);
    try { const r = await scoreService.addScore({ value:Number(form.value), date:form.date }); setScores(r.data.scores); setForm({ value:'', date:new Date().toISOString().split('T')[0] }); toast.success('Score added ⛳'); }
    catch (err) { toast.error(err.response?.data?.message||'Failed'); } finally { setAdding(false); }
  };
  const handleUpdate = async (idx) => {
    try { const r = await scoreService.updateScore(idx,{ value:Number(form.value), date:form.date }); setScores(r.data.scores); setEditIdx(null); toast.success('Updated'); }
    catch (err) { toast.error(err.response?.data?.message||'Failed'); }
  };
  const handleDelete = async (idx) => {
    if (!confirm('Remove?')) return;
    try { const r = await scoreService.deleteScore(idx); setScores(r.data.scores); toast.success('Removed'); } catch {}
  };

  if (loading) return <div className="card animate-pulse" style={{ height:200 }} />;

  return (
    <div className="card" style={{ background:'rgba(45,16,24,0.8)' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-semibold text-xl" style={{ color:'var(--cream)' }}>Your Scores</h2>
          <p className="text-xs mt-0.5" style={{ color:'rgba(253,244,236,0.35)' }}>Stableford · Rolling 5-score window</p>
        </div>
        <div className="font-mono text-sm px-3 py-1.5 rounded-lg" style={{ background:'rgba(245,200,66,0.08)', color:'var(--gold)', border:'1px solid rgba(245,200,66,0.15)' }}>
          {scores.length}/5
        </div>
      </div>
      {/* Bar chart */}
      {scores.length > 0 && (
        <div className="flex items-end gap-2 h-16 mb-6">
          {scores.map((s,i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-mono font-bold" style={{ color:scoreColor(s.value) }}>{s.value}</span>
              <div className="w-full rounded-t-sm" style={{ height:`${(s.value/45)*100}%`, background:scoreColor(s.value), opacity:0.7, minHeight:4 }} />
            </div>
          ))}
          {[...Array(5-scores.length)].map((_,i) => <div key={i} className="flex-1 rounded-t-sm" style={{ height:4, background:'rgba(255,255,255,0.04)' }} />)}
        </div>
      )}
      {/* List */}
      <div className="space-y-2 mb-5">
        {scores.length===0 && <div className="text-center py-8 text-sm" style={{ color:'rgba(253,244,236,0.25)' }}>No scores yet — add your first below ⛳</div>}
        {scores.map((s,idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 rounded-xl" style={{ background:'rgba(0,0,0,0.2)', border:'1px solid rgba(255,255,255,0.03)' }}>
            {editIdx===idx ? (
              <>
                <input type="number" min={1} max={45} className="input w-20 py-1.5 text-center font-mono text-sm" value={form.value} onChange={e=>setForm(p=>({...p,value:e.target.value}))} />
                <input type="date" className="input flex-1 py-1.5 text-sm" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} />
                <button onClick={()=>handleUpdate(idx)} className="btn-gold py-1.5 px-3 text-xs">Save</button>
                <button onClick={()=>setEditIdx(null)} className="btn-ghost py-1.5 px-2 text-xs">✕</button>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold flex-shrink-0" style={{ background:`${scoreColor(s.value)}15`, color:scoreColor(s.value), fontSize:'1rem' }}>{s.value}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color:'var(--cream)' }}>{s.value} pts</div>
                  <div className="text-xs" style={{ color:'rgba(253,244,236,0.3)' }}>{s.date?format(new Date(s.date),'dd MMM yyyy'):'—'}</div>
                </div>
                {idx===0 && <span className="badge-gold" style={{ fontSize:'0.62rem' }}>Latest</span>}
                <button onClick={()=>{setEditIdx(idx);setForm({value:s.value,date:s.date?.split('T')[0]||''})}} className="btn-ghost py-1 px-2 text-xs" style={{ color:'rgba(253,244,236,0.25)' }}>Edit</button>
                <button onClick={()=>handleDelete(idx)} className="btn-ghost py-1 px-2 text-xs" style={{ color:'rgba(251,113,133,0.45)' }}>✕</button>
              </>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleAdd} className="pt-4" style={{ borderTop:'1px solid rgba(245,200,66,0.06)' }}>
        <p className="text-xs mb-3" style={{ color:'rgba(253,244,236,0.3)' }}>
          {scores.length>=5?'⚠️ Adding replaces the oldest entry.':`Add up to ${5-scores.length} more score${5-scores.length!==1?'s':''}`}
        </p>
        <div className="flex gap-3">
          <div style={{ width:100 }}><label className="label">Score</label><input type="number" min={1} max={45} className="input text-center font-mono" placeholder="28" value={form.value} onChange={e=>setForm(p=>({...p,value:e.target.value}))} required /></div>
          <div className="flex-1"><label className="label">Date played</label><input type="date" className="input" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} required /></div>
          <div className="flex items-end"><button type="submit" disabled={adding} className="btn-gold py-3 px-5">{adding?'…':'+ Add'}</button></div>
        </div>
      </form>
    </div>
  );
}

export default ScoreManager;
