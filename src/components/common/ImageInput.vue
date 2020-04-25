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
          ref="imageInput"
          type="file"
          accept="image/png, image/jpeg, image/bmp"
          class="d-none"
          @change="updateImage"
        >
        <v-btn
          depressed
          @click="activateUploadImage"
        >
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
import { readFileAsDataURL } from '@/helper/filereader';

export default {
  props: {
    initImg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      avatarOverlay: false,
      image: null,
      imageDataUri: this.initImg,
      imageRules: [
        (value) => !value || value.size < 256000 || 'Image size should be less than 256 KB!',
      ],
      inputStatus: '',
    };
  },
  computed: {
    isImageEmpty() {
      return this.imageDataUri === '';
    },
    isImageStatusEmpty() {
      return this.inputStatus === '';
    },
  },
  watch: {
    initImg(newImage) {
      this.imageDataUri = newImage;
    },
  },
  methods: {
    activateUploadImage() {
      this.$refs.imageInput.click();
    },
    updateImage(event) {
      if (event.target.files.length > 0) {
        [this.image] = event.target.files;
        // TODO: Check for file size as rule
        this.imageRules.forEach((rule) => {
          const checkResult = rule(this.image);
          if (checkResult !== true && this.isImageStatusEmpty) {
            this.inputStatus = checkResult;
          } else {
            this.inputStatus = '';
          }
        });
        if (this.isImageStatusEmpty) {
          this.readImage();
        }
      }
    },
    async readImage() {
      let imageDataUri = '';
      if (this.image !== null) {
        imageDataUri = await this.readImageDataUrl(this.image);
      }
      this.imageDataUri = imageDataUri;
      this.$emit('change', this.imageDataUri);
    },
    readImageDataUrl(imageFile) {
      return readFileAsDataURL(imageFile);
    },
    clear() {
      this.image = null;
      this.inputStatus = '';
      this.imageDataUri = '';
      this.avatarOverlay = false;
      this.$refs.imageInput.value = '';
      this.$emit('change', this.imageDataUri);
    },
  },
};
</script>

<style>

</style>
