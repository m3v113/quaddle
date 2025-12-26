import { useState } from "react";
import "./App.css";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./components/ui/input-otp";
import { WordleBoard } from "./WordleBoard";
import wordsText from "./words.txt?raw";

const word_list = wordsText
  .split("\n")
  .map((w) => w.trim())
  .filter(Boolean);

const num_tries = 6;

export default function App() {
  const [value, setValue] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);

  // pick 4 words once (quaddle answers)
  const [words] = useState(() => [
    word_list[Math.floor(Math.random() * word_list.length)],
    word_list[Math.floor(Math.random() * word_list.length)],
    word_list[Math.floor(Math.random() * word_list.length)],
    word_list[Math.floor(Math.random() * word_list.length)],
  ]);

  const tries_left = num_tries - guesses.length;

  // global submit: one guess goes to all 4 boards (because they share guesses[])
  const submit_guess = () => {
    if (tries_left <= 0) return;
    if (value.length !== 5) return;

    setGuesses([...guesses, value.toLowerCase()]);
    setValue("");
  };

  let message = "";
  if (tries_left <= 0) {
    message = "tries finished";
  } else if (value == "") {
    message = "Enter your guess!";
  } else {
    message = `You entered: ${value}`;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Quaddle</h1>

      {/* 4 boards in a grid */}
      <div className="grid grid-cols-2 gap-6">
        <WordleBoard word={words[0]} guesses={guesses} />
        <WordleBoard word={words[1]} guesses={guesses} />
        <WordleBoard word={words[2]} guesses={guesses} />
        <WordleBoard word={words[3]} guesses={guesses} />
      </div>

      {/* Debug */}
      <div className="text-sm text-neutral-300">
        words: <code>{JSON.stringify(words)}</code>
        {" | "}
        guesses: <code>{JSON.stringify(guesses)}</code>
        {" | "}
        tries_left: <code>{tries_left}</code>
      </div>

      <InputOTP
        maxLength={5}
        value={value}
        disabled={tries_left <= 0}
        onChange={(v) => {
          setValue(v);
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} className="w-16 h-16 text-2xl" />
          <InputOTPSlot index={1} className="w-16 h-16 text-2xl" />
          <InputOTPSlot index={2} className="w-16 h-16 text-2xl" />
          <InputOTPSlot index={3} className="w-16 h-16 text-2xl" />
          <InputOTPSlot index={4} className="w-16 h-16 text-2xl" />
        </InputOTPGroup>
      </InputOTP>

      <button
        className="px-4 py-2 rounded-md bg-indigo-600 disabled:opacity-50"
        disabled={tries_left <= 0 || value.length !== 5}
        onClick={submit_guess}
      >
        Enter
      </button>

      <div className="text-center text-sm">{message}</div>
    </div>
  );
}