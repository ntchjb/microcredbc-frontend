<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col>
        <v-text-field
          v-model="searchTerm"
          hide-details
          prepend-icon="mdi-magnify"
          label="Search by email or member UUID"
          @keydown="search"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn @click="search">
          Search
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    searchTerm: '',
  }),
  methods: {
    search() {
      if (this.searchTerm !== '') {
        // TODO: get shared badges from backend
      }
    },
  },
};
</script>

<style>

</style>
