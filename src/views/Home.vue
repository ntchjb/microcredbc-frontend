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
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-file-input
            v-model="certFile"
            accept=".pem"
            label="X.509 Certificate file"
            :rules="rules"
          />
          <v-file-input
            v-model="privKeyFile"
            label="Private key file"
            :rules="rules"
          />
          <v-btn @click="login">
            Confirm
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
  },
  data: () => ({
    valid: true,
    certFile: null,
    privKeyFile: null,
    rules: [
      (v) => !!v || 'This field is required.',
    ],
  }),

  methods: {
    async login() {
      console.log('hello');
      await this.$refs.form.validate();
      if (this.valid === false) {
        return;
      }
      // TODO: Try to extract attributes from X.509 certificate
      // TODO: Try to import private key to Web Cryptography API, and store them in indexDB
      // TODO: Store X.509 Certificate to localStorage
      this.$router.push('/badge');
    },
  },
};
</script>
