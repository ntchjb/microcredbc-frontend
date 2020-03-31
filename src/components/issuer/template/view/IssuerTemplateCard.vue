<template>
  <badge-template :badge-class="badgeClass">
    <template v-slot:btn-action>
      <archive-template-btn :archived="badgeClass.archived" />
      <add-assertion-btn
        :disabled="badgeClass.archived"
        :badge-class="badgeClass"
      />
    </template>
  </badge-template>
</template>

<script>
import BadgeTemplate from '@/components/badge/TemplateCard.vue';
import AddAssertionBtn from '@/components/issuer/assertion/add/AddAssertionBtn.vue';
import ArchiveTemplateBtn from '@/components/issuer/template/archive/ArchiveTemplateBtn.vue';

export default {
  components: {
    BadgeTemplate,
    AddAssertionBtn,
    ArchiveTemplateBtn,
  },
  props: {
    badgeClass: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style>

</style>
