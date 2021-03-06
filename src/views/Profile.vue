<template>
  <v-container>
    <v-snackbar
      v-model="snackbar"
      :timeout="10000"
      multi-line
    >
      {{ status }}
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
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
                        :init-img="profileExtra.image"
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
                        :disabled="isIssuer"
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
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          depressed
          @click="downloadProfile"
        >
          <v-icon left>
            mdi-download
          </v-icon> Download profile
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { generateAndDownloadTextFile } from '../helper/filereader';
import { roles } from '../constants';


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
    snackbar: false,
    status: '',
  }),
  computed: {
    ...mapGetters('setting', ['profile', 'role']),
    isIssuer() {
      return this.role === roles.issuer;
    },
  },
  methods: {
    ...mapActions('setting', ['setProfile', 'getProfile', 'setRevocationList']),
    async editProfile() {
      try {
        this.dialogLoading = true;
        await this.setProfile(this.profileExtra);
        await this.getProfile();
        this.closeDialog();
      } catch (err) {
        this.status = `Unable to set profile: ${err.message}`;
        this.snackbar = true;
      } finally {
        this.dialogLoading = false;
      }
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
    downloadProfile() {
      generateAndDownloadTextFile(`${this.profile.name} Profile.json`, JSON.stringify(this.profile));
    },
  },
};
</script>

<style>

</style>
