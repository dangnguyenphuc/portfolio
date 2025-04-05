<template>
    <main>
        <canvas id="myCanvas" :width="pokeCanvasWidth" :height="pokeCanvasHeight"></canvas>
    </main>
</template>

<script lang="ts">
import { useDisplay } from 'vuetify'

import map from '../../public/rpg-assets/Tiled/main-map.json';

const VELOCITY = 3;

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
  add(coord: Coordinate2D) {
    this.x += coord.x;
    this.y += coord.y;
  }

  // Method to subtract another coordinate from this one
  subtract(coord: Coordinate2D) {
    this.x -= coord.x;
    this.y -= coord.y;
  }

  // Method to calculate distance to another coordinate
  distanceTo(coord: Coordinate2D): number {
    return Math.sqrt(Math.pow(this.x - coord.x, 2) + Math.pow(this.y - coord.y, 2));
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

    draw(ctx: CanvasRenderingContext2D, offset: Coordinate2D)
    {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x + offset.x, this.position.y + offset.y, this.width, this.height);
        // console.log("Draw at", this.position.x + offset.x, this.position.y + offset.y)
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

    draw(ctx: CanvasRenderingContext2D, offset: Coordinate2D = new Coordinate2D(0,0))
    {
        ctx.drawImage(this.image, this.position.x + offset.x, this.position.y + offset.y);
    }

    drawPlayer(ctx: CanvasRenderingContext2D, image:HTMLImageElement, animation: number[] = [1,1], offset: Coordinate2D = new Coordinate2D(0,0))
    {
        ctx.drawImage(
            image, 
            0,
            0,
            image.width/animation[0],
            image.height/animation[1],
            this.position.x + offset.x,
            this.position.y + offset.y,
            image.width/animation[0],
            image.height/animation[1]
        );
    }
}

class Map {
    mapSprite: Sprite;
    offset: Coordinate2D;
    boundaries: Boundary[];

    constructor(position: Coordinate2D, image: HTMLImageElement, boundaries: Boundary[], offset: Coordinate2D = new Coordinate2D(0,0)) {
        this.mapSprite = new Sprite(position, image);
        this.offset = offset;
        this.boundaries = boundaries;
        // console.log(this.boundaries);
    }

    draw(ctx: CanvasRenderingContext2D)
    {
        this.mapSprite.draw(ctx, this.offset);
        this.boundaries.forEach(boundary => {
            boundary.draw(ctx, this.offset);
        });
    }

    updateOffset(offset: Coordinate2D = new Coordinate2D(0,0))
    {
        this.offset.add(offset);
    }
}

class Player {
    lastKey: string = '';
    keys = {
        w: {
            pressed: false,
        },
        a: {
            pressed: false,
        },
        s: {
            pressed: false,
        },
        d: {
            pressed: false,
        },
    };
    sprite: Sprite;
    
    constructor(position: Coordinate2D, image: HTMLImageElement)
    {
        this.sprite = new Sprite(position, image);

        window.addEventListener("keydown", (e) => {
            switch(e.key)
            {
                case 'w':
                    this.keys.w.pressed = true;
                    this.keys.a.pressed = false;
                    this.keys.s.pressed = false;
                    this.keys.d.pressed = false;
                    this.lastKey = 'w';
                    break;
                case 's':
                    this.keys.w.pressed = false;
                    this.keys.a.pressed = false;
                    this.keys.s.pressed = true;
                    this.keys.d.pressed = false;
                    this.lastKey = 's';
                    break
                case 'd':
                    this.keys.w.pressed = false;
                    this.keys.a.pressed = false;
                    this.keys.s.pressed = false;
                    this.keys.d.pressed = true;
                    this.lastKey = 'd';
                    break;
                case 'a':
                    this.keys.w.pressed = false;
                    this.keys.a.pressed = true;
                    this.keys.s.pressed = false;
                    this.keys.d.pressed = false;
                    this.lastKey = 'a';
                    break
                default:
                    break;
                
            }
        });

        window.addEventListener("keyup", (e) => {
            switch(e.key)
            {
                case 'w':
                    this.keys.w.pressed = false;
                    break;
                case 's':
                    this.keys.s.pressed = false;
                    break
                case 'd':
                    this.keys.d.pressed = false;
                    break;
                case 'a':
                    this.keys.a.pressed = false;
                    break
                default:
                    break;
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D, map: Map)
    {
        this.control(map.offset)
        this.sprite.drawPlayer(ctx, this.sprite.image, [4,1], map.offset)
    }

    control(offset: Coordinate2D)
    {
        if (this.keys.w.pressed && this.lastKey == 'w')
        {
            this.sprite.position.y -= VELOCITY;
            offset.y += VELOCITY;
        }   
        else if (this.keys.a.pressed && this.lastKey == 'a')
        {
            this.sprite.position.x -= VELOCITY;
            offset.x += VELOCITY;
        }   
        else if (this.keys.s.pressed && this.lastKey == 's')
        {
            this.sprite.position.y += VELOCITY;
            offset.y -= VELOCITY;
        }   
        else if (this.keys.d.pressed && this.lastKey == 'd')
        {
            this.sprite.position.x += VELOCITY;
            offset.x -= VELOCITY;
        }   
    }
}

export default {
    name: "PokemonGame",
    setup: () => {
        const {lgAndUp, md, smAndDown} = useDisplay();
        return {
            lgAndUp,
            md,
            smAndDown
        }
    },
    mounted() {
        const boundaries: Boundary[] = []
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const collision = map.layers.find(element => element.name=='Collision');
        if (!collision)
        {
            ctx.fillText('ERROR 101', 0, 0); 
            return;
        }
        else if (!collision.data)
        {
            ctx.fillText('ERROR 102', 0, 0); 
            return;
        }

        collision.data.forEach((element, i) => {
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

        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const img = new Image();
        img.src = 'rpg-assets/Images/main-map.png';

        const playerImg = new Image();
        playerImg.src = '/rpg-assets/Images/playerDown.png';
        
        let mainMap = new Map(new Coordinate2D(-3100, -950), img, boundaries);
        let player = new Player(new Coordinate2D(canvas.width/2 - playerImg.width/2, canvas.height/2 - playerImg.height/2), playerImg);

        function animate()
        {
            window.requestAnimationFrame(animate);
            mainMap.draw(ctx);
            player.draw(ctx, mainMap);
            // ctx.drawImage(playerImg, 
            //     0,
            //     0,
            //     playerImg.width/4,
            //     playerImg.height,
            //     canvas.width/2 - playerImg.width/2, 
            //     canvas.height/2 - playerImg.height/2,
            //     playerImg.width/4,
            //     playerImg.height
            // );
            
        }

        animate();
    },

    computed: {
        pokeCanvasWidth()
        {
            if (this.lgAndUp)
            {
                return 1024;
            }

            if (this.md)
            {
                return 896;
            }

            if (this.smAndDown)
            {
                return 400;
            }
        },
        pokeCanvasHeight()
        {
            if (this.lgAndUp)
            {
                return 576;
            }

            if (this.md)
            {
                return 504;
            }

            if (this.smAndDown)
            {
                return 300;
            }
        }
    },

    methods: {

    }
  };
</script>

<style scoped>
</style>