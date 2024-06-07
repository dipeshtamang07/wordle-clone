import { useCallback, useEffect, useState } from "react";
import { getLetterCount, isAlphabetic } from "./utils";
import Navbar from "./components/Navbar";
import Row from "./components/Row";
import Keyboard from "./components/Keyboard";
import { AnimatePresence } from "framer-motion";
import Modal from "./components/Modal";

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
    fetch('/word-bank.txt')
      .then(response => response.text())
      .then(text => {
        const wordsArray = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        setWordBank(wordsArray);
        setSelectedWord(wordsArray[Math.floor(Math.random() * wordsArray.length)]);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching word bank:', error));
  }, []);

  const updateBoardLetter = (rowIndex, cellIndex, value) => {
    const boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[rowIndex][cellIndex] = { letter: value, bg: "#ffffff" };
    setBoard(boardCopy);
  };

  const resetBoardRow = (rowIndex) => {
    const boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[rowIndex] = new Array(5).fill({ letter: null, bg: "#ffffff" });
    setBoard(boardCopy);
    setCurrentCellIndex(0);
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
        // alert("Word not found!");
        // resetBoardRow(currentRowIndex);
        return;
      }

      const boardCopy = JSON.parse(JSON.stringify(board));
      const keyColorMapCopy = JSON.parse(JSON.stringify(keyColorMap));
      boardCopy[currentRowIndex].forEach((item, index) => {
        if (selectedWord.includes(item.letter)) {
          item.bg = "#C9B458";
          keyColorMapCopy.almost.push(item.letter.toLowerCase());

          // Check if the letter is already accounted for
          const letterCountInSelectedWord = getLetterCount(selectedWord, item.letter);

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
            item.bg = "#787C7E"
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
        // alert("game over!");
        // resetGame();
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
    return null
  }

  return (
    <div>
      <Navbar />
      {/* <h3>{gameWon.toString()}</h3> */}
      {/* <h4>{selectedWord}</h4> */}
      {/* <button onClick={() => resetGame()}>Click</button> */}
      {/* TODO: Remove - only for debugging */}
      {/* <p>currentRowIndex: {currentRowIndex}</p>
      <p>currentCellIndex: {currentCellIndex}</p> */}
      {/* <button onClick={() => setGameWon(true)}>Game Won</button>
      <button onClick={() => setGameOver(true)}>Game Over</button> */}
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

        {/* Game Won Modal */}
        <AnimatePresence initial={false}>
          {gameWon && (
            <Modal allowManualClose={false}>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl mb-4">Hooray!!</h1>
                <p className="text-xl font-light mb-4 text-center">
                  You guessed the word correctly
                </p>
                <ul className="flex gap-2 items-center justify-center mb-6">
                  {selectedWord.split("").map((letter, index) => (
                    <li
                      className="flex items-center justify-center w-10 h-10 p-4 bg-green-500 text-white uppercase"
                      key={index}
                    >
                      {letter}
                    </li>
                  ))}
                </ul>

                <button
                  className="py-2 px-4 rounded-lg border-2 border-black"
                  onClick={resetGame}
                >
                  Play Again
                </button>
              </div>
            </Modal>
          )}
        </AnimatePresence>

        {/* Game Over Modal */}
        <AnimatePresence initial={false}>
          {gameOver && (
            <Modal allowManualClose={false}>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl mb-4">Better Luck next time!</h1>
                <p className="text-xl font-light mb-4">The word was:</p>
                <ul className="flex gap-2 items-center justify-center mb-6">
                  {selectedWord.split("").map((letter, index) => (
                    <li
                      className="flex items-center justify-center w-10 h-10 p-4 border border-black text-black uppercase"
                      key={index}
                    >
                      {letter}
                    </li>
                  ))}
                </ul>

                <button
                  className="py-2 px-4 rounded-lg border-2 border-black"
                  onClick={resetGame}
                >
                  Play Again
                </button>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
