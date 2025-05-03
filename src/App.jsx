
import React, { useState } from "react";
import { mutationData } from "./mutationData";

const eligibleMutations = new Set([
  "11269N",
  "1331N",
  "1341G>A",
  "1502T",
  "1507_1515del9",
  "1618T",
  "1898+3A",
  "2183A",
  "2752-26A",
  "2789+2",
  "2789+5G",
  "296+28A",
  "3041-15T>G",
  "3141del9",
  "3272-26A>G",
  "3600G",
  "3849+10kbC>T",
  "3849+40A",
  "3849+4A",
  "3850-3T",
  "392G",
  "4005+2T",
  "5T;TG13",
  "5T;TGI2",
  "621+3A>G",
  "711+3A>G",
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
  "CFTR",
  "D110H",
  "D1270N",
  "D1445N",
  "D192G",
  "D443Y",
  "D443Y;G576A;R668C",
  "D565G",
  "D614G",
  "D836Y",
  "D924N",
  "D993Y",
  "D9I79V",
  "DI1152H",
  "DIIOE",
  "DS579G",
  "E116Q",
  "E16K",
  "E193K",
  "E403D",
  "E474K",
  "E60K",
  "E822K",
  "E831X",
  "E92K",
  "ES6K",
  "ES88V",
  "F1052V",
  "F1074L",
  "F191V",
  "F1I07L",
  "F2001",
  "F311",
  "F311L",
  "F508",
  "F508C",
  "F508C;S1251N",
  "FI1016S",
  "FIO99L",
  "FS75Y",
  "FS871",
  "G1047R",
  "G1061R",
  "G1069R",
  "G1123R",
  "G1244E",
  "G1247R",
  "G1249R",
  "G126D",
  "G1349D",
  "G194R",
  "G194V",
  "G27E",
  "G27R",
  "G314E",
  "G424S",
  "G463V",
  "G480C",
  "G480S",
  "G551D",
  "G576A",
  "G576A;R668C",
  "G5SIS",
  "G622D",
  "G628R",
  "G85E",
  "G970D",
  "G970S",
  "GI78E",
  "GI78R",
  "GSS5IA",
  "H1054D",
  "H1085P",
  "H1085R",
  "H620P",
  "H620Q",
  "H939R",
  "H939R;H949L",
  "HI139R",
  "HI375P",
  "HI99Y",
  "I1027T",
  "I1139V",
  "I125T",
  "I1366N",
  "I148N",
  "I148T",
  "I175V",
  "I336K",
  "I506L",
  "I556V",
  "I601F",
  "I807M",
  "IL05N",
  "K1060T",
  "K162E",
  "K464E",
  "L1077P",
  "L1324P",
  "L1335P",
  "L137P",
  "L1480P",
  "L165S",
  "L1I011S",
  "L206",
  "L320V",
  "L333F",
  "L333H",
  "L346P",
  "L441P",
  "L453S",
  "L619S",
  "L967S",
  "L997F",
  "LISP",
  "M1137V",
  "M150K",
  "M152V",
  "M265R",
  "M9521",
  "M952T",
  "MIIO1K",
  "N1088D",
  "N13031",
  "N1303K",
  "N418S",
  "NI187K",
  "NI86K",
  "P140S",
  "P2058",
  "P499A",
  "P750L",
  "PO67L",
  "PS74H",
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
  "R10700",
  "R1070W",
  "R1162L",
  "R117P",
  "R1283M",
  "R1283S",
  "R1980K",
  "R1I7C",
  "R1I7H",
  "R258G",
  "R2970",
  "R31C",
  "R31L",
  "R334L",
  "R334Q",
  "R347H",
  "R347L",
  "R347P",
  "R3520",
  "R352W",
  "R553Q",
  "R668C",
  "R709Q0",
  "R74Q",
  "R74W",
  "R74W;D1270N",
  "R74W;V201M",
  "R74W;V201M;D1270N",
  "R751L",
  "R75L",
  "R75Q",
  "R792G",
  "R9I33G",
  "RI066H",
  "RI17C;G576A;R668C",
  "RI70H",
  "RIUI7G",
  "RIUZL",
  "RS16S",
  "RS55G",
  "S1045Y",
  "S108F",
  "S1159F",
  "S1235R",
  "S1251N",
  "S1255P",
  "S292K",
  "S341P",
  "S364P",
  "S492F",
  "S737F",
  "S912L",
  "S945L",
  "S977F",
  "SI3F",
  "SIIS9P",
  "SILI8F",
  "SS49N",
  "SS49R",
  "SS89N",
  "T1036N",
  "T1053I",
  "T10861",
  "T1246I",
  "T1299",
  "T338I",
  "T3511",
  "TRIKAFTA",
  "V1240G",
  "V1293G",
  "V201M",
  "V232D",
  "V456A",
  "V456F",
  "V5621",
  "V603F",
  "V754M",
  "VIIS3E",
  "W1098C",
  "W1282R",
  "W36IR",
  "Y1014C",
  "Y1032C",
  "Y109N",
  "Y161D",
  "Y301C",
  "Y563N",
  "YI61S"
]);


import { useEffect } from "react";

export default function TrikaftaChecker() {
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
          <p><strong>Official Name:</strong> {result.official_name} <button className="ml-2 text-sm text-blue-600 underline" onClick={() => copyText(result.official_name)}>Copy</button></p>
          <p><strong>Aliases:</strong> {result.all_aliases.join(", ")} <button className="ml-2 text-sm text-blue-600 underline" onClick={() => copyText(result.all_aliases.join(", "))}>Copy</button></p>
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
