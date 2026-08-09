import React, { ReactNode } from 'react';

interface SummaryBoxProps {
  title?: string;
  children: ReactNode;
}

export default function SummaryBox({ title = 'خلاصة الدرس 📌', children }: SummaryBoxProps) {
  return (
    <div className="summary-box">
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}
