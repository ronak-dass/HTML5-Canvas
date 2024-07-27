let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

function getDistance(x1, x2, y1, y2) {
    let xDistance = x2 - x1
    let yDistance = y2 - y1

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        c.fill()
        c.fillStyle = this.color
    }

    update() {
        this.draw()
    }
}

let circle1 = new Circle(500, 500, 80, 'white')
let circle2 = new Circle(mouse.x, mouse.y, 40, 'white')

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)
    // c.fillText('HI ! How are you ?', mouse.x + 20, mouse.y - 20)
    // c.fillStyle = 'white'

    circle1.update()
    circle2.x = mouse.x
    circle2.y = mouse.y
    circle2.update()


    if(getDistance(circle1.x, circle2.x, circle1.y, circle2.y) < circle1.radius + circle2.radius ){
        circle2.color = 'red'
    }else {
        circle2.color = this.color
    }
    
}

animate()