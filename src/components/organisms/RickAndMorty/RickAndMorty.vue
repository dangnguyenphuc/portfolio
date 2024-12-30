<template>
    <main @mousemove="handleMouseMove">
  <div class="d-flex align-center justify-content-center align-items-center">
    <img id="anchor" src="/morty-icon/morty.png">
    <div id="eyes">
      <img class="eye rick-eye-1" src="/morty-icon/eye.png">
      <img class="eye rick-eye-2" src="/morty-icon/eye.png">
      <img class="eye morty-eye-1" src="/morty-icon/eye.png">
      <img class="eye morty-eye-2" src="/morty-icon/eye.png">
    </div>
  </div>
    </main>
  
  
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'Main',
    setup() {
      const mouseX = ref(0);
      const mouseY = ref(0);
  
      const anchor = document.getElementById('anchor');
      const anchorRect = anchor?.getBoundingClientRect();
      let anchorX = 0;
      let anchorY = 0;
      if (anchorRect) {
        anchorX = (anchorRect.left + anchorRect.width / 2) | 0;
        anchorY = (anchorRect.top + anchorRect.height / 2) | 0;
      }
      
  
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.value = e.clientX;
        mouseY.value = e.clientY;
        const angleDeg = angle(mouseX.value, mouseY.value, anchorX, anchorY);
        const eyeElements = document.querySelectorAll('.eye');
        eyeElements.forEach((eye) => {
          (eye as HTMLElement).style.transform = `rotate(${90-angleDeg}deg)`;
        }); 
  
        const anchor = document.getElementById('anchor');
        (anchor as HTMLElement).style.filter = `hue-rotate(${90-angleDeg}deg)`; 
      };
  
      const angle = (cx: number, cy: number, ex: number, ey: number): number => {
        const dy = ey - cy;
        const dx = ex - cx;
        const rad = Math.atan2(dx, dy);
        const deg = (rad * 180) / Math.PI;
        return deg;
      };
  
      return {
        mouseX,
        mouseY,
        handleMouseMove
      };
    },
  };
  </script>
  
  
  <style>
  
  #eyes, #eyes img {
    position: absolute;
    height: 32px;
  }
  
  .rick-eye-1 {
    position: absolute;
    top: -65px;
    left: 351px;
  }
  
  .rick-eye-2 {
    position: absolute;
    top: -70px;
    left: 415px;
  }
  
  
  .morty-eye-1 {
    position: absolute;
    top: 85px;
    left: 195px;
  }
  
  .morty-eye-2 {
    position: absolute;
    top: 75px;
    left: 265px;
  }
  
  </style>