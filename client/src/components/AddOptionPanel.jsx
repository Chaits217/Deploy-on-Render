import { useState } from "react";

const CATEGORIES = ["Job", "Carrer", "Business",  "Other"];

export default function AddOptionPanel({ onAdd }) {
  const [category, setCategory] = useState("Job");
  const [name, setName] = useState("");
  const [income, setIncome] = useState("");
  const [growth, setGrowth] = useState("");
  const [stress, setStress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || income === "" || growth === "" || stress === "") {
      setError("Fill in every field before adding.");
      return;
    }
    const g = Number(growth);
    const s = Number(stress);
    if (g < 0 || g > 100 || s < 0 || s > 100) {
      setError("Growth and Stress must be between 0 and 100.");
      return;
    }

    setError("");
    onAdd({ category, name: name.trim(), income: Number(income), growth: g, stress: s });
    setName("");
    setIncome("");
    setGrowth("");
    setStress("");
  };

  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-4 text-lg font-bold text-paper">Add Option</h2>

      <div className="space-y-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-border bg-ink px-3.5 py-2.5 text-sm text-paper focus:border-accent"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Option Name"
          maxLength={60}
          className="w-full rounded-lg border border-border bg-ink px-3.5 py-2.5 text-sm text-paper placeholder:text-muted focus:border-accent"
        />

        <input
          type="number"
          min={0}
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Salary / Income"
          className="w-full rounded-lg border border-border bg-ink px-3.5 py-2.5 text-sm text-paper placeholder:text-muted focus:border-accent"
        />

        <input
          type="number"
          min={0}
          max={100}
          value={growth}
          onChange={(e) => setGrowth(e.target.value)}
          placeholder="Growth (0-100)"
          className="w-full rounded-lg border border-border bg-ink px-3.5 py-2.5 text-sm text-paper placeholder:text-muted focus:border-accent"
        />

        <input
          type="number"
          min={0}
          max={100}
          value={stress}
          onChange={(e) => setStress(e.target.value)}
          placeholder="Stress (0-100)"
          className="w-full rounded-lg border border-border bg-ink px-3.5 py-2.5 text-sm text-paper placeholder:text-muted focus:border-accent"
        />

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-cta-gradient py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Add Option
        </button>
      </div>
    </section>
  );
}
