<template>
  <v-row class="header-bar d-flex pa-0 my-0 align-center justify-md-start justify-end mt-5" style="outline: 1px solid red;">
    <v-col class="d-none d-md-flex">
      <div class="d-flex flex-column ml-10 ga-2">
        <v-row>
          <div class="border-sm border-opacity-100 bg-primary text-caption menu-text">MENU</div>
        </v-row>
        <v-row class="ga-5 ml-2">
            <div v-for="(item) in menuItems" :key="item.id" class="elevation-0 text-button" @click="changeWindow(item)">
                <div :class="'slide-bg ' + backgroundValue + (item.id===currentWindow ? ' bg-primary-darken-1 text-highlight' : '')">
                  {{ item.title }}
                </div>
            </div>
        </v-row>
      </div>
    </v-col>
  </v-row>
  <div class="square-btn d-flex flex-column position-fixed top-0 right-0">
    <v-btn @click="toggleTheme" class="theme-btn bg-red d-flex align-center justify-center pa-0">
          <v-icon class="mr-1 mb-2">{{ iconValue }}</v-icon>
    </v-btn>
    <v-btn @click="toggleMenu" class="menu-btn bg-red d-md-none d-flex align-center justify-center pa-0">
          <v-icon class="mr-1 mt-3 menu-btn-content">mdi-menu</v-icon>
    </v-btn>
  </div>
    
  </template>
  
<script lang="ts">
  import { useTheme } from 'vuetify';
  import { useRouter } from 'vue-router'

  interface Window {
    id: number, 
    title: string,
    path: string
  }
  export interface DataType{
    currentWindow: Number,
    menuItems: Array<Window>
  }

  export default {
    setup() {
      const theme = useTheme();
      const router = useRouter()
      return { theme, router };
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
        menuItems: [
          {
            id: 0,
            title: 'TOP',
            path: '/'
          }, 
          {
            id: 1,
            title: 'PROJECTS',
            path: '/project'
          }, 
          {
            id: 2,
            title: 'CONTACT',
            path: '/test'
          }
        ],
        currentWindow: 0,
      };
    },

    methods: {
      changeWindow(window: Window)
      {
        this.currentWindow = window.id;
        this.router.push({path: window.path});
      },   

      toggleMenu ()
      {
        this.$emit('display-menu');
      },

      toggleTheme() {
        this.theme.global.name.value = this.theme.global.name.value === 'light' ? 'dark' : 'light';
      }
    }
  };
</script>
  
<style scoped>
  /* Add any additional styles if needed */
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