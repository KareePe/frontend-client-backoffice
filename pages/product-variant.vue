<script lang="ts">
type tabType = "primary" | "secondary1" | "secondary2";
type itemTableType = {
  variant: string;
  category: string;
  create_date: string;
  creater: string;
};
type headerTableType<T> = {
  title: string;
  key: keyof T | "";
  sortable?: boolean;
  align?: "center" | "start" | "end";
}[];
</script>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
definePageMeta({
  middleware: "auth-middleware",
});

const tab = ref<tabType>("primary");
const search = ref("");
const page = ref(1);
const itemsPerPage = ref(10);
const itemSelect = ref<{} | null>(null);
const dialogAddVariant = ref<boolean>(true);

const dialogCategoryAddValue = ref<string>("");
const dialogSubCategoryAddValue = ref<string[]>([""]);

const tableItem = ref<itemTableType[]>([
  {
    variant: "สี",
    category: "เขียว , ขาว , ดำ",
    create_date: "13/12/2000",
    creater: "jack papho",
  },
  {
    variant: "ขนาด",
    category: "20x20, 30x30, 40x40",
    create_date: "13/12/2000",
    creater: "jack papho",
  },
  {
    variant: "ไซด์",
    category: "XXS, XS, S, M, L, XL, XXL",
    create_date: "13/12/2000",
    creater: "jack papho",
  },
  {
    variant: "ลวดลาย",
    category: "ลายจุด, ลายทาง, ลายตาราง, ลายขวาง",
    create_date: "13/12/2000",
    creater: "jack papho",
  },
]);

const headersTable = ref<headerTableType<itemTableType>>([
  {
    key: "variant",
    title: "ตัวเลือกสินค้า",
    align: "center",
  },
  {
    key: "category",
    title: "ประเภท",
    align: "center",
  },
  {
    key: "create_date",
    title: "วันที่สร้าง",
    align: "center",
  },
  {
    key: "creater",
    title: "ผู้สร้าง",
    align: "center",
  },
  {
    key: "",
    title: "",
    align: "center",
    sortable: false,
  },
]);

const fnChangeRowPerPages = (e: number) => {
  itemsPerPage.value = e;
  console.log(e);
};
const fnAppendSubCategoryDialogValue = () => {
  dialogSubCategoryAddValue.value.push("");
};

const fnDeleteSubCategoryDialogValue = (index: number) => {
  dialogSubCategoryAddValue.value = [
    ...dialogSubCategoryAddValue.value.slice(0, index),
    ...dialogSubCategoryAddValue.value.slice(index + 1),
  ];
};
// watch(dialogCategoryAddValue, () => {
//   if (dialogCategoryAddValue.value.length === 1) {
//     dialogSubCategoryAddValue.value.push("");
//   }
// });

const pageCount = computed(() => {
  return Math.ceil(tableItem.value.length / itemsPerPage.value);
});

// const props = defineProps(["title", "breadcrumbsText"]);
</script>

<template>
  <Toolbars />\
  <Navbar text="Product variant" />
  <div class="ContainerLayout space-y-5">
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
        @click="
          {
            dialogAddVariant = true;
            itemSelect = null;
          }
        "
      >
        เพิ่มตัวเลือกสินค้า
      </v-btn>
    </div>

    <!-- table  -->
    <v-card
      variant="flat"
      class="border border-[#EEEDF1] rounded-[8px] pb-[15px]"
    >
      <div class="bg-[#E9E7EB] p-[20px] border-b border-[#E9E7EB]">
        <b class="text-[14px] text-[#084F93]"
          >ข้อมูลทั้งหมด {{ tableItem.length }} รายการ</b
        >
      </div>
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
            <td class="text-table">
              {{ item.variant }}
            </td>
            <td class="text-table">
              {{ item.category }}
            </td>
            <td class="text-table">
              {{ item.create_date }}
            </td>
            <td class="text-table">
              {{ item.creater }}
            </td>
            <td class="text-table space-x-3">
              <v-icon class="cursor-pointer" color="#DAD9DD">mdi-delete</v-icon>
              <v-icon
                class="cursor-pointer"
                color="#DAD9DD"
                @click="
                  {
                    dialogAddVariant = true;
                    itemSelect = {
                      test:'sdad'
                    };
                  }
                "
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

  <v-dialog v-model="dialogAddVariant" class="w-full max-w-lg">
    <v-card>
      <v-card-text class="flex justify-start items-start relative">
        <div class="text-[16px] font-[600] text-center opacity-[0.8]">
          {{ !!itemSelect ? "แก้ไขสินค้า" : "เพิ่มตัวเลือกสินค้า" }}
        </div>
        <div class="absolute right-5 cursor-pointer">
          <v-icon @click="dialogAddVariant = false">mdi-close</v-icon>
        </div>
      </v-card-text>
      <v-card-text class="flex flex-col space-y-3">
        <div class="card space-y-3">
          <div class="flex space-x-5 justify-center items-center">
            <div>ประเภท</div>
            <v-text-field
              placeholder="ระบุประเภท"
              variant="outlined"
              hide-details
              v-model="dialogCategoryAddValue"
              rounded="lg"
            ></v-text-field>
          </div>
          <div v-if="dialogCategoryAddValue.length > 0">
            <div
              class="space-y-1 mb-2"
              v-for="(item, index) in dialogSubCategoryAddValue"
            >
              <div class="text-[14px] leading-5 text-[#74777F] ml-10">
                ประเภท{{ dialogCategoryAddValue }}
              </div>
              <div class="flex">
                <v-icon size="35" class="mr-1" color="#084F93"
                  >mdi-arrow-right-bottom</v-icon
                >
                <v-text-field
                  variant="outlined"
                  density="compact"
                  class="w-full"
                  :model-value="item"
                  append-inner-icon="mdi-delete-outline"
                  @click:append-inner="fnDeleteSubCategoryDialogValue(index)"
                  hide-details
                  @input="
              (event:any) => {
                dialogSubCategoryAddValue[index] = event.target.value;
              }
            "
                ></v-text-field>
              </div>
            </div>
            <div class="flex justify-end mt-2">
              <v-btn
                prepend-icon="mdi-plus"
                color="#084F93"
                variant="plain"
                size="small"
                @click="fnAppendSubCategoryDialogValue"
              >
                เพิ่มหมวดหมู่รอง 1
              </v-btn>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-text class="flex justify-between">
        <v-btn class="w-full" color="#084F93" size="large" variant="flat">
          สร้าง
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.card {
  @apply border border-[#EEEDF1] rounded-md p-2;
}
.text-table {
  @apply text-[14px] leading-5 text-center !pr-10;
}
</style>
