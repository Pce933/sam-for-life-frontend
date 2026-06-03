import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Heart, Lock } from "lucide-react";
import { toast } from "sonner";
import { adminLogin } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

const AdminLogin = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@samforlife.org");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const res = await adminLogin(email, password);
      login(res.token, res.user);
      toast.success(`Welcome, ${res.user.name}`);
      navigate("/admin");
    } catch (err) {
      toast.error("Login failed", { description: err?.response?.data?.detail || "Check your credentials." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 font-display text-3xl font-bold text-[#1c2b2d] mb-8">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#d95a40] text-white">
            <Heart size={24} fill="white" strokeWidth={2.5} />
          </span>
          SAM <span className="text-[#d95a40]">for Life</span>
        </div>
        <div className="sam-card p-8">
          <h1 className="font-display text-2xl font-bold text-center">Admin sign in</h1>
          <p className="text-center text-[#5c6b6d] text-sm mt-2">Manage content, forms and donations.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div><label className="form-label">Email</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" /></div>
            <div><label className="form-label">Password</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" placeholder="••••••••" /></div>
            <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60"><Lock size={16} /> {busy ? "Signing in..." : "Sign in"}</button>
          </form>
          <p className="text-xs text-[#5c6b6d] mt-4 text-center">Dummy credentials: admin@samforlife.org / sam-admin-2026</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
