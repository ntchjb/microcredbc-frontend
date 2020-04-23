<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    persistent
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :hide-overlay="$vuetify.breakpoint.xsOnly"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="red"
        dark
        fixed
        bottom
        right
        fab
        large
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card :tile="$vuetify.breakpoint.xsOnly">
      <v-card-title
        class="headline"
      >
        Create new Badge Template
      </v-card-title>

      <v-container fluid>
        <v-row>
          <v-col>
            <badge-image-input
              ref="badgeImageUI"
              @change="badgeInfo.image = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="badgeInfo.name"
              label="Badge name"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-textarea
              v-model="badgeInfo.description"
              label="Description"
              auto-grow
              rows="1"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-textarea
              v-model="badgeInfo.criteria.narrative"
              label="Criteria"
              auto-grow
              rows="1"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-combobox
              v-model="badgeInfo.tags"
              label="Tags"
              multiple
              small-chips
              hint="Press enter to insert another tag"
              deletable-chips
            />
          </v-col>
        </v-row>
        <alignment-input
          ref="alignmentUI"
          @change="badgeInfo.alignment = $event"
        />
      </v-container>

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="closeDialog"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="createBadge"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import BadgeImageInput from './BadgeImageInput.vue';
import AlignmentInput from './AlignmentInput.vue';

const getDefaultBadgeInfo = () => ({
  name: '',
  description: '',
  image: null,
  criteria: {
    narrative: '',
  },
  alignment: [],
  tags: [],
});
export default {
  components: {
    BadgeImageInput,
    AlignmentInput,
  },
  data: () => ({
    dialog: false,
    badgeInfo: getDefaultBadgeInfo(),
  }),
  methods: {
    createBadge() {
      // TODO: Create new bage
      this.closeDialog();
    },
    closeDialog() {
      this.$refs.badgeImageUI.clear();
      this.$refs.alignmentUI.clear();
      this.badgeInfo = getDefaultBadgeInfo();
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>