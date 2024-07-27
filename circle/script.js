let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: innerWidth/2,
    y: innerHeight/2
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

function range(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 7;
        this.radian = Math.random() * Math.PI * 2;
        this.velocity = 0.04;
        this.range = range(20, 199);
        this.lastMouse = {x: this.x, y: this.y}

    }

    draw(lastPoint) {
        c.beginPath();
        c.strokeStyle = 'green';
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }
    update() {
        let lastPoint = {
            x: this.x,
            y: this.y
        }
        this.radian += this.velocity;
        
        // Drag Effect
        this.lastMouse += (mouse.x - this.lastMouse.x) * 0.5;
        this.lastMouse += (mouse.y - this.lastMouse.y) * 0.5;

        this.x = mouse.x + Math.cos(this.radian) * this.range;
        this.y = mouse.y + Math.sin(this.radian) * this.range;
        
        this.draw(lastPoint)
    }
}

let particles = [];

for(let i = 0; i < 20; i++){
    particles.push(new Particle(mouse.x, mouse.y));
}


function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255, 255, 255, 0.05)'
    c.fillRect(0, 0, innerWidth, innerHeight);
    particles.forEach( p => {
        p.update();
    })

}

animate();