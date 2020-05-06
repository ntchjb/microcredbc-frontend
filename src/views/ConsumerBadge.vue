<template>
  <v-container>
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
      <v-col>
        <div class="title">
          Recipient Profile
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <profile-card :profile="assertion.recipient" />
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
import { defaultAssertion } from '../constants';

const BadgeInfo = () => import('@/components/badge/BadgeInfo.vue');
const AssertionInfo = () => import('@/components/assertion/AssertionInfo.vue');
const ProfileBtn = () => import('@/components/common/ProfileBtn.vue');
const ProfileCard = () => import('@/components/common/ProfileCard.vue');
const EvidenceBtn = () => import('@/components/assertion/EvidenceBtn.vue');
const AlignmentBtn = () => import('@/components/badge/AlignmentBtn.vue');

export default {
  components: {
    BadgeInfo,
    AssertionInfo,
    ProfileBtn,
    EvidenceBtn,
    AlignmentBtn,
    ProfileCard,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters('assertion', ['assertions']),
    assertion() {
      const assertion = this.assertions[this.$route.params.id];
      if (assertion) {
        return assertion;
      }
      return defaultAssertion;
    },
    badgeClass() {
      const assertion = this.assertions[this.$route.params.id];
      if (assertion) {
        return assertion.badge;
      }
      return defaultAssertion.badge;
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
