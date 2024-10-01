<template>
  <Card v-if="modelValue != null">
    <button class="pi pi-times"/>
    <template #title class="flex content-between">
      <div class="w-full flex justify-between">
        <span>Seu Link</span><button class="relative pi pi-times right-0" @click="close"/>
      </div>
    </template>
    <template #content>
      <p class="border-[1px] border-gray-600 rounded-sm px-4 py-2">{{ url }}/{{
    modelValue.content }}
        <button :class="listIcon[statusIcon]" @click="copyURL" />
      </p>
      <small class="px-4 italic">{{ modelValue.redirect }}</small>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { useToast } from "primevue/usetoast";
import { promiseTimeout } from '@vueuse/core'
const toast = useToast();
const route = useRouter()
const statusIcon = ref<number>(0)
const listIcon = ref<string[]>(["pi pi-copy", "pi pi-spin pi-cog", "pi pi-file-check text-green-600"])
const config = useRuntimeConfig()
const url = ref<string>('')
const model = defineModel<any>()
async function copyURL() {
  try {
    statusIcon.value = 1
    await promiseTimeout(200)
    await navigator.clipboard.writeText(url.value +"/"+ model.value.content);
    statusIcon.value = 2
    await promiseTimeout(800)
    statusIcon.value = 0
  } catch ($e) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Erro ao Copiar URL', life: 3150 })
  }
}
async function close() {
  model.value = null
}
onMounted(async ()=>{
  url.value = window.location.protocol + '//' + window.location.hostname
})
</script>

<style></style>