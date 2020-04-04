<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row>
      <v-col>
        <div class="title">
          Assertion information
        </div>
      </v-col>
    </v-row>
    <v-row v-if="revoked">
      <v-col>
        <v-card
          outlined
          color="warning"
        >
          <v-card-title>This badge assertion has been revoked</v-card-title>
          <v-card-text>
            Reason: {{ revocationReason }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="isExpired">
      <v-col>
        <v-card
          outlined
          color="warning"
        >
          <v-card-title>This badge assertion has expired</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="font-weight-bold text-right">
                  Issued On
                </td>
                <td>{{ issuedOn }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold text-right">
                  Expiration Date
                </td>
                <td>{{ expires }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  props: {
    issuedOn: {
      type: String,
      default: '',
    },
    expires: {
      type: String,
      default: '',
    },
    revoked: {
      type: Boolean,
      default: false,
    },
    revocationReason: {
      type: String,
      default: '',
    },
  },
  computed: {
    isExpired() {
      if (this.expires === '') {
        return false;
      }
      const expirationDate = new Date(this.expires);
      const issuedDate = new Date(this.issuedOn);

      return expirationDate < issuedDate;
    },
  },
};
</script>

<style>

</style>
