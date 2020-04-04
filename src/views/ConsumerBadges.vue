<template>
  <v-container class="mb-12">
    <v-row justify="center">
      <v-col cols="auto">
        <div
          class="display-2 mb-4 text-center"
        >
          Shared badges
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
      >
        <search-input />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="(badgeClass, index) in badgeList"
        :key="badgeClass.id"
        cols="12"
        sm="6"
        md="4"
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
        v-if="assertions.length === 0"
        cols="12"
        class="text-center"
      >
        <p class="grey--text">
          There is no badge at the moment.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

const BadgeCard = () => import('@/components/consumer/assertion/BadgeCard.vue');
const SearchInput = () => import('@/components/consumer/assertion/SearchInput.vue');

export default {
  components: {
    BadgeCard,
    SearchInput,
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
};
</script>

<style>

</style>
