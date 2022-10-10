<template>
  <div>
    <div class="mt-5">
      <Multiselect
        v-model="formValue"
        :disabled="props.disabled"
        mode="single"
        :noOptionsText="props.noOptionsText"
        :options="props.options"
        :placeholder="props.placeholder"
        @change="onChange"
        :canClear="props.canClear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Multiselect from '@vueform/multiselect';

import type { ISelectOption2 } from './ISelectOption2';

const props = defineProps<{
  defaultValue?: string;
  disabled?: boolean;
  modelValue: string;
  noOptionsText?: string;
  options: ISelectOption2[];
  placeholder?: string;
  canClear?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const formValue = ref(props.defaultValue ?? '');

const onChange = (value: string) => {
  emit('update:modelValue', value);
};
</script>

<!-- TODO 2022-10-03 TOKU: Escalate to file with a global styles? -->
<style src="@vueform/multiselect/themes/default.css"></style>
