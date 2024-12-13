import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import classNames from "classnames";
import { useGlobal } from "../../hooks/useGlobal.jsx";

const PatientSummary = () => {
  const [activeTab, setActiveTab] = useState("Week");
  const { cardData } = useGlobal();
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const chartData =
    activeTab === "Week" ? cardData?.weeklyPatients : cardData?.dailyPatients;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="new-xxl:text-[24px] new-xl:text-[22px] new-lg:text-[18px] font-bold ">Patients Summary</h2>
        <div className="flex space-x-2">
          <button
            className={classNames(
              "px-4 py-2 rounded-lg",
              activeTab === "Week"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600",
            )}
            onClick={() => handleTabChange("Week")}
          >
            Week
          </button>
          <button
            className={classNames(
              "px-4 py-2 rounded-lg",
              activeTab === "Day"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600",
            )}
            onClick={() => handleTabChange("Day")}
          >
            Day
          </button>
        </div>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={activeTab === "Week" ? "day" : "hour"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="newPatient"
            stroke="#FFA500"
            activeDot={{ r: 8 }}
            name="New Patient"
          />
          <Line
            type="monotone"
            dataKey="oldPatient"
            stroke="#1E90FF"
            name="Old Patient"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientSummary;
