import React from "react";
import Modal from "react-modal";

type ModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "100",
  },
};

const HighPriorityModal: React.FC<ModalProps> = ({ onClose, isOpen }) => {
  Modal.setAppElement("body");
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      className="absolute left-1/2 top-1/2 w-4/6 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-5 shadow-lg sm:w-2/5"
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <p className="max-sm:text-sm">
            We are following the{" "}
            <a
              href="https://sfedfund.org/who-we-serve"
              target="_blank"
              className="text-[#3A86FF] hover:underline max-sm:text-sm"
            >
              SF Ed Fund&apos;s
            </a>{" "}
            definition of priority schools.
          </p>
          <button
            className="close-button ml-auto self-start text-4xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default HighPriorityModal;
