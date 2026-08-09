import React, { ReactNode } from 'react';

interface ExerciseBoxProps {
  title?: string;
  children: ReactNode;
}

export default function ExerciseBox({ title = 'تمرين عملي: جرب بنفسك 💻', children }: ExerciseBoxProps) {
  return (
    <div className="exercise-box">
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}
