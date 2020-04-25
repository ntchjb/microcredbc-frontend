<template>
  <div>
    <v-row>
      <v-col
        v-for="(evidence, index) in evidences"
        :key="index"
        cols="12"
      >
        <div class="title">
          Evidence {{ index+1 }}
        </div>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="evidences[index].id"
              label="URL"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="evidences[index].name"
              label="Name"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <v-textarea
              v-model="evidences[index].description"
              label="Description"
              auto-grow
              rows="1"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <v-textarea
              v-model="evidences[index].narrative"
              label="Narrative"
              auto-grow
              rows="1"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="evidences[index].genre"
              label="Genre"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="evidences[index].audience"
              label="Audience"
            />
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn
              text
              @click="removeEvidence(index)"
            >
              Remove
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          depressed
          @click="addEvidence"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Add Evidence
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    evidences: [],
  }),
  methods: {
    addEvidence() {
      const newEvidence = {
        targetName: '',
        targetUrl: '',
        targetDescription: '',
        targetFramework: '',
        targetCode: '',
      };
      this.evidences.push(newEvidence);
      this.$emit('change', this.evidences);
    },
    removeEvidence(index) {
      this.evidences.splice(index, 1);
      this.$emit('change', this.evidences);
    },
    clear() {
      this.evidences = [];
      this.$emit('change', this.evidences);
    },
  },
};
</script>

<style>

</style>
