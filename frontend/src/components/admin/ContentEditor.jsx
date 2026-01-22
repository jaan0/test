"use client";

import { useState, useEffect } from "react";
import { Eye, Code2, Save, Plus, Trash2 } from "lucide-react";

export default function ContentEditor({ content, onSave, canWrite, saving }) {
  const [viewMode, setViewMode] = useState("visual"); // "visual" or "code"
  const [localContent, setLocalContent] = useState(content || {});
  const [codeValue, setCodeValue] = useState(JSON.stringify(content || {}, null, 2));
  const [error, setError] = useState("");

  useEffect(() => {
    if (content) {
      setLocalContent(content);
      setCodeValue(JSON.stringify(content, null, 2));
    }
  }, [content]);

  const updateField = (path, value) => {
    const updated = { ...localContent };
    const keys = path.split(".");
    let current = updated;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setLocalContent(updated);
    setCodeValue(JSON.stringify(updated, null, 2));
  };

  const addArrayItem = (path, defaultValue = "") => {
    const updated = { ...localContent };
    const keys = path.split(".");
    let current = updated;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];
    if (!Array.isArray(current[lastKey])) current[lastKey] = [];
    current[lastKey].push(defaultValue);
    setLocalContent(updated);
    setCodeValue(JSON.stringify(updated, null, 2));
  };

  const removeArrayItem = (path, index) => {
    const updated = { ...localContent };
    const keys = path.split(".");
    let current = updated;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]].splice(index, 1);
    setLocalContent(updated);
    setCodeValue(JSON.stringify(updated, null, 2));
  };

  const handleCodeChange = (value) => {
    setCodeValue(value);
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === "object" && !Array.isArray(parsed)) {
        setLocalContent(parsed);
        setError("");
      } else {
        setError("Must be an object (not an array)");
      }
    } catch (e) {
      setError("Invalid JSON: " + e.message);
    }
  };

  const handleSave = async () => {
    try {
      const dataToSave = viewMode === "code" ? JSON.parse(codeValue) : localContent;
      await onSave(dataToSave);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const renderField = (key, value, path = "") => {
    const fullPath = path ? `${path}.${key}` : key;

    if (typeof value === "string") {
      return (
        <div key={fullPath} className="space-y-1">
          <label className="block text-sm text-gray-300 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</label>
          <textarea
            value={value}
            onChange={(e) => updateField(fullPath, e.target.value)}
            className="w-full bg-[#0a0f0d] border border-green-500/30 rounded px-3 py-2 text-white text-sm min-h-[80px]"
            readOnly={!canWrite}
          />
        </div>
      );
    } else if (typeof value === "number") {
      return (
        <div key={fullPath} className="space-y-1">
          <label className="block text-sm text-gray-300 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => updateField(fullPath, Number(e.target.value))}
            className="w-full bg-[#0a0f0d] border border-green-500/30 rounded px-3 py-2 text-white"
            readOnly={!canWrite}
          />
        </div>
      );
    } else if (typeof value === "boolean") {
      return (
        <div key={fullPath} className="space-y-1">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => updateField(fullPath, e.target.checked)}
              className="rounded"
              disabled={!canWrite}
            />
            <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
          </label>
        </div>
      );
    } else if (Array.isArray(value)) {
      return (
        <div key={fullPath} className="space-y-2 border-l-2 border-green-500/20 pl-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-gray-300 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            {canWrite && (
              <button
                onClick={() => addArrayItem(fullPath, typeof value[0] === "object" ? {} : "")}
                className="text-green-400 hover:text-green-300 text-xs flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add Item
              </button>
            )}
          </div>
          <div className="space-y-3">
            {value.map((item, index) => (
              <div key={index} className="bg-green-500/5 rounded-lg p-3 border border-green-500/10">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-gray-400">Item {index + 1}</span>
                  {canWrite && (
                    <button
                      onClick={() => removeArrayItem(fullPath, index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {typeof item === "object" ? (
                  <div className="space-y-2">
                    {Object.entries(item).map(([subKey, subValue]) =>
                      renderField(subKey, subValue, `${fullPath}[${index}]`)
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...value];
                      updated[index] = e.target.value;
                      updateField(fullPath, updated);
                    }}
                    className="w-full bg-[#0a0f0d] border border-green-500/30 rounded px-2 py-1 text-white text-sm"
                    readOnly={!canWrite}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <div key={fullPath} className="space-y-3 border-l-2 border-green-500/20 pl-4">
          <label className="block text-sm font-semibold text-gray-300 capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </label>
          <div className="space-y-3">
            {Object.entries(value).map(([subKey, subValue]) =>
              renderField(subKey, subValue, fullPath)
            )}
          </div>
        </div>
      );
    }

    return null;
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
        <div className="space-y-6 border border-green-500/30 rounded-xl p-6 bg-gradient-to-br from-emerald-500/10 via-slate-950/70 to-slate-950/90">
          {Object.keys(localContent).length === 0 ? (
            <p className="text-gray-400 text-sm">No content fields yet. Use Code view to add fields, or they will be created automatically when you save.</p>
          ) : (
            Object.entries(localContent).map(([key, value]) => renderField(key, value))
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
