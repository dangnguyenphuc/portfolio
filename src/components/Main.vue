<!-- <template>
  <main>
    <v-container>
        <v-card class="d-flex bg-red justify-center pa-2 my-4">
          Hi, I&apos;m a Developer based in Ho Chi Minh City, Vietnam.
        </v-card>

        <v-row>
          <v-col>
            <v-card
            class="mx-auto"
            subtitle="Junior Software Engineer"
            prepend-icon="$vuetify"
          >
            <template v-slot:title>
              <span class="font-weight-black">DANG NGUYEN PHUC</span>
            </template>
            
            <v-card-text class="d-flex justify-center align-center pt-4 pb">
              
                  <v-img 
                    class="ma-auto rounded-circle"
                    src="/dang-nguyen/profilePicture.jpg"
                    alt="avatar"
                  ></v-img>
                
              
            </v-card-text>

          </v-card>
          </v-col>
          
          <v-col>
            <v-card class="mx-auto"
            subtitle="Do you see their eyes following your mouse ?">
            <template v-slot:title>
              <span class="font-weight-black">Rick and Morty</span>
            </template>
              <v-card-text class="d-flex justify-center align-center pt-4 pb-0">
                <RickAndMorty/>
              </v-card-text>
            </v-card>
          </v-col>
         
        </v-row>

    </v-container>
  </main>
</template> -->

<template>
  <Header @changeWindow="updateWindow" :menuItems="menuItems"/>
  
  <v-window v-model="currentWindow">
    <v-window-item v-for="item in menuItems" key="item.id" :value="item.id">
      {{ item.id }}
    </v-window-item>
    
    <v-window-item :value="menuItems.length">
      <HeaderMenu/>
    </v-window-item>
  </v-window>
</template>




<script lang="ts">
import { defineComponent } from 'vue'
import RickAndMorty from './RickAndMorty/RickAndMorty.vue';
import Header from './Header/Header.vue';
import HeaderMenu from './Header/HeaderMenu.vue';

export interface Window {
  id: number, 
  title: string,
  component: any
}

export interface DataType{
  currentWindow: Number,
  menuItems: Array<Window>
}

export default defineComponent({
  name: 'Main',
  data(){
    return {
      currentWindow: 0,
      menuItems: [
        {
          id: 0,
          title: 'TOP',
          component: null
        }, 
        {
          id: 1,
          title: 'PROJECTS',
          component: null
        }, 
        {
          id: 2,
          title: 'CONTACT',
          component: null
        }
      ],
    }
  },
  methods: {
    updateWindow(viewId: number) {
      this.currentWindow = viewId;
    }
  }
})

</script>

<style scoped>
</style>