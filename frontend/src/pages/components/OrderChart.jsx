import { useEffect } from "react";
import { useOrder } from "../../store/useOrder.js";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderChart = () => {
  const { ordersPerMonth, fetchOrderChart } = useOrder();

  useEffect(() => {
    fetchOrderChart();
  }, []);

  const labels = ordersPerMonth.map((m) => m.month);
  const values = ordersPerMonth.map((m) => m.count);

  const data = {
    labels,
    datasets: [
      {
        label: "Orders per Month",
        data: values,
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        
      },
    ],
  };

  return (
    <div className="bg-base-200 rounded-2xl p-4 shadow h-64 w-125">
      <Bar data={data} />
    </div>
  );
};

export default OrderChart;
