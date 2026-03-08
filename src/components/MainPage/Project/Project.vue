<template>
<div class="container d-flex flex-column ga-3">

    <div class="atom-simulation d-flex flex-col justify-center align-center">
        <span :hidden="glNotSupport">Your Browser doesn't support OPENGL</span>
        <div :hidden="!glNotSupport" class="d-flex flex-column ga-1"> 
            <div >

            </div>
            <span ><p class="">fps:{{ fps }}</p></span>
            <canvas ref="atomSimulation" width="1000" height="1000"></canvas>
        </div>
    </div>


    <Undercontruction @backToHome="$emit('backToGallery', 0)"/>



</div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as Config from '@/config'
import Undercontruction from '@/components/Undercontruction/Undercontruction.vue';
import {GlRenderer, neutrons, protons, electrons, AtomManager, Wave, collision} from './Atom/Atom'

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

        const atomManager: AtomManager = new AtomManager();
        const waveManager: Wave[] = [];

        atomManager.makeAtom(0, 0);

        waveManager.push(new Wave([-4,0]));

        const glEngine : GlRenderer = new GlRenderer(this.atomSimulation);
        glEngine.init();
        glEngine.clear();

        let last = performance.now();

        const animate = (time: number) => {
            const dt = (time - last) / 1000;
            this.fps = (1/dt).toFixed(2);
            last = time;
            
            glEngine.clear();

            for (const wave of waveManager) {
                wave.update(dt);
                wave.reflect(glEngine.width, glEngine.height);
                for (const atom of protons) {
                    if (collision(atom, wave)) {
                        if (!wave.firstTouch) {
                            wave.firstTouch = true;
                            wave.freq /= 2;
                            // wave.amplitude /= 2;
                            wave.xA /= 2;
                        }
                    } else {
                        if (wave.firstTouch) {
                            wave.firstTouch = false;
                            wave.freq *= 2;
                            // wave.amplitude *= 2;
                            wave.xA *= 2;
                        }
                    }
                }
                
                glEngine.drawWave(wave);
            }

            for (const proton of protons) {
                glEngine.drawParticle(proton);
            }

            for (const electron of electrons) {
                electron.update(dt);
                glEngine.drawElectron(electron);
            }

            for (const neutron of neutrons) {
                glEngine.drawParticle(neutron);
            }

            

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
        
    },
    data() {
        return {
            config: Config,
            glNotSupport: true,
            fps: "",
        }
    }
});
</script>