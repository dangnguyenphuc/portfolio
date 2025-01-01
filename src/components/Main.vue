<template>
  <main>
    <v-container>

      <v-card class="d-flex bg-red justify-center pa-2 my-4">
        Hi, I&apos;m a Developer based in Ho Chi Minh City, Vietnam.
      </v-card>

    <v-card
      class="mx-auto"
      prepend-icon="$vuetify"
      subtitle="Junior Software Engineer"
    >
      <template v-slot:title>
        <span class="font-weight-black">DANG NGUYEN PHUC</span>
      </template>

      <v-card-text class="d-flex justify-center align-center pt-4 pb-0">
        <RickAndMorty/>
      </v-card-text>
    </v-card>

    </v-container>
    

  </main>
</template>

<script lang="ts">

</script>