<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
  >
    <template v-slot:activator="{ on }">
      <slot
        name="btn"
        :on="on"
      />
    </template>
    <v-card>
      <v-card-title>Share this badge</v-card-title>
      <v-card-text>
        <v-combobox
          v-model="selectedOrgs"
          :items="mspIDs"
          label="Please input MSP ID of organizations that will receive your badge"
          multiple
          chips
          hint="Press enter to add another org"
          class="mb-2"
        />
        <p>*Please note that shared badges cannot be unshared</p>
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
          @click="share"
        >
          Share
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { fabricDefaultProperties } from '../../../helper/fabric-rest';
export default {
  data: () => ({
    dialog: false,
    selectedOrgs: [],
  }),
  computed: {
    ...mapGetters('setting', ['fabricNetwork']),
    // TODO: Query list of MSP ID from Fabric SDK
    mspIDs() {
      const network = this.fabricNetwork;
      const { channel } = fabricDefaultProperties;
      if (network !== null) {
        return Object.keys(this.fabricNetwork[channel].peers);
      }
      return [];
    },
  },
  methods: {
    share() {
      // TODO: share this badge to target organizations
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
