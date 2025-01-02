import React from 'react'

export const useManageView = (id) => {
    const [data, setData] = useState([]);
    useEffect(() => {
         const fetchData = async () => {
           try {
             const response = await cancelAppointmentForPatient();
             console.log("API Response:", resptonse);
     
             if (response && response?.data) {
               setData(response?.data);
               console.log(response.data.appointments);
             }
           }  catch (error) {
            console.log(error);
          }
         };
     
         fetchData();
       },[]);
       return {data};
}
