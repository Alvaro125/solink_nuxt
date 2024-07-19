<template>
  <div class="flex flex-col items-center ">
    <Tabs v-model:value="tab" class="w-fit" >
      <TabList class="bg-transparent">
        <Tab value="0">Rápido</Tab>
        <Tab value="1">Customizavel</Tab>
      </TabList>
      <TabPanels class="flex items-center justify-center" >
        <TabPanel value="0">
          <TabLinkRandom v-model="data"/>
        </TabPanel>
        <TabPanel value="1">
          <TabLinkCustom v-model="data"/>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <CardLink class="mt-4" v-model="data"/>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import TabLinkRandom from "../components/TabLinkRandom.vue";
import TabLinkCustom from "../components/TabLinkCustom.vue";
import CardLink from "../components/CardLink.vue";
const url = ref<string>("")
const data = ref<any>()
const content = ref<string>("")
const tab = ref<string>("0")

const isValidUrl = computed(() => {
  const regex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  return regex.test(url.value);
})

function handleData(_data: any) {
  data.value = _data
}
</script>