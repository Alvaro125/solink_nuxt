<template>
  <div>
    <h1>{{props.content}}</h1>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ content: string|number }>();
</script>

<style>

</style>