<template>
  <Toolbars />
  <Navbar text="Delivery management" />
  <div class="p-4 sm:ml-64">
    <div class="lg:flex block gap-[15px] justify-between items-start">
      <v-autocomplete
        v-model="selectedShop"
        :items="shops"
        chips
        clearable
        density="compact"
        closable-chips
        color="blue-grey-lighten-2"
        item-title="name"
        item-value="value"
        label="ค้นหาโดย เลือกร้านค้า หรือ ID "
        multiple
        class="auto-feild lg:!max-w-[500px] w-full !h-[56px] !rounded-[8px] mb-[15px]"
        variant="outlined"
      >
        <template v-slot:chip="{ props, item }">
          <v-chip
            v-bind="props"
            :prepend-avatar="`/images/${item.raw.avatar}`"
            :text="item.raw.name"
          ></v-chip>
        </template>

        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :prepend-avatar="`/images/${item?.raw?.avatar}`"
            :title="item?.raw?.name"
            :subtitle="item?.raw?.group"
          ></v-list-item>
        </template>
      </v-autocomplete>

      <v-btn
        class="!rounded-[8px] lg:!w-[200px] !w-full !h-[56px] flat !bg-[#084F93] text-white flex gap-[15px] items-center"
      >
        <v-icon icon="mdi-truck-outline" size="large"></v-icon>
        <p class="ml-[5px]">เรียกรถขนส่ง</p>
      </v-btn>
    </div>

    <div class="mt-[15px]">
      <div class="card">
        <v-btn
          v-bind:color="tab === 'logistics' ? '#084F93' : '#fff'"
          variant="flat"
          @click="() => fnChangeTabs('logistics')"
          class="!rounded-[8px] text-[14px]"
          >จัดการขนส่ง</v-btn
        >
        <v-btn
          v-bind:color="tab === 'order' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fnChangeTabs('order')"
          >จัดการออเดอร์</v-btn
        >
      </div>
    </div>

    <v-card
      v-if="tab === 'logistics'"
      variant="flat"
      class="border border-[#EEEDF1] !rounded-[8px] pb-[15px] mt-4"
    >
      <div class="bg-[#E9E7EB] p-[20px] border-b border-[#E9E7EB]">
        <b class="text-[14px] text-[#084F93]"
          >ข้อมูลทั้งหมด {{ dataTableHistory.length }} รายการ</b
        >
      </div>
      <v-data-table
        :items="dataTableHistory"
        :headers="headTableHistory"
        item-key="id"
        no-data-text="ไม่มีข้อมูล"
        hide-default-footer
        items-per-page-text="จำนวนแสดงผล"
        :items-per-page="itemsPerPage"
        :page="page"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-table">
              <img
                :src="`/images/${item.logo}`"
                class="w-[40px] h-[40] rounded-full"
                alt=""
              />
            </td>
            <td class="text-table">
              {{ item.logisticName }}
            </td>
            <td class="text-table">
              {{ item.idTrack }}
            </td>
            <td class="text-table">
              {{ item.timeShiping }}
            </td>
            <td class="text-table">
              {{ item.countPackage }}
            </td>
            <td class="text-table">
              {{ item.price }}
            </td>
            <td class="text-table">
              {{ item.remark }}
            </td>
            <td class="text-table">
              {{ item.status }}
            </td>
            <td class="text-table">
              <v-btn flat @click="fn_openDialogViewLogistics">
                <v-icon icon="mdi-eye" color="#1A1C1E"></v-icon>
              </v-btn>
            </td>
          </tr>
        </template>

        <template v-slot:no-data>
          <div
            class="h-[600px] flex justify-center items-center flex-col space-y-3"
          >
            <div class="opacity-[60%]">ยังไม่มีรายการ</div>
          </div>
        </template>
        <template v-slot:bottom></template>
      </v-data-table>
      <!-- pagination  -->
    </v-card>
    <div
      class="text-center pt-2 flex justify-center items-center relative"
      v-if="tab === 'logistics'"
    >
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

    <div v-if="tab === 'order'">
      <div class="card mt-[15px] !max-w-full">
        <v-btn
          v-bind:color="tabTable === 'ทั้งหมด' ? '#084F93' : '#fff'"
          variant="flat"
          @click="() => fn_filter('ทั้งหมด')"
          class="!rounded-[8px] text-[14px]"
          >ทั้งหมด (45)</v-btn
        >
        <v-btn
          v-bind:color="tabTable === 'รอดำเนินการ' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fn_filter('รอดำเนินการ')"
          >รอดำเนินการ (25)</v-btn
        >
        <v-btn
          v-bind:color="tabTable === 'รอจัดส่งใหม่' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fn_filter('รอจัดส่งใหม่')"
          >รอจัดส่งใหม่ (0)</v-btn
        >
        <v-btn
          v-bind:color="tabTable === 'รอตีกลับ' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fn_filter('รอตีกลับ')"
          >รอตีกลับ (0)</v-btn
        >
        <v-btn
          v-bind:color="tabTable === 'เสร็จสิ้น​' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px] text-[14px]"
          @click="() => fn_filter('เสร็จสิ้น​')"
          >เสร็จสิ้น​ (20)</v-btn
        >
      </div>
      <v-card
        variant="flat"
        class="border border-[#EEEDF1] !rounded-[8px] pb-[15px] mt-4 !p-[15px]"
      >
        <v-data-table
          v-if="order.length > 0"
          :items="order"
          :headers="headersTableOrder"
          item-key="id"
          show-expand
          show-select
          no-data-text="ไม่มีข้อมูล"
          hide-default-footer
          items-per-page-text="จำนวนแสดงผล"
          :page="page"
          :items-per-page="itemsPerPage"
          v-model="dataTableSelected"
        >
          <!-- <template
            v-slot:item="{
              item,
              toggleExpand,
              isExpanded,
              internalItem,
            }"
          >
            <tr>
              <td
                class="text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
              >
                <v-checkbox
                  color="#2B3990"
                  :input-value="isSelected(item)"
                  @click="select(item, !isSelected(item))"
                ></v-checkbox>
              </td>
              <td
                class="text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
              >
                {{ item.name }}
              </td>
              <td
                class="text-[#084F93] text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
              >
                {{ item.id }}
              </td>
              <td
                class="text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
              >
                {{ item.status_order }}
              </td>
              <td
                class="text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
              >
                {{ item.create_date }}
              </td>
              <td
                class="text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
              >
                {{ item.price }}
              </td>
              <td
                class="text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
              >
                {{ item.payment }}
              </td>
              <td class="text-[16px] leading-5 tracking-[-0.23%] pr-10">
                <div class="flex justify-center items-center">
                  <div
                    class="w-4 h-4 mr-1 rounded-full"
                    v-bind:style="{
                      backgroundColor:
                        item.status === 'ยืนยันแล้ว' ? '#12B76A' : '#BA1A1A',
                    }"
                  ></div>
                  {{ item.status }}
                </div>
              </td>
              <td>
                <button @click="toggleExpand(internalItem)">
                  <v-icon aria-hidden="false" class="cursor-pointer">
                    {{
                      isExpanded(internalItem)
                        ? "mdi-chevron-up"
                        : "mdi-chevron-down"
                    }}
                  </v-icon>
                </button>
              </td>
            </tr>
          </template> -->

          <template v-slot:expanded-row="{ columns, item }">
            <td :colspan="columns.length">
              <div
                class="border-t border-x border-[#EEEDF1] w-full grid grid-cols-12 gap-4 p-2 px-16"
              >
                <div class="col-span-2">
                  <div class="opacity-[60%]">ช่องทางการขาย / แพลตพอร์ม</div>
                  <div class="whitespace-nowrap">Social Media - Facebook</div>
                </div>
                <div class="col-span-2">
                  <div class="opacity-[60%]">วิธีการชำระเงิน</div>
                  <div>{{ item.payment }}</div>
                </div>
                <div class="col-span-2">
                  <div class="opacity-[60%]">น้ำหนัก</div>
                  <div>1.0 กิโลกรัม</div>
                </div>
                <div class="col-span-4">
                  <div class="opacity-[60%]">เหตุผลในการยกเลิก</div>
                  <div>-</div>
                </div>
                <div class="col-span-2">
                  <div class="h-full justify-end space-x-5 flex">
                    <v-btn icon flat @click="dialogOrder = true">
                      <v-icon color="#74777F" size="large">mdi-reload</v-icon>
                    </v-btn>

                    <v-btn icon flat @click="dialogOrder = true">
                      <v-icon color="#74777F" size="large"
                        >mdi-file-alert-outline</v-icon
                      >
                    </v-btn>
                  </div>
                </div>
              </div>
              <div
                class="border-b border-[#EEEDF1] w-full grid grid-cols-12 gap-4 p-2 px-16"
              >
                <div class="col-span-2">
                  <div class="opacity-[60%]">สิ้นค้า</div>
                  <div class="whitespace-nowrap">
                    <div>รองเท้าแตะ x1</div>
                    <div>ปาท่องโก๋ x3</div>
                    <div>
                      ลิปสติก x5
                      <span class="text-[#084F93] cursor-pointer"
                        >ดูเพิ่มเติม</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-span-2">
                  <div class="opacity-[60%]">เบอร์โทร</div>
                  <div>081-234-5678</div>
                </div>
                <div class="col-span-2">
                  <div class="opacity-[60%]">ผู้สร้างออเดอร์</div>
                  <div>Admin 1</div>
                </div>
                <div class="col-span-6">
                  <div class="opacity-[60%]">ยกเลิกโดย</div>
                  <div>-</div>
                </div>
              </div>
            </td>
          </template>
          <template v-slot:bottom></template>
        </v-data-table>
        <div v-else class="h-[260px] flex justify-center items-center">
          <p>ยังไม่มีรายการ</p>
        </div>
      </v-card>
    </div>
  </div>

  <v-dialog v-model="dialogViewLogistics" width="673px" class="!rounded-[8px]">
    <v-card variant="outlined" class="!rounded-[8px] bg-white border-0">
      <v-card-text>
        <div class="flex justify-between item-center">
          <p class="text-[20px] font-bold">เรียกรถขนส่ง</p>
          <v-btn flat icon @click="dialogViewLogistics = false"
            ><v-icon icon="mdi-close"></v-icon
          ></v-btn>
        </div>
        <div class="flex items-center mb-[5px]">
          <p class="w-[150px]">ขนส่ง</p>
          <p class="mr-[10px]">:</p>
          <p class="flex items-center gap-[10px]">
            <span
              ><img
                src="/images/mc-logo.png"
                class="w-[40px] h-[40px] rounded-full" /></span
            >Flash Express
          </p>
        </div>
        <div class="flex items-center mb-[5px]">
          <p class="w-[150px]">สถานะ</p>
          <p class="mr-[10px]">:</p>
          <p>รอการยืนยัน</p>
        </div>
        <div class="flex items-center mb-[5px]">
          <p class="w-[150px]">จำนวนพัสดุ</p>
          <p class="mr-[10px]">:</p>
          <p>2</p>
        </div>
        <div class="flex items-center mb-[5px]">
          <p class="w-[150px]">วันที่เข้ารับพัสดุ</p>
          <p class="mr-[10px]">:</p>
          <p>23/10/2023</p>
        </div>
        <div class="flex items-center mb-[5px]">
          <p class="w-[150px]">หมายเหตุ</p>
          <p class="mr-[10px]">:</p>
          <p>23/10/2023</p>
        </div>

        <v-btn
          @click="dialogViewLogistics = false"
          flat
          class="my-[15px] w-full !h-[56px] !rounded-[8px] !border !border-[#BA1A1A]"
        >
          <p class="text-[#BA1A1A]">ยกเลิกรายการ</p>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogOrder" width="673px" class="!rounded-[8px]">
    <v-card variant="outlined" class="!rounded-[8px] bg-white border-0">
      <v-card-text>
        <div class="flex justify-between item-center">
          <p class="text-[20px] font-bold">เรียกรถขนส่ง</p>
          <v-btn flat icon @click="dialogOrder = false"
            ><v-icon icon="mdi-close"></v-icon
          ></v-btn>
        </div>
        <div class="flex items-center mb-[5px] justify-between">
          <p class="!w-[220px]">ประเภทการรับพัสดุ</p>
          <v-autocomplete
            v-model="selectedShop"
            :items="shops"
            chips
            clearable
            density="compact"
            closable-chips
            color="blue-grey-lighten-2"
            item-title="name"
            item-value="value"
            label="เลือกขนส่ง"
            multiple
            class="auto-feild lg:!max-w-[500px] w-full !h-[48px] !rounded-[8px] mb-[15px]"
            variant="outlined"
          >
            <template v-slot:chip="{ props, item }">
              <v-chip
                v-bind="props"
                :prepend-avatar="`/images/${item.raw.avatar}`"
                :text="item.raw.name"
              ></v-chip>
            </template>

            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :prepend-avatar="`/images/${item?.raw?.avatar}`"
                :title="item?.raw?.name"
                :subtitle="item?.raw?.group"
              ></v-list-item>
            </template>
          </v-autocomplete>
        </div>
        <div class="flex items-center mb-[5px]">
          <p class="!w-[220px]">ขนส่ง</p>
          <v-autocomplete
            v-model="selectedShop"
            :items="shops"
            chips
            clearable
            density="compact"
            closable-chips
            color="blue-grey-lighten-2"
            item-title="name"
            item-value="value"
            label="เลือกขนส่ง"
            multiple
            class="auto-feild lg:!max-w-[500px] w-full !h-[48px] !rounded-[8px] mb-[15px]"
            variant="outlined"
          >
            <template v-slot:chip="{ props, item }">
              <v-chip
                v-bind="props"
                :prepend-avatar="`/images/${item.raw.avatar}`"
                :text="item.raw.name"
              ></v-chip>
            </template>

            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :prepend-avatar="`/images/${item?.raw?.avatar}`"
                :title="item?.raw?.name"
                :subtitle="item?.raw?.group"
              ></v-list-item>
            </template>
          </v-autocomplete>
        </div>
        <div class="flex items-center mb-[5px]">
          <p class="!w-[220px]">จำนวนพัสดุ</p>
          <v-text-field
            clearable
            label="ใส่จำนวนพัสดุ"
            class="auto-feild lg:!max-w-[500px] w-full !h-[48px] !rounded-[8px] mb-[15px]"
            variant="outlined"
          ></v-text-field>
        </div>
        <div class="flex items-center mb-[5px]">
          <p class="!w-[220px]">วันที่เข้ารับพัสดุ</p>
          <v-menu ref="open">
            <template v-slot:activator="{ props }">
              <v-text-field
                v-bind="props"
                clearable
                prepend-inner-icon="mdi-calendar-range"
                label="ใส่จำนวนพัสดุ"
                class="auto-feild lg:!max-w-[500px] w-full !h-[48px] !rounded-[8px] mb-[15px]"
                variant="outlined"
              ></v-text-field>
            </template>
            <v-date-picker @input="open = false" locale="th"></v-date-picker>
          </v-menu>
        </div>
        <div class="flex items-center mb-[5px]">
          <p class="!w-[220px]">หมายเหตุ</p>
          <v-text-field
            clearable
            label="หมายเหตุ"
            class="auto-feild lg:!max-w-[500px] w-full !h-[48px] !rounded-[8px] mb-[15px]"
            variant="outlined"
          ></v-text-field>
        </div>

        <div class="flex gap-[15px] flex-nowrap">
          <v-btn
            @click="dialogOrder = false"
            flat
            class="my-[15px] w-[50%] !h-[56px] !rounded-[8px] !border !border-[#084F93]"
          >
            <p class="text-[#084F93]">ยกเลิกรายการ</p>
          </v-btn>
          <v-btn
            @click="dialogOrder = false"
            flat
            class="my-[15px] w-[50%] !h-[56px] !rounded-[8px] !bg-[#084F93]"
          >
            <p class="text-white">เรียกรถ</p>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

let dialogViewLogistics = ref(false);
let dialogOrder = ref(false);
let tab = ref("logistics");
let tabTable = ref("ทั้งหมด");
let page = ref(1);
let itemsPerPage = ref(5);
let dataTableSelected = ref([]);

let selectedShop = ref([]);
let shops = [
  {
    value: "shop-1",
    name: "pimmy shop  - 00110010",
    group: "Group 1",
    avatar: "mc-logo.png",
  },
  {
    value: "shop-2",
    name: "pimmy shop  - 00110010",
    group: "Group 1",
    avatar: "mc-logo.png",
  },
  {
    value: "shop-3",
    name: "pimmy shop  - 00110010",
    group: "Group 1",
    avatar: "mc-logo.png",
  },
  {
    value: "shop-4",
    name: "pimmy shop  - 00110010",
    group: "Group 1",
    avatar: "burger-logo.png",
  },
];

let order = ref([]);

const headTableHistory = [
  {
    key: "logo",
    title: "",
    align: "center",
  },
  {
    key: "logisticName",
    title: "ขนส่ง",
    align: "center",
  },
  {
    key: "idTrack",
    title: "รหัสเที่ยวรถ",
    align: "center",
  },
  {
    key: "timeShiping",
    title: "เวลาที่รับพัสดุ",
    align: "center",
  },
  {
    key: "countPackage",
    title: "จำนวนพัสดุ",
    align: "center",
  },
  {
    key: "price",
    title: "ค่าขนส่ง",
    align: "center",
  },
  {
    key: "remark",
    title: "หมายเหตุ",
    align: "center",
  },
  {
    key: "status",
    title: "สถานะ",
    align: "center",
  },
  {
    key: "view",
    title: "",
    align: "center",
  },
];

const dataTableHistory = ref([
  {
    id: "1",
    logo: "burger-logo.png",
    logisticName: "SCG Express",
    idTrack: "23102023CC",
    timeShiping: "13/12/2000 21:00",
    countPackage: 150,
    price: "รอตรวจสอบ",
    remark: "-",
    status: "รอรถเข้ารับ",
  },
  {
    id: "1",
    logo: "burger-logo.png",
    logisticName: "SCG Express",
    idTrack: "23102023CC",
    timeShiping: "13/12/2000 21:00",
    countPackage: 52,
    price: "1,000",
    remark: "-",
    status: "สำเร็จ",
  },
  {
    id: "1",
    logo: "burger-logo.png",
    logisticName: "SCG Express",
    idTrack: "23102023CC",
    timeShiping: "13/12/2000 21:00",
    countPackage: 20,
    price: "รอตรวจสอบ",
    remark: "-",
    status: "ยกเลิก",
  },
]);

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
const dataTableOrder = [
  {
    create_date: "13/12/2000 20:00",
    id: "1231231231",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "รอดำเนินการ",
    status_order: "ที่ต้องจัดส่ง",
  },
  {
    create_date: "13/12/2000 20:00",
    id: "53242342",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "รอจัดส่งใหม่",
    status_order: "เสร็จสิ้น",
  },
  {
    create_date: "13/12/2000 20:00",
    id: "23241516",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "รอตีกลับ",
    status_order: "เสร็จสิ้น",
  },
  {
    create_date: "13/12/2000 20:00",
    id: "6123135",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "เสร็จสิ้น",
    status_order: "เสร็จสิ้น",
  },
  {
    create_date: "13/12/2000 20:00",
    id: "6132323234",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "เสร็จสิ้น",
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

watch(selectedShop, () => {
  if (selectedShop.value.length > 1) {
    selectedShop.value.shift();
  }
});

const fnChangeTabs = (value) => {
  tab.value = value;
  page.value = 1;
};

const fnChangeSelect = (e) => {
  itemsPerPage.value = e;
  console.log(e);
};

const fn_openDialogViewLogistics = () => {
  dialogViewLogistics.value = true;
};

const fnChangeTabsTable = (value) => {
  tabTable.value = value;
  page.value = 1;
};

const fn_filter = (status) => {
  tabTable.value = status === undefined ? "ทั้งหมด" : status;
  page.value = 1;
  if (status === undefined || status === "ทั้งหมด") {
    order.value = dataTableOrder;
  } else {
    order.value = dataTableOrder.filter((order) => order.status === status);
  }
  //   order.value = dataTableOrder.filter((order) => order.status === status);

  //   console.log(order.value,"ORDER")
  console.log(status);
};

onMounted(() => {
  fn_filter();
});
</script>

<style scoped>
.auto-feild input {
  background-color: transparent !important;
}
.card {
  @apply border border-[#EEEDF1] !rounded-[8px] p-2 flex space-x-2 justify-start items-center lg:max-w-[500px] w-full;
}
</style>
