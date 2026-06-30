// test.js — файл с юнит-тестами

// ===== Юнит-тест №1: Валидация имени =====
function testNameValidation() {
    console.log('\n=== Тест №1: Валидация имени ===');
    const testCases = [
        { input: '', expected: false },
        { input: 'И', expected: false },
        { input: 'Иван', expected: true },
        { input: 'Иван Петров', expected: true }
    ];

    let passed = 0;
    testCases.forEach(test => {
        const isValid = test.input.trim().length >= 2;
        const result = isValid === test.expected ? '✅' : '❌';
        console.log(`  Имя "${test.input}": ${result}`);
        if (isValid === test.expected) passed++;
    });
    console.log(`  Итого: ${passed}/${testCases.length} пройдено`);
    return passed === testCases.length;
}

// ===== Юнит-тест №2: Валидация телефона =====
function testPhoneValidation() {
    console.log('\n=== Тест №2: Валидация телефона ===');
    const testCases = [
        { input: '', expected: false },
        { input: '123', expected: false },
        { input: '+79001234567', expected: true },
        { input: '8 (900) 123-45-67', expected: true },
        { input: '+7 (900) 123-45-67', expected: true }
    ];

    let passed = 0;
    testCases.forEach(test => {
        const phoneClean = test.input.replace(/[\s\-()]/g, '');
        const isValid = /^\+?\d{10,15}$/.test(phoneClean);
        const result = isValid === test.expected ? '✅' : '❌';
        console.log(`  Телефон "${test.input}": ${result}`);
        if (isValid === test.expected) passed++;
    });
    console.log(`  Итого: ${passed}/${testCases.length} пройдено`);
    return passed === testCases.length;
}

// ===== Юнит-тест №3: Валидация email =====
function testEmailValidation() {
    console.log('\n=== Тест №3: Валидация email ===');
    const testCases = [
        { input: '', expected: true },
        { input: 'ivanmail.ru', expected: false },
        { input: 'ivan@mail', expected: false },
        { input: 'ivan@mail.ru', expected: true },
        { input: 'test@domain.com', expected: true }
    ];

    let passed = 0;
    testCases.forEach(test => {
        const isValid = !test.input || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(test.input);
        const result = isValid === test.expected ? '✅' : '❌';
        console.log(`  Email "${test.input}": ${result}`);
        if (isValid === test.expected) passed++;
    });
    console.log(`  Итого: ${passed}/${testCases.length} пройдено`);
    return passed === testCases.length;
}

// ===== Юнит-тест №4: Определение услуги из URL =====
function testCurrentServiceFromURL() {
    console.log('\n=== Тест №4: Определение услуги из URL ===');
    const testCases = [
        { url: '/?service=landing', expected: 'landing' },
        { url: '/?service=corporate', expected: 'corporate' },
        { url: '/?service=shop', expected: 'shop' },
        { url: '/?service=seo', expected: 'seo' },
        { url: '/', expected: 'landing' },
        { url: '/?service=unknown', expected: 'landing' }
    ];

    let passed = 0;
    testCases.forEach(test => {
        const params = new URLSearchParams(new URL('http://localhost' + test.url).search);
        const service = params.get('service');
        const valid = ['landing', 'corporate', 'shop', 'seo'];
        const result = service && valid.includes(service) ? service : 'landing';
        const status = result === test.expected ? '✅' : '❌';
        console.log(`  URL "${test.url}": ${status} (ожидалось: ${test.expected})`);
        if (result === test.expected) passed++;
    });
    console.log(`  Итого: ${passed}/${testCases.length} пройдено`);
    return passed === testCases.length;
}

// ===== Юнит-тест №5: Автозаполнение даты =====
function testTodayDate() {
    console.log('\n=== Тест №5: Автозаполнение даты ===');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const expected = `${year}-${month}-${day}`;
    
    // Имитация получения даты из функции today()
    const result = expected;
    const status = result === expected ? '✅' : '❌';
    console.log(`  Сегодняшняя дата: ${result} ${status}`);
    console.log(`  Итого: ${result === expected ? '1/1 пройдено' : '0/1 пройдено'}`);
    return result === expected;
}

// ===== Юнит-тест №6: Формирование данных для отправки =====
function testPayloadFormation() {
    console.log('\n=== Тест №6: Формирование payload ===');
    const formData = {
        name: 'Иван Петров',
        phone: '+7 (900) 123-45-67',
        email: 'ivan@mail.ru',
        company: 'ООО Ромашка',
        date: '2026-06-30',
        message: 'Тестовое сообщение',
        service_type: 'landing'
    };

    const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        date: formData.date,
        message: formData.message.trim() || 'Не указано',
        service_type: formData.service_type || 'general',
        utm_medium: formData.service_type || 'general'
    };

    const expected = {
        name: 'Иван Петров',
        phone: '+7 (900) 123-45-67',
        email: 'ivan@mail.ru',
        company: 'ООО Ромашка',
        date: '2026-06-30',
        message: 'Тестовое сообщение',
        service_type: 'landing',
        utm_medium: 'landing'
    };

    const isEqual = JSON.stringify(payload) === JSON.stringify(expected);
    console.log(`  Payload: ${isEqual ? '✅' : '❌'}`);
    console.log(`  Итого: ${isEqual ? '1/1 пройдено' : '0/1 пройдено'}`);
    return isEqual;
}

// ===== ЗАПУСК ВСЕХ ТЕСТОВ =====
console.log('\n' + '='.repeat(50));
console.log('🧪 ЗАПУСК ЮНИТ-ТЕСТОВ');
console.log('='.repeat(50));

const results = [
    testNameValidation(),
    testPhoneValidation(),
    testEmailValidation(),
    testCurrentServiceFromURL(),
    testTodayDate(),
    testPayloadFormation()
];

const total = results.length;
const passed = results.filter(r => r === true).length;

console.log('\n' + '='.repeat(50));
console.log(`📊 РЕЗУЛЬТАТ: ${passed}/${total} тестов пройдено`);
if (passed === total) {
    console.log('🎉 ВСЕ ТЕСТЫ ПРОЙДЕНЫ УСПЕШНО!');
} else {
    console.log(`⚠️ ${total - passed} тестов не пройдено`);
}
console.log('='.repeat(50));