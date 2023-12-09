<template>
  <div>
    <Toolbars />
    <Navbar text="โค้ดส่วนลด,สร้างโค้ดส่วนลด" />
    <div class="md:ml-64 flex flex-col">
      <div
        class="lg:flex block lg:flex-col flex-nowrap justify-center mt-[2rem]"
      >
        <div
          variant="flat"
          class="lg:flex block gap-[15px] !rounded-[8px] items-center justify-center mt-[1rem]"
        >
          <div class="lg:basis-8/12">
            <b class="text-[#000] text-[18px] mt-[16px]">รายละเอียดทั่วไป</b>
          </div>
        </div>
        <div
          variant="flat"
          class="lg:flex block gap-[15px] !rounded-[8px] items-center justify-center mt-[1rem]"
        >
          <div class="lg:basis-8/12">
            <v-text-field
              label="ชื่อโค้ดส่วนลด*"
              variant="outlined"
              class="!min-h-[56px]"
              :rules="[(v) => !!v || 'กรุณากรอกชื่อโค้ดส่วนลด']"
            ></v-text-field>
          </div>
        </div>
        <div
          variant="flat"
          class="lg:flex block gap-[15px] !rounded-[8px] items-center justify-center"
        >
          <div class="lg:basis-8/12">
            <v-text-field
              label="โค้ดส่วนลด*"
              variant="outlined"
              class="!min-h-[56px]"
              :rules="[(v) => !!v || 'กรุณากรอกโค้ดส่วนลด']"
            ></v-text-field>
          </div>
        </div>

        <div
          class="lg:flex block lg:flex-col flex-nowrap justify-center] ml-[0.9rem] mr-[0.9rem]"
        >
          <div
            variant="flat"
            class="lg:flex block gap-[15px] !rounded-[8px] items-center justify-center"
          >
            <div class="lg:basis-4/12">
              <v-text-field
                label="มูลค่าส่วนลด*"
                variant="outlined"
                class="!min-h-[56px]"
                :rules="[(v) => !!v || 'กรุณากรอกมูลค่าส่วนลด']"
              ></v-text-field>
            </div>
            <div class="lg:basis-4/12">
              <v-select
                label="ประเภทส่วนลด*"
                class="!min-h-[56px]"
                :items="[
                  'California',
                  'Colorado',
                  'Florida',
                  'Georgia',
                  'Texas',
                  'Wyoming',
                ]"
                variant="outlined"
                clearable
                :rules="[(v) => !!v || 'กรุณากรอกเลือกประเภทส่วนลด']"
              ></v-select>
            </div>
          </div>
        </div>

        <div
          variant="flat"
          class="lg:flex block gap-[15px] !rounded-[8px] items-center justify-center mt-[1rem]"
        >
          <div class="lg:basis-8/12">
            <b class="text-[#000] text-[18px] mt-[16px]">เงื่อนไขการใช้งาน</b>
          </div>
        </div>
        <div
          class="lg:flex block lg:flex-col flex-nowrap justify-center] ml-[0.9rem] mr-[0.9rem]"
        >
          <div
            variant="flat"
            class="lg:flex block gap-[15px] !rounded-[8px] items-center justify-center mt-[1rem]"
          >
            <div class="lg:basis-4/12">
              <VueDatePicker
                v-model="dateRange"
                class="!min-h-[56px] !rounded-[8px] mb-[15px]"
                range
              ></VueDatePicker>
            </div>
            <div class="lg:basis-4/12">
              <VueDatePicker
                v-model="dateRange"
                class="!min-h-[56px] !rounded-[8px] mb-[15px]"
                range
              ></VueDatePicker>
            </div>
          </div>
        </div>
        <div
          variant="flat"
          class="lg:flex block gap-[15px] !rounded-[8px] items-center justify-center"
        >
          <div class="lg:basis-8/12">
            <v-text-field
              label="จำกัดจำนวนการใช้งาน*"
              variant="outlined"
              class="!min-h-[56px]"
              :rules="[(v) => !!v || 'กรุณากรอกจำนวนการใช้งาน']"
            ></v-text-field>
          </div>
        </div>
      </div>
      <div class="lg:flex block lg:flex-col flex-nowrap justify-center">
        <div
          variant="flat"
          class="lg:flex block gap-[15px] !rounded-[8px] items-center justify-center mt-[2rem]"
        >
          <NuxtLink
            to="/kyc"
            style="border: 1px solid #084f93 !important"
            class="border !border-[#084F93] text-[#084F93] lg:basis-4/12 flex items-center justify-center !rounded-[8px] h-[56px] mb-[15px]"
          >
            ยกเลิก
          </NuxtLink>
          <v-btn
            @click="fn_submit('confirm')"
            flat
            class="!bg-[#084F93] text-white flex items-center lg:basis-4/12 justify-center !rounded-[8px] !h-[56px] w-full mb-[15px]"
          >
            บันทึก
          </v-btn>
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

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
