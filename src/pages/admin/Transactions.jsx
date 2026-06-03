import React, { useEffect, useState } from "react";
import { adminTransactions, adminGetSettings } from "../../api/client";
import { RefreshCw, CheckCircle2, XCircle, Clock, FileText, Receipt } from "lucide-react";
import { toast } from "sonner";
import { downloadPdf } from "../../lib/pdf";

const statusBadge = (status) => {
  if (status === "paid") return { cls: "bg-green-100 text-green-700", Icon: CheckCircle2 };
  if (status === "expired") return { cls: "bg-red-100 text-red-700", Icon: XCircle };
  return { cls: "bg-yellow-100 text-yellow-700", Icon: Clock };
};

const Transactions = () => {
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [txData, settingsData] = await Promise.all([
        adminTransactions(),
        adminGetSettings()
      ]);
      setItems(txData);
      setSettings(settingsData || {});
    } catch (err) {
      toast.error("Could not load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  const total = items.filter((i) => i.payment_status === "paid").reduce((sum, i) => sum + (i.amount || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Donations</h1>
          <p className="text-[#5c6b6d] mt-1">Stripe checkout sessions. Auto-refreshes every 15s.</p>
        </div>
        <button onClick={load} className="btn-outline" disabled={loading}><RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh</button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="sam-card p-5"><div className="text-xs uppercase font-semibold text-[#5c6b6d]">Total raised</div><div className="font-display text-3xl font-bold mt-1">£{total.toFixed(2)}</div></div>
        <div className="sam-card p-5"><div className="text-xs uppercase font-semibold text-[#5c6b6d]">Total sessions</div><div className="font-display text-3xl font-bold mt-1">{items.length}</div></div>
        <div className="sam-card p-5"><div className="text-xs uppercase font-semibold text-[#5c6b6d]">Completed</div><div className="font-display text-3xl font-bold mt-1">{items.filter((i) => i.payment_status === "paid").length}</div></div>
      </div>

      <div className="sam-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#f4ede0] text-left text-xs uppercase tracking-wider text-[#5c6b6d]">
            <tr>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Donor</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Frequency</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Session</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => {
              const { cls, Icon } = statusBadge(it.payment_status);
              return (
                <tr key={it.id} className="border-t border-[#ece4d6]">
                  <td className="px-5 py-3 text-[#5c6b6d]">{it.created_at?.slice(0, 19).replace("T", " ")}</td>
                  <td className="px-5 py-3">{it.donor_name || "—"}<br /><span className="text-xs text-[#5c6b6d]">{it.donor_email || ""}</span></td>
                  <td className="px-5 py-3 font-semibold">£{Number(it.amount || 0).toFixed(2)}</td>
                  <td className="px-5 py-3 capitalize">{it.frequency}</td>
                  <td className="px-5 py-3"><span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}><Icon size={12} /> {it.payment_status || "pending"}</span></td>
                  <td className="px-5 py-3 text-xs text-[#5c6b6d] font-mono">{it.session_id?.slice(0, 16)}…</td>
                  <td className="px-5 py-3 text-right">
                    {it.payment_status === "paid" ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => downloadPdf(it, settings, "receipt")}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#d95a40] hover:text-[#c14a33] border border-[#d95a40]/30 hover:border-[#d95a40] px-2.5 py-1.5 rounded-lg transition-colors bg-white shadow-sm"
                          title="Download Receipt PDF"
                        >
                          <Receipt size={13} /> Receipt
                        </button>
                        <button
                          onClick={() => downloadPdf(it, settings, "invoice")}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1c2b2d] hover:text-black border border-[#1c2b2d]/30 hover:border-[#1c2b2d] px-2.5 py-1.5 rounded-lg transition-colors bg-white shadow-sm"
                          title="Download Invoice PDF"
                        >
                          <FileText size={13} /> Invoice
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-[#5c6b6d]">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-8 text-center text-[#5c6b6d]">No transactions yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
