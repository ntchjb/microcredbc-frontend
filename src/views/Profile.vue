<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        class="text-center"
      >
        <div class="display-2">
          User Profile
        </div>
      </v-col>
      <v-col cols="12">
        <div
          class="title text-center"
        >
          Your organization's MSP ID is: <v-chip>{{ profile.mspId }}</v-chip>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="auto"
      >
        <profile-card :profile="profile" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';


const ProfileCard = () => import('@/components/common/ProfileCard.vue');

export default {
  components: {
    ProfileCard,
  },
  computed: {
    ...mapGetters('setting', ['profile']),
  },
};
</script>

<style>

</style>
