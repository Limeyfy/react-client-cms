import React from 'react';

interface LabelContainerProps {
  label: string;
  children: React.ReactNode;
}

const LabelContainer: React.FC<LabelContainerProps> = ({ label, children }) => (
  <div className="flex flex-col gap-y-2">
    <label className="text-sm font-semibold">{label}</label>
    {children}
  </div>
);

export default LabelContainer;
