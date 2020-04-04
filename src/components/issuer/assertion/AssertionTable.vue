<template>
  <v-data-table
    :headers="headers"
    :items="assertions"
    :items-per-page="20"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <view-recipient-btn
        :assertion="item"
        :badge-class="badgeClass"
      >
        <template v-slot:btn="{ on }">
          <v-icon
            class="mr-2"
            v-on="on"
          >
            mdi-eye
          </v-icon>
        </template>
      </view-recipient-btn>
      <revoke-btn :assertion="item">
        <template v-slot:btn="{ on }">
          <v-icon
            v-on="on"
          >
            mdi-cancel
          </v-icon>
        </template>
      </revoke-btn>
    </template>
    <template v-slot:item.revoked="{ item }">
      {{ item.revoked ? 'Yes' : 'No' }}
    </template>
  </v-data-table>
</template>

<script>
const ViewRecipientBtn = () => import('./ViewRecipientBtn.vue');
const RevokeBtn = () => import('./RevokeBtn.vue');

export default {
  components: {
    RevokeBtn,
    ViewRecipientBtn,
  },
  props: {
    assertions: {
      type: Array,
      default: () => [],
    },
    badgeClass: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    headers: [
      {
        text: 'Name',
        value: 'recipient.name',
      },
      {
        text: 'Email',
        value: 'recipient.email',
      },
      {
        text: 'Issued on',
        value: 'issuedOn',
      },
      {
        text: 'Expiration date',
        value: 'expires',
      },
      {
        text: 'Is revoked?',
        value: 'revoked',
      },
      {
        text: 'Actions',
        value: 'actions',
      },
    ],
  }),
};
</script>

<style>

</style>
