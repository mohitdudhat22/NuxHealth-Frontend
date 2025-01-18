import React from "react";
import { NHCard } from "..";
import { Empty, Spin } from "antd";

export const DepartmentCard = ({
  title,
  departments,
  icon,
  image,
  discrition,
  type = "patient",
}) => {
  if (!departments) {
    return (
      <NHCard title={title}>
        <div className="flex items-center justify-center h-[350px]">
          <Spin size="large" />
        </div>
      </NHCard>
    );
  }
  return (
    <NHCard title={title}>
      {departments?.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <Empty
            image={image}
            className="h-full"
            imageStyle={{ height: "100%" }}
            description={discrition}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {departments?.map((dept) => (
            <div key={dept.key} className="flex justify-between items-center">
              <span className="text-gray-700">{dept.name}</span>
              <div className="w-[60px] bg-[#F6F8FB] rounded-2xl flex items-center justify-center p-2 gap-x-2">
                <div className="w-8 h-8 flex items-center justify-center ">
                  {icon}
                </div>
                <div className="">{dept.count}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </NHCard>
  );
};
