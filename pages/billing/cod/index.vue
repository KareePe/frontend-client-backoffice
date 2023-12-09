<template>
  <Toolbars />
  <Navbar text="การเงิน,ค่าขนส่ง,กระทบยอดค่าขนส่ง" />
  <div class="ContainerLayout">
    <div class="flex flex-row justify-between">
      <VueDatePicker
        v-model="dateRange"
        class="!max-w-[360px] min-h-[56px] rounded-[8px] mb-[15px]"
        range
      ></VueDatePicker>

      <NuxtLink
        to="/account-support/create"
        flat
        color="#084F93"
        class="flex bg-[#084F93] text-white justify-center gap-[8px] rounded-[8px] items-center lg:!w-[200px] w-full !h-[56px]"
      >
        <v-icon icon="mdi-plus" color="#fff"></v-icon>
        อัพโหลดบิลขนส่ง
      </NuxtLink>
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
          >รอระบบดำเนินการ (698)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ข้อมูลไม่ถูกต้อง (300)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >กำลังดำเนินการ (2)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ดำเนินการเสร็จสิ้น (15)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ดำเนินการไม่สำเร็จ (13)</v-btn
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
                {{ item.name }}
              </td>
              <td class="text-start text-[14px]">
                {{ item.amount }}
              </td>
              <td class="text-start text-[14px]">
                {{ item.create_date }}
              </td>
              <td class="text-start text-[14px]">
                {{ item.maker }}
              </td>

              <td class="text-start text-[14px]">
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
  <!-- <v-dialog v-model="dialog" width="458px" class="rounded-[8px]">
    <v-card class="!p-[5px] !rounded-[8px]">
      <v-card-text class="relative !p-[10px] text-center">
        <b
          class="text-[18px] font-bold text-[#000]/[0.6] text-center mb-[10px]"
        >
          อัพโหลดบิลขนส่ง
        </b>

        <div class="flex flex-row justify-center align-center mt-[12px]">
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
          ></v-select>
        </div>

        <div class="flex flex-row justify-center align-center mt-[12px]">
          <v-text-field
            label="วาง URL ไฟล์ของคุณ"
            variant="outlined"
            class="!min-h-[56px]"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="lg:flex block gap-[15px] lg:justify-center justify-between">
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
        รายการนำเข้าบิลจัดส่งสำเร็จ <br/>โปรดตรวจรายการสินค้าเพื่อดูรายละเอียด</pre>
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
    title: "รหัสรายการ",
    align: "start",
  },
  {
    key: "name",
    title: "ชื่อขนส่ง",
    align: "start",
  },
  {
    key: "amount",
    title: "ยอดเงินรวม",
    align: "start",
  },
  {
    key: "create_date",
    title: "วันที่และเวลาที่สร้างรายการ",
    align: "start",
  },
  {
    key: "maker",
    title: "ผู้ทำรายการ",
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
    code: "ref231026SX0001A",
    name: "Flash express",
    amount: "100,000.00 บาท",
    create_date: "14/09/2023 15:38",
    maker: "แอดมินเอ",
    status: "เปิดใช้งาน",
  },
];

const dataTableOrder = [
  {
    code: "",
    name: "",
    payment: "",
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
