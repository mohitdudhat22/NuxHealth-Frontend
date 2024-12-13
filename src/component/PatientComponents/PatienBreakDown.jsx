import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import apiService from "../../services/api";
import toast from "react-hot-toast";

export default function PatientsBreakdown() {
  const [data, setData] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [error, setError] = useState(null);

  const fetchPatientData = async () => {
    try {
      const response = await apiService.GetAllPatients();
      let oldPatientsCount = 0;
      let newPatientsCount = 0;
      const currentDate = new Date();

      response.data.data.forEach((patient) => {
        const registrationDate = new Date(patient.createdAt);
        if (registrationDate > currentDate) {
          newPatientsCount++;
        } else {
          oldPatientsCount++;
        }
      });

      const formattedData = [
        { name: "Old Patients", value: oldPatientsCount, color: "#6CD68C" },
        { name: "New Patients", value: newPatientsCount, color: "#F5A623" },
      ];

      setData(formattedData);
      setTotalPatients(oldPatientsCount + newPatientsCount);
    } catch (error) {
      setError("Failed to fetch patient data.");
      toast.error("Failed to fetch patient data.");
      throw error;
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  return (
    <div className="bg-white w-[42%] rounded-lg p-5">
      <div className="head">
        <p className="new-xxl:text-[26px] new-xl:text-[24px] new-lg:text-[22px] font-bold">Patients Summary</p>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="bg-[#F6F8FB] rounded-lg flex justify-center items-center mt-5">
        <div className="new-xxl:w-[203px] new-xxl:h-[203px] new-xl:w-[180px] new-xl:h-[180px] new-lg:w-[160px] new-lg:h-[200px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
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
                {data.map((entry, index) => (
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
        </div>
        <div className="me-4 bg-white new-xxl:w-[40%] new-xl:w-[50%] new-lg:w-[%] p-5 rounded-lg">
          <div className="flex flex-col items-start">
            <div className="flex justify-between  items-center mb-2 gap-x-2 w-[100%]">
              <div className="w-[10px] h-[10px] mr-2 rounded-full bg-orange-500"></div>
              <span className="text-[18px] font-semibold text-[#4F4F4F]">
                New Patients
              </span>
              <span className="ml-auto text-orange-500 font-semibold text-[18px]">
                {data[1]?.value || 0}
              </span>
            </div>
            <div className="flex justify-between  items-center mb-2 gap-x-2 w-[100%]">
              <div className="w-[10px] h-[10px] mr-2 rounded-full bg-green-500"></div>
              <span className="text-[18px] font-semibold text-[#4F4F4F]">
                Old Patients
              </span>
              <span className="ml-auto text-green-500 font-semibold text-[18px]">
                {data[0]?.value || 0}
              </span>
            </div>
            <div className="flex justify-between  items-center mb-2 gap-x-2 w-[100%]">
              <div className="w-[10px] h-[10px] mr-2 rounded-full bg-blue-500"></div>
              <span className="text-[18px] font-semibold text-[#4F4F4F]">
                Total Patients
              </span>
              <span className="ml-auto text-blue-500 font-semibold text-[18px]">
                {totalPatients}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
