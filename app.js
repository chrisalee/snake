document.addEventListener("DOMContentLoaded", () => {  
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.querySelector('.start');

    const width = 10;
    let score = 0;
    let currentIndex = 0;  //first div in our grid
    let appleIndex = 0; //first div in the grid
    let currentSnake = [2, 1, 0];  //div in our grid being 2 (the head of snake), and 0 being the end (the tail), with all 1's being the body 
    let direction = 1;
    let speed = .9;
    let intervalTime = 0;
    let interval = 0;

    //to start or restart game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerHTML = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    };

    //function to deal with all outcomes of the snake
    function moveOutcomes() {
        //snake hitting the border or hitting itself
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) ||  //snake hits the bottom
            (currentSnake[0] % width === width - 1 && direction === 1) ||           //hits right wall
            (currentSnake[0] % width === 0 && direction === -1) ||                  //hits left wall
            (currentSnake[0] - width < 0 && direction === -width)  ||               //snake hits the top
            (squares[currentSnake[0] + direction].classList.contains('snake'))      //snake runs into itself 
        ) {  
            console.log('game over')
            return clearInterval(interval)  //clears the interval if any of the above happens
        };

        const tail = currentSnake.pop();  //removes last of the array and shows it
        squares[tail].classList.remove('snake'); //removes class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction);  //gives direction to the snake head
        
        //snake getting an apple 
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail)
            randomApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
    };

    //generate a new apple once eaten
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        }
        while(squares[appleIndex].classList.contains('snake')) { //make sure not placing in an already taken snake body piece
            squares[appleIndex].classList.add('apple')
        }
    }

    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake');  //we are removing the class of snalke from all the squares

        if(e.keyCode === 39) {
            direction = 1 //right arrow. snake goes right one 
        }
        else if(e.keyCode === 38) {
            direction = -width  //up arrow, snake goes back 10 divs, appearing to go up one
        }
        else if(e.keyCode === 37) {
            direction = -1 //left arrow moves one to left one div
        }
        else if(e.keyCode === 40) {
            direction = +width  //down arrow, go up 10 divs
        }
    };
    document.addEventListener('keydown', control);
    startButton.addEventListener('click', startGame);
    

})

