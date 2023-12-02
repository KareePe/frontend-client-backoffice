<template>
  <Toolbars />
  <Navbar text="จัดการลูกค้า,บัญชีธุรกิจ" />
  <div class="p-4 md:ml-64">
    <v-text-field
      v-model="search"
      variant="outlined"
      label="ค้นหาธุรกิจ"
      prepend-inner-icon="mdi-magnify"
      class="!max-w-[480px] min-h-[56px] !rounded-[8px] mb-[15px]"
      single-line
      hide-details
      @click:prepend-inner="onClick"
    ></v-text-field>
    <v-card variant="flat" class="border border-[#EEEDF1] !!rounded-[8px]">
      <div class="bg-[#E9E7EB] p-[20px] border-b border-[#E9E7EB]">
        <b class="text-[14px] text-[#084F93]"
          >ข้อมูลทั้งหมด {{ items.length }} รายการ</b
        >
      </div>
      <v-data-table
        v-if="items.length > 0"
        v-model:page="page"
        :custom-filter="filterOnlyCapsText"
        :headers="headers"
        :items="items"
        :items-per-page="itemsPerPage"
        :search="search"
        no-data-text="ไม่มีข้อมูล"
        hide-default-footer
        items-per-page-text="จำนวนแสดงผล"
        class="mb-[15px] !!rounded-[0]"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-center text-[14px]">
              <img
                :src="`/images/${item.logo}`"
                class="w-[40px] h-[40px]"
                alt=""
              />
            </td>
            <td class="text-center text-[14px]">{{ item.bizId }}</td>
            <td class="text-center text-[14px]">{{ item.bizName }}</td>
            <td class="text-center text-[14px]">{{ item.phone }}</td>
            <td class="text-center w-[240px] truncate text-[14px]">
              {{ item.address }}
            </td>
            <td class="text-center text-[14px]">{{ item.credit }}</td>
            <td class="text-center text-[14px]">
              <div class="flex gap-[15px]">
                <div
                  :class="`w-[16px] h-[16px] ${
                    item.status === 'เปิดใช้งาน'
                      ? 'bg-[#12B76A]'
                      : 'bg-[#BA1A1A]'
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
    </v-card>
    <div class="text-center pt-2 flex justify-center items-center relative">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <div class="w-[140px] absolute right-0 mr-4">
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
import { ref, onMounted, watch } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

let page = ref(1);
let itemsPerPage = 10;
let search = ref("");
let tab = ref(null);
let navbar = ref("จัดการลูกค้า,บัญชีธุรกิจ");

const headers = [
  {
    title: "รูป",
    align: "center",
    key: "logo",
  },
  {
    title: "รหัสธุรกิจ",
    align: "center",
    key: "bizId",
  },
  {
    title: "ชื่อธุรกิจ",
    align: "center",
    key: "bizname",
  },
  {
    title: "เบอร์โทรติดต่อ",
    align: "center",
    key: "phone",
  },
  {
    title: "ที่อยู่",
    align: "center",
    key: "address",
  },
  {
    title: "ประเภทเครดิต",
    align: "center",
    key: "credit",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: " ",
    align: "center",
    key: "href",
  },
];

let items = [
  {
    logo: "pizza-logo.png",
    bizId: "SX-0001",
    bizName: "Starbuck",
    phone: "078-837-8838",
    address: "173 ถนนดินสอ แขวงเสาชิงช้า เขตพระนคร กรุงเทพ",
    credit: "เครดิตเทอม",
    status: "เปิดใช้งาน",
    href: "",
  },
];

const filterOnlyCapsText = (value, query, item) => {
  return (
    value != null &&
    query != null &&
    typeof value === "string" &&
    value.toString().indexOf(query) !== -1
  );
};

const pageCount = computed(() => {
  return Math.ceil(items.length / itemsPerPage);
});

watch(navbar, () => {
  console.log(navbar);
});
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
