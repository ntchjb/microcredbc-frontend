<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row>
      <v-col>
        <div class="title">
          Alignments
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(alignment, index) in alignments"
        :key="index"
        cols="12"
      >
        <v-card
          outlined
        >
          <v-card-title>{{ alignment.targetName }}</v-card-title>
          <v-card-subtitle>{{ alignment.targetDescription }}</v-card-subtitle>
          <v-card-text>
            <p>Framework: {{ alignment.targetFramework }}</p>
            <p>Code: {{ alignment.targetCode }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <link-btn :src="alignment.targetUrl">
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
    alignments: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>

</style>
