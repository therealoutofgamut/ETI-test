
import React, { useState } from "react";
import { mutationData } from "./mutationData";

const eligibleMutations = new Set([
  "L137P",
  "D1152H", "L206W", "R1066H", "S945L", "F508del", "L997F", "R117C", "T338I", "G85E",
  "M1101K", "R347H", "V232D", "A455E", "L1077P", "P5L", "R347P", "N1303K", "F200L",
  "I1139V", "P574H", "S1045Y", "F31del", "I1257", "P67L", "S108F", "F311L", "I1269N",
  "P750L", "S1118F", "F508C", "I1366N", "Q129R", "S1159P", "F508C;S1251N", "I148N",
  "Q1313K", "F575Y", "I1487", "Q23E", "S1235R", "F587I", "I175V", "Q237H", "S1251N",
  "G1047R", "I331N", "Q359R", "S1255P", "G1061R", "I336K", "Q327H", "S13F", "G542X", "R553X"
]);

export default function TrikaftaChecker() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (input) => {
    const cleaned = input.trim();
    const lookup = mutationData[cleaned];
    if (lookup) {
      const eligible = lookup.all_aliases.some((alias) => eligibleMutations.has(alias));
      setResult({ ...lookup, eligible });
      setSuggestions([]);
    } else {
      setResult(null);
      const matches = Object.keys(mutationData)
        .filter((key) => key.toLowerCase().includes(cleaned.toLowerCase()))
        .slice(0, 5);
      setSuggestions(matches);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Trikafta Mutation Checker</h1>
      <input
        className="border border-gray-300 px-3 py-2 rounded w-full"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Enter CFTR mutation name"
      />

      {suggestions.length > 0 && (
        <div className="text-sm text-gray-500">
          <p>Did you mean:</p>
          <ul className="list-disc list-inside">
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setQuery(s);
                    handleSearch(s);
                  }}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="border rounded p-4 bg-white shadow space-y-2">
          <p><strong>Official Name:</strong> {result.official_name}</p>
          <p><strong>Aliases:</strong> {result.all_aliases.join(", ")}</p>
          <p>
            <strong>Eligibility:</strong> {result.eligible ? (
              <span className="text-green-600 font-semibold">Eligible</span>
            ) : (
              <span className="text-red-600 font-semibold">Not Eligible</span>
            )}
          </p>
        </div>
      )}

      {query && !result && suggestions.length === 0 && (
        <p className="text-red-600">Mutation not found in database.</p>
      )}
    </div>
  );
}
