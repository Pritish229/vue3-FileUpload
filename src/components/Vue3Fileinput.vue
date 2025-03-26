<template>
    <div>
      <!-- Drag and Drop Zone -->
      <div
        class="drop-zone"
        :class="{
          'error-border error-file': errorMessage || inValid,
          dragging: isDragging,
        }"
        @click="triggerFileInput"
        @dragover.prevent="dragOver"
        @dragleave.prevent="dragLeave"
        @drop.prevent="dropFile"
      >
        <!-- Placeholder when no file is selected -->
        <div v-if="!preview" :class="{ 'placeholder-error': inValid, placeholder: !inValid }">
          <slot name="icon">
            <i class="fas fa-upload upload-icon fs-4"></i>
          </slot>
          <p class="upload-text">{{ placeholder }}</p>
        </div>
  
        <!-- Preview -->
        <div v-else class="preview">
          <img :src="preview" :alt="fileTypeLabel" class="preview-image" />
        </div>
  
        <!-- Hidden File Input -->
        <input type="file" ref="fileInput" @change="handleFile" hidden :accept="acceptedFileTypes" />
      </div>
  
      <!-- Error Message -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <!-- Helper Text -->
      <p v-else-if="helperText" class="helper-text">{{ helperText }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, watch } from 'vue'
  
  // Define Props
  const props = defineProps({
    modelValue: File,
    required: Boolean,
    fileType: {
      type: Array,
      default: () => ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'text/plain'],
    },
    placeholder: {
      type: String,
      default: 'Drag and drop a file here',
    },
    helperText: {
      type: String,
      default: '',
    },
    maxSize: {
      type: Number,
      default: 2 * 1024 * 1024,
    },
    maxFiles: {
      type: Number,
      default: 1,
    },
    inValid: Boolean,
  })
  
  // Emit Events
  const emit = defineEmits(['update:modelValue', 'file-reset'])
  
  // State Variables
  const preview = ref(null)
  const fileInput = ref(null)
  const errorMessage = ref('')
  const isFileValid = ref(true)
  const selectedFile = ref(props.modelValue || null)
  const isDragging = ref(false)
  const acceptedFileTypes = props.fileType.join(',')
  const fileTypeLabel = ref('')
  
  // Watch for modelValue changes
  watch(
    () => props.modelValue,
    (newFile) => {
      if (newFile) {
        generatePreview(newFile)
      } else {
        resetFile()
      }
    }
  )
  
  const triggerFileInput = () => {
    fileInput.value.click()
  }
  
  const dragOver = (event) => {
    event.dataTransfer.dropEffect = 'copy'
    isDragging.value = true
  }
  
  const dragLeave = () => {
    isDragging.value = false
  }
  
  const dropFile = (event) => {
    isDragging.value = false
    const file = event.dataTransfer.files[0]
    processFile(file)
  }
  
  const handleFile = (event) => {
    const file = event.target.files[0]
    processFile(file)
  }
  
  const processFile = (file) => {
    if (!file) return
  
    if (!props.fileType.includes(file.type)) {
      showError(`Invalid file type. Only ${props.fileType.join(', ')} allowed.`)
      return
    }
  
    const maxSizeMB = (props.maxSize / (1024 * 1024)).toFixed(2)
    if (file.size > props.maxSize) {
      showError(`File is too large. Maximum size is ${maxSizeMB}MB.`)
      return
    }
  
    errorMessage.value = ''
    isFileValid.value = true
    selectedFile.value = file
    emit('update:modelValue', file)
  
    generatePreview(file)
  }
  
  const generatePreview = (file) => {
    const reader = new FileReader()
  
    if (file.type.startsWith('image/')) {
      reader.onload = (e) => {
        preview.value = e.target.result
        fileTypeLabel.value = 'Preview'
      }
      reader.readAsDataURL(file)
    } else {
      preview.value = ''
      fileTypeLabel.value = 'File Preview'
    }
  }
  
  const showError = (message) => {
    resetFile()
    errorMessage.value = message
    isFileValid.value = false
  }
  
  const resetFile = () => {
    preview.value = null
    selectedFile.value = null
    errorMessage.value = ''
    isFileValid.value = true
    emit('update:modelValue', null)
    emit('file-reset')
  }
  
  defineExpose({ resetFile, selectedFile, isFileValid, preview })
  </script>
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
  
  <style scoped>
  :root [data-topbar='dark'] .upload-icon {
    filter: invert(1);
  }
  
  :root [data-topbar='dark'] .upload-text {
    color: #e3e4e6;
  }
  
  .placeholder-error {
    color: #fd625e !important;
    background-color: transparent !important;
  }
  
  .drop-zone {
    border: 1.9px dashed #8b8787;
    border-radius: 7px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    height: 12rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    position: relative;
  }
  
  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #302e2e;
    background-color: transparent !important;
    cursor: pointer;
  }
  
  .drop-zone:hover {
    border-color: #5156be;
  }
  
  .dragging {
    background-color: #d4edda !important;
    border-color: #28a745 !important;
  }
  
  .error-border {
    border: 1.9px dashed red !important;
  }
  
  .error-message {
    color: red;
    text-align: center;
    margin-top: 5px;
    font-size: 0.9rem;
  }
  
  .upload-icon {
    font-size: 50px;
    margin-bottom: 10px;
  }
  
  .helper-text {
    color: #6c757d;
    text-align: center;
    margin-top: 8px;
    font-size: 0.9rem;
  }
  
  .preview-image {
    max-width: 100%;
    max-height: 10.9rem;
    margin-top: 10px;
  }
  </style>