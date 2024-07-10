import { IoMenu } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdWbSunny } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import HelpModal from "./HelpModal";
import { useState } from "react";
import { useTheme } from "../providers/ThemeProvider";

const Navbar = () => {
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const toggleHelpModal = () => setHelpModalOpen((prev) => !prev);

  const { theme, setTheme } = useTheme();

  return (
    <>
      <header className="py-2 px-4 md:px-8 flex justify-between items-center border-b dark:border-gray-800">
        <div className="w-20">
          <button aria-label="Hamburger Menu Icon" className="dark:text-white">
            <IoMenu size={32} />
          </button>
        </div>
        <h1 className="w-full md:text-center font-karnak text-black dark:text-white text-[2em] md:text-[2.5em] font-extrabold">
          Wordle
        </h1>
        <menu className="w-20 flex items-center justify-end gap-4">
            <a href="https://github.com/dipeshtamang07/wordle-clone" target="_blank" className="dark:text-white">
              <FaGithub size={26} />
            </a>
            <button aria-label="Open Help Modal" onClick={toggleHelpModal} className="dark:text-white">
              <IoMdHelpCircleOutline size={32} />
            </button>
            <button
              aria-label="Mode Toggle"
              className="w-10 outline-0 dark:text-white"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              tabIndex={-1}
              onKeyDown={(e) => e.preventDefault() } // disable keyboard interation which interrupts the game
            >
              {theme === "dark" ? (
                <BsFillMoonStarsFill size={22} />
              ) : (
                <MdWbSunny size={26} />
              )}
            </button>
        </menu>
      </header>

      {helpModalOpen && <HelpModal onClose={() => setHelpModalOpen()} />}
    </>
  );
};

export default Navbar;
