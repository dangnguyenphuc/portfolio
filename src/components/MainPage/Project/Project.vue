<template>
    <Undercontruction @backToHome="$emit('backToGallery', 0)"/>
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