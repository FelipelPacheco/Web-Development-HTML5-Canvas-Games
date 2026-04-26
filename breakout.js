//Jogo
let tela = 0;
let pontos = 0;

//Blocos
let blocos = [];
let alturaBloco = 20;
let larguraBloco = 50;

//Canvas
let largura = 600;
let altura = 400;

//Raquete
let raqueteX = 250;
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
  travaFimRaquete = largura - larguraRaquete;
  gerarBlocos(); 
}

function draw() {
  background(220);
  
  if (tela == 0) {
    menu();
  } 
  else if (tela == 1) {
    executarJogo();
  } 
  else if (tela == 2) {
    gameOver();
  }
  else if (tela == 3) {
    vitoria();
  }
}

function menu() {
  textAlign(CENTER);
  textSize(32);
  text("BREAKOUT", largura/2, altura/2);
  textSize(16);
  text("Instruções: Use as SETAS para mover a raquete", largura/2, altura/2 + 40);
  text("Pressione ENTER para começar", largura/2, altura/2 + 80);
  
  if (keyIsDown(ENTER)) {
    tela = 1;
  }
}

function executarJogo() {
  gerenciarBlocos();
  movimentarBolinha();
  movimentarRaquete();
  verificarColisoes();
  
  // Desenhos e Pontos (parte visual)
  fill(255);
  ellipse(bolaX, bolaY, tamanhoBola);
  fill(255);
  rect(raqueteX, raqueteY, larguraRaquete, alturaRaquete);
  fill(0);
  textAlign(LEFT);
  textSize(12);
  text("Pontos: " + pontos, 20, 20);
}

function gerenciarBlocos() {
  let blocosvivos = 0; 

  for (let i = 0; i < blocos.length; i++) {
    let b = blocos[i];
    if (b.vivo) {
      blocosvivos++; 
      
      if (bolaY < b.y + alturaBloco + 7 && bolaY > b.y - 7 && bolaX > b.x - 7 && bolaX < b.x + larguraBloco + 7) {
          velocidadeY *= -1;
          b.vivo = false;
          pontos += 10;
      }
      fill(255, 0, 0);
      rect(b.x, b.y, larguraBloco, alturaBloco);
    }
  }

  if (blocosvivos == 0) {
    tela = 3;
  }
}


function movimentarBolinha() {
  bolaX += velocidadeX;
  bolaY += velocidadeY;
  
  // Colisão com as bordas laterais e topo
  if (bolaX < 0 || bolaX > largura) {
    velocidadeX *= -1;
  }
  if (bolaY < 0) {
    velocidadeY *= -1;
  }
  
  // Game Over se a bola cair
  if (bolaY > altura) {
    tela = 2;
  }
}

function movimentarRaquete() {
  if (keyIsDown(LEFT_ARROW) && raqueteX > 0){
    raqueteX -= 5;
  } else if(keyIsDown(RIGHT_ARROW) && raqueteX < travaFimRaquete){
    raqueteX += 5;
  }
}

function verificarColisoes() {
  // Colisão com a raquete
  if (bolaY > raqueteY - tamanhoBola/2 && bolaX > raqueteX && bolaX < raqueteX + larguraRaquete) {
    velocidadeY *= -1;
    bolaY = raqueteY - tamanhoBola/2;
  }
}

function gameOver() {
  textAlign(CENTER);
  textSize(32);
  text("GAME OVER", largura/2, altura/2);
  text("Pontos: " + pontos, largura/2, altura/2 + 40);
  text("Pressione R para reiniciar", largura/2, altura/2 + 80);
  
  if (keyIsDown(82)) { 
    reiniciar();
  }
}

function vitoria() {
  textAlign(CENTER);
  textSize(32);
  text("Parabens, voce ganhou", largura/2, altura/2);
  text("Pontos: " + pontos, largura/2, altura/2 + 40);
  text("Pressione R para reiniciar", largura/2, altura/2 + 80);
  
  if (keyIsDown(82)) { 
    reiniciar();
  }
}

function gerarBlocos() {
  blocos = []; 
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

function reiniciar() {
  pontos = 0;
  bolaX = 30;
  bolaY = 100;
  velocidadeX = 3;
  velocidadeY = 3;
  gerarBlocos(); 
  tela = 0; 
}
