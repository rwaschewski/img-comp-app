<template>
  <div class="page-content" align="center">
      <v-layout row wrap class="controls" v-if="imgSelected">
        <v-flex xs10>
          <v-slider v-model="scale" dark thumb-label label="Größe"></v-slider>
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
      <v-avatar class="logo"
          v-else
          tile
          size= "256px"
          color='#000'
        >
          <img src="/static/img/icons/android-chrome-192x192.png" alt="avatar">
      </v-avatar>
      <div class="image-info" v-if="img">
        <b>Vorher: </b>
        <span>
          {{ original.size }}
        </span>
        <span class="separator"> | </span>
        <b>Nachher: </b>
        <span>
          {{ compressed.size }}
        </span>
        <span class="separator"> | </span>
        <b>Ersparnis: </b>
        <span>
          {{ savings }}%
        </span>
      </div>
    <v-container fluid>
      <v-btn v-if="imgSelected" absolute fab dark large bottom right class="pink" @click="upload">
        <v-icon dark>save</v-icon>
      </v-btn>
      <v-btn  v-else absolute fab dark large bottom right class="pink" @click="compress">
        <v-icon dark>add</v-icon>
      </v-btn>
      <!-- File Picker to prepare compression -->
      <image-compressor
        class="compressor"
        :done="getFiles"
        :scale="scale"
        :quality="quality"
        ref="compressor"
        accept="image/*">
      </image-compressor>
      <div class="text-center" v-if="img">
        <img id="compressedImage" v-if="img" src="" alt="" :style="{ maxWidth: originalSize ? '100%' : null }" :src="img">
      </div>

    <!--<fab
      :main-icon="mainIcon"
      :position="position"
      :bg-color="bgColor"
      :action="fabActions"
      @add="upload"
      @save="save"
    ></fab>-->
    </v-container>
  </div>
</template>

<script>
  import imageCompressor from 'vue-image-compressor'
  export default {
    components: {
      imageCompressor
    },
    data () {
      return {
        img: '',
        imageUrl: '',
        scale: 100,
        quality: 50,
        originalSize: true,
        original: {},
        compressed: {},
        imgSelected: false
      }
    },
    computed: {
      savings: function () {
        return 100 - (this.compressed.size.slice(0, -3) / this.original.size.slice(0, -3) * 100).toFixed(2)
      }
    },
    methods: {
      compress () {
        let compressor = this.$refs.compressor.$el
        compressor.click()
      },
      upload () {
        const file = this.compressed
        // let filename = file.name
        this.$store.dispatch('saveImage', { file: file, url: this.img })
        this.$root.$firebaseRefs.compImg.push({
          'url': file.blob,
          'created_at': -1 * new Date().getTime()
        })
        .then(() => {
          this.imageUrl = file.blob
          this.$store.setImage(file.blob)
        })
      },
      getFiles (obj) {
        this.img = obj.compressed.blob
        this.original = obj.original
        this.compressed = obj.compressed
        console.log(this.compressed)
        this.imgSelected = true
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
  .pink {
    margin: 0 3em 5em 0!important;
    background-color: "#F57C00"!important
  }
  .logo {
    margin-top: 6em;
  }
</style>
