<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="assertion in assertionList"
        :key="assertion.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <earner-assertion-card
          v-if="role === 'earner'"
          :assertion="assertion"
        />
        <consumer-assertion-card
          v-if="role === 'consumer'"
          :assertion="assertion"
        />
        <issuer-assertion-card
          v-if="role === 'issuer'"
          :assertion="assertion"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import EarnerAssertionCard from '@/components/earner/assertion/view/EarnerAssertionCard.vue';
import ConsumerAssertionCard from '@/components/consumer/assertion/view/ConsumerAssertionCard.vue';
import IssuerAssertionCard from '@/components/issuer/assertion/view/IssuerAssertionCard.vue';

export default {
  components: {
    EarnerAssertionCard,
    ConsumerAssertionCard,
    IssuerAssertionCard,
  },
  data: () => ({
    assertionList: [],
  }),
  computed: {
    ...mapGetters('setting', ['role']),
  },
};
</script>

<style>

</style>
