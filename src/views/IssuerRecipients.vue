<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="display-2 text-center mb-2">
          Recipients
        </div>
        <div class="subtitle text-center">
          {{ badgeClass.name }} Badge
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          depressed
          :loading="loading"
          :disabled="loading"
          @click="refresh"
        >
          <v-icon left>
            mdi-refresh
          </v-icon> Refresh
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <assertion-table
          :assertions="assertionList"
          :badge-class="badgeClass"
        />
      </v-col>
    </v-row>
    <add-assertion-btn
      :badge-class="badgeClass"
      :disabled="badgeClass.archived"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const AddAssertionBtn = () => import('@/components/issuer/assertion/AddAssertionBtn.vue');
const AssertionTable = () => import('@/components/issuer/assertion/AssertionTable.vue');

export default {
  components: {
    AddAssertionBtn,
    AssertionTable,
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters('assertion', ['assertions', 'badgeAssertions']),
    ...mapGetters('template', ['badgeClassObject']),
    // Return list of assertions for the given badge template ID
    assertionList() {
      const assertionIdList = this.badgeAssertions[this.$route.params.id];
      if (assertionIdList !== undefined) {
        return this.badgeAssertions[this.$route.params.id]
          .map((templateId) => this.assertions[templateId]);
      }
      return [];
    },
    badgeClass() {
      const badgeClass = this.badgeClassObject[this.$route.params.id];
      if (badgeClass !== undefined) {
        return badgeClass;
      }
      return {};
    },
  },
  created() {
    this.loadBadgeTemplates();
    this.loadBadgeAssertions();
  },
  methods: {
    ...mapActions('assertion', ['getBadgeAssertions', 'loadBadgeAssertions']),
    ...mapActions('template', ['loadBadgeTemplates']),
    async refresh() {
      this.loading = true;
      await this.getBadgeAssertions();
      this.loading = false;
    },
  },
};
</script>

<style>

</style>
