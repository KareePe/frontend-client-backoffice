<template>
  <Toolbars />
  <Navbar text="Business info,Business account" v-if="detailData.length <= 0" />
  <Navbar :text="navbar" v-else />
  <!-- <Navbar :text="navbar" v-if="viewProduct === true" /> -->
  <div class="p-4 md:ml-64">
    <div v-if="detailData.length <= 0">
      <v-text-field
        v-model="search"
        variant="outlined"
        label="ค้นหาธุรกิจ"
        prepend-inner-icon="mdi-magnify"
        class="!max-w-[480px] min-h-[56px] !rounded-[8px] mb-[15px]"
        single-line
        hide-details
        @click:prepend-inner="onClick"
      ></v-text-field>
      <v-card variant="flat" class="border border-[#EEEDF1] !!rounded-[8px]">
        <div class="bg-[#E9E7EB] p-[20px] border-b border-[#E9E7EB]">
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
          class="mb-[15px] !!rounded-[0]"
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
              <td class="truncate">{{ item.bizId }}</td>
              <td class="truncate">{{ item.bizName }}</td>
              <td class="truncate">{{ item.phone }}</td>
              <td class="truncate">{{ item.address }}</td>
              <td class="truncate">{{ item.credit }}</td>
              <td class="truncate">
                <div class="flex gap-[15px]">
                  <div
                    :class="`w-[20px] h-[20px] ${
                      item.status === 'เปิดใช้งาน'
                        ? 'bg-[#12B76A]'
                        : 'bg-[#BA1A1A]'
                    } !rounded-full`"
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

    <div v-else>
      <div
        :class="
          viewProduct === true
            ? 'hidden'
            : viewWareHouse === true
            ? 'hidden'
            : ''
        "
      >
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
            <div
              class="border border-[#EEEDF1] !h-[55px] !rounded-[8px] p-[8px]"
            >
              <v-tabs v-model="tab" align-tabs="center">
                <v-tab value="option-1" @click="fn_changeNav('')"
                  >ข้อมูลธุรกิจ</v-tab
                >
                <v-tab value="option-2" @click="fn_changeNav('รายงานภาพรวม')"
                  >รายงานภาพรวม</v-tab
                >
                <v-tab value="option-3" @click="fn_changeNav('แพ็คเกจ')"
                  >แพ็คเกจ</v-tab
                >
                <v-tab value="option-4" @click="fn_changeNav('กระเป๋าเงิน')"
                  >กระเป๋าเงิน</v-tab
                >
                <v-tab value="option-5" @click="fn_changeNav('เงิน COD')"
                  >เงิน COD</v-tab
                >
                <v-tab value="option-6" @click="fn_changeNav('ผู้ใช้งานธุรกิจ')"
                  >ผู้ใช้งานธุรกิจ</v-tab
                >
              </v-tabs>
            </div>
          </div>
        </div>
        <v-window v-model="tab" class="mt-[15px]">
          <v-window-item value="option-1">
            <div
              class="border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
            >
              <b class="text-[#000] text-[14px]">ข้อมูลทั่วไป</b>
              <div class="mt-[10px]">
                <p class="text-[14px] mb-[5px]">
                  ชื่อ-นามสกุล
                  <span class="mx-[30px]">:</span
                  ><span class="text-slate-700">ปองพล วิเชียรวิทย์</span>
                </p>
                <p class="text-[14px] mb-[5px]">
                  เบอร์โทรติดต่อ <span class="mx-[30px]">:</span>
                  <span class="text-slate-700">088-573-8576</span>
                </p>
                <p class="text-[14px] mb-[5px]">
                  ที่อยู่ <span class="mx-[30px]">:</span>
                  <span class="text-slate-700"
                    >13/271 ต.ยาวานา อ.เมือง จ.กรุงเทพ 10160</span
                  >
                </p>
              </div>
            </div>

            <div class="flex lg:flex-wrap flex-nowrap gap-[15px]">
              <div
                @click="fn_findDetail('product')"
                class="cursor-pointer hover:bg-slate-100 transition-all duration-300 basis-full lg:basis-4/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[40px]">
                  <v-icon icon="mdi-package" color="#F79009"></v-icon>
                  <p class="text-[22px] font-bold">สินค้า</p>
                </div>
                <p class="text-[20px] text-right">11,203 รายการ</p>
              </div>
              <div
                class="basis-full lg:basis-4/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[40px]">
                  <v-icon icon="mdi-sitemap" color="#0BA5EC"></v-icon>
                  <p class="text-[22px] font-bold">SKU</p>
                </div>
                <p class="text-[20px] text-right">255 SKU</p>
              </div>
              <div
                @click="fn_findDetail('warehouse')"
                class="cursor-pointer hover:bg-slate-100 transition-all duration-300 basis-full lg:basis-4/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[40px]">
                  <v-icon icon="mdi-warehouse" color="#12B76A"></v-icon>
                  <p class="text-[22px] font-bold">คลังสินค้า</p>
                </div>
                <p class="text-[20px] text-right">15 คลัง</p>
              </div>
            </div>
          </v-window-item>
          <v-window-item value="option-2">
            <div class="lg:flex block lg:flex-wrap flex-nowrap gap-[15px]">
              <div
                class="hover:bg-slate-100 transition-all duration-300 basis-full lg:basis-6/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[40px]">
                  <v-icon icon="mdi-file-document" color="#084F93"></v-icon>
                  <p class="text-[22px] font-bold">สรุปคำสั่งซื้อ</p>
                </div>
                <div
                  class="flex lg:flex-wrap flex-nowrap gap-[15px] justify-evenly"
                >
                  <div class="text-center">
                    <p class="text-[20px]">0 รายการ</p>
                    <p class="text-[#000000]/[0.6]">วันนี้</p>
                  </div>
                  <div class="w-[1px] h-[50px] bg-[#EEEDF1]"></div>
                  <div class="text-center">
                    <p class="text-[20px]">3 รายการ</p>
                    <p class="text-[#000000]/[0.6]">สัปดาห์นี้</p>
                  </div>
                  <div class="w-[1px] h-[50px] bg-[#EEEDF1]"></div>
                  <div class="text-center">
                    <p class="text-[20px]">100 รายการ</p>
                    <p class="text-[#000000]/[0.6]">เดือนนี้</p>
                  </div>
                </div>
              </div>
              <div
                class="hover:bg-slate-100 transition-all duration-300 basis-full lg:basis-6/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[40px]">
                  <v-icon icon="mdi-database" color="#084F93"></v-icon>
                  <p class="text-[22px] font-bold">สรุปยอดขาย</p>
                </div>
                <div
                  class="flex lg:flex-wrap flex-nowrap gap-[15px] justify-evenly"
                >
                  <div class="text-center">
                    <p class="text-[20px]">0.00 ฿</p>
                    <p class="text-[#000000]/[0.6]">วันนี้</p>
                  </div>
                  <div class="w-[1px] h-[50px] bg-[#EEEDF1]"></div>
                  <div class="text-center">
                    <p class="text-[20px]">10,063.00 ฿</p>
                    <p class="text-[#000000]/[0.6]">สัปดาห์นี้</p>
                  </div>
                  <div class="w-[1px] h-[50px] bg-[#EEEDF1]"></div>
                  <div class="text-center">
                    <p class="text-[20px]">10,064.00 ฿</p>
                    <p class="text-[#000000]/[0.6]">เดือนนี้</p>
                  </div>
                </div>
              </div>
            </div>

            <v-card
              variant="flat"
              class="border border-[#EEEDF1] !rounded-[8px] my-[15px] !p-[15px]"
            >
              <div class="flex gap-[10px] items-center mb-[40px]">
                <v-icon icon="mdi-truck" color="#084F93"></v-icon>
                <p class="text-[22px] font-bold">ค่าบริการขนส่ง</p>
              </div>
              <v-data-table
                v-if="itemsPrd.length > 0"
                :headers="headerLogistic"
                :items="itemsLogistic"
                no-data-text="ไม่มีข้อมูล"
                hide-default-footer
                class="mb-[15px] border"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>
                      {{ item.billId }}
                    </td>
                    <td class="text-center">{{ item.vendor }}</td>
                    <td class="text-center">{{ item.amount }}</td>
                    <td class="text-center">{{ item.status }}</td>
                    <td class="text-center">
                      <div class="flex gap-[15px] justify-center">
                        <v-btn flat @click="fn_genPDF" :loading="loading">
                          <v-icon
                            icon="mdi-eye-outline"
                            color="#1A1C1E"
                          ></v-icon>
                        </v-btn>
                        <v-btn flat @click="downloadPdf" :loading="loading">
                          <v-icon
                            icon="mdi-tray-arrow-down"
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
            </v-card>

            <v-card
              variant="flat"
              class="border border-[#EEEDF1] !rounded-[8px] my-[15px] !p-[15px]"
            >
              <div class="flex gap-[10px] items-center mb-[40px]">
                <v-icon icon="mdi-cash" color="#084F93"></v-icon>
                <p class="text-[22px] font-bold">COD</p>
              </div>
              <v-data-table
                v-if="itemsPrd.length > 0"
                :headers="headerCod"
                :items="itemsCod"
                no-data-text="ไม่มีข้อมูล"
                hide-default-footer
                class="mb-[15px] border"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="text-center">{{ item.codId }}</td>
                    <td class="text-center">{{ item.amount }}</td>
                    <td class="text-center">{{ item.payloop }}</td>
                    <td class="text-center truncate">
                      <div class="flex gap-[15px] justify-center">
                        <div
                          :class="`w-[20px] h-[20px] ${
                            item.status === 'สำเร็จ'
                              ? 'bg-[#12B76A]'
                              : 'bg-[#F79009]'
                          } !rounded-full`"
                        ></div>
                        {{ item.status }}
                      </div>
                    </td>
                    <td class="text-center">
                      <div class="flex gap-[15px] justify-center">
                        <v-btn flat>
                          <v-icon
                            icon="mdi-eye-outline"
                            color="#1A1C1E"
                          ></v-icon>
                        </v-btn>
                        <v-btn flat>
                          <v-icon
                            icon="mdi-tray-arrow-down"
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
            </v-card>
          </v-window-item>
          <v-window-item value="option-3">
            <b class="text-[14px]">แพ็คเกจ</b>

            <div class="flex gap-[15px]">
              <div
                class="flex gap-[15px] p-[15px] items-center !rounded-[8px] min-w-[159px] h-[52px] bg-gradient-to-r from-[#084F93] to-[#00AA84]"
              >
                <img
                  src="/images/SALESX_TECHNOLOGIES_LOGO_FINAL_ICONIC_VERSION-05.png"
                  class="w-[26px]"
                  alt=""
                />
                <b class="text-white text-[20px] font-bold">Standard</b>
              </div>
              <div class="flex gap-[15px] h-[52px] items-center">
                <p class="text-[14px] text-[#000]/[0.6]">
                  สถานะ:<span class="text-[#12B76A] ml-[15px]">กำลังใช้งาน</span
                  ><span class="text-[12px] ml-[15px]"
                    >(14 ธันวาคม 2565 - 13 ธันวาคม 2565)</span
                  >
                </p>
              </div>
            </div>

            <v-card
              variant="flat"
              class="border border-[#EEEDF1] !rounded-[8px] my-[15px] p-[15px]"
            >
              <v-data-table
                v-if="itemsPackage.length > 0"
                v-model:page="pagePackage"
                :headers="headerPackage"
                :items="itemsPackage"
                :items-per-page="itemsPerPagePackage"
                no-data-text="ไม่มีข้อมูล"
                hide-default-footer
                class="mb-[15px]"
              >
                <template v-slot:item="{ item }">
                  <tr class="py-[10px]">
                    <td class="text-center text-[#0BA5EC]">{{ item.date }}</td>
                    <td class="text-center">{{ item.invoice }}</td>
                    <td class="text-center font-bold">{{ item.desc }}</td>
                    <td class="text-center">{{ item.payment }}</td>
                    <td class="text-left">
                      {{ item.amout }} บาท
                      <p class="text-[#000]/[0.6]">
                        (VAT {{ parseFloat(item.amout * 0.07).toFixed(2) }} บาท)
                      </p>
                    </td>
                    <td class="text-center py-[10px]">
                      <v-btn flat>
                        <v-icon icon="mdi-eye-outline"></v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>

              <div v-else class="h-[260px] flex justify-center items-center">
                <p>ยังไม่มีรายการ</p>
              </div>
            </v-card>
            <div class="text-center pt-2">
              <v-pagination
                v-model="pagePackage"
                :length="pageCountPackage"
              ></v-pagination>
            </div>
          </v-window-item>
          <v-window-item value="option-4">
            <div class="lg:flex block lg:flex-wrap flex-nowrap gap-[15px]">
              <div
                class="hover:bg-slate-100 transition-all duration-300 basis-full border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[25px]">
                  <v-icon icon="mdi-cash" color="#084F93"></v-icon>
                  <p class="text-[22px] font-bold">ยอดคงเหลือ</p>
                </div>
                <div
                  class="flex lg:flex-wrap flex-nowrap gap-[15px] justify-start"
                >
                  <div class="text-left">
                    <p class="text-[20px] font-bold">100,000.00 ฿</p>
                    <p class="text-[#000000]/[0.6] text-[14px]">
                      ยอดเงินที่ใช้ได้ 100,000.00 ฿
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="lg:flex block lg:flex-wrap flex-nowrap gap-[15px]">
              <div
                class="hover:bg-slate-100 transition-all duration-300 basis-full lg:basis-4/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[25px]">
                  <v-icon
                    icon="mdi-wallet-bifold-outline"
                    color="#084F93"
                  ></v-icon>
                  <p class="text-[22px] font-bold">กระเป๋าเงิน</p>
                </div>
                <div
                  class="flex lg:flex-wrap flex-nowrap gap-[15px] justify-start"
                >
                  <div class="text-left">
                    <p class="text-[20px] font-bold">100,000.00 ฿</p>
                    <p class="text-[#000000]/[0.6] text-[14px]">ยอดใช้งานได้</p>
                  </div>
                </div>
              </div>
              <div
                class="hover:bg-slate-100 transition-all duration-300 basis-full lg:basis-4/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[25px]">
                  <v-icon
                    icon="mdi-credit-card-outline"
                    color="#084F93"
                  ></v-icon>
                  <p class="text-[22px] font-bold">เครดิต</p>
                </div>
                <div
                  class="flex lg:flex-wrap flex-nowrap gap-[15px] justify-start"
                >
                  <div class="text-left">
                    <p class="text-[20px] font-bold">100,000.00 ฿</p>
                    <p class="text-[#000000]/[0.6] text-[14px]">
                      เครดิตที่ใช้งานได้
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="hover:bg-slate-100 transition-all duration-300 basis-full lg:basis-4/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[25px]">
                  <v-icon
                    icon="mdi-credit-card-multiple-outline"
                    color="#084F93"
                  ></v-icon>
                  <p class="text-[22px] font-bold">กันวงเงิน</p>
                </div>
                <div
                  class="flex lg:flex-wrap flex-nowrap gap-[15px] justify-start"
                >
                  <div class="text-left">
                    <p class="text-[20px] font-bold">1,000.00 ฿</p>
                    <p class="text-[#000000]/[0.6] text-[14px]">
                      กันยอดสำหรับค่า FIX COST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <v-card
              variant="flat"
              class="border border-[#EEEDF1] !rounded-[8px] !p-[15px]"
            >
              <ol
                class="relative border-s border-gray-200 dark:border-gray-700"
              >
                <li class="mb-10 ms-4">
                  <div
                    class="absolute w-3 h-3 bg-[#027A48] !rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
                  ></div>
                  <h3
                    class="text-lg font-semibold text-[#027A48] dark:text-white"
                  >
                    - 50,000.00 บาท
                  </h3>
                  <div class="flex gap-[10px] items-center mt-[10px]">
                    <time
                      class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                      >19 ต.ค. 2566 (11.23) -</time
                    >
                    <p
                      class="text-sm font-normal text-gray-500 dark:text-gray-400"
                    >
                      :
                    </p>
                    <p
                      class="text-sm font-normal text-gray-500 dark:text-gray-400"
                    >
                      Logistic #056741034
                    </p>
                  </div>
                </li>
                <li class="mb-10 ms-4">
                  <div
                    class="absolute w-3 h-3 bg-[#027A48] !rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
                  ></div>
                  <h3
                    class="text-lg font-semibold text-[#027A48] dark:text-white"
                  >
                    - 50,000.00 บาท
                  </h3>
                  <div class="flex gap-[10px] items-center mt-[10px]">
                    <time
                      class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                      >19 ต.ค. 2566 (11.23) -</time
                    >
                    <p
                      class="text-sm font-normal text-gray-500 dark:text-gray-400"
                    >
                      :
                    </p>
                    <p
                      class="text-sm font-normal text-gray-500 dark:text-gray-400"
                    >
                      Logistic #056741034
                    </p>
                  </div>
                </li>
                <li class="ms-4">
                  <div
                    class="absolute w-3 h-3 bg-[#BA1A1A] !rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
                  ></div>
                  <h3
                    class="text-lg font-semibold text-[#BA1A1A] dark:text-white"
                  >
                    - 50,000.00 บาท
                  </h3>
                  <div class="flex gap-[10px] items-center mt-[10px]">
                    <time
                      class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                      >19 ต.ค. 2566 (11.23) -</time
                    >
                    <p
                      class="text-sm font-normal text-gray-500 dark:text-gray-400"
                    >
                      :
                    </p>
                    <p
                      class="text-sm font-normal text-gray-500 dark:text-gray-400"
                    >
                      Logistic #056741034
                    </p>
                  </div>
                </li>
              </ol>
            </v-card>
          </v-window-item>
          <v-window-item value="option-5">
            <VueDatePicker
              v-model="date"
              class="max-w-[225px] my-[15px]"
              range
            ></VueDatePicker>

            <div class="lg:flex block lg:flex-wrap flex-nowrap gap-[15px]">
              <div
                class="hover:bg-slate-100 transition-all duration-300 basis-full border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[25px]">
                  <v-icon
                    icon="mdi-credit-card-multiple-outline"
                    color="#084F93"
                  ></v-icon>
                  <p class="text-[22px] font-bold">เงิน COD ทั้งหมด</p>
                </div>
                <div
                  class="flex lg:flex-wrap flex-nowrap gap-[15px] justify-start w-full"
                >
                  <div class="text-right w-full">
                    <p class="text-[20px] font-bold">10,064.00 ฿</p>
                    <p class="text-[#000000]/[0.6] text-[14px]">289 ชิ้น</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="lg:flex block lg:flex-wrap flex-nowrap gap-[15px]">
              <div
                class="hover:bg-slate-100 transition-all duration-300 basis-full md:basis-6/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[25px]">
                  <v-icon icon="mdi-cube-send" color="#F79009"></v-icon>
                  <p class="text-[22px] font-bold">ที่ต้องจัดส่ง</p>
                </div>
                <div
                  class="flex lg:flex-wrap flex-nowrap gap-[15px] justify-start"
                >
                  <div class="text-right w-full">
                    <p class="text-[20px] font-bold">1,000.00 ฿</p>
                    <p class="text-[#000000]/[0.6] text-[14px]">289 ชิ้น</p>
                  </div>
                </div>
              </div>
              <div
                class="hover:bg-slate-100 transition-all duration-300 basis-full md:basis-6/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[25px]">
                  <v-icon icon="mdi-truck" color="#0BA5EC"></v-icon>
                  <p class="text-[22px] font-bold">กำลังจัดส่ง</p>
                </div>
                <div
                  class="flex lg:flex-wrap flex-nowrap gap-[15px] justify-start"
                >
                  <div class="text-right w-full">
                    <p class="text-[20px] font-bold">1,000.00 ฿</p>
                    <p class="text-[#000000]/[0.6] text-[14px]">289 ชิ้น</p>
                  </div>
                </div>
              </div>
              <div
                class="hover:bg-slate-100 transition-all duration-300 basis-full md:basis-6/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[25px]">
                  <v-icon icon="mdi-check-decagram" color="#039855"></v-icon>
                  <p class="text-[22px] font-bold">สำเร็จ</p>
                </div>
                <div
                  class="flex lg:flex-wrap flex-nowrap gap-[15px] justify-start"
                >
                  <div class="text-right w-full">
                    <p class="text-[20px] font-bold">1,000.00 ฿</p>
                    <p class="text-[#000000]/[0.6] text-[14px]">289 ชิ้น</p>
                  </div>
                </div>
              </div>
              <div
                class="hover:bg-slate-100 transition-all duration-300 basis-full md:basis-6/12 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
              >
                <div class="flex gap-[10px] items-center mb-[25px]">
                  <v-icon icon="mdi-information" color="#BA1A1A"></v-icon>
                  <p class="text-[22px] font-bold">ตีกลับ/ปัญหา/ยกเลิก</p>
                </div>
                <div
                  class="flex lg:flex-wrap flex-nowrap gap-[15px] justify-start"
                >
                  <div class="text-right w-full">
                    <p class="text-[20px] font-bold">1,000.00 ฿</p>
                    <p class="text-[#000000]/[0.6] text-[14px]">289 ชิ้น</p>
                  </div>
                </div>
              </div>
            </div>

            <v-card
              variant="flat"
              class="border border-[#EEEDF1] !rounded-[8px] !p-[15px]"
            >
              <p class="text-[16px] text-[#000]/[0.6]">รายการรับ COD</p>
              <v-data-table
                v-if="itemsPrd.length > 0"
                :headers="headerCod"
                :items="itemsCod"
                no-data-text="ไม่มีข้อมูล"
                hide-default-footer
                class="my-[15px] border"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="text-center">{{ item.codId }}</td>
                    <td class="text-center">{{ item.amount }}</td>
                    <td class="text-center">{{ item.payloop }}</td>
                    <td class="text-center truncate">
                      <div class="flex gap-[15px] justify-center">
                        <div
                          :class="`w-[20px] h-[20px] ${
                            item.status === 'สำเร็จ'
                              ? 'bg-[#12B76A]'
                              : 'bg-[#F79009]'
                          } !rounded-full`"
                        ></div>
                        {{ item.status }}
                      </div>
                    </td>
                    <td class="text-center">
                      <div class="flex gap-[15px] justify-center">
                        <v-btn flat>
                          <v-icon
                            icon="mdi-eye-outline"
                            color="#1A1C1E"
                          ></v-icon>
                        </v-btn>
                        <v-btn flat>
                          <v-icon
                            icon="mdi-tray-arrow-down"
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
            </v-card>
          </v-window-item>
          <v-window-item value="option-6">
            <p class="text-[14px] mb-[15px]">จัดการผู้ใช้งาน</p>
            <v-data-table
              v-if="itemsUser.length > 0"
              :headers="headerUsers"
              :items="itemsUser"
              no-data-text="ไม่มีข้อมูล"
              hide-default-footer
              class="my-[15px] border"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-center">{{ item.user }}</td>
                  <td class="text-center">{{ item.role }}</td>
                  <td class="text-center">{{ item.mail }}</td>
                  <td class="text-center">{{ item.phone }}</td>
                  <td class="text-center">
                    <div class="flex gap-[15px] justify-center">
                      <div
                        :class="`w-[20px] h-[20px] ${
                          item.status === 'เปิดใช้งาน'
                            ? 'bg-[#12B76A]'
                            : 'bg-[#BA1A1A]'
                        } !rounded-full`"
                      ></div>
                      {{ item.status }}
                    </div>
                  </td>
                </tr>
              </template>
              <template v-slot:bottom></template>
            </v-data-table>
            <div v-else class="h-[260px] flex justify-center items-center">
              <p>ยังไม่มีรายการ</p>
            </div>
          </v-window-item>
        </v-window>
      </div>
    </div>

    <div v-if="viewProduct === true">
      <div class="flex justify-end w-full">
        <v-btn
          color="#084F93"
          prepend-icon="mdi-arrow-left"
          flat
          class="!rounded-[8px] !min-w-[230px] !min-h-[48px] mb-[15px]"
          @click="fn_clearProduct('product')"
          >กลับ</v-btn
        >
      </div>
      <v-card
        variant="flat"
        class="border border-[#EEEDF1] !rounded-[8px] my-[15px] p-[15px]"
      >
        <v-data-table
          v-if="itemsPrd.length > 0"
          :headers="headersProduct"
          :items="itemsPrd"
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
              <td class="text-center">{{ item.prdName }}</td>
              <td class="text-center">{{ item.prdType }}</td>
              <td class="text-center">{{ item.prdSub }}</td>
              <td class="text-center">{{ item.stock }}</td>
              <td class="text-center">
                <div class="flex gap-[15px] justify-center">
                  <div
                    :class="`w-[20px] h-[20px] ${
                      item.status === 'เปิดใช้งาน'
                        ? 'bg-[#12B76A]'
                        : 'bg-[#BA1A1A]'
                    } !rounded-full`"
                  ></div>
                  {{ item.status }}
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div v-else class="h-[260px] flex justify-center items-center">
          <p>ยังไม่มีรายการ</p>
        </div>
      </v-card>
    </div>
    <div v-if="viewWareHouse === true">
      <div class="flex justify-end w-full">
        <v-btn
          color="#084F93"
          prepend-icon="mdi-arrow-left"
          flat
          class="!rounded-[8px] !min-w-[230px] !min-h-[48px] mb-[15px]"
          @click="fn_clearProduct('warehouse')"
          >กลับ</v-btn
        >
      </div>
      <v-card
        variant="flat"
        class="border border-[#EEEDF1] !rounded-[8px] my-[15px] p-[15px]"
      >
        <v-data-table
          v-if="itemsWareHouse.length > 0"
          v-model:page="pageWareHouse"
          :headers="headersWareHouse"
          :items="itemsWareHouse"
          :items-per-page="itemsPerPageWareHouse"
          no-data-text="ไม่มีข้อมูล"
          hide-default-footer
          class="mb-[15px]"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center">{{ item.branchName }}</td>
              <td class="text-center">{{ item.provice }}</td>
              <td class="text-center">{{ item.distric }}</td>
              <td class="text-center">{{ item.phone }}</td>
              <td class="text-center">
                <div class="flex gap-[15px] justify-center">
                  <p
                    :class="`${
                      item.status === 'ใช้งาน'
                        ? 'text-[#12B76A]'
                        : 'text-[#BA1A1A]'
                    }`"
                  >
                    {{ item.status }}
                  </p>
                </div>
              </td>
            </tr>
          </template>
          <template v-slot:bottom></template>
        </v-data-table>
        <div v-else class="h-[260px] flex justify-center items-center">
          <p>ยังไม่มีรายการ</p>
        </div>
      </v-card>
      <div class="text-center pt-2">
        <v-pagination
          v-model="pageWareHouse"
          :length="pageCountWareHose"
        ></v-pagination>
      </div>
    </div>
  </div>

  <!-- <v-dialog v-model="dialog" class="!min-w-[606px]">
    <v-card class="!min-w-[606px]">
      <v-card-text>
        <embed
          :src="pdfUrl"
          type="application/pdf"
          width="100%"
          height="600px"
        />
        <vue-pdf-embed :source="pdfUrlBase64" class="!w-full" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false"
          >Close Dialog</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog> -->
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, watch } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

let pdfLink = ref("");

const date = ref();

let page = ref(1);
let pageWareHouse = ref(1);
let pagePackage = ref(1);
let itemsPerPage = 10;
let itemPerPageSelect = ref(10);
let itemsPerPageWareHouse = 10;
let itemsPerPagePackage = 10;
let search = ref("");
let loading = ref(false);
let dialog = ref(false);
let pdfUrl = ref("");
let pdfUrlBase64 = ref("");

let navbar = ref("Business info,Business account");

let rest = ref("");
let detailData = ref([]);

let tab = ref(null);

let viewProduct = ref(false);
let viewWareHouse = ref(false);

let productName = ref("");

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

const headersProduct = [
  {
    title: "รูป",
    align: "start",
    key: "logo",
  },
  {
    title: "ชื่อสินค้า",
    align: "center",
    key: "prdName",
  },
  {
    title: "ประเภทสินค้า",
    align: "center",
    key: "prdType",
  },
  {
    title: "สินค้าย่อย",
    align: "center",
    key: "prdSub",
  },
  {
    title: "จำนวนสต๊อค",
    align: "center",
    key: "stock",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

const headersWareHouse = [
  {
    title: "ชื่อคลัง",
    align: "start",
    key: "branchName",
  },
  {
    title: "จังหวัด",
    align: "center",
    key: "provice",
  },
  {
    title: "เขต/อำเภอ",
    align: "center",
    key: "distric",
  },
  {
    title: "เบอร์โทรติดต่อ",
    align: "center",
    key: "phone",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

const headerLogistic = [
  {
    title: "Bill ID",
    align: "start",
    key: "billId",
  },
  {
    title: "ผู้ให้บริการ",
    align: "center",
    key: "vendor",
  },
  {
    title: "ยอดทั้งหมด",
    align: "center",
    key: "amount",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "",
    align: "center",
    key: "option",
  },
];

const headerCod = [
  {
    title: "CODS ID",
    align: "start",
    key: "codId",
  },
  {
    title: "ยอดทั้งหมด",
    align: "center",
    key: "amount",
  },
  {
    title: "รอบการโอน",
    align: "center",
    key: "payloop",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "",
    align: "center",
    key: "option",
  },
];

const headerPackage = [
  {
    title: "วันที่",
    align: "center",
    key: "date",
  },
  {
    title: "หมายเลขใบเสร็จ",
    align: "center",
    key: "invoice",
  },
  {
    title: "คำอธิบาย",
    align: "center",
    key: "desc",
  },
  {
    title: "วิธีการชำระเงิน",
    align: "center",
    key: "payment",
  },
  {
    title: "ยอดรวม",
    align: "center",
    key: "amount",
  },
  {
    title: " ",
    align: "center",
    key: "preview",
  },
];

const headerUsers = [
  {
    title: "ชื่อผู้ใช้งาน",
    align: "center",
    key: "user",
  },
  {
    title: "บทบาท",
    align: "center",
    key: "role",
  },
  {
    title: "อีเมล",
    align: "center",
    key: "mail",
  },
  {
    title: "เบอร์โทร",
    align: "center",
    key: "phone",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

let itemsCod = [
  {
    codId: "CODS2310126SX000101",
    amount: "98,279.00 บาท",
    payloop: "13/12/2000",
    status: "รอดำเนินการ",
  },
  {
    codId: "CODS2310126SX000101",
    amount: "98,279.00 บาท",
    payloop: "13/12/2000",
    status: "สำเร็จ",
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

let itemsPrd = [
  {
    logo: "pizza-logo.png",
    prdName: "SX-0001",
    prdType: "Starbuck",
    prdSub: "078-837-8838",
    stock: 500,
    status: "เปิดใช้งาน",
  },
  {
    logo: "pizza-logo.png",
    prdName: "SX-0001",
    prdType: "Starbuck",
    prdSub: "078-837-8838",
    stock: 0,
    status: "ปิดใช้งาน",
  },
];

let itemsWareHouse = [
  {
    branchName: "Bangkok001",
    provice: "กรุงเทพ",
    distric: "บางซื่อ",
    phone: "088-842-4758",
    status: "ใช้งาน",
  },
  {
    branchName: "Bangkok001",
    provice: "กรุงเทพ",
    distric: "บางซื่อ",
    phone: "088-842-4758",
    status: "ระงับ",
  },
];

let itemsLogistic = [
  {
    billId: "CODS2310126SX000101",
    vendor: "Flash Express",
    amount: "98,279.00 บาท",
    status: "จ่ายแล้ว",
  },
  {
    billId: "CODS2310126SX000101",
    vendor: "J&T",
    amount: "98,279.00 บาท",
    status: "จ่ายแล้ว",
  },
];

let itemsPackage = [
  {
    date: "14/09/2023",
    invoice: "SX4832-2845-AC-2844",
    desc: "Package standard",
    payment: "Visa *5734",
    amout: 1500,
  },
];

let itemsUser = [
  {
    user: "หม่ำ จ๊กมก",
    role: "บทบาท",
    mail: "อีเมล",
    phone: "เบอร์โทร",
    status: "เปิดใช้งาน",
  },
  {
    user: "หม่ำ จ๊กมก",
    role: "บทบาท",
    mail: "อีเมล",
    phone: "เบอร์โทร",
    status: "ปิดใช้งาน",
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

const pageCountWareHose = computed(() => {
  return Math.ceil(itemsWareHouse.length / itemsPerPageWareHouse);
});

const pageCountPackage = computed(() => {
  return Math.ceil(itemsPackage.length / itemsPerPagePackage);
});

const fn_navDetail = (item) => {
  productName.value = item.bizName;
  detailData.value = item;
  navbar.value = "Business info,Users account," + productName.value + "";
};

const fn_changeNav = (text) => {
  console.log(navbar.value);
};

const fn_findDetail = (text) => {
  text === "product"
    ? (viewProduct.value = true)
    : (viewWareHouse.value = true);
};

const fn_clearProduct = (item) => {
  item === "product"
    ? (viewProduct.value = false)
    : (viewWareHouse.value = false);
};

watch(navbar, () => {
  console.log(navbar);
});

const downloadPdf = async () => {

};

const fn_genPDF = async () => {
  loading.value = true;
};

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});
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
