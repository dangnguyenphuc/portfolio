<template>
    <v-img class="sub-logo" src="/logo/svg/sub-logo-1.svg"></v-img>
    <v-img class="main-logo" src="/logo/svg/main-logo.svg"></v-img>

    <v-container class="main-carousel" elevation="24">
        <v-carousel :continuous="false" :show-arrows="true" delimiter-icon="mdi-square" height="300" cycle
            hide-delimiter-background>
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-sheet height="100%" tile class="border d-flex justify-center align-center">
                    <v-row class="d-flex justify-center align-center">
                        <v-sheet :color="colors[i]"  height="100%">
                            <div class="text-h2">
                                {{ slide }} Slide
                            </div>
                        </v-sheet>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Gallery',
    setup() { },
    data() {
        return {
            colors: [
                'green',
                'secondary',
                'yellow darken-4',
                'red lighten-2',
                'orange darken-1',
            ],
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
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
}

.main-logo {
    max-width: 50vw;
    width: 40vw;
    transform: translateX(8vw) translateY(-17vh);
}

.main-carousel {
    min-width: 100vw;
}

@media (max-width: 1280px) {
    .main-logo {
        max-width: 50vw;
        transform: translateX(8vw) translateY(-9vh);
    }
}
</style>