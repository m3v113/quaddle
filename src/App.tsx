import { useState, useMemo } from 'react'
import './App.css'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './components/ui/input-otp'

const word_list = ["pious", "alter"];
const word = word_list[Math.floor(Math.random() * word_list.length)];
const word_array = word.split("");
console.log(word);

function Try() {

    const [value, setValue] = useState("")
    const [guesses, setGuesses] = useState<string[]>([])

    const num_guess = 0;
    const num_tries = 6;

    return (
        <div className="app-root min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-bold">Wordle</h1>
            {guesses.map((guess, index) => (<h3 key={index}>{guess}</h3>))}

            <div className="text-sm text-neutral-300">
                word_array: <code>{JSON.stringify(word_array)}</code>
                guesses: <code>{JSON.stringify(guesses)}</code>
            </div>

        <InputOTP
            maxLength={5}
            value={value}
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

        <button className="px-4 py-2 rounded-md bg-indigo-600 disabled:opacity-50" onClick={() => {setGuesses([...guesses, value]); setValue("");}}>Enter</button>

        <div className="text-center text-sm">
            {value === "" ? "Enter your guess!" : `You entered: ${value}`}
        </div>
        </div>
    )
}

export default Try