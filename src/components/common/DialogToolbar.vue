<template>
  <v-toolbar
    v-if="$vuetify.breakpoint.xsOnly"
    dark
  >
    <v-btn
      icon
      dark
      @click="$emit('click', false)"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>

</style>
