var reset = document.getElementById("reset");
var colors = document.querySelectorAll(".square");
var rgbToGuess = document.getElementById("toGuess");
var easyButon = document.querySelector("#easy");
var hardButon = document.querySelector("#hard");
var displayMessage = document.querySelector("#message");
var header = document.querySelector(".title");
var winningColor; 
var numSquares = 6; //6 for hard 3 for easy

//Devuelve un color rgb aleatorio (string)
function randomColor(){
	var rgbColor;
	rgbColor = "rgb("+Math.floor(Math.random()*256)+" ,"+Math.floor(Math.random()*256)+" ,"+Math.floor(Math.random()*256)+")"
	return rgbColor;
}

/*Recorre la lista de elementos colors y les asigna un color aleatorio
luego vuelve a recorrerlo para verificar que no se repitan colores*/
function resetGame(){
	header.style.backgroundColor = "#2A8DB8";
	var i;
	var j;
	for(i = 0; i<colors.length; i++){
			colors[i].style.backgroundColor = randomColor();
		}
	for (i = 0; i<colors.length; i++){
		for (j = 0; j < colors.length; j++){
			if (i === j){
				j++;
			}
			else{
				if (colors[i].style.backgroundColor === colors[j].style.backgroundColor) {
					colors[i].style.backgroundColor = randomColor();
				}
			}
		}
	}
	selectWinningColor();
	displayMessage.textContent = "";
	reset.textContent = "NEW COLORS";
} 

function selectWinningColor() {
	var i = Math.floor(Math.random()*numSquares);
	winningColor = colors[i].style.backgroundColor;
	rgbToGuess.textContent = winningColor;
}

function changeDificulty() {
	hardButon.classList.remove("selected");
	easyButon.classList.remove("selected");
	this.classList.add("selected");
	for (var i = 3; i < colors.length; i++){
		if (this === easyButon){        
			numSquares = 3;
			colors[i].style.display = "none";
			resetGame();
			}
		else{
			numSquares = 6;
			resetGame();
			colors[i].style.display = "initial";
		}
	}
}

function verifyGuess(){
	if (this.style.backgroundColor === winningColor){
		displayMessage.textContent = "Correct!";
		reset.textContent = "PLAY AGAIN?"
		header.style.backgroundColor = winningColor;
		for (var i = 0; i < numSquares; i++){
			colors[i].style.backgroundColor = winningColor;
		}
	}
	else{
		this.style.backgroundColor = "#232323";
		displayMessage.textContent ="Try Again!";
	}
}

window.onload = resetGame();
reset.addEventListener("click", resetGame);
easyButon.addEventListener("click", changeDificulty);
hardButon.addEventListener("click", changeDificulty);
for (var i = 0; i < colors.length; i++){
		colors[i].addEventListener("click",verifyGuess);
	}