# Some sample Wordle code, written in spectacular Python.

import random;

word_list = ["alter", "crane", "pious", "jumps", "opine"]
word = word_list[random.randint(0, 4)]
word_split = list(word)
print(word_split)

num_tries = 6
num_letters = 5
colors = ["⬜"] * 5

while (num_tries > 0):
    guess = input("enter your guess: ")
    guess_split = list(guess)
    print(guess_split)
    if (len(guess_split) == 5):
        num_tries=num_tries-1
        for i in range(5):
            if (guess_split[i] == word_split[i]):
                colors[i] = "🟩"
            elif (guess_split[i] in word_split):
                colors[i] = "🟨"
        print(colors)    
        if (guess == word):
            print("word found, you win")
            break    
    else: 
        print("length does not match")

# Need to deal with duplicates...