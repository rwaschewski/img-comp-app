<template lang="html">
  <v-container id="userImages">
    <v-layout row v-for="image in userImages" :key="image.id">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="image" >
          <v-container fluid>
            <v-layout row>
              <v-flex xs12>
                <v-card-media
                  :src="image.data"
                  height="130px"
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    userImages () {
      return this.$store.getters.loadedImages
    }
  }
}
</script>

<style lang="css">
</style>
