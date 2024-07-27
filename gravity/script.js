let canvas = document.querySelector('canvas')

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext('2d')

let colorArray = ['#F6FB7A', '#B4E380', '#88D66C', '#73BBA3']


class Ball {
    constructor(x, y, dy, radius, gravity, friction) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.radius = radius;
        this.gravity = gravity;
        this.friction = friction;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill()
    }

    update() {
        if (this.y + this.radius > canvas.height) {  // this logic for bouncing the ball
            this.dy = -this.dy * this.friction;
        } else {
            this.dy += this.gravity;
        }

        this.y += this.dy;

        this.draw();
    }

}

let ballArray = [];

for(let i = 0; i < 200; i++) {
let x = Math.random() * (innerWidth);
let y = Math.random() * (innerHeight);
let dy = Math.random() * 2 + 1;
let radius = Math.random() * 20 + 1;
let gravity = 0.4;
let friction = 0.99;
ballArray.push(new Ball(x, y, dy, radius, gravity, friction))
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < 200; i++) {        
        ballArray[i].update();
 }

}

animate()