<template>
  <v-container class="mb-12">
    <v-row justify="center">
      <v-col cols="auto">
        <div
          class="display-2 mb-4 text-center"
        >
          Badges
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="(badgeClass, index) in badgeList"
        :key="badgeClass.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <badge-card
          :title="badgeClass.name"
          :subtitle="badgeClass.description"
          :image-src="badgeClass.image"
          :to="`/badges/${assertionIdList[index]}`"
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

const BadgeCard = () => import('@/components/common/BadgeCard.vue');

export default {
  components: {
    BadgeCard,
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
