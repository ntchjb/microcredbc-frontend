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
        title="Evidences"
        @click="dialog = false"
      />
      <v-container
        fluid
        class="px-6"
      >
        <evidence-info
          :evidences="evidences"
          :narrative="narrative"
        />
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
const EvidenceInfo = () => import('@/components/assertion/EvidenceInfo.vue');
const DialogToolbar = () => import('@/components/common/DialogToolbar.vue');

export default {
  components: {
    EvidenceInfo,
    DialogToolbar,
  },
  props: {
    evidences: {
      type: Array,
      default: () => [],
    },
    narrative: {
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
