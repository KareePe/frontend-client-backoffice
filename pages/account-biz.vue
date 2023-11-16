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

  <v-dialog v-model="dialog" class="!min-w-[606px]">
    <v-card class="!min-w-[606px]">
      <v-card-text>
        <!-- <embed
          :src="pdfUrl"
          type="application/pdf"
          width="100%"
          height="600px"
        /> -->
        <vue-pdf-embed :source="pdfUrlBase64" class="!w-full" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false"
          >Close Dialog</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, watch } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import VuePdfEmbed from "vue-pdf-embed";

// import pdfFonts from '/assets/custom-fonts'
// import pdfMake from "pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import myFunction from "../assets/custom-fonts.js";

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

const loadPdf = async () => {
  // const { $pdfMake } = useNuxtApp();

  // $pdfMake.tableLayouts = {
  //   custom: {
  //     fillColor: function (rowIndex) {
  //       return rowIndex % 2 !== 0 ? "#000" : null;
  //     },
  //     hLineColor: "#000",
  //     vLineColor: "#000",
  //     paddingLeft: function () {
  //       return 0;
  //     },
  //     paddingRight: function () {
  //       return 0;
  //     },
  //   },
  // };
  // $pdfMake.vfs = await pdfFonts.pdfMake.vfs;
  // $pdfMake.fonts = {
  //   // download default Roboto font from cdnjs.com
  //   Roboto: {
  //     normal: "Roboto-Regular.ttf",
  //     bold: "Roboto-Medium.ttf",
  //     italics: "Roboto-Italic.ttf",
  //     bolditalics: "Roboto-MediumItalic.ttf",
  //   },
  //   Kanit: {
  //     normal: "Kanit-Regular.ttf",
  //     bold: "Kanit-Medium.ttf",
  //     italics: "Kanit-Italic.ttf",
  //     bolditalics: "Kanit-MediumItalic.ttf",
  //   },
  // };
  // $pdfMake
  //   .createPdf({
  //     content: [
  //       {
  //         nodeName: "DIV",
  //         stack: [
  //           {
  //             text: " ",
  //             style: ["html-div"],
  //           },
  //           {
  //             nodeName: "TABLE",
  //             table: {
  //               body: [
  //                 [
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         nodeName: "IMG",
  //                         image:
  //                           "data:image/png;base64,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",
  //                         fontSize: 8,
  //                         width: 38,
  //                         style: [
  //                           "html-img",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                     ],
  //                     fontSize: 8,
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                   {
  //                     text: "",
  //                     nodeName: "TD",
  //                     fontSize: 8,
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                 ],
  //                 [
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "Company name",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "Address no. xxxxxxxxxxx",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "xxxxxxxxxxxxxxxxxxxxxx",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "xxxxxxxxxxxxxx xxxxx",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "support@sales.co.th",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                     ],
  //                     fontSize: 8,
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "Customer name",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "Date time",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "support@sales.co.th",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                     ],
  //                     fontSize: 8,
  //                     alignment: "right",
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                 ],
  //                 [
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "Billing ID: SX4832-2845-AC-2844",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 10],
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                     ],
  //                     fontSize: 8,
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: [
  //                           {
  //                             text: "Total COD: ",
  //                             fontSize: 8,
  //                             alignment: "right",
  //                             margin: [0, 5, 0, 10],
  //                             style: [
  //                               "html-p",
  //                               "html-td",
  //                               "html-tr",
  //                               "html-tbody",
  //                               "html-table",
  //                               "html-div",
  //                               "top",
  //                             ],
  //                           },
  //                           {
  //                             text: "150,543.00 บาท",
  //                             nodeName: "B",
  //                             fontSize: 8,
  //                             alignment: "right",
  //                             bold: true,
  //                             style: [
  //                               "html-b",
  //                               "html-p",
  //                               "html-td",
  //                               "html-tr",
  //                               "html-tbody",
  //                               "html-table",
  //                               "html-div",
  //                               "top",
  //                             ],
  //                           },
  //                         ],
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         margin: [0, 5, 0, 10],
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                     ],
  //                     fontSize: 8,
  //                     alignment: "right",
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                 ],
  //               ],
  //               widths: ["*", "*"],
  //               heights: ["auto", "auto", "auto"],
  //             },
  //             marginBottom: 5,
  //             width: "false",
  //             fontSize: 8,
  //             border: [false, false, false, false],
  //             style: ["html-table", "html-div", "top"],
  //           },
  //           {
  //             text: " ",
  //             style: ["html-div"],
  //           },
  //           {
  //             nodeName: "TABLE",
  //             marginBottom: 5,
  //             width: "100%",
  //             border: [false, false, false, false],
  //             style: ["html-table", "html-div"],
  //             table: {
  //               body: [
  //                 [
  //                   {
  //                     text: "No.",
  //                     nodeName: "TH",
  //                     background: "#dddddd",
  //                     bold: true,
  //                     fillColor: "#EEEEEE",
  //                     alignment: "center",
  //                     style: [
  //                       "html-th",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "Order No.",
  //                     nodeName: "TH",
  //                     background: "#dddddd",
  //                     bold: true,
  //                     fillColor: "#EEEEEE",
  //                     alignment: "center",
  //                     style: [
  //                       "html-th",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "Delivery",
  //                     nodeName: "TH",
  //                     background: "#dddddd",
  //                     bold: true,
  //                     fillColor: "#EEEEEE",
  //                     alignment: "center",
  //                     style: [
  //                       "html-th",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "Tracking",
  //                     nodeName: "TH",
  //                     background: "#dddddd",
  //                     bold: true,
  //                     fillColor: "#EEEEEE",
  //                     alignment: "center",
  //                     style: [
  //                       "html-th",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "Receive name",
  //                     nodeName: "TH",
  //                     background: "#dddddd",
  //                     bold: true,
  //                     fillColor: "#EEEEEE",
  //                     alignment: "center",
  //                     style: [
  //                       "html-th",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "Amout",
  //                     nodeName: "TH",
  //                     background: "#dddddd",
  //                     bold: true,
  //                     fillColor: "#EEEEEE",
  //                     alignment: "center",
  //                     style: [
  //                       "html-th",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "ยอดรวม",
  //                     nodeName: "TH",
  //                     background: "#dddddd",
  //                     bold: true,
  //                     fillColor: "#EEEEEE",
  //                     alignment: "center",
  //                     style: [
  //                       "html-th",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                 ],
  //                 [
  //                   {
  //                     text: "1",
  //                     nodeName: "TD",
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "",
  //                     nodeName: "TD",
  //                     alignment: "center",
  //                     width: 53,
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "Flash express",
  //                     nodeName: "TD",
  //                     alignment: "center",
  //                     width: 75,
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "TH874Y6929JHG",
  //                     nodeName: "TD",
  //                     alignment: "center",
  //                     width: 113,
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "นส กนก สุขจัง",
  //                     nodeName: "TD",
  //                     alignment: "center",
  //                     width: 75,
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "320.00",
  //                     nodeName: "TD",
  //                     alignment: "center",
  //                     width: 38,
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     text: "1,500.00",
  //                     nodeName: "TD",
  //                     alignment: "center",
  //                     width: 53,
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                 ],
  //               ],
  //               widths: ["*", 53, 75, 113, 75, 38, 53],
  //               heights: ["auto", "auto"],
  //             },
  //           },
  //           {
  //             text: " ",
  //             style: ["html-div"],
  //           },
  //           {
  //             nodeName: "TABLE",
  //             table: {
  //               body: [
  //                 [
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: "",
  //                         nodeName: "P",
  //                       },
  //                     ],
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: " ",
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                         ],
  //                       },
  //                       {
  //                         text: [
  //                           {
  //                             text: "ยอดรวม ",
  //                             alignment: "right",
  //                             margin: [0, 5, 0, 0],
  //                             lineHeight: 0.1,
  //                             style: [
  //                               "html-p",
  //                               "html-td",
  //                               "html-tr",
  //                               "html-tbody",
  //                               "html-table",
  //                               "html-div",
  //                             ],
  //                           },
  //                           {
  //                             text: "1,500.00",
  //                             nodeName: "SPAN",
  //                             alignment: "right",
  //                             lineHeight: 0.1,
  //                             marginLeft: 41,
  //                             style: [
  //                               "html-span",
  //                               "html-p",
  //                               "html-td",
  //                               "html-tr",
  //                               "html-tbody",
  //                               "html-table",
  //                               "html-div",
  //                             ],
  //                           },
  //                         ],
  //                         nodeName: "P",
  //                         alignment: "right",
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                         ],
  //                       },
  //                       {
  //                         text: [
  //                           {
  //                             text: "ภาษีมูลค่าเพิ่ม ",
  //                             alignment: "right",
  //                             margin: [0, 5, 0, 0],
  //                             lineHeight: 0.1,
  //                             style: [
  //                               "html-p",
  //                               "html-td",
  //                               "html-tr",
  //                               "html-tbody",
  //                               "html-table",
  //                               "html-div",
  //                             ],
  //                           },
  //                           {
  //                             text: "1,500.00",
  //                             nodeName: "SPAN",
  //                             alignment: "right",
  //                             lineHeight: 0.1,
  //                             marginLeft: 13,
  //                             style: [
  //                               "html-span",
  //                               "html-p",
  //                               "html-td",
  //                               "html-tr",
  //                               "html-tbody",
  //                               "html-table",
  //                               "html-div",
  //                             ],
  //                           },
  //                         ],
  //                         nodeName: "P",
  //                         alignment: "right",
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                         ],
  //                       },
  //                       {
  //                         text: [
  //                           {
  //                             text: "ยอดรวมสุทธิ ",
  //                             alignment: "right",
  //                             bold: true,
  //                             marginBottom: 0,
  //                             lineHeight: 0.1,
  //                             style: [
  //                               "html-b",
  //                               "html-td",
  //                               "html-tr",
  //                               "html-tbody",
  //                               "html-table",
  //                               "html-div",
  //                             ],
  //                           },
  //                           {
  //                             text: "1,500.00",
  //                             nodeName: "SPAN",
  //                             alignment: "right",
  //                             bold: true,
  //                             lineHeight: 0.1,
  //                             marginLeft: 20,
  //                             style: [
  //                               "html-span",
  //                               "html-b",
  //                               "html-td",
  //                               "html-tr",
  //                               "html-tbody",
  //                               "html-table",
  //                               "html-div",
  //                             ],
  //                           },
  //                         ],
  //                         nodeName: "B",
  //                         alignment: "right",
  //                         bold: true,
  //                         marginBottom: 0,
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-b",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                         ],
  //                       },
  //                     ],
  //                     alignment: "right",
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                     ],
  //                   },
  //                 ],
  //               ],
  //               widths: ["*", "*"],
  //               heights: ["auto"],
  //             },
  //             marginBottom: 5,
  //             width: "false",
  //             style: ["html-table", "html-div"],
  //           },
  //           {
  //             text: " ",
  //             style: ["html-div"],
  //           },
  //         ],
  //       },
  //       {
  //         text: " ",
  //       },
  //     ],
  //     styles: {
  //       tableHeader: {
  //         bold: false,
  //         fontSize: 13,
  //         color: "#000", // Set text color here
  //         fillColor: "#EEEDF1", // Default fill color for header
  //       },
  //     },
  //     info: {
  //       title: "awesome Document",
  //       author: "john doe",
  //       subject: "subject of document",
  //       keywords: "keywords for document",
  //     },
  //     defaultStyle: {
  //       font: "Kanit",
  //     },
  //   })
  //   .getDataUrl((dataUrl) => {
  //     pdfLink.value = dataUrl;
  //   });

  // // console.log(pdfLink, "pdf");
  // return pdfLink.value;
};

const downloadPdf = async () => {
  // loading.value = true;

  // const { $pdfMake } = useNuxtApp();

  // $pdfMake.tableLayouts = {
  //   custom: {
  //     fillColor: function (rowIndex) {
  //       return rowIndex % 2 !== 0 ? "#000" : null;
  //     },
  //     hLineColor: "#000",
  //     vLineColor: "#000",
  //     paddingLeft: function () {
  //       return 10;
  //     },
  //     paddingRight: function () {
  //       return 10;
  //     },
  //   },
  // };
  // $pdfMake.vfs = await pdfFonts.pdfMake.vfs;
  // $pdfMake.fonts = {
  //   // download default Roboto font from cdnjs.com
  //   Roboto: {
  //     normal: "Roboto-Regular.ttf",
  //     bold: "Roboto-Medium.ttf",
  //     italics: "Roboto-Italic.ttf",
  //     bolditalics: "Roboto-MediumItalic.ttf",
  //   },
  //   Kanit: {
  //     normal: "Kanit-Regular.ttf",
  //     bold: "Kanit-Medium.ttf",
  //     italics: "Kanit-Italic.ttf",
  //     bolditalics: "Kanit-MediumItalic.ttf",
  //   },
  // };
  // $pdfMake
  //   .createPdf({
  //     content: [
  //       {
  //         nodeName: "DIV",
  //         stack: [
  //           {
  //             text: " ",
  //             style: ["html-div"],
  //           },
  //           {
  //             nodeName: "TABLE",
  //             table: {
  //               body: [
  //                 [
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         nodeName: "IMG",
  //                         image:
  //                           "data:image/png;base64,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",
  //                         fontSize: 8,
  //                         width: 38,
  //                         style: [
  //                           "html-img",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                     ],
  //                     fontSize: 8,
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                   {
  //                     text: "",
  //                     nodeName: "TD",
  //                     fontSize: 8,
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                 ],
  //                 [
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "Company name ",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "Address no. xxxxxxxxxxx ",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "xxxxxxxxxxxxxxxxxxxxxx ",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "xxxxxxxxxxxxxx xxxxx ",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "support@sales.co.th",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                     ],
  //                     fontSize: 8,
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "Customer name",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "Date time",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "support@sales.co.th",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         margin: [0, 5, 0, 0],
  //                         lineHeight: 0.1,
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                     ],
  //                     fontSize: 8,
  //                     alignment: "right",
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                 ],
  //                 [
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "Billing ID: SX4832-2845-AC-2844",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         margin: [0, 5, 0, 10],
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                     ],
  //                     fontSize: 8,
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                   {
  //                     nodeName: "TD",
  //                     stack: [
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: "Total COD: 150,543.00 บาท",
  //                         nodeName: "P",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         margin: [0, 5, 0, 10],
  //                         style: [
  //                           "html-p",
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                       {
  //                         text: " ",
  //                         fontSize: 8,
  //                         alignment: "right",
  //                         border: [false, false, false, false],
  //                         style: [
  //                           "html-td",
  //                           "html-tr",
  //                           "html-tbody",
  //                           "html-table",
  //                           "html-div",
  //                           "top",
  //                         ],
  //                       },
  //                     ],
  //                     fontSize: 8,
  //                     alignment: "right",
  //                     border: [false, false, false, false],
  //                     style: [
  //                       "html-td",
  //                       "html-tr",
  //                       "html-tbody",
  //                       "html-table",
  //                       "html-div",
  //                       "top",
  //                     ],
  //                   },
  //                 ],
  //               ],
  //               widths: ["*", "*"],
  //               heights: ["auto", "auto", "auto"],
  //             },
  //             marginBottom: 1,
  //             width: "false",
  //             fontSize: 8,
  //             border: [false, false, false, false],
  //             style: ["html-table", "html-div", "top"],
  //           },
  //           {
  //             text: " ",
  //             style: ["html-div"],
  //           },
  //         ],
  //       },
  //       {
  //         text: " ",
  //       },
  //     ],
  //     styles: {
  //       tableHeader: {
  //         bold: false,
  //         fontSize: 13,
  //         color: "#000", // Set text color here
  //         fillColor: "#EEEDF1", // Default fill color for header
  //       },
  //     },
  //     info: {
  //       title: "awesome Document",
  //       author: "john doe",
  //       subject: "subject of document",
  //       keywords: "keywords for document",
  //     },
  //     defaultStyle: {
  //       font: "Kanit",
  //     },
  //   })
  //   .download("file.pdf", () => {
  //     console.log("Download Success");
  //     loading.value = false;
  //   });

  // console.log(pdfLink, "pdf");
  // return pdfLink.value;
};

const fn_genPDF = async () => {
  loading.value = true;
  // const interval = setInterval(async () => {
  //   let pdfBase64 = await loadPdf();

  //   if (pdfBase64 !== "") {
  //     clearInterval(interval);
  //     loading.value = false;
  //     previewDialog(pdfBase64);
  //   } else {
  //     console.log("Data is still empty.");
  //     loading.value = true;
  //   }
  // }, 1000);
};

const previewDialog = (base64) => {
  // Convert base64 to binary data
  // let splitBase64 = base64.split(",");

  // const binaryData = atob(splitBase64[1]);
  // const arrayBuffer = new ArrayBuffer(binaryData.length);
  // const uint8Array = new Uint8Array(arrayBuffer);
  // for (let i = 0; i < binaryData.length; i++) {
  //   uint8Array[i] = binaryData.charCodeAt(i);
  // }

  // // Create a Blob from the binary data
  // const blob = new Blob([uint8Array], { type: "application/pdf" });

  // // Create a data URL from the Blob
  // const dataUrl = URL.createObjectURL(blob);

  // pdfUrl.value = dataUrl;
  // pdfUrlBase64.value = base64;

  // dialog.value = true;
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
