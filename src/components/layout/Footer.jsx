import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(13,5,8,0.98)', borderTop: '1px solid rgba(245,200,66,0.06)' }}>
      <div className="page-container py-16">
        <div className="glow-line-multi mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #f5c842, #e6b020)', color: '#1a0a0e' }}>G</div>
              <span className="font-display font-bold text-lg" style={{ color: 'var(--cream)' }}>
                Golf<span style={{ color: 'var(--gold)' }}>Gives</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(253,244,236,0.3)' }}>
              Play golf. Win prizes. Change lives. Every subscription funds the charity you love.
            </p>
            <div className="flex gap-2 text-lg">
              {['🌿','🏆','❤️','🎯'].map((e,i) => <span key={i}>{e}</span>)}
            </div>
          </div>
          {[
            { title: 'Platform', links: [{to:'/charities',l:'Charities'},{to:'/draws',l:'Monthly Draw'},{to:'/register',l:'Subscribe'},{to:'/dashboard',l:'Dashboard'}] },
            { title: 'Account', links: [{to:'/login',l:'Sign In'},{to:'/register',l:'Register'},{to:'/subscribe',l:'Plans & Pricing'}] },
            { title: 'Legal', links: [{l:'Privacy Policy'},{l:'Terms of Service'},{l:'Draw Rules'},{l:'Cookie Policy'}] },
          ].map(section => (
            <div key={section.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.l}>
                    {link.to ? (
                      <Link to={link.to} className="text-sm transition-colors"
                        style={{ color: 'rgba(253,244,236,0.35)' }}
                        onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                        onMouseLeave={e => e.target.style.color = 'rgba(253,244,236,0.35)'}>
                        {link.l}
                      </Link>
                    ) : (
                      <a href="#" className="text-sm"
                        style={{ color: 'rgba(253,244,236,0.35)' }}
                        onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                        onMouseLeave={e => e.target.style.color = 'rgba(253,244,236,0.35)'}>
                        {link.l}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="glow-line-gold mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ color: 'rgba(253,244,236,0.2)' }}>
          <p>© {new Date().getFullYear()} GolfGives. All rights reserved.</p>
          <p>Built with <span style={{ color: 'var(--rose)' }}>❤️</span> for golfers who give.</p>
        </div>
      </div>
    </footer>
  );
}
