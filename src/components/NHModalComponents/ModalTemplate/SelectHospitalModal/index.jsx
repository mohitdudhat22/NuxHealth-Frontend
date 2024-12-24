import { useAddSociety } from "@/hook/Auth/AddSociety";
import clsx from "clsx";
import { NHInput, NHModal, } from "@/components/";
import styles from "./SelectSocietyModal.module.css";

export const SelectHospitalModal = ({ open, onCancel, handleClose }) => {
  const { handleSubmit, handleChange, formData, isFormValid } =
    useAddSociety(handleClose);

  return (
    <NHModal
      title="Hospital Name"
      IsFooter
      open={open}
      onCancel={onCancel}
      handleClose={handleClose}
      variant="primary"
      // Apply Button
      handleContent="Apply"
      handleOk={handleSubmit}
      disabledButton={!isFormValid}
    >
      <form onSubmit={handleSubmit}>
        <div className={clsx(styles.InputWrapper, "grid flex-col")}>
          <NHInput
            parentClassName={styles.colSpan}
            label="Hospital Name"
            placeholder="Enter Hospital Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <NHInput
            parentClassName={styles.colSpan}
            label="Hospital Address"
            placeholder="Enter Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <NHInput
            label="Country"
            placeholder="Enter Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <NHInput
            label="State"
            placeholder="Enter State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <NHInput
            label="City"
            placeholder="Enter City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <NHInput
            label="Zip Code"
            placeholder="Enter Zip Code"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
          <NHInput
            label="Emergency Contact"
            placeholder="Emergency Contact No"
            name="emergencyContactNo"
            value={formData.emergencyContactNo}
            onChange={handleChange}
            required
          />
          <NHInput
            label="WebSite link"
            placeholder="Enter WebSite link"
            name="worksiteLink"
            value={formData.worksiteLink}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </NHModal>
  );
};
