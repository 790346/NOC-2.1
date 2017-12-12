function Mover(loc, vel, rad, clr, acc){
  this.loc = loc;
  this.vel = vel;
  this.rad = rad;
  this.clr = clr;
  this.acc = acc;
}

function Attractor(loc,vel,len,clr){
  this.loc = loc;
  this.vel = vel;
  this.len = len;
  this.clr = clr;
}

function Repeller(loc,vel,len,clr){
  this.loc = loc;
  this.vel = vel;
  this.len = len;
  this.clr = clr;
}

Mover.prototype.update = function(){
  this.loc.add(this.vel);
  this.vel.add(this.acc);
  if(this.loc.x <= this.rad*2){
      this.vel.x *= -1;
  }
  if(this.loc.y <= this.rad*2){
      this.vel.y *= -1;
  }
  if(this.loc.x >= window.innerWidth - this.rad*2){
      this.vel.x *= -1;
  }
  if(this.loc.y >= window.innerHeight - this.rad*2){
      this.vel.y *= -1;
  }
  this.render();
}

Mover.prototype.render = function(){
  console.log(this);
  ctx.fillStyle = this.clr;
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.rad, Math.PI*2,0,false);
  ctx.stroke();
  ctx.fill();
}

// Mover.prototype.applyForce = function(JSVector force){
//   var desired = JSVector.subGetNew(this.vel, Attractor);
//   var steer = JSVector.subGetNew(this.vel)
//   this.acc.add(force);
// }

Attractor.prototype.update = function(){
  this.loc.add(this.vel);
  if(this.loc.x < 0){
    this.loc.x = window.innerWidth - this.len;
  }
  if(this.loc.y < 0){
    this.loc.y = window.innerHeight - this.len;
  }
  if(this.loc.x > (this.len + window.innerWidth)){
    this.loc.x = 0;
  }
  if(this.loc.y > (this.len + window.innerHeight)){
    this.loc.y = 0;
  }
  this.render();
}

Repeller.prototype.update = function(){
  this.loc.add(this.vel);
  if(this.loc.x < 0){
    this.loc.x = window.innerWidth - this.len;
  }
  if(this.loc.y < 0){
    this.loc.y = window.innerHeight - this.len;
  }
  if(this.loc.x > (this.len + window.innerWidth)){
    this.loc.x = 0;
  }
  if(this.loc.y > (this.len + window.innerHeight)){
    this.loc.y = 0;
  }
  this.render();
}

Attractor.prototype.render = function(){
  ctx.fillStyle = this.clr;
  ctx.beginPath();
  ctx.rect(this.loc.x, this.loc.y, this.len, this.len);
  ctx.stroke();
  ctx.fill();
}

Repeller.prototype.render = function(){
  ctx.fillStyle = this.clr;
  ctx.beginPath();
  ctx.rect(this.loc.x, this.loc.y, this.len,this.len);
  ctx.stroke();
  ctx.fill();
}

Mover.prototype.applyForce = function(force){
  this.vel.add(force);
}
//http://natureofcode.com/book/chapter-2-forces/
