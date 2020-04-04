<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row>
      <v-col>
        <div class="title">
          Narrative of Evidences
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>{{ narrative }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="title">
          Evidences
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(evidence, index) in evidences"
        :key="index"
      >
        <v-card outlined>
          <v-card-title>{{ evidence.name }}</v-card-title>
          <v-card-subtitle>{{ evidence.genre }}</v-card-subtitle>
          <v-card-text>
            <p>Narrative: {{ evidence.narrative }}</p>
            <p>Description: {{ evidence.description }}</p>
            <p>Audience: {{ evidence.audience }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <link-btn :src="evidence.id">
              More
            </link-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const LinkBtn = () => import('@/components/common/LinkBtn.vue');
export default {
  components: {
    LinkBtn,
  },
  props: {
    evidences: {
      type: Array,
      default: () => [],
    },
    narrative: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>

</style>
