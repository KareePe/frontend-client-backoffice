<script lang="ts">
type tabType = "primary" | "secondary1" | "secondary2";
type itemTableType = {
  primary: string;
  secondary1: string;
  secondary2: string;
  choice: string;
  status: "เปิดใช้งาน" | "ปิดใช้งาน";
};
type headerTableType<T> = {
  title: string;
  key: keyof T | "";
  sortable?: boolean;
  align?: "center" | "start" | "end";
}[];
</script>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
definePageMeta({
  middleware: "auth-middleware",
});

const tab = ref<tabType>("primary");
const search = ref("");
const page = ref(1);
const itemsPerPage = ref(10);
const itemSelect = ref<{} | null>(null);

const tableItem = ref<itemTableType[]>([
  {
    primary: "ความงามและของใช้ส่วนตัว",
    secondary1: "2",
    secondary2: "2",
    choice: "2",
    status: "เปิดใช้งาน",
  },
  {
    primary: "กระเป๋า",
    secondary1: "2",
    secondary2: "2",
    choice: "2",
    status: "ปิดใช้งาน",
  },
  {
    primary: "รองเท้า",
    secondary1: "2",
    secondary2: "2",
    choice: "2",
    status: "เปิดใช้งาน",
  },
  {
    primary: "เรืองประดับ",
    secondary1: "2",
    secondary2: "2",
    choice: "2",
    status: "ปิดใช้งาน",
  },
]);

const headersTable = ref<headerTableType<itemTableType>>([
  {
    key: "primary",
    title: "หมวดหมู่หลัก",
    align: "center",
  },
  {
    key: "secondary1",
    title: "หมวดหมู่รอง 1",
    align: "center",
  },
  {
    key: "secondary2",
    title: "หมวดหมู่รอง 2",
    align: "center",
  },
  {
    key: "choice",
    title: "ตัวเลือกสินค้า",
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
    align: "center",
    sortable: false,
  },
]);

const fnTabChange = (value: tabType) => {
  tab.value = value;
};

const fnChangeRowPerPages = (e: number) => {
  itemsPerPage.value = e;
  console.log(e);
};

const pageCount = computed(() => {
  return Math.ceil(tableItem.value.length / itemsPerPage.value);
});

const fnSelectItem = (value: itemTableType) => {
  itemSelect.value = value;
  console.log(value);
};

const fnGobackEdit = () => {
  itemSelect.value = null
}

// const props = defineProps(["title", "breadcrumbsText"]);
</script>

<template>
  <Toolbars />\
  <Navbar text="Product Category" />
  <div class="ContainerLayout space-y-5" v-if="!itemSelect">
    <!-- header menu -->
    <div class="flex w-full justify-between items-center">
      <div class="w-[450px]">
        <v-text-field
          density="compact"
          placeholder="ค้นหา"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
      <v-btn
        color="#084F93"
        variant="flat"
        size="x-large"
        rounded="lg"
        prepend-icon="mdi-plus"
      >
        เพิ่มหมวดหมู่สินค้าใหม่
      </v-btn>
    </div>

    <!-- tab switch -->
    <div class="space-x-3">
      <v-btn
        rounded="lg"
        :variant="tab === 'primary' ? 'outlined' : 'text'"
        :color="tab === 'primary' ? '#084F93' : '#000'"
        :border="true"
        @click="fnTabChange('primary')"
      >
        หมวดหมู่หลัก
      </v-btn>
      <v-btn
        rounded="lg"
        :variant="tab === 'secondary1' ? 'outlined' : 'text'"
        :border="true"
        :color="tab === 'secondary1' ? '#084F93' : '#000'"
        @click="fnTabChange('secondary1')"
      >
        หมวดหมู่รอง 1
      </v-btn>
      <v-btn
        rounded="lg"
        :variant="tab === 'secondary2' ? 'outlined' : 'text'"
        :border="true"
        :color="tab === 'secondary2' ? '#084F93' : '#000'"
        @click="fnTabChange('secondary2')"
      >
        หมวดหมู่รอง 2
      </v-btn>
    </div>

    <!-- table  -->
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
      >
        <template
          v-slot:item="{ item, toggleExpand, isExpanded, internalItem }"
        >
          <tr>
            <td class="text-table">{{ item.primary }}</td>
            <td class="text-table">
              {{ item.secondary1 }}
            </td>
            <td class="text-table">
              {{ item.secondary2 }}
            </td>
            <td class="text-table">
              {{ item.choice }}
            </td>
            <td class="text-table">
              <div class="flex justify-center items-center">
                <div
                  class="w-4 h-4 mr-1 rounded-full"
                  v-bind:style="{
                    backgroundColor:
                      item.status === 'เปิดใช้งาน' ? '#12B76A' : '#BA1A1A',
                  }"
                ></div>
                {{ item.status }}
              </div>
            </td>
            <td class="text-table">
              <v-icon @click="fnSelectItem(item)" class="cursor-pointer"
                >mdi-pencil</v-icon
              >
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
          @update:modelValue="fnChangeRowPerPages"
        ></v-select>
      </div>
    </div>
  </div>

  <div class="ContainerLayout space-y-5" v-else>
    <EditProduct :tab="tab" @go-back="fnGobackEdit" />
  </div>
</template>

<style scoped>
.card {
  @apply border border-[#EEEDF1] rounded-md p-2 flex space-x-5 justify-center items-center;
}
.text-table {
  @apply text-[14px] leading-5 text-center !pr-10;
}
</style>
