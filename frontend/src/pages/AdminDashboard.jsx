import OrderPie from "./components/AdminDashboardComponents/OrderPie.jsx";
import Status from "./components/AdminDashboardComponents/Status.jsx";
import OrderChart from "./components/OrderChart.jsx";

const AdminDashboard = () => {
   return (
   <>
   <Status/>
   <div className="flex gap-2">
   <OrderChart/>

   <OrderPie/>
   </div>
      </>
  );
}

export default AdminDashboard