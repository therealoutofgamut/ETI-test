import { useState, useEffect } from "react";
import { mutationData } from "./mutationData.js";
import { allMutationNames } from "./allMutationNames.js";

const eligibleMutations = new Set([
  "F508del", "G85E", "R117C", "R117H", "R334W", "R347P", "R347H", "R352Q", "R553Q", "R553X",
  "A455E", "G178R", "G551D", "G551S", "G1244E", "G1249R", "G1349D", "G970R", "G970D", "E92K",
  "E56K", "E60K", "E116K", "E116Q", "E193K", "E292K", "E403D", "E474K", "E588V", "E822K",
  "K1060T", "K464E", "D110E", "D110H", "D1270N", "D192G", "D443Y", "D579G", "D614G", "D836Y",
  "D979V", "D993Y", "N1303K", "N1303I", "N1088D", "N186K", "N187K", "N418S", "Q1291R", "Q1313K",
  "Q237E", "Q237H", "S1251N", "S549N", "S549R", "S549I", "S737F", "S1159F", "T338I", "T1036N",
  "T1053I", "T1246I", "V754M", "W1282R", "Y109N", "Y161D", "Y563N", "Q552P", "I980K", "S1255P"
]);

export default function TrikaftaChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const performLookup = (query) => {
    console.log("🔍 Lookup triggered for:", query);
    const cleaned = query.trim().toUpperCase();
    const matchedKey = Object.keys(mutationData).find(
    key => {
      const match = key.toUpperCase() === cleaned || mutationData[key].all_aliases.some(alias => alias.toUpperCase() === cleaned);
      if (match) console.log("✅ Match found for:", key);
      return match;
    }
      key =>
        key.toUpperCase() === cleaned ||
        mutationData[key].all_aliases.some(alias => alias.toUpperCase() === cleaned)
    );

    if (matchedKey) {
      const data = mutationData[matchedKey];
      const isEligible = data.all_aliases.some(alias => eligibleMutations.has(alias));
      console.log("🎯 Lookup result: Eligible =", isEligible);
      setResult({
        official_name: data.official_name,
        all_aliases: data.all_aliases,
        eligible: isEligible
      });
    } else {
      setResult(null);
    }

    // Suggestion update
    if (!matchedKey && cleaned.length > 0) {
      const matches = allMutationNames.filter(name =>
        name.includes(cleaned)
      ).slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    performLookup(input);
  }, [input]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Trikafta Mutation Checker</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => { setInput(e.target.value); performLookup(e.target.value); }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); performLookup(input);
          }
        }}
        placeholder="Enter CFTR mutation (e.g., F508del)"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {result && (
        <div className="bg-gray-100 p-3 rounded mb-4">
          <p><strong>Official Name:</strong> {result.official_name}</p>
          <p><strong>Aliases:</strong> {result.all_aliases.join(", ")}</p>
          <p><strong>Eligibility:</strong> {result.eligible ? "✅ Eligible" : "❌ Not eligible"}</p>
        </div>
      )}

      {!result && suggestions.length > 0 && (
        <div className="text-yellow-700 mt-4">
          <p className="font-semibold">Did you mean:</p>
          <ul className="list-disc list-inside">
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    setInput(s); performLookup(s);
                  }}
                  className="text-blue-600 underline"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
