<template>
  <div class="flex flex-col items-center justify-center w-full pt-5">
    <FloatLabel>
      <InputText id="link" v-model="url" :invalid="!(isValidUrl || !url.length)" />
      <label for="link">Link URL</label>
    </FloatLabel>
    <FloatLabel class="mt-6">
      <InputText id="content" v-model="content" :invalid="!(isValidContent || !content.length)" />
      <label for="content">Customização</label>
    </FloatLabel>
    <Button :class="loading && 'animate-wiggle'" label="save"
      :icon="loading == null || loading == false ? 'pi pi-check' : 'pi pi-times'" iconPos="right" @click="createLink">
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
const content = ref<string>("")
const loading = ref<boolean | null>(null)


const isValidUrl = computed(() => {
  const regex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  return regex.test(url.value);
})
const isValidContent = computed(() => {
  const regex = /^[a-zA-Z0-9]{3,}$/;
  return regex.test(content.value);
})


async function createLink() {
  try {
    if (!isValidContent.value || !isValidUrl.value) {
      toast.removeAllGroups()
      if (!isValidContent.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Link Customizavel invalido\n o texto deve ter no minimo 3 letras e não possuir espaços', life: 3150 })
      }
      if (!isValidUrl.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Link invalido', life: 3150 })
      }
      loading.value = true
      await promiseTimeout(1200)
      loading.value = false
    } else {
      loading.value = true
      const link = await $fetch(`${config.public.API_BASE_URL}/api/link`, {
        method: 'POST',
        body: { redirect: url.value, content: content.value }
      })
      model.value = link?.data
      toast.add({ severity: 'success', summary: 'Sucesso', detail: link?.message, life: 3150 })
    }
  } catch (error) {
    if (error.name == 'FetchError') {
      toast.add({ severity: 'error', summary: 'Erro no Serviço', detail: error.data.error, life: 3150 })
      console.dir(error)
    }
  } finally {
    loading.value = false
  }
}
</script>