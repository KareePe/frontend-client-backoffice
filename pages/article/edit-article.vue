<template>
  <div>
    <Toolbars />
    <Navbar text="บทความ,ซื้อขายไงให้ปัง" />

    <div class="p-4 md:ml-64">
      <div
        class="lg:flex block gap-[15px] my-[15px] lg:justify-end justify-between"
      >
        <v-btn
          @click="fn_submit('delete')"
          flat
          class="!bg-[#BA1A1A] text-white flex gap-[15px] items-center justify-center !rounded-[8px] !h-[56px] lg:w-[358px] w-full mb-[15px]"
        >
          <v-icon icon="mdi-trash-can-outline"></v-icon>
          <p>ลบ</p>
        </v-btn>
      </div>
      <div
        variant="flat"
        class="lg:flex block gap-[15px] border border-[#EEEDF1] !rounded-[8px] !p-[15px]"
      >
        <div
          v-if="!summarizeUpload"
          class="lg:basis-4/12 basis-full border-dashed border-[#C4C6CF] !rounded-[8px]"
          flat
        >
          <div class="flex justify-between items-center pa-0">
            <div
              class="relative h-[324px] w-full border border-hidden border-[#C4C6CF] !rounded-[8px]"
              v-if="previewImageUrl !== null"
            >
              <img
                class="w-full h-full !object-cover !rounded-[8px]"
                :src="previewImageUrl"
                alt=""
              />
              <v-btn
                @click="fn_clearImg"
                density="compact"
                icon="mdi-trash-can-outline"
                size="small"
                class="!absolute top-[10px] right-[10px] p-[50px]"
              ></v-btn>
            </div>
            <div
              v-else
              @drop="fnOnFileDrop"
              @dragover="dragover"
              @dragleave="dragleave"
              class="w-full border border-dashed border-[#C4C6CF] !rounded-[8px] cursor-pointer"
            >
              <input
                type="file"
                name="file"
                class="hidden"
                id="fileInput"
                @change="fnOnClickUpload"
                accept="image/*"
                ref="file"
              />

              <label
                for="fileInput"
                class="cursor-pointer h-[324px] w-full flex justify-center items-center flex-col space-y-4 border-dashed border-[#C4C6CF] !rounded-[8px]"
              >
                <div>
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
                    <div class="text-[#00000061] mt-[12px]">.JPG or .JPEG</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="lg:basis-8/12 basis-full lg:my-0 my-[15px] !h-full">
          <v-text-field
            label="หัวข้อ"
            variant="outlined"
            class="!max-h-[56px] !h-[56px] !rounded-[8px] mb-[12px]"
            single-line
            hide-details
          />
          <v-text-field
            label="Keyword"
            variant="outlined"
            class="!max-h-[56px] !h-[56px] !rounded-[8px] mb-[12px]"
            single-line
            hide-details
          />
          <v-textarea
            label="คำอธิบาย"
            variant="outlined"
            class="!rounded-[8px] mb-[12px]"
            single-line
            hide-details
          />
        </div>
      </div>

      <div
        variant="flat"
        class="border border-[#EEEDF1] !rounded-[8px] pa-3 my-[30px]"
      >
        <div class="flex gap-[10px] mt-[12px]" cols="12">
          <v-icon color="#084F93">mdi-tag</v-icon>
          <p class="text-[14px] text-[#1A1C1E] font-semibold">
            Tags <br /><span class="font-normal"
              >สร้างแท็กส์ที่เกี่ยวกับคอนเทนต์</span
            >
          </p>
        </div>
        <div
          class="lg:flex block gap-[15px] items-start lg:ml-[30px] ml-0 lg:mx-[15px] mx-0 my-[15px]"
        >
          <v-text-field
            label="Your input here"
            v-model="newTag"
            variant="outlined"
            class="rounded-[8px] !h-[56px] lg:!max-w-[366px] lg:w-[366px] !max-w-full w-full"
            hide-details
          />
          <v-btn
            :disabled="newTag === ''"
            variant="outlined"
            color="#084F93"
            :loading="loading"
            @click="addTag"
            class="lg:w-[191px] w-full lg:mt-0 mt-[15px] min-h-[56px] !rounded-[8px]"
            >เพิ่ม</v-btn
          >
        </div>

        <div
          v-if="tags.length > 0"
          variant="flat"
          class="border border-[#EEEDF1] !rounded-[8px] pa-3 mt-[30px] lg:ml-[30px] ml-0 lg:mx-[15px] mx-0"
        >
          <p class="text-[#43474E]">หมวดหมู่ย่อย</p>
          <div class="flex gap-[10px] my-[10px]">
            <v-chip
              v-for="(tag, index) in tags"
              :key="index"
              class="text-white !bg-[#084F93] !py-[8px] !px-[12px] !h-[36px] !rounded-[8px]"
            >
              <v-icon left>mdi-check</v-icon>
              <p>{{ tag }}</p>
            </v-chip>
          </div>
        </div>
      </div>

      <div
        variant="flat"
        class="border border-[#EEEDF1] !rounded-[8px] p-[15px]"
      >
        <QuillEditor
          theme="snow"
          toolbar="full"
          v-model="content"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          @textChange="onEditorChange($event)"
        />
      </div>

      <div
        class="lg:flex block gap-[15px] my-[15px] lg:justify-end justify-between"
      >
        <NuxtLink
          to="/article"
          style="border: 1px solid #084f93 !important"
          class="border !border-[#084F93] text-[#084F93] flex items-center justify-center !rounded-[8px] h-[56px] lg:w-[358px] mb-[15px]"
        >
          ยกเลิก
        </NuxtLink>
        <v-btn
          @click="fn_submit('confirm')"
          flat
          class="!bg-[#084F93] text-white flex items-center justify-center !rounded-[8px] !h-[56px] lg:w-[358px] w-full mb-[15px]"
        >
          บันทึก
        </v-btn>
      </div>
    </div>
  </div>

  <v-dialog v-model="dialogConfirm" width="auto">
    <div class="bg-white !rounded-[8px] !p-[15px] text-center">
      <div
        :class="`${dialogStatus === 'delete' ? '' : 'bg-[#E7FFF3]'} w-[80px] h-[80px] !rounded-full ml-[50%] -translate-x-[50%] my-[15px] flex items-center justify-center`"
      >
        <div
          :class="`${dialogStatus === 'delete' ? 'bg-[#BA1A1A]' : 'bg-[#12B76A]'} w-[64px] h-[64px] !rounded-full flex items-center justify-center`"
        >
          <v-icon :icon="dialogStatus === 'delete' ? 'mdi-information-symbol' : 'mdi-check'" size="x-large" color="white"></v-icon>
        </div>
      </div>
      <p class="font-bold text-[16px]">
        {{ dialogStatus === "delete" ? "ต้องการลบคอนเทนต์" : "สำเร็จ" }}
      </p>
      <pre class="text-[#000]/[0.6] text-center">{{
        dialogStatus === "delete"
          ? "กรุณาพิมพ์คำว่า “ต้องการลบ” เพื่อยืนยันการลบคอนเทนต์"
          : "สร้างคอนเทนต์สำเร็จ\nโปรดตรวจรายการสินค้าเพื่อดูรายละเอียด"
      }}</pre>
      <div v-if="dialogStatus === 'delete'">
        <v-text-field
          v-model="dialogConfirmText"
          variant="outlined"
          density="compact"
          placeholder="พิมพ์คำว่า “ต้องการลบ”"
          class="!max-h-[56px] !h-[56px] !rounded-[8px] my-[12px]"
          hide-details
        ></v-text-field>

        <div class="lg:flex gap-[5px] justify-around">
          <v-btn
            :disabled="dialogConfirmText !== 'ต้องการลบ'"
            @click="dialogConfirm = false"
            flat
            class="!bg-[#BA1A1A] text-white flex items-center justify-center !rounded-[8px] !h-[56px] basis-6/12 mb-[15px]"
          >
            ยืนยัน
          </v-btn>
          <v-btn
            flat
            @click="dialogConfirm = false"
            style="border: 1px solid #ba1a1a !important"
            class="border !border-[#BA1A1A] !text-[#BA1A1A] flex items-center justify-center !rounded-[8px] !h-[56px] basis-6/12 mb-[15px]"
          >
            ยกเลิก
          </v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});

import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

let content = ref("");
let dialogConfirm = ref(false);
let dialogStatus = ref("");
let dialogConfirmText = ref("");

const fileValue = ref(null);
const summarizeUpload = ref(false);
const previewImageUrl = ref(null);
let isDragOver = false;

let loading = ref(false);
const tags = ref([]);
const newTag = ref("");

const fnOnClickUpload = (event) => {
  isDragOver = false;
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewImageUrl.value = null;
  }
};

const fnOnFileDrop = (e) => {
  isDragOver = true;
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewImageUrl.value = null;
  }
};

const dragover = (e) => {
  isDragOver = true;
  e.preventDefault();
};

const dragleave = (e) => {
  isDragOver = false;
};

const addTag = () => {
  loading.value = true;
  tags.value.push(newTag.value);
  newTag.value = "";
  loading.value = false;
};

const fn_clearImg = () => {
  previewImageUrl.value = null;
};

const onEditorBlur = (quill, html, text) => {
  console.log("editor blur!", quill.value.innerHTML);
};
const onEditorFocus = (quill, html, text) => {
  console.log("editor focus!", quill);
};
const onEditorReady = (quill, html, text) => {
  console.log("editor ready!", quill);
};
const onEditorChange = ({ quill, html, text }) => {
  console.log("editor change!", quill);
};

const fn_submit = (status) => {
  dialogStatus.value = status;
  dialogConfirm.value = true;
};
</script>

<style></style>
