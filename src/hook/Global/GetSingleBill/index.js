import { getbillbyNo } from "@/axiosApi/ApiHelper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const useGetSingleBill = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
  
    const fetchBillData = async () => {
      const response = await getbillbyNo(id);
      console.log(response.data)
      setData(response.data);
    };  
    useEffect(() => {
      fetchBillData();
    }, [id]);
  return { data };
};