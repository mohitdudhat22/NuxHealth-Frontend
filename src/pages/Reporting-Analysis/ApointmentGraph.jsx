import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import classNames from "classnames";
import { useGlobal } from "../../hooks/useGlobal.jsx";

const AppointmentGraph = () => {
  const [activeTab, setActiveTab] = useState("Year");
  const { cardData } = useGlobal();

  // Get current month index (0 for January, 11 for December)
  const currentMonth = new Date().getMonth();

  // Extracting yearly and monthly data from cardData
  const finalYearlyData = cardData?.finalYearlyData ?? [];
  const finalMonthlyData = [cardData?.monthlyData];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="new-xxl:text-[24px] new-xl:text-[22px] new-lg:text-[18px] font-bold">Appointment Statistics</h2>
        <div className="flex space-x-2">
          <button
            className={classNames(
              "px-4 py-2 rounded-lg",
              activeTab === "Year"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600",
            )}
            onClick={() => handleTabChange("Year")}
          >
            Year
          </button>
          <button
            className={classNames(
              "px-4 py-2 rounded-lg",
              activeTab === "Month"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600",
            )}
            onClick={() => handleTabChange("Month")}
          >
            Month
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={activeTab === "Year" ? finalYearlyData : finalMonthlyData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="onlineConsultation"
            fill="#1E90FF"
            name="Online Consultation"
          />
          <Bar
            dataKey="otherAppointment"
            fill="#00BFFF"
            name="Other Appointment"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppointmentGraph;
