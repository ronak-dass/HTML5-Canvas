let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');


// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(200, 100, 50, 50);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(300, 100, 50, 50);

// for (let i = 0; i < 20; i++) {
//     let x = Math.random() * canvas.width;
//     let y = Math.random() * canvas.height;

//     let colorGenerator = '#';
//     for (let i = 0; i < 6; i++){
//         color = '1234567890abcdef';
//         colorGenerator += color.charAt(Math.floor(Math.random() * color.length))
//     }

//     c.fillStyle = colorGenerator;
//     c.fillRect(x, y, 50, 50);
// }

// Line

// c.beginPath();
// c.moveTo(50, 50);
// c.lineTo(300, 300);
// c.lineTo(500, 50);
// c.strokeStyle = 'green';
// c.stroke();

// Arc / Circle
// c.beginPath();
// c.arc(700, 200, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'rgba(255, 0, 0)';
// c.stroke();

// for(let i = 0; i < 30; i++){
//     let x = Math.random() * canvas.width;
//     let y = Math.random() * canvas.height;

//     let colorGenerator = '#';
//     for (let i = 0; i < 6; i++){
//         color = '1234567890abcdef';
//         colorGenerator += color.charAt(Math.floor(Math.random() * color.length))
//     }
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = colorGenerator;
//     c.stroke();
// }

let mouse = {
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight
}

let maxRadius = 40;
let minRadius = 2;

let colorArray = ['#77E4C8','#36C2CE','#478CCF','#4535C1']

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
            // c.strokeStyle = 'green';
            // c.stroke();
            c.fill();
            c.fillStyle = this.color;
        };

        this.update = function () {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            // Interactivity 
            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }

            this.draw();
        };
    }
}




let circleArray = [];

function init(){
    circleArray = [];

    for (let i = 0; i < 500; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < 500; i++) {
        circleArray[i].update();
    }

}
init();
animate();