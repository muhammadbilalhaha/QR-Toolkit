"use client";

import { useMemo, useState } from "react";
import QRTypeSelector from "./QRTypeSelector";
import QRForm from "./QRForm";
import QRPreview from "./QRPreview";
import { encodeQRData } from "@/config/qr-types";

export default function PremiumQRGenerator() {
  const [type, setType] = useState("url");
  const [values, setValues] = useState({});

  const encoded = useMemo(() => encodeQRData(type, values), [type, values]);

  const handleTypeChange = (newType) => {
    setType(newType);
    setValues({});
  };

  const handleValueChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 sm:space-y-8 animate-fade-up-delay-1">
      {/* Category Type Selector */}
      <QRTypeSelector value={type} onChange={handleTypeChange} />

      {/* Main Generator Grid */}
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Form Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
          <QRForm type={type} values={values} onChange={handleValueChange} />
        </div>

        {/* Sticky Preview Section */}
        <div className="lg:sticky lg:top-24">
          <QRPreview value={encoded} />
        </div>
      </div>
    </div>
  );
}