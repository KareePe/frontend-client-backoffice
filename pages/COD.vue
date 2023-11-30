<template>
  <Toolbars />
  <Navbar text="กระทบยอด COD" />
  <div class="ContainerLayout">
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
    <!-- button Switch -->
    <div class="flex w-full justify-between items-center">
      <div class="card !justify-start">
        <v-btn
          v-bind:color="tab === 'Order' ? '#084F93' : '#fff'"
          variant="flat"
          @click="() => fnChangeTabs('Order')"
          class="!rounded-[8px] text-[14px]"
          >รายการทั้งหมด (500)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Payment' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('Payment')"
          >รอชำระ (200)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ชำระแล้ว (200)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Other' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('Other')"
          >อื่นๆ (14)</v-btn
        >
      </div>
    </div>

    <div>
      <!-- <div
        class="p-5 text-[#084F93] border border-[#E9E7EB] bg-[#E9E7EB] text-[14px] leading-5"
      >
        ข้อมูลคำสั่งซื้อทั้งหมด {{ tableItem.length }} รายการ
      </div> -->
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
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center">{{ item.name }}</td>
              <td class="text-center text-[#0BA5EC]">
                {{ item.no }}
              </td>
              <td class="text-center">
                {{ item.cod }}
              </td>
              <td class="text-center">
                {{ item.quantity }}
              </td>
              <td class="text-center">
                <div class="flex gap-[15px]">
                  <div
                    :class="`w-[20px] h-[20px] ${
                      item.status === 'เปิดใช้งาน'
                        ? 'bg-[#12B76A]'
                        : 'bg-[#BA1A1A]'
                    } !rounded-full`"
                  ></div>
                  {{ item.status }}
                </div>
              </td>
              <td class="text-center">
                <v-btn icon="mdi-play" @click="fn_navDetail(item)" flat></v-btn>
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

    <!-- modal upload excel  -->
    <v-dialog
      v-model="dialogState"
      class="w-full"
      :style="{ maxWidth: summarizeUpload ? '896px' : '512px' }"
    >
      <v-card v-if="!summarizeUpload">
        <v-card-text class="flex justify-between items-center">
          <v-icon size="25">mdi-information-outline</v-icon>
          <div class="text-[16px] font-[600] opacity-[0.7]">
            นำเข้ารายการ COD
          </div>
          <v-icon size="25" class="cursor-pointer" @click="fnHandleCloseModal"
            >mdi-close</v-icon
          >
        </v-card-text>
        <v-card-text class="flex justify-between items-center">
          <div
            @drop="fnOnFileDrop"
            @dragover="dragover"
            @dragleave="dragleave"
            class="w-full border-[#EEEDF1] border rounded-md"
          >
            <input
              type="file"
              multiple
              name="file"
              class="hidden"
              id="fileInput"
              @change="fnOnClickUpload"
              ref="file"
            />
            <!-- class="hidden" -->

            <label
              for="fileInput"
              class="h-[200px] w-full flex justify-center items-center flex-col space-y-1"
            >
              <v-icon
                class="bg-[#EEEDF1] !w-[60px] !h-[60px] rounded-full"
                size="40"
                color="#74777F"
                v-if="!fileValue"
                >mdi-file-upload-outline</v-icon
              >
              <v-icon
                class="bg-[#084F93] !w-[60px] !h-[60px] rounded-full"
                size="40"
                color="#FFF"
                v-else
                >mdi-file-check-outline</v-icon
              >
              <div class="text-[14px]" v-if="!fileValue">
                ลากและวางไฟล์ตรงนี้ หรือ
              </div>
              <div class="text-[14px]" v-else>
                {{ fileValue.name }}
              </div>
              <div class="text-[12px] text-[#0BA5EC]" v-if="!fileValue">
                ค้นหาไฟล์
              </div>
            </label>
          </div>
        </v-card-text>
        <v-card-text class="flex justify-between space-x-2">
          <v-btn
            class="w-1/2"
            color="#084F93"
            size="large"
            variant="outlined"
            @click="fnHandleCloseModal"
            >ยกเลิก</v-btn
          >
          <v-btn
            class="w-1/2"
            :color="fileValue ? '#084F93' : '#000'"
            size="large"
            :variant="fileValue ? 'flat' : 'tonal'"
            :disabled="!fileValue"
            @click="fnGetFileData"
            >นำเข้า</v-btn
          >
        </v-card-text>
        <v-card-text
          class="flex justify-center opacity-[0.6] items-center space-x-1"
        >
          <v-icon>mdi-file-download-outline</v-icon>
          <div class="text-[12px]">
            ดาวน์โหลดฟอร์มสำหรับนำเข้ารายการคำสั่งซื้อ
          </div>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-text class="flex justify-between items-center">
          <div class="text-[16px] font-[600] opacity-[0.7]">
            สรุปนำเข้ารายการ COD
          </div>
        </v-card-text>
        <v-card-text class="flex justify-between items-center">
          <div class="w-full border-[#EEEDF1] border rounded-md p-4">
            <div class="leading-[18px] font-[600] tracking-tighter">
              รายละเอียด
            </div>
            <div class="flex space-x-2">
              <div>
                <div class="text-[14px]">จำนวนรายการ</div>
                <div class="text-[14px]">คำสั่งซื้อทั้งหมด</div>
                <div class="text-[14px]">ยอดทุกคำสั่งซื้อ</div>
              </div>
              <div>
                <div class="text-[14px]">
                  :
                  <span class="opacity-[0.7]">{{
                    summarizeUpload.totals
                  }}</span>
                </div>
                <div class="text-[14px]">
                  :
                  <span class="opacity-[0.7]">{{
                    summarizeUpload.totals_order
                  }}</span>
                </div>
                <div class="text-[14px]">
                  :
                  <span class="opacity-[0.7]">{{
                    summarizeUpload.totals_all
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-text class="flex justify-between space-x-2">
          <v-btn
            class="w-1/2"
            color="#084F93"
            size="large"
            variant="outlined"
            @click="fnHandleCloseModal"
            >ยกเลิก</v-btn
          >
          <v-btn class="w-1/2" color="#084F93" size="large" variant="flat"
            >ยืนยันการนำเข้า</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<!-- script for modal -->
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const isDragging = ref(false);
const dialogState = ref(false);
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
    key: "payment",
    title: "ชื่อลุกค้า",
    align: "center",
  },
  {
    key: "id",
    title: "หมายเลขคำสั่งซื้อ",
    align: "center",
  },
  {
    key: "status_order",
    title: "สถานะคำสั่งซื้อ",
    align: "center",
  },
  {
    key: "create_date",
    title: "วันที่สร้าง",
    align: "center",
  },
  {
    key: "price",
    title: "ราคา",
    align: "center",
  },
  {
    key: "payment",
    title: "รูปแบบชำระเงิน",
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

const headersTable = [
  {
    key: "name",
    title: "ชื่อธุรกิจ",
    align: "center",
  },
  {
    key: "no",
    title: "หมายเลขใบสำคัญจ่าย",
    align: "center",
  },
  {
    key: "cod",
    title: "ค่า COD",
    align: "center",
  },
  {
    key: "quantity",
    title: "จำนวนพัสดุ COD",
    align: "center",
  },
  {
    key: "status",
    title: "สถานะบัญชี",
    align: "center",
  },

  {
    key: "",
    title: "",
  },
];

const tableItem = [
  {
    name: "Business Name",
    no: "PA2310126SX000101",
    cod: "100.00",
    quantity: "20",
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
