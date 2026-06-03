import React from "react";
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { Heart, LogOut, Inbox, CreditCard, Settings, Users, Newspaper, BookOpen, Award, GraduationCap, Trophy, BarChart3 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Inboxes from "./Inboxes";
import Transactions from "./Transactions";
import SettingsEditor from "./SettingsEditor";
import CmsList from "./CmsList";

const MENU = [
  { to: "/admin", label: "Inbox", icon: Inbox, end: true },
  { to: "/admin/transactions", label: "Donations", icon: CreditCard },
  { to: "/admin/settings", label: "Site settings", icon: Settings },
  { to: "/admin/stories", label: "Stories", icon: BookOpen },
  { to: "/admin/news", label: "News", icon: Newspaper },
  { to: "/admin/team", label: "Team", icon: Users },
  { to: "/admin/values", label: "Values", icon: Award },
  { to: "/admin/programme", label: "Programme", icon: GraduationCap },
  { to: "/admin/fundraise", label: "Fundraise ideas", icon: Trophy },
  { to: "/admin/involvement", label: "Involvement cards", icon: Heart },
  { to: "/admin/impact", label: "Impact stats", icon: BarChart3 },
];

const storiesFields = [
  { key: "key", label: "Key (slug)", required: true },
  { key: "name", label: "Name", required: true },
  { key: "age", label: "Age", type: "number", required: true },
  { key: "role", label: "Role", required: true },
  { key: "quote", label: "Quote", textarea: true, required: true },
  { key: "image", label: "Image URL", required: true },
  { key: "teller", label: "Told by" },
  { key: "body", label: "Body text", textarea: true },
  { key: "order", label: "Order", type: "number" },
  { key: "published", label: "Published", type: "checkbox" },
];
const newsFields = [
  { key: "date", label: "Date (display)", required: true },
  { key: "tag", label: "Tag", required: true },
  { key: "title", label: "Title", required: true },
  { key: "desc", label: "Description", textarea: true, required: true },
  { key: "order", label: "Order", type: "number" },
  { key: "published", label: "Published", type: "checkbox" },
];
const teamFields = [
  { key: "initials", label: "Initials", required: true },
  { key: "name", label: "Name", required: true },
  { key: "role", label: "Role", required: true },
  { key: "bio", label: "Bio", textarea: true },
  { key: "order", label: "Order", type: "number" },
];
const valueFields = [
  { key: "title", label: "Title", required: true },
  { key: "desc", label: "Description", textarea: true, required: true },
  { key: "order", label: "Order", type: "number" },
];
const programmeFields = [
  { key: "key", label: "Key", required: true },
  { key: "eyebrow", label: "Eyebrow text", required: true },
  { key: "title", label: "Title", required: true },
  { key: "desc", label: "Description", textarea: true, required: true },
  { key: "icon", label: "Icon (graduation/briefcase/building)", required: true },
  { key: "image", label: "Image URL", required: true },
  { key: "bullets", label: "Bullets (one per line)", type: "lines" },
  { key: "order", label: "Order", type: "number" },
];
const fundraiseFields = [
  { key: "icon", label: "Icon (footprints/cake/bike/sparkles)", required: true },
  { key: "title", label: "Title", required: true },
  { key: "desc", label: "Description", textarea: true, required: true },
  { key: "order", label: "Order", type: "number" },
];
const involvementFields = [
  { key: "key", label: "Key", required: true },
  { key: "icon", label: "Icon (heart/users/handshake/trophy)", required: true },
  { key: "title", label: "Title", required: true },
  { key: "desc", label: "Description", textarea: true, required: true },
  { key: "to", label: "Link URL", required: true },
  { key: "order", label: "Order", type: "number" },
];
const impactFields = [
  { key: "value", label: "Value (e.g. 1 in 5)", required: true },
  { key: "text", label: "Description", textarea: true, required: true },
  { key: "order", label: "Order", type: "number" },
];

const AdminDashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5c6b6d]">Loading...</div>;
  }
  if (!user) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-[#faf8f5] text-[#1c2b2d]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1c2b2d] text-[#faf8f5] hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-2 font-display text-xl font-bold mb-8">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#d95a40] text-white">
            <Heart size={20} fill="white" strokeWidth={2.5} />
          </span>
          SAM Admin
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {MENU.map((m) => {
            const Icon = m.icon;
            return (
              <NavLink key={m.to} to={m.to} end={m.end} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-[#d95a40] text-white" : "text-[#a8b5b7] hover:bg-[#2a3a3c] hover:text-white"}`}>
                <Icon size={18} />{m.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="mt-6 pt-6 border-t border-[#2f4143]">
          <div className="text-sm font-semibold">{user.name}</div>
          <div className="text-xs text-[#a8b5b7]">{user.email}</div>
          <button onClick={handleLogout} className="mt-4 flex items-center gap-2 text-sm text-[#a8b5b7] hover:text-white">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="lg:hidden bg-[#1c2b2d] text-white p-4 flex items-center justify-between">
          <div className="font-display font-bold">SAM Admin</div>
          <button onClick={handleLogout} className="text-sm flex items-center gap-2"><LogOut size={16} /> Out</button>
        </div>
        <div className="p-6 md:p-10">
          <Routes>
            <Route path="/" element={<Inboxes />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<SettingsEditor />} />
            <Route path="/stories" element={<CmsList title="Stories" collection="stories" fields={storiesFields} displayKey="name" />} />
            <Route path="/news" element={<CmsList title="News" collection="news" fields={newsFields} displayKey="title" />} />
            <Route path="/team" element={<CmsList title="Team" collection="team" fields={teamFields} displayKey="name" />} />
            <Route path="/values" element={<CmsList title="Values" collection="values" fields={valueFields} displayKey="title" />} />
            <Route path="/programme" element={<CmsList title="Programme steps" collection="programme" fields={programmeFields} displayKey="title" />} />
            <Route path="/fundraise" element={<CmsList title="Fundraise ideas" collection="fundraise" fields={fundraiseFields} displayKey="title" />} />
            <Route path="/involvement" element={<CmsList title="Involvement cards" collection="involvement" fields={involvementFields} displayKey="title" />} />
            <Route path="/impact" element={<CmsList title="Impact stats" collection="impact" fields={impactFields} displayKey="value" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
