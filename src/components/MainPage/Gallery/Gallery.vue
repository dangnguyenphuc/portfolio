<template>
    <v-img class="sub-logo" :src="'/logo/svg/sub-logo-1-' + theme.global.name.value + '.svg'"></v-img>
    <v-img class="main-logo" :src="'/logo/svg/main-logo-' + theme.global.name.value + '.svg'"></v-img>
    <div class="main-container">
        <v-carousel v-model="selectedItem" :continuous="false" :show-arrows="false" class="main-carousel" height="100vh"
            cycle>
            <transition-group name="diagonal-slide">
                <v-carousel-item v-for="(slide, i) in slideItems" :key="i">
                    <v-card
                    variant="text"
                    class="description-container"
                >

                <template v-slot:subtitle>
                    <span class="description-text text-primary-dark">
                        {{ slideItems[0].detailText.title }}
                    </span>
                </template>

                <template v-slot:text>
                    <span class="description-text text-primary-dark">
                        {{ slideItems[0].detailText.text }}
                    </span>
                </template>
                </v-card>

                    <v-sheet height="100%" width="100%"
                        class="pa-0 carousel-container d-flex justify-center align-center">

                        <!-- Middle image -->
                        <div class="carousel-image">
                            <v-img :src="slide.image"></v-img>
                        </div>

                        <!-- Previous item -->
                        <div>
                            <div class="side-image left-side blur">
                                <v-img
                                    :src="slideItems[((selectedItem - 1) < 0 ? slideItems.length - 1 : selectedItem - 1)].image"></v-img>
                            </div>
                            <div class="d-flex pa-5 justify-center pa-0 align-center carousel-text left"
                                @click="prevSlide">
                                <v-col
                                    :class="'blood text-h1 d-flex justify-end font-weight-black align-center rounded-xl bg-' + slideItems[((selectedItem - 1) < 0 ? slideItems.length - 1 : selectedItem - 1)].color">
                                    <v-icon icon="mdi-arrow-left-drop-circle" class="main-icon"></v-icon>
                                </v-col>
                            </div>
                        </div>

                        <!-- Current item's text -->
                        <div class="d-flex flex-column pa-5 justify-center pa-0 align-center carousel-text mid">
                            <v-row class="carousel-text-2">
                                <!-- <v-col
                                    :class="'blood text-h1 d-flex justify-center font-weight-black align-center bg-' + slide.color">
                                    <span class="main-item-text">
                                        {{ slide.text }}
                                    </span>
                                </v-col> -->
                            </v-row>

                            <div :class="'blood blur bg-' + slide.color">
                                <v-row class="carousel-text-1">
                                    <v-col cols="12"
                                        class="text-h1 d-flex justify-center font-weight-black align-center">
                                        <span class="main-item-text">
                                            {{ slide.text }}
                                        </span>
                                    </v-col>
                                    <v-col cols="12">
                                    </v-col>
                                </v-row>

                                <v-row class="carousel-text-2">

                                </v-row>
                            </div>

                        </div>

                        <!-- Next item -->
                        <div>
                            <div class="side-image right-side blur">
                                <v-img :src="slideItems[(selectedItem + 1) % slideItems.length].image"></v-img>
                            </div>
                            <div class="d-flex pa-5 justify-center pa-0 align-center carousel-text right"
                                @click="nextSlide">
                                <v-col
                                    :class="'blood text-h1 d-flex justify-start font-weight-black align-center rounded-xl bg-' + slideItems[(selectedItem + 1) % slideItems.length].color">
                                    <v-icon icon="mdi-arrow-right-drop-circle" class="main-icon"></v-icon>
                                </v-col>
                            </div>
                        </div>
                    </v-sheet>
                </v-carousel-item>
            </transition-group>
        </v-carousel>

        <div class="custom-delimiters d-flex flex-column justify-center align-center">
            <div v-for="(slide, i) in slideItems" :key="i" @click="changeSlide(i)">
                <v-img class="delimeter-image" :class="{ 'delimeter-active': slide.id === selectedItem }"
                    :src="slide.image"></v-img>
            </div>

            <v-row no-gutters class="pa-0 mt-13">
                <div class="border-sm border-opacity-100 bg-primary text-caption menu-text">VISUAL SELECTER</div>
            </v-row>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTheme } from 'vuetify';
import * as Config from '@/config'

export default defineComponent({
    name: 'Gallery',
    setup() {
        const theme = useTheme();
        return { theme };
    },
    data() {
        return {
            selectedItem: 0,
            slideItems: [
                {
                    id: 0,
                    color: Config.GALLERY_COLOR_1,
                    text: Config.GALLERY_TITLE_1,
                    image: Config.GALLERY_IMAGE_1,
                    detailText: {
                        title: 'VNG Gaming Scholarship',
                        text: 'This marks my first remarkable achievement in my entire four-year journey as a student at Ho Chi Minh University of Technology. Attaining this milestone required me to present my visionary ideas for enhancing the beloved Pikachu game while offering insightful perspectives on the current landscape of the gaming industry',
                    }
                },
                {
                    id: 1,
                    color: Config.GALLERY_COLOR_2,
                    text: Config.GALLERY_TITLE_2,
                    image: Config.GALLERY_IMAGE_2,
                    detailText: {
                        title: '',
                        text: '',
                    }
                },
                {
                    id: 2,
                    color: Config.GALLERY_COLOR_3,
                    text: Config.GALLERY_TITLE_3,
                    image: Config.GALLERY_IMAGE_3,
                    detailText: {
                        title: '',
                        text: '',
                    }
                },
                {
                    id: 3,
                    color: Config.GALLERY_COLOR_4,
                    text: Config.GALLERY_TITLE_4,
                    image: Config.GALLERY_IMAGE_4,
                    detailText: {
                        title: '',
                        text: '',
                    }
                },
                {
                    id: 4,
                    color: Config.GALLERY_COLOR_5,
                    text: Config.GALLERY_TITLE_5,
                    image: Config.GALLERY_IMAGE_5,
                    detailText: {
                        title: '',
                        text: '',
                    }
                }
            ]
        }
    },
    watch: {

    },
    methods:
    {
        prevSlide() {
            this.selectedItem = (this.selectedItem - 1) < 0 ? this.slideItems.length - 1 : this.selectedItem - 1
        },
        nextSlide() {
            this.selectedItem = (this.selectedItem + 1) % this.slideItems.length;
        },
        changeSlide(i: number) {
            if (i < 0 || i >= this.slideItems.length) return;
            this.selectedItem = i;
        }
    }
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.sub-logo {
    width: 90vw;
    z-index: 2 !important;
}

.main-logo {
    width: 40vw;
    transform: translateX(8vw) translateY(-17vh);
    z-index: 3 !important;
}

.main-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    overflow: visible;
}

.description-container {
    position: absolute;
    width: 30vw;
    z-index: 200;
    top: 40vh;
    left: 0;
    /* top: 70vh; */
    /* right: 10vw; */
}

.description-text {
    font-size: 1vw;
    font-weight: 800;
}

.carousel-container {
    position: relative;
}

.carousel-image {
    width: 50vw;
    z-index: 100;
}

.carousel-text {
    position: absolute;
    z-index: 1;
    text-align: center;
    rotate: -15deg;
    width: 140vw;
}

.carousel-text-1 {
    width: 140vw;
    padding: 12vh 0;
}

.carousel-text-2 {
    width: 140vw;
    height: 100vh;
}

.mid {
    left: -20vw;
}

.left {
    bottom: 10vh;
    width: 25vw;
    left: -17vw;
    z-index: 2;
}

.right {
    top: 10vh;
    width: 25vw;
    right: -17vw;
    z-index: 2;
}

.blur {
    filter: blur(2px);
    -webkit-filter: blur(2px);
}

.side-image {
    position: absolute;
    width: 50%;
    z-index: 2;
}

.left-side {
    left: -40vw;
    bottom: 5vh;
}

.right-side {
    right: -40vw;
    top: 5vh;
}

.right-side.blur {
    filter: blur(2px);
    -webkit-filter: blur(2px);
}

.blood {
    background-image: url(/backgrounds/bg-main.png);
    background-repeat: repeat;
}

.main-item-text {
    font-family: "Poppins", sans-serif;
    font-weight: 900;
    font-style: italic;
    font-size: 12rem;
}

.main-icon {
    font-size: 5rem;
}

@media (max-width: 1280px) {
    .main-logo {
        width: 60vw;
        transform: translateX(8vw) translateY(-9vh);
    }

    .description-container {
        width: 40vw;
    }

    .description-text {
        font-size: 2vw;
    }
}

@media (max-width: 960px) {

    .right,
    .left {
        width: 38vw;
    }

    .left-side {
        left: -10vw;
        bottom: 5vh;
    }

    .right-side {
        right: -10vw;
        top: 5vh;
    }

    .description-container {
        top: 12vh;
        width: 50vw;
    }
}

/* Diagonal Transition Effect */
.diagonal-slide-enter-active,
.diagonal-slide-leave-active {
    transition: transform 0.8s ease-in-out, opacity 0.5s ease-in-out;
}

/* Old Image moves from top-right to bottom-left */
.diagonal-slide-leave-to {
    transform: translate(-20%, 20%);
    opacity: 0;
}

/* New Image enters from top-right */
.diagonal-slide-enter-from {
    transform: translate(20%, -20%);
    opacity: 0;
}

.custom-delimiters {
    z-index: 101;
    position: absolute;
    top: 25vh;
    right: 5vw;
}

.delimeter-image {
    width: 100px !important;
    height: 40px;
    object-fit: cover;
    overflow: hidden;
    filter: grayscale(100%);
    cursor: pointer;
    transition: height 0.3s ease-in-out;
}

.delimeter-image:hover {
    height: 60px;
}


.delimeter-active {
    filter: grayscale(0%);
}

.menu-text {
    font-weight: bold;
    padding: 0px 2px;
    rotate: 90deg;
}
</style>