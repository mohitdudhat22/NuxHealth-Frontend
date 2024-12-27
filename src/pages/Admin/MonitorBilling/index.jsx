
import { NHButton, NHCard, NHInput, NHTable } from "@/components"
import Icons from "@/constants/icons"
import { useBillingAndPayments } from "@/hook/Admin/BillingAndPayments/Monitor Billing"


export const MonitorBilling = () => {
  const {
    bills,
    loading,
    defaultColumns,
    defaultData,
    navigate
  } = useBillingAndPayments();
  console.log(bills,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> from billing page")
  return (
    <>
      <NHCard title={"Monitor Billing"} headerContent={
        <div className="flex items-center gap-md">
          <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
          <NHButton variant="default" className="bg-white border-primary" onClick={() => navigate("edit-invoice")}>{Icons.EditBillIcon}Edit Invoice Theme</NHButton>
          <NHButton variant="primary" onClick={() => navigate("create-bill")}>Create Bills</NHButton>
        </div>
      }>
        <NHTable tableColumn={defaultColumns} tableDataSource={defaultData} />
      </NHCard >
    </>

  )
}