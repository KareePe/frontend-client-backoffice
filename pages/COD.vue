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
          >ทั้งหมด (500)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Payment' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('Payment')"
          >รอระบบดำเนินการ (200)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ที่ต้องจัดส่ง (200)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >กำลังจัดส่ง (200)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >เสร็จสิ้น (200)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ยกเลิก (200)</v-btn
        >
      </div>
      <NuxtLink
        to=""
        flat
        color="#084F93"
        class="flex bg-[#084F93] text-white justify-center gap-[8px] rounded-[8px] items-center lg:!w-[200px] w-full !h-[56px]"
      >
        <v-icon icon="mdi-upload" color="#fff"></v-icon>
        อัพโหลดบิล
      </NuxtLink>
    </div>

    <div>
      <v-card
        variant="flat"
        class="border border-[#EEEDF1] rounded-[8px] pb-[15px] mt-[12px]"
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
              <td class="text-center text-[14px]">{{ item.name }}</td>
              <td class="text-center text-[#0BA5EC] text-[14px]">
                {{ item.no }}
              </td>
              <td class="text-center text-[14px]">
                {{ item.cod }}
              </td>
              <td class="text-center text-[14px]">
                {{ item.bank }}
              </td>
              <td class="text-center text-[14px]">
                {{ item.quantity }}
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
              <td class="text-center">
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

    <v-dialog v-model="dialog" width="458px" class="rounded-[8px]">
      <v-card class="!p-[5px] !rounded-[8px]">
        <v-card-text class="relative !p-[10px] text-center">
          <b
            class="text-[20px] font-bold text-[#000]/[0.6] text-center mb-[10px]"
          >
            อัพโหลดบิล
          </b>

          <div
            class="text-[16px] text-[#000]/[0.6] text-start mb-[10px] mt-[10px]"
          >
            ข้อมูลที่จะดาวน์โหลด
          </div>

          <div
            class="border border-[#EEEDF1] rounded-[8px] p-[15px] mb-[12px] mt-[12px]"
          >
            <div
              class="text-[16px] text-[#000]/[0.87] text-start mb-[10px] mt-[10px]"
            >
              หมายเลขใบสำคัญจ่าย
            </div>
            <div
              class="text-[16px] text-[#000]/[0.6] text-start mb-[10px] mt-[10px]"
            >
              PA2310126SX000101
            </div>
            <div
              class="text-[16px] text-[#000]/[0.87] text-start mb-[10px] mt-[10px]"
            >
              ค่า COD
            </div>
            <div
              class="text-[16px] text-[#000]/[0.6] text-start mb-[10px] mt-[10px]"
            >
              100.00 ฿
            </div>
            <div
              class="text-[16px] text-[#000]/[0.87] text-start mb-[10px] mt-[10px]"
            >
              จำนวนคำสั่งซื้อ
            </div>
            <div
              class="text-[16px] text-[#000]/[0.6] text-start mb-[10px] mt-[10px]"
            >
              582 รายการ
            </div>
          </div>

          <!-- <div class="flex flex-col mt-[12px] !w-full">
            <v-select
              label="ชื่อขนส่ง"
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
              class="mt-[12px]"
            ></v-select>
            <v-text-field
              label="วาง URL ไฟล์ของคุณ"
              variant="outlined"
              class="!min-h-[56px]"
              :rules="[(v) => !!v || 'กรุณากรอกชื่อลูกค้า']"
            ></v-text-field>
          </div> -->
        </v-card-text>
        <v-card-actions>
          <!-- <v-btn
          flat
          :loading="loading"
          class="!bg-[#084F93] text-white !rounded-[8px] !w-full !h-[48px] pb-[8px] px-[16px] text-center"
          @click="dialog = false"
          >ตกลง</v-btn
        > -->
          <div
            class="lg:flex block gap-[15px] lg:justify-center justify-between"
          >
            <NuxtLink
              to="/account-biz"
              style="border: 1px solid #084f93 !important"
              class="border !border-[#084F93] text-[#084F93] flex items-center justify-center !rounded-[8px] h-[56px] lg:w-[208px] mb-[15px]"
            >
              ยกเลิก
            </NuxtLink>
            <v-btn
              @click="fn_submit('confirm')"
              flat
              class="!bg-[#084F93] text-white flex items-center justify-center !rounded-[8px] !h-[56px] lg:w-[208px] w-full mb-[15px]"
            >
              บันทึก
            </v-btn>
          </div>
        </v-card-actions>
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
    title: "หมายเลขชุดข้อมูล",
    align: "center",
  },
  {
    key: "cod",
    title: "ค่า COD รวม",
    align: "center",
  },
  {
    key: "bank",
    title: "จำนวนบัญชีธนาคารที่ต้องโอน",
    align: "center",
  },
  {
    key: "quantity",
    title: "จำนวนธุรกิจ",
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
    bank: "20",
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
