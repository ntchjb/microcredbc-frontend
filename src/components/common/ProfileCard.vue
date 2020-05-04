<template>
  <v-card
    outlined
    max-width="600"
  >
    <v-card-actions
      v-if="editable"
      fluid
    >
      <v-spacer />
      <slot name="top-btn" />
    </v-card-actions>
    <v-row justify="center">
      <v-col cols="auto">
        <v-avatar
          size="90"
          color="grey"
        >
          <v-img
            v-if="profileWithDefaults.image"
            :src="profileWithDefaults.image"
          />
          <v-icon
            v-else
            large
            dark
          >
            mdi-account-circle
          </v-icon>
        </v-avatar>
      </v-col>
    </v-row>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1 text-center">
          {{ profileWithDefaults.name }}
        </v-list-item-title>
        <v-list-item-subtitle
          v-if="profileWithDefaults.description"
          class="mb-6 text-center"
        >
          {{ profileWithDefaults.description }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <v-icon left>
            mdi-email
          </v-icon>{{ profileWithDefaults.email }}
        </v-list-item-subtitle>
        <v-list-item-subtitle v-if="profileWithDefaults.telephone">
          <v-icon left>
            mdi-phone
          </v-icon>
          {{ profileWithDefaults.telephone }}
        </v-list-item-subtitle>
        <v-list-item-subtitle v-if="profileWithDefaults.url">
          <v-icon left>
            mdi-information
          </v-icon>{{ profileWithDefaults.url }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-spacer />
      <link-btn
        v-if="profileWithDefaults.url"
        :src="profileWithDefaults.url"
        responsive
      >
        Web
      </link-btn>
      <v-btn
        v-if="profileWithDefaults.telephone"
        text
        class="hidden-xs-only"
        @click="callProfile"
      >
        <v-icon left>
          mdi-phone
        </v-icon>
        call
      </v-btn>
      <v-btn
        icon
        class="hidden-sm-and-up"
        @click="callProfile"
      >
        <v-icon>mdi-phone</v-icon>
      </v-btn>
      <v-btn
        text
        class="hidden-xs-only"
        @click="mailProfile"
      >
        <v-icon left>
          mdi-email
        </v-icon>
        mail
      </v-btn>
      <v-btn
        icon
        class="hidden-sm-and-up"
        @click="mailProfile"
      >
        <v-icon>mdi-email</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defaultProfile } from '../../constants';

const LinkBtn = () => import('./LinkBtn.vue');

export default {
  components: {
    LinkBtn,
  },
  props: {
    profile: {
      type: Object,
      default: defaultProfile,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    profileWithDefaults() {
      if (this.profile) {
        return this.profile;
      }
      return defaultProfile;
    },
  },
  methods: {
    openProfileURL() {
      window.open(this.profileWithDefaults.url, '_blank');
    },
    callProfile() {
      window.open(`tel:${this.profileWithDefaults.telephone}`);
    },
    mailProfile() {
      window.open(`mailto:${this.profileWithDefaults.email}`);
    },
  },
};
</script>

<style>

</style>
