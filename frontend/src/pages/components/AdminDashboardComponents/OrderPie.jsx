import { Pie } from "react-chartjs-2";
import { useEffect } from "react";
import { useOrder } from "../../../store/useOrder.js";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderPie = () => {
  const { incomeChart, fetchIncomeChart } = useOrder();

  useEffect(() => {
    fetchIncomeChart();
  }, []);

  const labels = incomeChart.map(
    (item) => `${item._id.year}-${String(item._id.month).padStart(2, "0")}`
  );

  const values = incomeChart.map((item) => item.totalIncome);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: values,
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#a855f7",
        ],
        
      },
    ],
  };

  return (
    <div className="bg-base-200 p-2 rounded-2xl shadow w-95 h-95">
      <h2 className="text-lg font-bold text-center">Income Last 3 Months</h2>
      <div className="h-80 w-80 items-center">
      <Pie data={data} />
      </div>
    </div>
  );
};

export default OrderPie;
