<template>
  {{ getCount }}
  <v-btn variant="outlined" @click="increment"> Increment </v-btn>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useCounterStore } from "@/stores/counter";

let store = useCounterStore();

const getCount = computed(() => store.getCount);
const { increment } = store;

watch(getCount, () => {
    alert("counter change : " + getCount.value)
})

//Multiple Watcher
// watch([getCount,getCount2], () => {

// })
</script>

<style></style>
