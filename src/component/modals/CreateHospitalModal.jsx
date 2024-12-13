import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CreateHospitalForm from "../forms/CreateHospitalForm";
import PropTypes from "prop-types";

const CreateHospitalModal = ({ openCreateHospital, handleClose }) => {
  return (
    <Dialog open={openCreateHospital} onClose={handleClose}>
      <DialogTitle>Create a New Hospital</DialogTitle>
      <DialogContent>
        <CreateHospitalForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

CreateHospitalModal.propTypes = {
  openCreateHospital: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CreateHospitalModal;
