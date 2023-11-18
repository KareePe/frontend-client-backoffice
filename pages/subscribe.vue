<template>
  <Toolbars />
  <Navbar text="Order Info" />

  <div class="ContainerLayout space-y-4 mb-[200px]">
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
                <v-icon aria-hidden="false" class="text-[#067647] !text-[20px]">
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
              rounded="md"
              size="small"
              >24 ชม</v-btn
            >
            <v-btn
              v-bind:color="tab === 7 ? '#084F93' : '#fff'"
              variant="flat"
              @click="fnChangeTab(7)"
              rounded="md"
              >7 วัน</v-btn
            >
            <v-btn
              v-bind:color="tab === 30 ? '#084F93' : '#fff'"
              @click="fnChangeTab(30)"
              variant="flat"
              size="small"
              >30 วัน</v-btn
            >
            <v-btn
              v-bind:color="tab === 365 ? '#084F93' : '#fff'"
              variant="flat"
              @click="fnChangeTab(365)"
              size="small"
              >12 เดือน</v-btn
            >
          </div>
        </div>
      </div>
      <!-- this chart  -->
      <div class="w-full">
        <client-only placeholder="Loading..." fallback="Loading Chart...">
          <apexchart
            type="area"
            height="350"
            :options="options"
            :series="series"
          ></apexchart>
        </client-only>
      </div>
    </div>

    <!-- Dashboard Card  -->
    <div class="mt-4 grid grid-cols-3 gap-4">
      <div class="dashboardCard">
        <div class="flex">
          <div class="flex justify-center items-center">
            <v-icon class="mr-1" color="#F79009" size="x-large">
              mdi-cube-outline
            </v-icon>
          </div>
          <div class="text-[22px] leading-[1.4]">Standard</div>
        </div>
        <div class="flex justify-end items-end mt-4">
          <div class="text-[34px] font-bold leading-[1.2] mr-2">11,203</div>
          <div class="text-[20px]">ผู้ใช้งาน</div>
        </div>
      </div>

      <div class="dashboardCard">
        <div class="flex">
          <div class="flex justify-center items-center">
            <v-icon class="mr-1" color="#0BA5EC" size="x-large">
              mdi-cube-outline
            </v-icon>
          </div>
          <div class="text-[22px] leading-[1.4]">Business</div>
        </div>
        <div class="flex justify-end items-end mt-4">
          <div class="text-[34px] font-bold leading-[1.2] mr-2">11,203</div>
          <div class="text-[20px]">ผู้ใช้งาน</div>
        </div>
      </div>

      <div class="dashboardCard">
        <div class="flex">
          <div class="flex justify-center items-center">
            <v-icon class="mr-1" color="#12B76A" size="x-large">
              mdi-cube-outline
            </v-icon>
          </div>
          <div class="text-[22px] leading-[1.4]">Business +</div>
        </div>
        <div class="flex justify-end items-end mt-4">
          <div class="text-[34px] font-bold leading-[1.2] mr-2">11,203</div>
          <div class="text-[20px]">ผู้ใช้งาน</div>
        </div>
      </div>
    </div>

    <!-- search  -->
    <div class="flex flex-row justify-between">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        placeholder="ชื่อผู้ใช้ หรือ เบอร์โทร"
        class="max-w-[600px]"
        density="compact"
        v-model="search"
      ></v-text-field>
      <!-- <v-text-field
        class="max-w-[400px]"
        prepend-inner-icon="mdi-calendar-month"
        variant="outlined"
        density="compact"
        label="วันที่"
      ></v-text-field> -->
      <VueDatePicker
        v-model="dateRange"
        class="!max-w-[280px] min-h-[56px] rounded-[8px] mb-[15px]"
        range
      ></VueDatePicker>
    </div>

    <!-- table -->
    <div>
      <div
        class="p-5 text-[#084F93] border border-[#E9E7EB] bg-[#E9E7EB] text-[14px] leading-5"
      >
        ข้อมูลคำสั่งซื้อทั้งหมด {{ tableItem.length }} รายการ
      </div>
      <v-card
        variant="flat"
        class="border border-[#EEEDF1] rounded-[8px] pb-[15px]"
      >
        <v-data-table
          v-if="tableItem.length > 0"
          :items="tableItem"
          :headers="headersTable"
          item-key="id"
          no-data-text="ไม่มีข้อมูล"
          items-per-page-text="จำนวนแสดงผล"
          :items-per-page="itemsPerPage"
          :page="page"
          :search="search"
          id="table-header-black"

        >
          <template
            v-slot:item="{ item, toggleExpand, isExpanded, internalItem }"
          >
            <tr>
              <td class="text-table">{{ item.id }}</td>
              <td class="text-table">
                {{ item.business }}
              </td>
              <td class="text-table">
                {{ item.package }}
              </td>
              <td class="text-table">
                {{ item.date }}
              </td>
              <td class="text-table">
                <div>{{ item.price }} บาท</div>
                <div class="text-[12px] opacity-[0.6]">
                  ({{ item.vat }} บาท)
                </div>
              </td>
            </tr>
          </template>
          <template #bottom></template>
        </v-data-table>
        <div v-else class="h-[260px] flex justify-center items-center">
          <p>ยังไม่มีรายการ</p>
        </div>
      </v-card>
    </div>

    <!-- pagination  -->
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
          @update:modelValue="fnChangeSelect"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

definePageMeta({
  middleware: "auth-middleware"
})

const tab = ref(1)
let page = ref(1)
let itemsPerPage = ref(10)
const dateRange = ref([
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 7))
])
let search = ref("")

const headersTable = [
  {
    title: "Transection ID",
    align: "center",
    key: "id"
  },
  {
    title: "ธุรกิจ",
    align: "center",
    key: "business"
  },
  {
    title: "แพ็คเกจ",
    align: "center",
    key: "package"
  },
  {
    title: "ระยะเวลา",
    align: "center",
    key: "date"
  },
  {
    title: "ค่าใช้จ่าย",
    align: "center",
    key: "price"
  }
]

const tableItem = [
  {
    id: "1453453234",
    business: "KFC",
    date: "10/09/2023 - 14/10/2023",
    package: "Standard",
    price: "1500.00",
    vat: "VAT 105.15"
  },
  {
    id: "asdasdasda",
    business: "Amezon",
    date: "10/09/2023 - 14/10/2023",
    package: "Business +",
    price: "2500.00",
    vat: "VAT 105.15"
  },
  {
    id: "asd12w321",
    business: "PTT",
    date: "10/09/2023 - 14/10/2023",
    package: "Standard",
    price: "500.00",
    vat: "VAT 105.15"
  },
  {
    id: "fasdasdasd",
    business: "Starbuck",
    date: "10/09/2023 - 14/10/2023",
    package: "Standard",
    price: "2500.00",
    vat: "VAT 105.15"
  },
  {
    id: "1231dafa",
    business: "Pizza Hut",
    date: "10/09/2023 - 14/10/2023",
    package: "Business",
    price: "1500.00",
    vat: "VAT 105.15"
  },
  {
    id: Math.floor(Math.random() * 100000000).toString(),
    business: "Pizza Hut",
    date: "10/09/2023 - 14/10/2023",
    package: "Business",
    price: "1500.00",
    vat: "VAT 105.15"
  }
]

const pageCount = computed(() => {
  return Math.ceil(tableItem.length / itemsPerPage.value)
})

const fnChangeSelect = (e) => {
  itemsPerPage.value = e
}

const fnChangeTab = (value) => {
  tab.value = value
}

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
</script>

<style scoped>
.card {
  @apply border border-[#EEEDF1] rounded-md p-2 flex space-x-2 justify-center items-center;
}
.dashboardCard {
  @apply border border-[#EEEDF1] rounded-md w-full box-border p-5 flex flex-col justify-between;
}
.text-table {
  @apply text-[14px] leading-5 tracking-[-0.23%] text-center !pr-10;
}
</style>
