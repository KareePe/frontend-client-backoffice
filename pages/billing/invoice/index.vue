<template>
  <Toolbars />
  <Navbar text="การเงิน,ค่าขนส่ง,จัดการชุดข้อมูลใบแจ้งหนี้" />
  <div class="p-4 sm:ml-64">
    <div class="flex flex-row justify-between">
      <VueDatePicker
        v-model="dateRange"
        class="!max-w-[360px] !min-h-[56px] !rounded-[8px] mb-[12px]"
        range
      ></VueDatePicker>
    </div>
    <div
      class="lg:flex block lg:flex-wrap flex-nowarp justify-between items-start"
    >
      <div class="card !justify-start">
        <v-btn
          v-bind:color="tab === 'Order' ? '#084F93' : '#fff'"
          variant="flat"
          @click="() => fnChangeTabs('Order')"
          class="!rounded-[8px] text-[14px]"
          >ทั้งหมด (400)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Payment' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('Payment')"
          >สร้างเลขพัสดุแล้ว (98)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >เข้ารับพัสดุแล้ว (30)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Approve' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('Approve')"
          >จองเครดิตแล้ว (2)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Order' ? '#084F93' : '#fff'"
          variant="flat"
          @click="() => fnChangeTabs('Order')"
          class="!rounded-[8px] text-[14px]"
          >ออกบิลแล้ว (6)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Order' ? '#084F93' : '#fff'"
          variant="flat"
          @click="() => fnChangeTabs('Order')"
          class="!rounded-[8px] text-[14px]"
          >ได้รับเงินแล้ว (12)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Order' ? '#084F93' : '#fff'"
          variant="flat"
          @click="() => fnChangeTabs('Order')"
          class="!rounded-[8px] text-[14px]"
          >ตัดเงินไม่สำเร็จ​ (18)</v-btn
        >
      </div>
    </div>
    <div
      class="bg-[#E9E7EB] p-2 !rounded-t-[8px] border-x border-t border-[#E9E7EB] mt-[24px]"
    >
      <v-text-field
        placeholder="เพิ่มตัวกรอง"
        variant="outlined"
        hide-details
        density="compact"
      ></v-text-field>
      <div class="pt-2">
        <!-- <v-chip
          v-for="(item, index) in chipData"
          :key="index"
          class="mr-2 text-[14px] !text-[#0BA5EC] !bg-[#EEEDF1]"
          >{{ item }}</v-chip
        > -->
        <Chips v-for="(item, index) in chipData" :text="item" />
      </div>
    </div>
    <div
      class="p-5 text-[#084F93] border border-[#E9E7EB] bg-[#E9E7EB] text-[14px] leading-5"
    >
      รายการทั้งหมด {{ tableItem.length }} รายการ
    </div>
    <v-card
      variant="flat"
      class="border border-[#EEEDF1] !rounded-b-[8px] pb-[15px]"
    >
      <v-data-table
        v-if="tableItem.length > 0"
        :items="tableItem"
        :headers="headersTable"
        item-key="id"
        show-expand
        id="table-info"
        no-data-text="ไม่มีข้อมูล"
        items-per-page-text="จำนวนแสดงผล"
        class="!rounded-[0]"
      >
        <template v-slot:item="{ item }">
          <tr>
            <!-- <td>
              <button @click="toggleExpand(internalItem)">
                <v-icon aria-hidden="false" class="cursor-pointer">
                  {{
                    isExpanded(internalItem)
                      ? "mdi-chevron-up"
                      : "mdi-chevron-down"
                  }}
                </v-icon>
              </button>
            </td> -->

            <td class="flex items-center">
              {{ item.date }}
            </td>
            <td class="text-[14px] items-center text-[#0BA5EC]">
              {{ item.no }}
            </td>
            <td class="text-[14px] items-center">
              {{ item.type }}
            </td>
            <td class="text-[14px] items-center">
              {{ item.qty }}
            </td>
            <td class="text-[14px] items-center">
              {{ item.qty_no }}
            </td>
            <td class="text-[14px] items-center">
              {{ item.amount }}
            </td>
            <td class="text-center">
              <div class="flex gap-[15px]">
                <div
                  :class="`w-[20px] h-[20px] ${
                    item.status === 'ยืนยันสำเร็จ'
                      ? 'bg-[#12B76A]'
                      : 'bg-[#BA1A1A]'
                  } !rounded-full`"
                ></div>
                <div class="text-[14px] items-center">
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

    <!-- pagination  -->
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
  <!-- <v-dialog v-model="dialog" width="458px" class="rounded-[8px]">
    <v-card class="!p-[5px] !rounded-[8px]">
      <v-card-text class="relative !p-[10px] text-center">
        <b
          class="text-[18px] font-bold text-[#000]/[0.6] text-center mb-[10px]"
        >
          อนุมัติรายการ
        </b>

        <div class="flex flex-row justify-center align-center mt-[12px]">
          <v-select
            label="เลือกสถานะที่อนุมัติ"
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
            label="ระบุเหตุผล*"
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
  <v-dialog v-model="dialog" width="458px" class="rounded-[8px]">
    <v-card class="!p-[5px] !rounded-[8px]">
      <v-card-text class="relative !p-[10px] text-center">
        <b
          class="text-[18px] font-bold text-[#000]/[0.6] text-center mb-[10px]"
        >
          ยืนยันการอนุมัติรายการ
        </b>

        <div
          class="flex flex-row justify-center align-center mt-[12px] text-[#000]/[0.6] font-normal"
        >
          คุณจะไม่สามารถเปลี่ยนแปลงสถานะการอนุมัติได้ <br />
          กรุณาตรวจสอบให้มั่นใจก่อนกดยืนยัน
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
  </v-dialog>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
definePageMeta({
  middleware: "auth-middleware",
});
const dateRange = ref([
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 7)),
]);
const expanded = [];
let tab = ref("Order");
let dialog = ref(true);

const chipData = ["ประเภทชุดข้อมูล", "วันที่", "หมายเลขชุดข้อมูล"];
const headersTable = [
  {
    title: "วันที่และเวลาที่สร้างรอบนี้",
    align: "center",
    key: "date",
  },
  {
    title: "หมายเลขชุดข้อมูล",
    align: "center",
    key: "no",
  },
  {
    title: "ประเภทชุดข้อมูล",
    align: "center",
    key: "type",
  },
  {
    title: "จำนวนธุรกิจที่ออกบิล",
    align: "center",
    key: "qty",
  },
  {
    title: "จำนวนคำสั่งซื้อ",
    align: "center",
    key: "qty_no",
  },
  {
    title: "ยอดทั้งหมด",
    align: "center",
    key: "amount",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "",
    align: "center",
    key: "action",
  },
];

const tableItem = [
  {
    date: "14/09/2023 15:38",
    no: "LINV231026SX0001A",
    type: "เติมเงิน",
    qty: "100",
    qty_no: "100",
    amount: "98,279.00 บาท",
    status: "ยืนยันสำเร็จ",
  },
];

const fnChangeTabs = (value) => {
  tab.value = value;
  page.value = 1;
};
</script>

<style>
thead tr {
  background-color: #e9e7eb;
}
/* thead tr th:last-child {
  background-color: red;
} */
/* .v-table .v-table__wrapper > table > thead > tr > th {
  background-color: red;
} */
#table-info div table thead tr th:last-child {
  display: none;
}
#table-info div table thead tr th div span {
  color: black;
  opacity: 87%;
}
</style>

<style scoped>
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
