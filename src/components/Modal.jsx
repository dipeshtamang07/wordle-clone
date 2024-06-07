import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { cn } from "../lib";

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

function Backdrop({ children, handleClose }) {
  return (
    <motion.div
      className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      {children}
    </motion.div>
  );
}

function Modal({
  children,
  className = "",
  handleClose = () => {},
  allowManualClose = true,
}) {
  return (
    <Backdrop handleClose={handleClose}>
      <motion.div
        className={cn(
          "w-[20rem] md:w-[24rem] rounded-lg p-8 bg-white relative border-2 border-black",
          className
        )}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {allowManualClose && (
          <button className="absolute top-0 right-0 m-2" onClick={handleClose}>
            <IoClose size={25} />
          </button>
        )}
        {children}
      </motion.div>
    </Backdrop>
  );
}

export default Modal;
