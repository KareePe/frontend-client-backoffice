<template>
  <Toolbars />
  <Navbar text="สนับสนุนการขาย" />
  <!-- <Navbar :text="navbar" v-if="viewProduct === true" /> -->
  <v-alert
    variant="outlined"
    type="success"
    prominent
    icon="mdi-check-circle"
    border
    class="!absolute top-[25px] left-[50%] -translate-x-[50%] !bg-[#D1FADF] z-50 !min-w-[366px]"
    v-if="alert === true"
  >
    <v-progress-linear
      indeterminate
      class="!w-full mb-[15px]"
    ></v-progress-linear>
    <b class="text-black">คัดลอกสำเร็จ</b>
    <p class="text-black">คัดลอง url สำเร็จ</p>
  </v-alert>
  <div class="p-4 md:ml-64">
    <div
      class="lg:flex block lg:flex-wrap flex-nowarp justify-between items-start"
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
          >รอเข้าใช้งาน (200)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('History')"
          >เปิดใช้งานแล้ว (200)</v-btn
        >
      </div>
      <NuxtLink
        to="/account-support/create"
        flat
        color="#084F93"
        class="flex bg-[#084F93] text-white justify-center gap-[8px] rounded-[8px] items-center lg:!w-[200px] w-full !h-[56px]"
      >
        <v-icon icon="mdi-plus" color="#fff"></v-icon>
        เพิ่มบัญชีผู้ใช้งาน
      </NuxtLink>
    </div>
    <v-data-table
      v-if="items.length > 0"
      :custom-filter="filterOnlyCapsText"
      :headers="headers"
      :items="items"
      :search="search"
      no-data-text="ไม่มีข้อมูล"
      hide-default-footer
      items-per-page-text="จำนวนแสดงผล"
      class="mt-[12px] mb-[15px] border !rounded-[8px]"
    >
      <template v-slot:item="{ item }">
        <tr class="!my-[5px]">
          <td class="truncate">{{ item.userName }}</td>
          <td class="truncate">{{ item.bizName }}</td>
          <td class="truncate">{{ item.package }}</td>
          <td class="truncate">
            <div class="flex">
              {{ item.url }}
              <v-btn
                @click="fn_copyUrl(item.url)"
                :loading="loading"
                flat
                density="compact"
                class="!w-[10px]"
              >
                <v-icon icon="mdi-content-copy" color="#084F93"></v-icon>
              </v-btn>
            </div>
          </td>
          <td class="text-center text-[14px]">
            <div class="flex gap-[15px] justify-center">
              <div
                :class="`w-[16px] h-[16px] ${
                  item.status === 'เปิดใช้งาน' ? 'bg-[#12B76A]' : 'bg-[#BA1A1A]'
                } !rounded-full`"
              ></div>
              {{ item.status }}
            </div>
          </td>
          <td>
            <div class="flex">
              <v-btn density="compact" flat>
                <v-icon
                  icon="mdi-delete-outline"
                  size="x-large"
                  color="#1A1C1E"
                ></v-icon>
              </v-btn>
              <v-btn density="compact" flat>
                <v-icon
                  icon="mdi-square-edit-outline"
                  size="x-large"
                  color="#1A1C1E"
                ></v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
      <template v-slot:bottom></template>
    </v-data-table>
    <div v-else class="h-[260px] flex justify-center items-center">
      <p>ยังไม่มีรายการ</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, computed } from "vue";
let search = ref("");
let loading = ref(false);
let alert = ref(false);
let tab = ref("Order");

const headers = [
  {
    title: "ชื่อลูกค้า",
    align: "start",
    key: "userName",
  },
  {
    title: "ชื่อธุรกิจ",
    align: "center",
    key: "bizName",
  },
  {
    title: "ข้อมูลแพ็คเกจ",
    align: "center",
    key: "package",
  },
  {
    title: "URL",
    align: "center",
    key: "url",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "ดำเนินการ",
    align: "center",
    key: "edit",
  },
];

let items = [
  {
    userName: "หม่ำ จ๊กมก",
    bizName: "This is company co., ltd.",
    package: "Business +",
    url: "www.salex.com/3257345",
    status: "รอเข้าใช้งาน",
  },
  {
    userName: "หม่ำ จ๊กมก",
    bizName: "This is company co., ltd.",
    package: "Business +",
    url: "www.salex.com/3257345",
    status: "รอเข้าใช้งาน",
  },
];

const fn_copyUrl = (url) => {
  loading.value = true;
  navigator.clipboard.writeText(url);
  loading.value = false;
  alert.value = true;
  setTimeout(() => {
    alert.value = false;
  }, 3000);
};

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
