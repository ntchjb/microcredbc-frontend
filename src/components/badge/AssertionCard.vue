<template>
  <badge-card />
</template>

<script>
import BadgeCard from '@/components/common/Card.vue';

export default {
  components: {
    BadgeCard,
  },
  props: {
    // Assume that assertion already have badgeClass
    assertion: {
      type: Object,
      default: null,
    },
  },
  computed: {
    isAssertionEmpty() {
      return this.assertion === null;
    },
  },
};
</script>

<style>

</style>
