import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import AddOptionPanel from "./components/AddOptionPanel.jsx";
import PrioritiesPanel from "./components/PrioritiesPanel.jsx";
import ResultsPanel from "./components/ResultsPanel.jsx";
import { fetchOptions, addOption, removeOption } from "./api/options.js";
import { computeScores } from "./utils/scoring.js";

export default function App() {
  const [options, setOptions] = useState([]);
  const [priorities, setPriorities] = useState({ income: 50, growth: 30, stress: 20 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOptions()
      .then(setOptions)
      .catch(() => setError("Couldn't reach the server — is the API running?"))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (payload) => {
    try {
      const saved = await addOption(payload);
      setOptions((prev) => [...prev, saved]);
    } catch {
      setError("Couldn't save that option — check the API connection");
    }
  };

  const handleRemove = async (id) => {
    setOptions((prev) => prev.filter((o) => o._id !== id));
    await removeOption(id).catch(() => setError("Couldn't delete that option"));
  };

  const scored = computeScores(options, priorities);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <AddOptionPanel onAdd={handleAdd} />
            <PrioritiesPanel priorities={priorities} onChange={setPriorities} />
            <ResultsPanel scored={scored} onRemove={handleRemove} />
          </div>
        )}
      </main>
    </div>
  );
}
