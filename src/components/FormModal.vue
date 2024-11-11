<template>
      <div
        class="modal fade"
        :class="{ show: modelValue }"
        :style="modelValue ? 'display: block' : 'display: none'"
        tabindex="-1"
        aria-hidden="true"
      >
        <!-- Modal dialog without modal-dialog-centered -->
        <div class="modal-dialog custom-slide-down mw-850px" :style="{
        width: modalWidth
      }">
          <!-- Modal content -->
          <div class="modal-content">
            <!-- Modal header -->
            <div class="modal-header">
              <h2>{{ title }}</h2>
              <button
                type="button"
                class="btn btn-sm btn-icon btn-active-color-primary"
                @click="$emit('update:modelValue', false)"
              >
                <span class="svg-icon svg-icon-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.5"
                      x="6"
                      y="17.3137"
                      width="16"
                      height="2"
                      rx="1"
                      transform="rotate(-45 6 17.3137)"
                      fill="currentColor"
                    />
                    <rect
                      x="7.41422"
                      y="6"
                      width="16"
                      height="2"
                      rx="1"
                      transform="rotate(45 7.41422 6)"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
              <form id="kt_modal_new_card_form" class="form">
                <slot></slot>
                <div class="text-end pt-15">
                  <button
                    type="button"
                    class="btn btn-danger me-3"
                    @click="handleCancel()"
                  >
                    Cancel
                  </button>
                  <button @click="handleSubmit()" type="button" class="btn btn-primary">
                    <span class="indicator-label">Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script setup>
    defineOptions({
        name: 'FormModal',
    });
    const emits = defineEmits(['update:modelValue', 'submit', 'cancel']);
    const props = defineProps({
        modelValue: {
        type: Boolean,
        default: false,
        required: true,
        },
        title: {
        type: String,
        default: 'Modal Title',
        },
        modalWidth: {
            type: String,
            default: '850px', // Default width for modal
        }
    });
  const handleCancel = ()=>{
    emits('update:modelValue', false)
    emits('cancel')
  }
  const handleSubmit = ()=>{
    emits('submit')
  }
  </script>
  
  <style scoped>
.custom-slide-down {
  position: absolute;
  top: 20%; /* Start above the viewport */
  left: 30%;
  transform: translateX(-50%);
  opacity: 0;
  animation: slideDownAnimation 0.5s forwards;
}

@keyframes slideDownAnimation {
  0% {
    top: -200px; /* Start position (above viewport) */
    opacity: 0;
  }
  100% {
    top: 20%; /* Final position (inside viewport) */
    opacity: 1;
  }
}

.modal-content {
  background-color: #2b2b3d;
}
  </style>
  