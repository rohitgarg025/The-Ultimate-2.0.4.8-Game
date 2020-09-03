document.addEventListener("DOMContentLoaded", (event) => {
    // write here
    const gridDisplay = document.querySelector(".grid")
    const scoreDisplay = document.getElementById("score")
    const resultDisplay = document.getElementById("result")

    let squares = []
    const width = 4
    score = 0

    //Creating a playing board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement("div")
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }

        generate()
        generate()
    }

    createBoard()

    //generate  a number randomly
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver()
        } else generate()
    }

    //swipe right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totaTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [
                    parseInt(totalOne),
                    parseInt(totaTwo),
                    parseInt(totalThree),
                    parseInt(totalFour),
                ];

                console.log(row)

                let filtered_row = row.filter((num) => num)
                console.log(filtered_row)
                let missing = 4 - filtered_row.length
                let zeros = Array(missing).fill(0)
                console.log(zeros)
                let newRow = zeros.concat(filtered_row)
                console.log(newRow)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]

            }
        }
    }

    

    //swipe left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totaTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [
                    parseInt(totalOne),
                    parseInt(totaTwo),
                    parseInt(totalThree),
                    parseInt(totalFour),
                ]

                // console.log(row)

                let filtered_row = row.filter((num) => num)
                // console.log(filtered_row)
                let missing = 4 - filtered_row.length
                let zeros = Array(missing).fill(0)
                // console.log(zeros)
                let newRow = filtered_row.concat(zeros);
                // console.log(newRow)

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]

            }
        }
    }

    //swipe down 
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML

            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            let filtered_column = column.filter(num => num)
            let missing = 4 - filtered_column.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filtered_column)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]


        }
    }

    //swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML

            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            let filtered_column = column.filter(num => num)
            let missing = 4 - filtered_column.length
            let zeros = Array(missing).fill(0)
            let newColumn = filtered_column.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]


        }
    }

    //combine rows
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + 1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score

            }
        }
        checkNumber() // check for win after combining a row
    }

    //combine columns
    function combineColumns() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }

        checkNumber() //check for col after combining a col
    }

    //assign keycodes

    //listener for all events 
    document.addEventListener('keyup', control)

    function control(e) {
        //   arrow right key code
        if (e.keyCode === 39) {
            keyRight()
        } 
        else if (e.keyCode === 37) {
            keyLeft()
        }
        else if(e.keyCode === 40){
            keyDown()
        }
        else if(e.keyCode === 38 ){
            keyUp()
        }
    }

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyDown(){
        moveDown()
        combineColumns()
        moveDown()
        generate()
    }
    
    function keyUp(){
        moveUp()
        combineColumns()
        moveUp()
        generate()
    }

    //check number 2048 in the squares to win
    function checkNumber(){
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You Win'
                document.removeEventListener('keyup',control)
            }
        }
    }

    // check if there are no zeroes
    function checkForGameOver(){
        let zeros = 0 //number of zeros

        //count the number of zeros
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 0){
                zeros++;
            }
        }

        if(zeros === 0){
            resultDisplay.innerHTML = 'You Lose'
            document.removeEventListener('keyup',control)
        }

    }


});