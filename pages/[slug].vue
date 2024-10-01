<template>
  <div>
    ...redirecionando para
    {{ redirect }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const redirect = ref<string>('vazio')
onMounted(async ()=>{
  const data:any = await $fetch(`/api/link`,{
    method: "GET",
    query:{
      redirect :route.params.slug
    }
  })
  redirect.value = data.redirect
  await navigateTo( data.redirect as string,{external:true})
})
</script>