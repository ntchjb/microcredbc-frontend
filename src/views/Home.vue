<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        class="text-center"
        cols="auto"
      >
        <h1 class="display-2 font-weight-bold mb-3">
          Fabric Badge
        </h1>
        <p class="subheading mx-3">
          Blockchain-based badge management for micro-credentialing platform
        </p>
        <v-file-input
          v-model="certFile"
          accept=".pem"
          label="X.509 Certificate file"
        />
        <v-file-input
          v-model="privKeyFile"
          label="Private key file"
        />
        <v-btn @click="login">
          Login
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { readFileAsText } from '@/helper/filereader';
import { mapActions } from 'vuex';

export default {
  components: {
  },
  data: () => ({
    certFile: null,
    privKeyFile: null,
  }),
  methods: {
    ...mapActions('setting', ['importIdentity']),
    async login() {
      if (this.certFile == null || this.privKeyFile == null) {
        return;
      }
      const files = await Promise.all([
        readFileAsText(this.certFile),
        readFileAsText(this.privKeyFile),
      ]);
      await this.importIdentity({
        certificatePEM: files[0],
        privateKeyPEM: files[1],
      });
      // TODO: Try to extract attributes from X.509 certificate
      this.$router.push({ name: 'Badges' });
    },
  },
};
</script>
