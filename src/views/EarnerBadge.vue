<template>
  <v-container>
    <v-row justify="end">
      <v-col cols="auto">
        <share-btn :assertion-id="assertion.id">
          <template v-slot:btn="{ on }">
            <v-btn
              elevation="0"
              :small="$vuetify.breakpoint.xsOnly"
              v-on="on"
            >
              <v-icon left>
                mdi-share
              </v-icon>
              Share
            </v-btn>
          </template>
        </share-btn>
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
        <div class="text-right pa-2">
          <alignment-btn :alignments="badgeClass.alignment">
            <template v-slot:btn="{ on }">
              <v-btn
                outlined
                class="mr-2"
                v-on="on"
              >
                Alignments
              </v-btn>
            </template>
          </alignment-btn>
          <profile-btn
            :profile="badgeClass.issuer"
            title="Issuer Profile"
          >
            <template v-slot:btn="{ on }">
              <v-btn
                outlined
                v-on="on"
              >
                Issuer
              </v-btn>
            </template>
          </profile-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <assertion-info
          :revoked="assertion.revoked"
          :revocation-reason="assertion.revocationReason"
          :expires="assertion.expires"
          :issued-on="assertion.issuedOn"
        />
        <div class="text-right pa-2">
          <evidence-btn
            :narrative="assertion.narrative"
            :evidences="assertion.evidence"
          >
            <template v-slot:btn="{ on }">
              <v-btn
                outlined
                v-on="on"
              >
                Evidences
              </v-btn>
            </template>
          </evidence-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { defaultTemplate, defaultAssertion } from '../constants';

const BadgeInfo = () => import('@/components/badge/BadgeInfo.vue');
const AssertionInfo = () => import('@/components/assertion/AssertionInfo.vue');
const ProfileBtn = () => import('@/components/common/ProfileBtn.vue');
const EvidenceBtn = () => import('@/components/assertion/EvidenceBtn.vue');
const AlignmentBtn = () => import('@/components/badge/AlignmentBtn.vue');
const ShareBtn = () => import('@/components/earner/assertion/ShareBtn.vue');

export default {
  components: {
    BadgeInfo,
    AssertionInfo,
    ProfileBtn,
    EvidenceBtn,
    AlignmentBtn,
    ShareBtn,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters('assertion', ['assertions']),
    assertion() {
      const assertion = this.assertions[this.$route.params.id];
      if (assertion !== undefined) {
        return assertion;
      }
      return defaultAssertion;
    },
    badgeClass() {
      const assertion = this.assertions[this.$route.params.id];
      if (assertion !== undefined) {
        return assertion.badge;
      }
      return defaultTemplate;
    },
  },
  created() {
    this.loadBadgeAssertions();
  },
  methods: {
    ...mapActions('assertion', ['loadBadgeAssertions']),
  },
};
</script>

<style>

</style>
