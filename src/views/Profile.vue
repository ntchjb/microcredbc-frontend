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
          Your organization's MSP ID is: <v-chip>{{ profile ? profile.mspid : '' }}</v-chip>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="auto"
      >
        <profile-card
          :profile="profile"
          editable
        >
          <template slot="top-btn">
            <v-btn
              icon
              @click.stop="openDialog"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-dialog
              v-model="dialog"
              max-width="800"
              :fullscreen="$vuetify.breakpoint.xsOnly"
              :hide-overlay="$vuetify.breakpoint.xsOnly"
            >
              <v-card :tile="$vuetify.breakpoint.xsOnly">
                <v-card-title
                  class="headline"
                >
                  Edit profile
                </v-card-title>

                <v-container fluid>
                  <v-row justify="center">
                    <v-col cols="auto">
                      <image-input
                        ref="badgeImageUI"
                        @change="profileExtra.image = $event"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-textarea
                        v-model="profileExtra.description"
                        label="Description"
                        auto-grow
                        rows="1"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-textarea
                        v-model="profileExtra.url"
                        label="Profile webpage"
                        auto-grow
                        rows="1"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    text
                    @click="closeDialog"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    :loading="dialogLoading"
                    :disabled="dialogLoading"
                    @click="editProfile"
                  >
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </profile-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


const ProfileCard = () => import('@/components/common/ProfileCard.vue');
const ImageInput = () => import('@/components/common/ImageInput.vue');

export default {
  components: {
    ProfileCard,
    ImageInput,
  },
  data: () => ({
    profileExtra: {},
    dialog: false,
    dialogLoading: false,
  }),
  computed: {
    ...mapGetters('setting', ['profile']),
  },
  methods: {
    ...mapActions('setting', ['setProfile', 'getProfile']),
    async editProfile() {
      this.dialogLoading = true;
      await this.setProfile(this.profileExtra);
      await this.getProfile();
      this.dialogLoading = false;
      this.closeDialog();
    },
    openDialog() {
      this.profileExtra = {
        image: this.profile.image || '',
        url: this.profile.url || '',
        description: this.profile.description || '',
      };
      this.dialog = true;
    },
    closeDialog() {
      this.profileExtra = {};
      this.$refs.badgeImageUI.clear();
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
