<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    persistent
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :hide-overlay="$vuetify.breakpoint.xsOnly"
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
            <image-input
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
          :loading="loading"
          :disabled="loading"
          @click="createBadge"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import ImageInput from '@/components/common/ImageInput.vue';
import AlignmentInput from './AlignmentInput.vue';
import { defaultBadgeInfo } from '../../../constants';

export default {
  components: {
    ImageInput,
    AlignmentInput,
  },
  data: () => ({
    dialog: false,
    badgeInfo: { ...defaultBadgeInfo },
    loading: false,
    snackbar: false,
    status: '',
  }),
  methods: {
    ...mapActions('template', ['createBadgeTemplate', 'getBadgeTemplates']),
    async createBadge() {
      this.loading = true;
      try {
        await this.createBadgeTemplate(this.badgeInfo);
        await this.getBadgeTemplates();
        this.closeDialog();
      } catch (err) {
        this.status = `Unable to create badge templates: ${err.message}`;
        this.snackbar = true;
      } finally {
        this.loading = false;
      }
    },
    closeDialog() {
      this.$refs.badgeImageUI.clear();
      this.$refs.alignmentUI.clear();
      this.badgeInfo = { ...defaultBadgeInfo };
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
