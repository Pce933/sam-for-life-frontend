import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, Heart, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSettings } from "../contexts/ContentContext";
import { createCheckoutSession, getCheckoutStatus } from "../api/client";

const DONATION_TIERS = [
  { amount: "£25", label: "Funds one Skills for Life workshop session" },
  { amount: "£75", label: "Sponsors one month of job coaching" },
  { amount: "£300", label: "Supports a complete work placement journey" },
];

const PaymentStatusPanel = ({ sessionId, onClose }) => {
  const [status, setStatus] = useState("polling");
  const [details, setDetails] = useState(null);

  const poll = useCallback(async (attempt = 0) => {
    const max = 8;
    if (attempt >= max) {
      setStatus("timeout");
      return;
    }
    try {
      const data = await getCheckoutStatus(sessionId);
      setDetails(data);
      if (data.payment_status === "paid") { setStatus("paid"); return; }
      if (data.status === "expired") { setStatus("expired"); return; }
      setTimeout(() => poll(attempt + 1), 2000);
    } catch (e) {
      setStatus("error");
    }
  }, [sessionId]);

  useEffect(() => { poll(); }, [poll]);

  return (
    <div className="sam-card p-8 mb-8 text-center">
      {status === "polling" && (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-[#d95a40]" size={32} />
          <p className="text-lg">Confirming your donation...</p>
        </div>
      )}
      {status === "paid" && (
        <div className="flex flex-col items-center gap-3">
          <CheckCircle2 className="text-green-600" size={48} />
          <h3 className="font-display text-2xl font-bold">Thank you!</h3>
          <p className="text-[#5c6b6d]">Your donation of £{((details?.amount_total || 0) / 100).toFixed(2)} {details?.currency?.toUpperCase()} has been received.</p>
          <button onClick={onClose} className="btn-outline mt-2">Make another donation</button>
        </div>
      )}
      {(status === "expired" || status === "error" || status === "timeout") && (
        <div className="flex flex-col items-center gap-3">
          <XCircle className="text-red-600" size={48} />
          <h3 className="font-display text-xl font-bold">Could not confirm payment</h3>
          <p className="text-[#5c6b6d]">If your card was charged, please email us at hello@samforlife.org.</p>
          <button onClick={onClose} className="btn-outline mt-2">Try again</button>
        </div>
      )}
    </div>
  );
};

const Donate = () => {
  const s = useSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const [frequency, setFrequency] = useState("one-time");
  const [pkg, setPkg] = useState("75");
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sid = params.get("session_id");
    const cancelled = params.get("cancelled");
    if (sid) {
      setSessionId(sid);
    } else if (cancelled) {
      toast.message("Donation cancelled", { description: "No payment was taken." });
      navigate("/get-involved/donate", { replace: true });
    }
  }, [location.search, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const payload = {
        frequency,
        name: name || null,
        email: email || null,
        origin_url: window.location.origin,
      };
      if (custom) {
        payload.custom_amount = parseFloat(custom);
      } else {
        payload.package_id = pkg;
      }
      const res = await createCheckoutSession(payload);
      if (res.url) {
        window.location.href = res.url;
      } else {
        toast.error("Could not start checkout");
      }
    } catch (err) {
      toast.error("Stripe error", { description: err?.response?.data?.detail || "Please try again." });
    } finally {
      setBusy(false);
    }
  };

  const closeStatus = () => {
    setSessionId(null);
    navigate("/get-involved/donate", { replace: true });
  };

  return (
    <div>
      <section className="section-pad pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto fade-up">
          <span className="text-[#d95a40] eyebrow">Donate</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 leading-[1.05]">{s.donate_intro_title}</h1>
          <p className="mt-8 text-lg md:text-xl text-[#1c2b2d]/80 leading-relaxed max-w-2xl">{s.donate_intro_body}</p>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="max-w-7xl mx-auto">
          {sessionId && <PaymentStatusPanel sessionId={sessionId} onClose={closeStatus} />}

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {DONATION_TIERS.map((t, i) => (
                <div key={i} className="sam-card p-6 flex items-center gap-5">
                  <div className="font-display text-4xl font-bold text-[#d95a40] flex-shrink-0">{t.amount}</div>
                  <p className="text-[#1c2b2d]/85 leading-relaxed">{t.label}</p>
                </div>
              ))}
            </div>

            <form onSubmit={submit} className="lg:col-span-3 sam-card p-6 md:p-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold">Make a donation</h2>

              <div className="mt-6">
                <div className="text-xs uppercase font-semibold tracking-[0.1em] text-[#5c6b6d] mb-3">Frequency</div>
                <div className="inline-flex p-1 rounded-full bg-[#f4ede0]">
                  {["one-time", "monthly"].map((f) => (
                    <button key={f} type="button" onClick={() => setFrequency(f)} className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-colors ${frequency === f ? "bg-[#1c2b2d] text-white" : "text-[#1c2b2d]"}`}>{f === "one-time" ? "One-time" : "Monthly"}</button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs uppercase font-semibold tracking-[0.1em] text-[#5c6b6d] mb-3">Choose an amount</div>
                <div className="grid grid-cols-3 gap-3">
                  {["25", "75", "300"].map((a) => (
                    <button key={a} type="button" onClick={() => { setPkg(a); setCustom(""); }} className={`py-4 rounded-2xl font-display text-xl font-bold border-2 transition-all ${pkg === a && !custom ? "border-[#d95a40] bg-[#d95a40] text-white" : "border-[#e0d8cc] text-[#1c2b2d] hover:border-[#d95a40]"}`}>£{a}</button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label className="form-label">Or enter a custom amount (£)</label>
                <input type="number" min="1" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. 50" className="form-input" />
              </div>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div><label className="form-label">Name (optional)</label><input value={name} onChange={(e) => setName(e.target.value)} className="form-input" placeholder="Jane Smith" /></div>
                <div><label className="form-label">Email (optional, for receipts)</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" placeholder="you@example.com" /></div>
              </div>

              <button type="submit" disabled={busy} className="btn-primary w-full justify-center mt-7 disabled:opacity-60">
                <Heart size={18} strokeWidth={2.5} /> {busy ? "Redirecting..." : "Continue securely"}
              </button>
              <p className="mt-3 text-sm text-[#5c6b6d] flex items-center gap-2 justify-center"><Lock size={14} /> You will be redirected to Stripe to complete your donation.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
