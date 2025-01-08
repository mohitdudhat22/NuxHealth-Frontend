import { Space, Tag } from "antd";
import { NHButton, NHCard, NHHead, NHInput, NHTable } from "@/components";
import Icons from "@/constants/icons";
import { useNavigate } from "react-router-dom";
import { useRecaptionBillingAndPayments } from "@/hook";

export const Bills = () => {
    const { loading, dataClaims, dataPendingBills, onSearch } = useRecaptionBillingAndPayments();
    const navigate = useNavigate();

    const columns = [
        {
            title: "Bill Number",
            dataIndex: "billNumber",
            key: "billNumber",
        },
        {
            title: "Patient Name",
            dataIndex: "patientName",
            key: "patientName",

        },
        {
            title: "Disease Name",
            dataIndex: "diseaseName",
            key: "diseaseName",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Paid" ? "green" : "red"}>{status}</Tag>
            ),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <NHButton
                        type="primary"
                        size="small"
                        icon={Icons.View}
                        className="bg-white view-btn border-primary"
                        onClick={() =>
                            navigate(`/reception/bill-view/${record.billNumber}`)
                        }
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <NHHead />
            <NHCard
                title="Billing and Payments"
                headerContent={
                    <>
                        <NHInput
                            prefix={Icons.SearchIcon}
                            placeholder="Search"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                        <NHButton
                            variant="default"
                            className="bg-white border-primary"
                            onClick={() => navigate("edit-design-invoice")}
                        >
                            {Icons.EditBillIcon} Edit Invoice Theme
                        </NHButton>
                        <NHButton
                            icon={Icons.PlusSquare}
                            onClick={() => navigate("/admin/monitor-billing/create-bill")}
                            variant="primary"
                        >
                            Create Bill
                        </NHButton>
                    </>
                }
            >
                <NHTable
                    loading={loading}
                    tableColumn={columns}
                    tableDataSource={dataPendingBills} // Or use dataClaims, depending on what you're rendering
                    showPagination={true}
                />
            </NHCard>
        </>
    );
};
