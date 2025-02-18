<template>
  <div class="main-menu bg-yellow">
    <v-btn @click="buttonClick">hhee</v-btn>

    <div class="avatar" :class="{ 'avatar-enter': avatarVisible }">
      <v-img src="/logo/personel-avatar.svg"></v-img>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderMenu',
  setup() { },
  data() {
    return {
      avatarVisible: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.avatarVisible = true;
    }, 500);
  },
  methods: {
    buttonClick() {
      this.$emit('changeWindow',0);
      this.avatarVisible = false;
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
  top: calc(100vh - 29vw);
  left: calc(100vw - 30vw);
  width: 30vw;
  rotate: -30deg;
  transition: transform 0.1s ease;
  transform: translate(100vw, 100vh);
}

.avatar-enter {
  transform: translate(0, 0);
}
</style>