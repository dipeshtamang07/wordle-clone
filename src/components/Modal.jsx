import React from "react";
import { motion } from "framer-motion";
// import { IoClose } from "react-icons/io5";

const dropIn = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: "0",
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
    y: "100vh",
  },
};

function Backdrop({ children }) {
    return (
      <motion.div
          className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
      >
          {children}
      </motion.div>
    )
  }

function Modal({ children, handleClose }) {
  return (
    <Backdrop>
      <motion.div
        className="w-[22rem] rounded-lg p-8 bg-white relative border-2 border-black"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button className="absolute top-0 right-0 m-2" onClick={handleClose}>
            <IoClose size={25} />
        </button> */}
        {children}
      </motion.div>
    </Backdrop>
  );
}

export default Modal;
