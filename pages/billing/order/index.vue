<template>
  <Toolbars />
  <Navbar text="การเงิน,ค่าขนส่ง" />
  <div class="ContainerLayout">
    <div class="flex flex-row justify-between">
      <VueDatePicker
        v-model="dateRange"
        class="!max-w-[280px] min-h-[56px] rounded-[8px] mb-[15px]"
        range
      ></VueDatePicker>
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        placeholder="หมายเลขคำสั่งซื้อ หรือ รหัสธุรกิจ"
        class="max-w-[600px]"
        density="compact"
        v-model="search"
      ></v-text-field>
    </div>
    <!-- button Switch -->
    <div class="flex w-full justify-between items-center">
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
          >รอตรวจสอบ (698)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ยืนยันสำเร็จ (300)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ติดขัด (2)</v-btn
        >
      </div>
    </div>

    <div>
      <v-card
        variant="flat"
        class="border border-[#EEEDF1] rounded-[8px] pb-[15px] mt-[12px]"
      >
        <v-data-table
          v-if="tableItem.length > 0"
          :items="tableItem"
          :headers="headersTableOrder"
          item-key="id"
          no-data-text="ไม่มีข้อมูล"
          items-per-page-text="จำนวนแสดงผล"
          :items-per-page="itemsPerPage"
          :page="page"
          :search="search"
          id="table-header-black"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center text-[14px]">{{ item.date }}</td>
              <td class="text-center text-[#0BA5EC] text-[14px]">
                {{ item.no }}
              </td>
              <td class="text-center text-[14px]">
                {{ item.code }}
              </td>
              <td class="text-center text-[14px]">
                {{ item.create_date }}
              </td>
              <td class="text-center text-[#0BA5EC] text-[14px]">
                {{ item.no_express }}
              </td>
              <td class="text-center text-[14px]">
                {{ item.date_receive }}
              </td>

              <td class="text-center text-[14px]">
                <div class="flex gap-[15px]">
                  <div
                    :class="`w-[20px] h-[20px] ${
                      item.status === 'เปิดใช้งาน'
                        ? 'bg-[#12B76A]'
                        : 'bg-[#BA1A1A]'
                    } !rounded-full`"
                  ></div>
                  <div class="text-[14px]">
                    {{ item.status }}
                  </div>
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

<!-- script for modal -->
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const isDragging = ref(false);
const dialogState = ref(false);
const dialog = ref(true);
const file = ref();
const fileValue = ref();
const summarizeUpload = ref(null);
const dateRange = ref([
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 7)),
]);

const dragover = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

const fnGetFileData = () => {
  summarizeUpload.value = {
    totals: "5 รายการ",
    totals_order: "25 คำสั่งซื้อ",
    totals_all: "85,347.00 บาท",
  };
};

const dragleave = () => {
  isDragging.value = false;
};

const fnOnFileDrop = (e) => {
  e.preventDefault();
  file.value.files = e.dataTransfer.files;
  fileValue.value = e.dataTransfer.files[0];
};
const fnOnClickUpload = (e) => {
  fileValue.value = e.target.files[0];
  console.log(e.target.files[0], "onchange");
};
const fnHandleCloseModal = () => {
  dialogState.value = false;
  fileValue.value = null;
  summarizeUpload.value = null;
};
const fnHandleOpenModal = () => {
  dialogState.value = true;
};
</script>

<script setup>
import { ref } from "vue";
definePageMeta({
  middleware: "auth-middleware",
});

let tab = ref("Order");
let page = ref(1);
let itemsPerPage = ref(5);

const expanded = [];
const headersTableOrder = [
  {
    key: "date",
    title: "วันที่และเวลาที่สร้างคำสั่งซื้อ",
    align: "center",
  },
  {
    key: "no",
    title: "หมายเลขคำสั่งซื้อ",
    align: "center",
  },
  {
    key: "code",
    title: "รหัสธุรกิจ",
    align: "center",
  },
  {
    key: "create_date",
    title: "วันที่และเวลาที่ออกบิล",
    align: "center",
  },
  {
    key: "no_express",
    title: "หมายเลขบิลค่าขนส่ง",
    align: "center",
  },
  {
    key: "date_receive",
    title: "วันที่ได้รับเงิน",
    align: "center",
  },
  {
    key: "status",
    title: "สถานะ",
    align: "center",
  },
];

const tableItem = [
  {
    date: "14/09/2023 15:38",
    no: "SX4576891240",
    code: "SX0001",
    create_date: "14/09/2023 15:38",
    no_express: "LINV231026SX0001A",
    date_receive: "14/09/2023 15:38",
    status: "เปิดใช้งาน",
  },
];

const dataTableOrder = [
  {
    create_date: "13/12/2000 20:00",
    id: "1231231231",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "ยืนยันแล้ว",
    status_order: "ที่ต้องจัดส่ง",
  },
  {
    create_date: "13/12/2000 20:00",
    id: "53242342",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "ยืนยันแล้ว",
    status_order: "เสร็จสิ้น",
  },
  {
    create_date: "13/12/2000 20:00",
    id: "23241516",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "รอยืนยัน",
    status_order: "เสร็จสิ้น",
  },
  {
    create_date: "13/12/2000 20:00",
    id: "6123135",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "รอยืนยัน",
    status_order: "เสร็จสิ้น",
  },
  {
    create_date: "13/12/2000 20:00",
    id: "6132323234",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "รอยืนยัน",
    status_order: "ที่ต้องจัดส่ง",
  },
  {
    create_date: "13/12/2000 20:00",
    id: "6134134",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "รอยืนยัน",
    status_order: "ที่ต้องจัดส่ง",
  },
];

const dataTablePayment = [
  {
    id: "123123dasd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ",
  },
  {
    id: "Casdasda123sd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ",
  },
  {
    id: "12C3asdasd1d",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ",
  },
  {
    id: "1223232d1d",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ",
  },
  {
    id: "ggaasdasd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ",
  },
];

const dataTableHistory = [
  {
    id: "123123dasd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ",
  },
  {
    id: "Casdasda123sd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ",
  },
  {
    id: "12C3asdasd1d",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ",
  },
  {
    id: "1223232d1d",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ",
  },
  {
    id: "ggaasdasd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ",
  },
];

const headTablePayment = [
  {
    key: "id",
    title: "CODS ID",
    align: "center",
  },
  {
    key: "num_of_order",
    title: "จำนวนออเดอร์",
    align: "center",
  },
  {
    key: "total",
    title: "ยอดทั้งหมด",
    align: "center",
  },
  {
    key: "status",
    title: "สถานะ",
    align: "center",
  },
  {
    key: "",
    title: "",
  },
];
const headTableHistory = [
  {
    key: "id",
    title: "CODS ID",
    align: "center",
  },
  {
    key: "num_of_order",
    title: "จำนวนออเดอร์",
    align: "center",
  },
  {
    key: "total",
    title: "ยอดทั้งหมด",
    align: "center",
  },
  {
    key: "status",
    title: "สถานะ",
    align: "center",
  },
];
const chipData = [
  "ชื่อลุกค้า",
  "หมายเลขคำสั่งซื้อ",
  "สถานะคำสั่งซื้อ",
  "วิธีชำระเงิน",
  "สถานะรายได้",
];
const fnChangeTabs = (value) => {
  tab.value = value;
  page.value = 1;
};
const pageCount = computed(() => {
  return Math.ceil(eval(`dataTable${tab.value}`).length / itemsPerPage.value);
});

const fnChangeSelect = (e) => {
  itemsPerPage.value = e;
  console.log(e);
};
</script>

<style scoped>
.card {
  @apply border border-[#EEEDF1] !rounded-[8px] p-2 flex space-x-2 justify-center items-center;
}
.text-table {
  @apply text-[14px] leading-5 text-center !pr-10;
}
</style>
