window.onload = init;
var movers = [];
var ctx;
var canvas;
var attractor;
var repeller;

function init(){
  canvas = document.getElementById('cnv')
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid red 3px';
  canvas.style.backgroundColor = 'red';
  ctx = canvas.getContext('2d');
  createMovers(10);
  createAttractor();
  createRepeller();
  animate();
}

function animate(){

  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  for(let i = 0; i < movers.length; i++){
    movers[i].update();
    if(Math.abs(movers[i].loc.x - attractor.loc.x) <= 100 && Math.abs(movers[i].loc.y - attractor.loc.y <=100)){
      var desired = JSVector.subGetNew(attractor.loc, movers[i].loc);
      desired.normalize();
      desired.mult(3);
      var steer = JSVector.subGetNew(desired, movers[i].vel);
      movers[i].applyForce(steer);
      //this.vel.add(steer);
      movers[i].vel.add(movers[i].acc);
      movers[i].loc.add(movers[i].vel);
    }
    if(Math.abs(movers[i].loc.x - repeller.loc.x) <= 100 && Math.abs(movers[i].loc.y - repeller.loc.y) <=100){
      var desired = JSVector.subGetNew(repeller.loc, movers[i].loc);
      desired.normalize();
      desired.mult(3);
      var steer = JSVector.subGetNew(movers[i].vel, desired);
      movers[i].applyForce(steer);
      //this.vel.add(steer);
      movers[i].vel.add(movers[i].acc);
      movers[i].loc.add(movers[i].vel);
    }
  }
  attractor.update();
  repeller.update();

  requestAnimationFrame(animate);
}

function createMovers(numMovers){
  for(let i = 0; i < numMovers; i++){
    var radius = Math.random() *10 + 1;
    var x = Math.random()*window.innerWidth;
    var y = Math.random()*window.innerHeight;
    var dx = Math.random()*10;
    var dy = Math.random()*10;
    movers.push(new Mover(new JSVector(x,y), new JSVector(dx,dy), radius, 'green', new JSVector(0,0)));
  }
}

function createAttractor(){
  var len = 50;
  var x = Math.random() * window.innerWidth;
  var y = Math.random()*window.innerHeight;
  var dx = Math.random()*7.5;
  var dy = Math.random()*7.5;
  attractor = new Attractor(new JSVector(x,y), new JSVector(dx,dy), len, 'blue');
}

function createRepeller(){
  var len = 50;
  var x = Math.random() * window.innerWidth;
  var y = Math.random()*window.innerHeight;
  var dx = Math.random()*7.5;
  var dy = Math.random()*7.5;
  repeller = new Repeller(new JSVector(x,y), new JSVector(dx,dy), len, 'black');
}
