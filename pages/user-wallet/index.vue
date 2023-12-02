<template>
  <Toolbars />
  <Navbar text="การเงิน,กระเป๋าเงิน" />

  <div class="p-4 sm:ml-64">
    <div class="flex flex-row justify-between">
      <v-text-field
        v-model="search"
        variant="outlined"
        label="ค้นหาบัญชีผู้ใช้ เบอร์โทร"
        prepend-inner-icon="mdi-magnify"
        class="!max-w-[480px] rounded-[8px] mb-[12px]"
        single-line
        density="compact"
        hide-details
      ></v-text-field>
      <VueDatePicker
        v-model="dateRange"
        class="!max-w-[280px] !min-h-[56px] !rounded-[8px] mb-[15px]"
        range
      ></VueDatePicker>
    </div>
    <div class="flex flex-row">
      <div
        class="border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px] mt-[12px] lg:basis-4/12"
        flat
      >
        <div class="mt-[4px]">
          <b class="text-[#000] text-[16px]">สรุปข้อมูล</b>
          <div class="flex flex-row mt-[8px]">
            <p class="text-[14px] text-black/87 font-normal w-[100px]">
              ยอดเครดิตรวม
            </p>
            <span class="mx-[30px]">:</span>
            <p class="text-[14px] text-black/60 font-normal">8,000,000</p>
          </div>
          <div class="flex flex-row">
            <p class="text-[14px] text-black/87 font-normal w-[100px]">
              จำนวนธุรกิจ
            </p>
            <span class="mx-[30px]">:</span>
            <p class="text-[14px] text-black/60 font-normal">926 ธุรกิจ</p>
          </div>
        </div>
      </div>
    </div>
    <v-card
      variant="flat"
      class="border border-[#EEEDF1] rounded-[8px] mt-[8px]"
    >
      <v-data-table
        v-if="tableItem.length > 0"
        v-model:page="page"
        :custom-filter="filterOnlyCapsText"
        :headers="headersTable"
        :items="tableItem"
        :items-per-page="itemsPerPage"
        :search="search"
        no-data-text="ไม่มีข้อมูล"
        hide-default-footer
        items-per-page-text="จำนวนแสดงผล"
        class="mb-[15px]"
        id="table-header-black"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-center text-[14px]">{{ item.code }}</td>
            <td class="text-center text-[14px]">{{ item.name }}</td>
            <td class="text-center text-[14px]">{{ item.qty }}</td>
            <td>
              <v-btn
                icon="mdi-eye-outline"
                flat
                @click="this.$router.push('/user-wallet/1234')"
              ></v-btn>
            </td>
          </tr>
        </template>
        <template v-slot:bottom></template>
      </v-data-table>
      <div v-else class="h-[260px] flex justify-center items-center">
        <p>ยังไม่มีรายการ</p>
      </div>
    </v-card>
    <div class="text-center pt-2 flex justify-center items-center relative">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <div class="w-[140px] absolute right-0 mr-4 w-[170px]">
        <v-select
          label="จำนวนแสดงผล"
          variant="outlined"
          :items="[5, 10, 15, 20, 25, 30]"
          :item-title="(item) => item + ' รายการ'"
          :item-value="(item) => item"
          :model-value="itemsPerPage"
          density="compact"
          hide-details="auto"
          @update:modelValue="fnChangeSelect"
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const tab = ref(1);

let page = ref(1);
let itemsPerPage = 10;
let itemPerPageSelect = ref(10);
let search = ref("");
const dateRange = ref([
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 7)),
]);

const headersTable = [
  {
    title: "รหัสร้านค้า",
    align: "center",
    value: "code",
  },
  {
    title: "ชื่อธุรกิจ",
    align: "center",
    key: "name",
  },
  {
    title: "ยอดคงเหลือกระเป๋าเงินในระบบ",
    align: "center",
    key: "qty",
  },
  {
    title: "",
    align: "center",
    key: "action",
  },
];

const tableItem = [
  {
    code: "767885874",
    name: "น้ำหอมไทย",
    qty: "1,500.00 ฿",
  },
];
const fnChangeTab = (value) => {
  tab.value = value;
};

const filterOnlyCapsText = (value, query, item) => {
  return (
    value != null &&
    query != null &&
    typeof value === "string" &&
    value.toString().indexOf(query) !== -1
  );
};

const pageCount = computed(() => {
  return Math.ceil(tableItem.length / itemsPerPage);
});

const options = ref({
  chart: {
    type: "area",
    height: 350,
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    labels: {
      format: "MMM",
      showDuplicates: false,
    },
  },
  tooltip: {
    enable: "false",
  },
  yaxis: {
    opposite: true,
    show: false,
  },
  legend: {
    horizontalAlign: "left",
  },
});

const series = ref([
  {
    name: "จำนวนเงิน",
    data: [
      {
        x: new Date("2023-07-11").getTime(),
        y: 76,
      },
      {
        x: new Date("2023-08-12").getTime(),
        y: 50,
      },
      {
        x: new Date("2023-09-13").getTime(),
        y: 60,
      },
      {
        x: new Date("2023-10-14").getTime(),
        y: 20,
      },
      {
        x: new Date("2023-11-15").getTime(),
        y: 80,
      },
    ],
  },
]);

watch(dateRange, () => {
  console.log(dateRange);
});

// onMounted(() => {
//   const startDate = new Date();
//   const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
//   date.value = [startDate, endDate];
// })
</script>

<style scoped>
thead tr {
  background-color: #e9e7eb;
}

.itemList {
  @apply flex justify-between w-full;
}

.containerItemDetail {
  @apply flex items-center justify-between w-full;
}

.title {
  line-height: 22px;
  letter-spacing: -0.31%;
  @apply font-bold text-[16px];
}

.text-normal {
  line-height: 16px;
  font-size: 12px;
}

.dashboardCard {
  @apply border border-[#EEEDF1] rounded-md w-full box-border p-5 flex flex-col justify-between;
}

.text-table {
  @apply text-[14px] leading-5 tracking-[-0.23%] text-center !pr-10;
}
.card {
  @apply border border-[#EEEDF1] !rounded-[8px] p-2 flex space-x-2 justify-center items-center;
}

.dp__input_wrap {
  height: 56px !important;
}
.dp__input_wrap input {
  height: 56px !important;
}
</style>
