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
      "cloud"
    ]
    
    //12 words 
    
    function selectRandomWord(wordsArray) {
        
        //check if an array is empty inn case for errors
        if (!Array.isArray(wordsArray) || wordsArray.length === 0) {
            return undefined;
        }
    
        //generate a random index between 0 and the array list lenght at first 12
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        return wordsArray[randomIndex];
    }
    
    
    //call the function with the array
    const randomWord = selectRandomWord(wordsArray);
    
    // show the result of the choosing to the console
    console.log(randomWord);
    
    let currentRowIndex = 1;
    let currentColIndex = 0;
    
    //on screen keyboard listerners
    // get all keys from keyboard
    const keyboardKeys = document.querySelectorAll(".key");
    
    //Function to handle letter input being pressed
    function handleLetterInput(letter) {
        // Only add a letter if the current row is not full
        if (currentColIndex < 5) {
            const tile = document.querySelector(`#row-${currentRowIndex} .tile[data-col="${currentColIndex}"]`);
            if (tile) {
                tile.textContent = letter;
                currentColIndex++;
            }
        }
    }
    
    // enter key
    function handleEnter() {
        console.log('enter pressed');
    }

//delete key
function handleDelete() {
    // Only delete if there's a letter to delete in the current row
    if (currentColIndex > 0) {
        currentColIndex--;
        const tile = document.querySelector(`#row-${currentRowIndex} .tile[data-col="${currentColIndex}"]`);
        if (tile) {
            tile.textContent = '';
        }
    }
} 

    
    
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
