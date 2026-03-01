<template>
<div class="container d-flex flex-column ga-3">
<Undercontruction @backToHome="$emit('backToGallery', 0)"/>

<canvas ref="atom-simulation" width="500" height="500"></canvas>
</div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as Config from '@/config'
import Undercontruction from '@/components/Undercontruction/Undercontruction.vue';

export default defineComponent({
    name: 'Project',
    emits: ['backToGallery'],
    setup() {

    },
    components: {
        Undercontruction,
    },
    data() {
        return {
            config: Config
        }
    }
});
</script>