import { useEffect, useState } from 'react';

export function RemainingTime({
  totalMinutes,
  contentSelector = '#article-body',
}: {
  totalMinutes: number;
  contentSelector?: string;
}) {
  const [label, setLabel] = useState(`${totalMinutes} min read`);

  useEffect(() => {
    const root = document.querySelector(contentSelector);
    if (!(root instanceof HTMLElement)) return;

    const update = () => {
      const rect = root.getBoundingClientRect();
      const total = Math.max(root.scrollHeight - window.innerHeight, 1);
      const traveled = Math.min(Math.max(-rect.top, 0), total);
      const ratio = traveled / total;
      if (ratio < 0.03) {
        setLabel(`${totalMinutes} min read`);
        return;
      }
      if (ratio > 0.9) {
        setLabel('Almost done');
        return;
      }
      const left = Math.max(1, Math.ceil(totalMinutes * (1 - ratio)));
      setLabel(`~${left} min left`);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [contentSelector, totalMinutes]);

  return <span className="remaining-time">{label}</span>;
}
