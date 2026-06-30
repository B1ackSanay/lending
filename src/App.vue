<template>
  <div>
    <header>
      <div class="header-container">
        <a href="/" class="logo-link">
          <div class="logo">
            <img :src="logo" alt="СофтАрт" />
          </div>
        </a>
        <nav>
          <a href="?service=landing">Лендинги</a>
          <a href="?service=corporate">Корпоративные</a>
          <a href="?service=shop">Магазины</a>
          <a href="?service=seo">Поддержка</a>
          <a href="#projects">Проекты</a>
        </nav>
      </div>
    </header>

    <section class="hero" id="hero">
      <h1>Разработка, размещение, поддержка и<br />продвижение интернет-проектов</h1>
      <p>SoftArt - полный цикл: лендинги, интернет-магазины, корпоративные порталы на TALL stack. Каждая заявка сразу в вашу CRM.</p>
      <div class="hero-buttons">
        <button class="btn-primary" @click="openModal('general')">Подать заявку</button>
        <button class="btn-secondary" @click="scrollToServices">Наши сервисы</button>
      </div>
    </section>

    <!-- Контент услуги из URL -->
    <ServicesTabs ref="servicesRef" :openModal="openModal" :serviceType="currentService" />

    <section class="projects" id="projects">
      <h2>Реализованные проекты</h2>
      <div class="projects-grid">
        <a href="https://sushi-karate.ru" target="_blank" class="project-tag">sushi-karate.ru</a>
        <a href="https://sportliga.com" target="_blank" class="project-tag">sportliga.com</a>
        <a href="https://archiland.biz" target="_blank" class="project-tag">archiland.biz</a>
        <a href="https://prof-poligraf.ru" target="_blank" class="project-tag">prof-poligraf.ru</a>
        <a href="https://volgara.ru" target="_blank" class="project-tag">volgara.ru</a>
        <a href="https://solyanka-shop.ru" target="_blank" class="project-tag">solyanka-shop.ru</a>
        <a href="https://elconnect.ru" target="_blank" class="project-tag">elconnect.ru</a>
        <a href="https://optoves.ru" target="_blank" class="project-tag">optoves.ru</a>
        <a href="https://pirog52.ru" target="_blank" class="project-tag">pirog52.ru</a>
        <a href="https://uvelpak.ru" target="_blank" class="project-tag">uvelpak.ru</a>
        <a href="https://implant-dentavi.ru" target="_blank" class="project-tag">implant-dentavi.ru</a>
        <a href="https://volgalin.ru" target="_blank" class="project-tag">volgalin.ru</a>
      </div>
    </section>

    <RequestModal 
      :isOpen="isModalOpen" 
      :serviceType="selectedService"
      @close="closeModal" 
    />

    <footer>
      <div class="footer-container">
        <p>© 2025 Интернет-компания «СофтАрт»</p>
        <p>Разработка сайтов, CRM и интернет-проектов</p>
      </div>
    </footer>
  </div>
</template>

<script>
import RequestModal from './components/RequestModal.vue'
import ServicesTabs from './components/ServicesTabs.vue'
import logo from './components/assets/logo.svg'

export default {
  name: 'App',
  components: {
    RequestModal,
    ServicesTabs
  },
  data() {
    return {
      isModalOpen: false,
      selectedService: '',
      logo
    }
  },
  computed: {
    currentService() {
      const params = new URLSearchParams(window.location.search)
      const service = params.get('service')
      const valid = ['landing', 'corporate', 'shop', 'seo']
      return service && valid.includes(service) ? service : 'landing'
    }
  },
  methods: {
    openModal(serviceType = 'general') {
      this.selectedService = serviceType
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
      this.selectedService = ''
    },
    scrollToServices() {
      const el = document.getElementById('services')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f8f8f8;
    color: #1d2338;
    min-width: 320px;
}

/* ===== АДАПТИВНАЯ ШАПКА ===== */
header {
    height: 90px;
    background: #ffffff;
    padding: 0 20px;
}

.header-container {
    max-width: 1420px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
}

.logo img {
    height: 42px;
    width: auto;
    display: block;
}

nav {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
}

nav a {
    text-decoration: none;
    color: #163f65;
    font-size: 16px;
    font-weight: 500;
    transition: .2s;
    white-space: nowrap;
}

nav a:hover {
    opacity: .7;
}

/* ===== ГЕРОЙ ===== */
.hero {
    background: #dcecf8;
    padding: 80px 20px;
    text-align: center;
}

.hero h1 {
    font-size: clamp(32px, 5vw, 62px);
    font-weight: 700;
    line-height: 1.3;
    color: #1e4f78;
}

.hero p {
    max-width: 800px;
    margin: 30px auto 0;
    font-size: clamp(16px, 1.5vw, 22px);
    line-height: 1.6;
    color: #606060;
}

.hero-buttons {
    margin-top: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    padding: 0 30px;
    height: 54px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: .2s;
    border: none;
    text-decoration: none;
    text-align: center;
    line-height: 1;
}

.btn-primary {
    background: #0b87cf;
    color: #ffffff;
}

.btn-primary:hover {
    background: #1e4f78;
    box-shadow: 0 8px 28px rgba(11, 135, 207, 0.3);
}

.btn-secondary {
    background: transparent;
    border: 1.5px solid #4a4a4a;
    color: #4a4a4a;
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, .5);
    border-color: #0b87cf;
    color: #0b87cf;
}

/* ===== ПРОЕКТЫ ===== */
.projects {
    padding: 0 20px 90px;
    max-width: 1400px;
    margin: 0 auto;
}

.projects h2 {
    text-align: center;
    font-size: clamp(28px, 3vw, 36px);
    font-weight: 700;
    color: #1e4f78;
    margin-bottom: 55px;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px 30px;
}

.project-tag {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #9bb3c9;
    border-radius: 50px;
    text-decoration: none;
    color: #1e4f78;
    font-size: 14px;
    font-weight: 500;
    transition: .2s;
    padding: 0 16px;
    text-align: center;
}

.project-tag:hover {
    background: #f3f8fc;
}

/* ===== ФУТЕР ===== */
footer {
    background: #051c44;
    padding: 45px 20px;
    color: #ffffff;
}

.footer-container {
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
}

.footer-container p:first-child {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
}

.footer-container p:last-child {
    font-size: 14px;
    opacity: .8;
}

/* ===== АДАПТИВ ===== */
@media (max-width: 1024px) {
    .header-container {
        padding: 0 15px;
    }
    
    nav {
        gap: 20px;
    }
}

@media (max-width: 768px) {
    .header-container {
        flex-wrap: wrap;
        justify-content: center;
        padding: 10px 0;
        height: auto;
    }

    header {
        height: auto;
        padding: 15px 0;
    }

    nav {
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
    }

    nav a {
        font-size: 14px;
        white-space: normal;
        padding: 4px 8px;
    }

    .hero {
        padding: 50px 16px;
    }

    .hero h1 {
        font-size: 28px;
    }
    
    .hero p {
        font-size: 16px;
        margin-top: 20px;
    }

    .btn-primary,
    .btn-secondary {
        min-width: 160px;
        height: 48px;
        font-size: 14px;
    }

    .projects-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 14px 20px;
    }
    
    .project-tag {
        font-size: 13px;
        height: 44px;
        padding: 0 12px;
    }
}

@media (max-width: 480px) {
    header {
        padding: 10px 0;
    }
    
    .header-container {
        gap: 10px;
    }
    
    .logo img {
        height: 32px;
    }
    
    nav {
        gap: 8px;
    }
    
    nav a {
        font-size: 12px;
        padding: 3px 6px;
    }
    
    .hero {
        padding: 40px 12px;
    }
    
    .hero h1 {
        font-size: 24px;
    }
    
    .hero p {
        font-size: 14px;
        margin-top: 16px;
    }
    
    .hero-buttons {
        gap: 12px;
        margin-top: 30px;
        flex-direction: column;
        align-items: center;
    }

    .btn-primary,
    .btn-secondary {
        min-width: 200px;
        width: 100%;
        max-width: 280px;
        height: 44px;
        font-size: 13px;
    }

    .projects {
        padding: 0 12px 60px;
    }
    
    .projects h2 {
        font-size: 24px;
        margin-bottom: 35px;
    }

    .projects-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .project-tag {
        font-size: 12px;
        height: 38px;
        padding: 0 8px;
        border-radius: 50px;
    }

    footer {
        padding: 30px 16px;
    }
    
    .footer-container p:first-child {
        font-size: 14px;
    }
    
    .footer-container p:last-child {
        font-size: 12px;
    }
}

@media (max-width: 360px) {
    nav {
        gap: 4px;
    }
    
    nav a {
        font-size: 11px;
        padding: 2px 4px;
    }
    
    .hero h1 {
        font-size: 20px;
    }
    
    .projects-grid {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
    }
    
    .project-tag {
        font-size: 11px;
        height: 34px;
        padding: 0 6px;
    }
}
</style>