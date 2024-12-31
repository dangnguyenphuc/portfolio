<template>
    <v-app-bar>
      <!-- Desktop Menu -->
        <v-row no-gutter class="d-flex flex-row align-center justify-space-between">
            <v-col class="d-flex align-center justify-start" style="outline: 1px solid red;">
                <v-row>
                    <v-col class="d-flex justify-center align-center" style="outline: 1px solid red;">
                        <!-- <RickAndMorty class="main-icon"/> -->
                    </v-col>
                    <v-col class="d-none d-md-flex">
                        <h2>DANG.NGUYEN</h2>
                    </v-col>
                    
                </v-row>
            </v-col>

            <v-col class="d-none d-md-flex" style="outline: 1px solid yellow;">
                <v-spacer></v-spacer>
                <v-row>
                    <v-btn v-for="(item, i) in menuItems" :key="i" text>
                        {{ item }}
                    </v-btn>
                </v-row>
            </v-col>

            <v-col class="d-flex d-md-none justify-end">
                <v-menu offset-y>
                    <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props">
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>
                    </template>
                    <v-list>
                    <v-list-item v-for="(item, i) in menuItems" :key="i" link>
                        <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
    </v-app-bar>
  </template>
  
  <script>
import RickAndMorty from '../RickAndMorty/RickAndMorty.vue';

  export default {
    components: {
      RickAndMorty,
    },
    data() {
      return {
        menuItems: ['Blogs', 'Projects', 'Contact'],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  .icon {
    outline: 1px solid blue;
    height: 100%;
    width: 50px;
  }
  .main-icon {
    transform: scale(0.18);
  }
  </style>