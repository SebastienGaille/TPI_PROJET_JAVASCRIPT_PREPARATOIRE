import Shape from './Shape.js';

export default class Background extends Shape {

    draw(ctx) {
        const width = 1000;
        const height = 1000;
        const resizeFactor = 0.3;
        ctx.drawImage(document.querySelector('#background'), this.x - width * resizeFactor / 2, this.y - height * resizeFactor / 2, width * resizeFactor, height * resizeFactor);
    }

    update(deltaT, dir) {
        const distX = 0.1 * deltaT * Math.cos(dir);
        const distY = 0.1 * deltaT * Math.sin(dir);
        this.x += distX;
        this.y += distY;
    }

}