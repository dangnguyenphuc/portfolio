<template>
    <main>
        <canvas id="myCanvas" width="1024" height="576"></canvas>
    </main>
</template>

<script lang="ts">
import map from '../../public/rpg-assets/Tiled/main-map.json';

class Coordinate2D {
  // Properties for x and y coordinates
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  // Method to set new coordinates
  set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  // Method to add another coordinate to this one
  add(coord: Coordinate2D): Coordinate2D {
    return new Coordinate2D(this.x + coord.x, this.y + coord.y);
  }

  // Method to subtract another coordinate from this one
  subtract(coord: Coordinate2D): Coordinate2D {
    return new Coordinate2D(this.x - coord.x, this.y - coord.y);
  }

  // Method to calculate distance to another coordinate
  distanceTo(coord: Coordinate2D): number {
    return Math.sqrt(Math.pow(this.x - coord.x, 2) + Math.pow(this.y - coord.y, 2));
  }

  // String representation of the coordinate
  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}

class Boundary {
    static width = 60;
    static height = 60;
    position: Coordinate2D;
    width: number;
    height: number;
    
    constructor(position: Coordinate2D, width: number, height: number)
    {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    draw(ctx: CanvasRenderingContext2D)
    {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

}

class Sprite {
    position: Coordinate2D;
    image: HTMLImageElement;

    constructor(position: Coordinate2D, image: HTMLImageElement)
    {
        this.position = position
        this.image = image
    }

    draw(ctx: CanvasRenderingContext2D)
    {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}

export default {

    mounted() {
        const collision = map.layers.find(element => element.name=='Collision')?.data
        const boundaries: Boundary[] = []

        collision?.forEach((element, i) => {
            if (element == 1025)
            {
                boundaries.push(new Boundary(
                    new Coordinate2D(
                        Math.floor(i/70)*Boundary.width,
                        i%70*Boundary.height
                    ),
                    Boundary.width,
                    Boundary.height
                ))
            }
        });

        console.log(boundaries);
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        let backgroundX = 0;
        let backgroundY = -1000;

        const img = new Image();
        img.src = 'rpg-assets/Images/main-map.png';

        const keys = {
            w : {
              pressed: false  
            },
            s : {
              pressed: false  
            },
            d : {
              pressed: false  
            },
            a : {
              pressed: false  
            }
        }
        
        const background = new Sprite(new Coordinate2D(-3100, -950), img);
        const playerImg = new Image();
        playerImg.src = '/rpg-assets/Images/playerDown.png';
        let lastKey = '';

        function animate()
        {
            window.requestAnimationFrame(animate);
            background.draw(ctx);
            ctx.drawImage(playerImg, 
                0,
                0,
                playerImg.width/4,
                playerImg.height,
                canvas.width/2 - playerImg.width/2, 
                canvas.height/2 - playerImg.height/2,
                playerImg.width/4,
                playerImg.height
            );

            if (keys.w.pressed && lastKey == 'w')
            {
                
            }   
            else if (keys.a.pressed && lastKey == 'a')
            {
                
            }   
            else if (keys.s.pressed && lastKey == 's')
            {
                
            }   
            else if (keys.d.pressed && lastKey == 'd')
            {
                
            }   
            
        }

        animate();

        window.addEventListener("keydown", (e) => {
            switch(e.key)
            {
                case 'w':
                    keys.w.pressed = true;
                    keys.a.pressed = false;
                    keys.s.pressed = false;
                    keys.d.pressed = false;
                    lastKey = 'w';
                    break;
                case 's':
                    keys.w.pressed = false;
                    keys.a.pressed = false;
                    keys.s.pressed = true;
                    keys.d.pressed = false;
                    lastKey = 's';
                    break
                case 'd':
                    keys.w.pressed = false;
                    keys.a.pressed = false;
                    keys.s.pressed = false;
                    keys.d.pressed = true;
                    lastKey = 'd';
                    break;
                case 'a':
                    keys.w.pressed = false;
                    keys.a.pressed = true;
                    keys.s.pressed = false;
                    keys.d.pressed = false;
                    lastKey = 'a';
                    break
                default:
                    break;
                
            }
        });

        window.addEventListener("keyup", (e) => {
            switch(e.key)
            {
                case 'w':
                    keys.w.pressed = false;
                    break;
                case 's':
                    keys.s.pressed = false;
                    break
                case 'd':
                    keys.d.pressed = false;
                    break;
                case 'a':
                    keys.a.pressed = false;
                    break
                default:
                    break;
                
            }
        });
    },
  };
</script>

<style scoped>
</style>