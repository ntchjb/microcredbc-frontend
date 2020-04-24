<template>
  <v-container class="mb-12">
    <v-row justify="center">
      <v-col cols="auto">
        <div
          class="display-2 text-center"
        >
          Badge Templates
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="auto"
        class="mb-4"
      >
        <v-btn
          depressed
          :loading="loading"
          :disabled="loading"
          @click="refresh"
        >
          <v-icon left>
            mdi-refresh
          </v-icon> refresh
        </v-btn>
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
          There is no badge template at the moment. Please hit refresh button above for updates.
        </p>
      </v-col>
    </v-row>
    <add-template-btn />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const BadgeCard = () => import('@/components/common/BadgeCard.vue');
const AddTemplateBtn = () => import('@/components/issuer/badge/AddTemplateBtn.vue');


export default {
  components: {
    BadgeCard,
    AddTemplateBtn,
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters('template', ['badgeClassArray']),
  },
  created() {
    this.loadBadgeTemplates();
  },
  methods: {
    ...mapActions('template', ['getBadgeTemplates', 'loadBadgeTemplates']),
    async refresh() {
      this.loading = true;
      await this.getBadgeTemplates();
      this.loading = false;
    },
  },
};
</script>

<style>

</style>
