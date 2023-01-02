import React, { Fragment } from "react";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { IconContext } from "react-icons";
import styles from "./Modal.module.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#yourAppElement");

const Modal = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <div className={styles["modal"]}>
        <button onClick={openModal} className={styles["modal__open"]}>
          {props.open}
        </button>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className={styles["modal__content"]}>
            <span
              onClick={closeModal}
              className={styles["modal__content__close"]}
            >
              <IconContext.Provider value={{ size: "2rem" }}>
                <IoMdClose />
              </IconContext.Provider>
            </span>
            {props.children}
          </div>
        </ReactModal>
      </div>
    </Fragment>
  );
};

export default Modal;
