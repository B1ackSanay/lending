<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="modal-close" @click="closeModal">✕</button>
      
      <h2>Оставить заявку</h2>
      
      <!-- Отображение выбранной услуги -->
      <div v-if="selectedService" class="service-badge">
        <span>Вы выбрали:</span> 
        <strong>{{ getServiceLabel(selectedService) }}</strong>
      </div>
      
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Ваше имя *</label>
          <input type="text" v-model="form.name" placeholder="Иван Петров" required>
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>
        
        <div class="form-group">
          <label>Телефон *</label>
          <input type="tel" v-model="form.phone" placeholder="+7 (900) 123-45-67" required>
          <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
        </div>
        
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="form.email" placeholder="ivan@mail.ru">
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
        
        <div class="form-group">
          <label>Компания *</label>
          <input type="text" v-model="form.company" placeholder="ООО Ромашка" required>
          <span v-if="errors.company" class="error">{{ errors.company }}</span>
        </div>
        
        <!-- Поле "Дата создания" -->
        <div class="form-group">
          <label>Дата создания</label>
          <input type="date" v-model="form.date" :min="today">
        </div>
        
        <div class="form-group">
          <label>Что нужно создать?</label>
          <textarea v-model="form.message" placeholder="Опишите ваш проект..." rows="3"></textarea>
        </div>
        
        <!-- Скрытое поле с типом услуги -->
        <input type="hidden" v-model="form.service_type">
        
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Отправка...' : 'Подать заявку' }}
        </button>
        
        <div v-if="statusMessage" :class="statusClass">
          {{ statusMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    serviceType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isSubmitting: false,
      statusMessage: '',
      statusType: '',
      form: {
        name: '',
        phone: '',
        email: '',
        company: '',
        date: '',
        message: '',
        service_type: ''
      },
      errors: {
        name: '',
        phone: '',
        email: '',
        company: ''
      },
      serviceLabels: {
        landing: 'Лендинг',
        corporate: 'Корпоративный сайт',
        shop: 'Интернет-магазин',
        seo: 'Поддержка и SEO'
      }
    }
  },
  computed: {
    statusClass() {
      return this.statusType === 'success' ? 'success-message' : 'error-message'
    },
    selectedService() {
      return this.serviceType || this.form.service_type
    },
    today() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  watch: {
    serviceType(val) {
      if (val) {
        this.form.service_type = val
      }
    },
    isOpen(val) {
      if (val) {
        this.form.date = this.today // подставляем сегодняшнюю дату при открытии
        if (this.serviceType) {
          this.form.service_type = this.serviceType
        }
      }
    }
  },
  methods: {
    getServiceLabel(type) {
      return this.serviceLabels[type] || type
    },
    closeModal() {
      this.$emit('close')
    },
    validateForm() {
      let isValid = true
      
      if (!this.form.name.trim()) {
        this.errors.name = 'Имя обязательно'
        isValid = false
      } else if (this.form.name.trim().length < 2) {
        this.errors.name = 'Минимум 2 символа'
        isValid = false
      } else {
        this.errors.name = ''
      }
      
      const phoneClean = this.form.phone.replace(/[\s\-()]/g, '')
      if (!this.form.phone.trim()) {
        this.errors.phone = 'Телефон обязателен'
        isValid = false
      } else if (!/^\+?\d{10,15}$/.test(phoneClean)) {
        this.errors.phone = 'Введите корректный номер'
        isValid = false
      } else {
        this.errors.phone = ''
      }
      
      if (this.form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'Введите корректный email'
        isValid = false
      } else {
        this.errors.email = ''
      }
      
      if (!this.form.company.trim()) {
        this.errors.company = 'Компания обязательна'
        isValid = false
      } else {
        this.errors.company = ''
      }
      
      return isValid
    },
    async submitForm() {
      if (!this.validateForm()) {
        const firstError = document.querySelector('.error:not(:empty)')
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        return
      }
      
      this.isSubmitting = true
      this.statusMessage = ''
      this.statusType = ''
      
      const payload = {
        name: this.form.name.trim(),
        phone: this.form.phone.trim(),
        email: this.form.email.trim(),
        company: this.form.company.trim(),
        date: this.form.date,
        message: this.form.message.trim() || 'Не указано',
        service_type: this.form.service_type || 'general',
        utm_medium: this.form.service_type || 'general'
      }
      
      try {
        const response = await fetch('/api/request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        
        const result = await response.json()
        
        if (response.ok) {
          this.statusType = 'success'
          this.statusMessage = '✅ Заявка успешно отправлена! Мы свяжемся с вами.'
          this.form.name = ''
          this.form.phone = ''
          this.form.email = ''
          this.form.company = ''
          this.form.message = ''
          this.form.date = this.today
          this.errors = { name: '', phone: '', email: '', company: '' }
          setTimeout(() => this.closeModal(), 3000)
        } else {
          this.statusType = 'error'
          this.statusMessage = '❌ ' + (result.message || 'Ошибка отправки')
        }
      } catch (error) {
        this.statusType = 'error'
        this.statusMessage = '❌ Ошибка соединения с сервером'
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: #fff;
  border-radius: 28px;
  padding: 40px 36px 32px;
  max-width: 580px;
  width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 30px 80px rgba(0,0,0,0.35);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  transition: 0.3s;
}

.modal-close:hover {
  color: #1d2338;
  transform: rotate(90deg);
}

.modal-content h2 {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #1e4f78;
  margin-bottom: 20px;
}

.service-badge {
  text-align: center;
  padding: 10px 16px;
  background: #e8f4fd;
  border-radius: 12px;
  margin-bottom: 24px;
  color: #163f65;
  font-size: 14px;
}

.service-badge strong {
  color: #0b87cf;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1d2338;
  margin-bottom: 4px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #d7dce0;
  border-radius: 25px;
  font-size: 15px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #0b87cf;
}

.error {
  display: block;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
}

button[type="submit"] {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 25px;
  background: #0b87cf;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 8px;
}

button[type="submit"]:hover:not(:disabled) {
  background: #1e4f78;
}

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  margin-top: 16px;
  padding: 12px;
  background: #d4edda;
  color: #155724;
  border-radius: 12px;
  text-align: center;
}

.error-message {
  margin-top: 16px;
  padding: 12px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 12px;
  text-align: center;
}

@media (max-width: 480px) {
  .modal-content {
    padding: 24px 16px 24px;
    max-height: 94vh;
  }
  
  .modal-content h2 {
    font-size: 22px;
  }
}
</style>