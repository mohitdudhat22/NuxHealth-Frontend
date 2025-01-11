import { DeleteModal, NHButton, NHModal } from "@/components";
import { useState } from "react";

export const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  return (
    <>
      <div>
        <NHButton onClick={() => setIsModalOpen(true)}>
          Open Modal Button
        </NHButton>
        <NHModal
          title={"Testing"}
          open={isModalOpen}
          closeIcon={true}
          handleOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          handleClose={() => setIsModalOpen(false)}
          IsFooter
          handleContent={"Apply"}
        >
          <h2>This Is The Demo Modal</h2>
        </NHModal>
      </div>
      <div>
        <NHButton onClick={() => setIsSuccessOpen(true)}>
          Open Delete Number Modal
        </NHButton>
        <DeleteModal
          Title={"Delete Number?"}
          isModalOpen={isSuccessOpen}
          handleClose={() => setIsSuccessOpen(false)}
        >
          Are you sure you want to delate this complain?
        </DeleteModal>
      </div>
    </>
  );
};
