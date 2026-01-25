"use client";

interface EmptySlateProps {
  title: string;
  subtitle?: string;
}

const EmptySlate: React.FC<EmptySlateProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-500 text-lg">{subtitle}</p>}
    </div>
  );
};

export default EmptySlate;