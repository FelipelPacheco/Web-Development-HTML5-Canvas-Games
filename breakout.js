//Jogo
let tela = 0;
let pontos = 0;

//Blocos
let blocos = [];
let alturaBloco = 20;
let larguraBloco = 50;
let blocosQuebrados = 0;

//Canvas
let largura = 600;
let altura = 400;

//Raquete
let raqueteX = 250;
let raqueteY = 370;
let alturaRaquete = 15;
let larguraRaquete = 95;
let travaFimRaquete;

//Bola
let bolaX = 287;
let bolaY = 362;
let tamanhoBola = 15;
let velocidadeBolaX = 2;
let velocidadeBolaY = 2;
let raio = tamanhoBola / 2;

let somColisao;
let fimJogo;
let win;

function preload() {
  somColisao = loadSound('colisao.mp3');
  fimJogo = loadSound('gameover_1.mp3');
  win = loadSound('vitoria.mp3');
}

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
  
  // Desenho da Bolinha
  fill(255);
  ellipse(bolaX, bolaY, tamanhoBola);
  
  // Desenho da Raquete
  fill(255);
  rect(raqueteX, raqueteY, larguraRaquete, alturaRaquete);
  
  // Desenho do Placar
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
      
      if (bolaX + raio > b.x && bolaX - raio < b.x + larguraBloco &&
          bolaY + raio > b.y && bolaY - raio < b.y + alturaBloco) {
    
          b.vivo = false; 
          pontos += 10;
          somColisao.play();
    
          if (bolaX > b.x && bolaX < b.x + larguraBloco) {
              velocidadeBolaY *= -1; 
          } else {
              velocidadeBolaX *= -1; 
          }
    
          blocosQuebrados++;
          if (blocosQuebrados % 5 === 0) {
              velocidadeBolaX *= 1.2;
              velocidadeBolaY *= 1.2;
          }
      }
      
      fill(255, 0, 0);
      rect(b.x, b.y, larguraBloco, alturaBloco);
      
      if (blocosvivos == 0) {
      win.play(); // Toca o som apenas UMA vez no frame exato da vitória
      tela = 3;
      }
    }
  }

  if (blocosvivos == 0) {
    tela = 3;
  }
}

function movimentarBolinha() {
  bolaX += velocidadeBolaX;
  bolaY += velocidadeBolaY;
  
  // Colisão com as bordas laterais
  if (bolaX < 0 || bolaX > largura) {
    velocidadeBolaX *= -1;
  }
  
  //Colisão com o topo
  if (bolaY < 0) {
    velocidadeBolaY *= -1;
  }
  
  // Game Over se a bola cair
  
  
  if (bolaY > altura) {
    fimJogo.play();
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
  if (bolaY > raqueteY - raio && bolaX > raqueteX && bolaX < raqueteX + larguraRaquete) {
    velocidadeBolaY *= -1;
    bolaY = raqueteY - raio; // Ajusta a posição para não grudar na raquete por conta do raio
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
  // Zera o array de blocos
  blocos = []; 
  // Cria uma grade de 9 colunas (i) por 5 linhas (j)
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
  blocosQuebrados = 0; 
  bolaX = 287;
  bolaY = 362;
  raqueteX = 250;
  raqueteY = 370;
  velocidadeBolaX = 2; 
  velocidadeBolaY = 2; 
  gerarBlocos(); 
  tela = 0; 
}
