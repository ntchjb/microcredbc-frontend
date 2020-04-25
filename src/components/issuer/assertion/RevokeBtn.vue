<template>
  <v-dialog
    v-model="dialog"
    width="800"
  >
    <v-snackbar
      v-model="snackbar"
      :timeout="10000"
      multi-line
    >
      {{ status }}
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <template v-slot:activator="{ on: dialogOn }">
      <v-tooltip
        v-model="tooltip"
        top
      >
        <template v-slot:activator="{ on: tooltipOn }">
          <slot
            name="btn"
            :on="{ ...dialogOn, ...tooltipOn }"
          />
        </template>
        <span>Revoke</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        Are you sure you want to revoke this assertion?
      </v-card-title>
      <v-card-text>
        <div>
          Assertion of {{ assertion.recipient.name }} ({{ assertion.recipient.email }})
        </div>
        <v-text-field
          v-model="reason"
          label="Please give a reason for this revocation..."
        />
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
          @click="revoke(assertion)"
        >
          Revoke
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    assertion: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    dialog: false,
    tooltip: false,
    loading: false,
    reason: '',
    snackbar: false,
    status: '',
  }),
  methods: {
    ...mapActions('assertion', ['revokeBadgeAssertions']),
    async revoke() {
      try {
        this.loading = true;
        await this.revokeBadgeAssertions({
          assertionId: this.assertion.id,
          reason: this.reason,
        });
        this.dialog = false;
      } catch (err) {
        this.status = `Unable to revoke assertion: ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>

</style>
