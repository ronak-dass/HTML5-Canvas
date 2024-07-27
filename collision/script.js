let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})
let colors = ['#10439F', '#874CCC', '#C65BCF', '#F27BBD']

function randomColors(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function distance(x1, y1, x2, y2) {
    let xDistance = x2 - x1
    let yDistance = y2 - y1

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
let particles = [];

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: (Math.random() - 0.5) * 1,
            y: (Math.random() - 0.5) * 1
        }
        this.radius = radius;
        this.color = color;
        this.mass = 1;
        this.opacity = 0;
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill()
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
    }

    update(particles) {

        for (let i = 0; i < particles.length; i++) {
            if(this === particles[i]) continue;
            if(distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0){
                resolveCollision(this, particles[i]);
            }
            
        }

        if(this.x - this.radius < 0 || this.x > canvas.width - this.radius){
            this.velocity.x = -this.velocity.x;
        }
        if(this.y - this.radius < 0 || this.y > canvas.height - this.radius){
            this.velocity.y = -this.velocity.y
        }

        if(distance(mouse.x, mouse.y, this.x, this.y) < 100 && this.opacity < 0.7){
            this.opacity += 0.02;
        }else if(this.opacity > 0){
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity)
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;


        this.draw()
    }
}


for (let i = 0; i < 200; i++) {
    let radius = 10;
    let x = randomRange(radius, canvas.width - radius);
    let y = randomRange(radius, canvas.height - radius);
    let color = randomColors(colors);

    // logic to not overlaped circle
    if (i !== 0) {
        for (let j = 0; j < particles.length; j++) {
            if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                x = randomRange(radius, canvas.width - radius);
                y = randomRange(radius, canvas.height - radius);

                j = -1;
            }

        }
    }

    particles.push(new Particle(x, y, radius, color))

}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    particles.forEach((particle) => {
        particle.update(particles);
    })

}

animate()