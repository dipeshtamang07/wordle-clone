import { useCallback, useEffect, useState } from "react";
import { getLetterCount, isAlphabetic } from "./utils";
import Navbar from "./components/Navbar";
import Row from "./components/Row";
import Keyboard from "./components/Keyboard";
import GameWonModal from "./components/GameWonModal";
import GameOverModal from "./components/GameOverModal";
import { confettiConfig } from "./constants/confetti.config";
import Confetti from "react-dom-confetti";

const defaultBoard = new Array(6).fill(
  new Array(5).fill({ letter: null, bg: "#ffffff" })
);

const App = () => {
  const [wordBank, setWordBank] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState("react");
  const [board, setBoard] = useState(defaultBoard);
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [currentCellIndex, setCurrentCellIndex] = useState(0);
  const [keyColorMap, setKeyColorMap] = useState({
    correct: [],
    incorrect: [],
    almost: [],
  });
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [animationRowIndex, setAnimationRowIndex] = useState(null);
  const [animationType, setAnimationType] = useState(null);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [currentCellIndex, currentRowIndex]);

  useEffect(() => {
    fetch("/word-bank.txt")
      .then((response) => response.text())
      .then((text) => {
        const wordsArray = text
          .split("\n")
          .map((word) => word.trim())
          .filter((word) => word.length > 0);
        setWordBank(wordsArray);
        setSelectedWord(
          wordsArray[Math.floor(Math.random() * wordsArray.length)]
        );
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching word bank:", error));
  }, []);

  const updateBoardLetter = (rowIndex, cellIndex, value) => {
    const boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[rowIndex][cellIndex] = { letter: value, bg: "#ffffff" };
    setBoard(boardCopy);
  };

  const resetGame = () => {
    location.reload();
  };

  const onKeyDown = (e) => {
    handleKeyPress(e.key);
  };

  const onAnimationComplete = useCallback(() => {
    setAnimationType(null);
  }, []);

  const handleKeyPress = (key) => {
    if (gameWon || gameOver) return;
    // lowercase
    key = key.toLowerCase();

    if (key === "enter" && currentCellIndex === 5) {
      let word = board[currentRowIndex].reduce((acc, curr) => {
        return acc + curr.letter;
      }, "");

      if (!wordBank.includes(word)) {
        setAnimationRowIndex(currentRowIndex);
        setAnimationType("shake");
        return;
      }

      const boardCopy = JSON.parse(JSON.stringify(board));
      const keyColorMapCopy = JSON.parse(JSON.stringify(keyColorMap));
      boardCopy[currentRowIndex].forEach((item, index) => {
        if (selectedWord.includes(item.letter)) {
          item.bg = "#C9B458";
          keyColorMapCopy.almost.push(item.letter.toLowerCase());

          // Check if the letter is already accounted for
          const letterCountInSelectedWord = getLetterCount(
            selectedWord,
            item.letter
          );

          // Generating sliced word till the index (0, index)
          // E.g. if word was apple and current index is 2
          // then the sliced word would be ap
          const currentRow = boardCopy[currentRowIndex];
          const slicedCurrentRow = currentRow.slice(0, index);
          const word = slicedCurrentRow.reduce((acc, curr) => {
            return acc + curr.letter;
          }, "");

          const currentLetterCount = getLetterCount(word, item.letter);
          if (currentLetterCount >= letterCountInSelectedWord) {
            item.bg = "#787C7E";
          }
        } else {
          item.bg = "#787C7E";
          keyColorMapCopy.incorrect.push(item.letter.toLowerCase());
        }
        if (selectedWord[index] === item.letter) {
          item.bg = "#6AAA64";
          keyColorMapCopy.correct.push(item.letter.toLowerCase());
        }
      });
      setBoard(boardCopy);
      setKeyColorMap(keyColorMapCopy);

      setAnimationRowIndex(currentRowIndex);
      setAnimationType("flip");

      // Win
      if (word === selectedWord) {
        setTimeout(() => {
          setGameWon(true);
        }, 2500);
        return;
      }

      if (currentRowIndex > 4) {
        setTimeout(() => {
          setGameOver(true);
        }, 2500);
        return;
      }

      setCurrentCellIndex(0);
      setCurrentRowIndex((prev) => prev + 1);

      return;
    }

    if (key === "backspace" && currentCellIndex !== 0) {
      updateBoardLetter(currentRowIndex, currentCellIndex - 1, null); // -1 because we want to remove the previous letter
      setCurrentCellIndex((prev) => prev - 1);
      return;
    }

    if (!isAlphabetic(key)) return;

    if (currentCellIndex > 4) return;

    updateBoardLetter(currentRowIndex, currentCellIndex, key);
    setAnimationRowIndex(currentRowIndex);
    setAnimationType("pop");
    setCurrentCellIndex((prev) => prev + 1);
  };

  if (isLoading) {
    // TODO: ADD LOADER
    return null;
  }

  return (
    <div>
      <Navbar />
      {/* TODO: Remove - only for debugging */}
      {/* <p>currentRowIndex: {currentRowIndex}</p>
      <p>currentCellIndex: {currentCellIndex}</p> */}
      <button onClick={() => setGameWon(true)}>Game Won</button>
      <button onClick={() => setGameOver(true)}>Game Over</button>
      <div className="flex flex-col gap-1.5 items-center py-3">
        {/* Board */}
        {board.map((row, i) => {
          return (
            <Row
              key={i}
              startSubmitAnimation={
                i === animationRowIndex && animationType === "flip"
              }
              startRejectAnimation={
                i === animationRowIndex && animationType === "shake"
              }
              startPopAnimation={
                i === animationRowIndex && animationType === "pop"
              }
              onAnimationComplete={onAnimationComplete}
              row={row}
              currentCellIndex={currentCellIndex}
            />
          );
        })}

        {/* Keyboard */}
        <Keyboard onKeyPress={handleKeyPress} keyColorMap={keyColorMap} />

        <div
          aria-hidden="true"
          className="pointer-events-none select-none fixed inset-0 overflow-hidden flex justify-center z-[100]"
        >
          <Confetti active={gameWon} config={confettiConfig} />
        </div>

        {/* Game Won Modal */}
        {gameWon && (
          <GameWonModal selectedWord={selectedWord} onPlayAgain={resetGame} />
        )}

        {/* Game Over Modal */}
        {gameOver && (
          <GameOverModal selectedWord={selectedWord} onPlayAgain={resetGame} />
        )}
      </div>
    </div>
  );
};

export default App;
