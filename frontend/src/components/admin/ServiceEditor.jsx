"use client";

import { useState } from "react";
import { X, Plus, Trash2, Eye, Code2, Save } from "lucide-react";

const ICON_OPTIONS = [
  { value: "code", label: "Code" },
  { value: "palette", label: "Palette" },
  { value: "zap", label: "Zap" },
  { value: "globe", label: "Globe" },
  { value: "layout", label: "Layout" },
  { value: "database", label: "Database" },
];

export default function ServiceEditor({ services, onSave, canWrite, saving }) {
  const [viewMode, setViewMode] = useState("visual"); // "visual" or "code"
  const [localServices, setLocalServices] = useState(services || []);
  const [codeValue, setCodeValue] = useState(JSON.stringify(services || [], null, 2));
  const [error, setError] = useState("");

  const updateService = (index, field, value) => {
    const updated = [...localServices];
    updated[index] = { ...updated[index], [field]: value };
    setLocalServices(updated);
    setCodeValue(JSON.stringify(updated, null, 2));
  };

  const addFeature = (index) => {
    const updated = [...localServices];
    if (!updated[index].features) updated[index].features = [];
    updated[index].features = [...updated[index].features, ""];
    setLocalServices(updated);
    setCodeValue(JSON.stringify(updated, null, 2));
  };

  const removeFeature = (index, featureIndex) => {
    const updated = [...localServices];
    updated[index].features = updated[index].features.filter((_, i) => i !== featureIndex);
    setLocalServices(updated);
    setCodeValue(JSON.stringify(updated, null, 2));
  };

  const addService = () => {
    const newService = {
      title: "New Service",
      subtitle: "",
      price: "",
      originalPrice: "",
      badge: "",
      iconKey: "code",
      features: [],
      ctaLabel: "Get Started",
      ctaHref: "#contact",
    };
    const updated = [...localServices, newService];
    setLocalServices(updated);
    setCodeValue(JSON.stringify(updated, null, 2));
  };

  const removeService = (index) => {
    const updated = localServices.filter((_, i) => i !== index);
    setLocalServices(updated);
    setCodeValue(JSON.stringify(updated, null, 2));
  };

  const handleCodeChange = (value) => {
    setCodeValue(value);
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        setLocalServices(parsed);
        setError("");
      } else {
        setError("Must be an array of services");
      }
    } catch (e) {
      setError("Invalid JSON: " + e.message);
    }
  };

  const handleSave = async () => {
    try {
      const dataToSave = viewMode === "code" ? JSON.parse(codeValue) : localServices;
      await onSave(dataToSave);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with view toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("visual")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              viewMode === "visual"
                ? "bg-green-500 text-[#0a0f0d] font-semibold"
                : "bg-green-500/10 text-green-300 hover:bg-green-500/20"
            }`}
          >
            <Eye className="w-4 h-4" />
            Visual
          </button>
          <button
            onClick={() => setViewMode("code")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              viewMode === "code"
                ? "bg-green-500 text-[#0a0f0d] font-semibold"
                : "bg-green-500/10 text-green-300 hover:bg-green-500/20"
            }`}
          >
            <Code2 className="w-4 h-4" />
            Code
          </button>
        </div>
        {canWrite && (
          <button
            onClick={handleSave}
            disabled={saving || !!error}
            className="px-4 py-2 rounded-lg bg-green-500 text-[#0a0f0d] font-semibold hover:bg-green-600 disabled:bg-green-500/60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Visual Editor */}
      {viewMode === "visual" && (
        <div className="space-y-6">
          {localServices.map((service, index) => (
            <div
              key={index}
              className="border border-green-500/30 rounded-xl p-6 bg-gradient-to-br from-emerald-500/10 via-slate-950/70 to-slate-950/90"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">Service #{index + 1}</h3>
                {canWrite && (
                  <button
                    onClick={() => removeService(index)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Title *</label>
                  <input
                    type="text"
                    value={service.title || ""}
                    onChange={(e) => updateService(index, "title", e.target.value)}
                    className="w-full bg-[#0a0f0d] border border-green-500/30 rounded px-3 py-2 text-white"
                    readOnly={!canWrite}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={service.subtitle || ""}
                    onChange={(e) => updateService(index, "subtitle", e.target.value)}
                    className="w-full bg-[#0a0f0d] border border-green-500/30 rounded px-3 py-2 text-white"
                    readOnly={!canWrite}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Price</label>
                  <input
                    type="text"
                    value={service.price || ""}
                    onChange={(e) => updateService(index, "price", e.target.value)}
                    placeholder="e.g., 240 or '25,000 PKR'"
                    className="w-full bg-[#0a0f0d] border border-green-500/30 rounded px-3 py-2 text-white"
                    readOnly={!canWrite}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Original Price</label>
                  <input
                    type="text"
                    value={service.originalPrice || ""}
                    onChange={(e) => updateService(index, "originalPrice", e.target.value)}
                    className="w-full bg-[#0a0f0d] border border-green-500/30 rounded px-3 py-2 text-white"
                    readOnly={!canWrite}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Badge</label>
                  <input
                    type="text"
                    value={service.badge || ""}
                    onChange={(e) => updateService(index, "badge", e.target.value)}
                    placeholder="e.g., Popular, Starter"
                    className="w-full bg-[#0a0f0d] border border-green-500/30 rounded px-3 py-2 text-white"
                    readOnly={!canWrite}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Icon</label>
                  <select
                    value={service.iconKey || service.icon || "code"}
                    onChange={(e) => updateService(index, "iconKey", e.target.value)}
                    className="w-full bg-[#0a0f0d] border border-green-500/30 rounded px-3 py-2 text-white"
                    disabled={!canWrite}
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">CTA Label</label>
                  <input
                    type="text"
                    value={service.ctaLabel || ""}
                    onChange={(e) => updateService(index, "ctaLabel", e.target.value)}
                    className="w-full bg-[#0a0f0d] border border-green-500/30 rounded px-3 py-2 text-white"
                    readOnly={!canWrite}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">CTA Link</label>
                  <input
                    type="text"
                    value={service.ctaHref || ""}
                    onChange={(e) => updateService(index, "ctaHref", e.target.value)}
                    className="w-full bg-[#0a0f0d] border border-green-500/30 rounded px-3 py-2 text-white"
                    readOnly={!canWrite}
                  />
                </div>
              </div>

              {/* Features */}
              <div className="mt-4">
                <label className="block text-sm text-gray-300 mb-2">Features</label>
                <div className="space-y-2">
                  {(service.features || []).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const updated = [...localServices];
                          updated[index].features[featureIndex] = e.target.value;
                          setLocalServices(updated);
                          setCodeValue(JSON.stringify(updated, null, 2));
                        }}
                        className="flex-1 bg-[#0a0f0d] border border-green-500/30 rounded px-3 py-2 text-white text-sm"
                        readOnly={!canWrite}
                      />
                      {canWrite && (
                        <button
                          onClick={() => removeFeature(index, featureIndex)}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {canWrite && (
                    <button
                      onClick={() => addFeature(index)}
                      className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Feature
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {canWrite && (
            <button
              onClick={addService}
              className="w-full border-2 border-dashed border-green-500/30 rounded-xl p-6 hover:border-green-500/60 transition flex items-center justify-center gap-2 text-green-300"
            >
              <Plus className="w-5 h-5" />
              Add New Service
            </button>
          )}
        </div>
      )}

      {/* Code Editor */}
      {viewMode === "code" && (
        <div>
          <textarea
            value={codeValue}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full min-h-[500px] bg-[#0a0f0d] border border-green-500/20 rounded-xl p-4 text-sm text-gray-100 font-mono"
            readOnly={!canWrite}
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}
