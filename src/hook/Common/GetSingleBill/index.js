import { getbillbyNo } from "@/axiosApi/ApiHelper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const useGetSingleBill = () => {
    const { billId } = useParams();
    const [data, setData] = useState(null);
  
    const fetchBillData = async () => {
      const response = await getbillbyNo(billId);
      console.log(response.data)
      setData(response.data);
    };  
    useEffect(() => {
      fetchBillData();
    }, [billId]);
  return { data };
};