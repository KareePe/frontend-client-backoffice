<template>
  <Toolbars />
  <Navbar text="Business info,Users account" v-if="detailData.length <= 0" />
  <Navbar :text="navbar" v-else />

  <div class="p-4 sm:ml-64">
    <div v-if="detailData.length <= 0">
      <v-text-field
        v-model="search"
        variant="outlined"
        label="ค้นหาบัญชีผู้ใช้ เบอร์โทร"
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
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>
                <div class="flex flex-wrap my-[10px]">
                  <div
                    v-for="(itemBiz, indexBiz) in item.business"
                    :key="indexBiz"
                    class="-ml-[15px]"
                  >
                    <img
                      :src="`/images/${itemBiz.bizImg}`"
                      class="w-[40px] h-[40px]"
                      alt=""
                    />
                  </div>
                  <div>
                    <v-btn
                      icon="mdi-plus"
                      density="compact"
                      color="#EEEDF1"
                      class="!w-[40px] !h-[40px]"
                      flat
                    ></v-btn>
                  </div>
                </div>
              </td>
              <td>
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
                <v-btn
                  icon="mdi-play"
                  flat
                  @click="fn_detailUser(item)"
                ></v-btn>
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
      <!-- <v-text-field
      :model-value="itemsPerPage"
      class="pa-2"
      hide-details
      label="Items per page"
      min="-1"
      max="15"
      type="number"
      @update:model-value="itemsPerPage = parseInt($event, 10)"
    ></v-text-field> -->
    </div>

    <div v-else>
      <div class="flex justify-end w-full">
        <v-btn
          color="#084F93"
          prepend-icon="mdi-arrow-left"
          flat
          class="rounded-[8px] !min-w-[230px] !min-h-[48px] mb-[15px]"
          @click="fn_clearNav"
          >กลับ</v-btn
        >
      </div>
      <div class="border border-[#EEEDF1] rounded-[8px] p-[15px] mb-[15px]">
        <b class="text-[#000] text-[14px]">ข้อมูลทั่วไป</b>
        <div class="mt-[10px]">
          <p class="text-[14px] mb-[5px]">
            ชื่อ-นามสกุล: <span class="text-slate-700">ปองพล วิเชียรวิทย์</span>
          </p>
          <p class="text-[14px] mb-[5px]">
            เบอร์โทรติดต่อ : <span class="text-slate-700">088-573-8576</span>
          </p>
          <p class="text-[14px] mb-[5px]">
            ที่อยู่ :
            <span class="text-slate-700"
              >13/271 ต.ยาวานา อ.เมือง จ.กรุงเทพ 10160</span
            >
          </p>
        </div>
      </div>
      <div class="border border-[#EEEDF1] rounded-[8px] p-[15px] mb-[15px]">
        <b class="text-[#000] text-[14px]">ธุรกิจ</b>
        <v-card
          variant="flat"
          class="border border-[#EEEDF1] rounded-[8px] my-[15px] p-[15px]"
        >
          <v-data-table
            :headers="headersBiz"
            :items="itemsBiz"
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
                <td class="text-center">{{ item.bizname }}</td>
                <td class="text-center">
                  <div class="flex gap-[15px] justify-center">
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
                  <v-btn
                    icon="mdi-play"
                    flat
                    @click="fn_detailUser(item)"
                  ></v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
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
let itemPerPageSelect = ref(10);
let search = ref("");

let navbar = ref("Business info,Users account");

let rest = ref("");
let detailData = ref([]);

const headers = [
  {
    title: "User ID",
    align: "start",
    key: "id",
  },
  {
    title: "ชื่อ-นามสกุล",
    align: "center",
    key: "name",
  },
  {
    title: "อีเมล",
    align: "center",
    key: "email",
  },
  {
    title: "เบอร์โทร",
    align: "center",
    key: "phone",
  },
  {
    title: "ธุรกิจ",
    align: "center",
    key: "business",
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
    id: "767885874",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    email: "test@email.com",
    phone: "087-783-7482",
    business: [
      { biz: "mc donald", bizImg: "mc-logo.png" },
      { biz: "starbucks", bizImg: "starbuck-logo.png" },
      { biz: "burger king", bizImg: "burger-logo.png" },
      { biz: "pizza company", bizImg: "pizza-logo.png" },
    ],
    status: "เปิดใช้งาน",
    href: "",
  },
  {
    id: "988786866",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    email: "test@email.com",
    phone: "087-783-7482",
    business: [
      { biz: "mc donald", bizImg: "mc-logo.png" },
      { biz: "starbucks", bizImg: "starbuck-logo.png" },
      { biz: "burger king", bizImg: "burger-logo.png" },
      { biz: "pizza company", bizImg: "pizza-logo.png" },
    ],
    status: "ระงับการใช้งาน",
    href: "",
  },
];

const headersBiz = [
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
let itemsBiz = [
  {
    logo: "mc-logo.png",
    bizname: "mc donald",
    status: "เปิดใช้งาน",
    href: "",
  },
  {
    logo: "pizza-logo.png",
    bizname: "Pizza company",
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
  //   console.log(items.length);
  //   console.log(itemsPerPage);
  //   const result = Math.ceil(items.length / 5);
  //   return result;
  return Math.ceil(items.length / itemsPerPage);
});

const fn_detailUser = (item) => {
  detailData.value = item;
  rest.value = detailData.value.length;
  //   console.log(detailData.value);
  navbar.value = "Business info,Users account," + item.name + "";

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
