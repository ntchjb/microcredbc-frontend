<template>
  <div>
    <v-row>
      <v-col
        v-for="(alignment, index) in alignments"
        :key="index"
        cols="12"
      >
        <v-card outlined>
          <v-card-title>Alignment {{ index+1 }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="alignments[index].targetName"
                  label="Name"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="alignments[index].targetUrl"
                  label="URL"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="alignments[index].targetDescription"
                  label="Description"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="alignments[index].targetFramework"
                  label="Framework"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="alignments[index].targetCode"
                  label="Code"
                  outlined
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              @click="removeAlignment(index)"
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
          @click="addAlignment"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Add alignment
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    alignments: [],
  }),
  methods: {
    addAlignment() {
      const newAlignment = {
        targetName: '',
        targetUrl: '',
        targetDescription: '',
        targetFramework: '',
        targetCode: '',
      };
      this.alignments.push(newAlignment);
      this.$emit('change', this.alignments);
    },
    removeAlignment(index) {
      this.alignments.splice(index, 1);
      this.$emit('change', this.alignments);
    },
    clear() {
      this.alignments = [];
      this.$emit('change', this.alignments);
    },
  },
};
</script>

<style>

</style>
