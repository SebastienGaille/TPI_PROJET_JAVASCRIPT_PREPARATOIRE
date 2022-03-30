import Shape from './Shape.js';

export default class Player extends Shape {
  
  draw(ctx) {    
    const width = 277;
    const height = 300;
    const resizeFactor = 0.3;
    ctx.drawImage(document.querySelector('#player'), this.x - width * resizeFactor/2, this.y  - height * resizeFactor/2, width * resizeFactor, height * resizeFactor);
  }

  update(deltaT, dir, ctx) {
    const distX = this.speed * deltaT;
    if (dir === 'right') {      
      this.x += distX;
    } else if (dir === 'left') {
      this.x -= distX;
    }
    if(this.x<10){
      this.x=10;
    }
    if(this.x>ctx.canvas.width-10){
      this.x=ctx.canvas.width-10;
    }
  }

}