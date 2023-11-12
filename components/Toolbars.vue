<template>
  <button
    data-drawer-target="default-sidebar"
    data-drawer-toggle="default-sidebar"
    aria-controls="default-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidenav"
  >
    <div
      class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex justify-center mb-[15px]">
        <img
          src="/images/SALESX_TECHNOLOGIES_LOGO_FINAL_PRIMARY_VERSION-01.png"
          class="max-w-[100px]"
          alt=""
        />
      </div>
      <ul class="space-y-2">
        <div v-for="(item, index) in menu_list" :key="index">
          <li class="h-[48px]" v-if="item.haveSubMenu === false">
            <NuxtLink
              :to="item.path"
              class="flex items-center p-2 text-base font-normal text-[#43474E] rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <v-icon :icon="item.icon" class="text-[#43474E] w-6 h-6"></v-icon>
              <span class="ml-3 text-[#43474E]">{{ item.title }}</span>
            </NuxtLink>
          </li>
          <li class="min-h-[48px]" v-else>
            <button
              @click="showSubmenu(index)"
              type="button"
              class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-pages"
              data-collapse-toggle="dropdown-pages"
            >
              <v-icon :icon="item.icon" class="w-6 h-6 text-[#43474E]"></v-icon>
              <span class="flex-1 ml-3 text-[#43474E] text-left whitespace-nowrap">{{
                item.title
              }}</span>
              <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <ul
              :id="`dropdown-${index}`"
              :class="
                submenu === index ? 'py-2 space-y-2' : 'hidden py-2 space-y-2'
              "
            >
              <li v-for="(itemSub, indexSub) in item.subMenu" :key="indexSub">
                <NuxtLink
                  :to="itemSub.path"
                  class="flex items-center p-2 pl-11 w-full text-base font-normal text-[#43474E] rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >{{ itemSub.subtitle }}</NuxtLink
                >
              </li>
            </ul>
          </li>
        </div>
        <!-- <div v-else>
            <button
              @click="showSubmenu(index)"
              type="button"
              class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-pages"
              data-collapse-toggle="dropdown-pages"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 text-left whitespace-nowrap">{{
                item.title
              }}</span>
              <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <ul
              :id="`dropdown-${index}`"
              :class="
                submenu === index ? 'py-2 space-y-2' : 'hidden py-2 space-y-2'
              "
            >
              <li v-for="(itemSub, indexSub) in item.subMenu" :key="indexSub">
                <NuxtLink
                  :to="itemSub.path"
                  class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >{{ itemSub.subtitle }}</NuxtLink
                >
              </li>
            </ul>
          </div> -->
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, mergeProps } from "vue";

let drawer = ref(true);
let submenu = ref(null);

const showSubmenu = (item) => {
  submenu.value = submenu.value === item ? null : item;
};

const menu_list = [
  {
    title: "ภาพรวม",
    haveSubMenu: false,
    subMenu: [],
    icon: "mdi-chart-box-outline",
    path: "/",
  },
  {
    title: "จัดการธุรกิจ",
    openExpand: false,
    haveSubMenu: true,
    subMenu: [
      {
        subtitle: "บัญชีผู้ใช้งาน",
        path: "/",
        disable: false,
      },
      {
        subtitle: "บัญชีธุรกิจ",
        path: "/",
        disable: false,
      },
      {
        subtitle: "ยืนยันตัวตน",
        path: "/",
        disable: false,
      },
      {
        subtitle: "สนับสนุนการขาย",
        path: "/",
        disable: false,
      },
    ],
    icon: "mdi-store",
    disable: false,
  },
  {
    title: "ข้อมูลคำสั่งซื้อ",
    haveSubMenu: false,
    subMenu: [],
    icon: "mdi-package-up",
    path: "/",
  },
  {
    title: "การเงิน",
    openExpand: false,
    haveSubMenu: true,
    subMenu: [
      {
        subtitle: "กระเป๋าเงิน",
        path: "/",
        disable: false,
      },
      {
        subtitle: "ประวัติการจัดส่ง",
        path: "/",
        disable: false,
      },
      {
        subtitle: "บิลจัดส่ง",
        path: "/",
        disable: false,
      },
      {
        subtitle: "การสมัครแพ็คเกจ",
        path: "/",
        disable: false,
      },
      {
        subtitle: "กระทบยอด COD",
        path: "/",
        disable: false,
      },
    ],
    icon: "mdi-file-chart-check-outline",
    disable: false,
  },
  {
    title: "แพลตฟอร์ม",
    openExpand: false,
    haveSubMenu: true,
    subMenu: [
      {
        subtitle: "ประเภทสินค้า",
        path: "/",
        disable: false,
      },
      {
        subtitle: "ประเภทย่อยสินค้า",
        path: "/",
        disable: false,
      },
      {
        subtitle: "บทบาทผู้ใช้",
        path: "/",
        disable: false,
      },
    ],
    icon: "mdi-layers-triple-outline",
    disable: false,
  },
  {
    title: "สนับสนุนลูกค้า",
    openExpand: false,
    haveSubMenu: true,
    subMenu: [],
    icon: "mdi-comment-text-multiple-outline",
    disable: false,
  },
  {
    title: "บทความ",
    haveSubMenu: false,
    subMenu: [],
    icon: "mdi-newspaper-variant-multiple",
    path: "/",
  },
  {
    title: "แพ็คเกจสมาชิก",
    haveSubMenu: false,
    subMenu: [],
    icon: "mdi-license",
    path: "/",
  },
  {
    title: "จัดการขนส่ง",
    openExpand: false,
    haveSubMenu: true,
    subMenu: [
      {
        subtitle: "ประเภทสินค้า",
        path: "/",
        disable: false,
      },
      {
        subtitle: "ประเภทย่อยสินค้า",
        path: "/",
        disable: false,
      },
      {
        subtitle: "บทบาทผู้ใช้",
        path: "/",
        disable: false,
      },
    ],
    icon: "mdi-truck",
    disable: false,
  },
  {
    title: "ตั้งค่า",
    openExpand: false,
    haveSubMenu: true,
    subMenu: [
      {
        subtitle: "ประเภทสินค้า",
        path: "/",
        disable: false,
      },
      {
        subtitle: "ประเภทย่อยสินค้า",
        path: "/",
        disable: false,
      },
      {
        subtitle: "บทบาทผู้ใช้",
        path: "/",
        disable: false,
      },
    ],
    icon: "mdi-cog-outline",
    disable: false,
  },
];
</script>

<style></style>
