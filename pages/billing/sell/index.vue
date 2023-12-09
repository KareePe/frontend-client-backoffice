<template>
  <Toolbars />
  <Navbar text="การเงิน,ค่าขนส่ง,ชุดข้อมูลราคาขาย" />
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
  <div class="p-4 md:ml-64">
    <div
      class="lg:flex block lg:flex-wrap flex-nowarp justify-between items-start"
    >
      <div class="card !justify-start">
        <v-btn
          v-bind:color="tab === 'Order' ? '#084F93' : '#fff'"
          variant="flat"
          @click="() => fnChangeTabs('Order')"
          class="!rounded-[8px] text-[14px]"
          >ทั้งหมด (500)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Payment' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('Payment')"
          >เปิดใช้งาน (3)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ปิดใช้งาน (7)</v-btn
        >
      </div>
      <NuxtLink
        to="/billing/sell/create"
        flat
        color="#084F93"
        class="flex bg-[#084F93] text-white justify-center gap-[8px] rounded-[8px] items-center lg:!w-[200px] w-full !h-[56px]"
      >
        <v-icon icon="mdi-plus" color="#fff"></v-icon>
        เพิ่มรายการราคาขาย
      </NuxtLink>
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
          <td
            class="text-start text-[14px] flex gap-[4px] justify-start items-center"
          >
            <img
              :src="`/images/pizza-logo.png`"
              class="w-[36px] h-[36px]"
              alt=""
            />
            <div>{{ item.express }}</div>
          </td>
          <td class="text-start">{{ item.code }}</td>
          <td class="text-start">{{ item.reason }}</td>
          <td class="text-start">
            {{ item.date }}
          </td>
          <td class="text-start">
            {{ item.date_end }}
          </td>
          <td class="text-center text-[14px]">
            <div class="flex gap-[15px] justify-center">
              <div
                :class="`w-[16px] h-[16px] ${
                  item.status === 'เปิดใช้งาน' ? 'bg-[#12B76A]' : 'bg-[#BA1A1A]'
                } !rounded-full`"
              ></div>
              {{ item.status }}
            </div>
          </td>
          <td>
            <v-btn
              icon="mdi-play"
              @click="this.$router.push('/account-biz/1234')"
              flat
            ></v-btn>
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
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, computed } from "vue";
let search = ref("");
let loading = ref(false);
let alert = ref(false);
let tab = ref("Order");

const headers = [
  {
    title: "ขนส่ง",
    align: "start",
    key: "express",
  },
  {
    title: "รหัสรายการ",
    align: "start",
    key: "code",
  },
  {
    title: "หมายเหตุ",
    align: "start",
    key: "reason",
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
    align: "center",
    key: "status",
  },
  {
    title: "",
    align: "center",
    key: "edit",
  },
];

let items = [
  {
    express: "SCG Express",
    code: "560416510620",
    reason: "-",
    date: "14/09/2023",
    date_end: "14/09/2023",
    status: "รอเข้าใช้งาน",
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
