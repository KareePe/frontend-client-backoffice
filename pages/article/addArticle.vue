<template>
  <div>
    <Toolbars />
    <Navbar text="บทความ,เพิ่มบทความ" />

    <div class="p-4 sm:ml-64">
      <v-card
        variant="flat"
        class="border border-[#EEEDF1] rounded-[8px] pb-[15px] mt-[30px]"
      >
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-card v-if="!summarizeUpload" class="m-[12px]" flat>
                <v-card-text class="flex justify-between items-center pa-0">
                  <div
                    @drop="fnOnFileDrop"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    class="w-full border-[#EEEDF1] border rounded-md"
                  >
                    <input
                      type="file"
                      multiple
                      name="file"
                      class="hidden"
                      id="fileInput"
                      @change="fnOnClickUpload"
                      ref="file"
                    />

                    <label
                      for="fileInput"
                      class="h-[324px] w-full flex justify-center items-center flex-col space-y-4"
                    >
                      <div v-if="!fileValue">
                        <div class="text-[14px] flex flex-col items-center">
                          <v-icon
                            class="bg-[#EEEDF1] !w-[60px] !h-[60px] rounded-full mb-[12px]"
                            size="40"
                            color="#74777F"
                            >mdi-file-upload-outline</v-icon
                          >
                          <div>
                            ลากและวาง หรือ
                            <span class="text-[#0BA5EC]">เลือก</span>
                            เพื่ออัปโหลด
                          </div>
                          <div class="text-[#00000061] mt-[12px]">
                            .JPG or .JPEG
                          </div>
                        </div>
                      </div>
                      <div v-else>
                        <img
                          :src="previewImageUrl"
                          height="200"
                        />
                        รูปจะขึ้นตรงนี้
                      </div>
                    </label>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="8">
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
                class="min-h-[130px] rounded-[8px] m-[12px] mb-[15px]"
                single-line
                hide-details
              />
            </v-col>
          </v-row>
        </v-col>
      </v-card>

      <v-card variant="flat" class="border rounded-[8px] pa-3 mt-[30px]">
        <v-col class="mt-[12px]" cols="12">
          <v-icon color="#084F93">mdi-tag</v-icon>
          Tags
        </v-col>
        <v-col cols="12">
          <div>สร้างแท็กส์ที่เกี่ยวกับคอนเทนต์</div>
        </v-col>
        <v-row align="center">
          <v-col cols="8" md="4">
            <v-text-field
              label="Your input here"
              v-model="newTag"
              variant="outlined"
              class="rounded-[8px] m-[12px] !h-[56px]"
              hide-details
            />
          </v-col>
          <v-col cols="4" md="4">
            <v-btn
              variant="outlined"
              color="#084F93"
              @click="addTag"
              class="!max-w-[480px] min-h-[56px] rounded-[8px]"
              >เพิ่ม</v-btn
            >
          </v-col>
        </v-row>

        <v-card flat>
          <span v-for="(tag, index) in tags" :key="index">
            <v-chip class="normalColor ml-3 mt-2">
              <v-icon left>mdi-check</v-icon>
              {{ tag }}
            </v-chip>
          </span>
        </v-card>
      </v-card>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});

import { ref } from "vue";

const fileValue = ref(null);
const summarizeUpload = ref(false);
const previewImageUrl = ref(null);

const fnOnClickUpload = () => {
  const input = document.getElementById("fileInput");
  const files = input.files;

  if (files.length > 0) {
    fileValue.value = files[0];
  }
};

const fnOnFileDrop = (event) => {
  // Handle fnOnFileDrop event
};

const dragover = (event) => {
  // Handle dragover event
};

const dragleave = (event) => {
  // Handle dragleave event
};

const tags = ref([]);
const newTag = ref("");

const addTag = () => {
  tags.value.push(newTag.value);
  newTag.value = "";
};
</script>

<style scoped>
.normalColor {
  color: #ffff;
  background-color: #084f93;
}
</style>
