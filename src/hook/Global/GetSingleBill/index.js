import { getbillbyNo } from "@/axiosApi/ApiHelper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const useGetSingleBill = () => {
  const { billId } = useParams();
  const [data, setData] = useState(null);

  const fetchBillData = async (role) => {
    const response = await getbillbyNo(billId,role);
    setData(response.data);
  };  

  useEffect(() => {
    const url = window.location.href;
    console.log(url)
    if (url.includes("reception")) {
      fetchBillData("receptionist");
    }else{
      fetchBillData("admin");
    }
  }, [billId]);
  return { data };
};