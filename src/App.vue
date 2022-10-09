<script setup>
import MonthSelector from './components/MonthSelector.vue';
</script>

<template>
  <div class=" bg-white rounded notebook rounded-xl py-4" style="max-width: 38rem;">
    <section class="text-4xl border-b text-center p-2 pl-16">
      <h1>What's in season in <MonthSelector v-model="month" />?</h1>
    </section>
    <section class="text-xl">
      <ul>
        <li v-for="(food, index) in foods" :key="index" class="border-b p-2 pl-16">
          {{ food }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import seasonality from './assets/seasonality.json';

export default {
  data() {
    return {
      month: (new Date()).getMonth()
    }
  },
  computed: {
    foods() {
      return seasonality[this.month];
    }
  }
}

</script>
<style scoped>
.notebook {
  margin: auto;
  position: relative;
}

.notebook::before {
  content: " ";
  top: 0;
  bottom: 0;
  position: absolute;
  border-left: 1px solid red;
  margin-left: 3rem;
}
</style>