<template>
    <v-img class="sub-logo" :src="'/logo/svg/sub-logo-1-' + theme.global.name.value + '.svg'"></v-img>
    <v-img class="main-logo" :src="'/logo/svg/main-logo-' + theme.global.name.value + '.svg'"></v-img>
    <div class="main-container">
        <v-carousel :continuous="false" :show-arrows="true" delimiter-icon="mdi-square" class="main-carousel"
            hide-delimiter-background vertical-delimiters="right" height="95vh">
            <v-carousel-item v-for="(slide, i) in slideItems" :key="i">
                <v-sheet height="100%" width="100%" class="pa-0 carousel-container d-flex justify-center align-center">
                    <div class="carousel-image">
                        <v-img  :src="slide.image"></v-img>
                    </div>
                    <div :class="'d-flex pa-5 justify-center pa-0 align-center carousel-text bg-' + slide.color">
                        <v-col class="text-h1 d-flex justify-center font-weight-black align-center">
                            <span>
                                {{ slide.text }}
                            </span>
                        </v-col>

                        <v-col class="text-h1 d-flex justify-center font-weight-black align-center">
                            <span>
                                Slide
                            </span>
                        </v-col>
                    </div>
                </v-sheet>


            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTheme } from 'vuetify';

export default defineComponent({
    name: 'Gallery',
    setup() {
        const theme = useTheme();
        return { theme };
    },
    data() {
        return {
            slideItems: [
                {
                    id: 0,
                    color: 'green',
                    text: 'First',
                    image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
                },
                {
                    id: 1,
                    color: 'secondary',
                    text: 'Second',
                    image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
                },
                {
                    id: 2,
                    color: 'yellow darken-4',
                    text: 'Third',
                    image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
                },
                {
                    id: 3,
                    color: 'red lighten-2',
                    text: 'Fourth',
                    image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
                },
                {
                    id: 4,
                    color: 'orange darken-1',
                    text: 'Fifth',
                    image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
                }
            ]
        }
    },
    watch: {

    },
    methods:
    {

    }
})

</script>

<style scoped>
.sub-logo {
    max-width: 90vw;
    width: 80vw;
    z-index: 2;
}

.main-logo {
    max-width: 50vw;
    width: 40vw;
    transform: translateX(8vw) translateY(-17vh);
    z-index: 3;
}

.main-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
}

.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel-image {
  width: 50%;
  z-index: 2;
}

.carousel-text {
  position: absolute;
  left: -20vw;
  z-index: 1;
  text-align: center;
  rotate: -25deg;
  width: 140vw;
}

@media (max-width: 1280px) {
    .main-logo {
        max-width: 50vw;
        transform: translateX(8vw) translateY(-9vh);
    }
}

:deep(.main-carousel .v-carousel__controls) {
    align-items: center;
    row-gap: 0px;
    margin-right: 10vw;
    justify-content: start;
    top: 20vh;
    height: 160px !important;
    background-color: rgba(var(--v-theme-primary-darken-1), 0.8);
    border-radius: 10px;
}
</style>