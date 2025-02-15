<template>
    
    <v-row class="header-bar d-flex pa-0 my-0 align-center justify-md-start justify-end" style="outline: 1px solid red;">
      <v-col class="theme-change-col d-flex pa-0 justify-md-start justify-end" style="outline: 1px solid red;">
        <v-btn @click="toggleTheme" class="theme-btn square-btn bg-yellow d-flex align-center justify-center pa-0">
            <v-icon class="ml-2 ">{{ icon }}</v-icon>
        </v-btn>
      </v-col>

      <v-col class="d-none d-md-flex">
        <div class="d-flex flex-column ml-2 ga-2">
          <v-row>
            <div class="border-sm border-opacity-100 bg-primary text-body-1">MENU</div>
          </v-row>
          <v-row class="ga-10 ml-2">
              <div  v-for="(item, i) in menuItems" :key="i" id="" class="elevation-0 pa-0 text-body-2" @click="test">
                  <div class="slide-bg">{{ item }}</div>
              </div>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useTheme } from 'vuetify';

  export default {
    setup() {
      // Add any setup code here
        const theme = useTheme();
        const icon = ref(theme.global.name.value === 'light' ? 'mdi-lightbulb-off' : 'mdi-lightbulb-on');
        
        function toggleTheme() {
            theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
            icon.value = theme.global.name.value === 'light' ? 'mdi-lightbulb-on' : 'mdi-lightbulb-off';
        }
        return{
            toggleTheme,
            icon
        }
    },
    components: {
    },
    data() {
      return {
        menuItems: ['BLOGS', 'PROJECTS', 'CONTACT'],
      };
    },
    methods: {
      test() {
      }
    }
  };
  </script>
  
<style scoped>
  /* Add any additional styles if needed */
  .theme-change-col {
    max-width: 100px;
  }

  .header-bar {
    min-height: 50px;
  }

  .theme-btn {
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0% 100%);
  }

  .square-btn {
    width: 20%;
    min-height: 60px;
    border-radius: 0px;
    cursor: pointer;
    font-size: 1.5rem;
  }

  .normal-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: red;
    transition: width 0.5s ease;
    z-index: -1;
  }

  .normal-btn:hover::before {
    width: 100%;
  }

  @media (max-width: 1080px) {
    .theme-change-col {
      max-width: 200px;
    }

    .header-bar {
      min-height: 80px;
    }
    .square-btn {
      min-width: 30%;
      min-height: 80px;
    }
  }

  @media (max-width: 600px) {
    .square-btn {
      min-width: 35%;
    }
  }
.slide-bg {
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: color 0.2s ease;
}

.slide-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background-color: #000000;
  transition: width 0.5s ease;
  z-index: -1;
}

.slide-bg:hover::before {
  width: 100%;
}

.slide-bg:hover {
  color: white;
}


</style>