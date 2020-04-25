<template>
  <v-card>
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
    <v-card-actions>
      <v-list class="grow py-0">
        <v-list-item>
          <v-list-item-avatar color="grey darken-3">
            <v-img
              :src="avatarSrc"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="bottomTitleTruncated" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-actions>
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
    avatarSrc: {
      type: String,
      default: '',
    },
    bottomTitle: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters('setting', ['role']),
    bottomTitleTruncated() {
      return this.bottomTitle.substring(0, 31);
    },
  },
  methods: {
    openLink() {
      this.$router.push(this.to);
    },
  },
};
</script>
