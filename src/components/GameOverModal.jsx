import { AnimatePresence } from "framer-motion";
import React from "react";
import Modal from "./Modal";

const GameOverModal = ({ selectedWord, onPlayAgain}) => {
  return (
    <AnimatePresence initial={false}>
        <Modal allowManualClose={false}>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4 dark:text-white">Better Luck next time!</h1>
            <p className="text-xl font-light mb-4 dark:text-white">The word was:</p>
            <ul className="flex gap-2 items-center justify-center mb-6">
              {selectedWord.split("").map((letter, index) => (
                <li
                  className="flex items-center justify-center w-10 h-10 p-4 text-2xl font-extrabold border border-black text-black dark:border-white dark:text-white uppercase"
                  key={index}
                >
                  {letter}
                </li>
              ))}
            </ul>

            <button
              className="py-2 px-4 rounded-lg border-2 border-black dark:border-white dark:text-white"
              onClick={onPlayAgain}
            >
              Play Again
            </button>
          </div>
        </Modal>
    </AnimatePresence>
  );
};

export default GameOverModal;
