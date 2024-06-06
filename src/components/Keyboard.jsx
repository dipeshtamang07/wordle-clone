import { MdOutlineBackspace } from "react-icons/md";
import { cn } from "../lib";

const Key = ({ keyString, handleClick, bg }) => {
  if (keyString === "Backspace") {
    return (
      <button
        className="w-10 h-10 md:w-14 md:h-12 md:text-2xl bg-gray-200 rounded hover:bg-gray-300 flex justify-center items-center"
        onClick={() => handleClick(keyString)}
      >
        <MdOutlineBackspace />
      </button>
    );
  }

  return (
    <button
      className={cn(
        "w-[1.8rem] h-10 md:w-10 md:h-12 text-xl uppercase font-bold rounded hover:bg-gray-400",
        bg,
        bg === "bg-gray-300" ? "text-black" : "text-white",
        keyString === "Enter" && "text-xs w-14 md:text-sm md:w-14"
      )}
      onClick={() => handleClick(keyString)}
    >
      {keyString}
    </button>
  );
};

const Keyboard = ({ onKeyPress, keyColorMap }) => {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  const handleClick = (key) => {
    onKeyPress(key);
  };

  const getKeyBgColor = (key) => {
    key = key.toLowerCase();
    let bgColor = "bg-gray-300";
    
    if (keyColorMap.incorrect.includes(key)) {
      bgColor = "bg-[#787C7E]";
    }
    if (keyColorMap.almost.includes(key)) {
      bgColor = "bg-[#C9B458]";
    }
    if (keyColorMap.correct.includes(key)) {
      bgColor = "bg-[#6AAA64]";
    }

    return bgColor;
  }

  return (
    <div className="flex flex-col gap-2 mt-4 justify-center items-center">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 md:gap-2">
          {row.map((key) => (
            <Key key={key} keyString={key} handleClick={handleClick} bg={getKeyBgColor(key)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
