/**
 * Kills whatever process is holding port 3000 (or PORT env var).
 * Runs silently — if nothing is on the port, it's a no-op.
 */
const { execSync } = require("child_process");
const PORT = process.env.PORT || 3000;

try {
  const out = execSync("netstat -ano", { encoding: "utf8" });
  const regex = new RegExp(`TCP.*:${PORT}\\s+.*LISTENING\\s+(\\d+)`);
  const match = out.match(regex);
  if (match) {
    const pid = match[1];
    execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
    console.log(`✅ Freed port ${PORT} (killed PID ${pid})`);
  }
} catch {
  // Nothing to kill or command unavailable — carry on
}
