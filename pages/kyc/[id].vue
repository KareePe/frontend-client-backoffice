<template>
  <div>
    <Toolbars />
    <Navbar text="จัดการลูกค้า,ยืนยันตัวตน,This is company co.ltd" />
    <div class="p-4 md:ml-64">
      <div
        variant="flat"
        class="lg:flex block gap-[15px] !rounded-[8px] !pt-[72px] !pl-[72px] !pr-[72px]"
      >
        <div class="lg:basis-8/12 basis-full lg:my-0 my-[15px] !h-full">
          <b class="text-[16px] text-[#084F93]">รายละเอียดธุรกิจ</b>
          <v-text-field
            label="รหัสธุรกิจ"
            variant="outlined"
            class="!max-h-[56px] !h-[56px] !rounded-[8px] mb-[12px] mt-[12px]"
          />
          <v-text-field
            label="ชื่อธุรกิจ"
            variant="outlined"
            class="!max-h-[56px] !h-[56px] !rounded-[8px] mb-[12px]"
          />
          <v-textarea
            label="ที่อยู่"
            variant="outlined"
            class="!rounded-[8px] mb-[12px]"
          />
        </div>
        <div
          class="lg:basis-4/12 basis-full border-dashed border-[#C4C6CF] !rounded-[8px]"
          flat
        >
          <div class="flex justify-between items-center pa-0">
            <div
              class="relative w-full border border-hidden border-[#C4C6CF] !rounded-[8px]"
              v-if="previewImageUrl !== null"
            >
              <!-- <img
                class="w-full h-full !object-cover !rounded-[8px]"
                :src="previewImageUrl"
                alt=""
              /> -->
              <img
                :src="`/images/pizza-logo.png`"
                class="!w-full !h-full] p-12"
                alt=""
              />
              <!-- <v-btn
                @click="fn_clearImg"
                density="compact"
                icon="mdi-trash-can-outline"
                size="small"
                class="!absolute top-[10px] right-[10px] p-[50px]"
              ></v-btn> -->
            </div>
          </div>
        </div>
      </div>

      <div
        variant="flat"
        class="lg:flex block gap-[15px] !rounded-[8px] relative border border-hidden border-[#C4C6CF] !p-[32px] !ml-[72px] !mr-[72px]"
      >
        <div
          class="lg:basis-10/12 basis-full lg:my-0 my-[15px] !h-full flex flex-col"
        >
          <b class="text-[16px] text-[#000]">ยืนยันตัวตน</b>
          <b class="text-[16px] text-[#084F93]"
            >รายละเอียดและเอกสารสำหรับยืนยันตัวตน</b
          >
        </div>
        <div class="lg:basis-2/12 basis-full" flat>
          <div
            :class="`flex flex-nowrap gap-[15px] py-[8px] px-[16px] rounded-[8px] ${'bg-[#FFFAEB] text-[#DC6803]'}`"
          >
            <v-icon :icon="'mdi-clock-outline'" :color="'#DC6803'"></v-icon>
            รอตรวจสอบ
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, computed } from "vue";

const headers = [
  {
    title: "รูป",
    align: "start",
    key: "logo",
  },
  {
    title: "รหัส",
    align: "center",
    key: "bizId",
  },
  {
    title: "ชื่อธุรกิจ",
    align: "center",
    key: "bizName",
  },
  {
    title: "หนังสือรับรอง",
    align: "center",
    key: "proveBook",
  },
  {
    title: "บัตรประชาชน",
    align: "center",
    key: "idCard",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "",
    align: "center",
    key: "changeStatus",
  },
];

let items = [
  {
    logo: "pizza-logo.png",
    bizId: "SX-0001",
    bizName: "This is company co., ltd.",
    proveBook: "หนังสือรับรอง.pdf",
    idCard: "บัตรประชาชน.pdf",
    status: "รอตรวจสอบ",
  },
  {
    logo: "pizza-logo.png",
    bizId: "SX-0001",
    bizName: "This is company co., ltd.",
    proveBook: "หนังสือรับรอง.pdf",
    idCard: "บัตรประชาชน.pdf",
    status: "ยืนยันแล้ว",
  },
  {
    logo: "pizza-logo.png",
    bizId: "SX-0001",
    bizName: "This is company co., ltd.",
    proveBook: "หนังสือรับรอง.pdf",
    idCard: "บัตรประชาชน.pdf",
    status: "ยื่นเอกสารใหม่",
  },
];

let dialog = ref(false);
let radios = ref("");
</script>
<style>
.v-pagination__next .v-btn,
.v-pagination__prev .v-btn {
  border: 1px solid #c2c2c2 !important;
  border-radius: 8px !important;
}
.v-pagination__item--is-active .v-btn {
  background-color: #084f93;
  border-radius: 8px !important;
  color: #fff;
}
.v-data-table-footer__pagination {
  margin: 15px 0 !important;
}
.v-data-table-footer__info,
.v-data-table-footer__pagination {
  display: none !important;
}

thead tr {
  background-color: #e9e7eb;
}

.v-tab--selected {
  background-color: #094f93;
  border-radius: 8px !important;
  color: #fff !important;
}
.v-tab.v-tab {
  height: 38px;
  font-size: 14px;
}
.v-tab__slider {
  height: 0 !important;
}
</style>
