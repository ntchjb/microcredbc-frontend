<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
  >
    <template v-slot:activator="{ on }">
      <slot
        name="btn"
        :on="on"
      />
    </template>

    <v-card>
      <v-card-title>
        Are you sure you want to archive this badge?
      </v-card-title>

      <v-card-text>
        After archived this badge, it will no longer be able
        to create assertion from this badge. This action cannot be undone.
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          :loading="loading"
          :disabled="loading"
          @click="archive"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    badgeId: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    dialog: false,
    loading: false,
  }),
  methods: {
    ...mapActions('template', ['archiveBadgeTemplate']),
    async archive() {
      this.loading = true;
      await this.archiveBadgeTemplate(this.badgeId);
      this.loading = false;
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
