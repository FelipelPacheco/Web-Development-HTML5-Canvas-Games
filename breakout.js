//Pontuacao
let pontos = 0;

//Blocos
let blocos = [];
let alturaBloco = 20;
let larguraBloco = 50;

//Criação do canvas
let largura = 600;
let altura = 400;

//Raquete
let raqueteX = 250
let raqueteY = 370;
let alturaRaquete = 15;
let larguraRaquete = 75;
let travaFimRaquete;

//Bola
let bolaX = 30;
let bolaY = 100;
let tamanhoBola = 15;
let velocidadeX = 3;
let velocidadeY = 3;

function setup() {
  createCanvas(largura, altura);
  travaFimRaquete = largura - larguraRaquete
  
  for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 5; j++) {
    blocos.push({
      x: i * 60 + 25,
      y: j * 25 + 50,
      vivo: true 
    });
  }
}

}

function draw() {
  background(220);
  
  for (let i = 0; i < blocos.length; i++) {
    let b = blocos[i];
    if (b.vivo) {
      if (bolaY < b.y + alturaBloco + 7 && bolaY > b.y - 7 && bolaX > b.x - 7 && bolaX < b.x + larguraBloco + 7) {
          velocidadeY *= -1;
          b.vivo = false;
          pontos += 10;
      }
      fill(255, 0, 0);
      rect(b.x, b.y, larguraBloco, alturaBloco);
    }
  }

  bolaX += velocidadeX
  bolaY += velocidadeY
  
  if (bolaY > raqueteY - tamanhoBola/2 && bolaX > raqueteX && bolaX < raqueteX + larguraRaquete) {
    velocidadeY *= -1;
    bolaY = raqueteY - tamanhoBola/2;
  }
  
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
  text("Pontos: " + pontos, 20, 20);
}
