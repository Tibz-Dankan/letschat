import React, { Fragment } from "react";
import ReactModal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
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
    width: "60%",
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: " 0.1rem solid hsl(210, 10.8%, 14.5%)",
    backgroundColor: "hsl(210, 10.8%, 14.5%)",
    boxShadow: "0rem 0rem 0.2rem 0.2rem hsla(0, 0%, 0%, 0.15)",
  },
};

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
          ariaHideApp={false}
        >
          <span onClick={closeModal} className={styles["modal__close"]}>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FaWindowClose />
            </IconContext.Provider>
          </span>
          <div className={styles["modal__content"]}>{props.children}</div>
        </ReactModal>
      </div>
    </Fragment>
  );
};

export default Modal;
