<template>
  <main>
    <v-container>
        <v-card class="d-flex bg-red justify-center pa-2 my-4">
          Hi, I&apos;m a Developer based in Ho Chi Minh City, Vietnam.
        </v-card>

        <v-row>
          <v-col>
            <v-card
            class="mx-auto"
            subtitle="Junior Software Engineer"
            prepend-icon="$vuetify"
          >
            <template v-slot:title>
              <span class="font-weight-black">DANG NGUYEN PHUC</span>
            </template>
            
            <v-card-text class="d-flex justify-center align-center pt-4 pb">
              
                  <v-img 
                    class="ma-auto rounded-circle"
                    src="/dang-nguyen/profilePicture.jpg"
                    alt="avatar"
                  ></v-img>
                
              
            </v-card-text>

          </v-card>
          </v-col>
          
          <v-col>
            <v-card class="mx-auto"
            subtitle="Do you see their eyes following your mouse ?">
            <template v-slot:title>
              <span class="font-weight-black">Rick and Morty</span>
            </template>
              <v-card-text class="d-flex justify-center align-center pt-4 pb-0">
                <RickAndMorty/>
              </v-card-text>
            </v-card>
          </v-col>
         
        </v-row>

    </v-container>
  </main>
</template>

<script lang="ts">
import RickAndMorty from './RickAndMorty/RickAndMorty.vue';

</script>

<style scoped>
</style>