<template>
  <v-btn
    depressed
    :loading="loading"
    :disabled="loading"
    class="mb-4"
    @click="refresh"
  >
    <v-icon left>
      mdi-refresh
    </v-icon> refresh
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    ...mapActions('assertion', ['getBadgeAssertions']),
    async refresh() {
      this.loading = true;
      await this.getBadgeAssertions();
      this.loading = false;
    },
  },
};
</script>

<style>

</style>
