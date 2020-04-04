<template>
  <div>
    <v-btn
      text
      :class="responsive ? 'hidden-xs-only': ''"
      @click="openAlignmentUrl"
    >
      <v-icon left>
        mdi-link
      </v-icon>
      <slot />
    </v-btn>
    <v-btn
      icon
      :class="responsive ? 'hidden-sm-and-up': 'd-none'"
      @click="openAlignmentUrl"
    >
      <v-icon>mdi-link</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
    responsive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openAlignmentUrl() {
      window.open(this.src, '_blank');
    },
  },
};
</script>

<style>

</style>
