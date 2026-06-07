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

//Som
let somColisao;
let fimJogo;
let win;

//Bola
let bola;

class Bola {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 15;
    this.raio = this.tamanho / 2;
    this.velX = 2;
    this.velY = 2;
  }

  desenhar() {
    fill(255);
    ellipse(this.x, this.y, this.tamanho);
  }

  mover() {
    this.x += this.velX;
    this.y += this.velY;
    
    //Colisão com as bordas laterais
    if (this.x - this.raio < 0 || this.x + this.raio > largura) {
      this.velX *= -1;
    }
    
    //Colisão com o topo
    if (this.y - this.raio < 0) {
      this.velY *= -1;
    }
    
    //Game Over se a bola cair
    if (this.y > altura) {
      fimJogo.play();
      tela = 2;
    }
  }

  checarColisaoRaquete(raqueteX, raqueteY, larguraRaquete) {
    if (this.y > raqueteY - this.raio && this.x > raqueteX && this.x < raqueteX + larguraRaquete) {
      this.velY *= -1;
      this.y = raqueteY - this.raio; // Ajusta posição para não grudar na raquete
    }
  }
}

function preload() {
  somColisao = loadSound('colisao.mp3');
  fimJogo = loadSound('gameover_1.mp3');
  win = loadSound('vitoria.mp3');
}

function setup() {
  createCanvas(largura, altura);
  travaFimRaquete = largura - larguraRaquete;
  gerarBlocos(); 
  bola = new Bola(287, 362);
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
  else if (tela == 4) {
    sobre();
  }
}

function sobre() {
  textAlign(CENTER);
  text("Sistema de Pontuação: Cada bloco destruído soma 10 pontos", largura/2, altura/2 - 40);
  text("Condição de Vitória: Quebrar todos os blocos existentes", largura/2, altura/2 - 20);
  text("Game Over: O jogo finaliza caso a bolinha ultrapasse a linha da raquete.", largura/2, altura/2);
  text("Pressione M para voltar ao menu", largura/2, altura/2 + 80);
  text("Jogo feito por", largura/2, altura/2 + 140);
  text("Felipe Luiz Pacheco", largura/2, altura/2 + 160);
  
  if (keyIsDown(77)) {
    tela = 0;
  }
  
}

function menu() {
  textAlign(CENTER);
  textSize(32);
  text("BREAKOUT", largura/2, altura/2);
  textSize(16);
  text("Instruções: Use as SETAS para mover a raquete", largura/2, altura/2 + 40);
  text("Pressione ENTER para começar", largura/2, altura/2 + 80);
  text("Pressione S para ver a tela sobre", largura/2, altura/2 + 100);
  
  if (keyIsDown(ENTER)) {
    tela = 1;
  }
  if (keyIsDown(83)) {
    tela = 4;
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

function gerenciarBlocos() {
  let blocosvivos = 0; 

  for (let i = 0; i < blocos.length; i++) {
    let b = blocos[i];
    if (b.vivo) {
      blocosvivos++; 
      
      //Validar se a bolinha tocou nos blocos
      if (bola.x + bola.raio > b.x && bola.x - bola.raio < b.x + larguraBloco &&
          bola.y + bola.raio > b.y && bola.y - bola.raio < b.y + alturaBloco) {
    
          b.vivo = false; 
          pontos += 10;
          somColisao.play();
    
          //Muda a direção da bolinha
          if (bola.x > b.x && bola.x < b.x + larguraBloco) {
              bola.velY *= -1; 
          } else {
              bola.velX *= -1; 
          }
    
          blocosQuebrados++;
          if (blocosQuebrados % 5 === 0) {
              bola.velX *= 1.2;
              bola.velY *= 1.2;
          }
      }
      
      fill(255, 0, 0);
      rect(b.x, b.y, larguraBloco, alturaBloco);
    }
  }

  //Condição de vitória
  if (blocosvivos == 0) {
    win.play();
    tela = 3;
  }
}

function movimentarRaquete() {
  if (keyIsDown(LEFT_ARROW) && raqueteX > 0){
    raqueteX -= 5;
  } else if(keyIsDown(RIGHT_ARROW) && raqueteX < travaFimRaquete){
    raqueteX += 5;
  }
}

function executarJogo() {
  gerenciarBlocos();
  movimentarRaquete();
  
  bola.mover();
  bola.checarColisaoRaquete(raqueteX, raqueteY, larguraRaquete);
  bola.desenhar();
  
  //Desenho da Raquete
  fill(255);
  rect(raqueteX, raqueteY, larguraRaquete, alturaRaquete);
  
  //Desenho do Placar
  fill(0);
  textAlign(LEFT);
  textSize(12);
  text("Pontos: " + pontos, 20, 20);
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

function reiniciar() {
  pontos = 0;
  blocosQuebrados = 0; 
  raqueteX = 250;
  raqueteY = 370;
  bola = new Bola(287, 362); 
  gerarBlocos(); 
  tela = 0; 
}
