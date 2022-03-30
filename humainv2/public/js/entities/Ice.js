import Shape from './Shape.js';

export default class Ice extends Shape {
  
  draw(ctx) {    
    const width = 512;
    const height = 512;
    const resizeFactor = 0.3;
    ctx.drawImage(document.querySelector('#ice'), this.x - width * resizeFactor/2, this.y  - height * resizeFactor/2, width * resizeFactor, height * resizeFactor);

    // super veut dire que l'on apelle la méthode draw de la classe parent
    // donc de la classe Shape puisque l'on a fait "extends Shape"
    // cela permet  de modifier légérement une methode existante de la classe parente        
    super.draw(ctx);
  }

}