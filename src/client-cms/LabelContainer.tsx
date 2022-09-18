import React from 'react';

interface LabelContainerProps {
  label: string;
  children: React.ReactNode;
  show?: boolean;
}

const LabelContainer: React.FC<LabelContainerProps> = ({
  label,
  children,
  show = true,
}) =>
  show ? (
    <div className="flex flex-col gap-y-2">
      <label className="text-sm font-semibold">{label}</label>
      {children}
    </div>
  ) : (
    <>{children}</>
  );

export default LabelContainer;
