<template>
  <div>
    <v-row>
      <v-col
        v-for="(evidence, index) in evidences"
        :key="index"
        cols="12"
      >
        <v-card outlined>
          <v-card-title>Evidence {{ index+1 }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="evidences[index].id"
                  label="URL"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="evidences[index].name"
                  label="Name"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="evidences[index].description"
                  label="Description"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="evidences[index].narrative"
                  label="Narrative"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="evidences[index].genre"
                  label="Genre"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="evidences[index].audience"
                  label="Audience"
                  outlined
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              @click="removeEvidence(index)"
            >
              Remove
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
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
