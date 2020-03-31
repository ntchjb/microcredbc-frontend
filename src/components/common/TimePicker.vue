<template>
  <v-card
    flat
  >
    <v-row
      no-gutters
      justify="space-around"
    >
      <v-col cols="auto">
        <v-btn
          icon
          :disabled="hour === 23"
        >
          <v-icon @click="increaseHour">
            mdi-arrow-up
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          icon
          :disabled="minute === 59"
        >
          <v-icon @click="increaseMinute">
            mdi-arrow-up
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          icon
          :disabled="second === 59"
        >
          <v-icon @click="increaseSecond">
            mdi-arrow-up
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      justify="space-around"
    >
      <v-col cols="2">
        <v-text-field
          :value="hour"
          label="Hour"
          type="number"
          class="shrink"
          @input="emitHour"
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
          :value="minute"
          label="Minute"
          type="number"
          @input="emitMinute"
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
          :value="second"
          label="Second"
          type="number"
          @input="emitSecond"
        />
      </v-col>
    </v-row>
    <v-row
      no-gutters
      justify="space-around"
    >
      <v-col cols="auto">
        <v-btn
          icon
          :disabled="hour === 0"
          @click="decreaseHour"
        >
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          icon
          :disabled="minute === 0"
          @click="decreaseMinute"
        >
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          icon
          :disabled="second === 0"
          @click="decreaseSecond"
        >
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    hour: 0,
    minute: 0,
    second: 0,
  }),
  computed: {
    timeString() {
      return `${this.pad(this.hour, 2)}:${this.pad(this.minute, 2)}:${this.pad(this.second, 2)}`;
    },
  },
  methods: {
    pad(num, size) { return (`000000000${num}`).substr(-size); },
    emitHour(hour) {
      if (hour === '') {
        this.hour = 0;
        return;
      }
      const hourNum = parseInt(hour, 10);
      if (hourNum > 23 || hourNum < 0) {
        this.hour = 0;
      } else {
        this.hour = hourNum;
      }
      this.emit();
    },
    emitMinute(minute) {
      if (minute === '') {
        this.minute = 0;
        return;
      }
      const minuteNum = parseInt(minute, 10);
      if (minuteNum > 59 || minuteNum < 0) {
        this.minute = 0;
      } else {
        this.minute = minuteNum;
      }
      this.emit();
    },
    emitSecond(second) {
      if (second === '') {
        this.second = 0;
        return;
      }
      const secondNum = parseInt(second, 10);
      if (secondNum > 59 || secondNum < 0) {
        this.second = 0;
      } else {
        this.second = secondNum;
      }
      this.emit();
    },
    emit() {
      this.$emit('change', this.timeString);
    },
    increaseHour() {
      if (this.hour < 23) {
        this.hour += 1;
        this.emit();
      }
    },
    increaseMinute() {
      if (this.minute < 59) {
        this.minute += 1;
        this.emit();
      }
    },
    increaseSecond() {
      if (this.second < 59) {
        this.second += 1;
        this.emit();
      }
    },
    decreaseHour() {
      if (this.hour > 0) {
        this.hour -= 1;
        this.emit();
      }
    },
    decreaseMinute() {
      if (this.minute > 0) {
        this.minute -= 1;
        this.emit();
      }
    },
    decreaseSecond() {
      if (this.second > 0) {
        this.second -= 1;
        this.emit();
      }
    },
  },
};
</script>

<style>

</style>
