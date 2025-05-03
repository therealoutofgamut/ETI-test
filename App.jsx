import { useState, useEffect } from "react";
import { mutationData } from "./mutationData.js";
import { allMutationNames } from "./allMutationNames.js";
import { saveAs } from "file-saver";

const eligibleMutations = new Set([
  "F508del", "G85E", "R117C", "R117H", "R334W", "R347P", "R347H", "R352Q", "R553Q", "R553X",
  "A455E", "G178R", "G551D", "G551S", "G1244E", "G1249R", "G1349D", "G970R", "G970D", "E92K",
  "E56K", "E60K", "E116K", "E116Q", "E193K", "E292K", "E403D", "E474K", "E588V", "E822K",
  "K1060T", "K464E", "D110E", "D110H", "D1270N", "D192G", "D443Y", "D579G", "D614G", "D836Y",
  "D979V", "D993Y", "N1303K", "N1303I", "N1088D", "N186K", "N187K", "N418S", "Q1291R", "Q1313K",
  "Q237E", "Q237H", "S1251N", "S549N", "S549R", "S549I", "S737F", "S1159F", "T338I", "T1036N",
  "T1053I", "T1246I", "V754M", "W1282R", "Y109N", "Y161D", "Y563N", "Q552P", "I980K", "S1255P",
  "K162E", "L619S", "M952I", "G551A"
]);

export default function TrikaftaChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) return JSON.parse(stored);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDark));
  }, [isDark]);

  const normalize = val => (val || "").trim().toUpperCase();

  const runLookup = (query) => {
    setLoading(true);
    try {
      const cleaned = normalize(query);
      let matchedKey = null;
      for (const key of Object.keys(mutationData || {})) {
        const aliases = (mutationData[key].all_aliases || []).map(normalize);
        if (normalize(key) === cleaned || aliases.includes(cleaned)) {
          matchedKey = key;
          break;
        }
      }

      if (matchedKey) {
        const data = mutationData[matchedKey] || {};
        const isEligible = eligibleMutations.has(normalize(data.official_name)) ||
          (data.all_aliases || []).some(alias => eligibleMutations.has(normalize(alias)));
        const newResult = {
          official_name: data.official_name,
          all_aliases: data.all_aliases,
          eligible: isEligible
        };
        setResult(newResult);
        setSuggestions([]);
        setHistory(prev => [{ query: cleaned, ...newResult }, ...prev.slice(0, 4)]);
      } else {
        setResult(null);
        const matches = (allMutationNames || []).filter(name =>
          normalize(name).includes(cleaned)
        ).slice(0, 5);
        setSuggestions(matches);
      }
    } catch (e) {
      console.error("Lookup failed", e);
      setResult(null);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-xl border ${isDark ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black border-gray-200"}`}>
      <h1 className={`text-3xl font-bold text-center mb-6 ${isDark ? "text-blue-300" : "text-blue-700"}`}>Trikafta Mutation Checker</h1>

      <div className="text-right mb-2">
        <button onClick={() => setIsDark(!isDark)} className="text-sm px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600">
          {`Toggle ${isDark ? "Light" : "Dark"} Mode`}
        </button>
      </div>

      <input
        value={input}
        onChange={e => {
          const val = e.target.value;
          setInput(val);
          runLookup(val);
        }}
        placeholder="Enter mutation"
        className={`w-full p-2 border mb-4 rounded ${isDark ? "bg-gray-800 text-white border-gray-600" : "border-gray-300"}`}
      />

      {loading && <div className="text-center my-4"><div className="spinner" /></div>}

      {result && (
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-4">
          <p><strong>Official Name:</strong> {result.official_name}</p>
          <p><strong>Aliases:</strong> {(result.all_aliases || []).join(", ")}</p>
          <p><strong>Eligibility:</strong> {result.eligible ? "✅ Eligible" : "❌ Not eligible"}</p>
        </div>
      )}

      {!result && suggestions.length > 0 && (
        <div className="mt-2">
          <p className="font-semibold text-yellow-600 dark:text-yellow-300">Did you mean:</p>
          <ul>
            {suggestions.map((s, i) => (
              <li key={i}>
                <button onClick={() => {
                  setInput(s);
                  runLookup(s);
                }} className="text-blue-600 dark:text-blue-300 underline">{s}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Lookup History</h2>
          <ul className="text-sm">
            {history.map((h, i) => (
              <li key={i}>{h.query} → {h.official_name} ({h.eligible ? "✅" : "❌"})</li>
            ))}
          </ul>
        </div>
      )}

      <style>
      {`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          margin: 0 auto;
          height: 32px;
          width: 32px;
          border: 4px solid #ddd;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      `}
      </style>
    </div>
  );
}
