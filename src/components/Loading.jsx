import React from "react";
import { Loader2 } from "lucide-react";

const Loading = ({ message = "Loading..." }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-[#5c6b6d]">
    <Loader2 className="animate-spin text-[#d95a40]" size={32} />
    <p>{message}</p>
  </div>
);

export default Loading;
