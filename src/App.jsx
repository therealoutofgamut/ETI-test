
import React, { useState } from "react";
import { mutationData } from "./mutationData";

const eligibleMutations = new Set([
  "1507_1515",
  "2183A",
  "2789+5G",
  "3141",
  "3272-26A",
  "3849+10",
  "546",
  "A1006E",
  "A1067P",
  "A1067T",
  "A107G",
  "A120T",
  "A234D",
  "A309D",
  "A349V",
  "A455E",
  "A46D",
  "A554E",
  "A62P",
  "C491R",
  "CTA",
  "D110E",
  "D110H",
  "D1152H",
  "D1270N",
  "D1445N",
  "D192G",
  "D443Y",
  "D443Y;G576A;R668C",
  "D565G",
  "D579G",
  "D614G",
  "D836Y",
  "D924N",
  "D979V",
  "D993Y",
  "E116K",
  "E116Q",
  "E193K",
  "E292K",
  "E403D",
  "E474K",
  "E56K",
  "E588V",
  "E60K",
  "E822K",
  "E92K",
  "F1016S",
  "F1052V",
  "F1074L",
  "F1099L",
  "F1107L",
  "F191V",
  "F200I",
  "F311",
  "F311L",
  "F508",
  "F508C",
  "F508C;S1251N",
  "F575Y",
  "F587I",
  "G1047R",
  "G1061R",
  "G1069R",
  "G1123R",
  "G1244E",
  "G1247R",
  "G1249R",
  "G126D",
  "G1349D",
  "G178E",
  "G178R",
  "G194R",
  "G194V",
  "G27E",
  "G27R",
  "G314E",
  "G424S",
  "G463V",
  "G480C",
  "G480S",
  "G551A",
  "G551D",
  "G551S",
  "G576A",
  "G576A;R668C",
  "G622D",
  "G628R",
  "G85E",
  "G970D",
  "G970S",
  "H1054D",
  "H1085P",
  "H1085R",
  "H1375P",
  "H139R",
  "H199Y",
  "H620P",
  "H620Q",
  "H939R",
  "H939R;H949L",
  "I1027T",
  "I105N",
  "I1139V",
  "I125T",
  "I1269N",
  "I1366N",
  "I148N",
  "I148T",
  "I175V",
  "I331N",
  "I336K",
  "I502T",
  "I506L",
  "I556V",
  "I601F",
  "I618T",
  "I807M",
  "I980K",
  "K1060T",
  "K162E",
  "K464E",
  "L1011S",
  "L1077P",
  "L1324P",
  "L1335P",
  "L137P",
  "L1480P",
  "L15P",
  "L165S",
  "L206W",
  "L320V",
  "L333F",
  "L333H",
  "L346P",
  "L441P",
  "L453S",
  "L619S",
  "L967S",
  "L997F",
  "M1101K",
  "M1137V",
  "M150K",
  "M152V",
  "M265R",
  "M952I",
  "M952T",
  "N1088D",
  "N1303I",
  "N1303K",
  "N186K",
  "N187K",
  "N418S",
  "P140S",
  "P205S",
  "P499A",
  "P574H",
  "P5L",
  "P67L",
  "P750L",
  "Q1291R",
  "Q1313K",
  "Q237E",
  "Q237H",
  "Q359R",
  "Q372H",
  "Q493R",
  "Q552P",
  "Q98R",
  "R1048G",
  "R1066H",
  "R1070Q",
  "R1070W",
  "R1162L",
  "R117C",
  "R117C;G576A;R668C",
  "R117G",
  "R117H",
  "R117L",
  "R117P",
  "R1283M",
  "R1283S",
  "R170H",
  "R258G",
  "R297Q",
  "R31C",
  "R31L",
  "R334L",
  "R334Q",
  "R347H",
  "R347L",
  "R347P",
  "R352Q",
  "R352W",
  "R516S",
  "R553Q",
  "R555G",
  "R668C",
  "R709Q",
  "R74Q",
  "R74W",
  "R74W;D1270N",
  "R74W;V201M",
  "R74W;V201M;D1270N",
  "R751L",
  "R75L",
  "R75Q",
  "R792G",
  "R933G",
  "S1045Y",
  "S108F",
  "S1118F",
  "S1159F",
  "S1159P",
  "S1235R",
  "S1251N",
  "S1255P",
  "S13F",
  "S341P",
  "S364P",
  "S492F",
  "S549I",
  "S549N",
  "S549R",
  "S589N",
  "S737F",
  "S912L",
  "S945L",
  "S977F",
  "T1036N",
  "T1053I",
  "T1086I",
  "T1246I",
  "T1299I",
  "T338I",
  "T351I",
  "TRIKAFTA",
  "V1153E",
  "V1240G",
  "V1293G",
  "V201M",
  "V232D",
  "V392G",
  "V456A",
  "V456F",
  "V562I",
  "V603F",
  "V754M",
  "W1098C",
  "W1282R",
  "W361R",
  "Y1014C",
  "Y1032C",
  "Y109N",
  "Y161D",
  "Y161S",
  "Y301C",
  "Y563N"
]);


import { useEffect } from "react";

import { allMutationNames } from "./allMutationNames.js";
import { useState } from "react";

export default function TrikaftaChecker() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const cleaned = input.trim();
  const normalized = cleaned.toUpperCase();

  const matchedKey = Object.keys(mutationData).find(
    key =>
      key.toUpperCase() === normalized ||
      mutationData[key].all_aliases.some(alias => alias.toUpperCase() === normalized)
  );

  const lookup = matchedKey ? mutationData[matchedKey] : null;

  React.useEffect(() => {
    if (!lookup && cleaned) {
      const matches = allMutationNames.filter(name =>
        name.includes(normalized)
      ).slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied: " + text);
    });
  };

  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (input) => {
    const cleaned = input.trim();
    
    const normalized = cleaned.toUpperCase();
    const matchedKey = Object.keys(mutationData).find(
      key =>
        key.toUpperCase() === normalized ||
        mutationData[key].all_aliases.some(alias => alias.toUpperCase() === normalized)
    );
    const lookup = matchedKey ? mutationData[matchedKey] : null;
    
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
        {result === null && suggestions.length > 0 && (
        <div className="text-yellow-700 mt-4">
          <p className="font-semibold">Did you mean:</p>
          <ul className="list-disc list-inside">
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  onClick={() => setInput(s)}
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
      )}

      {result && (
        <div className="border rounded p-4 bg-white shadow space-y-2">
          <p><strong>Official Name:</strong> {result.official_name} <button className="ml-2 text-sm text-blue-600 underline" onClick={() => copyText(result.official_name)}>Copy</button></p>
          <p><strong>Aliases:</strong> {result.all_aliases.join(", ")} <button className="ml-2 text-sm text-blue-600 underline" onClick={() => copyText(result.all_aliases.join(", "))}>Copy</button></p>
          <p>
            <strong>Eligibility:</strong> {result.eligible ? (
              <span className="text-green-600 font-semibold">Eligible</span>
            ) : (
              <span className="text-red-600 font-semibold">Not Eligible</span>
            )}
          </p>
        {result === null && suggestions.length > 0 && (
        <div className="text-yellow-700 mt-4">
          <p className="font-semibold">Did you mean:</p>
          <ul className="list-disc list-inside">
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  onClick={() => setInput(s)}
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
      )}

      {query && !result && suggestions.length === 0 && (
        <p className="text-red-600">Mutation not found in database.</p>
      )}
    {result === null && suggestions.length > 0 && (
        <div className="text-yellow-700 mt-4">
          <p className="font-semibold">Did you mean:</p>
          <ul className="list-disc list-inside">
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  onClick={() => setInput(s)}
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
