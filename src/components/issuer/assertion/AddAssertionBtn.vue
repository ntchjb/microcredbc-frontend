<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    persistent
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :hide-overlay="$vuetify.breakpoint.xsOnly"
    :disabled="disabled"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="red"
        :dark="!disabled"
        fixed
        bottom
        right
        fab
        large
        :disabled="disabled"

        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
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
                sm="6"
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
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="recipientIdentity"
                label="Recipient email"
              />
            </v-col>
            <v-col
              cols="6"
              sm="auto"
            >
              <v-checkbox
                v-model="assertion.recipient.hashed"
                label="Hash email?"
              />
            </v-col>
            <v-col
              v-if="assertion.recipient.hashed"
            >
              <v-text-field
                v-model="assertion.recipient.salt"
                label="Salt value"
              />
            </v-col>
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
import EvidenceInput from './EvidenceInput.vue';

const getDefaultAssertion = () => ({
  recipient: {
    identity: '',
    type: 'email',
    hashed: false,
    salt: '',
  },
  badge: '',
  evidence: [],
  narrative: '',
  expires: '',
});

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
    assertion: getDefaultAssertion(),
    recipientIdentity: '',
  }),
  methods: {
    async createAssertion() {
      this.assertion.recipient.identity = await this.storeIdentity();
      this.assertion.badge = this.badgeClass.id;
      // TODO: Create a badge assertion, can be multiple
      // assertions at once by sending multiple transactions
      this.dialog = false;
    },
    async storeIdentity() {
      if (this.assertion.recipient.hashed) {
        this.assertion.recipient.identity = await this.getIdentityHash(
          this.assertion.recipient.identity,
          this.assertion.recipient.salt,
        );
      } else {
        this.assertion.recipient.identity = this.recipientIdentity;
      }
    },
    async getIdentityHash(data, salt) {
      const msgUint8 = new TextEncoder()
        .encode(`${data}${salt}`);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
      const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      return `sha256$${hashHex}`;
    },
    closeDialog() {
      this.$refs.evidenceUI.clear();
      this.badgeInfo = getDefaultAssertion();
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
