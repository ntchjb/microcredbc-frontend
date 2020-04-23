<template>
  <v-app>
    <app-bar v-if="!isHomePage" />
    <v-content>
      <router-view />
    </v-content>
    <v-footer height="100">
      <div>
        Made by
        <v-chip
          href="https://github.com/ntchjb"
          target="_blank"
        >
          Nathachai Jaiboon
        </v-chip>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from '@/components/common/AppBar.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {
    AppBar,
  },

  computed: {
    ...mapGetters('setting', ['isIdentityExist']),
    isHomePage() {
      // This function will be triggerred twice
      // during the router is loading to set name to each routes
      // , the name is null
      return this.$route.name === 'Home' || this.$route.name === null;
    },
  },

  async created() {
    if (this.isIdentityExist === false) {
      const success = await this.loadIdentity();
      if (success === true && this.$route.name === 'Home') {
        this.$router.push({ name: 'Badges' });
      }
    }
  },

  methods: {
    ...mapActions('setting', ['loadIdentity']),
  },
};
</script>
