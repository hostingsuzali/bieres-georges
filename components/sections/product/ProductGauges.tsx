"use client";

import { motion } from "framer-motion";

import { EASE } from "@/lib/motion";

type Gauge = {
  label: string;
  value: number;
  max: number;
  display: string;
};

type ProductGaugesProps = {
  abv: number;
  ibu: number;
  ebc: number;
};

export function ProductGauges({ abv, ibu, ebc }: ProductGaugesProps) {
  const gauges: Gauge[] = [
    { label: "Degré", value: abv, max: 12, display: `${abv}%` },
    { label: "Amertume", value: ibu, max: 5, display: `${ibu}/5` },
    { label: "Caractère", value: ebc, max: 5, display: `${ebc}/5` },
  ];

  return (
    <div className="grid grid-cols-3 gap-5">
      {gauges.map((gauge, index) => {
        const ratio = Math.min(gauge.value / gauge.max, 1);
        return (
          <div key={gauge.label}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="eyebrow text-cream/60">{gauge.label}</span>
              <span className="font-display text-sm font-bold text-orange">
                {gauge.display}
              </span>
            </div>
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-cream/12">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: ratio }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.5 + index * 0.08 }}
                style={{ transformOrigin: "left" }}
                className="h-full rounded-full bg-orange"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
