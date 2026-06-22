<template>
  <div class="dadata-wrapper">
    <label>Компания *</label>
    <input
      ref="inputRef"
      type="text"
      :value="modelValue"
      @input="onInput"
      @focus="isFocused = true"
      @blur="onBlur"
      placeholder="Введите название или ИНН компании"
    />
    
    <div v-if="isFocused && suggestions.length > 0" class="suggestions-dropdown">
      <div
        v-for="suggestion in suggestions"
        :key="suggestion.data.inn"
        class="suggestion-item"
        @mousedown.prevent="selectSuggestion(suggestion)"
      >
        <div class="suggestion-name">{{ suggestion.value }}</div>
        <div class="suggestion-details">
          <span>ИНН: {{ suggestion.data.inn }}</span>
        </div>
      </div>
    </div>
    
    <span class="error" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'DaDataCompanyInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    apiKey: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: [],
      isFocused: false
    }
  },
  methods: {
    async onInput(event) {
      const value = event.target.value
      this.$emit('update:modelValue', value)
      
      if (value.length < 2) {
        this.suggestions = []
        return
      }
      
      if (!this.apiKey) {
        return
      }
      
      try {
        const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.apiKey
          },
          body: JSON.stringify({ 
            query: value, 
            count: 10 
          })
        })
        
        const data = await response.json()
        this.suggestions = data.suggestions || []
      } catch {
        this.suggestions = []
      }
    },
    
    selectSuggestion(suggestion) {
      this.$emit('update:modelValue', suggestion.value)
      this.suggestions = []
      this.$emit('company-selected', {
        name: suggestion.value,
        inn: suggestion.data.inn
      })
    },
    
    onBlur() {
      setTimeout(() => {
        this.isFocused = false
      }, 200)
    }
  }
}
</script>

<style scoped>
.dadata-wrapper {
  position: relative;
  width: 100%;
}

.dadata-wrapper label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #1d2338;
}

.dadata-wrapper input {
  width: 100%;
  padding: 14px 18px;
  border: 1.5px solid #d7dce0;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  font-family: inherit;
  transition: border-color .2s, box-shadow .2s;
  background: #fafcfe;
}

.dadata-wrapper input:focus {
  border-color: #0b87cf;
  box-shadow: 0 0 0 4px rgba(11, 135, 207, 0.08);
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1.5px solid #d7dce0;
  border-top: none;
  border-radius: 0 0 25px 25px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.suggestion-item {
  padding: 12px 18px;
  cursor: pointer;
  border-bottom: 1px solid #f0f4f8;
  transition: background .2s;
}

.suggestion-item:hover {
  background: #f3f8fc;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-name {
  font-weight: 500;
  color: #1d2338;
  margin-bottom: 4px;
}

.suggestion-details {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #888;
}

.error {
  display: block;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 6px;
  min-height: 18px;
  padding-left: 4px;
}
</style>