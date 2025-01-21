import React from "react";
import { NHCard } from "@/components";
export const StatisticsCard = ({ title, count, icon }) => {
  return (
    <NHCard className="h-full align-middle">
      <div className="flex items-center gap-8">
        <div className="flex items-center justify-center w-[60px] h-[60px] md:w-[40px] md:h-[40px] text-blue-500">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-normal text-[#A7A7A7]">{title}</h3>
          <p className="text-4xl font-bold text-[#030229]">{count}</p>
        </div>
      </div>
    </NHCard>
  );
};
