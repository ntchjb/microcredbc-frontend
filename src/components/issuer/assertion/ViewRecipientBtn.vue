<template>
  <v-dialog
    v-model="dialog"
    width="800"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :hide-overlay="$vuetify.breakpoint.xsOnly"
  >
    <template v-slot:activator="{ on: dialogOn }">
      <v-tooltip top>
        <template v-slot:activator="{ on: tooltipOn }">
          <slot
            name="btn"
            :on="{ ...dialogOn, ...tooltipOn }"
          />
        </template>
        <span>Detail</span>
      </v-tooltip>
    </template>
    <v-card :tile="$vuetify.breakpoint.xsOnly">
      <dialog-toolbar
        title="Assertion"
        @click="dialog = false"
      />
      <v-container fluid>
        <v-row v-if="badgeClass.archived">
          <v-col cols="12">
            <archive-card />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <badge-info
              :image-src="badgeClass.image"
              :name="badgeClass.name"
              :description="badgeClass.description"
              :criteria="badgeClass.criteria.narrative"
              :tags="badgeClass.tags"
            />
            <div class="text-right">
              <alignment-btn :alignments="badgeClass.alignment">
                <template v-slot:btn="{ on }">
                  <v-btn
                    outlined
                    v-on="on"
                  >
                    Alignments
                  </v-btn>
                </template>
              </alignment-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="title">
              Recipient profile
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
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <evidence-info
              :narrative="assertion.narrative"
              :evidences="assertion.evidence"
            />
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
const BadgeInfo = () => import('@/components/badge/BadgeInfo.vue');
const AssertionInfo = () => import('@/components/assertion/AssertionInfo.vue');
const ProfileCard = () => import('@/components/common/ProfileCard.vue');
const EvidenceInfo = () => import('@/components/assertion/EvidenceInfo.vue');
const AlignmentBtn = () => import('@/components/badge/AlignmentBtn.vue');
const DialogToolbar = () => import('@/components/common/DialogToolbar.vue');
const ArchiveCard = () => import('@/components/issuer/badge/ArchiveCard.vue');

export default {
  components: {
    BadgeInfo,
    AssertionInfo,
    ProfileCard,
    EvidenceInfo,
    AlignmentBtn,
    DialogToolbar,
    ArchiveCard,
  },
  props: {
    assertion: {
      type: Object,
      default: () => ({}),
    },
    badgeClass: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

<style>

</style>
