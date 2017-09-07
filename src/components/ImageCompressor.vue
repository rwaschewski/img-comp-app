<template>
  <div class="page-content" align="center">
    <v-container fluid>
      <v-layout row wrap class="controls">
        <v-flex xs10>
          <v-slider v-model="scale" dark thumb-label label="Skalierung"></v-slider>
        </v-flex>
        <v-flex xs2>
          <v-text-field dark v-model="scale" type="number"></v-text-field>
        </v-flex>
        <v-flex xs10>
          <v-slider v-model="quality" dark thumb-label label="Qualität"></v-slider>
        </v-flex>
        <v-flex xs2>
          <v-text-field dark v-model="quality" type="number"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid>
      <div class="layout__choose__image">
        <v-btn flat @click="upload">Upload</v-btn>
        <image-compressor class="compressor" :done="getFiles" :scale="scale" :quality="quality" ref="compressor"></image-compressor>
      </div>
      <div class="text-center" v-if="img">
        <img v-if="img" src="" alt="" :style="{ maxWidth: originalSize ? '100%' : null }" :src="img">
      </div>
      <div class="image-info" v-if="img">
      <b>Before: </b>
      <span>{{ original.size }}</span>
      <span class="separator"> | </span>
      <b>After: </b>
      <span>{{ compressed.size }}</span>
      <span class="separator"> | </span>
      <b>Savings: </b>
      <span>{{ savings }}%</span>
    </div>
    </v-container>
  </div>

</template>

<script>
  import imageCompressor from 'vue-image-compressor'
  export default {
    data () {
      return {
        img: '',
        scale: 100,
        quality: 50,
        originalSize: true,
        original: {},
        compressed: {}
      }
    },
    components: { imageCompressor },
    computed: {
      savings: function () {
        console.log(this.original.size)
        console.log(this.compressed.size)
        console.log(100 - (this.compressed.size.slice(0, -3) / this.original.size.slice(0, -3) * 100))
        return 100 - (this.compressed.size.slice(0, -3) / this.original.size.slice(0, -3) * 100).toFixed(2)
      }
    },
    methods: {
      upload () {
        let compressor = this.$refs.compressor.$el
        compressor.click()
      },
      getFiles (obj) {
        this.img = obj.compressed.blob
        this.original = obj.original
        this.compressed = obj.compressed
        console.log(obj)
      }
    }
  }
</script>


<style>
  body {
    font-family: Roboto;
  }
  .layout__controls__header{
    opacity: 1;
    visibility: visible;
    height: 30px;
    padding: 16px 10px 10px;
  }
  .image-info {
    margin: 15px 0;
  }
  .separator {
    margin: 0 5px;
  }
  input {
    width: 75%;
    display: block;
    padding: 5px;
    text-align: center;
    margin-bottom: 10px;
    max-width: 250px;
  }
  .compressor {
    display: none;
  }
</style>