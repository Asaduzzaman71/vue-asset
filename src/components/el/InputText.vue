<template>
    <div class="mb-3">
      <!-- Label (optional) -->
      <label v-if="label" :for="inputId" class="form-label">{{ label }}</label>
  
      <!-- Bootstrap Input Field -->
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :class="['form-control', { 'is-invalid': errorMessage }]"
        @input="updateValue($event.target.value)"
        @focus="handleFocus"
        @blur="handleBlur"
      />
  
      <!-- Error Message (Bootstrap's validation feedback) -->
      <div v-if="errorMessage" class="invalid-feedback">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script setup>
  defineOptions({
    name: 'InputText',
  });
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: null,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  });
  
  const emits = defineEmits(['update:modelValue', 'change', 'focus', 'blur']);
  
  // Generate a unique ID for each input
  const inputId = `input-text-${Math.random().toString(36).substring(2, 9)}`;
  
  // Method to update the model value
  function updateValue(value) {
    emits('update:modelValue', value);
    emits('change', value);
  }
  
  // Emit focus and blur events
  function handleFocus(event) {
    emits('focus', event);
  }
  
  function handleBlur(event) {
    emits('blur', event);
  }
  </script>
  
  <style scoped>
  /* Additional customization if needed */
  </style>
  