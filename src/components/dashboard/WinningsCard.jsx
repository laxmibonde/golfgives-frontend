import { useAuth } from '../../context/AuthContext';

export default function WinningsCard() {
  const { user } = useAuth();
  const totalWon    = user?.totalWinnings || 0;
  const drawsEntered = user?.drawsEntered?.length || 0;
  return (
    <div className="card" style={{ background:'rgba(45,16,24,0.8)' }}>
      <h2 className="font-display font-semibold text-xl mb-5" style={{ color:'var(--cream)' }}>Winnings & Draws</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-4 rounded-xl" style={{ background:'rgba(245,200,66,0.06)', border:'1px solid rgba(245,200,66,0.1)' }}>
          <div className="font-display font-bold text-2xl" style={{ color:'var(--gold)' }}>£{(totalWon/100).toFixed(2)}</div>
          <div className="text-xs mt-1" style={{ color:'rgba(253,244,236,0.35)' }}>Total Won</div>
        </div>
        <div className="text-center p-4 rounded-xl" style={{ background:'rgba(167,139,250,0.06)', border:'1px solid rgba(167,139,250,0.1)' }}>
          <div className="font-display font-bold text-2xl" style={{ color:'var(--violet)' }}>{drawsEntered}</div>
          <div className="text-xs mt-1" style={{ color:'rgba(253,244,236,0.35)' }}>Draws Entered</div>
        </div>
      </div>
      {totalWon===0 && <p className="text-xs text-center" style={{ color:'rgba(253,244,236,0.2)' }}>🎯 Keep entering — your win could be next month!</p>}
    </div>
  );
}
