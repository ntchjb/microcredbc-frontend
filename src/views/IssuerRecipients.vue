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
import { mapGetters } from 'vuex';

const AddAssertionBtn = () => import('@/components/issuer/assertion/AddAssertionBtn.vue');
const AssertionTable = () => import('@/components/issuer/assertion/AssertionTable.vue');

export default {
  components: {
    AddAssertionBtn,
    AssertionTable,
  },
  computed: {
    ...mapGetters('assertion', ['assertions', 'badgeAssertions']),
    ...mapGetters('template', ['badgeClassObject']),
    // Return list of assertions for the given badge template ID
    assertionList() {
      return this.badgeAssertions[this.$route.params.id]
        .map((templateId) => this.assertions[templateId]);
    },
    badgeClass() {
      return this.badgeClassObject[this.$route.params.id];
    },
  },
};
</script>

<style>

</style>
