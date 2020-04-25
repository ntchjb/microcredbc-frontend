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
          :loading="loading"
          :disabled="loading"
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
  props: {
    assertionId: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    dialog: false,
    selectedOrgs: [],
    loading: false,
  }),
  computed: {
    ...mapGetters('assertion', ['assertionInfo']),
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
    ...mapActions('assertion', ['shareBadgeAssertion']),

    async share() {
      this.loading = true;
      const fabricJobs = [];
      this.selectedOrgs.forEach((mspid) => {
        fabricJobs.push(this.shareBadgeAssertion({
          assertionID: this.assertionId,
          assertionInfo: this.assertionInfo(this.assertionId),
          targetMSPID: mspid,
        }));
      });
      await Promise.all(fabricJobs);
      this.loading = false;
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
