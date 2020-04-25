<template>
  <v-container>
    <v-row justify="end">
      <v-col cols="auto">
        <v-btn
          depressed
          class="mr-2"
          :small="$vuetify.breakpoint.xsOnly"
          :to="`/badges/${badgeClass.id}/recipients`"
        >
          <v-icon left>
            mdi-school
          </v-icon>Recipients
        </v-btn>
        <archive-template-btn :badge-id="badgeClass.id">
          <template v-slot:btn="{ on }">
            <v-btn
              depressed
              :small="$vuetify.breakpoint.xsOnly"
              :disabled="badgeClass.archived"
              v-on="on"
            >
              <v-icon left>
                mdi-archive
              </v-icon>
              {{ badgeClass.archived ? 'Archived': 'Archive' }}
            </v-btn>
          </template>
        </archive-template-btn>
      </v-col>
    </v-row>
    <v-row v-if="badgeClass.archived">
      <v-col cols="12">
        <archive-card />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <badge-info
          :image-src="badgeClass.image"
          :name="badgeClass.name"
          :description="badgeClass.description"
          :criteria="badgeClass.criteria.narrative"
          :tags="badgeClass.tags"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <alignment-info :alignments="badgeClass.alignment" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { defaultTemplate } from '@/constants';

const BadgeInfo = () => import('@/components/badge/BadgeInfo.vue');
const AlignmentInfo = () => import('@/components/badge/AlignmentInfo.vue');
const ArchiveTemplateBtn = () => import('@/components/issuer/badge/ArchiveTemplateBtn.vue');
const ArchiveCard = () => import('@/components/issuer/badge/ArchiveCard.vue');

export default {
  components: {
    BadgeInfo,
    AlignmentInfo,
    ArchiveTemplateBtn,
    ArchiveCard,
  },
  data: () => ({
    defaultBadgeClass: defaultTemplate,
  }),
  computed: {
    ...mapGetters('template', ['badgeClassObject']),
    badgeClass() {
      const badgeClass = this.badgeClassObject[this.$route.params.id];
      if (badgeClass === undefined) {
        return this.defaultBadgeClass;
      }
      return badgeClass;
    },
  },
  created() {
    this.loadBadgeTemplates();
  },
  methods: {
    ...mapActions('template', ['loadBadgeTemplates']),
  },
};
</script>

<style>

</style>
