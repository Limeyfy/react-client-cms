import React from 'react';
import ErrorMessage from './components/ErrorMessage';

interface LabelContainerProps {
    label: string;
    children: React.ReactNode;
    error: any;
}

const LabelContainer: React.FC<LabelContainerProps> = ({
    label,
    children,
    error,
}) => (
    <div className="flex flex-col gap-y-2">
        <label className="text-sm font-semibold">{label}</label>
        {children}
        {error && <ErrorMessage error={error} />}
    </div>
);

export default LabelContainer;
