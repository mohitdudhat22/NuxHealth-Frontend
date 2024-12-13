import { FaDotCircle } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useGlobal } from "../../hooks/useGlobal.jsx";

const PatientsAge = () => {
  const { cardData } = useGlobal();
  return (
    <div className="PatientsAge-data w-1/3 new-xxl:h-[350px] new-xl:h-[350px] p-[10px]">
      <div className="content bg-white p-5 rounded-lg new-xxl:h-[100%] new-xl:h-[100%]">
        <div className="head">
          <div className="title">
            <p className="new-xxl:text-[24px] new-xl:text-[22px] new-lg:text-[18px] font-bold text-[#030229] border-b border-[#F4F4F4] pb-3">
              Patients Age
            </p>
          </div>
        </div>
        <div className="Summary-status flex pt-2">
          <div className="Patients-data flex w-1/2 bg-[#F6F8FB] new-xl:h-[240px] rounded-2xl items-center new-xxl:px-5 new-xl:px-0 justify-between">
            {cardData?.ageRangePercentage?.length > 0 ? ( // Check if data is not empty
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={cardData?.ageRangePercentage}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={5}
                    cornerRadius={10}
                  >
                    {cardData?.ageRangePercentage?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={index === 1 ? "#FFFF" : "none"}
                        strokeWidth={index === 1 ? 3 : 0}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-gray-500">No data available</div> // Placeholder if no data
            )}
          </div>
          <div className="details w-1/2 mt-3 new-xl:h-[218px] new-lg:h-[215px]">
            <div className="content bg-white rounded-2xl p-2">
              <ul>
                {cardData?.ageRangePercentage?.map((item, index) => (
                  <li
                    key={index}
                    className="age-group flex items-center new-xxl:gap-4 new-xl:gap-0 new-lg:gap-0 pb-3 new-xxl:text-[15px] new-xl:text-[12px] new-lg:text-[10px] font-semibold text-[#4F4F4F]"
                  >
                    <FaDotCircle color={item.color} />
                    <span className="new-xxl:mx-4 new-lg:mx-1">{item.name}</span>
                    <span>
                      {cardData?.totalPatientCount > 0
                        ? (
                            (item.value / cardData?.totalPatientCount) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsAge;
