import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../lib/axios";
import { useCart } from "../../store/useCart";


export default function PurchaseSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const { clearCart } = useCart();

  
 
   

   useEffect(() => {

     if (!sessionId) return;
  const confirmOrder = async () => {
    await axiosInstance.post("/api/order/checkout-success", { sessionId });
    clearCart();
  };

  confirmOrder();
}, [sessionId]);
 

  return <div className="p-6">Payment success ✅</div>;
}
