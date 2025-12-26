import { useState } from "react";

const num_tries = 6;

const guess_checker = (guess_array: Array<string>, answer_array: Array<string>) => {
  const colors = Array(5).fill("absent");

  guess_array.forEach((letter, index) => {
    if (letter == answer_array[index]) {
      colors[index] = "correct";
    } else if (answer_array.includes(letter)) {
      colors[index] = "present";
    }
  });

  return colors;
};

const color_for_letter = (color: string) => {
  if (color === "correct") return "bg-green-600 border-green-600";
  if (color === "present") return "bg-yellow-500 border-yellow-500";
  if (color === "absent") return "bg-gray-700 border-gray-700";
  return "bg-transparent border-gray-600"; // empty rows
};

export const WordleBoard = ({
  word,
  guesses,
}: {
  word: string;
  guesses: string[];
}) => {

  const word_array = word.split("");

  return (
    <div className="flex flex-col items-center gap-4 p-3 rounded-lg border border-gray-700">
      {/* <h2 className="text-lg font-bold">Wordle</h2> */}

      <div className="flex flex-col gap-2">
        {Array.from({ length: num_tries }).map((_, rowIndex) => {
          // above makes an array of 6, then for each index does the following
          const guess = guesses[rowIndex] ?? "";
          const letters = guess.split("");
          // finds guess corresponding to that try
          const colors = guess ? guess_checker(letters, word_array) : Array(5).fill("");

          return (
            // for each of the six rows return
            <div key={rowIndex} className="flex gap-2">
              {Array.from({ length: 5 }).map((_, colIndex) => {
                // make an array of five for the individual try, then for each letter
                const letter = letters[colIndex] ?? "";
                // assign letter from before to box
                return (
                  <div
                    key={colIndex}
                    className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center 
                    border-2 rounded text-xl font-bold ${color_for_letter(colors[colIndex])}`}
                  >
                    {letter.toUpperCase()}
                  </div>
                  // print that letter
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
