import { useState, useEffect } from "react";

const eligibleMutations = new Set(["F508del", "G551D", "Q552P"]);

const mutationData = {
  F508del: {
    official_name: "F508del",
    all_aliases: ["ΔF508", "c.1521_1523delCTT", "p.Phe508del"]
  },
  G551D: {
    official_name: "G551D",
    all_aliases: ["c.1652G>A", "p.Gly551Asp"]
  },
  Q552P: {
    official_name: "Q552P",
    all_aliases: ["c.1655A>C", "p.Gln552Pro"]
  }
};

const allMutationNames = Object.values(mutationData).flatMap(d => [d.official_name, ...d.all_aliases]);

export default function TrikaftaChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
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
      for (const key of Object.keys(mutationData)) {
        const aliases = (mutationData[key].all_aliases || []).map(normalize);
        if (normalize(key) === cleaned || aliases.includes(cleaned)) {
          matchedKey = key;
          break;
        }
      }

      if (matchedKey) {
        const data = mutationData[matchedKey];
        const aliasesToCheck = [data.official_name, ...(data.all_aliases || [])];
        const isEligible = aliasesToCheck.some(alias => eligibleMutations.has(normalize(alias)));
        setResult({
          official_name: data.official_name,
          all_aliases: data.all_aliases,
          eligible: isEligible
        });
        setSuggestions([]);
      } else {
        setResult(null);
        const matches = allMutationNames.filter(name => normalize(name).includes(cleaned)).slice(0, 5);
        setSuggestions(matches);
      }
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
