<template>
  <Toolbars />
  <Navbar text="การเงิน,การเติมเครดิต" />
  <div class="ContainerLayout">
    <div class="flex flex-row justify-between">
      <VueDatePicker
        v-model="dateRange"
        class="!max-w-[360px] min-h-[56px] rounded-[8px] mb-[15px]"
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
          >รออนุมัติ (698)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >สำเร็จ (300)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ปฏิเสธ (2)</v-btn
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
              <td class="text-start text-[14px]">{{ item.code }}</td>
              <td class="text-start text-[14px]">
                {{ item.no }}
              </td>

              <td class="text-start text-[14px]">
                {{ item.date }}
              </td>
              <td class="text-start text-[14px]">
                {{ item.payment_method }}
              </td>
              <td class="text-start text-[14px]">
                {{ item.amount }}
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
              <td>
                <!-- <v-btn icon="mdi-play" @click="fn_navDetail(item)" flat></v-btn> -->
                <v-btn icon="mdi-tray-arrow-down" flat></v-btn>
                <v-btn icon="mdi-update" flat @click="fn_href"></v-btn>
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
  <!-- <v-dialog v-model="dialog" width="758px" class="rounded-[8px]">
    <v-card class="!p-[5px] !rounded-[8px]">
      <v-card-text class="relative !p-[10px] text-start">
        <div class="flex flex-col">
          <div
            class="lg:flex block gap-[15px] my-[15px] lg:justify-center justify-between"
          >
            <div
              class="lg:basis-6/12 basis-full border-dashed border-[#C4C6CF] !rounded-[8px]"
              flat
            >
              <div class="flex flex-col justify-between pa-0">
                <b
                  class="text-[16px] font-bold text-[#000] text-start mb-[10px]"
                >
                  หลักฐานการชำระเงิน
                </b>
                <div
                  class="relative w-full border border-hidden border-[#C4C6CF] !rounded-[8px]"
                  v-if="previewImageUrl !== null"
                >
                  <img
                    :src="`/images/pizza-logo.png`"
                    class="!w-full !h-full] p-12"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div
              class="lg:basis-6/12 basis-full border-dashed border-[#C4C6CF] !rounded-[8px]"
              flat
            >
              <div class="flex flex-col justify-between pa-0">
                <b
                  class="text-[16px] font-bold text-[#000] text-start mb-[10px]"
                >
                  รายละเอียดการชำระเงิน
                </b>
                <div
                  class="relative w-full border border-hidden border-[#C4C6CF] !rounded-[8px]"
                >
                  <div class="flex flex-row mt-[12px] ml-[12px]">
                    <p class="text-[14px] text-black/60 font-normal w-[100px]">
                      ชื่อเจ้าของบัญชี
                    </p>
                    <span class="mx-[12px]">:</span>
                    <p class="text-[14px] text-black/87 font-normal">
                      บุคคลธรรมดา
                    </p>
                  </div>
                  <div class="flex flex-row mt-[12px] ml-[12px]">
                    <p class="text-[14px] text-black/60 font-normal w-[100px]">
                      เลข 4 ตัวท้าย
                    </p>
                    <span class="mx-[12px]">:</span>
                    <p class="text-[14px] text-black/87 font-normal">
                      บุคคลธรรมดา
                    </p>
                  </div>
                  <div class="flex flex-row mt-[12px] ml-[12px]">
                    <p class="text-[14px] text-black/60 font-normal w-[100px]">
                      จำนวนเงิน
                    </p>
                    <span class="mx-[12px]">:</span>
                    <p class="text-[14px] text-black/87 font-normal">
                      บุคคลธรรมดา
                    </p>
                  </div>
                  <div class="flex flex-row mt-[12px] ml-[12px] mb-[12px]">
                    <p class="text-[14px] text-black/60 font-normal w-[100px]">
                      วันที่และเวลา
                    </p>
                    <span class="mx-[12px]">:</span>
                    <p class="text-[14px] text-black/87 font-normal">
                      03/11/2565 (10.01)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <b class="text-[16px] font-bold text-[#000] text-start mb-[2px]">
            กำหนดสถานะ
          </b>
          <v-radio-group :hide-details="true" class="justify-between flex">
            <v-radio
              value="Standard"
              density="compact"
              :hide-details="true"
              class="flex my-[4px]"
            >
              <template v-slot:label>
                <p class="text-[#000]/87 ml-[8px]">อนุมัติ</p>
              </template>
            </v-radio>
            <v-radio
              value="Standard"
              density="compact"
              :hide-details="true"
              class="flex my-[4px]"
            >
              <template v-slot:label>
                <p class="text-[#000]/87 ml-[8px]">ปฏิเสธ</p>
              </template>
            </v-radio>
          </v-radio-group>
          <b
            class="text-[16px] font-bold text-[#084F93] text-start mb-[4px] mt-[8px]"
          >
            กรุณาเลือกเหตุผลในการปฏิเสธ
          </b>
          <v-radio-group :hide-details="true" class="justify-between flex">
            <v-radio
              value="Standard"
              density="compact"
              :hide-details="true"
              class="flex my-[4px]"
            >
              <template v-slot:label>
                <p class="text-[#1A1C1E] ml-[8px]">ยอดเงินไม่ครบ</p>
              </template>
            </v-radio>
            <v-radio
              value="Standard"
              density="compact"
              :hide-details="true"
              class="flex my-[4px]"
            >
              <template v-slot:label>
                <p class="text-[#1A1C1E] ml-[8px]">
                  ข้อมูลยอดเงินไม่ถูกต้อง <br />(ใส่ยอดเกิน/ขาด)
                </p>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
      </v-card-text>
      <v-card-actions>
        <div
          class="lg:flex block gap-[15px] my-[15px] lg:justify-center justify-between"
        >
          <NuxtLink
            to="/kyc"
            style="border: 1px solid #084f93 !important"
            class="border !border-[#084F93] text-[#084F93] flex items-center justify-center !rounded-[8px] h-[56px] lg:w-[358px] mb-[15px]"
          >
            ยกเลิก
          </NuxtLink>
          <v-btn
            @click="fn_submit('confirm')"
            flat
            class="!bg-[#084F93] text-white flex items-center justify-center !rounded-[8px] !h-[56px] lg:w-[358px] w-full mb-[15px]"
          >
            บันทึก
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog> -->

  <v-dialog v-model="dialog" width="354px">
    <div class="bg-white !rounded-[8px] !p-[15px] text-center">
      <div
        class="bg-[#E7FFF3] w-[80px] h-[80px] !rounded-full ml-[50%] -translate-x-[50%] my-[15px] flex items-center justify-center"
      >
        <div
          class="bg-[#12B76A] w-[64px] h-[64px] !rounded-full flex items-center justify-center"
        >
          <v-icon icon="mdi-check" size="x-large" color="white"></v-icon>
        </div>
      </div>
      <p class="font-bold text-[16px]">สำเร็จ</p>
      <pre class="text-[#000]/[0.6] text-center">
        ยืนยันการชำระเงิน wallet top up สำเร็จ</pre
      >
    </div>
  </v-dialog>
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
    key: "code",
    title: "รหัสธุรกิจ",
    align: "start",
  },
  {
    key: "no",
    title: "บัญชีการชำระเงิน",
    align: "start",
  },
  {
    key: "date",
    title: "วันที่และเวลา",
    align: "start",
  },
  {
    key: "payment_method",
    title: "วิธีการชำระ",
    align: "start",
  },
  {
    key: "amount",
    title: "ยอดทั้งหมด",
    align: "start",
  },
  {
    key: "status",
    title: "สถานะ",
    align: "start",
  },
  {
    key: "",
    title: "ดำเนินการ",
    align: "start",
  },
];

const tableItem = [
  {
    code: "SX0001",
    no: "6886-0191-7267-3418",
    date: "14/09/2023 15:38",
    payment_method: "QR Code พร้อมเพย์",
    amount: "98,279.00 บาท",
    status: "ยืนยันแล้ว",
  },
];

const dataTableOrder = [
  {
    create_date: "13/12/2000 20:00",
    id: "1231231231",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    amount: "2,000",
    status: "ยืนยันแล้ว",
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
