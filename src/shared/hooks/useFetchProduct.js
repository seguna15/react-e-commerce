import { useEffect, useState } from 'react'
import { apiClient } from '../../api'


const useFetchProduct = (id) => {
  //---form data---
  const [formData, setFormData] = useState(null);
 
  const getProduct = async (id) => {
    try {
      const {
        data: { product },
      } = await apiClient.get(`products/${id}`);
      setFormData({
        name: product?.name,
        description: product?.description,
        category: "",
        sizes: "",
        brand: "",
        colors: product?.colors,
        price: product?.price,
        totalQty: product?.totalQty,
      });
      
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    getProduct(id);

    
  }, [id]);

  return {
    formData,
    setFormData,
  };
}

export default useFetchProduct;