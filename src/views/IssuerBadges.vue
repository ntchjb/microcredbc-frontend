<template>
  <v-container class="mb-12">
    <v-row justify="center">
      <v-col cols="auto">
        <div
          class="display-2 mb-4 text-center"
        >
          Badge Templates
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="badgeClass in badgeClassArray"
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
          :to="`/badges/${badgeClass.id}`"
        />
      </v-col>
      <v-col
        v-if="badgeClassArray.length === 0"
        cols="12"
        class="text-center"
      >
        <p class="grey--text">
          There is no badge template at the moment.
        </p>
      </v-col>
    </v-row>
    <add-template-btn />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

const BadgeCard = () => import('@/components/common/BadgeCard.vue');
const AddTemplateBtn = () => import('@/components/issuer/badge/AddTemplateBtn.vue');


export default {
  components: {
    BadgeCard,
    AddTemplateBtn,
  },
  computed: {
    ...mapGetters('template', ['badgeClassArray']),
  },
};
</script>

<style>

</style>
