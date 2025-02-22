<template>
  <div class="main-menu bg-yellow">
    <!-- <v-btn @click="buttonClick">hhee</v-btn> -->
    <transition name="avatar">
      <div class="avatar">
        <v-img src="/logo/personel-avatar.svg" alt="Dang Nguyen"></v-img>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderMenu',
  setup() { },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    buttonClick() {

    }
  }


});
</script>

<style scoped>
.main-menu {
  background-image: url(/backgrounds/bg-main.png);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.avatar {
  position: fixed;
  top: calc(100vh - 32vw);  /* Start position (off-screen) */
  left: calc(100vw - 25vw);
  width: 30vw;
  rotate: -30deg;
  transition: top 0.5s ease-in, left 0.5s ease-in;
}

/* When entering */
.avatar-enter-active {
  transition: top 0.5s ease-in, left 0.5s ease-in;
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
</style>