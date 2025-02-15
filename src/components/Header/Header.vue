<template>
    <v-app-bar>
        <v-row no-gutter class="d-flex flex-row align-center justify-space-between">
            <v-col class="d-none d-md-flex">
                <v-row>
                    <v-btn v-for="(item, i) in menuItems" :key="i" text>
                        {{ item }}
                    </v-btn>
                </v-row>
            </v-col>
            <v-col class="d-flex align-center justify-end mr-2">
                <v-btn @click="toggleTheme" class="square-btn" icon>
                    <v-icon>{{ icon }}</v-icon>
                </v-btn>
            </v-col>

            <v-col cols="1" class="d-flex d-md-none justify-center">
                <v-row>
                    <v-col class="d-flex align-center justify-center mr-6">
                        <v-menu offset-y>
                            <template v-slot:activator="{ props }">
                            <v-btn class="square-btn" icon v-bind="props">
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
            </v-col>
        </v-row>
    </v-app-bar>
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
        menuItems: ['Blogs', 'Projects', 'Contact'],
      };
    },
    methods: {
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */

  .square-btn {
        width: 50px; /* Set the width to ensure it's square */
        height: 50px; /* Set the height to ensure it's square */
        border-radius: 8px; /* Optional: for slightly rounded edges */
        display: flex; /* Center the icon */
        align-items: center;
        justify-content: center;
    }
  </style>