import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

/* ── Visitor Person — casual man, waving ── */
function VisitorPerson() {
  return (
    <svg
      viewBox="0 0 140 200"
      width="100"
      height="140"
      style={{
        animation: "float 4s ease-in-out infinite",
        filter: "drop-shadow(0 16px 24px rgba(56,189,248,0.35))",
      }}
    >
      {/* Ground shadow */}
      <ellipse cx="70" cy="194" rx="34" ry="7" fill="rgba(56,189,248,0.18)" />

      {/* === BODY === */}
      {/* Torso - blue tshirt */}
      <rect x="38" y="90" width="64" height="60" rx="16" fill="#1e6eb5" />
      {/* Tshirt highlight */}
      <rect x="44" y="94" width="52" height="50" rx="12" fill="#2580d4" />
      {/* Collar */}
      <path
        d="M56 90 Q70 104 84 90"
        fill="#1a5a9a"
        stroke="#1a5a9a"
        strokeWidth="1"
      />

      {/* Left arm — waving up */}
      <path
        d="M38 98 Q10 80 8 60"
        stroke="#2580d4"
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left hand */}
      <circle cx="8" cy="56" r="11" fill="#fdbcac" />
      {/* Fingers wave */}
      <path
        d="M2 50 Q0 42 4 38"
        stroke="#fdbcac"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 48 Q8 39 10 35"
        stroke="#fdbcac"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14 50 Q16 41 16 37"
        stroke="#fdbcac"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right arm — relaxed down */}
      <path
        d="M102 98 Q118 118 116 140"
        stroke="#2580d4"
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right hand */}
      <circle cx="116" cy="144" r="11" fill="#fdbcac" />

      {/* === LEGS === */}
      <path
        d="M56 148 Q52 168 50 190"
        stroke="#1a3a6a"
        strokeWidth="24"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M84 148 Q88 168 90 190"
        stroke="#1a3a6a"
        strokeWidth="24"
        strokeLinecap="round"
        fill="none"
      />
      {/* Shoes */}
      <ellipse cx="50" cy="190" rx="16" ry="8" fill="#0d1f3a" />
      <ellipse cx="90" cy="190" rx="16" ry="8" fill="#0d1f3a" />

      {/* === HEAD === */}
      {/* Neck */}
      <rect x="58" y="72" width="24" height="22" rx="10" fill="#fdbcac" />
      {/* Head */}
      <ellipse cx="70" cy="52" rx="30" ry="32" fill="#fdbcac" />
      {/* Ear left */}
      <ellipse cx="40" cy="52" rx="7" ry="9" fill="#f0a898" />
      {/* Ear right */}
      <ellipse cx="100" cy="52" rx="7" ry="9" fill="#f0a898" />
      {/* Hair */}
      <ellipse cx="70" cy="26" rx="30" ry="14" fill="#2d1a08" />
      <rect x="40" y="26" width="60" height="16" rx="8" fill="#2d1a08" />
      {/* Side hair */}
      <ellipse cx="42" cy="38" rx="6" ry="14" fill="#2d1a08" />
      <ellipse cx="98" cy="38" rx="6" ry="14" fill="#2d1a08" />

      {/* Eyes */}
      <ellipse cx="57" cy="50" rx="7" ry="7.5" fill="white" />
      <ellipse cx="83" cy="50" rx="7" ry="7.5" fill="white" />
      <circle cx="58" cy="50" r="4.5" fill="#1a0a0e" />
      <circle cx="84" cy="50" r="4.5" fill="#1a0a0e" />
      <circle cx="59.5" cy="48" r="1.5" fill="white" />
      <circle cx="85.5" cy="48" r="1.5" fill="white" />
      {/* Eyebrows */}
      <path
        d="M49 41 Q57 37 65 41"
        stroke="#2d1a08"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M75 41 Q83 37 91 41"
        stroke="#2d1a08"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Smile */}
      <path
        d="M58 64 Q70 74 82 64"
        stroke="#d4826a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Nose */}
      <path
        d="M66 54 Q68 60 70 60 Q72 60 74 54"
        stroke="#e09070"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Cheeks */}
      <ellipse cx="50" cy="60" rx="7" ry="5" fill="#ff9a8a" opacity="0.35" />
      <ellipse cx="90" cy="60" rx="7" ry="5" fill="#ff9a8a" opacity="0.35" />
    </svg>
  );
}

/* ── Golfer — man in full golf pose with clear club and ball ── */
function GolferPerson() {
  return (
    <svg
      viewBox="0 0 160 210"
      width="110"
      height="150"
      style={{
        animation: "float 4s ease-in-out 0.6s infinite",
        filter: "drop-shadow(0 16px 24px rgba(245,200,66,0.35))",
      }}
    >
      {/* Ground */}
      <ellipse cx="80" cy="204" rx="40" ry="8" fill="rgba(245,200,66,0.18)" />
      {/* Grass patch */}
      <ellipse cx="80" cy="204" rx="36" ry="5" fill="#2d6a1a" opacity="0.5" />
      {/* Golf ball */}
      <circle cx="110" cy="200" r="8" fill="white" />
      <circle cx="110" cy="200" r="6" fill="#f0f0f0" />
      {/* Ball dimples */}
      <circle cx="107" cy="197" r="1.2" fill="#d0d0d0" />
      <circle cx="112" cy="198" r="1.2" fill="#d0d0d0" />
      <circle cx="109" cy="202" r="1.2" fill="#d0d0d0" />
      <circle cx="113" cy="201" r="1" fill="#d0d0d0" />

      {/* === GOLF CLUB — very clear === */}
      {/* Club shaft — long diagonal */}
      <line
        x1="120"
        y1="76"
        x2="110"
        y2="200"
        stroke="#7a5a1a"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Club grip (top) */}
      <rect x="114" y="70" width="14" height="28" rx="7" fill="#2a1a08" />
      {/* Club head (bottom) */}
      <rect x="100" y="194" width="22" height="10" rx="4" fill="#4a3010" />
      <rect x="98" y="196" width="26" height="8" rx="3" fill="#6a4a1a" />

      {/* === BODY === */}
      {/* Polo shirt — green */}
      <rect x="34" y="96" width="72" height="62" rx="16" fill="#1a6a2a" />
      <rect x="40" y="100" width="60" height="52" rx="12" fill="#228a38" />
      {/* Polo stripes */}
      <rect
        x="40"
        y="108"
        width="60"
        height="5"
        rx="2"
        fill="#1a6a2a"
        opacity="0.6"
      />
      <rect
        x="40"
        y="120"
        width="60"
        height="5"
        rx="2"
        fill="#1a6a2a"
        opacity="0.6"
      />
      {/* Collar */}
      <path
        d="M58 96 Q70 110 82 96"
        fill="#166022"
        stroke="#166022"
        strokeWidth="1"
      />

      {/* Right arm — gripping club, extended forward */}
      <path
        d="M106 104 Q130 90 120 76"
        stroke="#228a38"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right hand on grip */}
      <circle cx="120" cy="76" r="12" fill="#fdbcac" />

      {/* Left arm — down on club */}
      <path
        d="M106 116 Q124 130 118 152"
        stroke="#228a38"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left hand */}
      <circle cx="116" cy="156" r="12" fill="#fdbcac" />

      {/* === LEGS — slightly apart (golf stance) === */}
      <path
        d="M58 156 Q50 176 44 200"
        stroke="#0d3a1a"
        strokeWidth="26"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M82 156 Q88 176 92 200"
        stroke="#0d3a1a"
        strokeWidth="26"
        strokeLinecap="round"
        fill="none"
      />
      {/* Shoes */}
      <ellipse cx="44" cy="200" rx="18" ry="8" fill="#0a1a0a" />
      <ellipse cx="92" cy="200" rx="18" ry="8" fill="#0a1a0a" />

      {/* === HEAD === */}
      {/* Neck */}
      <rect x="62" y="78" width="26" height="22" rx="10" fill="#fdbcac" />
      {/* Head */}
      <ellipse cx="75" cy="56" rx="32" ry="34" fill="#fdbcac" />
      {/* Ear */}
      <ellipse cx="43" cy="56" rx="7" ry="9" fill="#f0a898" />
      <ellipse cx="107" cy="56" rx="7" ry="9" fill="#f0a898" />

      {/* === GOLF CAP === */}
      {/* Cap body */}
      <ellipse cx="75" cy="30" rx="33" ry="14" fill="#cc4400" />
      <rect x="42" y="22" width="66" height="20" rx="10" fill="#cc4400" />
      {/* Cap brim — sticking out front */}
      <path d="M42 34 Q30 36 28 42 Q36 46 42 42 Z" fill="#aa3300" />
      {/* Cap button */}
      <circle cx="75" cy="22" r="4" fill="#aa3300" />
      {/* Cap line */}
      <line x1="42" y1="36" x2="108" y2="36" stroke="#aa3300" strokeWidth="2" />

      {/* Eyes — focused, squinting slightly */}
      <ellipse cx="62" cy="54" rx="7" ry="6.5" fill="white" />
      <ellipse cx="88" cy="54" rx="7" ry="6.5" fill="white" />
      <circle cx="63" cy="54" r="4.5" fill="#1a0a0e" />
      <circle cx="89" cy="54" r="4.5" fill="#1a0a0e" />
      <circle cx="64.5" cy="52" r="1.5" fill="white" />
      <circle cx="90.5" cy="52" r="1.5" fill="white" />
      {/* Eyebrows — focused */}
      <path
        d="M54 44 Q62 40 70 43"
        stroke="#3a2010"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M80 43 Q88 40 96 44"
        stroke="#3a2010"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Determined smile */}
      <path
        d="M62 67 Q75 74 88 67"
        stroke="#c07050"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Nose */}
      <path
        d="M71 58 Q73 65 75 65 Q77 65 79 58"
        stroke="#e09070"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Cheeks */}
      <ellipse cx="54" cy="63" rx="7" ry="5" fill="#ff8a70" opacity="0.3" />
      <ellipse cx="96" cy="63" rx="7" ry="5" fill="#ff8a70" opacity="0.3" />
    </svg>
  );
}

/* ── Admin — professional woman with clipboard ── */
function AdminPerson() {
  return (
    <svg
      viewBox="0 0 140 200"
      width="100"
      height="140"
      style={{
        animation: "float 4s ease-in-out 1.2s infinite",
        filter: "drop-shadow(0 16px 24px rgba(167,139,250,0.35))",
      }}
    >
      {/* Ground shadow */}
      <ellipse cx="70" cy="194" rx="34" ry="7" fill="rgba(167,139,250,0.18)" />

      {/* === CLIPBOARD — clear and readable === */}
      {/* Clipboard board */}
      <rect x="96" y="72" width="36" height="48" rx="5" fill="#e8e0f8" />
      {/* Clipboard top */}
      <rect x="100" y="68" width="28" height="12" rx="6" fill="#7a4ab8" />
      <rect x="108" y="64" width="12" height="10" rx="3" fill="#5a2a98" />
      {/* Lines on clipboard */}
      <line
        x1="101"
        y1="88"
        x2="127"
        y2="88"
        stroke="#a080d0"
        strokeWidth="2.5"
      />
      <line
        x1="101"
        y1="96"
        x2="127"
        y2="96"
        stroke="#a080d0"
        strokeWidth="2.5"
      />
      <line
        x1="101"
        y1="104"
        x2="120"
        y2="104"
        stroke="#a080d0"
        strokeWidth="2.5"
      />
      <line
        x1="101"
        y1="112"
        x2="124"
        y2="112"
        stroke="#a080d0"
        strokeWidth="2"
      />
      {/* Checkbox */}
      <rect x="101" y="85" width="6" height="6" rx="1" fill="#7a4ab8" />
      <path
        d="M102 88 L104 90 L107 86"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* === BODY — blazer === */}
      {/* White shirt underneath */}
      <rect x="50" y="96" width="40" height="58" rx="6" fill="#f0e8ff" />
      {/* Left blazer panel */}
      <path
        d="M38 92 L50 88 L50 155 L38 155 Q30 155 28 148 L28 104 Q28 92 38 92Z"
        fill="#4a1a8a"
      />
      {/* Right blazer panel */}
      <path
        d="M102 92 L90 88 L90 155 L102 155 Q110 155 112 148 L112 104 Q112 92 102 92Z"
        fill="#4a1a8a"
      />
      {/* Blazer highlights */}
      <path
        d="M38 92 L50 88 L50 155 L38 155 Q30 155 28 148 L28 104 Q28 92 38 92Z"
        fill="#6a2ab8"
        opacity="0.5"
      />
      {/* Lapels */}
      <path d="M50 88 L58 104 L50 120" fill="#3a1070" />
      <path d="M90 88 L82 104 L90 120" fill="#3a1070" />
      {/* Blazer button */}
      <circle cx="70" cy="118" r="4" fill="#7a4ab8" />
      <circle cx="70" cy="132" r="4" fill="#7a4ab8" />

      {/* Left arm — down natural */}
      <path
        d="M38 100 Q22 120 20 148"
        stroke="#6a2ab8"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left hand */}
      <circle cx="20" cy="152" r="11" fill="#fdbcac" />

      {/* Right arm — holding clipboard up */}
      <path
        d="M102 100 Q114 90 110 76"
        stroke="#6a2ab8"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right hand */}
      <circle cx="108" cy="72" r="11" fill="#fdbcac" />

      {/* === SKIRT === */}
      <path
        d="M38 152 Q32 170 30 190 L110 190 Q108 170 102 152 Z"
        fill="#3a1070"
      />
      {/* Skirt highlight */}
      <path
        d="M55 152 Q50 170 48 188 L92 188 Q90 170 85 152 Z"
        fill="#5a2090"
        opacity="0.4"
      />

      {/* === SHOES === */}
      <ellipse cx="46" cy="190" rx="16" ry="7" fill="#1a0a2e" />
      <ellipse cx="94" cy="190" rx="16" ry="7" fill="#1a0a2e" />
      {/* Heels */}
      <rect x="56" y="186" width="5" height="10" rx="2" fill="#1a0a2e" />
      <rect x="104" y="186" width="5" height="10" rx="2" fill="#1a0a2e" />

      {/* === HEAD === */}
      {/* Neck */}
      <rect x="58" y="72" width="24" height="22" rx="10" fill="#fdbcac" />
      {/* Head */}
      <ellipse cx="70" cy="52" rx="30" ry="32" fill="#fdbcac" />
      {/* Ear */}
      <ellipse cx="40" cy="52" rx="7" ry="9" fill="#f0a898" />
      <ellipse cx="100" cy="52" rx="7" ry="9" fill="#f0a898" />
      {/* Earrings */}
      <circle cx="40" cy="54" r="5" fill="#7a4ab8" />
      <circle cx="100" cy="54" r="5" fill="#7a4ab8" />
      <circle cx="40" cy="60" r="3.5" fill="#a06ae0" />
      <circle cx="100" cy="60" r="3.5" fill="#a06ae0" />

      {/* === HAIR — elegant bun === */}
      {/* Hair body */}
      <ellipse cx="70" cy="26" rx="30" ry="14" fill="#0d0808" />
      <rect x="40" y="26" width="60" height="18" rx="9" fill="#0d0808" />
      {/* Side hair */}
      <ellipse cx="42" cy="42" rx="7" ry="18" fill="#0d0808" />
      <ellipse cx="98" cy="42" rx="7" ry="18" fill="#0d0808" />
      {/* Bun */}
      <circle cx="70" cy="18" r="14" fill="#1a1010" />
      <circle cx="70" cy="18" r="11" fill="#0d0808" />
      {/* Bun pin */}
      <line
        x1="58"
        y1="12"
        x2="82"
        y2="24"
        stroke="#a06ae0"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Eyes — sharp, confident */}
      <ellipse cx="57" cy="50" rx="7.5" ry="7" fill="white" />
      <ellipse cx="83" cy="50" rx="7.5" ry="7" fill="white" />
      <circle cx="58" cy="50" r="4.5" fill="#1a0a0e" />
      <circle cx="84" cy="50" r="4.5" fill="#1a0a0e" />
      <circle cx="59.5" cy="48" r="1.5" fill="white" />
      <circle cx="85.5" cy="48" r="1.5" fill="white" />
      {/* Eyebrows — strong arch */}
      <path
        d="M49 40 Q57 35 65 39"
        stroke="#0d0808"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M75 39 Q83 35 91 40"
        stroke="#0d0808"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Lips — professional */}
      <path
        d="M59 65 Q70 72 81 65"
        stroke="#b03060"
        strokeWidth="3"
        fill="rgba(176,48,96,0.25)"
        strokeLinecap="round"
      />
      {/* Nose */}
      <path
        d="M66 54 Q68 60 70 60 Q72 60 74 54"
        stroke="#e09070"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Cheeks — subtle */}
      <ellipse cx="50" cy="60" rx="7" ry="5" fill="#ff8090" opacity="0.28" />
      <ellipse cx="90" cy="60" rx="7" ry="5" fill="#ff8090" opacity="0.28" />
    </svg>
  );
}

const ROLES = [
  {
    id: "visitor",
    label: "Public Visitor",
    icon: "👁️",
    Person: VisitorPerson,
    color: "var(--blue)",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.2)",
    action: "browse",
  },
  {
    id: "subscriber",
    label: "Registered Subscriber",
    icon: "⛳",
    Person: GolferPerson,
    color: "var(--gold)",
    bg: "rgba(245,200,66,0.08)",
    border: "rgba(245,200,66,0.2)",
    action: "login",
  },
  {
    id: "admin",
    label: "Administrator",
    icon: "⚙️",
    Person: AdminPerson,
    color: "var(--violet)",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
    action: "login",
  },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleRoleSelect = (role) => {
    if (role.action === "browse") {
      navigate("/");
      return;
    }
    setSelectedRole(role);
    setForm({
      email: role.id === "admin" ? "admin@golfgives.com" : "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen px-4 py-24"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,200,66,0.08) 0%, rgba(167,139,250,0.05) 40%, transparent 70%), var(--burg-900)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold"
              style={{
                background: "linear-gradient(135deg,#f5c842,#e6b020)",
                color: "#1a0a0e",
                fontSize: "1.1rem",
              }}
            >
              G
            </div>
            <span
              className="font-display font-bold text-xl"
              style={{ color: "var(--cream)" }}
            >
              Golf<span style={{ color: "var(--gold)" }}>Gives</span>
            </span>
          </Link>
          <h1
            className="font-display font-semibold mb-3"
            style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "var(--cream)" }}
          >
            Who are you?
          </h1>
          <p style={{ color: "rgba(253,244,236,0.45)", fontSize: "1.05rem" }}>
            Select your role to continue
          </p>
        </div>

        {!selectedRole ? (
          <div className="grid md:grid-cols-3 gap-6 animate-fade-up delay-200">
            {ROLES.map((role) => {
              const { Person } = role;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  className="text-left p-7 rounded-2xl transition-all duration-300"
                  style={{
                    background: role.bg,
                    border: `1.5px solid ${role.border}`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 28px 60px ${role.bg}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                      style={{
                        background: `${role.color}18`,
                        border: `1px solid ${role.border}`,
                      }}
                    >
                      {role.icon}
                    </div>
                    <h3
                      className="font-display font-semibold text-xl"
                      style={{ color: role.color }}
                    >
                      {role.label}
                    </h3>
                  </div>

                  {/* 3D Person illustration */}
                  <div
                    className="flex items-end justify-center mb-5"
                    style={{
                      height: 160,
                      background: `linear-gradient(to bottom, ${role.color}08, ${role.color}03)`,
                      borderRadius: 16,
                      border: `1px solid ${role.color}18`,
                      overflow: "hidden",
                    }}
                  >
                    <Person />
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: role.color }}
                    >
                      {role.action === "browse"
                        ? "Continue as visitor →"
                        : "Sign In →"}
                    </span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: `${role.color}22`,
                        color: role.color,
                      }}
                    >
                      →
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="max-w-md mx-auto animate-fade-up">
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center gap-2 mb-6 text-sm"
              style={{
                color: "rgba(253,244,236,0.4)",
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--cream)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(253,244,236,0.4)")
              }
            >
              ← Back to role selection
            </button>

            <div
              className="flex items-center gap-3 mb-6 p-4 rounded-2xl"
              style={{
                background: selectedRole.bg,
                border: `1px solid ${selectedRole.border}`,
              }}
            >
              <span className="text-2xl">{selectedRole.icon}</span>
              <div
                className="font-semibold text-sm"
                style={{ color: selectedRole.color }}
              >
                {selectedRole.label}
              </div>
            </div>

            <div
              className="card"
              style={{ padding: "36px", background: "rgba(45,16,24,0.95)" }}
            >
              <h2
                className="font-display text-2xl font-semibold mb-6"
                style={{ color: "var(--cream)" }}
              >
                Sign In
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="you@example.com"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                  {selectedRole.id === "admin" && (
                    <p
                      className="text-xs mt-1.5"
                      style={{ color: "rgba(167,139,250,0.6)" }}
                    >
                      💡 admin@golfgives.com
                    </p>
                  )}
                  {selectedRole.id === "subscriber" && (
                    <p
                      className="text-xs mt-1.5"
                      style={{ color: "rgba(245,200,66,0.6)" }}
                    >
                      💡 golfer@test.com
                    </p>
                  )}
                </div>
                <div>
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="••••••••"
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                  />
                  {selectedRole.id === "admin" && (
                    <p
                      className="text-xs mt-1.5"
                      style={{ color: "rgba(167,139,250,0.6)" }}
                    >
                      💡 Admin1234!
                    </p>
                  )}
                  {selectedRole.id === "subscriber" && (
                    <p
                      className="text-xs mt-1.5"
                      style={{ color: "rgba(245,200,66,0.6)" }}
                    >
                      💡 Golfer123!
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm"
                  style={{
                    background:
                      selectedRole.id === "admin"
                        ? "linear-gradient(135deg, var(--violet), #6d28d9)"
                        : "linear-gradient(135deg, #f5c842, #e6b020)",
                    color: "#1a0a0e",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span
                        className="w-4 h-4 border-2 rounded-full animate-spin"
                        style={{
                          borderColor: "#1a0a0e",
                          borderTopColor: "transparent",
                        }}
                      />
                      Signing in…
                    </span>
                  ) : (
                    `Sign in as ${selectedRole.label} →`
                  )}
                </button>
              </form>
              <div
                className="mt-5 pt-5 text-center text-sm"
                style={{ borderTop: "1px solid rgba(245,200,66,0.06)" }}
              >
                <span style={{ color: "rgba(253,244,236,0.35)" }}>
                  No account?{" "}
                </span>
                <Link to="/register" style={{ color: "var(--gold)" }}>
                  Create one free
                </Link>
              </div>
            </div>
          </div>
        )}

        {!selectedRole && (
          <p
            className="text-center mt-8 text-sm"
            style={{ color: "rgba(253,244,236,0.25)" }}
          >
            New here?{" "}
            <Link to="/register" style={{ color: "var(--gold)" }}>
              Create a free subscriber account →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
