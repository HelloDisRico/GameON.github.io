//Create Canvas
const canvas = document.querySelector('canvas') 
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillRect(0,0, canvas.width, canvas.height)

const gravity = 0.7

//Character
class Sprite {
    constructor({position, velocity, color = 'red', offset}) {
     this.position = position
     this.velocity = velocity
     this.height = 150
     this.width = 50    
     this.lastKey
     this.attackBox = {
        position:{
            x: this.position.x ,
            y: this.position.y ,
        },
        offset,
        width: 100,
        height: 50,
        }
        this.color = color
        this.isAttacking
    }

    draw() {
      context.fillStyle = this.color 
      context.fillRect(this.position.x, this.position.y, this.width, this.height)

      // Attack box
      if(this.isAttacking){
      context.fillStyle = 'green',
      context.fillRect(
        this.attackBox.position.x,
         this.attackBox.position.y,
         this.attackBox.width, 
         this.attackBox.height)
      }
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y// Over time, the Y position is adding 10 pixels on to it for each frame loop over.
         
        // Prevents the character from falling off the Canvas
        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity

    }
    attack(){
      this.isAttacking = true  
      setTimeout(() => {
        this.isAttacking = false
      }, 100)
    }
}

const player = new Sprite({
    position:{
x:0,
y:0
},
velocity: {
    x: 0,
    y: 0
},
offset: {
    x:0 ,
    y:0 ,
}
})


const enemy = new Sprite({
    position:{
x:700,
y:0
},
velocity: {
    x: 0,
    y: 0
},
color: 'blue',
offset: {
    x: 50,
    y: 0,
}

})

const keys = {
a: {
    pressed:false
},
d: {
    pressed:false
},

j: {
    pressed:false
},
l: {
    pressed:false
} 
}
let lastKey

function rectangularCollision({ rectangle1, rectangle2 }) {
return (        
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height

 
 
    )
}

function animate() { // Game Loop
  window.requestAnimationFrame(animate)
  context.fillStyle = 'black'
  context.fillRect(0,0, canvas.width,canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

// Player Movement
  if(keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -3
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 3
  }

  // Enemy Movement
  if(keys.j.pressed && enemy.lastKey === 'j') {
    enemy.velocity.x = -3
  } else if (keys.l.pressed && enemy.lastKey === 'l') {
    enemy.velocity.x = 3
  }

  // Collision Detection
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking
        ) {
        player.isAttacking = false
        console.log('go')
    }

    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking
        ) {
        enemy.isAttacking = false
        console.log('enemy attack yes')
    }


}

animate()
// Key Inputs
window.addEventListener('keydown',(event) => {
    switch (event.key) {
        case 'd' :
        keys.d.pressed = true
        player.lastKey = 'd'
        break
        case 'a' :
        keys.a.pressed = true
        player.lastKey = 'a'
        break
        case 'w' :
        player.velocity.y =-20
        break
        case' ':
        player.attack()
        break
        


        case 'l' :
        keys.l.pressed = true
        enemy.lastKey = 'l'
        break
        case 'j' :
        keys.j.pressed = true
        enemy.lastKey = 'j'
        break
        case 'i' :
        enemy.velocity.y =-20
        break
        case 'k' :
        enemy.isAttacking = true
        break
    }
    })
   

window.addEventListener('keyup',(event) => {
    switch (event.key) {
        case 'd' :
        keys.d.pressed = false
        break
        case 'a' :
        keys.a.pressed = false
        break
}

// Enemy Keys
    switch (event.key) {
        case 'l' :
        keys.l.pressed = false
        break
        case 'j' :
        keys.j.pressed = false
        break




    }
    })