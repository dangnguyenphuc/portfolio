<template>
    <main>
        <canvas id="myCanvas" width="1024" height="576" style="border: 1px solid #000;"></canvas>
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
        const firstY = -1000;
        
        const img = new Image();
        img.src = 'rpg-assets/Images/main-map.png';
        img.onload = () => {
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, x, y);

                if (x > firstX)
                {
                    x -= Math.min(20, x - firstX);
                }

                if (x > firstX)
                {
                    requestAnimationFrame(animate);
                } 
            };
            animate();
        }
    },
  };
</script>

<style scoped>
</style>