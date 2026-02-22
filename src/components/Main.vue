<template>
  <Header @changeWindow="updateWindow" :menuItems="menuItems" :showNavBar="showNav" :currentWindow="currentWindow" />
  <v-window disabled v-model="currentWindow">
    <v-window-item v-for="item in menuItems" key="item.id" :value="item.id">
      <component @backToGallery="updateWindow" :is="item.component"/>
    </v-window-item>

    <v-window-item disabled :value="menuItems.length">
      <HeaderMenu @changeWindow="updateWindowMenu"  :menuItems="menuItems" :currentWindow="prevWindow" />
    </v-window-item>
  </v-window>
  
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'
import RickAndMorty from './RickAndMorty/RickAndMorty.vue';
import Header from './Header/Header.vue';
import HeaderMenu from './Header/HeaderMenu.vue';
import { useDisplay } from 'vuetify';
import Gallery from './MainPage/Gallery/Gallery.vue';
import Project from './MainPage/Project/Project.vue';
import Contact from './MainPage/Contact/Contact.vue';

export interface Window {
  id: number,
  title: string,
  component: any
}

export default defineComponent({
  name: 'Main',
  setup() {
    const { mdAndUp } = useDisplay();
    const showNav = ref(mdAndUp.value);
    return { showNav, mdAndUp }
  },
  data() {
    return {
      currentWindow: 0,
      prevWindow: 0,
      menuItems: [
        {
          id: 0,
          title: 'GALLERY',
          component: markRaw(Gallery)
        },
        {
          id: 1,
          title: 'PROJECTS',
          component: markRaw(Project)
        },
        {
          id: 2,
          title: 'CONTACT',
          component: markRaw(Contact)
        }
      ],
    }
  },

  watch: {
    mdAndUp(newVal) {
      if (this.currentWindow == this.menuItems.length)
        this.showNav = false;
      else
        this.showNav = newVal;
    }
  },

  methods: {
    updateWindow(viewId: number) {
      if (viewId < this.menuItems.length) 
      {
        this.prevWindow = viewId;
        this.currentWindow = viewId;
      }
      else 
      {
        if (this.currentWindow !== this.menuItems.length) 
        {
          this.currentWindow = viewId;
        }
        else 
        {
          this.currentWindow = this.prevWindow;
          this.showNav = this.mdAndUp;
        }
      }
    },
    updateWindowMenu(viewId: number) {
      this.prevWindow = viewId;
      this.currentWindow = viewId;
      this.showNav = this.mdAndUp;
    }
  }
})

</script>

<style scoped>
</style>