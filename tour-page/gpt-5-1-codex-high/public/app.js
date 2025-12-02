(() => {
  const translations = {
    ru: {
      eyebrow: "Комфортные маршруты 55+",
      title: "Планировщик поездок по Ленобласти",
      subtitle: "1–3 дня без спешки: мало лестниц, короткие переезды, резерв на дождливую погоду.",
      formTitle: "Настройки поездки",
      daysLabel: "Сколько дней?",
      mobilityLabel: "Темп и подвижность",
      mobilityLow: "Мало лестниц и короткие переходы",
      mobilityMedium: "Спокойный темп, можно пару лестниц",
      budgetLabel: "Бюджет",
      budgetBudget: "Эконом",
      budgetStandard: "Стандарт",
      budgetComfort: "Комфорт",
      seedLabel: "Детерминированный seed (необязательно)",
      buildButton: "Сформировать маршрут",
      hint: "Мы не обращаемся к внешним сервисам — вся информация из локального набора.",
      resultTitle: "Ваш маршрут",
      loading: "Строим маршрут...",
      totals: "Всего",
      travel: "Дорога",
      budget: "Бюджет",
      rainyTitle: "На случай дождя",
      altEmpty: "Все дождевые варианты уже в маршруте — можно добавить кофейню по пути.",
      errorPrefix: "Ошибка:",
      mobilityNote: "Короткие переезды, минимум ступенек."
    },
    en: {
      eyebrow: "Comfort itineraries 55+",
      title: "Leningrad Oblast Trip Planner",
      subtitle: "1–3 calm days: short transfers, low stairs, rainy-day backups.",
      formTitle: "Trip settings",
      daysLabel: "How many days?",
      mobilityLabel: "Pace & mobility",
      mobilityLow: "Low stairs and short walks",
      mobilityMedium: "Easy pace, a few stairs are fine",
      budgetLabel: "Budget",
      budgetBudget: "Budget",
      budgetStandard: "Standard",
      budgetComfort: "Comfort",
      seedLabel: "Deterministic seed (optional)",
      buildButton: "Build itinerary",
      hint: "No external services — everything comes from local mock data.",
      resultTitle: "Your itinerary",
      loading: "Building itinerary...",
      totals: "Total",
      travel: "Travel",
      budget: "Budget",
      rainyTitle: "Rainy-day alternatives",
      altEmpty: "Rainy options are already included — add a cozy cafe en route.",
      errorPrefix: "Error:",
      mobilityNote: "Short transfers, minimal stairs."
    }
  };

  let currentLang = "ru";
  const form = document.getElementById("plan-form");
  const results = document.getElementById("results");
  const statusEl = document.getElementById("status");
  const rainyEl = document.getElementById("rainy");
  const seedLabel = document.getElementById("seed-label");
  const langButtons = document.querySelectorAll(".lang-btn");

  function t(key) {
    return translations[currentLang][key] || key;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      const value = t(key);
      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
        node.placeholder = value;
        return;
      }
      node.textContent = value;
    });
    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
  }

  function formatMinutes(mins) {
    if (currentLang === "en") {
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60;
      return `${hours}h ${minutes}m`;
    }
    return `${mins} мин`;
  }

  function formatRub(amount) {
    const formatter = new Intl.NumberFormat(currentLang === "en" ? "en-US" : "ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0
    });
    return formatter.format(amount);
  }

  function renderDay(day) {
    const stops = day.segments
      .map(
        (s) => `
          <li>
            <strong>${s.name}</strong> · ${s.city}
            <div class="meta">${s.description}</div>
            <div class="meta">${t("travel")}: ${formatMinutes(
          s.baseTravelMinutes
        )} · ${t("budget")}: ${formatRub(s.estimatedCostRub)}</div>
            <div class="meta">${s.indoor ? "☂️" : "☀️"} · ${
          s.lowStairs ? "✓" : "⚠️"
        } · ${s.tags.join(", ")}</div>
          </li>
        `
      )
      .join("");

    return `
      <div class="day">
        <div class="day-header">
          <h3>${day.day}. ${day.title}</h3>
          <div class="pill">${formatRub(day.estimatedBudgetRub)}</div>
        </div>
        <div class="meta">${day.summary}</div>
        <div class="meta">${t("travel")}: ${formatMinutes(day.travelMinutes)}</div>
        <ul class="segments">${stops}</ul>
      </div>
    `;
  }

  function renderRainy(alternatives) {
    if (!alternatives.length) {
      rainyEl.innerHTML = `<p class="meta">${t("altEmpty")}</p>`;
      return;
    }
    const items = alternatives
      .map(
        (a) => `
          <li>
            <strong>${a.name}</strong> · ${a.city}
            <div class="meta">${a.description}</div>
          </li>
        `
      )
      .join("");
    rainyEl.innerHTML = `
      <p class="alt-header">${t("rainyTitle")}</p>
      <ul class="segments">${items}</ul>
    `;
  }

  function showError(message) {
    statusEl.innerHTML = `<div class="error">${t("errorPrefix")} ${message}</div>`;
    results.innerHTML = "";
    rainyEl.innerHTML = "";
  }

  async function loadPlan() {
    statusEl.textContent = t("loading");
    results.innerHTML = "";
    rainyEl.innerHTML = "";

    const formData = new FormData(form);
    const params = new URLSearchParams({
      days: formData.get("days"),
      mobility: formData.get("mobility"),
      budget: formData.get("budget"),
      lang: currentLang
    });
    const seed = formData.get("seed");
    if (seed) params.append("seed", seed);

    try {
      const res = await fetch(`/api/itineraries?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        showError(data.error || "Unexpected error");
        return;
      }
      seedLabel.textContent = `seed: ${data.seedUsed}`;
      const daysHtml = data.days.map(renderDay).join("");
      const totals = `
        <div class="meta"><strong>${t("totals")}:</strong> ${t("travel")} ${formatMinutes(
        data.totals.travelMinutes
      )} · ${t("budget")} ${formatRub(data.totals.estimatedBudgetRub)}</div>
      `;
      results.innerHTML = daysHtml + totals;
      statusEl.textContent = data.baseCity
        ? `${data.baseCity}. ${t("mobilityNote")}`
        : t("mobilityNote");
      renderRainy(data.rainyDayAlternatives || []);
    } catch (err) {
      showError(err.message);
    }
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      applyTranslations();
      loadPlan();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    loadPlan();
  });

  applyTranslations();
  loadPlan();
})();
