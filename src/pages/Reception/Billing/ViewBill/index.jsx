import { ReceptionistSingleBill } from '@/axiosApi/ApiHelper';
import { BillOne } from '@/components'
import { Loading } from '@/imports';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ViewBill = () => {
  let { id } = useParams();
  const [loading, setLoading] = useState()
  const [bill, setBill] = useState()

  useEffect(() => {
    const fetchBill = async () => {
      setLoading(true);
      const response = await ReceptionistSingleBill(id);
      if (response.data) {
        setBill(response.data);
        console.log(response.data)
      }
      setLoading(false);
    };

    fetchBill();
  }, [id]);


  if (loading) {
    return <Loading />;
  }

  if (!bill) {
    return <div>No bill found</div>;
  }

  return (
    <BillOne billData={bill} />
  )
}
