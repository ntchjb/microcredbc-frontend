<template>
  <div>
    <v-row>
      <v-col
        v-for="(alignment, index) in alignments"
        :key="index"
        cols="12"
      >
        <p class="title">
          Alignment {{ index+1 }}
        </p>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="alignments[index].targetName"
              label="Name"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="alignments[index].targetUrl"
              label="URL"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <v-textarea
              v-model="alignments[index].targetDescription"
              label="Description"
              auto-grow
              rows="1"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="alignments[index].targetFramework"
              label="Framework"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="alignments[index].targetCode"
              label="Code"
            />
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn
              text
              @click="removeAlignment(index)"
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
