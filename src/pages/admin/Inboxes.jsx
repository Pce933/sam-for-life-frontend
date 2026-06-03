import React, { useEffect, useState } from "react";
import { adminAllForms, adminDeleteForm, adminUpdateFormStatus } from "../../api/client";
import { toast } from "sonner";
import { Trash2, Mail, Phone, Building2, RefreshCw, Heart } from "lucide-react";

const TABS = [
  { key: "contact", label: "Contact", icon: Mail },
  { key: "volunteer", label: "Volunteer", icon: Heart },
  { key: "partnership", label: "Partnership", icon: Building2 },
  { key: "fundraise_idea", label: "Fundraise ideas", icon: Heart },
  { key: "newsletter", label: "Newsletter", icon: Mail },
];

const STATUS_OPTIONS = ["new", "in_progress", "resolved", "archived"];

const SubmissionCard = ({ collection, item, onDelete, onStatus }) => {
  const status = item.status || (collection === "newsletter" ? "active" : "new");
  return (
    <div className="sam-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {item.name && <div className="font-display text-lg font-bold">{item.name}</div>}
          {item.company && <div className="text-sm text-[#d95a40] font-semibold mt-0.5">{item.company}</div>}
          {item.email && <a className="text-sm text-[#5c6b6d] flex items-center gap-1.5 mt-1" href={`mailto:${item.email}`}><Mail size={12} /> {item.email}</a>}
          {item.phone && <div className="text-sm text-[#5c6b6d] flex items-center gap-1.5"><Phone size={12} /> {item.phone}</div>}
        </div>
        <button onClick={() => onDelete(item.id)} aria-label="Delete" className="p-2 text-[#5c6b6d] hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
      </div>
      {item.subject && <div className="mt-3 text-sm font-semibold">{item.subject}</div>}
      {item.interest && <div className="mt-3 text-sm"><span className="text-xs uppercase font-semibold tracking-wider text-[#5c6b6d]">Interest:</span> {item.interest}</div>}
      {item.skills && <div className="mt-2 text-sm"><span className="text-xs uppercase font-semibold tracking-wider text-[#5c6b6d]">Skills:</span> {item.skills}</div>}
      {item.availability && <div className="mt-1 text-sm"><span className="text-xs uppercase font-semibold tracking-wider text-[#5c6b6d]">Availability:</span> {item.availability}</div>}
      {item.message && <p className="mt-2 text-sm text-[#1c2b2d]/85 whitespace-pre-wrap leading-relaxed">{item.message}</p>}
      {item.why && <p className="mt-2 text-sm text-[#1c2b2d]/85 whitespace-pre-wrap leading-relaxed"><span className="text-xs uppercase font-semibold tracking-wider text-[#5c6b6d]">Why:</span> {item.why}</p>}
      {item.idea && <p className="mt-2 text-sm text-[#1c2b2d]/85 whitespace-pre-wrap leading-relaxed">{item.idea}</p>}
      <div className="mt-4 flex items-center justify-between text-xs text-[#5c6b6d]">
        <div>{item.created_at?.slice(0, 19).replace("T", " ")}</div>
        {collection !== "newsletter" && (
          <select value={status} onChange={(e) => onStatus(item.id, e.target.value)} className="text-xs border border-[#e0d8cc] rounded-full px-3 py-1 bg-white focus:outline-none focus:border-[#d95a40]">
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
          </select>
        )}
      </div>
    </div>
  );
};

const Inboxes = () => {
  const [data, setData] = useState(null);
  const [active, setActive] = useState("contact");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminAllForms();
      setData(res);
    } catch (err) {
      toast.error("Could not load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 15000); // soft real-time polling
    return () => clearInterval(t);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this submission?")) return;
    await adminDeleteForm(active, id);
    toast.success("Deleted");
    load();
  };
  const handleStatus = async (id, status) => {
    await adminUpdateFormStatus(active, id, status);
    toast.success("Status updated");
    load();
  };

  const items = data?.[active] || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Inbox</h1>
          <p className="text-[#5c6b6d] mt-1">Form submissions from your website. Auto-refreshes every 15s.</p>
        </div>
        <button onClick={load} className="btn-outline" disabled={loading}><RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh</button>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {TABS.map((t) => {
          const Icon = t.icon;
          const count = data?.[t.key]?.length || 0;
          return (
            <button key={t.key} onClick={() => setActive(t.key)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${active === t.key ? "bg-[#1c2b2d] text-white" : "bg-white border border-[#e8e2d9] text-[#1c2b2d] hover:border-[#d95a40]"}`}>
              <Icon size={14} /> {t.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${active === t.key ? "bg-[#d95a40] text-white" : "bg-[#f4ede0]"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {loading && !data && <div className="text-[#5c6b6d]">Loading...</div>}
      {!loading && items.length === 0 && <div className="text-[#5c6b6d] sam-card p-8 text-center">No submissions yet.</div>}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((it) => (
          <SubmissionCard key={it.id} collection={active} item={it} onDelete={handleDelete} onStatus={handleStatus} />
        ))}
      </div>
    </div>
  );
};

export default Inboxes;
