export default function PrioritiesPanel({ priorities, onChange }) {
  const update = (key, value) => onChange({ ...priorities, [key]: Number(value) });

  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-5 text-lg font-bold text-paper">Set Priorities</h2>

      <div className="space-y-6">
        <label className="block">
          <span className="mb-2 block text-sm text-paper">
            💰 Income Importance: {priorities.income}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={priorities.income}
            onChange={(e) => update("income", e.target.value)}
            className="w-full"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-paper">
            📈 Growth Importance: {priorities.growth}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={priorities.growth}
            onChange={(e) => update("growth", e.target.value)}
            className="w-full"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-paper">
            😰 Stress Importance: {priorities.stress}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={priorities.stress}
            onChange={(e) => update("stress", e.target.value)}
            className="w-full"
          />
        </label>
      </div>
    </section>
  );
}
