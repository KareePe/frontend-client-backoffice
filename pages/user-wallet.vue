<template>
  <Toolbars />
  <Navbar text="User wallet" />
  <div class="p-4 sm:ml-64">
    <v-card variant="flat" class="border border-[#EEEDF1] rounded-[8px]">
      <div
        class="border border-[#EEEDF1] rounded-md flex flex-col space-y-2 px-4 pb-4"
      >
        <div class="flex flex-row justify-between items-center">
          <div class="py-4">
            <div class="text-[16px]">รายการการเงิน</div>
            <div class="flex">
              <div class="text-[20px] font-bold">฿</div>
              <div class="text-[40px] font-bold">40,206</div>
              <div>
                <div class="flex justify-center text-center">
                  <v-icon
                    aria-hidden="false"
                    class="text-[#067647] !text-[20px]"
                  >
                    mdi-trending-up
                  </v-icon>
                  <div class="text-[#067647] text-[20px]">7.4%</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="card">
              <v-btn
                v-bind:color="tab === 1 ? '#084F93' : '#fff'"
                variant="flat"
                @click="fnChangeTab(1)"
                class="!rounded-[4px] !h-[36px] text-[14px]"
                >24 ชม</v-btn
              >
              <v-btn
                v-bind:color="tab === 7 ? '#084F93' : '#fff'"
                variant="flat"
                @click="fnChangeTab(7)"
                class="!rounded-[4px] !h-[36px] text-[14px]"
                >7 วัน</v-btn
              >
              <v-btn
                v-bind:color="tab === 30 ? '#084F93' : '#fff'"
                @click="fnChangeTab(30)"
                variant="flat"
                class="!rounded-[4px] !h-[36px] text-[14px]"
                >30 วัน</v-btn
              >
              <v-btn
                v-bind:color="tab === 365 ? '#084F93' : '#fff'"
                variant="flat"
                @click="fnChangeTab(365)"
                class="!rounded-[4px] !h-[36px] text-[14px]"
                >12 เดือน</v-btn
              >
            </div>
          </div>
        </div>

        <div class="flex flex-row space-x-4 justify-between">
          <div class="w-full">
            <client-only
              placeholder="Loading..."
              fallback="Loading comments..."
            >
              <apexchart
                type="area"
                height="350"
                :options="options"
                :series="series"
              ></apexchart>
            </client-only>
          </div>

          <div>
            <div class="pb-4">
              <div class="text-[14px] text-[#000000]/[0.6] whitespace-nowrap">
                จำนวนที่ลูกค้าเติมเงินเข้า
              </div>
              <div class="flex">
                <div class="text-[34px] font-bold">4,206</div>
                <div>
                  <div class="flex justify-center text-center">
                    <v-icon
                      aria-hidden="false"
                      class="text-[#067647] !text-[16px]"
                    >
                      mdi-trending-up
                    </v-icon>
                    <div class="text-[#067647] text-[14x] mt-[8px]">9.2%</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pb-4">
              <div class="text-[14px] text-[#000000]/[0.6] whitespace-nowrap">
                จำนวนที่เงินที่ลูกค้าใช้
              </div>
              <div class="flex">
                <div class="text-[34px] font-bold">2,206</div>
                <div>
                  <div class="flex justify-center text-center">
                    <v-icon
                      aria-hidden="false"
                      class="text-[#067647] !text-[16px]"
                    >
                      mdi-trending-up
                    </v-icon>
                    <div class="text-[#067647] text-[14x] mt-[8px]">9.2%</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pb-4">
              <div class="text-[14px] text-[#000000]/[0.6] whitespace-nowrap">
                จำนวนเงินยอดสุทธิ
              </div>
              <div class="flex">
                <div class="text-[34px] font-bold">4,206</div>
                <div>
                  <div class="flex justify-center text-center">
                    <v-icon
                      aria-hidden="false"
                      class="text-[#067647] !text-[16px]"
                    >
                      mdi-trending-up
                    </v-icon>
                    <div class="text-[#067647] text-[14x] mt-[8px]">9.2%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
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

      <!-- <v-text-field
        variant="outlined"
        label="วันที่"
        prepend-inner-icon="mdi-calendar-month"
        class="!max-w-[280px] min-h-[56px] rounded-[8px] mb-[15px]"
        single-line
        hide-details
      /> -->
      <VueDatePicker
        v-model="dateRange"
        class="!max-w-[280px] !min-h-[56px] !rounded-[8px] mb-[15px]"
        range
      ></VueDatePicker>
    </div>
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
        <template v-slot:bottom></template>
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
  middleware: "auth-middleware"
})
import { ref, onMounted, computed } from "vue"
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const tab = ref(1)

let page = ref(1)
let itemsPerPage = 10
let itemPerPageSelect = ref(10)
let search = ref("")
const dateRange = ref([new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]);

const headersTable = [
  {
    title: "Transaction ID",
    align: "center",
    value: "transaction_id"
  },
  {
    title: "ชื่อ - นามสกุล",
    align: "center",
    key: "name"
  },
  {
    title: "ช่องทาง",
    align: "center",
    key: "type"
  },
  {
    title: "ยอด",
    align: "center",
    key: "amount"
  }
]

const tableItem = [
  {
    transaction_id: "767885874",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    type: "QR พร้อมเพย์",
    amount: "1,500.00฿"
  },
  {
    transaction_id: "988786869",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    type: "โอนผ่านธนาคาร",
    amount: "11,500.00฿"
  },
  {
    transaction_id: "988786866",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    type: "บัตาเครดิต",
    amount: "6,000.00฿"
  }
]
const fnChangeTab = (value) => {
  tab.value = value
}

const filterOnlyCapsText = (value, query, item) => {
  return (
    value != null &&
    query != null &&
    typeof value === "string" &&
    value.toString().indexOf(query) !== -1
  )
}

const pageCount = computed(() => {
  return Math.ceil(tableItem.length / itemsPerPage)
})

const options = ref({
  chart: {
    type: "area",
    height: 350,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: "smooth"
  },
  xaxis: {
    type: "datetime",
    labels: {
      format: "MMM",
      showDuplicates: false
    }
  },
  tooltip: {
    enable: "false"
  },
  yaxis: {
    opposite: true,
    show: false
  },
  legend: {
    horizontalAlign: "left"
  }
})

const series = ref([
  {
    name: "จำนวนเงิน",
    data: [
      {
        x: new Date("2023-07-11").getTime(),
        y: 76
      },
      {
        x: new Date("2023-08-12").getTime(),
        y: 50
      },
      {
        x: new Date("2023-09-13").getTime(),
        y: 60
      },
      {
        x: new Date("2023-10-14").getTime(),
        y: 20
      },
      {
        x: new Date("2023-11-15").getTime(),
        y: 80
      }
    ]
  }
])

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

.dp__input_wrap{
  height : 56px !important;
}
.dp__input_wrap input{
  height : 56px !important;
}
</style>
