<template>
  <Toolbars />
  <Navbar
    text="จัดการลูกค้า,บัญชีผู้ใช้งาน,นายทดสอบ นามสกุลไม่ยาว"
    v-if="detailData.length <= 0"
  />
  <Navbar :text="navbar" v-else />

  <div class="p-4 sm:ml-64">
    <div>
      <b class="text-[#000] text-[18px]">ข้อมูลทั่วไป</b>
      <div
        class="border border-[#EEEDF1] rounded-[8px] p-[15px] mb-[12px] mt-[12px]"
      >
        <div>
          <div class="flex flex-row">
            <p class="text-[14px] text-black/87 font-normal w-[100px]">
              ชื่อ-นามสกุล
            </p>
            <span class="mx-[30px]">:</span>
            <p class="text-[14px] text-black/60 font-normal">
              ปองพล วิเชียรวิทย์
            </p>
          </div>

          <div class="flex flex-row">
            <p class="text-[14px] text-black/87 font-normal w-[100px]">
              เบอร์โทรติดต่อ
            </p>
            <span class="mx-[30px]">:</span>
            <p class="text-[14px] text-black/60 font-normal">088-573-8576</p>
          </div>
          <div class="flex flex-row">
            <p class="text-[14px] text-black/87 font-normal w-[100px]">
              ที่อยู่
            </p>
            <span class="mx-[30px]">:</span>
            <p class="text-[14px] text-black/60 font-normal">
              13/271 ต.ยาวานา อ.เมือง จ.กรุงเทพ 10160
            </p>
          </div>
        </div>
      </div>

      <b class="text-[#000] text-[18px]">รายการธุรกิจที่เกี่ยวข้อง</b>

      <div class="border border-[#EEEDF1] rounded-[8px] mb-[15px] mt-[12px]">
        <v-data-table
          :headers="headers"
          :items="items"
          no-data-text="ไม่มีข้อมูล"
          hide-default-footer
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
              <td class="text-center text-[14px]">{{ item.bizname }}</td>
              <td class="text-table">
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <div
                    :class="`w-[16px] h-[16px] ${
                      item.status === 'เปิดใช้งาน'
                        ? 'bg-[#12B76A]'
                        : 'bg-[#BA1A1A]'
                    } rounded-full`"
                  ></div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      margin-left: 12px;
                    "
                  >
                    <div class="flex gap-[15px] text-[14px]">
                      {{ item.status }}
                    </div>
                    <div class="text-[12px] opacity-[0.6]">
                      {{ item.bizname2 }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-table">
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <div
                    :class="`w-[16px] h-[16px] ${
                      item.status === 'เปิดใช้งาน'
                        ? 'bg-[#12B76A]'
                        : 'bg-[#BA1A1A]'
                    } rounded-full`"
                  ></div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      margin-left: 12px;
                    "
                  >
                    <div class="flex gap-[15px] text-[14px]">
                      {{ item.status }}
                    </div>
                    <div class="text-[12px] opacity-[0.6]">
                      {{ item.bizname3 }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-center">
                <div class="flex gap-[15px] justify-center">
                  <div
                    :class="`w-[16px] h-[16px] ${
                      item.status === 'เปิดใช้งาน'
                        ? 'bg-[#12B76A]'
                        : 'bg-[#BA1A1A]'
                    } rounded-full`"
                  ></div>
                  <div class="text-[14px]">
                    {{ item.status }}
                  </div>
                </div>
              </td>
            </tr>
          </template>
          <template v-slot:bottom></template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, computed } from "vue";
let page = ref(1);
let itemsPerPage = 10;
let search = ref("");

let navbar = ref("จัดการลูกค้า,บัญชีผู้ใช้งาน");

let rest = ref("");
let detailData = ref([]);

const headers = [
  {
    title: "",
    align: "center",
    key: "logo",
  },
  {
    title: "ธุรกิจ",
    align: "center",
    key: "bizname",
  },
  {
    title: "บัญชีชำระเงินที่ผูกกับเเพ็คเกจสมาชิก",
    align: "center",
    key: "bizname2",
  },
  {
    title: "บัญชีชำระเงินที่ผูกกับบริการขนส่ง",
    align: "center",
    key: "bizname3",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];
let items = [
  {
    logo: "mc-logo.png",
    bizname: "mc donald",
    bizname2: "6886-0191-7267-3418",
    bizname3: "6886-0191-7267-3418",
    status: "เปิดใช้งาน",
  },
  {
    logo: "pizza-logo.png",
    bizname: "Pizza company",
    bizname2: "6886-0191-7267-3418",
    bizname3: "6886-0191-7267-3418",
    status: "เปิดใช้งาน",
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

const fn_detailUser = (item) => {
  detailData.value = item;
  rest.value = detailData.value.length;
  navbar.value = "จัดการลูกค้า,บัญชีผู้ใช้งาน," + item.name + "";

  console.log(navbar.value);
};

const fn_clearNav = () => {
  detailData.value = [];
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
</style>
