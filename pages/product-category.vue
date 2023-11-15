<script setup lang="ts">
import { ref, reactive, computed } from "vue"
definePageMeta({
  middleware: "auth-middleware"
})
const props = defineProps(["title", "breadcrumbsText"])
</script>

<template>
  <Toolbars />
  <div class="ContainerLayout">
    <!-- header menu -->
    <div class="flex w-full justify-between">
      <div class="card">
        <div>
          <!-- <TestUpdate :title="navbarText" /> -->
        </div>
      </div>
      <v-btn
        color="#084F93"
        variant="flat"
        size="large"
        rounded="lg"
        prepend-icon="mdi-download"
      >
        ดาวน์โหลดบิลจัดส่ง
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply border border-[#EEEDF1] rounded-md p-2 flex space-x-5 justify-center items-center;
}
</style>
