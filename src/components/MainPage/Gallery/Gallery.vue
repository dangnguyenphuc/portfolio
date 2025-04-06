<template>
    <!-- <v-img class="sub-logo" :src="'/logo/svg/sub-logo-1-' + theme.global.name.value + '.svg'"></v-img>
    <v-img class="main-logo" :src="'/logo/svg/main-logo-' + theme.global.name.value + '.svg'"></v-img> -->
    <div class="main-container" v-touch="{
            left: () => showSlider('next'),
            right: () => showSlider('prev'),
        }"
    >

        <div class="carousel">
            <div class="list">
                <div class="item" v-for="(item, index) in slideItems" :key="index">
                        <img :src="item.image">
                        <div class="introduce">
                            <div class="title">{{ slideItems[0].detailText.title }}</div>
                            <div class="topic">Aerphone</div>
                            <div class="des">
                                {{slideItems[0].detailText.text}}
                            </div>
                        </div>
                </div>
            </div>
        </div>

        <div class="custom-delimiters d-flex flex-column justify-center align-center">
            <div v-for="(slide, i) in slideItems" :key="i" @click="changeSlide(i)">
                <v-img class="delimeter-image" :class="{ 'delimeter-active': slide.id === selectedItem }"
                    :src="slide.image"></v-img>
            </div>

            <v-row no-gutters class="pa-0 mt-13">
                <div class="border-sm border-opacity-100 bg-primary text-caption menu-text rotate-90">VISUAL SELECTER</div>
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
            intervalId: null as number | null,
            carousel: null as HTMLElement | null,
            listHTML: null as HTMLElement | null,
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
                },
                {
                    id: 5,
                    color: Config.GALLERY_COLOR_6,
                    text: Config.GALLERY_TITLE_6,
                    image: Config.GALLERY_IMAGE_6,
                    detailText: {
                        title: '',
                        text: '',
                    }
                }
            ]
        }
    },
    mounted() {
        this.carousel = document.querySelector('.carousel');
        this.listHTML = document.querySelector('.carousel .list');
        this.intervalId = setInterval(this.showSlider, 5000, 'next');
    },
    beforeDestroy() {
        if (this.intervalId) clearInterval(this.intervalId);
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
        },
        showSlider(type: String)
        {
            
            this.carousel?.classList.remove('next', 'prev');

            const items = document.querySelectorAll('.carousel .list .item');

            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            
            this.intervalId = setInterval(this.showSlider, 5000, 'next');

            if (type === 'next') {
                this.listHTML?.appendChild(items[0]);
                this.carousel?.classList.add('next');
            } else {
                this.listHTML?.prepend(items[items.length - 1]);
                this.carousel?.classList.add('prev');
            }
        }
    }
})

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {

    --item0-transform: translate(-150%, 40%) scale(0.5);
    --item0-filter: blur(40px);
    --item0-zIndex: 9;
    --item0-opacity: 0;

    --item1-transform: translateX(-70%) translateY(30%) scale(0.5);
    --item1-filter: blur(30px);
    --item1-zIndex: 9;
    --item1-opacity: 1;

    --item2-transform: translateX(0);
    --item2-filter: blur(0px);
    --item2-zIndex: 10;
    --item2-opacity: 1;

    --item3-transform: translate(70%, -30%) scale(0.5);
    --item3-filter: blur(10px);
    --item3-zIndex: 9;
    --item3-opacity: 1;

    --item4-transform: translate(150%, -40%) scale(0.5);
    --item4-filter: blur(30px);
    --item4-zIndex: 8;
    --item4-opacity: 1;

    --item5-transform: translate(200%, -50%) scale(0.5);
    --item5-filter: blur(40px);
    --item5-zIndex: 7;
    --item5-opacity: 0;
}

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
    height: 100vh;
    overflow: hidden;
}

.carousel {
    position: relative;
    height: 100vh;
    overflow: hidden;
    margin-top: -50px;
}

.carousel .list {
    position: absolute;
    width: 90vw;
    max-width: 100%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
}

.carousel .list .item {
    position: absolute;
    left: 0%;
    width: 70%;
    height: 100%;
    font-size: 15px;
    transition: left 0.5s, opacity 0.5s, width 0.5s;
}

.carousel .list .item:nth-child(n + 6) {
    opacity: 0;
}

.carousel .list .item:nth-child(2) {
    z-index: 10;
    transform: translateX(0);
}

.carousel .list .item img {
    width: 50%;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: right 1.5s;
}

.carousel .list .item .introduce {
    opacity: 0;
    pointer-events: none;
}

.carousel .list .item:nth-child(2) .introduce {
    opacity: 1;
    pointer-events: auto;
    width: 400px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: opacity 0.5s;
}

.carousel .list .item .introduce .title {
    font-size: 2em;
    font-weight: 500;
    line-height: 1em;
}

.carousel .list .item .introduce .topic {
    font-size: 4em;
    font-weight: 500;
}

.carousel .list .item .introduce .des {
    font-size: small;
    color: #5559;
}

.carousel .list .item:nth-child(1) {
    transform: var(--item1-transform);
    filter: var(--item1-filter);
    z-index: var(--item1-zIndex);
    opacity: var(--item1-opacity);
    pointer-events: none;
}

.carousel .list .item:nth-child(3) {
    transform: var(--item3-transform);
    filter: var(--item3-filter);
    z-index: var(--item3-zIndex);
}

.carousel .list .item:nth-child(4) {
    transform: var(--item4-transform);
    filter: var(--item4-filter);
    z-index: var(--item4-zIndex);
    display: none;
}

.carousel .list .item:nth-child(5) {
    transform: var(--item5-transform);
    filter: var(--item5-filter);
    opacity: var(--item5-opacity);
    pointer-events: none;
    display: none;
}

/* animation text in item2 */
.carousel .list .item:nth-child(2) .introduce .title,
.carousel .list .item:nth-child(2) .introduce .topic,
.carousel .list .item:nth-child(2) .introduce .des {
    opacity: 0;
    animation: showContent 0.5s 1s ease-in-out 1 forwards;
}

@keyframes showContent {
    from {
        transform: translateY(-30px);
        filter: blur(10px);
    }

    to {
        transform: translateY(0);
        opacity: 1;
        filter: blur(0px);
    }
}

.carousel .list .item:nth-child(2) .introduce .topic {
    animation-delay: 1.2s;
}

.carousel .list .item:nth-child(2) .introduce .des {
    animation-delay: 1.4s;
}

/* next click */
.carousel.next .item:nth-child(1) {
    animation: transformFromPosition2 0.5s ease-in-out 1 forwards;
}

@keyframes transformFromPosition0 {
    from {
        transform: var(--item0-transform);
        filter: var(--item0-filter);
        opacity: var(--item0-opacity);
    }
}

@keyframes transformFromPosition2 {
    from {
        transform: var(--item2-transform);
        filter: var(--item2-filter);
        opacity: var(--item2-opacity);
    }
}

.carousel.next .item:nth-child(2) {
    animation: transformFromPosition3 0.7s ease-in-out 1 forwards;
}

@keyframes transformFromPosition3 {
    from {
        transform: var(--item3-transform);
        filter: var(--item3-filter);
        opacity: var(--item3-opacity);
    }
}

.carousel.next .item:nth-child(3) {
    animation: transformFromPosition4 0.9s ease-in-out 1 forwards;
}

@keyframes transformFromPosition4 {
    from {
        transform: var(--item4-transform);
        filter: var(--item4-filter);
        opacity: var(--item4-opacity);
    }
}

.carousel.next .item:nth-child(4) {
    animation: transformFromPosition5 1.1s ease-in-out 1 forwards;
}

@keyframes transformFromPosition5 {
    from {
        transform: var(--item5-transform);
        filter: var(--item5-filter);
        opacity: var(--item5-opacity);
    }
}

/* previous */
.carousel.prev .list .item:nth-child(5) {
    animation: transformFromPosition4 0.5s ease-in-out 1 forwards;
}

.carousel.prev .list .item:nth-child(4) {
    animation: transformFromPosition3 0.7s ease-in-out 1 forwards;
}

.carousel.prev .list .item:nth-child(3) {
    animation: transformFromPosition2 0.9s ease-in-out 1 forwards;
}

.carousel.prev .list .item:nth-child(2) {
    animation: transformFromPosition1 1.1s ease-in-out 1 forwards;
}

.carousel.prev .list .item:nth-child(1) {
    animation: transformFromPosition0 1.1s ease-in-out 1 forwards;
}

@keyframes transformFromPosition1 {
    from {
        transform: var(--item1-transform);
        filter: var(--item1-filter);
        opacity: var(--item1-opacity);
    }
}
@media screen and (max-width: 991px) {

    /* ipad, tablets */
    .carousel .list .item {
        width: 90%;
    }
}

@media screen and (max-width: 767px) {
    /* mobile */

    .carousel .list .item {
        width: 100%;
        font-size: 10px;
    }

    .carousel .list {
        height: 100%;
    }

    .carousel .list .item:nth-child(2) .introduce {
        width: 50%;
    }

    .carousel .list .item img {
        width: 100%;
    }
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
    
}

.menu-text.rotate-90
{
    rotate: 90deg;
}
</style>