import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getCmsAll } from "../api/client";

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const cached = localStorage.getItem("sam_cms_content");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(!content);
  const [error, setError] = useState(null);

  const refresh = useCallback(async (showLoading = false) => {
    try {
      if (showLoading) setLoading(true);
      const data = await getCmsAll();
      setContent(data);
      localStorage.setItem("sam_cms_content", JSON.stringify(data));
      setError(null);
    } catch (e) {
      setError(e?.message || "Failed to load content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh(localStorage.getItem("sam_cms_content") === null);
  }, [refresh]);

  return (
    <ContentContext.Provider value={{ content, loading, error, refresh }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
};

export const useSettings = () => {
  const { content } = useContent();
  return content?.settings || {};
};
