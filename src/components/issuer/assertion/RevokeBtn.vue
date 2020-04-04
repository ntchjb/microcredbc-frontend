<template>
  <v-dialog
    v-model="dialog"
    width="800"
  >
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
        Assertion of {{ assertion.recipient.name }} ({{ assertion.recipient.email }})
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
          @click="revoke(assertion)"
        >
          Revoke
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
  }),
  methods: {
    revoke() {
      // TODO: revoke assertions
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
