<template>
  <v-card class="fill-height">
    <v-card
      flat
      tile
      @click="openLink"
    >
      <v-img
        contain
        height="200"
        :src="imageSrc"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            />
          </v-row>
        </template>
      </v-img>
    </v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: 'loading...',
    },
    subtitle: {
      type: String,
      default: 'loading...',
    },
    imageSrc: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '/',
    },
  },
  computed: {
    ...mapGetters('setting', ['role']),
  },
  methods: {
    openLink() {
      this.$router.push({ path: this.to });
    },
  },
};
</script>
