var imgEstrada;
var carros = [];
var imgVeiculos = [];
var jogador;

class Veiculo{
  constructor(parametroY){
    this.imagem = imgVeiculos[int(random(0,3.9))];
    this.posX = 700;
    this.posY = parametroY;
    this.velocidade = random(5,10);
    this.largura = 100;
    this.altura = 50;
    
    this.yInicial = this.posY;
    this.yFinal = this.posY + this.altura;
    this.xInicial = this.posX;
    this.xFinal = this.posX+this.largura;
  }
  
  mova(){
    this.posX -= this.velocidade;
    image(this.imagem,this.posX,this.posY, this.largura, this.altura);
    this.yInicial = this.posY;
    this.yFinal = this.posY + this.altura;
    this.xInicial = this.posX;
    this.xFinal = this.posX+this.largura;
  }
}

class Jogador{
  constructor(){
    this.imagem = loadImage("imagem/hamster.png");
    this.posX = 200;
    this.posY = 300;
    this.velocidade = 5;
    this.largura = 30;
    this.altura = 50;
    this.yInicial = this.posY;
    this.yFinal = this.posY + this.altura;
    this.xInicial = this.posX;
    this.xFinal = this.posX+this.largura;
  }
  
  mova(){
    image(this.imagem,mouseX, mouseY,this.largura, this.altura);
    
    if((keyIsDown(38)) && (this.yInicial>0)){
      this.posY -= this.velocidade;
    }
    if((keyIsDown(40) && (this.yFinal<400))){
      this.posY += this.velocidade;
    }
    if((keyIsDown(39)) && (this.xFinal<600)){
      this.posX += this.velocidade;
    }
    if((keyIsDown(37)) && (this.xInicial>0)){
      this.posX -= this.velocidade;
    }
    
    this.yInicial = this.posY;
    this.yFinal = this.posY + this.altura;
    this.xInicial = this.posX;
    this.xFinal = this.posX + this.largura;
    
  }
}

function preload(){
  imgEstrada = loadImage("imagem/estrada.png");
  imgVeiculos[0] = loadImage("imagem/carro-1.png");
  imgVeiculos[1] = loadImage("imagem/carro-2.png");
  imgVeiculos[2] = loadImage("imagem/carro-3.png");
  imgVeiculos[3] = loadImage("imagem/vaca.png");
  carros[0] = new Veiculo(35);
  //carros[1] = new Veiculo(90);
  //carros[2] = new Veiculo(145);
  jogador = new Jogador();
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(imgEstrada);
  
  jogador.mova();
  
  for(let i=0;i < carros.length;i++){
    carros[i].mova();
    if (carros[i].posX < -100){
      carros[i] =new Veiculo(carros[i].posY);
    }
    
    if (((jogador.xInicial>carros[i].xInicial) &&
         (jogador.xInicial<carros[i].xFinal) ||
       (jogador.xFinal>carros[i].xInicial) && 
        (jogador.xFinal<carros[i].xFinal))
       &&
       ((jogador.yInicial>carros[i].yInicial) && 
        (jogador.yInicial<carros[i].yFinal) ||
       (jogador.yFinal>carros[i].yInicial) && 
        (jogador.yFinal<carros[i].yFinal))) {
      jogador = new Jogador();
    }
  }
  textSize(20);
  text("Tentativas",270,20);      
}
