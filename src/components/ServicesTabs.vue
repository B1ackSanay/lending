<template>
  <section class="services-section" id="services">
    <div class="container">
      <!-- Заголовок секции -->
      <div class="section-header">
        <h2 class="section-title">Наши услуги</h2>
        <p class="section-subtitle">Полный цикл разработки интернет-проектов под ключ</p>
      </div>

      <!-- Выбранная услуга -->
      <div class="service-card">
        <div class="service-card-inner">
          <div class="service-text">
            <h3>{{ currentServiceData.title }}</h3>
            <p class="service-description">{{ currentServiceData.description }}</p>
            <ul class="service-features">
              <li v-for="feature in currentServiceData.features" :key="feature">
                <span class="check">✓</span> {{ feature }}
              </li>
            </ul>
            <button class="btn-primary" @click="openModalWithService(currentServiceData.type)">
              {{ currentServiceData.buttonText }}
            </button>
          </div>
          <div class="service-icon-wrapper">
            <img :src="currentServiceData.icon" :alt="currentServiceData.title" class="service-icon" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import landingIcon from './assets/icons/landing.svg'
import corporateIcon from './assets/icons/corporate.svg'
import shopIcon from './assets/icons/shop.svg'
import seoIcon from './assets/icons/seo.svg'

export default {
  name: 'ServicesSection',
  props: {
    openModal: Function,
    serviceType: {
      type: String,
      default: 'landing'
    }
  },
  data() {
    return {
      services: {
        landing: {
          type: 'landing',
          title: 'Лендинги',
          description: 'Высококонверсионные одностраничные сайты для рекламных кампаний. Быстрая загрузка, адаптивный дизайн, интеграция с CRM и формами.',
          features: [
            'Адаптивный дизайн под все устройства',
            'Скорость загрузки до 2 секунд',
            'Интеграция с CRM и формами',
            'SEO-оптимизация',
            'Анимация и интерактивность'
          ],
          buttonText: 'Заказать лендинг',
          icon: landingIcon
        },
        corporate: {
          type: 'corporate',
          title: 'Корпоративные сайты',
          description: 'Многофункциональные корпоративные порталы с CMS SiteSet, интеграцией с 1С и CRM, личным кабинетом клиента и многоуровневой структурой.',
          features: [
            'CMS SiteSet для управления контентом',
            'Интеграция с 1С и CRM',
            'Личный кабинет клиента',
            'Многоуровневая структура',
            'SEO-оптимизация'
          ],
          buttonText: 'Заказать сайт',
          icon: corporateIcon
        },
        shop: {
          type: 'shop',
          title: 'Интернет-магазины',
          description: 'Современные интернет-магазины с каталогами, фильтрацией, онлайн-оплатой, интеграцией с 1С и маркетплейсами.',
          features: [
            'Каталог товаров с фильтрацией',
            'Оплата через эквайринг',
            'Интеграция с 1С и маркетплейсами',
            'Личный кабинет покупателя',
            'Адаптивная мобильная версия'
          ],
          buttonText: 'Заказать магазин',
          icon: shopIcon
        },
        seo: {
          type: 'seo',
          title: 'Поддержка и SEO',
          description: 'Комплексное ведение проектов, хостинг в реестре РФ, техническая поддержка 24/7 и продвижение сайтов в поисковых системах.',
          features: [
            'SEO-продвижение в ТОП',
            'Хостинг из реестра РФ',
            'Техническая поддержка 24/7',
            'SLA и гарантии',
            'Аналитика и отчеты'
          ],
          buttonText: 'Заказать поддержку',
          icon: seoIcon
        }
      }
    }
  },
  computed: {
    currentServiceData() {
      const valid = ['landing', 'corporate', 'shop', 'seo']
      const type = valid.includes(this.serviceType) ? this.serviceType : 'landing'
      return this.services[type]
    }
  },
  methods: {
    openModalWithService(type) {
      if (this.openModal) {
        this.openModal(type)
      }
    }
  }
}
</script>

<style scoped>
.services-section {
  padding: 70px 20px 90px;
  background: #f8fafc;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #1e4f78;
  margin-bottom: 10px;
}

.section-subtitle {
  font-size: 18px;
  color: #7a8fa5;
}

.service-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 48px 50px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #edf2f7;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-card-inner {
  display: flex;
  align-items: center;
  gap: 50px;
}

.service-text {
  flex: 1;
}

.service-text h3 {
  font-size: 28px;
  font-weight: 700;
  color: #1d2338;
  margin-bottom: 14px;
}

.service-description {
  color: #555;
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 24px;
}

.service-features {
  list-style: none;
  padding: 0;
  margin-bottom: 32px;
}

.service-features li {
  padding: 6px 0;
  font-size: 15px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 12px;
}

.check {
  color: #0b87cf;
  font-weight: 700;
  font-size: 18px;
  width: 22px;
  flex-shrink: 0;
}

.service-icon-wrapper {
  flex-shrink: 0;
  width: 180px;
  height: 180px;
  background: #eef6fc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon {
  width: 90px;
  height: 90px;
  object-fit: contain;
}

.btn-primary {
  padding: 14px 40px;
  border: none;
  border-radius: 50px;
  background: #0b87cf;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(11, 135, 207, 0.2);
}

.btn-primary:hover {
  background: #1e4f78;
  box-shadow: 0 8px 28px rgba(11, 135, 207, 0.3);
}

@media (max-width: 768px) {
  .service-card {
    padding: 32px 24px;
  }

  .service-card-inner {
    flex-direction: column-reverse;
    text-align: center;
    gap: 30px;
  }

  .service-features li {
    justify-content: center;
  }

  .service-icon-wrapper {
    width: 140px;
    height: 140px;
  }

  .service-icon {
    width: 70px;
    height: 70px;
  }

  .section-title {
    font-size: 28px;
  }

  .section-subtitle {
    font-size: 16px;
  }

  .service-text h3 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 50px 14px 60px;
  }

  .service-card {
    padding: 24px 16px;
    border-radius: 18px;
  }

  .service-icon-wrapper {
    width: 100px;
    height: 100px;
  }

  .service-icon {
    width: 50px;
    height: 50px;
  }

  .service-text h3 {
    font-size: 20px;
  }

  .service-features li {
    font-size: 14px;
  }

  .btn-primary {
    width: 100%;
    padding: 14px 20px;
    font-size: 15px;
  }

  .section-title {
    font-size: 24px;
  }
}
</style>