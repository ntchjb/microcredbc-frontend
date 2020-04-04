<template>
  <v-card
    outlined
    max-width="600"
  >
    <v-row justify="center">
      <v-col cols="auto">
        <v-avatar
          size="90"
          class="mt-3"
        >
          <v-img
            v-if="profile.image !== undefined"
            :src="profile.image"
          />
          <v-icon
            v-else
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
          {{ profile.name }}
        </v-list-item-title>
        <v-list-item-subtitle
          v-if="profile.description !== undefined"
          class="mb-6 text-center"
        >
          {{ profile.description }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <v-icon left>
            mdi-email
          </v-icon>{{ profile.email }}
        </v-list-item-subtitle>
        <v-list-item-subtitle v-if="profile.telephone !== undefined">
          <v-icon left>
            mdi-phone
          </v-icon>
          {{ profile.telephone }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <v-icon left>
            mdi-information
          </v-icon>{{ profile.url }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-spacer />
      <link-btn
        :src="profile.url"
        responsive
      >
        Web
      </link-btn>
      <v-btn
        v-if="profile.telephone !== undefined"
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
const LinkBtn = () => import('./LinkBtn.vue');

export default {
  components: {
    LinkBtn,
  },
  props: {
    profile: {
      type: Object,
      default: null,
    },
  },
  methods: {
    openProfileURL() {
      window.open(this.profile.url, '_blank');
    },
    callProfile() {
      window.open(`tel:${this.profile.telephone}`);
    },
    mailProfile() {
      window.open(`mailto:${this.profile.email}`);
    },
  },
};
</script>

<style>

</style>
