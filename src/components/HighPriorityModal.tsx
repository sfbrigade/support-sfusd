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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      className="absolute left-1/2 top-1/2 w-4/6 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-5 shadow-lg sm:w-2/5"
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl text-[#989898] sm:text-2xl">
            High Priority Definition
          </h1>
          <button
            className="close-button ml-auto self-start text-4xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <hr className="border-t-2" />
        <p className="max-sm:text-sm">
          This is placeholder text on how we are defining High Priority. This is
          a breaf description of what the definition means and how it applies to
          schools
        </p>
        <a
          href="https://sfedfund.org/where-we-work/"
          target="_blank"
          className="text-[#3A86FF] hover:underline max-sm:text-sm"
        >
          This is a link to the EdFund&apos;s definiton.
        </a>
      </div>
    </Modal>
  );
};

export default HighPriorityModal;
