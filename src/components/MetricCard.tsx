import React, { ReactNode } from 'react';
type Props = { title: string | ReactNode; value: string | number };

const MetricCard = ({ title, value }: Props) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg transition-all hover:shadow-2xl hover:scale-105">
      <h3 className="text-sm text-gray-500 mb-4">{title}</h3>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  );
};

export default MetricCard;
