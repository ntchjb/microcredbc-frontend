<template>
  <div>
    <v-row justify="center">
      <v-col cols="auto">
        <v-avatar
          size="150"
          color="grey lighten-4"
          tile
          @mouseenter="avatarOverlay = !isImageEmpty"
          @mouseleave="avatarOverlay = false"
        >
          <v-overlay
            absolute
            :value="avatarOverlay"
          >
            <v-btn
              icon
              @click="clear"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-overlay>
          <v-img
            :src="imageDataUri"
          />
        </v-avatar>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="auto"
        align-self="center"
        class="text-center"
      >
        <input
          ref="badgeImageInput"
          type="file"
          accept="image/png, image/jpeg, image/bmp"
          class="d-none"
          @change="updateBadgeImage"
        >
        <v-btn @click="activateUploadBadgeImage">
          <v-icon left>
            mdi-image
          </v-icon> Add image
        </v-btn>
        <v-input
          v-if="inputStatus !== ''"
          hint
          :error-messages="inputStatus"
          :error="!isImageStatusEmpty"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    avatarOverlay: false,
    image: null,
    imageDataUri: '',
    badgeImgRules: [
      (value) => !value || value.size < 256000 || 'Image size should be less than 256 KB!',
    ],
    inputStatus: '',
  }),
  computed: {
    isImageEmpty() {
      return this.imageDataUri === '';
    },
    isImageStatusEmpty() {
      return this.inputStatus === '';
    },
  },
  methods: {
    activateUploadBadgeImage() {
      this.$refs.badgeImageInput.click();
    },
    updateBadgeImage(event) {
      if (event.target.files.length > 0) {
        [this.image] = event.target.files;
        // TODO: Check for file size as rule
        this.badgeImgRules.forEach((rule) => {
          const checkResult = rule(this.image);
          if (checkResult !== true && this.isImageStatusEmpty) {
            this.inputStatus = checkResult;
          } else {
            this.inputStatus = '';
          }
        });
        if (this.isImageStatusEmpty) {
          this.readBadgeImage();
        }
      }
    },
    async readBadgeImage() {
      let imageDataUri = '';
      if (this.image !== null) {
        imageDataUri = await this.readFile(this.image);
      }
      this.imageDataUri = imageDataUri;
      this.$emit('change', this.imageDataUri);
    },
    readFile(file) {
      return new Promise((resolve) => {
        const fr = new FileReader();
        fr.onload = () => {
          resolve(fr.result);
        };
        fr.readAsDataURL(file);
      });
    },
    clear() {
      this.image = null;
      this.inputStatus = '';
      this.imageDataUri = '';
      this.avatarOverlay = false;
      this.$refs.badgeImageInput.value = '';
      this.$emit('change', this.imageDataUri);
    },
  },
};
</script>

<style>

</style>
