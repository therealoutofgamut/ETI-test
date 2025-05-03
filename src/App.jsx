import { useState, useEffect } from "react";
import { mutationData } from "./mutationData.js";
import { allMutationNames } from "./allMutationNames.js";

export default function TrikaftaChecker() {
        const [forceSubmit, setForceSubmit] = useState(false);

  const handleSubmit = (val) => {
    const cleaned = val.trim().toUpperCase();
    const matchedKey = Object.keys(mutationData).find(
      key =>
        key.toUpperCase() === cleaned ||
        mutationData[key].all_aliases.some(alias => alias.toUpperCase() === cleaned)
    );

    if (matchedKey) {
      const data = mutationData[matchedKey];
      const isEligible = data.all_aliases.some(alias => eligibleMutations.has(alias));
      setResult({
        official_name: data.official_name,
        all_aliases: data.all_aliases,
        eligible: isEligible
      });
      setSuggestions([]);
    } else {
      setResult(null);
      if (cleaned.length >= 1) {
        const matches = allMutationNames.filter(name =>
          name.includes(cleaned)
        ).slice(0, 5);
        setSuggestions(matches);
      } else {
        setSuggestions([]);
      }
    }
  };

  useEffect(() => {
    if (input || forceSubmit) {
      handleSubmit(input);
      setForceSubmit(false);
    }
  }, [input, forceSubmit]);

      
  useEffect(() => {
    const cleaned = input.trim().toUpperCase();
    const matchedKey = Object.keys(mutationData).find(
      key =>
        key.toUpperCase() === cleaned ||
        mutationData[key].all_aliases.some(alias => alias.toUpperCase() === cleaned)
    );

    if (matchedKey) {
      const data = mutationData[matchedKey];
      const isEligible = data.all_aliases.some(alias => eligibleMutations.has(alias));
      setResult({
        official_name: data.official_name,
        all_aliases: data.all_aliases,
        eligible: isEligible
      });
      setSuggestions([]);
    } else {
      setResult(null);
      if (cleaned.length >= 1) {
        const matches = allMutationNames.filter(name =>
          name.includes(cleaned)
        ).slice(0, 5);
        setSuggestions(matches);
      } else {
        setSuggestions([]);
      }
    }
  }, [input]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Trikafta Mutation Checker</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") setForceSubmit(true); }}
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
                  onClick={() => { setInput(s); setForceSubmit(true); }}
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

const eligibleMutations = new Set([
  "F508del", "G85E", "R117C", "R117H", "R334W", "R347P", "R347H", "R352Q", "R553Q", "R553X", "A455E", "G178R", "G551D", "G551S", "G1244E", "G1249R", "G1349D", "G970R", "G970D", "E92K", "E56K", "E60K", "E116K", "E116Q", "E193K", "E292K", "E403D", "E474K", "E588V", "E822K", "E836K", "E56K", "K1060T", "K464E", "D110E", "D110H", "D1270N", "D192G", "D443Y", "D579G", "D614G", "D836Y", "D979V", "D993Y", "N1303K", "N1303I", "N1088D", "N186K", "N187K", "N418S", "N1303K", "Q1291R", "Q1313K", "Q237E", "Q237H", "Q372H", "Q359R", "Q493R", "Q552P", "Q98R", "I1027T", "I105N", "I1139V", "I125T", "I1269N", "I1366N", "I148N", "I148T", "I175V", "I331N", "I336K", "I502T", "I506L", "I556V", "I601F", "I618T", "I807M", "I980K", "L206W", "L967S", "L1077P", "L1011S", "L1335P", "L1324P", "L15P", "L165S", "L320V", "L333F", "L333H", "L346P", "L441P", "L453S", "L619S", "M1137V", "M952I", "M952T", "M1101K", "M150K", "M152V", "M265R", "P5L", "P67L", "P205S", "P499A", "P574H", "P750L", "R74Q", "R74W", "R75Q", "R75L", "R1283M", "R1283S", "R258G", "R297Q", "R31C", "R31L", "R334L", "R352W", "R347L", "R709Q", "R792G", "R933G", "R1048G", "R1070Q", "R1070W", "R1162L", "R117L", "R117G", "R117P", "R170H", "S13F", "S1045Y", "S108F", "S1118F", "S1159F", "S1159P", "S1235R", "S1251N", "S1255P", "S341P", "S549I", "S549N", "S549R", "S589N", "S737F", "S912L", "S977F", "T1036N", "T1053I", "T1086I", "T1246I", "T1299I", "T338I", "T351I", "V1153E", "V1240G", "V1293G", "V201M", "V232D", "V392G", "V456A", "V456F", "V562I", "V603F", "V754M", "W1098C", "W1282R", "W361R", "Y1014C", "Y1032C", "Y109N", "Y161D", "Y161S", "Y301C", "Y563N", "F575Y", "F587I", "F508C", "F508del", "F1016S", "F1052V", "F1074L", "F1099L", "F1107L", "F191V", "G27E", "G27R", "G1047R", "G1061R", "G1069R", "G1123R", "G1244E", "G1247R", "G126D", "G1349D", "G178E", "G194R", "G194V", "G314E", "G424S", "G463V", "G480C", "G480S", "G551A", "G551D", "G551S", "G576A", "G622D", "G628R", "G85E", "1507_1515del9", "3141del9", "3849+10kbC>T", "2789+5G->A", "546insCTA", "2183AA>G"
]);
