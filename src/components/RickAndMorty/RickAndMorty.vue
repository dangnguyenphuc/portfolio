<template>
    <main>
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
  import { onMounted } from 'vue';
  
  export default {
    name: 'Main',
    setup() {
        const angle = (cx: number, cy: number, ex: number, ey: number): number => {
            const dy = ey - cy;
            const dx = ex - cx;
            const rad = Math.atan2(dx, dy);
            const deg = (rad * 180) / Math.PI;
            return deg;
        };

        onMounted(() => {
            const eyeElements = document.querySelectorAll('.eye');
            const anchor = document.getElementById('anchor');
            const anchorRect = anchor?.getBoundingClientRect();
            let anchorX = 0;
            let anchorY = 0;
            if (anchorRect) {
                anchorX = (anchorRect.left + anchorRect.width / 2) | 0;
                anchorY = (anchorRect.top + anchorRect.height / 2) | 0;
            }

            document.addEventListener('mousemove', (e: MouseEvent) => {
                const angleDeg = angle(e.clientX, e.clientY, anchorX, anchorY);
                const eyeElements = document.querySelectorAll('.eye');
                eyeElements.forEach((eye) => {
                (eye as HTMLElement).style.transform = `rotate(${90-angleDeg}deg)`;
                }); 
                
                (anchor as HTMLElement).style.filter = `hue-rotate(${90-angleDeg}deg)`; 
            });
            
        });
  
        return {
      
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