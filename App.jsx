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
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      return JSON.parse(stored);
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  });

  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      return JSON.parse(stored);
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDark));
  }, [isDark]);

  const normalize = (val) => val.trim().toUpperCase();

  const runLookup = (query) => {
    const cleaned = normalize(query);
    let matchedKey = null;

    for (const key of Object.keys(mutationData)) {
      const aliases = mutationData[key].all_aliases.map(normalize);
      if (normalize(key) === cleaned || aliases.includes(cleaned)) {
        matchedKey = key;
        break;
      }
    }

    if (matchedKey) {
      const data = mutationData[matchedKey];
      const isEligible = eligibleMutations.has(normalize(data.official_name)) ||
                         data.all_aliases.some(alias => eligibleMutations.has(normalize(alias)));
      const newResult = {
        official_name: data.official_name,
        all_aliases: data.all_aliases,
        eligible: isEligible
      };
      setResult(newResult);
      setHistory(prev => [{ query: query.toUpperCase(), ...newResult }, ...prev.slice(0, 4)]);
      setSuggestions([]);
    } else {
      setResult(null);
      setHistory(prev => [{ query: query.toUpperCase(), official_name: "-", all_aliases: [], eligible: false }, ...prev.slice(0, 4)]);
      const matches = allMutationNames.filter(name =>
        normalize(name).includes(cleaned)
      ).slice(0, 5);
      setSuggestions(matches);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    runLookup(val);
  };

  const handleSuggestionClick = (s) => {
    setInput(s);
    runLookup(s);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runLookup(input);
    }
  };

  return (
    <div className={`max-w-xl mx-auto mt-10 p-6 ${isDark ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black border-gray-200"} rounded-2xl shadow-xl border`}>
      <h1 className={`text-3xl font-bold text-center ${isDark ? "text-blue-300" : "text-blue-700"} mb-6`}>
        Trikafta Mutation Checker
      </h1>
      <div className="text-right mb-2">
        <button onClick={() => setIsDark(!isDark)} className="text-sm px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600">
          {`Toggle ${isDark ? "Light" : "Dark"} Mode`}
        </button>
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter CFTR mutation (e.g., F508del)"
        className={`w-full p-2 border mb-4 rounded transition ${isDark ? "bg-gray-800 border-gray-600 placeholder-gray-400 text-white" : "border-gray-300"}`}
      />

      {result && (
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-4">
          <p><strong>Official Name:</strong> {result.official_name}</p>
          <p><strong>Aliases:</strong> {result.all_aliases.join(", ")}</p>
          {result.eligible
            ? <p><strong>Eligibility:</strong> ✅ Eligible</p>
            : <>
                <p><strong>Eligibility:</strong> ❌ Not eligible</p>
                <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">This mutation was found in the database, but is not on the Trikafta eligibility list.</p>
              </>
          }
        </div>
      )}

      {!result && suggestions.length > 0 && (
        <div className="text-yellow-700 dark:text-yellow-400 mt-4">
          <p className="font-semibold">Did you mean:</p>
          <ul className="list-disc list-inside">
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  onClick={() => handleSuggestionClick(s)}
                  className="text-blue-600 dark:text-blue-300 underline"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Lookup History</h2>
          <table className="w-full text-sm border border-gray-300 dark:border-gray-600 shadow-sm rounded">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border px-2 py-1 text-left">Mutation</th>
                <th className="border px-2 py-1 text-left">Official Name</th>
                <th className="border px-2 py-1 text-left">Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1 dark:bg-gray-900">{h.query}</td>
                  <td className="border px-2 py-1 dark:bg-gray-900">{h.official_name}</td>
                  <td className="border px-2 py-1 dark:bg-gray-900">{h.eligible ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," +
                "Mutation,Official Name,Eligibility\n" +
                history.map(h =>
                  [h.query, h.official_name, h.eligible ? "Eligible" : "Not eligible"].join(",")
                ).join("\n");
              const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
              saveAs(blob, "trikafta_lookup_history.csv");
            }}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export History as CSV
          </button>
        </div>
      )}
    </div>
  );
}
