import { useState} from 'react'
import './App.css'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './components/ui/input-otp'

const word_list = ["pious", "alter"];
const word = word_list[Math.floor(Math.random() * word_list.length)];
const word_array = word.split("");
console.log(word);

const num_tries = 6;

const guess_checker = (guess_array: Array<string>, answer_array: Array<string>) => {

    const colors = Array(5).fill("absent");

    guess_array.forEach((letter, index) => {
        if (letter == answer_array[index]) {
            colors[index] = "correct";
        } else if (answer_array.includes(letter)) {
            colors[index] = "present";
        }
    }) 

    return colors;
}

const color_for_letter = (color: string) => {
    if (color === "correct") return "bg-green-600 border-green-600";
    if (color === "present") return "bg-yellow-500 border-yellow-500";
    return "bg-gray-700 border-gray-700";
}

function App() {

    const [value, setValue] = useState("")
    const [guesses, setGuesses] = useState<string[]>([])

    const tries_left = num_tries - guesses.length;

    let message = "";
    if (guesses[num_tries-tries_left-1] == word) {
        message = "good job, you win";
    } else if (tries_left <= 0) {
        message = "tries finished";
    } else if (value == "") {
        message = "Enter your guess!";
    } else {
        message = `You entered: ${value}`;
    }

    return (
        <div className="app-root min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-bold">Wordle</h1>
            <div className="flex flex-col gap-2">
                {Array.from({ length: num_tries }).map((_, rowIndex) => {
                    // above makes an array of 6, then for each index does the following
                    const guess = guesses[rowIndex] ?? ""; 
                    const letters = guess.split("");             
                    // finds guess corresponding to that try
                    const colors = guess_checker(letters, word_array);

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
              rounded text-xl font-bold ${color_for_letter(colors[colIndex])}`}
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

            <div className="text-sm text-neutral-300">
                word_array: {JSON.stringify(word_array)}
                guesses: {JSON.stringify(guesses)}
                tries_left: {tries_left}
            </div>

            <InputOTP
                maxLength={5}
                value={value}
                disabled={tries_left <= 0 || guesses[num_tries-tries_left-1] == word}
                onChange={(value) => {
                    setValue(value);
                }}
            >
                <InputOTPGroup>
                    {/* same thing: {Array.from({ length: 5 }).map((_, i) => (
                    <InputOTPSlot index={i} className="w-16 h-16 text-2xl" />
                    ))} */}
                    <InputOTPSlot index={0} className="w-16 h-16 text-2xl" />
                    <InputOTPSlot index={1} className="w-16 h-16 text-2xl" />
                    <InputOTPSlot index={2} className="w-16 h-16 text-2xl" />
                    <InputOTPSlot index={3} className="w-16 h-16 text-2xl" />
                    <InputOTPSlot index={4} className="w-16 h-16 text-2xl" />
                </InputOTPGroup>
            </InputOTP>

            <button className="px-4 py-2 rounded-md bg-indigo-600 disabled:opacity-50" 
            disabled={tries_left <= 0 || guesses[num_tries-tries_left-1] == word}
            onClick={() => {
                setGuesses([...guesses, value]); setValue("");
                }}>Enter</button>

            <div className="text-center text-sm">
                {message}
                {/* {tries_left <= 0 ? "tries finished" : (value === "" ? "Enter your guess!" : `You entered: ${value}`)} */}
            </div>
        </div>
    )
}

export default App