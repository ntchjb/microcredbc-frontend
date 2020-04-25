<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    persistent
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :hide-overlay="$vuetify.breakpoint.xsOnly"
    :disabled="disabled"
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
      <v-tooltip top>
        <template v-slot:activator="{ on: tooltipOn }">
          <v-btn
            color="red"
            :dark="!disabled"
            fixed
            bottom
            right
            fab
            large
            :disabled="disabled"

            v-on="{ ...dialogOn, ...tooltipOn }"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>{{ disabled ? 'This badge has been archived.' : 'Create new assertion' }}</span>
      </v-tooltip>
    </template>

    <v-card :tile="$vuetify.breakpoint.xsOnly">
      <v-card-title class="headline">
        Create a badge assertion
      </v-card-title>

      <v-container fluid>
        <v-card flat>
          <v-container fluid>
            <v-row
              justify="center"
              align="center"
            >
              <v-col
                cols="auto"
              >
                <v-avatar
                  tile
                  size="120"
                  color="grey"
                >
                  <v-img :src="badgeClass.image" />
                </v-avatar>
              </v-col>
              <v-col
                cols="12"
                sm="auto"
              >
                <div
                  class="headline mb-1"
                  :class="$vuetify.breakpoint.xsOnly ? 'text-center' : ''"
                >
                  {{ badgeClass.name }}
                </div>
                <div
                  class="subtitle"
                  :class="$vuetify.breakpoint.xsOnly ? 'text-center' : ''"
                >
                  {{ badgeClass.description }}
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-container
          fluid
          class="px-0 pb-0"
        >
          <v-row>
            <v-col cols="12">
              <div class="title">
                Earner profile info
              </div>
              <div class="subtitle grey--text">
                Please note that the profile info should be exactly matched
                with the one stored in ledger.
                Getting profile info from earner may be performed off-chain.
              </div>
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-model="recipientProfile"
                accept=".json"
                label="Earner profile"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <date-picker
                label="Expiration date"
                @change="assertion.expires = $event"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-textarea
                v-model="assertion.narrative"
                label="Narrative for relationship of evidences"
                auto-grow
                rows="1"
              />
            </v-col>
          </v-row>
          <evidence-input
            ref="evidenceUI"
            @change="assertion.evidence = $event"
          />
        </v-container>
      </v-container>

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
          @click="createAssertion"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DatePicker from '@/components/common/DatePicker.vue';
import { mapActions, mapGetters } from 'vuex';
import EvidenceInput from './EvidenceInput.vue';
import { readFileAsText } from '../../../helper/filereader';
import { defaultAssertionInfo } from '../../../constants';

export default {
  components: {
    DatePicker,
    EvidenceInput,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    badgeClass: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    dialog: false,
    assertion: defaultAssertionInfo,
    recipientProfile: null,
    loading: false,
    snackbar: false,
    status: '',
  }),
  computed: {
    ...mapGetters('assertion', ['assertions', 'assertionInfo']),
  },
  methods: {
    ...mapActions('assertion', [
      'createBadgeAssertions',
      'shareBadgeAssertionToEarner',
      'getBadgeAssertions',
      'loadBadgeAssertions',
    ]),
    async createAssertion() {
      if (this.recipientProfile !== null) {
        this.loading = true;
        const recipientString = await readFileAsText(this.recipientProfile);
        const recipient = JSON.parse(recipientString);
        this.assertion.recipient = recipient;
        this.assertion.badge = this.badgeClass.id;
        try {
          const assertionId = await this.createBadgeAssertions({
            assertionInfo: this.assertion,
            earnerMSPID: recipient.mspid,
          });
          await this.getBadgeAssertions();
          // Add properties that are generated by chaincode
          const resultAssertion = this.assertionInfo(assertionId);
          await this.shareBadgeAssertionToEarner({
            assertionID: assertionId,
            assertionInfo: resultAssertion,
            earnerMSPID: recipient.mspid,
          });
          this.dialog = false;
        } catch (err) {
          this.status = `Unable to create new assertion: ${err.message}`;
          this.snackbar = true;
        } finally {
          this.loading = false;
        }
      }
    },
    closeDialog() {
      this.$refs.evidenceUI.clear();
      this.badgeInfo = defaultAssertionInfo;
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
