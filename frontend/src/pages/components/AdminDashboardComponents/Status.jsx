import { useEffect } from "react";
import { useOrder } from "../../../store/useOrder";

const Status = () => {

  
 
  const { totalOrders, totalIncome, fetchOrderStats,totalIncomeToday,todayCountOrder} = useOrder();

  useEffect(() => {
    fetchOrderStats();
  }, []);


  

  return (
    
   <>
   <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>

      <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-200 w-full">

        {/* Total Orders */}
        <div className="stat">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value text-primary">
            {totalOrders}
          </div>
          
        </div>

        {/* Total Income */}
        <div className="stat">
          <div className="stat-title">Total Income</div>
          <div className="stat-value text-success">
            {`${totalIncome} €`}
          </div>
   
        </div>


             <div className="stat">
          <div className="stat-title">Total Income  Today</div>
          <div className="stat-value text-success">
            {`${totalIncomeToday} €`}
          </div>
   
        </div>

        
             <div className="stat">
          <div className="stat-title">Total Orders Today</div>
          <div className="stat-value text-success">
            {todayCountOrder}
          </div>
   
        </div>


      </div>
    </div>
   </>
  )
}

export default Status