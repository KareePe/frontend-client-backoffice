<template>
  <Navbar />
  <Toolbars />
  <div>wallet</div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware"
})
</script>
