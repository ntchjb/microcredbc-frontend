<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
  >
    <template v-slot:activator="{ on }">
      <v-btn
        text
        :disabled="archived"
        v-on="on"
      >
        {{ archived ? 'Archived': 'Archive' }}
      </v-btn>
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
          @click="archive"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    archived: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    archive() {
      // TODO: archive this badge
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
