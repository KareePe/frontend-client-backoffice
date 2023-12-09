<template>
  <Toolbars />
  <Navbar text="จัดการลูกค้า,ยืนยันตัวตน" />
  <!-- <Navbar :text="navbar" v-if="viewProduct === true" /> -->
  <div class="pt-2 pb-2 pl-4 pr-4 sm:ml-64">
    <!-- {{ pdfLink }} -->

    <b class="text-[18px]">ข้อมูลธุรกิจ</b>
    <div
      class="lg:flex block lg:flex-wrap flex-nowarp justify-between items-start mt-[12px]"
    >
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
          >รอตรวจสอบ (200)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >ยื่นเอกสารใหม่ (200)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Approve' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('Approve')"
          >ยืนยันแล้ว (200)</v-btn
        >
      </div>
    </div>

    <div v-if="items.length > 0">
      <v-data-table
        :headers="headers"
        :items="items"
        no-data-text="ไม่มีข้อมูล"
        hide-default-footer
        class="mt-[15px] mb-[15px] border !rounded-[8px]"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <img
                :src="`/images/${item.logo}`"
                class="w-[40px] h-[40px]"
                alt=""
              />
            </td>
            <td class="truncate">{{ item.bizId }}</td>
            <td class="truncate">{{ item.bizName }}</td>
            <td class="truncate">
              <div
                class="flex flex-nowrap gap-[15px] border border-[#EEEDF1] rounded-[8px] py-[8px] px-[16px]"
              >
                <v-icon icon="mdi-file-outline" color="#1A1C1E"></v-icon>
                {{ item.proveBook }}
              </div>
            </td>
            <td class="truncate">
              <div
                class="flex flex-nowrap gap-[15px] border border-[#EEEDF1] rounded-[8px] py-[8px] px-[16px]"
              >
                <v-icon
                  icon="mdi-card-account-details-outline"
                  color="#1A1C1E"
                ></v-icon>
                {{ item.idCard }}
              </div>
            </td>
            <td class="truncate">
              <div
                :class="`flex flex-nowrap gap-[15px] py-[8px] px-[16px] rounded-[8px] ${
                  item.status === 'รอตรวจสอบ'
                    ? 'bg-[#FFFAEB] text-[#DC6803]'
                    : item.status === 'ยืนยันแล้ว'
                    ? 'bg-[#ECFDF3] text-[#039855]'
                    : 'bg-[#FFDAD6] text-[#BA1A1A]'
                }`"
              >
                <v-icon
                  :icon="
                    item.status === 'รอตรวจสอบ'
                      ? 'mdi-clock-outline'
                      : item.status === 'ยืนยันแล้ว'
                      ? 'mdi-check-decagram-outline'
                      : 'mdi-information-outline'
                  "
                  :color="
                    item.status === 'รอตรวจสอบ'
                      ? '#DC6803'
                      : item.status === 'ยืนยันแล้ว'
                      ? '#039855'
                      : '#BA1A1A'
                  "
                ></v-icon>
                {{ item.status }}
              </div>
            </td>
            <td>
              <!-- <v-btn
                flat
                @click="dialog = true"
                :disabled="item.status !== 'รอตรวจสอบ'"
                class="!bg-[#084F93] text-white !w-[100px] rounded-[8px] py-[8px] px-[16px] text-center"
                >เปลี่ยน</v-btn
              > -->
              <v-btn
                icon="mdi-play"
                flat
                @click="this.$router.push('/kyc/1234')"
              ></v-btn>
            </td>
          </tr>
        </template>
        <template #bottom></template>
      </v-data-table>
    </div>
    <div v-else class="h-[260px] flex justify-center items-center">
      <p>ยังไม่มีรายการ</p>
    </div>
    <div class="text-center pt-2 flex justify-center items-center relative">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <div class="w-[170px] absolute right-0 mr-4">
        <v-select
          label="จำนวนแสดงผล"
          variant="outlined"
          :items="[5, 10, 15, 20, 25, 30]"
          :item-title="(item) => item + ' รายการ'"
          :item-value="(item) => item"
          :model-value="itemsPerPage"
          density="compact"
          hide-details="auto"
          @update:modelValue="fnChangeRowPerPages"
        ></v-select>
      </div>
    </div>
  </div>

  <v-dialog v-model="dialog" width="386px" class="rounded-[8px]">
    <v-card class="!p-[5px] rounded-[8px]">
      <v-card-text class="relative !p-[10px]">
        <p class="text-[16px] font-bold text-[#000]/[0.6] text-center">
          เปลี่ยนสถานะ
        </p>
        <v-icon
          @click="dialog = false"
          icon="mdi-close"
          class="text-[#000]/[0.6] !absolute right-[5px] top-[15px]"
        ></v-icon>

        <div
          class="mt-[15px] !w-full justify-between flex-row-reverse flex flex-nowrap gap-[15px] border border-[#EEEDF1] rounded-[8px] py-[8px] px-[16px]"
        >
          <v-radio-group
            v-model="radios"
            :hide-details="true"
            class="justify-between flex"
          >
            <v-radio
              value="Google"
              density="compact"
              :hide-details="true"
              class="flex justify-between flex-row-reverse"
            >
              <template v-slot:label>
                <p>ยื่นเอกสารใหม่</p>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          flat
          class="!bg-[#084F93] text-white !rounded-[8px] !w-full !h-[48px] pb-[8px] px-[16px] text-center"
          @click="dialog = false"
          >ยืนยัน</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, computed } from "vue";
let tab = ref("Order");
const headers = [
  {
    title: "รูป",
    align: "start",
    key: "logo",
  },
  {
    title: "รหัส",
    align: "center",
    key: "bizId",
  },
  {
    title: "ชื่อธุรกิจ",
    align: "center",
    key: "bizName",
  },
  {
    title: "หนังสือรับรอง",
    align: "center",
    key: "proveBook",
  },
  {
    title: "บัตรประชาชน",
    align: "center",
    key: "idCard",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "",
    align: "center",
    key: "changeStatus",
  },
];

let items = [
  {
    logo: "pizza-logo.png",
    bizId: "SX-0001",
    bizName: "This is company co., ltd.",
    proveBook: "หนังสือรับรอง.pdf",
    idCard: "บัตรประชาชน.pdf",
    status: "รอตรวจสอบ",
  },
  {
    logo: "pizza-logo.png",
    bizId: "SX-0001",
    bizName: "This is company co., ltd.",
    proveBook: "หนังสือรับรอง.pdf",
    idCard: "บัตรประชาชน.pdf",
    status: "ยืนยันแล้ว",
  },
  {
    logo: "pizza-logo.png",
    bizId: "SX-0001",
    bizName: "This is company co., ltd.",
    proveBook: "หนังสือรับรอง.pdf",
    idCard: "บัตรประชาชน.pdf",
    status: "ยื่นเอกสารใหม่",
  },
];

let dialog = ref(false);
let radios = ref("");
const fnChangeTabs = (value) => {
  tab.value = value;
  page.value = 1;
};
</script>
<style>
.v-pagination__next .v-btn,
.v-pagination__prev .v-btn {
  border: 1px solid #c2c2c2 !important;
  border-radius: 8px !important;
}
.v-pagination__item--is-active .v-btn {
  background-color: #084f93;
  border-radius: 8px !important;
  color: #fff;
}
.v-data-table-footer__pagination {
  margin: 15px 0 !important;
}
.v-data-table-footer__info,
.v-data-table-footer__pagination {
  display: none !important;
}

thead tr {
  background-color: #e9e7eb;
}

.v-tab--selected {
  background-color: #094f93;
  border-radius: 8px !important;
  color: #fff !important;
}
.v-tab.v-tab {
  height: 38px;
  font-size: 14px;
}
.v-tab__slider {
  height: 0 !important;
}

.card {
  @apply border border-[#EEEDF1] !rounded-[8px] p-2 flex space-x-2 justify-center items-center;
}
</style>
