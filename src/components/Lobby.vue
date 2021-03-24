<template>
  <div>
    <div class="ma-12 pa-12" id="navbar">
      <v-navigation-drawer permanent expand-on-hover height="100vh" style="background-color: lightyellow">
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="../assets/user.jpeg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ this.$store.state.user.username }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                this.$store.state.user.email
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item link :to="'/trade'">
            <v-list-item-title>Trade</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="'/leaderboard'">
            <v-list-item-title>Leaderboard</v-list-item-title>
          </v-list-item>
          <v-list-item link v-on:click="logout()">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Lobby",
  methods: {
    logout() {
      this.$store.commit('LOGOUT');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
#navbar {
  float: left;
}
</style>