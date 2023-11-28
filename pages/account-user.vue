<template>
  <Toolbars />
  <Navbar text="จัดการลูกค้า,บัญชีผู้ใช้งาน" v-if="detailData.length <= 0" />
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
              <td class="text-center">
                {{ item.business_number }}
              </td>
              <td>
                {{ item.date_current }}
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
    </div>

    <div v-else>
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

      <div class="border border-[#EEEDF1] rounded-[8px] mb-[15px]">
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
              <td class="text-center">{{ item.bizname2 }}</td>
              <td class="text-center">{{ item.bizname3 }}</td>
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
            </tr>
          </template>
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
let itemPerPageSelect = ref(10);
let search = ref("");

let navbar = ref("จัดการลูกค้า,บัญชีผู้ใช้งาน");

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
    title: "จำนวนธุรกิจที่เกี่ยวข้อง",
    align: "center",
    key: "business_number",
  },
  {
    title: "เข้าใช้งานล่าสุด",
    align: "center",
    key: "date_current",
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
    business_number: "2",
    date_current: "22/11/2566 (18.32)",
    href: "",
  },
  {
    id: "988786866",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    email: "test@email.com",
    phone: "087-783-7482",
    business_number: "1",
    date_current: "22/11/2566 (18.32)",
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
    title: "ธุรกิจ",
    align: "center",
    key: "bizname2",
  },
  {
    title: "ธุรกิจ",
    align: "center",
    key: "bizname3",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];
let itemsBiz = [
  {
    logo: "mc-logo.png",
    bizname: "mc donald",
    bizname2: "mc donald",
    bizname3: "mc donald",
    status: "เปิดใช้งาน",
  },
  {
    logo: "pizza-logo.png",
    bizname: "Pizza company",
    bizname2: "Pizza company",
    bizname3: "Pizza company",
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
