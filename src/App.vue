<template>
  <v-app>
    <app-bar v-if="!isHomePage" />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue';

export default {
  name: 'App',

  components: {
    AppBar,
  },

  computed: {
    isHomePage() {
      return this.$route.name === 'Home';
    },
  },
};
</script>
