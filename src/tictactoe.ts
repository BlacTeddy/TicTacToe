const sq =  document.querySelectorAll<HTMLDivElement>(".square") ;
const spanPlayer = document.getElementById("currentPlayer") as HTMLSpanElement;
const reset = document.getElementById("restart") as HTMLButtonElement;

let player: '✕' | '◯' = '◯';
spanPlayer.textContent = player;  
// console.log(`player: ${player}, span: ${spanPlayer.textContent}`);

// // console.warn(sq.length);   

reset?.addEventListener('click', () =>{
    removeInput();
        // console.log(`reset button pressed; `);
}); 

sq.forEach((square, index) => {  
    square.addEventListener('click', (e)=> { 
        // console.log(square, ' ', index, "\n", );
        const target = e.currentTarget as HTMLDivElement;
/* Check if already clicked (or check if textContent is already 'X' or 'O') */
        // // console.warn(target.dataset) 
        if (target.dataset.clicked === 'true') return;
        // console.log(`?value: ${sq[index.valueOf()]}`);    
        /* Run your logic */  
        target.textContent = player; 
        target.dataset.played = player.toString();

        // square.textContent = player;
    
        /* Switch turns */
        if (player === '✕') { 
            spanPlayer.textContent = player = '◯'; 
        } else {
            spanPlayer.innerText = player = '✕';
        }
        // currPlayer.innerText = player === '✕' ? '◯' : '✕';
        // console.log(`!player: ${player}, span: ${spanPlayer.textContent}`);
        /* Mark as clicked */
        target.dataset.clicked = 'true';
        if(winCheck() !== null){
            // console.log(`It's not NULL!?`)
            winner()
        }else if(tieCheck() !== false){  
            isTie()
        }
    });  
});  
function isTie(){ 
    const prompt = document.getElementById('alert') as HTMLDivElement;
    // const spanWon = document.getElementById("winingPlayer") as HTMLSpanElement;
    const results = document.getElementById('result') as HTMLDivElement;
    const message = document.getElementById('no') as HTMLDivElement; 

    prompt.classList.add('active');  
    results.textContent = "Uh-OH"
    message.innerHTML = `No One Won<br> 
    Click to try again`
    prompt.addEventListener('click', () => {
        removeInput();
        prompt.classList.remove('active');
    });
}
function winner(){
    const prompt = document.getElementById('alert') as HTMLDivElement;
    const spanWon = document.getElementById("winingPlayer") as HTMLSpanElement;

    prompt.classList.add('active'); 
    spanWon.textContent = player === '✕' ? '◯' : '✕';
    prompt.addEventListener('click', () => {
        removeInput();
        prompt.classList.remove('active');
    });
}
function tieCheck(): boolean {
    let isFull = true;

    sq.forEach((square) => {
        if (square.textContent === '') {
            isFull = false;
            // console.log(`isFull is: ${isFull}`)
        }
    });
    // console.log(`isFull is: ${isFull}`) 
    return isFull;
}
function winCheck(): string | null {
    const cellsArray = Array.from(sq);

  // All possible winning index combinations (rows, columns, diagonals)
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
]as const;

    for (const combination of winningCombinations) { 
        const [a, b, c] = combination;
        
        const playerA = cellsArray[a]?.dataset.played; 
        const playerB = cellsArray[b]?.dataset.played;
        const playerC = cellsArray[c]?.dataset.played;
        // // console.log(`combo: ${combination}; \na:${a}, b:${b}, c:${c}; \nplayA: ${playerA}, playB: ${playerB}, playC: ${playerC}`)
    // If all three spots have a player and they match, we have a winner!
        if (playerA && playerA === playerB && playerB === playerC) {
            // // console.log(`?${playerA} & ${combination}`)
            return playerA; // Returns 'X' or 'O'
        }
    }
  return null; // No winner yet
}
function removeInput(){
    sq.forEach((square)=>{
        // console.log(square?.dataset)
    delete square?.dataset.played;
    delete square?.dataset.clicked;
    square.textContent = "";
    })
}    

