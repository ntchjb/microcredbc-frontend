<template>
  <v-app-bar
    app
    dark
  >
    <v-toolbar-title>
      <router-link
        to="/badges"
        class="toolbar-title"
      >
        Fabric Badge
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-menu
      left
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          class="hidden-sm-and-up"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item to="/profile">
          <v-list-item-title>
            <v-icon left>
              mdi-account
            </v-icon> Profile
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>
            <v-icon left>
              mdi-logout
            </v-icon>Logout
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn
        text
        to="/profile"
      >
        <v-icon left>
          mdi-account
        </v-icon>
        Profile
      </v-btn>
      <v-btn
        text
        @click="logout"
      >
        <v-icon left>
          mdi-logout
        </v-icon>
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout() {
      console.log('hello');
      // TODO: remove certificate from storage
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
