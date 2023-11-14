<template>
  <Toolbars />
  <Navbar text="Customer mng,KYC" />
  <!-- <Navbar :text="navbar" v-if="viewProduct === true" /> -->
  <div class="p-4 sm:ml-64">
    {{ pdfLink }}
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, watch } from "vue";
// import pdfFonts from '/assets/custom-fonts'
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

let pdfLink = ref("");

const loadPdf = () => {
    const { $pdfMake } = useNuxtApp();

  $pdfMake.tableLayouts = {
    custom: {
      fillColor: function (rowIndex) {
        return rowIndex % 2 !== 0 ? "#000" : null;
      },
      hLineColor: "#50d71e",
      vLineColor: "#50d71e",
      paddingLeft: function () {
        return 10;
      },
      paddingRight: function () {
        return 10;
      },
    },
  };
  $pdfMake.vfs = pdfFonts.pdfMake.vfs;
  $pdfMake.fonts = {
    // download default Roboto font from cdnjs.com
    Roboto: {
      normal: "Roboto-Regular.ttf",
      bold: "Roboto-Medium.ttf",
      italics: "Roboto-Italic.ttf",
      bolditalics: "Roboto-MediumItalic.ttf",
    },
    Kanit: {
      normal: "Kanit-Regular.ttf",
      bold: "Kanit-Medium.ttf",
      italics: "Kanit-Italic.ttf",
      bolditalics: "Kanit-MediumItalic.ttf",
    },
  };
  $pdfMake
    .createPdf({
      content: [
        {
          text: "ทดสอบ",
          style: { fontSize: 20, bold: true },
          margin: [0, 0, 0, 5],
        },
        { text: "This is a sample pdf", margin: [0, 0, 0, 5] },
        {
          text: `Date: ${new Date().toDateString()}`,
          margin: [0, 0, 0, 15],
        },
        {
          layout: "custom",
          table: {
            heights: 20,
            widths: "*",
            body: [
              ["Id", "Name", "Phone", "Email"],
              ["1", "ทดอบ Doe", "1234567890", "johndoe@test.com"],
              ["2", "ทดอบ Doe", "1234567890", "janedoe@test.com"],
              ["1", "John Doe", "1234567890", "johndoe@test.com"],
              ["2", "Jane Doe", "1234567890", "janedoe@test.com"],
              ["1", "John Doe", "1234567890", "johndoe@test.com"],
              ["2", "Jane Doe", "1234567890", "janedoe@test.com"],
              ["1", "John Doe", "1234567890", "johndoe@test.com"],
              ["2", "Jane Doe", "1234567890", "janedoe@test.com"],
              ["1", "John Doe", "1234567890", "johndoe@test.com"],
              ["2", "Jane Doe", "1234567890", "janedoe@test.com"],
              ["1", "John Doe", "1234567890", "johndoe@test.com"],
              ["2", "Jane Doe", "1234567890", "janedoe@test.com"],
            ],
          },
        },
      ],
      defaultStyle: {
        font: "Kanit",
      },
    })
    .getDataUrl((dataUrl) => {
      pdfLink.value = dataUrl;
    });

  console.log(pdfLink, "pdf");
};

onMounted(() => {
  loadPdf();
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
