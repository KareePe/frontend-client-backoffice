<template>
  <span
    class="bg-[#EEEDF1] text-[#0BA5EC] text-sm font-medium me-2 py-[2px] px-[12px] rounded-full"
    >{{ text }}</span
  >
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
const { text } = defineProps(["text"]);
console.log(text);
</script>
