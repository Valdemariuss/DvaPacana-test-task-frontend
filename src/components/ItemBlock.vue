<template>
  <div :class="bem()">
    <h3 :class="bem('title')">{{ title }}</h3>
    <div :class="bem('container')">
      <div
        v-for="item in items"
        :key="item.id"
        :class="[bem('item'), { [bem('item', 'selected')]: isSelected(item) }]"
        @click="handleItemClick(item)"
      >
        {{ item.name }}
        <span v-if="showOrder && getItemOrder(item)" :class="bem('order')">
          {{ getItemOrder(item) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { IItem } from '@/types/item'
import { useBem } from '@/composables/useBem'

interface Props {
  title: string
  items: IItem[]
  selectedItems: IItem[]
  maxSelection?: number
  singleSelection?: boolean
  showOrder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxSelection: Infinity,
  singleSelection: false,
  showOrder: false,
})

const emit = defineEmits<{
  (e: 'item-selected', item: IItem): void
}>()

const { bem } = useBem('item-block')

const isSelected = (item: IItem) => {
  return props.selectedItems.some((selectedItem) => selectedItem.id === item.id)
}

const getItemOrder = (item: IItem) => {
  return props.selectedItems.findIndex((selectedItem) => selectedItem.id === item.id) + 1
}

const handleItemClick = (item: IItem) => {
  emit('item-selected', item)
}
</script>

<style lang="scss">
.item-block {
  &__container {
    display: flex;
    flex-wrap: wrap;
    gap: rem(10);
  }

  &__item {
    padding: rem(8) rem(12);
    border: 1px solid $border-color;
    border-radius: rem(4);
    cursor: pointer;
    transition: all 0.2s;
    position: relative;

    &:hover {
      background-color: $hover-bg;
    }

    &--selected {
      background-color: $selected-bg;
      color: white;
      border-color: $selected-bg;
    }
  }

  &__order {
    margin-left: rem(5);
    font-size: rem(12);
  }
}
</style>
