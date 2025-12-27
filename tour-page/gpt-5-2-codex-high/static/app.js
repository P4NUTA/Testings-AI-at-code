const state = {
  days: 1,
  budget_level: "standard",
  pace: "relaxed",
  mobility: "low-stairs",
  seed: 55,
  language: "ru"
};

const i18n = {
  ru: {
    title: "Тур-планировщик 55+ по Ленинградской области",
    subtitle:
      "Спокойные маршруты на 1–3 дня: минимум пересадок, мало лестниц, понятные бюджеты и план на случай дождя.",
    days: "Сколько дней",
    budget: "Бюджет",
    pace: "Темп",
    mobility: "Мобильность",
    seed: "Детерминированный вариант",
    build: "Собрать маршрут",
    status_idle: "Заполните параметры и нажмите кнопку.",
    status_loading: "Собираем спокойный маршрут...",
    status_error: "Не удалось построить маршрут. Проверьте параметры.",
    summary_title: "Итоговый план",
    total_cost: "Суммарный бюджет",
    total_travel: "В дороге",
    day_label: "День",
    travel_label: "Дорога",
    schedule_label: "План",
    rainy_label: "На случай дождя",
    comfort_label: "Комфорт",
    pace_relaxed: "Спокойный",
    pace_easy: "Умеренный",
    pace_steady: "Деловой",
    mobility_low_stairs: "Меньше лестниц",
    mobility_mixed: "Обычный маршрут",
    budget_economy: "Эконом",
    budget_standard: "Стандарт",
    budget_comfort: "Комфорт",
    footer: "Данные локальные и предназначены для планирования без внешних API."
  },
  en: {
    title: "Tour Planner 55+ for Leningrad Oblast",
    subtitle:
      "Calm 1–3 day routes with minimal transfers, low stairs, clear budgets, and rainy-day backups.",
    days: "Days",
    budget: "Budget",
    pace: "Pace",
    mobility: "Mobility",
    seed: "Deterministic option",
    build: "Build itinerary",
    status_idle: "Set parameters and press the button.",
    status_loading: "Building a calm itinerary...",
    status_error: "Failed to build the itinerary. Check the inputs.",
    summary_title: "Plan overview",
    total_cost: "Total budget",
    total_travel: "Travel time",
    day_label: "Day",
    travel_label: "Travel",
    schedule_label: "Schedule",
    rainy_label: "Rainy-day backup",
    comfort_label: "Comfort",
    pace_relaxed: "Relaxed",
    pace_easy: "Easy",
    pace_steady: "Steady",
    mobility_low_stairs: "Fewer stairs",
    mobility_mixed: "Standard route",
    budget_economy: "Economy",
    budget_standard: "Standard",
    budget_comfort: "Comfort",
    footer: "Local data only, no external APIs used."
  }
};

const form = document.getElementById("plannerForm");
const statusEl = document.getElementById("status");
const summaryEl = document.getElementById("summary");
const cardsEl = document.getElementById("cards");
const seedInput = document.getElementById("seedInput");

function setLanguage(lang) {
  state.language = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });

  document.querySelectorAll("[data-segment='budget_level'] .segmented__btn").forEach((btn) => {
    const value = btn.getAttribute("data-value");
    btn.textContent = i18n[lang][`budget_${value}`];
  });

  document.querySelectorAll("[data-segment='pace'] .segmented__btn").forEach((btn) => {
    const value = btn.getAttribute("data-value");
    btn.textContent = i18n[lang][`pace_${value}`];
  });

  document.querySelectorAll("[data-segment='mobility'] .segmented__btn").forEach((btn) => {
    const value = btn.getAttribute("data-value");
    btn.textContent = i18n[lang][`mobility_${value.replace('-', '_')}`];
  });

  statusEl.textContent = i18n[lang].status_idle;
}

function formatRub(value, lang) {
  return new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "en-US").format(value);
}

function updateSegmented(group) {
  const buttons = Array.from(group.querySelectorAll(".segmented__btn"));
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("is-active"));
      btn.classList.add("is-active");
      const key = group.getAttribute("data-segment");
      state[key] = btn.getAttribute("data-value");
    });
  });
}

function setStatus(key, isError = false) {
  statusEl.textContent = i18n[state.language][key];
  statusEl.style.color = isError ? "#b5482e" : "";
}

function renderItinerary(data) {
  const lang = state.language;
  summaryEl.innerHTML = `
    <div class="tag">${i18n[lang].summary_title}</div>
    <div class="note">${i18n[lang].total_cost}: ${formatRub(data.totals.estimated_total_cost_rub, lang)} ₽</div>
    <div class="note">${i18n[lang].total_travel}: ${data.totals.estimated_total_travel_hours} ч</div>
    <div class="note">${data.disclaimer}</div>
  `;

  cardsEl.innerHTML = data.itinerary
    .map((day) => {
      const schedule = day.schedule
        .map(
          (item) =>
            `<li><strong>${item.name}</strong> · ${item.duration_hours} ч · ${formatRub(item.cost_rub, lang)} ₽</li>`
        )
        .join("");
      const rainy = day.rainy_day_alternatives.length
        ? day.rainy_day_alternatives
            .map((item) => `<li>${item.name}</li>`)
            .join("")
        : `<li>${lang === "ru" ? "В этом городе уже достаточно крытых локаций." : "This city already has enough indoor spots."}</li>`;

      const comfortNotes = day.comfort_notes.map((note) => `<span class="tag">${note}</span>`).join("");

      return `
        <article class="card">
          <h3>${i18n[lang].day_label} ${day.day}: ${day.city.name}</h3>
          <div class="note">${i18n[lang].travel_label}: ${day.travel.transport}, ${day.travel.travel_time_hours} ч, пересадок: ${day.travel.transfer_count}</div>
          <ul>
            <li><strong>${i18n[lang].schedule_label}</strong></li>
            ${schedule}
          </ul>
          <ul>
            <li><strong>${i18n[lang].rainy_label}</strong></li>
            ${rainy}
          </ul>
          <div class="note">${i18n[lang].comfort_label}: ${comfortNotes}</div>
          <div class="note">${formatRub(day.estimated_cost_rub.total, lang)} ₽ · ${day.estimated_time_hours.total_day} ч</div>
        </article>
      `;
    })
    .join("");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  state.seed = Number(seedInput.value || 0);
  setStatus("status_loading");
  summaryEl.innerHTML = "";
  cardsEl.innerHTML = "";

  try {
    const response = await fetch("/api/itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || error.detail || "invalid_request");
    }

    const data = await response.json();
    setStatus("status_idle");
    renderItinerary(data);
  } catch (error) {
    setStatus("status_error", true);
    summaryEl.innerHTML = `<div class="note">${error.message}</div>`;
  }
});

Array.from(document.querySelectorAll(".segmented")).forEach(updateSegmented);

document.querySelectorAll(".lang-toggle__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-toggle__btn").forEach((other) => {
      other.classList.remove("is-active");
    });
    btn.classList.add("is-active");
    setLanguage(btn.getAttribute("data-lang"));
  });
});

setLanguage("ru");
