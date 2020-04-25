<template>
  <v-container class="fill-height">
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
        <v-btn
          depressed
          :loading="loading"
          :disabled="loading"
          @click="login"
        >
          Login
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { readFileAsText } from '@/helper/filereader';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
  },
  data: () => ({
    certFile: null,
    privKeyFile: null,
    loading: false,
    snackbar: false,
    status: '',
  }),
  computed: {
    ...mapGetters('setting', ['profile']),
  },
  methods: {
    ...mapActions('setting', ['importIdentity', 'removeIdentity', 'getProfile', 'setProfile', 'setRevocationList', 'getFabricNetwork']),
    async login() {
      if (this.certFile == null || this.privKeyFile == null) {
        return;
      }
      this.loading = true;
      const files = await Promise.all([
        readFileAsText(this.certFile),
        readFileAsText(this.privKeyFile),
      ]);
      await this.importIdentity({
        certificatePEM: files[0],
        privateKeyPEM: files[1],
      });
      try {
        await this.getFabricNetwork();
      } catch (err) {
        this.status = `Unable to get Fabric node names. ${err.message}`;
        this.snackbar = true;
        this.loading = false;
        await this.removeIdentity();
        return;
      }
      try {
        await this.getProfile();
        this.$router.push({ name: 'Badges' });
        return;
      } catch (err) {
        this.status = 'Unable to get profile. Registering users...';
        this.snackbar = true;
        if (this.profile.role === 'issuer') {
          await this.setRevocationList();
        }
      }

      try {
        await this.setProfile();
        await this.getProfile();
        this.$router.push({ name: 'Badges' });
      } catch (err) {
        this.status = `Unable to set profile. ${err.message}`;
        this.snackbar = true;
        await this.removeIdentity();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
