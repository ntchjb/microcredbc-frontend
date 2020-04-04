<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :hide-overlay="$vuetify.breakpoint.xsOnly"
    max-width="600"
  >
    <template v-slot:activator="{ on }">
      <slot
        name="btn"
        :on="on"
      />
    </template>
    <v-card :tile="$vuetify.breakpoint.xsOnly">
      <dialog-toolbar
        :title="title"
        @click="dialog = false"
      />
      <v-container
        fluid
        class="px-6"
      >
        <v-row>
          <v-col>
            <div class="title">
              {{ title }}
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="auto"
          >
            <profile-card :profile="profile" />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const ProfileCard = () => import('./ProfileCard.vue');
const DialogToolbar = () => import('./DialogToolbar.vue');

export default {
  components: {
    ProfileCard,
    DialogToolbar,
  },
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

<style>

</style>
