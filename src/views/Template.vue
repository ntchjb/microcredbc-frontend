<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="badgeClass in badgeClassList"
        :key="badgeClass.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <issuer-template-card :badge-class="badgeClass" />
      </v-col>
    </v-row>
    <add-template-btn />
  </v-container>
</template>

<script>
import IssuerTemplateCard from '@/components/issuer/template/view/IssuerTemplateCard.vue';
import AddTemplateBtn from '@/components/issuer/template/add/AddTemplateBtn.vue';

export default {
  components: {
    IssuerTemplateCard,
    AddTemplateBtn,
  },
  data: () => ({
    // TODO: Query list of badges from Vuex
    badgeClassList: [],
  }),
};
</script>

<style>

</style>
