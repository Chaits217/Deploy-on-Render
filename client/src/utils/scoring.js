// Income is a raw number (salary), while growth and stress are already 0-100,
// so income gets min-max normalized against the other options on the table
// before the weighted blend — otherwise a $60,000 salary would swamp a
// 0-100 growth score in the math.
export function computeScores(options, priorities) {
  if (!options.length) return [];

  const incomes = options.map((o) => o.income);
  const min = Math.min(...incomes);
  const max = Math.max(...incomes);

  const totalWeight = priorities.income + priorities.growth + priorities.stress || 1;

  const scored = options.map((option) => {
    const incomeScore = max === min ? 100 : ((option.income - min) / (max - min)) * 100;
    const stressScore = 100 - option.stress; // lower stress is better

    const weighted =
      (incomeScore * priorities.income +
        option.growth * priorities.growth +
        stressScore * priorities.stress) /
      totalWeight;

    return { ...option, score: Math.round(weighted * 10) / 10 };
  });

  return scored.sort((a, b) => b.score - a.score);
}
