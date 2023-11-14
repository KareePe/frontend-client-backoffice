<template>
  <div>
    <Toolbars />
    <Navbar text="บทความ" />

    <div class="p-4 sm:ml-64">
      <v-card
        variant="flat"
        class="border border-[#EEEDF1] rounded-[8px] pb-[15px] mt-[30px]"
      >
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="5">
              <v-card width="100%" height="86%" color="red" class="m-[12px]">
              </v-card>
            </v-col>
            <v-col cols="7">
              <v-text-field
                label="หัวข้อ"
                variant="outlined"
                class="min-h-[56px] rounded-[8px] m-[12px]"
                single-line
                hide-details
              />
              <v-text-field
                label="Keyword"
                variant="outlined"
                class="min-h-[56px] rounded-[8px] m-[12px] my-[30px]"
                single-line
                hide-details
              />
              <v-textarea
                label="คำอธิบาย"
                variant="outlined"
                class="min-h-[215px] rounded-[8px] m-[12px] mb-[15px]"
                single-line
                hide-details
              />
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, computed } from "vue";
</script>
