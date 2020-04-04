<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row justify="center">
      <v-col cols="auto">
        <v-img
          contain
          :src="imageSrc"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="title">
          Badge Information
        </div>
      </v-col>
    </v-row>
    <v-row v-if="tags.length > 0">
      <v-col cols="12">
        <div>
          <v-chip
            v-for="(tag, index) in tags"
            :key="index"
            class="mr-2 mb-2"
          >
            {{ tag }}
          </v-chip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="font-weight-bold">
                  Name
                </td>
                <td>{{ name }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">
                  Description
                </td>
                <td>{{ description }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">
                  Criteria
                </td>
                <td>{{ criteria }}</td>
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
    imageSrc: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    criteria: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>

</style>
