import React from "react";
import { NHCard } from "@/components";
export const StatisticsCard = ({ title, count, icon }) => {
  return (
    <NHCard className="h-full align-middle">
      <div className="flex items-center">
        <div className="text-blue-500 mr-9 w-14 h-14 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{count}</p>
        </div>
      </div>
    </NHCard>
  );
};
