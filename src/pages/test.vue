<template>
    <main>
        <canvas id="myCanvas" width="1024" height="576"></canvas>
    </main>
</template>

<script lang="ts">

export default {
    mounted() {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        let x = 0;
        let y = -1000;

        const firstX = -3100;
        const firstY = -950;
        
        const img = new Image();
        img.src = 'rpg-assets/Images/main-map.png';

        const playerImg = new Image();
        playerImg.src = '/rpg-assets/Images/playerDown.png';

        let firstLoad = true;

        img.onload = () => {
            // const animate = () => {
            //     if (firstLoad)
            //     {
            //         ctx.clearRect(0, 0, canvas.width, canvas.height);
            //         ctx.drawImage(img, x, y);

            //         if (x > firstX)
            //         {
            //             x -= Math.min(20, x - firstX);
            //             requestAnimationFrame(animate);
            //         } 
            //         else
            //         {
            //             firstLoad = false;
            //         }
            //     }
            //     else
            //     {
            //         ctx.drawImage(img, x, y);
            //         ctx.drawImage(playerImg, 0, 0);
            //     }
                 
            // };
            // animate();
            ctx.drawImage(img, firstX, firstY);
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


        }
    },
  };
</script>

<style scoped>
</style>