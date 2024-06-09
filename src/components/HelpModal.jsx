import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";

const HelpModal = ({ onClose }) => {
  return (
    <AnimatePresence initial={false}>
      <Modal handleClose={onClose} className="w-[21rem] md:w-[30rem] dark:text-white">
        <h1 className="text-3xl md:text-4xl font-karnak mb-2">How to play?</h1>
        <p className="text-2xl md:text-3xl mb-4 font-light">Guess the Wordle in 6 tries.</p>
        <ul className="list-disc mb-4">
          <li>Each guess must be a valid 5-letter word.</li>
          <li>
            The color of the tiles will change to show how close your guess was
            to the word.
          </li>
        </ul>
        <p className="mb-2">
          <strong>Examples</strong>
        </p>

        {/* Example 1 */}
        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold text-white bg-[#6AAA64]">
              H
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              E
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              L
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              L
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              O
            </div>
          </div>
          <p>
            <strong>H</strong> is in the word and in the correct spot.
          </p>
        </div>

        {/* Example 2 */}
        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              W
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold text-white bg-[#C9B458]">
              O
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              R
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              L
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              D
            </div>
          </div>
          <p>
            <strong>O</strong> is in the word but in the wrong spot.
          </p>
        </div>

        {/* Example 3 */}
        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              R
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              E
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              A
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold text-white bg-[#787C7E]">
              C
            </div>
            <div className="w-10 h-10 grid place-items-center text-3xl font-extrabold border-2 border-gray-500">
              T
            </div>
          </div>
          <p>
            <strong>C</strong> is not in the word in any spot.
          </p>
        </div>
      </Modal>
    </AnimatePresence>
  );
};

export default HelpModal;
