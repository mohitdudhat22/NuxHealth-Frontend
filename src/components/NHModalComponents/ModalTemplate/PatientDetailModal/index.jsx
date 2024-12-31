import { NHModal, PrescriptionCard } from "@/components/";
import Icons from "@/constants/icons";
import { Tag } from "antd";

export const PatientDetailModal = ({
  handleOk,
  onCancel,
  handleClose,
  Title,
  loading = false,
  isModalOpen,
  patientData,
  ...rest
}) => {
  return (
    <NHModal
      title={
        <div className="flex items-center justify-between">
          <h3>{Title}</h3>
          <button
            onClick={onCancel}
            className="hover:opacity-80"
          >
            {Icons.CloseCircle}
          </button>
        </div>
      }
      open={isModalOpen}
      onCancel={onCancel}
      handleClose={handleClose}
      footer={null}
      width={700}
      className="patient-details-modal"
      {...rest}
    >

      <PrescriptionCard />

    </NHModal>
  );
};
