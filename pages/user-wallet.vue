<template>
  <Toolbars />
  <Navbar text="User wallet" />
  <div class="p-4 sm:ml-64">
      <v-card variant="flat" class="border border-[#EEEDF1] rounded-[8px]">
        <div>
    <!-- <apexchart type="area" :options="chartOptions" :series="chartSeries" ></apexchart> -->
  </div>
      </v-card>
  </div>
  <div class="p-4 sm:ml-64">
    <!-- <apexchart
      width="500" 
      type="area"
      :options="chartOptions"
      :series="chartSeries"
    /> -->
    <v-text-field
        v-model="search"
        variant="outlined"
        label="ค้นหาบัญชีผู้ใช้ เบอร์โทร"
        prepend-inner-icon="mdi-magnify"
        class="!max-w-[480px] min-h-[56px] rounded-[8px] mb-[15px]"
        single-line
        hide-details
        @click:prepend-inner="onClick"
      ></v-text-field>
      <v-card variant="flat" class="border border-[#EEEDF1] rounded-[8px]">
        <div class="bg-[#E9E7EB] p-[20px]">
          <b class="text-[14px] text-[#084F93]"
            >ข้อมูลทั้งหมด {{ tableItem.length }} รายการ</b
          >
        </div>
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
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center">{{ item.transaction_id }}</td>
              <td class="text-center">{{ item.name }}</td>
              <td class="text-center">{{ item.type }}</td>
              <td class="text-center">{{ item.amount }}</td>
            </tr>
          </template>
        </v-data-table>
        <div v-else class="h-[260px] flex justify-center items-center">
          <p>ยังไม่มีรายการ</p>
        </div>
      </v-card>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, computed } from "vue";
// import VueApexCharts from 'vue3-apexcharts'
// Vue.use(VueApexCharts)

// Vue.component('apexchart', VueApexCharts)



let page = ref(1);
let itemsPerPage = 10;
let itemPerPageSelect = ref(10);
let search = ref("");

const headersTable = [
  {
    title: "Transaction ID",
    align: "center",
    value: "transaction_id",
  },
  {
    title: "ชื่อ - นามสกุล",
    align: "center",
    key: "name",
  },
  {
    title: "ช่องทาง",
    align: "center",
    key: "type",
  },
  {
    title: "ยอด",
    align: "center",
    key: "amount",
  }
];

const tableItem = [
  {
    transaction_id: "767885874",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    type: "QR พร้อมเพย์",
    amount: "1,500.00฿",
  },
  {
    transaction_id: "988786869",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    type: "โอนผ่านธนาคาร",
    amount: "11,500.00฿",
  },
  {
    transaction_id: "988786866",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    type: "บัตาเครดิต",
    amount: "6,000.00฿",
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
  return Math.ceil(tableItem.length / itemsPerPage);
});

let chartOptions = ref({
  chart: {
    type: 'area',
  },
});

let chartSeries = ref([
  {
    name: 'Example Series',
    // data: tableItem.map(item => parseFloat(item.amount.replace(/[^0-9.-]+/g, ''))),
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
]);

</script>

<style scoped>
* {
  font-family: "SFThonburi";
}
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
</style>
