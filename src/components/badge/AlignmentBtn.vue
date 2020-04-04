<template>
  <v-dialog
    v-model="dialog"
    width="800"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :hide-overlay="$vuetify.breakpoint.xsOnly"
  >
    <template v-slot:activator="{ on }">
      <slot
        name="btn"
        :on="on"
      />
    </template>
    <v-card :tile="$vuetify.breakpoint.xsOnly">
      <dialog-toolbar
        title="Alignments"
        @click="dialog = false"
      />
      <v-container
        fluid
        class="px-6"
      >
        <alignment-info :alignments="alignments" />
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
const AlignmentInfo = () => import('@/components/badge/AlignmentInfo.vue');
const DialogToolbar = () => import('@/components/common/DialogToolbar.vue');

export default {
  components: {
    AlignmentInfo,
    DialogToolbar,
  },
  props: {
    alignments: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

<style>

</style>
