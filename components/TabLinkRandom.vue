<template>
  <div class="flex flex-col items-center justify-center w-full pt-5">
    <FloatLabel>
      <InputText id="link" v-model="url" :invalid="!(isValidUrl || !url.length)" />
      <label for="link">Link URL</label>
    </FloatLabel>
    <Button :class="loading&&'animate-wiggle'" label="save" :icon="loading == null || loading == false ? 'pi pi-check' : 'pi pi-times'"
      iconPos="right" @click="createLink">
      <ProgressSpinner v-if="loading === true" style="width: 25px; height: 25px" strokeWidth="8" fill="transparent"
        animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import { useToast } from "primevue/usetoast";
const toast = useToast();
const config = useRuntimeConfig()
const model = defineModel()
const api = await process.env.API
const { index } = defineProps<{
  index?: string,
}>()
const url = ref<string>("")
const loading = ref<boolean | null>(null)


const isValidUrl = computed(() => {
  const regex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  return regex.test(url.value);
})

async function createLink() {
  if (!isValidUrl.value) {
    toast.removeAllGroups()
    toast.add({ severity: 'error', summary: 'Error', detail: 'Link invalido', life: 3150 })
    loading.value = true
    await promiseTimeout(1200)
    loading.value = false
  } else {
    loading.value = true
    const link = await $fetch(`/api/link/random`, {
      method: 'POST',
      body: { redirect: url.value }
    })
    loading.value = false
    model.value = link
    toast.add({ severity: 'success', summary: 'Sucesso', detail: link?.content, life: 3150 })
  }
}
</script>