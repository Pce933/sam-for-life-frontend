import React, { useEffect, useState } from "react";
import { adminGetSettings, adminUpdateSettings } from "../../api/client";
import { toast } from "sonner";
import { useContent } from "../../contexts/ContentContext";
import { Save, Loader2 } from "lucide-react";

const SECTIONS = [
  {
    title: "Hero (Home)",
    fields: [
      ["hero_badge", "Hero badge"],
      ["hero_headline_a", "Headline (before accent)"],
      ["hero_headline_b", "Headline accent (orange)"],
      ["hero_subheadline", "Hero subheadline", true],
      ["hero_image", "Hero image URL"],
    ],
  },
  {
    title: "Impact section (Home)",
    fields: [["impact_eyebrow", "Eyebrow"], ["impact_title", "Title"]],
  },
  {
    title: "Mission section (Home)",
    fields: [["mission_eyebrow", "Eyebrow"], ["mission_title", "Title"], ["mission_body", "Body", true]],
  },
  {
    title: "Support strip (Home)",
    fields: [["support_strip_title", "Title", true]],
  },
  {
    title: "About page",
    fields: [
      ["about_intro_eyebrow", "Eyebrow"],
      ["about_intro_title", "Title"],
      ["about_intro_body", "Intro body", true],
      ["mission_card_title", "Mission card title"],
      ["mission_card_body", "Mission card body", true],
      ["vision_card_title", "Vision card title"],
      ["vision_card_body", "Vision card body", true],
      ["about_story_body", "Our story paragraphs (separate by blank line)", true],
    ],
  },
  {
    title: "Programme page",
    fields: [["programme_intro_title", "Title"], ["programme_intro_body", "Body", true]],
  },
  {
    title: "Stories page",
    fields: [["stories_intro_title", "Title"], ["stories_intro_body", "Body", true]],
  },
  {
    title: "News page",
    fields: [["news_intro_title", "Title"], ["news_intro_body", "Body", true]],
  },
  {
    title: "Contact page",
    fields: [["contact_intro_title", "Title"], ["contact_intro_body", "Body", true]],
  },
  {
    title: "Get involved page",
    fields: [["get_involved_intro_title", "Title"], ["get_involved_intro_body", "Body", true]],
  },
  {
    title: "Donate page",
    fields: [["donate_intro_title", "Title"], ["donate_intro_body", "Body", true]],
  },
  {
    title: "Volunteer page",
    fields: [["volunteer_intro_title", "Title"], ["volunteer_intro_body", "Body", true]],
  },
  {
    title: "Partnership page",
    fields: [["partnership_intro_title", "Title"], ["partnership_intro_body", "Body", true]],
  },
  {
    title: "Fundraise page",
    fields: [["fundraise_intro_title", "Title"], ["fundraise_intro_body", "Body", true]],
  },
  {
    title: "Footer",
    fields: [
      ["footer_tagline", "Tagline", true],
      ["footer_email", "Email"],
      ["footer_phone", "Phone"],
      ["footer_location", "Location"],
      ["footer_copyright", "Copyright text"],
      ["social_facebook", "Facebook URL"],
      ["social_instagram", "Instagram URL"],
      ["social_linkedin", "LinkedIn URL"],
    ],
  },
  {
    title: "Receipt & Invoice Settings",
    fields: [
      ["receipt_charity_number", "Charity Registration Number"],
      ["receipt_address", "Official Address", true],
      ["receipt_thank_you", "Receipt Thank-You Message", true],
      ["invoice_terms", "Invoice Terms & Payment Details", true],
    ],
  },
  {
    title: "Email Templates: Contact Form",
    description: "Available placeholders: {name}, {email}, {subject}, {message}",
    fields: [
      ["email_contact_admin_subject", "Admin Notification Subject Line"],
      ["email_contact_user_subject", "Visitor Confirmation Subject Line"],
      ["email_contact_user_body", "Visitor Confirmation Email Body (HTML support)", true]
    ]
  },
  {
    title: "Email Templates: Volunteer Form",
    description: "Available placeholders: {name}, {email}, {phone}, {skills}, {availability}, {why}",
    fields: [
      ["email_volunteer_admin_subject", "Admin Notification Subject Line"],
      ["email_volunteer_user_subject", "Visitor Confirmation Subject Line"],
      ["email_volunteer_user_body", "Visitor Confirmation Email Body (HTML support)", true]
    ]
  },
  {
    title: "Email Templates: Partnership Form",
    description: "Available placeholders: {company}, {name}, {email}, {phone}, {interest}, {message}",
    fields: [
      ["email_partnership_admin_subject", "Admin Notification Subject Line"],
      ["email_partnership_user_subject", "Visitor Confirmation Subject Line"],
      ["email_partnership_user_body", "Visitor Confirmation Email Body (HTML support)", true]
    ]
  },
  {
    title: "Email Templates: Fundraising Form",
    description: "Available placeholders: {name}, {email}, {idea}",
    fields: [
      ["email_fundraise_admin_subject", "Admin Notification Subject Line"],
      ["email_fundraise_user_subject", "Visitor Confirmation Subject Line"],
      ["email_fundraise_user_body", "Visitor Confirmation Email Body (HTML support)", true]
    ]
  },
  {
    title: "Email Templates: Donation Confirmation",
    description: "Available placeholders: {name}, {email}, {amount}, {frequency}, {transaction_id}",
    fields: [
      ["email_donation_admin_subject", "Admin Notification Subject Line"],
      ["email_donation_user_subject", "Donor Confirmation Subject Line"],
      ["email_donation_user_body", "Donor Confirmation Email Body (HTML support)", true]
    ]
  }
];

const SettingsEditor = () => {
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const { refresh } = useContent();

  useEffect(() => {
    adminGetSettings().then((d) => setData(d || {})).catch(() => toast.error("Could not load settings")).finally(() => setLoading(false));
  }, []);

  const handleChange = (key) => (e) => setData({ ...data, [key]: e.target.value });

  const save = async (e) => {
    e?.preventDefault?.();
    if (busy) return;
    setBusy(true);
    try {
      const payload = { ...data };
      delete payload._id;
      delete payload._singleton;
      delete payload.updated_at;
      await adminUpdateSettings(payload);
      toast.success("Settings saved");
      refresh();
    } catch (err) {
      toast.error("Save failed", { description: err?.response?.data?.detail || "" });
    } finally {
      setBusy(false);
    }
  };

  if (loading || !data) return <div className="text-[#5c6b6d]">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Site settings</h1>
          <p className="text-[#5c6b6d] mt-1">Edit every text block on the public site.</p>
        </div>
        <button onClick={save} disabled={busy} className="btn-primary disabled:opacity-60">
          {busy ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} {busy ? "Saving" : "Save all"}
        </button>
      </div>

      <form onSubmit={save} className="space-y-6">
        {SECTIONS.map((sec) => (
          <div key={sec.title} className="sam-card p-6">
            <h2 className="font-display text-xl font-bold mb-1">{sec.title}</h2>
            {sec.description && (
              <p className="text-xs text-[#5c6b6d] mb-4">{sec.description}</p>
            )}
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {sec.fields.map(([key, label, textarea]) => (
                <div key={key} className={textarea ? "sm:col-span-2" : ""}>
                  <label className="form-label">{label}</label>
                  {textarea ? (
                    <textarea value={data[key] || ""} onChange={handleChange(key)} rows={3} className="form-input resize-none" />
                  ) : (
                    <input value={data[key] || ""} onChange={handleChange(key)} className="form-input" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-end"><button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">{busy ? "Saving..." : "Save all"}</button></div>
      </form>
    </div>
  );
};

export default SettingsEditor;
