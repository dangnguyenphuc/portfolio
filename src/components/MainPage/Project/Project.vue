<template>
<div class="container d-flex flex-column ga-3">

    <div class="atom-simulation d-flex flex-col justify-center align-center">
        <span :hidden="glNotSupport">Your Browser doesn't support OPENGL</span>
        <canvas ref="atomSimulation" width="500" height="500"></canvas>
    </div>


    <Undercontruction @backToHome="$emit('backToGallery', 0)"/>



</div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as Config from '@/config'
import Undercontruction from '@/components/Undercontruction/Undercontruction.vue';
import {GlRenderer, Particle, RED, BLUE, GRAY, PROTON_SCALE, ELECTRON_SCALE, NEUTON_SCALE} from './Atom/Atom.ts'

export default defineComponent({
    name: 'Project',
    emits: ['backToGallery'],
    setup() {
        const atomSimulation = ref<HTMLCanvasElement | null>(null);
        return {
            atomSimulation
        };
    },
    components: {
        Undercontruction,
    },
    mounted() {
        if (!this.atomSimulation) {
            this.glNotSupport = false;
            return;
        }
        const glEngine : GlRenderer = new GlRenderer(this.atomSimulation);
        glEngine.init();

        const electrons : Particle[] = [];
        const neutrons : Particle[] = [];
        const protons : Particle[] = [];

        protons.push(new Particle([0, 0], 1, RED, PROTON_SCALE))
        electrons.push(new Particle([-0.5, 0], 1, BLUE, ELECTRON_SCALE))

        glEngine.clear();
        glEngine.draw(protons);
        glEngine.draw(electrons);
        
    },
    data() {
        return {
            config: Config,
            glNotSupport: true,
        }
    }
});
</script>