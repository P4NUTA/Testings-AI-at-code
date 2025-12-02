const { setTimeout } = require("timers");

async function main() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch("http://localhost:3000/health", { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Unexpected status: ${response.status}`);
    }
    const body = await response.json();
    if (body.status !== "ok") {
      throw new Error("Service unhealthy payload");
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Healthcheck failed:", err.message);
    process.exit(1);
  } finally {
    clearTimeout(timer);
  }
}

main();
