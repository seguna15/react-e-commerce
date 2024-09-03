import { useEffect, useState } from 'react'
import { apiClient } from '../../api'
import { toast } from 'react-toastify';


const useFetchCoupon = (code) => {
  //---form data---
  const [formData, setFormData] = useState(null);
 
  const getCoupon = async (code) => {
    try {
      const {
        data: { coupon },
      } = await apiClient.get(`coupons/single?code=${code}`);
      setFormData({
        code: coupon?.code,
        discount: coupon?.discount,
        id: coupon?._id,
      });
      
      
    } catch (error) {
      
      toast.error(error?.response?.data?.message,{
        "position": "top-center",
      })
    }
  };

  useEffect(() => {
    getCoupon(code);

    
  }, [code]);

  return {
    formData,
    setFormData,
  };
}

export default useFetchCoupon;