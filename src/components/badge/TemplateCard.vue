<template>
  <badge-card
    :title="badgeClass.name"
    :subtitle="badgeClass.description"
    :image-src="badgeClass.image"
  >
    <template v-slot:view-dialog>
      <v-img
        height="350"
        contain
        :src="badgeClass.image"
      />
      <v-card-title>Badge Template {{ badgeClass.archived ? '(Archived)' : '' }}</v-card-title>
      <v-card-text>
        <div>
          <v-chip
            v-for="(tag, index) in badgeClass.tags"
            :key="index"
            class="mr-2 mb-2"
          >
            {{ tag }}
          </v-chip>
        </div>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="font-weight-bold">
                  Name
                </td>
                <td>{{ badgeClass.name }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">
                  Description
                </td>
                <td>{{ badgeClass.description }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">
                  Criteria
                </td>
                <td>{{ badgeClass.criteria.narrative }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-title>Issuer Profile</v-card-title>
      <v-card-text>
        <v-row justify="center">
          <v-col
            cols="12"
            sm="8"
          >
            <profile-card :profile="badgeClass.issuer" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-title>Alignments</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(alignment, index) in badgeClass.alignment"
            :key="index"
            cols="auto"
          >
            <v-card
              outlined
            >
              <v-card-title>{{ alignment.targetName }}</v-card-title>
              <v-card-subtitle>{{ alignment.targetDescription }}</v-card-subtitle>
              <v-card-text>
                <p>Framework: {{ alignment.targetFramework }}</p>
                <p>Code: {{ alignment.targetCode }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  text
                  @click="openAlignmentUrl(alignment.targetUrl)"
                >
                  <v-icon left>
                    mdi-link
                  </v-icon>
                  More
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
    <template v-slot:btn-action>
      <slot name="btn-action" />
    </template>
  </badge-card>
</template>

<script>
import ProfileCard from '@/components/common/ProfileCard.vue';
import BadgeCard from '@/components/common/Card.vue';

export default {
  components: {
    BadgeCard,
    ProfileCard,
  },
  props: {
    badgeClass: {
      type: Object,
      default: null,
    },
  },
  methods: {
    openAlignmentUrl(url) {
      window.open(url, '_blank');
    },
  },
};
</script>

<style>

</style>
