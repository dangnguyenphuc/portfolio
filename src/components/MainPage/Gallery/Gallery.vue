<template>
    <v-img class="sub-logo" :src="'/logo/svg/sub-logo-1-' + theme.global.name.value + '.svg'"></v-img>
    <v-img class="main-logo" :src="'/logo/svg/main-logo-' + theme.global.name.value + '.svg'"></v-img>
    <div class="main-container" v-touch="{
            left: () => nextSlide(),
            right: () => prevSlide(),
        }"
    >
        <div class="carousel">
            <div class="list">
                <div class="item" v-for="(item, index) in slideItems" :key="index">
                    <div class="d-flex flex-column pa-5 justify-center pa-0 align-center carousel-text">
                        <div :class="'blood blur bg-' + item.color">
                            <v-row class="carousel-text-1">
                                <v-col cols="12"
                                    class="d-flex justify-center font-weight-black align-center">
                                    <span class="main-item-text">
                                        {{ item.text }}
                                    </span>
                                </v-col>
                                <v-col cols="12">
                                </v-col>
                            </v-row>
                        </div>

                    </div>
                    <img :src="item.image">
                    <div class="introduce d-flex flex-column ga-4">
                        <div class="title">{{ item.detailText.title }}</div>
                        <div class="topic">{{ item.detailText.topic }}</div>
                    </div>

                    <div :class="'des border border-opacity-100 bg-' + item.color">
                        {{item.detailText.text}}
                    </div>
                </div>
            </div>
        </div>

        <div class="custom-delimiters d-flex flex-column justify-center align-center">
            <div v-for="(slide, i) in slideItems" :key="i" @click="changeSlide(i)" class="custom-border">
                <v-img class="delimeter-image" :class="{ 'delimeter-active': slide.id === itemArray[1] }"
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
            isThrottled: false as Boolean,
            intervalId: null as number | null,
            carousel: null as HTMLElement | null,
            listHTML: null as HTMLElement | null,
            slideItems: [
                {
                    id: 0,
                    color: Config.GALLERY_COLOR_1,
                    text: Config.GALLERY_TITLE_1,
                    image: Config.GALLERY_IMAGE_1,
                    detailText: {
                        title: 'VNG Gaming Scholarship',
                        topic: 'My first scholarship ever',
                        text: 'This marks my first remarkable achievement in my entire four-year journey as a student at Ho Chi Minh University of Technology. Attaining this milestone required me to present my visionary ideas for enhancing the beloved Pikachu game while offering insightful perspectives on the current landscape of the gaming industry',
                    }
                },
                {
                    id: 1,
                    color: Config.GALLERY_COLOR_2,
                    text: Config.GALLERY_TITLE_2,
                    image: Config.GALLERY_IMAGE_2,
                    detailText: {
                        title: 'Thesis Defense',
                        topic: 'The final defense of thesis',
                        text: 'The night before the defense, we encountered some critical errors that caused the main app to crash. At first, we tried to replace parts of it to improve things, but in the end, we just aimed to make it run properly. Our team meeting lasted until 3 a.m., and we only slept for an hour because we had to get to campus early to prepare for the presentation. My Graduation Defense Committee included so many geniuses that we jokingly called them demons because of the complexity and scope of their projects.At the end of the day, we received an overall score of 9.5. Not bad but I feel we could have done even better.',
                    }
                },
                {
                    id: 2,
                    color: Config.GALLERY_COLOR_3,
                    text: Config.GALLERY_TITLE_3,
                    image: Config.GALLERY_IMAGE_3,
                    detailText: {
                        title: 'HCMUT Graduation',
                        topic: 'OMG, I graduated as a valedicto-rian',
                        text: 'I didn\'t even realize I was the valedictorian until a week before graduation. I had received the email, but I was too focused on work to notice, still deep in WebRTC issues at IVC. The funniest part? I went to campus, received the gold medal, and then headed straight back to work. I was just an intern and didn\'t even have annual leave yet.',
                    }
                },
                {
                    id: 3,
                    color: Config.GALLERY_COLOR_4,
                    text: Config.GALLERY_TITLE_4,
                    image: Config.GALLERY_IMAGE_4,
                    detailText: {
                        title: 'UpRace day 2025',
                        topic: 'My first half marathon',
                        text: 'My colleague and I at Zalo decided to test our endurance. We signed up for a 5K at first, but it felt too easy, so we went for the 21K instead. I ran my ahh off just to survive. In the last kilometer, I got a cramp, and so did my colleague. We ended up limping together to the finish line. It was hands down the toughest and funniest event I participate in 2025.',
                    }
                },
                {
                    id: 4,
                    color: Config.GALLERY_COLOR_5,
                    text: Config.GALLERY_TITLE_5,
                    image: Config.GALLERY_IMAGE_5,
                    detailText: {
                        title: 'Crewmates at IVC',
                        topic: 'My first company experience',
                        text: 'My time at IVC hasn\'t been easy, but it hasn\'t been a bad experience either. It\'s made me realize how many things I didn\'t even know existed and now I\'ve had the chance to experience them firsthand. Even though I only worked there for 10 months.',
                    }
                },
                {
                    id: 5,
                    color: Config.GALLERY_COLOR_6,
                    text: Config.GALLERY_TITLE_6,
                    image: Config.GALLERY_IMAGE_6,
                    detailText: {
                        title: 'No context image',
                        topic: 'My lame ahh costume',
                        text: 'I just want to make sure that I\'m still a normal person and that I still have free will. After two years of working, I\'ve learned a lot, not just academic knowledge, but also social skills and life experience.',
                    }
                }
            ],
            itemArray: [] as number[],
        }
    },
    mounted() {
        this.carousel = document.querySelector('.carousel');
        this.listHTML = document.querySelector('.carousel .list');
        this.intervalId = setInterval(this.showSlider, Config.GALLERY_SLIDE_TIME, 'next');
        this.itemArray = Array.from({ length: this.slideItems.length }, (_, i) => i);
    },
    beforeDestroy() {
        if (this.intervalId) clearInterval(this.intervalId);
    },
    watch: {

    },
    methods:
    {
        prevSlide() {
            this.showSlider('prev');
        },
        nextSlide() {
            this.showSlider('next');
        },
        changeSlide(i: number) {
            if (i < 0 || i >= this.slideItems.length) return;
            this.showSlider('', i);
        },
        showSlider(type: String, slideId: number = -1)
        {
            this.carousel?.classList.remove('next', 'prev');

            const items = document.querySelectorAll('.carousel .list .item');

            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            
            this.intervalId = setInterval(this.showSlider, Config.GALLERY_SLIDE_TIME, 'next');

            if (type === 'next') 
            {
                this.listHTML?.appendChild(items[0]);
                this.itemArray.push(this.itemArray[0]);
                this.itemArray.shift();
                this.carousel?.classList.add('next');
            } 
            else if (type == 'prev')
            {
                this.listHTML?.prepend(items[items.length - 1]);
                this.itemArray.unshift(this.itemArray[this.itemArray.length - 1]);
                this.itemArray.pop();
                this.carousel?.classList.add('prev');
            }
            else if (slideId >= 0 && slideId < this.itemArray.length)
            {

                if (slideId < this.itemArray[1])
                {
                    while(this.itemArray[1] != slideId)
                    {
                        this.showSlider('prev');
                    }
                }
                else
                {
                    while(this.itemArray[1] != slideId)
                    {
                        this.showSlider('next');
                    }
                }
                
            }
        }
    },
})

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {

    --item0-transform: translate(-150%, 40%) scale(0.75);
    --item0-filter: blur(40px);
    --item0-zIndex: 9;
    --item0-opacity: 0;

    --item1-transform: translateX(-70%) translateY(30%) scale(0.75);
    --item1-filter: blur(30px);
    --item1-zIndex: 9;
    --item1-opacity: 1;

    --item2-transform: translateX(0);
    --item2-filter: blur(0px);
    --item2-zIndex: 10;
    --item2-opacity: 1;

    --item3-transform: translate(70%, -30%) scale(0.75);
    --item3-filter: blur(10px);
    --item3-zIndex: 9;
    --item3-opacity: 1;

    --item4-transform: translate(150%, -40%) scale(0.75);
    --item4-filter: blur(30px);
    --item4-zIndex: 8;
    --item4-opacity: 1;

    --item5-transform: translate(200%, -50%) scale(0.75);
    --item5-filter: blur(40px);
    --item5-zIndex: 7;
    --item5-opacity: 0;
}

.sub-logo {
    width: 90vw;
    z-index: 9 !important;
}

.main-logo {
    width: 40vw;
    position: absolute;
    top: 10vh;
    left: 10vw;
    z-index: 1001 !important;
}

.main-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    overflow: hidden;
    z-index: 3 !important;
}

.carousel {
    position: relative;
    height: 100vh;
    overflow: hidden;
}

.carousel .list {
    position: absolute;
    width: 100vw;
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
    width: 55%;
    position: absolute;
    right: 0;
    top: 45%;
    transform: translateY(-45%);
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
    top: 60%;
    left: 5%;
    transform: translateY(-60%);
    transition: opacity 0.5s;
}

.item .des {
    color: rgb(var(--v-theme-primary-darken-1));
    background-color: rgb(var(--v-theme-background));
    font-size: small;
    position: absolute;
    bottom: 15%;
    left: 105%;
    min-width: 300px
}

.introduce .title, .topic {
    color: rgb(var(--v-theme-primary-darken-1));
    background-color: rgb(var(--v-theme-background));
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
.carousel .list .item:nth-child(2) .des {
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

.carousel .list .item:nth-child(2) .des {
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

.carousel-text {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
    text-align: center;
    rotate: -10deg;
    width: 100vw;
}

.carousel-text-1 {
    width: 150vw;
    padding: 12vh 0;
}

.blur {
    filter: blur(2px);
    -webkit-filter: blur(2px);
}

.blood {
    background-image: url(/backgrounds/bg-main.png);
    background-repeat: repeat;
}

.main-item-text {
    text-align: center;
    font-family: "Poppins", sans-serif;
    font-weight: 900;
    font-style: italic;
    font-size: 12rem;
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
    height: 60px;
}

.menu-text {
    font-weight: bold;
    padding: 0px 2px;
}

.menu-text.rotate-90
{
    rotate: 90deg;
}

.custom-delimiters > .custom-border {
  border-left: 1px solid rgb(var(--v-theme-primary-darken-1));
  border-right: 1px solid rgb(var(--v-theme-primary-darken-1));
  border-top: 1px solid rgb(var(--v-theme-primary-darken-1));
  background-color: rgb(var(--v-theme-background));
}

/* Add bottom border only to last child */
.custom-delimiters > .custom-border:nth-last-child(2) {
  border: 1px solid rgb(var(--v-theme-primary-darken-1));
}

@media (max-width: 1280px) {
    .main-logo {
        width: 60vw;
        top: 3vh;
        left: 5vw;
    }
}

@media (max-width: 960px) {
    .main-item-text {
        font-size: 6rem;
    }


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
        top: 20%;
        left: 5%;
        transform: translateY(-30%);
    }

    .carousel .list .item .des {
        bottom: 10%;
        left: 40%;
        min-width: 200px
    }

    .carousel .list .item img {
        width: 100%;
    }
}
</style>