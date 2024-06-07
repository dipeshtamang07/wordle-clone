import { IoMenu } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import HelpModal from "./HelpModal";
import { useState } from "react";

const Navbar = () => {
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const toggleHelpModal = () => setHelpModalOpen((prev) => !prev);

  return (
    <>
      <header className="py-2 px-4 md:px-8 flex justify-between items-center border-b">
        <button>
          <IoMenu size={32} />
        </button>
        <h1 className="font-karnak text-black text-[2em] md:text-[2.5em] font-extrabold">
          Wordle
        </h1>
        <ul>
          <li>
            <button onClick={toggleHelpModal}>
              <IoMdHelpCircleOutline size={32} />
            </button>
          </li>
        </ul>
      </header>

      {helpModalOpen && <HelpModal onClose={() => setHelpModalOpen()} />}
    </>
  );
};

export default Navbar;
