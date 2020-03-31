<template>
  <v-card>
    <v-img
      contain
      height="200"
      :src="imageSrc"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          />
        </v-row>
      </template>
    </v-img>
    <v-card-title>{{ title }}</v-card-title>

    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-actions>
      <v-spacer />
      <slot name="btn-action" />
      <v-dialog
        v-model="dialog"
        width="800"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            v-on="on"
          >
            View
          </v-btn>
        </template>

        <v-card>
          <slot name="view-dialog" />
          <v-card-actions>
            <v-spacer />
            <slot name="view-dialog-action" />
            <v-btn
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: 'loading...',
    },
    subtitle: {
      type: String,
      default: 'loading...',
    },
    imageSrc: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    dialog: false,
  }),

  computed: {
    ...mapGetters('setting', ['role']),
  },
};
</script>
