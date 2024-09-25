import {  useSearchParams } from "react-router-dom";
import ThanksForOrdering from "../../../shared/components/ThanksForOrdering";
import { useEffect } from "react";
import { apiClient } from "../../../api";
import { toast } from "react-toastify";




export default function PayPalSuccess() {

  const [searchParams] = useSearchParams();
  const orderID = searchParams.get("token"); //

  const captureOrder = async (orderID) => {
    
    try {
      const response = await apiClient.post(
        `/orders/paypal/${orderID}/capture`
      );
      toast.success(response.data.message, {
        position: "top-center",
      });
      //return (window.location.href = "/");
    } catch (error) {
      toast.error(error.response.data.error);
      console.log("Error", error);
    }
  };

  useEffect(() => {
    captureOrder(orderID);
  }, [orderID, captureOrder]);

  return (
    <ThanksForOrdering/>
  );
}
