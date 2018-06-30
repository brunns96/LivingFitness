"use strict";

// TODO: Get a reference to our gameboard element using the DOM APIs

// Placeholder for the first selected tile of each turn
let selectedTile = null;

// Global value to maintain number of turns
let turnCount = 0;

const boardState = [
    [null, null, null], // Row 1
    [null, null, null], // Row 2
];

let cell = {value:null, idx:null};

let firstChoice = null;
let secondChoice = null;

// Get a reference to our canvas element through the DOM API
const canvas = document.getElementById("canvas");

// From our selected canvas element, get a 2d drawing context
const ctx = canvas.getContext("2d");

let checkedSquares = [];
let pairCount = 0;
let gameWon = false;
let clicks = 0; 
function drawEmptyBoard() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    boardState.forEach(row => {
        row.forEach(cell => {
            cell = null; // Reset each value to null
        });
    });
    

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 400);
    ctx.stroke();

    // Vertical 1
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 400);
    ctx.stroke();

    // Vertical 2
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(600, 0);
    ctx.lineTo(600, 400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(600, 0);
    ctx.stroke();
    // Horizontal 1
    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.lineTo(600, 200);
    ctx.stroke();

    // Horizontal 2
    ctx.beginPath();
    ctx.moveTo(0, 400);
    ctx.lineTo(600, 400);
    ctx.stroke();

    
}

function between(min, p, max) {
    let result = false;

    if (min < max) {
        if (p > min && p < max) {
            result = true;
        }
    }

    if (min > max) {
        if (p > max && p < min) {
            result = true;
        }
    }

    if (p == min || p == max) {
        result = true;
    }

    return result;
}

function getClickedSquare(x, y) {
    if (between(0, x, 200) && between(100, y, 300)) {
        cell = {value: 0, idx: 0}
        return cell;
    }
    else if (between(200, x, 400) && between(100, y, 300)) {
        cell = {value: 1, idx: 1}
        return cell;
    }
    else if (between(400, x, 600) && between(100, y, 300)) {
        cell = {value: 0, idx: 2}
        return cell;
    }
    else if (between(0, x, 200) && between(300, y, 500)) {
        cell = {value: 2, idx: 3}
        return cell;
    }
    else if (between(200, x, 400) && between(300, y, 500)) {
        cell = {value: 1, idx: 4}
        return cell;
    }
    else if (between(400, x, 600) && between(300, y, 500)) {
        cell = {value: 2, idx: 5}
        return cell;
    }
    else { 
        return -1;
    }
}

function fillSquare(pointX, pointY, value) { 
    // 0 = blue
    // 1 = red 
    // 2 = green
    // 3 = reset square
    var fillColor = null;
    if(value === 0)
    { 
        fillColor = "red";
    }
    else if( value === 1)
    { 
        fillColor = "blue";
    }
    else if (value === 2){ 
        fillColor = "green";
    }
    else{ 
        fillColor = "white";
    }

    ctx.beginPath();
    ctx.rect(pointX + 50, pointY + 50, 100,100);
    ctx.fillStyle = fillColor;
    ctx.fill();
    //allows square to be filled before displaying you have won
    setTimeout(function () {
        if (gameWon === true) {
            alert('YOU WON!');
            location.reload();
        }
    }, 1500);
}

function fillAppropriateSquare(value,idx){ 
    
    if(idx === 0)
    { 
        fillSquare(0, 0 , value)

    }
    else if(idx === 1)
    { 
        fillSquare(200, 0 , value)
    }
    else if(idx === 2)
    { 
        fillSquare(400, 0 , value)
    }
    else if(idx === 3)
    { 
        fillSquare(0, 200 , value)
    }
    else if(idx === 4)
    { 
        fillSquare(200, 200 , value)
    }
    else 
    { 
        fillSquare(400, 200 , value)
    }
}


canvas.addEventListener("click", function (event) {
    // Extract the x,y coordinates from the click event on the canvas
    const { x, y } = event;

    console.log(x, y);

    // Figure out which square was clicked
    const clickedSquare = getClickedSquare(x, y);

    console.log(`Clicked square ${clickedSquare}`);
    
    if (clickedSquare === -1) {
        return; // -1 means an area of the canvas was click which we are not tracking
    }

    if (checkedSquares.includes(clickedSquare.idx)) {
        alert('This square has already been played!');
        return;
    }
    else {
        clicks +=1;
        if(clicks === 1)
        {
            checkedSquares.push(clickedSquare.idx);
            firstChoice = clickedSquare;
            fillAppropriateSquare(firstChoice.value,firstChoice.idx)
        }
        else {
            secondChoice = clickedSquare;
            fillAppropriateSquare(secondChoice.value,secondChoice.idx)
        }
        if(secondChoice === null)
        { 
            return;
        }
        if(isMatch(firstChoice.value, secondChoice.value) === true) {
            clicks = 0;
            pairCount +=1;
            if(pairCount === 3)
            { 
                setTimeout(function () {                    
                    alert('YOU WON!');
                    location.reload();
                }, 200);
            }

            setTimeout(function () {
                if(pairCount === 3)
                {
                    return;
                }
                firstChoice = null;
                secondChoice = null;
                alert('You`re correct! Keep going till all the tiles are filled!');
                return;                       
            }, 200);           
        }
        else 
        {
            //game hasnt been won yet... reset squares that are wrongly picked            
            checkedSquares.pop();
            checkedSquares.pop();            
            clicks = 0;
            setTimeout(function () {               
                                        
                fillAppropriateSquare(3,firstChoice.idx)
                fillAppropriateSquare(3,secondChoice.idx)
                firstChoice = null;
                secondChoice = null;
                alert('Try again!');
                return;                       
            }, 500);
        }

                          

            
              
       
    }    
});

function isBoardFilled ()
{ 

}
function isMatch(originalClick, possibleMatch) { 
    if(possibleMatch === originalClick)
    {         
        return true;
    }

    return false;

}

window.addEventListener("load", drawEmptyBoard);