import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  const navLinkStyle = (isActive) => ({
    color: isActive ? 'var(--gold)' : 'rgba(253,244,236,0.6)',
    fontSize: '1rem',
    fontWeight: isActive ? 600 : 500,
    padding: '10px 16px',
    borderRadius: '10px',
    transition: 'all 0.2s',
    background: isActive ? 'rgba(245,200,66,0.08)' : 'transparent',
    textDecoration: 'none',
  });

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-glass' : 'bg-transparent'}`}>
      <div className="page-container">
        <nav className="flex items-center justify-between" style={{ height: '70px' }}>

          {/* Logo — bigger */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold"
                style={{ background: 'linear-gradient(135deg, #f5c842, #e6b020)', color: '#1a0a0e', fontSize: '1.1rem' }}>
                G
              </div>
              <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(245,200,66,0.2)', filter: 'blur(8px)' }} />
            </div>
            <span className="hidden sm:block font-display font-bold"
              style={{ color: 'var(--cream)', letterSpacing: '-0.01em', fontSize: '1.4rem' }}>
              Golf<span style={{ color: 'var(--gold)' }}>Gives</span>
            </span>
          </Link>

          {/* Desktop nav — equal spacing, bigger text */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/charities" style={({ isActive }) => navLinkStyle(isActive)}
              onMouseEnter={e => { if (!e.currentTarget.style.color.includes('gold')) e.currentTarget.style.color = 'var(--cream)'; }}
              onMouseLeave={e => { /* handled by NavLink */ }}>
              Charities
            </NavLink>
            <NavLink to="/draws" style={({ isActive }) => navLinkStyle(isActive)}>
              Monthly Draw
            </NavLink>
          </div>

          {/* Desktop right actions — equal spacing */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Show role badge */}
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    background: isAdmin ? 'rgba(167,139,250,0.1)' : 'rgba(245,200,66,0.1)',
                    color: isAdmin ? 'var(--violet)' : 'var(--gold)',
                    border: isAdmin ? '1px solid rgba(167,139,250,0.2)' : '1px solid rgba(245,200,66,0.2)',
                    fontSize: '0.75rem',
                  }}>
                  {isAdmin ? '⚙️ Admin' : '⛳ Subscriber'}
                </span>

                <NavLink to="/dashboard" style={({ isActive }) => ({
                  ...navLinkStyle(isActive),
                  fontSize: '1rem',
                })}>
                  Dashboard
                </NavLink>

                <button onClick={handleLogout}
                  className="btn-outline"
                  style={{ fontSize: '0.95rem', padding: '10px 22px' }}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  style={{
                    color: 'rgba(253,244,236,0.6)', fontSize: '1rem', fontWeight: 500,
                    padding: '10px 16px', borderRadius: '10px', textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--cream)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(253,244,236,0.6)'}>
                  Sign In
                </Link>
                <Link to="/register" className="btn-gold" style={{ fontSize: '0.95rem', padding: '11px 28px' }}>
                  Get Started →
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(v => !v)}>
            <span className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: 'var(--gold)' }} />
            <span className={`block h-0.5 w-6 transition-all ${menuOpen ? 'opacity-0' : ''}`}
              style={{ background: 'var(--gold)' }} />
            <span className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: 'var(--gold)' }} />
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t animate-fade-in"
          style={{ background: 'rgba(26,10,14,0.98)', borderColor: 'rgba(245,200,66,0.08)', backdropFilter: 'blur(20px)' }}>
          <div className="page-container py-5 flex flex-col gap-2">
            <Link to="/charities" className="py-3 px-4 rounded-xl text-base" style={{ color: 'rgba(253,244,236,0.7)' }}>🌿 Charities</Link>
            <Link to="/draws"     className="py-3 px-4 rounded-xl text-base" style={{ color: 'rgba(253,244,236,0.7)' }}>🎯 Monthly Draw</Link>
            <div className="h-px my-1" style={{ background: 'rgba(245,200,66,0.08)' }} />
            {user ? (
              <>
                <Link to="/dashboard" className="py-3 px-4 rounded-xl text-base" style={{ color: 'rgba(253,244,236,0.7)' }}>
                  📊 Dashboard
                </Link>
                <button onClick={handleLogout} className="btn-outline w-full text-center py-3 text-base">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login"    className="btn-ghost w-full text-center py-3 text-base">Sign In</Link>
                <Link to="/register" className="btn-gold w-full text-center py-3 text-base">Get Started →</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
