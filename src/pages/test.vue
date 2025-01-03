<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>Canvas Example</v-card-title>
            <v-card-text>
              <canvas id="myCanvas" width="400" height="300" style="border: 1px solid #000;"></canvas>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    mounted() {
      const canvas = document.getElementById('myCanvas');
      const ctx = canvas.getContext('2d');
      
      // Draw a rectangle
      ctx.fillStyle = 'blue';
      ctx.fillRect(50, 50, 200, 100);
      
      // Draw a circle
      ctx.beginPath();
      ctx.arc(150, 150, 40, 0, Math.PI * 2, false);
      ctx.fillStyle = 'red';
      ctx.fill();
    },
  };
  </script>
  
  <style scoped>
  canvas {
    display: block;
    margin: auto;
  }
  </style>
  