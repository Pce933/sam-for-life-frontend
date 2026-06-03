import React, { useEffect, useState } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete } from "../../api/client";
import { toast } from "sonner";
import { useContent } from "../../contexts/ContentContext";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

const toLines = (val) => (Array.isArray(val) ? val.join("\n") : "");
const fromLines = (val) => (val || "").split(/\n+/).map((s) => s.trim()).filter(Boolean);

const defaultsFromFields = (fields) => {
  const d = {};
  fields.forEach((f) => {
    if (f.type === "number") d[f.key] = 0;
    else if (f.type === "checkbox") d[f.key] = true;
    else if (f.type === "lines") d[f.key] = [];
    else d[f.key] = "";
  });
  return d;
};

const Field = ({ field, value, onChange }) => {
  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 mt-3">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(field.key, e.target.checked)} className="w-4 h-4 accent-[#d95a40]" />
        <span className="text-sm font-semibold">{field.label}</span>
      </label>
    );
  }
  if (field.type === "lines") {
    return (
      <div>
        <label className="form-label">{field.label}</label>
        <textarea value={toLines(value)} onChange={(e) => onChange(field.key, fromLines(e.target.value))} rows={5} className="form-input resize-none" />
      </div>
    );
  }
  if (field.textarea) {
    return (
      <div>
        <label className="form-label">{field.label}{field.required && " *"}</label>
        <textarea required={field.required} value={value || ""} onChange={(e) => onChange(field.key, e.target.value)} rows={3} className="form-input resize-none" />
      </div>
    );
  }
  return (
    <div>
      <label className="form-label">{field.label}{field.required && " *"}</label>
      <input required={field.required} type={field.type || "text"} value={value ?? ""} onChange={(e) => onChange(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)} className="form-input" />
    </div>
  );
};

const CmsList = ({ title, collection, fields, displayKey }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const { refresh } = useContent();

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminList(collection);
      setItems(data);
    } catch (e) {
      toast.error("Could not load");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [collection]);

  const openCreate = () => setEditing(defaultsFromFields(fields));
  const openEdit = (item) => setEditing({ ...item });
  const close = () => setEditing(null);

  const setField = (k, v) => setEditing((cur) => ({ ...cur, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const payload = { ...editing };
      delete payload._id;
      if (payload.id) {
        await adminUpdate(collection, payload.id, payload);
        toast.success("Updated");
      } else {
        await adminCreate(collection, payload);
        toast.success("Created");
      }
      setEditing(null);
      load();
      refresh();
    } catch (err) {
      toast.error("Save failed", { description: err?.response?.data?.detail || "Check required fields." });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await adminDelete(collection, id);
    toast.success("Deleted");
    load();
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">{title}</h1>
          <p className="text-[#5c6b6d] mt-1">{items.length} item{items.length === 1 ? "" : "s"}</p>
        </div>
        <button onClick={openCreate} className="btn-primary"><Plus size={16} /> New</button>
      </div>

      {loading ? (
        <div className="text-[#5c6b6d]">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.id} className="sam-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="font-display text-lg font-bold flex-1">{it[displayKey] || "(untitled)"}</div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(it)} className="p-2 text-[#5c6b6d] hover:text-[#d95a40] hover:bg-[#f4ede0] rounded-lg"><Pencil size={16} /></button>
                  <button onClick={() => remove(it.id)} className="p-2 text-[#5c6b6d] hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                </div>
              </div>
              {fields.slice(0, 4).map((f) => {
                if (f.key === displayKey) return null;
                const v = it[f.key];
                if (v === undefined || v === null || v === "") return null;
                const display = Array.isArray(v) ? `${v.length} item(s)` : typeof v === "boolean" ? (v ? "yes" : "no") : String(v).slice(0, 90);
                return (
                  <div key={f.key} className="text-xs text-[#5c6b6d] mt-1"><span className="font-semibold uppercase tracking-wide">{f.label}:</span> {display}</div>
                );
              })}
            </div>
          ))}
          {items.length === 0 && <div className="text-[#5c6b6d] sam-card p-8 text-center col-span-full">No items yet. Click <strong>New</strong> to add one.</div>}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto" onClick={close}>
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-bold">{editing.id ? `Edit ${title}` : `New ${title}`}</h3>
              <button onClick={close} className="p-2 hover:bg-[#f4ede0] rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              {fields.map((f) => <Field key={f.key} field={f} value={editing[f.key]} onChange={setField} />)}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={close} className="btn-outline">Cancel</button>
                <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60"><Save size={16} /> {busy ? "Saving..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CmsList;
