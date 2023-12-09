<template>
  <Toolbars />
  <Navbar
    text="การเงิน,ค่าขนส่ง,ชุดข้อมูลราคาขาย,560416510620,เพิ่มรายการโปรโมชั่น"
  />
  <!-- <Navbar :text="navbar" v-if="viewProduct === true" /> -->
  <v-alert
    variant="outlined"
    type="success"
    prominent
    icon="mdi-check-circle"
    border
    class="!absolute top-[25px] left-[50%] -translate-x-[50%] !bg-[#D1FADF] z-50 !min-w-[366px]"
    v-if="alert === true"
  >
    <v-progress-linear
      indeterminate
      class="!w-full mb-[15px]"
    ></v-progress-linear>
    <b class="text-black">คัดลอกสำเร็จ</b>
    <p class="text-black">คัดลอง url สำเร็จ</p>
  </v-alert>
  <div class="p-4 md:ml-64 flex flex-col">
    <b class="text-[18px] mb-[12px]">ข้อมูลทั่วไป</b>

    <div
      class="lg:flex block gap-[15px] lg:justify-center justify-between mt-[12px]"
    >
      <v-text-field
        density="compact"
        variant="outlined"
        label="ชื่อโปรโมชั่น"
        single-line
        hide-details
        class="lg:basis-3/12"
      ></v-text-field>

      <VueDatePicker
        v-model="dateRange"
        class="lg:basis-3/12 !min-h-[56px] !rounded-[8px] mb-[15px]"
        range
      ></VueDatePicker>

      <VueDatePicker
        v-model="dateRange"
        class="lg:basis-3/12 !min-h-[56px] !rounded-[8px] mb-[15px]"
        range
      ></VueDatePicker>

      <!-- <v-select
        label="ขนส่ง"
        class="lg:basis-4/12"
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
      ></v-select> -->
      <!-- <v-select
        label="รหัสชุดข้อมูลต้นทุน"
        class="lg:basis-4/12"
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
      ></v-select> -->
      <div class="lg:basis-2/12"></div>
      <!-- <NuxtLink
        to="/billing/cost/create"
        flat
        color="#084F93"
        class="flex bg-[#084F93] text-white justify-center gap-[8px] rounded-[8px] items-center lg:basis-2/12 !h-[56px]"
      >
        <v-icon icon="mdi-plus" color="#fff"></v-icon>
        อัพโหลดไฟล์ขนส่ง
      </NuxtLink> -->
    </div>

    <b class="text-[18px] mt-[12px] mb-[12px]">ข้อมูลทั่วไป</b>
    <div
      class="lg:flex block lg:flex-wrap flex-nowarp justify-between items-start"
    >
      <div class="card !justify-start">
        <v-btn
          v-bind:color="tab === 'Order' ? '#084F93' : '#fff'"
          variant="flat"
          @click="() => fnChangeTabs('Order')"
          class="!rounded-[8px] text-[14px]"
          >ราคาต้นทุนปกติ (21 รายการ)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Payment' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('Payment')"
          >ราคาเพิ่มเติมพื้นที่ห่างไกล (62 รายการ)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ราคาเพิ่มเติมพื้นที่เกาะ (40 รายการ)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ราคาเพิ่มเติมพื้นที่ท่องเที่ยว (30 รายการ)</v-btn
        >
      </div>
    </div>
    <v-data-table
      v-if="items.length > 0"
      :custom-filter="filterOnlyCapsText"
      :headers="headers"
      :items="items"
      :search="search"
      no-data-text="ไม่มีข้อมูล"
      hide-default-footer
      items-per-page-text="จำนวนแสดงผล"
      class="mt-[12px] mb-[15px] border !rounded-[8px]"
    >
      <template v-slot:item="{ item }">
        <tr class="!my-[5px]">
          <td class="text-start">{{ item.weight }}</td>
          <td class="text-start">{{ item.size }}</td>
          <td class="text-start">
            {{ item.no_0 }}
          </td>
          <td class="text-start">
            {{ item.no_1 }}
          </td>
          <td class="text-start">
            {{ item.no_2 }}
          </td>
        </tr>
      </template>
      <template #bottom></template>
    </v-data-table>
    <div v-else class="h-[260px] flex justify-center items-center">
      <p>ยังไม่มีรายการ</p>
    </div>
    <div class="text-center pt-2 flex justify-center items-center relative">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <div class="w-[170px] absolute right-0 mr-4">
        <v-select
          label="จำนวนแสดงผล"
          variant="outlined"
          :items="[5, 10, 15, 20, 25, 30]"
          :item-title="(item) => item + ' รายการ'"
          :item-value="(item) => item"
          :model-value="itemsPerPage"
          density="compact"
          hide-details="auto"
          @update:modelValue="fnChangeRowPerPages"
        ></v-select>
      </div>
    </div>

    <b class="text-[18px]">ต้นทุนอื่นๆ</b>

    <div
      class="lg:flex block gap-[15px] lg:justify-center justify-between mt-[12px]"
    >
      <v-text-field
        density="compact"
        variant="outlined"
        label="ค่าบริการเก็บเงินปลายทาง (%)"
        single-line
        hide-details
        class="lg:basis-6/12"
      ></v-text-field>
      <v-select
        label="วิธีที่ใช้ในการคำนวนค่าขนส่ง"
        class="lg:basis-6/12"
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
      ></v-select>
    </div>

    <div class="lg:flex block gap-[15px] lg:justify-center justify-between">
      <v-select
        label="ค่าบริการเข้ารับสินค้า"
        class="lg:basis-6/12"
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
      ></v-select>
      <v-select
        label="ค่าบริการส่งสินค้ากลับ(กรณีสินค้าส่งไม่สำเร็จ)"
        class="lg:basis-6/12"
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
      ></v-select>
    </div>

    <div
      class="lg:flex block gap-[15px] lg:justify-center justify-between mt-[12px]"
    >
      <NuxtLink
        to="/kyc"
        style="border: 1px solid #084f93 !important"
        class="border !border-[#084F93] text-[#084F93] flex items-center justify-center !rounded-[8px] h-[56px] mb-[15px] lg:basis-6/12"
      >
        ยกเลิก
      </NuxtLink>
      <v-btn
        @click="fn_submit('confirm')"
        flat
        class="!bg-[#084F93] text-white flex items-center justify-center !rounded-[8px] !h-[56px] mb-[15px] lg:basis-6/12"
      >
        ยืนยันการสร้างรายการ
      </v-btn>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, onMounted, computed } from "vue";
let search = ref("");
let loading = ref(false);
let alert = ref(false);
let tab = ref("Order");

const headers = [
  {
    title: "น้ำหนัก(กรัม)",
    align: "start",
    key: "weight",
  },
  {
    title: "ขนาด",
    align: "start",
    key: "size",
  },
  {
    title: "กทม > กทม",
    align: "start",
    key: "no_0",
  },
  {
    title: "กทม > เหนือ,อีสาน,ใต้,กลาง",
    align: "start",
    key: "no_1",
  },
  {
    title: "กทม > เหนือ,อีสาน,ใต้,กลาง",
    align: "start",
    key: "no_2",
  },
];

const headersPromtion = [
  {
    title: "ชื่อโปรโมชั่น",
    align: "start",
    key: "name",
  },
  {
    title: "วันที่มีผล",
    align: "start",
    key: "date",
  },
  {
    title: "วันที่หมดอายุ",
    align: "start",
    key: "date_end",
  },
  {
    title: "สถานะ",
    align: "start",
    key: "status",
  },
  {
    title: "",
    align: "start",
    key: "action",
  },
];

let items = [
  {
    weight: "0-500",
    size: "<= 60",
    no_0: "30,000.00",
    no_1: "30,000.00",
    no_2: "30,000.00",
  },
];

let itemsPromotion = [
  {
    name: "Promotional name",
    date: "14/10/2023",
    date_end: "14/10/2023",
    status: "เปิดใช้งาน",
    no_2: "30,000.00",
  },
];

const fn_copyUrl = (url) => {
  loading.value = true;
  navigator.clipboard.writeText(url);
  loading.value = false;
  alert.value = true;
  setTimeout(() => {
    alert.value = false;
  }, 3000);
};

const fnChangeTabs = (value) => {
  tab.value = value;
  page.value = 1;
};
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

.card {
  @apply border border-[#EEEDF1] !rounded-[8px] p-2 flex space-x-2 justify-center items-center;
}
</style>
