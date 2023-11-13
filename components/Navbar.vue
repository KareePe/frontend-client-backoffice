<template>
  <div class="flex justify-between p-4 sm:ml-64 pt-[15px] items-center">
    <h1 class="text-[16px] font-bold text-[#084F93]" v-if="bread.length <= 1">
      <span v-for="(item, index) in bread" :key="index">{{ item }}</span>
    </h1>

    <div class="flex" v-else>
      <nav
        class="flex"
        aria-label="Breadcrumb"
        v-for="(item, index) in bread"
        :key="index"
      >
        <ol
          class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
        >
          <li class="inline-flex items-center">
            <a
              href="/"
              :class="`inline-flex items-center text-[16px] ${
                index === bread.length - 1 ? 'font-bold text-[#084F93]' : 'text-[#C4C6CF]'
              }`"
            >
              {{ item }}
            </a>
          </li>
          <span class="mx-2 text-gray-400" v-if="index !== bread.length - 1">/</span>
        </ol>
      </nav>
    </div>

    <div>
      <div class="flex items-center ms-3">
        <div class="flex ml-[15px]">
          <v-btn
            density="compact"
            class="!w-[24px] h-[24px]"
            prepend-icon="mdi-comment"
            flat
          >
            <template v-slot:prepend>
              <v-icon color="#DAD9DD"></v-icon>
            </template>
          </v-btn>
          <v-btn
            density="compact"
            class="!w-[24px] h-[24px]"
            prepend-icon="mdi-bell"
            flat
          >
            <template v-slot:prepend>
              <v-icon color="#084F93"></v-icon>
            </template>
          </v-btn>
        </div>
        <div>
          <button
            type="button"
            class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
            />
          </button>
        </div>
        <div class="flex">
          <div
            class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown-user"
          >
            <div class="px-4 py-3" role="none">
              <p class="text-sm text-gray-900 dark:text-white" role="none">
                Neil Sims
              </p>
              <p
                class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                role="none"
              >
                neil.sims@flowbite.com
              </p>
            </div>
            <ul class="py-1" role="none">
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  >Dashboard</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  >Settings</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  >Earnings</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  >Sign out</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  text: String,
});

let bread = ref([]);

onMounted(() => {
  let resultArray = props.text.split(",");
  bread.value = resultArray;

  console.log(bread.value);
});
</script>

<style></style>
