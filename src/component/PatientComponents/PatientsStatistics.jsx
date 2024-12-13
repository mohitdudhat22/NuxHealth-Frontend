import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import apiService from "../../services/api";
import toast from "react-hot-toast";

const PatientsStatistics = () => {
  const [timePeriod, setTimePeriod] = useState("Year");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchPatientsData = async () => {
    try {
      const response = await apiService.GetAllPatients();
      const monthlyCounts = Array(12).fill(0);
      const currentDate = new Date();

      response.data.data.forEach((patient) => {
        const createdAt = new Date(patient.createdAt);
        const month = createdAt.getMonth(); // 0-11
        const year = createdAt.getFullYear();

        if (timePeriod === "Year" && year === currentDate.getFullYear()) {
          monthlyCounts[month] += 1;
        } else if (
          timePeriod === "Month" &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          monthlyCounts[month] += 1;
        } else if (
          timePeriod === "Week" &&
          createdAt >= new Date(currentDate.setDate(currentDate.getDate() - 7))
        ) {
          monthlyCounts[month] += 1;
        }
      });

      const processedData = monthlyCounts.map((count, index) => ({
        month: index + 1,
        patients: count,
      }));

      setData(processedData);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch patient data", error);
      setError("Failed to fetch patient data.");
      toast.error("Failed to fetch patient data");
      throw error;
    }
  };

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
    fetchPatientsData();
  };

  useEffect(() => {
    fetchPatientsData();
  }, []);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div
      className="bg-white p-4 rounded-lg"
      style={{ width: "100%", marginTop: "0px", height: "390px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="new-xxl:text-[26px] new-xl:text-[24px] new-lg:text-[22px] pb-2 font-bold">Patients Statistics</h2>
        </div>
        <div
          className="button-group d-flex mb-2 shadow-sm rounded text-gray-500"
          style={{ position: "relative", backgroundColor: "transparent" }}
        >
          <button
            className=" mx-2 px-2 hover:bg-[#0EABEB] hover:text-white"
            onClick={() => handleTimePeriodChange("Year")}
          >
            Year
          </button>
          <button
            className=" btn-white px-2 py-2 hover:bg-[#0EABEB] hover:text-white"
            onClick={() => handleTimePeriodChange("Month")}
          >
            Month
          </button>
          <button
            className=" mx-2 px-2 me-3 hover:bg-[#0EABEB] hover:text-white"
            onClick={() => handleTimePeriodChange("Week")}
          >
            Week
          </button>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid vertical={false} stroke="#ccc" />
          <XAxis
            dataKey="month"
            ticks={
              timePeriod === "Year"
                ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                : timePeriod === "Month"
                  ? [new Date().getMonth() + 1]
                  : [1, 2, 3, 4, 5, 6, 7]
            }
            tickFormatter={(month) =>
              timePeriod === "Year"
                ? monthNames[month - 1]
                : timePeriod === "Month"
                  ? "Current Month"
                  : `Week ${month}`
            }
          />
          <YAxis
            domain={[0, "dataMax + 5"]}
            ticks={[0, 5, 10, 15, 20, 25, 30]}
          />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                return (
                  <div
                    className="grid px-2"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <span>Patients</span> <span>{payload[0].value}</span>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="patients"
            stroke="#8884d8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientsStatistics;
