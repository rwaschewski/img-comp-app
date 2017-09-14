<template lang="html">
  <v-container class="text-xs-center">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <h4>Anmelden</h4>
                <v-layout row>
                  <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                    <v-btn class="primary" type="submit">Anmelden</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <router-link style="color: grey;" :to="{ name: 'Signup' }">Noch nicht registriert?</router-link>
                    <br>
                    <router-link style="color: grey;" :to="{ name: 'ImageCompressor' }">Überspringen</router-link>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/new')
      }
    }
  },
  methods: {
    onSignin () {
      // Vuex
      this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
    }
  }
}
</script>

<style lang="css">

</style>
