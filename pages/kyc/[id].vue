<template>
  <div>
    <Toolbars />
    <Navbar text="จัดการลูกค้า,ยืนยันตัวตน,This is company co.ltd" />
    <div class="md:ml-64">
      <div
        class="lg:flex block lg:flex-col flex-nowrap items-center justify-center mt-[2rem]"
      >
        <div
          variant="flat"
          class="lg:flex block gap-[15px] !rounded-[8px] items-center justify-center mt-[2rem]"
        >
          <div class="lg:basis-6/12 basis-full lg:my-0 my-[15px] !h-full">
            <b class="text-[18px]">รายละเอียดธุรกิจ</b>
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
            class="lg:basis-6/12 basis-full border-dashed border-[#C4C6CF] !rounded-[8px]"
            flat
          >
            <div class="flex justify-between items-center pa-0">
              <div
                class="relative w-full border border-hidden border-[#C4C6CF] !rounded-[8px]"
                v-if="previewImageUrl !== null"
              >
                <img
                  :src="`/images/pizza-logo.png`"
                  class="!w-full !h-full] p-12"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div
          variant="flat"
          class="lg:flex block gap-[15px] !rounded-[8px] border border-[#C4C6CF] items-center justify-center mt-[2rem] !w-3/4 p-[32px]"
        >
          <div class="lg:basis-6/12 lg:my-0 my-[15px] !h-full flex flex-col">
            <b class="text-[16px] text-[#000]">ยืนยันตัวตน</b>
            <b class="text-[16px] text-[#084F93]"
              >รายละเอียดและเอกสารสำหรับยืนยันตัวตน</b
            >
          </div>
          <div class="lg:basis-6/12" flat>
            <div
              :class="`flex flex-nowrap gap-[15px] py-[8px] px-[16px] rounded-[8px] justify-end`"
            >
              <div
                :class="`${'bg-[#FFFAEB] text-[#DC6803]'} pt-[8px] pb-[8px] pl-[16px] pr-[16px]`"
              >
                <v-icon :icon="'mdi-clock-outline'" :color="'#DC6803'"></v-icon>
                รอตรวจสอบ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <v-dialog v-model="dialog" width="758px" class="rounded-[8px]">
    <v-card class="!p-[5px] !rounded-[8px]">
      <v-card-text class="relative !p-[10px] text-start">
        <b class="text-[16px] font-bold text-[#000] text-start mb-[10px]">
          ยืนยันตัวตน
        </b>

        <div
          class="border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px] mt-[12px]"
        >
          <div>
            <b class="text-[16px] font-bold text-[#000] text-start mb-[10px]">
              ข้อมูลการยืนยันตัวตน
            </b>
            <div class="flex flex-row mt-[12px]">
              <p class="text-[14px] text-black/87 font-normal w-[120px]">
                ยืนยันตัวตนแบบ
              </p>
              <span class="mx-[30px]">:</span>
              <p class="text-[14px] text-black/60 font-normal">บุคคลธรรมดา</p>
            </div>
            <div class="flex flex-row">
              <p class="text-[14px] text-black/87 font-normal w-[120px]">
                ชื่อบุคคล
              </p>
              <span class="mx-[30px]">:</span>
              <p class="text-[14px] text-black/60 font-normal">ชื่อ นามสกุล</p>
            </div>
            <div class="flex flex-row">
              <p class="text-[14px] text-black/87 font-normal w-[120px]">
                ที่อยู่
              </p>
              <span class="mx-[30px]">:</span>
              <p class="text-[14px] text-black/60 font-normal">
                121/132 หมู่ 5 ต.วิชิต อ.เมือง จ.ภูเก็ต 80310
              </p>
            </div>
            <div class="flex flex-row">
              <p class="text-[14px] text-black/87 font-normal w-[120px]">
                เลขบัตรประชาชน
              </p>
              <span class="mx-[30px]">:</span>
              <p class="text-[14px] text-black/60 font-normal">1234567891012</p>
            </div>
            <div class="flex flex-row">
              <p class="text-[14px] text-black/87 font-normal w-[120px]">
                เบอร์โทรติดต่อ
              </p>
              <span class="mx-[30px]">:</span>
              <p class="text-[14px] text-black/60 font-normal">081-234-5678</p>
            </div>
          </div>
        </div>

        <div
          class="lg:flex block gap-[15px] my-[15px] lg:justify-center justify-between"
        >
          <div
            class="lg:basis-6/12 basis-full border-dashed border-[#C4C6CF] !rounded-[8px]"
            flat
          >
            <div class="flex justify-between items-center pa-0">
              <div
                class="relative w-full border border-hidden border-[#C4C6CF] !rounded-[8px]"
                v-if="previewImageUrl !== null"
              >
                <img
                  :src="`/images/pizza-logo.png`"
                  class="!w-full !h-full] p-12"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div
            class="lg:basis-6/12 basis-full border-dashed border-[#C4C6CF] !rounded-[8px]"
            flat
          >
            <div class="flex justify-between items-center pa-0">
              <div
                class="relative w-full border border-hidden border-[#C4C6CF] !rounded-[8px]"
                v-if="previewImageUrl !== null"
              >
                <img
                  :src="`/images/pizza-logo.png`"
                  class="!w-full !h-full] p-12"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <!-- <v-btn
          flat
          :loading="loading"
          class="!bg-[#084F93] text-white !rounded-[8px] !w-full !h-[48px] pb-[8px] px-[16px] text-center"
          @click="dialog = false"
          >ตกลง</v-btn
        > -->
        <div
          class="lg:flex block gap-[15px] my-[15px] lg:justify-center justify-between"
        >
          <NuxtLink
            to="/kyc"
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
      </v-card-actions>
    </v-card>
  </v-dialog>
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

let dialog = ref(true);
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
