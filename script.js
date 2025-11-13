document.addEventListener('DOMContentLoaded', () => {
    const wordsArray = [
        "apple",
        "table",
        "world",
        "grape",
        "light",
        "audio",
        "music",
        "dream",
        "water",
        "stone",
        "smile",
        "cloud",
        "house", "plant", "train", "bread", "chair", 
        "dance", "beach", "piano", "money", "party", 
        "pizza", "tiger", "lemon", "river", "ocean", 
        "earth", "space", "stars", "night", "watch", 
        "clock", "phone", "paper", "glass", "grass", 
        "green", "white", "black", "sweet", "happy", 
        "funny", "crazy", "angry", "quick", "smart", 
        "brave", "clean", "dirty", "fresh", "salty", 
        "spicy", "sharp", "heavy", "thick", "thin", 
        "round", "proud", "lucky", "eager", "early", 
        "daily", "sunny", "rainy", "windy", "snowy", 
        "storm", "quiet", "loudly", "soft", "heart",
        "sugar", "spice", "flame", "fruit", "berry",
        "melon", "mango", "peach", "toast", "salad",
        "lunch", "diner", "plate", "spoon", "knife",
        "forks", "glass", "drink", "juice", "soda",
        "snack", "candy", "treat", "baker", "cooks",
        "chefs", "grill", "roast", "fried", "boiled",
        "steam", "sauce", "crust", "dough", "wheat",
        "grain", "flour", "yeast", "honey", "syrup"
    ]
    
    //12 words 
    
    //SELECTS RANDOM STRING FROM ARRAY OF WORDS
    function selectRandomWord(wordsArray) {
        
        //check if an array is empty inn case for errors
        if (!Array.isArray(wordsArray) || wordsArray.length === 0) {
            return undefined;
        }
    
        //generate a random index between 0 and the array list lenght 
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        return wordsArray[randomIndex];
    }
    
    
    //call the function with the array
    const randomWord = selectRandomWord(wordsArray);
    
    // show the result of the choosing to the console
    console.log(randomWord);
    
    let currentRowIndex = 1;
    let currentColIndex = 0;
    let isGameOver = false;
    const messageElement = document.getElementById('game-message');
    
    //on screen keyboard listerners
    // get all keys from keyboard
    const keyboardKeys = document.querySelectorAll(".key");
    
    //Function to handle letter input being pressed
    function handleLetterInput(letter) {
        if (isGameOver) return;
        // Only add a letter if the current row is not full
        if (currentColIndex < 5) {
            const tile = document.querySelector(`#row-${currentRowIndex} .tile[data-col="${currentColIndex}"]`);
            if (tile) {
                tile.textContent = letter;
                currentColIndex++;
            };
        }
    }
    
    // enter key
    function handleEnter() {
        if (isGameOver) return;
        if (currentColIndex < 5) {
            
            console.log('Word is not long enough.');
            return;
        }

        const currentRow = document.querySelector(`#row-${currentRowIndex}`);
        const tiles = currentRow.querySelectorAll('.tile');
        let guessedWord = '';
        tiles.forEach(tile => {
            guessedWord += tile.textContent;
        });

        guessedWord = guessedWord.toLowerCase();
        console.log(`Guessed: ${guessedWord}, Answer: ${randomWord}`);

        // LETTER BY LETTER VERIFICATION
        for (let i = 0; i < 5; i++) {
            const tile = tiles[i];
            const guessedLetter = guessedWord[i];
            const correctLetter = randomWord[i];

            //FIND THE KEY ON THE ON-SCREEN KEYBOARD
            const key = document.querySelector(`.key[data-key="${guessedLetter.toUpperCase()}"]`);

            if (guessedLetter === correctLetter) {
                // Correct letter in the correct position
                tile.classList.add('correct');
                if (key) { 
                    key.classList.remove('present'); //remove present if marked before
                    key.classList.add('correct');
                }
            } else if (randomWord.includes(guessedLetter)) {
                // Correct letter in the wrong position
                tile.classList.add('present');
                if (key && !key.classList.contains('correct')) {
                    //only add present if not already correct
                    key.classList.add('present');
                }
            } else {
                // Incorrect letter
                tile.classList.add('absent');
                if (key && !key.classList.contains('correct') && !key.classList.contains('present')) {
                    //onyl add absentr if its not already correct or present
                    key.classList.add('absent');
                }
            }
        }

        if (guessedWord === randomWord) {
            messageElement.textContent = 'Congratulations! You won!';
            isGameOver = true;
            return; // Stop further execution in this function
        }
        
        if (currentRowIndex === 6) {
            messageElement.textContent = `Game Over! The word was: ${randomWord.toUpperCase()}`;
            isGameOver = true;
        }

        // Move to the next row for the next guess
        currentRowIndex++;
        currentColIndex = 0;
    }

    //delete key
    function handleDelete() {
        if (isGameOver) return;
        // Only delete if there's a letter to delete in the current row
        if (currentColIndex > 0) {
            currentColIndex--;
            const tile = document.querySelector(`#row-${currentRowIndex} .tile[data-col="${currentColIndex}"]`);
            if (tile) {
                tile.textContent = '';
            }
        }
    } 

        //DEV MODE CODE
        // Reference to h2 element for dev mode
        const devAnswer = document.querySelector('.devMode-answer');
        let devMode = false;

        //event listner for keyboard press
        document.addEventListener('keydown', (event) => {
            if (isGameOver) return;
            console.log(`dev key is pressed! is: ${event.key}`);
            
            if (event.key === '9') {
                devmode = true;
                //DEVMODE CHEAT - SHOW CURRENT WORD
                if (devmode && devAnswer) {
                    devAnswer.textContent = `Answer: ${randomWord}`;
                }
            }
        });


        //LISTENER FOR EACH WORD CLICK
        // click listner for each key
        keyboardKeys.forEach(key => {
            key.addEventListener('click', () => {
                const keyValue = key.dataset.key; // get value from each data attribute in html
                if (keyValue === 'ENTER') {
                    handleEnter();
                } else if (keyValue === 'DEL') {
                    handleDelete();
                } else {
                    handleLetterInput(keyValue);
                } 
                    
                });
            });
});
