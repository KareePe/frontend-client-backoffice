<template>
  <Toolbars />
  <Navbar text="Business info,Business account" v-if="detailData.length <= 0" />
  <Navbar :text="navbar" v-else />
  <div class="p-4 sm:ml-64">
    <div v-if="detailData.length <= 0">
      <v-text-field
        v-model="search"
        variant="outlined"
        label="ค้นหาธุรกิจ"
        prepend-inner-icon="mdi-magnify"
        class="!max-w-[480px] min-h-[56px] rounded-[8px] mb-[15px]"
        single-line
        hide-details
        @click:prepend-inner="onClick"
      ></v-text-field>
      <v-card variant="flat" class="border border-[#EEEDF1] rounded-[8px]">
        <div class="bg-[#E9E7EB] p-[20px]">
          <b class="text-[14px] text-[#084F93]"
            >ข้อมูลทั้งหมด {{ items.length }} รายการ</b
          >
        </div>
        <v-data-table
          v-if="items.length > 0"
          v-model:page="page"
          :custom-filter="filterOnlyCapsText"
          :headers="headers"
          :items="items"
          :items-per-page="itemsPerPage"
          :search="search"
          no-data-text="ไม่มีข้อมูล"
          hide-default-footer
          items-per-page-text="จำนวนแสดงผล"
          class="mb-[15px]"
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
              <td>{{ item.bizId }}</td>
              <td>{{ item.bizName }}</td>
              <td>{{ item.phone }}</td>
              <td class="truncate">{{ item.address }}</td>
              <td>{{ item.credit }}</td>
              <td class="truncate">
                <div class="flex gap-[15px]">
                  <div
                    :class="`w-[20px] h-[20px] ${
                      item.status === 'เปิดใช้งาน'
                        ? 'bg-[#12B76A]'
                        : 'bg-[#BA1A1A]'
                    } rounded-full`"
                  ></div>
                  {{ item.status }}
                </div>
              </td>
              <td>
                <v-btn icon="mdi-play" @click="fn_navDetail(item)" flat></v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>

        <div v-else class="h-[260px] flex justify-center items-center">
          <p>ยังไม่มีรายการ</p>
        </div>
      </v-card>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>

    <div>
      <div class="flex flex-wrap gap-[15px] items-center">
        <div class="flex relative">
          <img src="/images/starbuck-logo.png" class="w-[100px]" alt="" />
          <v-btn
            class="ma-2 !w-[32px] !h-[32px] !absolute !-bottom-[5px] !-right-[10px]"
            color="#084F93"
            icon="mdi-check"
          ></v-btn>
        </div>
        <div>
          <p class="text-[20px] font-bold">Starbuck</p>
          <div class="border border-[#EEEDF1] !h-[55px] rounded-[8px] p-[8px]">
            <v-tabs v-model="tab" align-tabs="center">
              <v-tab value="option-1" @click="fn_changeNav('')">ข้อมูลธุรกิจ</v-tab>
              <v-tab value="option-2" @click="fn_changeNav('รายงานภาพรวม')">รายงานภาพรวม</v-tab>
              <v-tab value="option-3" @click="fn_changeNav('แพ็คเกจ')">แพ็คเกจ</v-tab>
              <v-tab value="option-4" @click="fn_changeNav('กระเป๋าเงิน')">กระเป๋าเงิน</v-tab>
              <v-tab value="option-5" @click="fn_changeNav('เงิน COD')">เงิน COD</v-tab>
              <v-tab value="option-6" @click="fn_changeNav('ผู้ใช้งานธุรกิจ')">ผู้ใช้งานธุรกิจ</v-tab>
            </v-tabs>
          </div>
        </div>
      </div>
      <v-window v-model="tab">
        <v-window-item value="option-1">
          <v-card flat>
            <v-card-text>
              <p>
                Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi
                ac felis. Etiam feugiat lorem non metus. Sed a libero.
              </p>

              <p>
                Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel,
                lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis
                non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non
                nisl sit amet velit hendrerit rutrum.
              </p>

              <p class="mb-0">
                Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu.
                Pellentesque libero tortor, tincidunt et, tincidunt eget, semper
                nec, quam. Phasellus blandit leo ut odio.
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="option-2">
          <v-card flat>
            <v-card-text>
              <p>
                Morbi nec metus. Suspendisse faucibus, nunc et pellentesque
                egestas, lacus ante convallis tellus, vitae iaculis lacus elit
                id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum
                aliquam libero, non adipiscing dolor urna a orci. Curabitur
                ligula sapien, tincidunt non, euismod vitae, posuere imperdiet,
                leo. Nunc sed turpis.
              </p>

              <p>
                Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque
                egestas, lacus ante convallis tellus, vitae iaculis lacus elit
                id tortor. Proin viverra, ligula sit amet ultrices semper,
                ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In
                hac habitasse platea dictumst. Fusce ac felis sit amet ligula
                pharetra condimentum.
              </p>

              <p>
                Sed consequat, leo eget bibendum sodales, augue velit cursus
                nunc, quis gravida magna mi a libero. Nam commodo suscipit quam.
                In consectetuer turpis ut velit. Sed cursus turpis vitae tortor.
                Aliquam eu nunc.
              </p>

              <p>
                Etiam ut purus mattis mauris sodales aliquam. Ut varius
                tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce
                fermentum odio nec arcu.
              </p>

              <p class="mb-0">
                Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In
                dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed,
                iaculis a, condimentum nec, nisi.
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="option-3">
          <v-card flat>
            <v-card-text>
              <p>
                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis.
                Nam eget dui. Proin viverra, ligula sit amet ultrices semper,
                ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In
                dui magna, posuere eget, vestibulum et, tempor auctor, justo.
              </p>

              <p class="mb-0">
                Cras sagittis. Phasellus nec sem in justo pellentesque
                facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut,
                mi. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nam at tortor in tellus interdum sagittis.
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted } from "vue";
let page = ref(1);
let itemsPerPage = 10;
let itemPerPageSelect = ref(10);
let search = ref("");

let navbar = ref("Business info,Business account");

let rest = ref("");
let detailData = ref([]);

let tab = ref(null);

const headers = [
  {
    title: "รูป",
    align: "start",
    key: "logo",
  },
  {
    title: "รหัสธุรกิจ",
    align: "start",
    key: "bizId",
  },
  {
    title: "ชื่อธุรกิจ",
    align: "center",
    key: "bizname",
  },
  {
    title: "เบอร์โทรติดต่อ",
    align: "center",
    key: "phone",
  },
  {
    title: "ที่อยู่",
    align: "center",
    key: "address",
  },
  {
    title: "ประเภทเครกิต",
    align: "center",
    key: "credit",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: " ",
    align: "center",
    key: "href",
  },
];

let items = [
  {
    logo: "pizza-logo.png",
    bizId: "SX-0001",
    bizName: "Starbuck",
    phone: "078-837-8838",
    address: "173 ถนนดินสอ แขวงเสาชิงช้า เขตพระนคร กรุ",
    credit: "Postpaid",
    status: "เปิดใช้งาน",
    href: "",
  },
];

const filterOnlyCapsText = (value, query, item) => {
  return (
    value != null &&
    query != null &&
    typeof value === "string" &&
    value.toString().indexOf(query) !== -1
  );
};

const pageCount = computed(() => {
  return Math.ceil(items.length / itemsPerPage);
});

const fn_navDetail = (item) => {
  detailData.value = item;
  navbar.value = "Business info,Users account," + item.bizName + "";
};

const fn_changeNav = (text) => {
    console.log(navbar.value)
}
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
</style>
