// variáveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 15;
let raioBolinha = dBolinha / 2;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis raquete Jogador
let xRaqueteJogador = 5;
let yRaqueteJogador = 150;
let wRaquete = 10;
let hRaquete = 90;
let raioRaquete = wRaquete / 2

// variáveis raquete Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// variável colisão
colidiu = false;

// dificuldade oponente
let chanceDeErrar = 0;

// placar
let pontosJogador = 0;
let pontosOponente = 0;

// tamanho da tela
function setup() {
  createCanvas(600, 400);
}

// desenha bolinha
function mostraBolinha(){
  circle(xBolinha, yBolinha, dBolinha);
}

// bug bolinha
function bolinhaNaoFicaPresa(){
    if (xBolinha - raioBolinha < 0){
    xBolinha = 23
    }
}


// mostra raquete Jogador/Oponente
function mostraRaquete(){
  rect(xRaqueteJogador, yRaqueteJogador, wRaquete, hRaquete);
  rect(xRaqueteOponente, yRaqueteOponente, wRaquete, hRaquete);
}

// velocidade da bolinha
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

// controles do Jogador 1
function movimentaRaqueteJogador1(){
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteJogador += 5;
  }
  if (keyIsDown(UP_ARROW)){
    yRaqueteJogador += -5;
  }
}

// controles do Jogador 2
/*
function movimentaRaqueteJogador2(){
  if (keyIsDown("87")){
    yRaqueteOponente += -5;
  }
  if (keyIsDown("83")){
    yRaqueteOponente += 5;
  }
}
*/

// controles BOT

function movimentaRaqueteBOT(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - wRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calcularChanceDeErrar()
}


function calcularChanceDeErrar(){
  if (pontosOponente >= pontosJogador) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

// colisão da bolinha na borda
function verificaColisaoBorda(){
  if (xBolinha + raioBolinha > width || xBolinha < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raioBolinha > height || yBolinha - raioBolinha < 0){
    velocidadeYBolinha *= -1;
  }
}

// colisão raquete
function verificaColisaoRaqueteBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raioBolinha);
  if (colidiu){
    velocidadeXBolinha *= -1;
  }
}

// placar
function includePlacar(){
  stroke(255);
  fill(255);
  textSize(20);
  textAlign(CENTER);
  fill(color(255, 111, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(pontosJogador, 170, 27);
  fill(color(255, 111, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 27);
}

// altera os pontos
function adicionarPontos(){
  if (xBolinha + raioBolinha < 5)
    pontosOponente += 1;
  if (xBolinha + raioBolinha > 600)
    pontosJogador += 1;
}

// chama as funções
function draw(){
  background(0);
  mostraBolinha();
  mostraRaquete();
  movimentaBolinha();
  movimentaRaqueteJogador1();
  //movimentaRaqueteJogador2();
  movimentaRaqueteBOT();
  verificaColisaoBorda();
  verificaColisaoRaqueteBiblioteca(xRaqueteJogador, yRaqueteJogador);
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  adicionarPontos();
  includePlacar();
}