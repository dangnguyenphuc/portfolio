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

        const img = new Image();
        img.src = 'rpg-assets/Images/main-map.png';
        img.onload = () => {
          ctx.drawImage(img, 0 ,0);
        }
    },
  };

</script>

<style scoped>
</style>