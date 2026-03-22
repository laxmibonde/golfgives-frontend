import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paymentService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "£9.99",
    per: "/month",
    desc: "Try it out risk-free",
    features: [
      "Monthly draw entry",
      "5-score Stableford tracking",
      "10%+ charity contribution",
      "Winner notifications",
    ],
    color: "var(--rose)",
    badge: null,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "£99",
    per: "/year",
    desc: "Save 2 months free",
    features: [
      "Everything in Monthly",
      "2 months completely free",
      "Priority support",
      "Exclusive bonus draw",
    ],
    color: "var(--gold)",
    badge: "Most Popular",
  },
];

export default function SubscribePage() {
  const [selected, setSelected] = useState("yearly");
  const [loading, setLoading] = useState(false);
  const { isSubscribed } = useAuth();
  const navigate = useNavigate();
  if (isSubscribed) {
    navigate("/dashboard");
    return null;
  }

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await paymentService.createCheckout(selected);
      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to start checkout");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-24 px-4"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,200,66,0.08) 0%, rgba(167,139,250,0.05) 40%, transparent 65%), var(--burg-900)",
      }}
    >
      <div className="page-container max-w-3xl mx-auto">
        <div className="text-center mb-14 animate-fade-up">
          <div className="badge-gold mb-5 inline-flex text-xs tracking-widest uppercase">
            Choose your plan
          </div>
          <h1
            className="font-display text-4xl md:text-5xl font-semibold mb-4"
            style={{ color: "var(--cream)" }}
          >
            One subscription.
            <br />
            <span className="text-gradient-full">Unlimited impact.</span>
          </h1>
          <p style={{ color: "rgba(253,244,236,0.45)" }}>
            Every plan includes draw entry, score tracking & guaranteed charity
            giving.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className="text-left relative rounded-2xl p-7 transition-all duration-300"
              style={{
                background:
                  selected === plan.id
                    ? "rgba(61,21,32,0.9)"
                    : "rgba(45,16,24,0.65)",
                border:
                  selected === plan.id
                    ? `1.5px solid ${plan.color}55`
                    : "1px solid rgba(245,200,66,0.08)",
                boxShadow:
                  selected === plan.id ? `0 0 40px ${plan.color}12` : "none",
                transform: selected === plan.id ? "translateY(-4px)" : "none",
              }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-6">
                  <span className="badge-gold text-xs px-3 py-1">
                    {plan.badge}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <div
                    className="font-display font-semibold text-xl mb-1"
                    style={{ color: plan.color }}
                  >
                    {plan.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(253,244,236,0.35)" }}
                  >
                    {plan.desc}
                  </div>
                </div>
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 transition-all"
                  style={{
                    borderColor:
                      selected === plan.id
                        ? plan.color
                        : "rgba(255,255,255,0.15)",
                    background:
                      selected === plan.id ? plan.color : "transparent",
                  }}
                >
                  {selected === plan.id && (
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "#1a0a0e" }}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span
                  className="font-display font-bold"
                  style={{
                    fontSize: "3rem",
                    color: "var(--cream)",
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <span style={{ color: "rgba(253,244,236,0.3)" }}>
                  {plan.per}
                </span>
              </div>
              <ul className="space-y-2.5">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "rgba(253,244,236,0.6)" }}
                  >
                    <span
                      style={{
                        color: plan.color,
                        flexShrink: 0,
                        marginTop: 2,
                        fontSize: "0.7rem",
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
        <div className="text-center animate-fade-up delay-300">
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="btn-gold text-lg px-14 py-4 mb-4"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 border-2 rounded-full animate-spin"
                  style={{
                    borderColor: "#1a0a0e",
                    borderTopColor: "transparent",
                  }}
                />
                Redirecting…
              </span>
            ) : (
              `Subscribe ${selected === "yearly" ? "Yearly" : "Monthly"} →`
            )}
          </button>
          <p
            className="text-xs mb-6"
            style={{ color: "rgba(253,244,236,0.25)" }}
          >
            🔒 Secure payment via Stripe. Cancel anytime.
          </p>
          <div
            className="max-w-sm mx-auto p-4 rounded-2xl text-sm text-center"
            style={{
              background: "rgba(251,113,133,0.05)",
              border: "1px solid rgba(251,113,133,0.1)",
              color: "rgba(253,244,236,0.45)",
            }}
          >
            ❤️ <strong style={{ color: "var(--rose)" }}>Minimum 10%</strong> of
            every subscription goes directly to your chosen charity.
          </div>
        </div>
      </div>
    </div>
  );
}
