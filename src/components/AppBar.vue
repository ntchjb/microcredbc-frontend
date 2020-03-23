<template>
  <v-app-bar
    app
    dark
  >
    <v-toolbar-title>
      <router-link
        to="/badge"
        class="toolbar-title"
      >
        FabricBadge
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn
        to="/badge"
        text
      >
        <v-icon left>
          mdi-seal-variant
        </v-icon>
        Badge
      </v-btn>

      <v-btn
        to="/template"
        text
      >
        <v-icon left>
          mdi-file-hidden
        </v-icon>
        Template
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
