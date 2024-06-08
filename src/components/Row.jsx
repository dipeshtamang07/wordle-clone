import { useEffect, memo } from "react";
import { useAnimate } from "framer-motion";
import { cn } from "../lib";

const Row = ({
  row,
  currentCellIndex,
  startSubmitAnimation,
  startRejectAnimation,
  startPopAnimation,
  onAnimationComplete,
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (startSubmitAnimation) {
      row.forEach((item, index) => {
        animate(
          `li:nth-child(${index + 1})`,
          {
            rotateX: [360, 0],
            backgroundColor: item.bg,
          },
          { delay: index * 0.3, duration: 1 }
        );
      });
    }
  }, [startSubmitAnimation]);

  useEffect(() => {
    if (startRejectAnimation) {
      animate(
        scope.current,
        {
          x: [20, -20, 20, -20, 0],
        },
        {
          duration: 0.2,
          type: "spring",
          stiffness: 1000,
          damping: 7,
          onComplete: () => onAnimationComplete(),
        }
      );
    }
  }, [startRejectAnimation]);

  useEffect(() => {
    if (startPopAnimation) {
      animate(
        `li:nth-child(${currentCellIndex})`,
        {
          scale: [1.2, 1],
        },
        {
          onComplete: () => onAnimationComplete(),
        }
      );
    }
  }, [startPopAnimation]);

  return (
    <ul className="flex gap-1.5" ref={scope}>
      {row.map((item, index) => {
        return (
          <li
            key={index}
            className={cn(
              "flex w-14 h-14 justify-center items-center border-gray-300 border-2 p-4 text-4xl font-extrabold uppercase",
              item.letter && "border-gray-600",
              item.bg === "#ffffff" ? "bg-white text-black" : "text-white border-0"
            )}
          >
            {item.letter}
          </li>
        );
      })}
    </ul>
  );
};

export default memo(Row);
