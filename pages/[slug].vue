<template>
  <div>
    ...redirecionando
    {{ data }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const api = await process.env.API
//`${api}/api/link?redirect=${route.params.slug}`
const { data, status, error, refresh, clear,execute } = await useAsyncData(
  'link',
  () => $fetch(`${config.public.API_BASE_URL}/api/link?redirect=${route.params.slug}`)
)
await execute()
watch(data, async (_data) => {
  console.log(data.value.data.redirect)
  await navigateTo(data.value.data.redirect, {
    external: true
  })
},{immediate: true})
</script>