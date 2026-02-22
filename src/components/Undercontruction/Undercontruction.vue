<template>
    <div class="container d-flex flex-column align-center ga-2">
            <p class="text-h2">
                Still undercontruction
            </p>

            <v-btn height="70" prepend-icon="$prev" spaced="start" width="220" @click="$emit('backToHome')">
                <span class="text-center">
                    <div class="mb-1">Return Homepage</div>
                </span>
            </v-btn>
        
        <div class="undercontruction-img">
            <v-img :src="config.NOT_FOUND_IMG"></v-img>
        </div>
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTheme } from 'vuetify';
import * as Config from '@/config'

export default defineComponent({
    name: 'Undercontruction',
    emits: ['backToHome'],
    setup() {

    },
    data() {
        return {
            config: Config
        }
    }
});
</script>

<style>
.undercontruction-img {
    width: 70vw;
}
</style>