<template>
  <div class="main-menu bg-yellow">
    <transition name="avatar">
      <div class="avatar">
        <v-img src="/logo/svg/personel-avatar.svg" alt="Dang Nguyen"></v-img>
      </div>
    </transition>
      <v-img class="main-logo" src="/logo/svg/main-logo.svg"></v-img>
    <v-container class="main-container d-flex align-center mt-10">
      <v-row class="container-row d-flex align-center">
        <v-col cols="12" sm="6" lg="5" v-for="(item) in menuItems" :key="item.id">
          <div
          @click="changeWindow(item)"
          :class="'slide-bg d-flex flex-row ' + backgroundValue + (item.id === currentWindow ? ' bg-primary-darken-1 text-highlight' : '')">
          <div class="text-h4 font-weight-bold">{{ item.id + 1 }}</div>
          <div class="font-weight-bold">{{ item.title }}</div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme } from 'vuetify';
import type { Window } from '../Main.vue';

export default defineComponent({
  name: 'HeaderMenu',
  setup() {
    const theme = useTheme();
    return { theme };
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    changeWindow(item: Window) {
      this.$emit("changeWindow", item.id);
    }
  },
  computed: {
    backgroundValue() {
      return this.theme.global.name.value === 'light' ? 'light' : 'dark';
    }
  },
  props: {
    menuItems: {
      type: Array<Window>,
      default: [],
      required: true
    },
    currentWindow: {
      type: Number,
      default: 0,
      required: true
    }
  },
});
</script>

<style scoped>
.main-menu {
  background-image: url(/backgrounds/bg-main.png);
  height: 100vh;
  width: 100vw;
  overflow: auto;
}

.avatar {
  position: fixed;
  top: calc(100vh - 32vw);
  /* Start position (off-screen) */
  z-index: 1000;
  left: calc(100vw - 25vw);
  width: 30vw;
  rotate: -30deg;
  transition: top 0.25s ease-in, left 0.25s ease-in;
}

/* When entering */
.avatar-enter-active {
  transition: top 0.25s ease-in, left 0.25s ease-in;
}

.avatar-enter-from {
  top: 100vh;
  left: 100vw;
}

.avatar-enter-to {
  top: calc(100vh - 32vw);
  left: calc(100vw - 25vw);
}

.avatar-leave-active {
  display: none;
}

.main-logo {
  width: 70vw;
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

.main-container {
  height: 50vh;
}

.container-row {

}
</style>