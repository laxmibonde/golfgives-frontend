import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4" style={{ paddingTop:80 }}>
      <div className="animate-fade-up">
        <div className="font-mono font-bold mb-4" style={{ fontSize:'8rem', color:'rgba(245,200,66,0.06)', lineHeight:1 }}>404</div>
        <h1 className="font-display text-3xl font-semibold mb-3" style={{ color:'var(--cream)' }}>Out of bounds.</h1>
        <p className="text-lg mb-8" style={{ color:'rgba(253,244,236,0.35)' }}>This hole doesn't exist on the course.</p>
        <Link to="/" className="btn-gold px-10 py-3">Back to Home →</Link>
      </div>
    </div>
  );
}
