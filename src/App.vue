<template>
  <div :class="bem()">
    <div :class="bem('header')">
      <div :class="bem('selected-section')">
        <item-block
          title="Selected Items"
          :items="selectedUserItems"
          :selected-items="selectedUserItems"
          :show-order="true"
          :class="bem('selected-block')"
        />
      </div>
      <div :class="bem('selected-section')">
        <item-block
          title="Selected Item"
          :items="selectedChoiceItem ? [selectedChoiceItem] : []"
          :selected-items="selectedChoiceItem ? [selectedChoiceItem] : []"
          :class="bem('selected-block')"
        />
      </div>
    </div>

    <div :class="bem('main')">
      <item-block
        title="User Items"
        :items="userItems"
        :selected-items="selectedUserItems"
        :max-selection="6"
        @item-selected="toggleUserItem"
        :class="bem('items-block')"
      />
      <item-block
        title="Choice Items"
        :items="choiceItems"
        :selected-items="selectedChoiceItem ? [selectedChoiceItem] : []"
        :single-selection="true"
        @item-selected="selectChoiceItem"
        :class="bem('items-block')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ItemBlock from '@/components/ItemBlock.vue'
import type { IItem, ItemListType } from '@/types/item'
import { useBem } from '@/composables/useBem'

const { bem } = useBem('app')

const userItems: ItemListType = [
  { id: 1, name: 'Shoes 1' },
  { id: 2, name: 'Shoes 2' },
  { id: 3, name: 'Shoes 3' },
  { id: 4, name: 'Shoes 4' },
  { id: 5, name: 'T-shirt 1' },
  { id: 6, name: 'T-shirt 2' },
  { id: 7, name: 'T-shirt 3' },
  { id: 8, name: 'T-shirt 4' },
]

const choiceItems: ItemListType = [
  { id: 11, name: 'Jacket 1' },
  { id: 12, name: 'Jacket 2' },
  { id: 13, name: 'Jacket 3' },
  { id: 14, name: 'Jacket 4' },
  { id: 15, name: 'Hoodie 1' },
  { id: 16, name: 'Hoodie 2' },
  { id: 17, name: 'Hoodie 3' },
  { id: 18, name: 'Hoodie 4' },
]

const selectedUserItems = ref<IItem[]>([])
const selectedChoiceItem = ref<IItem | null>(null)

const toggleUserItem = (item: IItem) => {
  const index = selectedUserItems.value.findIndex((i) => i.id === item.id)
  if (index >= 0) {
    selectedUserItems.value.splice(index, 1)
  } else if (selectedUserItems.value.length < 6) {
    selectedUserItems.value.push(item)
  }
}

const selectChoiceItem = (item: IItem) => {
  selectedChoiceItem.value = item
}
</script>

<style lang="scss">
@use '@/styles/main' as *;

.app {
  font-family: Arial, sans-serif;
  max-width: rem(800);
  margin: 0 auto;
  padding: rem(20);

  &__header {
    display: flex;
    margin-bottom: rem(30);
  }

  &__selected-section {
    flex: 1;
    padding: rem(10);
  }

  &__main {
    display: flex;
  }

  &__items-block {
    flex: 1;
    padding: rem(10);
  }
}
</style>
