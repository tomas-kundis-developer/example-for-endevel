<template>
  <div>
    <div class="p-5 rounded-xl bg-brand-link bg-opacity-20">
      <div class="flex flex-col">
        <div class="flex justify-center text-xl font-semibold">Search parameters</div>
        <div class="mt-5 font-semibold">Loan amount:</div>
        <div class="mt-2 text-xl font-semibold">3 000 000 Kč</div>
        <div class="mt-5 font-semibold">Bank:</div>
        <div>
          <Select2
            v-model="state.selectedBank"
            :canClear="false"
            :defaultValue="props.initialSelectedBank"
            :options="bankSelectOptions"
            @change="onChange"
          />
        </div>
        <div class="mt-5 font-semibold">Fixation:</div>
        <div>
          <Select2
            v-model="state.selectedFixation"
            :canClear="false"
            :defaultValue="props.initialSelectedFixation"
            :options="fixationSelectOptions"
            @change="onChange"
          />
        </div>
        <div class="mt-5 font-semibold">Loan Term:</div>
        <div class="mt-1 mb-10">
          <Slider
            :initialValue="props.initialSelectedLoanTerm"
            :min="LOAN_TERM_MIN"
            :max="LOAN_TERM_MAX"
            @changedValue="onLoanTermChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue

import { reactive } from 'vue';

// UI components

import type { ISelectOption2 } from '@/components/ui/select2/ISelectOption2';
import Select2 from '@/components/ui/select2/Select2.vue';
import Slider from '@/components/ui/Slider.vue';

// This component

import type { IFilter } from './model/IFilter';
import { fixationSelectOptions, LOAN_TERM_MIN, LOAN_TERM_MAX } from './config';
import { bankSelectOptionsFactory } from './services/bankSelectOptionsFactory';

const props = defineProps<{
  initialSelectedBank: string;
  initialSelectedFixation: string;
  initialSelectedLoanTerm: number;
}>();

const emit = defineEmits(['change-filter']);

const state = reactive({
  selectedBank: props.initialSelectedBank,
  selectedFixation: props.initialSelectedFixation,
  selectedLoanTerm: props.initialSelectedLoanTerm,
});

const bankSelectOptions: ISelectOption2[] = bankSelectOptionsFactory();

console.log('Filter: actual state:');
console.table(state);

const emitChangeFilter = () => {
  emit('change-filter', {
    selectedBank: state.selectedBank,
    selectedFixation: state.selectedFixation,
    selectedLoanTerm: state.selectedLoanTerm,
  } as IFilter);
};

const onLoanTermChange = (value: number) => {
  state.selectedLoanTerm = value;
  emitChangeFilter();
};

const onChange = () => {
  emitChangeFilter();
};
</script>

<style lang="scss" scoped></style>
