<template>
  <v-app dark toolbar>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      :mini-variant="mini"
      dark
      overflow
      absolute
    >
    <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.native.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon light>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar v-if="userIsAuthenticated">
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ getUser }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" >
        <v-divider light></v-divider>
        <v-list-tile class="mt-10"v-for="item in menuItems" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link :to="item.link">{{ item.title }}</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Image Compressor PWA</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      mini: false,
      right: null
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { title: 'Registrieren', icon: 'dashboard', link: '/signup' },
        { title: 'Anmelden', icon: 'question_answer', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { title: 'Komprimieren', icon: 'question_answer', link: '/' },
          { title: 'Bilder', icon: 'dashboard', link: '/images' }
        ]
      }
      return menuItems
    },
    getUser () {
      return this.$store.getters.user
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
</script>

<style>

</style>
