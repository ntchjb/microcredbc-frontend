<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    max-width="600"
    min-width="200"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        readonly
        :value="dateTimeString"
        :label="label"
        v-on="on"
      />
    </template>
    <v-card>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="6"
          class="text-center"
        >
          <v-date-picker
            v-model="date"
            no-title
            class="elevation-0"
            @change="setDate"
          />
        </v-col>
        <v-col
          cols="auto"
          sm="6"
          align-self="center"
        >
          <time-picker @change="setTime" />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="menu = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import TimePicker from './TimePicker.vue';

const dateTimeFormatPptions = {
  year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
};

export default {
  components: {
    TimePicker,
  },
  props: {
    label: {
      type: String,
      default: 'Date',
    },
  },
  data: () => ({
    date: '',
    datetime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      0,
      0,
      0,
      0,
    ),
    dateTimeString: '',
    menu: false,
  }),
  computed: {
  },
  methods: {
    setDate(date) {
      const dateSet = date.split('-').map((stringNum) => Number(stringNum));
      this.datetime.setFullYear(dateSet[0], dateSet[1] - 1, dateSet[2]);
      this.$emit('change', this.datetime.toISOString());
      this.dateTimeString = this.datetime.toLocaleDateString('en-US', dateTimeFormatPptions);
    },
    setTime(time) {
      const timeSet = time.split(':').map((stringNum) => Number(stringNum));
      this.datetime.setHours(timeSet[0], timeSet[1], timeSet[2], 0);
      this.$emit('change', this.datetime.toISOString());
      this.dateTimeString = this.datetime.toLocaleDateString('en-US', dateTimeFormatPptions);
    },
  },
};
</script>

<style>

</style>
