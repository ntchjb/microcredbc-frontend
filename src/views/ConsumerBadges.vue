<template>
  <v-container class="mb-12">
    <v-row justify="center">
      <v-col cols="auto">
        <div
          class="display-2 text-center"
        >
          Shared badges
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <refresh-assertion-btn />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="(badgeClass, index) in badgeList"
        :key="badgeClass.id"
        cols="12"
        sm="6"
        lg="4"
        xl="3"
      >
        <badge-card
          :title="badgeClass.name"
          :subtitle="badgeClass.description"
          :image-src="badgeClass.image"
          :to="`/badges/${assertionIdList[index]}`"
          :avatar-src="assertions[assertionIdList[index]].recipient.image"
          :bottom-title="assertions[assertionIdList[index]].recipient.name"
        />
      </v-col>
      <v-col
        v-if="Object.keys(assertions).length === 0"
        cols="12"
        class="text-center"
      >
        <p class="grey--text">
          There is no badge assertion at the moment. Please hit refresh button above for updates.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const BadgeCard = () => import('@/components/consumer/assertion/BadgeCard.vue');
const RefreshAssertionBtn = () => import('@/components/common/RefreshAssertionBtn.vue');

export default {
  components: {
    BadgeCard,
    RefreshAssertionBtn,
  },
  computed: {
    ...mapGetters('assertion', ['assertions']),
    badgeList() {
      return Object.keys(this.assertions).map((assertionId) => this.assertions[assertionId].badge);
    },
    assertionIdList() {
      return Object.keys(this.assertions);
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
