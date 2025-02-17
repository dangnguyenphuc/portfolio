<template>
    <div class="main-menu bg-yellow">no</div>
      
</template>
    
  <script lang="ts">
    import { defineComponent } from 'vue'
    import { useTheme } from 'vuetify'
    import type { Window } from '../Main.vue';
  
    export interface DataType{
      currentWindow: Number
    }
  
    export default defineComponent({
      name: 'HeaderMenu',
      setup() {
        const theme = useTheme();
        return { theme };
      },

      props:{
        // menuItems: {
        //     type: Array<Window>,
        //     default: [],
        //     required: true
        // }
      },
  
      computed: {
        iconValue() {
          return this.theme.global.name.value === 'light' ? 'mdi-lightbulb-off' : 'mdi-lightbulb-on';
        },
        backgroundValue() {
          return this.theme.global.name.value === 'light' ? 'light' : 'dark';
        }
      },
  
      components: {
      },
  
      data() {
        return {
        //   currentWindow: 0,
        };
      },
  
      methods: {
        // changeWindow(window: Window)
        // {
        //   this.$emit('changeWindow', window.id);
        //   this.currentWindow = window.id;
        // },   
  
        // toggleMenu ()
        // {
        //   this.$emit('changeWindow', this.menuItems.length);
        // },
  
        // toggleTheme() {
        //   this.theme.global.name.value = this.theme.global.name.value === 'light' ? 'dark' : 'light';
        // }
      }
    });
  </script>
    
  <style scoped>
    /* Add any additional styles if needed */
    .main-menu {
        background-image: url(/backgrounds/bg-main.png);
        height: 100vh;
        width: 100vw;
    }

    .menu-text {
      font-weight: bold;
      padding: 0px 2px;
    }
  
    .header-bar {
      min-height: 50px;
    }
  
    .theme-btn {
      clip-path: polygon(0 0, 100% 0, 100% 70%, 0% 100%);
      border-radius: 0px;
      min-height: 60px;
      font-size: 1.5rem;
    }
  
    .menu-btn {
      clip-path: polygon(0 30%, 100% 0, 100% 100%, 0% 100%);
      border-radius: 0px;
      font-size: 1.5rem;
      min-height: 60px;
    }
  
    .square-btn {
      width: 6%;
      color: #fff;
      cursor: pointer;
      z-index: 999;
    }
  
    @media (max-width: 1080px) {
      .theme-change-col {
        max-width: 200px;
      }
  
      .header-bar {
        min-height: 80px;
      }
      .square-btn {
        min-width: 10%;
        min-height: 80px;
      }
    }
  
    @media (max-width: 600px) {
      .square-btn {
        min-width: 15%;
      }
    }
  
    .slide-bg {
      position: relative;
      z-index: 1;
      cursor: pointer;
      transition: color 0.2s ease;
      font-weight: bold;
    }
  
    .slide-bg::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0;
      transition: width 0.3s ease;
      z-index: -1;
    }
  
    .light::before {
      background-color: #000;
    }
  
    .dark::before {
      background-color: #fff;
    }
  
    .slide-bg:hover::before {
      width: 100%;
    }
  
    .light:hover {
      color: #fff;
    }
  
    .dark:hover {
      color: #000;
    }
  
    .menu-btn-content {
      transform: rotate(-6deg);
    }
  </style>