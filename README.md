# arana.estate

Лендинг для продажи готовых квартир после флипа в Алматы. Используется как рекламная посадочная страница для таргета (Threads, Instagram, Meta Ads).

Чистый статический сайт без сборки: HTML + CSS + минимум JS.

## Структура

```
arana-estate/
├── index.html        # главная: hero, 3 квартиры, процесс, форма
├── privacy.html      # политика конфиденциальности (РК, закон 94-V)
├── offer.html        # публичная оферта (ст. 395, 396 ГК РК)
├── styles.css        # все стили (light minimal premium)
├── script.js         # форма заявки → WhatsApp deeplink
├── vercel.json       # конфиг Vercel: чистые URL, security headers, кэш
├── images/           # ⚠ ПУСТО — нужны фото квартир (см. ниже)
└── README.md
```

## ⚠ Что нужно сделать перед запуском рекламы

### 1. Загрузить фото квартир

В папке `images/` сейчас пусто. Сайт ожидает файлы:

- `apt1-1.jpg` — Ботакоз 2/1 (Рыскулова), 2-комн, 47 700 000 ₸
- `apt2-1.jpg` — Радостовца 8, 2-комн, 49 000 000 ₸
- `apt3-1.jpg` — Радостовца 152/1, 1-комн, 30 000 000 ₸

**Без фото** — на сайте будут серые плейсхолдеры с подписями «фото 01/02/03». Это нормально для деплоя, но на рекламу так пускать нельзя.

**Рекомендации к фото:**
- горизонтальный формат (4:3 или 3:2)
- ширина минимум 1600px
- формат `.jpg` (или `.webp` — тогда поправь имя в `index.html`)
- желательно — главный «hero shot» каждой квартиры (гостиная или общий план)

### 2. Юридическая вычитка

Файлы `privacy.html` и `offer.html` собраны по шаблону под законы РК (Закон 94-V «О персональных данных», ст. 395-396 ГК РК), но **обязательно** дать на проверку юристу до пуска рекламы. Шаблон ≠ финальный документ.

### 3. Подключить аналитику (опционально, но желательно)

Перед `</head>` в `index.html` вставить:
- **Meta Pixel** (для Threads/Instagram/FB Ads) — код из Events Manager
- **Google Analytics** — код из GA4

## Локальный просмотр

```bash
cd /Users/admin/projects/arana-estate
python3 -m http.server 8000
```

Открыть http://localhost:8000

## Деплой на Vercel

### Самый быстрый путь — через веб (без CLI)

1. Открыть https://vercel.com/new
2. **«Import Project»** → нажать **«Continue with Git»** или прокрутить вниз до **«Other»** → **«Browse»**
3. Если есть GitHub:
   - сначала запушить репо (см. ниже),
   - в Vercel выбрать **«Import Git Repository»** → выбрать `arana-estate`,
   - Framework Preset: **Other** (статический сайт),
   - Build command: оставить пустым,
   - Output directory: оставить пустым (или `./`),
   - **Deploy**.
4. Через ~30 секунд сайт будет на `https://arana-estate-xxx.vercel.app`. Эту ссылку отдать таргетологу.

### Через GitHub (рекомендуется — авто-деплой при push)

```bash
cd /Users/admin/projects/arana-estate
git init
git add .
git commit -m "init: arana.estate landing"

# Создать репо на github.com (через веб) с именем arana-estate
git remote add origin https://github.com/<твой-username>/arana-estate.git
git branch -M main
git push -u origin main
```

Затем в Vercel: New Project → Import Git Repository → выбрать `arana-estate` → Deploy.

### Подключить домен arana.estate

1. Купить домен `arana.estate` (например, через namecheap.com, gandi.net или порт.kz).
2. В Vercel Dashboard → Project → Settings → Domains → Add `arana.estate`.
3. Vercel покажет DNS-записи (A или CNAME) — прописать их в панели регистратора.
4. SSL включится автоматически.

## Контакты в коде

- **WhatsApp / телефон:** `+7 701 111 33 09` → `wa.me/77011113309`. Менять в:
  - `index.html` (несколько мест)
  - `privacy.html`, `offer.html`
  - `script.js` → константа `WHATSAPP_NUMBER`

## Реквизиты

- ИП «Aranas»
- БИН/ИИН: 940112451015
- Банк: АО «Kaspi Bank»
- БИК: CASPKZKA
- КБе: 19
- IBAN: KZ36722S000003227645

Прописаны в `privacy.html` и `offer.html`.

## Что НЕ входит в этот проект

- Бэкенд (нет CRM, заявки идут напрямую в WhatsApp).
- Админка (3 квартиры, правки — в HTML).
- Платежи.
- Многоязычность (только русский).

Если в будущем захочется что-то из перечисленного — это уже отдельный проект.
