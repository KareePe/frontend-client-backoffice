<template>
  <div class="dashboardCard">
    <div class="flex">
      <div class="flex justify-center items-center">
        <v-icon class="mr-1" color="#084F93" :size="iconSize">{{
          icon
        }}</v-icon>
      </div>
      <div class="text-[22px]">{{ title }}</div>
    </div>
    <div class="flex justify-end items-end mt-4">
      <div class="text-[34px] font-bold leading-[1.2] mr-2">{{ value }}</div>
      <div class="text-[20px]">{{ unit }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
const valueRef = ref();
const props = defineProps({
  title: String,
  unit: String,
  icon: String,
  value: String,
  iconSize: String,
});

const { icon, title, unit, value, iconSize } = props;

onMounted(() => {
  valueRef.value = value;
});

watch(value, () => {
  valueRef.value = value;
});
</script>

<style scoped>
.dashboardCard {
  @apply border border-[#EEEDF1] rounded-md w-full box-border p-5;
}
</style>
