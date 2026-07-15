import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const barColors = ["#22C55E", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"];

export default function ResultsPanel({ scored, onRemove }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-4 text-lg font-bold text-paper">Results</h2>

      {scored.length === 0 ? (
        <p className="text-sm text-muted">👍 Add options to see best decision</p>
      ) : (
        <>
          <h3 className="mb-2 text-sm font-semibold text-paper">All Options</h3>
          <ul className="mb-6 space-y-2">
            {scored.map((option, i) => (
              <li
                key={option._id}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${
                  i === 0 ? "border-good/50 bg-good/10" : "border-border bg-ink"
                }`}
              >
                <span className="text-paper">
                  {i === 0 && "🏆 "}
                  {option.name}
                  <span className="ml-1.5 text-xs text-muted">({option.category})</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-semibold text-accent-soft">{option.score}</span>
                  <button
                    onClick={() => onRemove(option._id)}
                    aria-label={`Remove ${option.name}`}
                    className="text-muted hover:text-red-400"
                  >
                    ✕
                  </button>
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mb-2 text-sm font-semibold text-paper">Score Chart 📊</h3>
          <div className="h-56 w-full rounded-xl border border-border p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scored} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: "#8996AC", fontSize: 11 }} axisLine={{ stroke: "#243147" }} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#8996AC", fontSize: 11 }} axisLine={{ stroke: "#243147" }} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(59,130,246,0.08)" }}
                  contentStyle={{ background: "#151E2E", border: "1px solid #243147", borderRadius: 8 }}
                  labelStyle={{ color: "#F8FAFC" }}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {scored.map((entry, i) => (
                    <Cell key={entry._id} fill={barColors[i % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </section>
  );
}
