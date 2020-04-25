<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
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
    snackbar: false,
    status: '',
  }),
  computed: {
    ...mapGetters('assertion', ['assertionInfo']),
    ...mapGetters('setting', ['fabricNetwork']),
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
      try {
        await Promise.all(fabricJobs);
        this.dialog = false;
      } catch (err) {
        this.status = `Unable to share this assertion: ${err.message}`;
        this.snackbar = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>

</style>
