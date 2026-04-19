function setup() {
  createCanvas(largura, altura);
}
//criação do canvas
let largura = 600;
let altura = 400;

//Raquete
let raqueteX = 250
let raqueteY = 370;
let alturaRaquete = 15;
let larguraRaquete = 75;

//bola
let bolaX = 30;
let bolaY = 100;
let tamanhoBola = 15;
let velocidadeX = 3;
let velocidadeY = 3;

function raquete(){
  
}

function draw() {
  background(220);
  let travaFimRaquete = largura - larguraRaquete
  bolaX += velocidadeX
  bolaY += velocidadeY
  
  if (bolaX < 0 || bolaX > largura) {
    velocidadeX *= -1;
  }
  
  if (bolaY < 0 || bolaY > altura) {
    velocidadeY *= -1;
  }
    
  if (keyIsDown(LEFT_ARROW) && raqueteX > 0){
    raqueteX -= 5;
  } else if(keyIsDown(RIGHT_ARROW) && raqueteX < travaFimRaquete){
    raqueteX += 5;
  }
  
  ellipse(bolaX, bolaY, tamanhoBola)
  rect (raqueteX,raqueteY,larguraRaquete,alturaRaquete)
}
