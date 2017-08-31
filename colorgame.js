var reset = document.getElementById("reset");
var colors = document.querySelectorAll(".square");
var rgbToGuess = document.getElementById("toGuess");
var easyButon = document.querySelector("#easy");
var hardButon = document.querySelector("#hard");
var displayMessage = document.querySelector("#message");
var header = document.querySelector(".title");
var winningColor; 
var dificulty = 6; //6 for hard 3 for easy

//Devuelve un color rgb aleatorio (string)
function randomColor(){
	var rgbColor;
	rgbColor = "rgb("+Math.floor(Math.random()*256)+" ,"+Math.floor(Math.random()*256)+" ,"+Math.floor(Math.random()*256)+")"
	return rgbColor;
}

/*Recorre la lista de elementos colors y les asigna un color aleatorio
luego vuelve a recorrerlo para verificar que no se repitan colores*/
function setColors(){
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
} 

function selectWinningColor() {
	var i = Math.floor(Math.random()*dificulty);
	winningColor = colors[i].style.backgroundColor;
	rgbToGuess.textContent = winningColor;
}

function changeDificulty() {
	if (this === easyButon){
		dificulty = 3;
		setColors();
		for (var i = 3; i < colors.length; i++){
			colors[i].style.display = "none";
		}
		easyButon.classList.add("selected");
		hardButon.classList.remove("selected");
	}
	else{
		dificulty = 6;
		setColors();
		for (var i = 3; i < colors.length; i++){
			colors[i].style.display = "initial";
		}
		hardButon.classList.add("selected");
		easyButon.classList.remove("selected");	
	}
}

function verifyGuess(){
	if (this.style.backgroundColor === winningColor){
		displayMessage.textContent = "Correct!";
		header.style.backgroundColor = winningColor;
		for (var i = 0; i < dificulty; i++){
			colors[i].style.backgroundColor = winningColor;
		}
	}
	else{
		this.style.backgroundColor = "#232323";
		displayMessage.textContent ="Try Again!";
	}
}
	


window.onload = setColors();
reset.addEventListener("click", setColors);
easyButon.addEventListener("click", changeDificulty);
hardButon.addEventListener("click", changeDificulty);
for (var i = 0; i < colors.length; i++){
		colors[i].addEventListener("click",verifyGuess);
	}