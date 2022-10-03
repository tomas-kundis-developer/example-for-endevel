<template>
  <div>
    <select
      name="cars"
      :disabled="props.disabled"
      :value="props.modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <!-- Placeholder text. -->
      <option value="" disabled selected>{{ props.placeholder }}</option>
      <!-- Select options. -->
      <option
        v-for="(option, index) in props.options"
        :key="index"
        :disabled="option?.disabled"
        :selected="option.value === props.defaultValue"
        :value="option.value"
      >
        {{ option.description }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { ISelectOption } from './ISelectOption';

const props = defineProps<{
  defaultValue?: string;
  disabled?: boolean;
  modelValue: string;
  options: ISelectOption[];
  placeholder?: string;
}>();

defineEmits(['update:modelValue']);
</script>
