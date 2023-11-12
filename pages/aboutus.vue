<template>
  <Toolbars />
  <div>About Page</div>
</template>
<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
</script>
