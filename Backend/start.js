import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import fs from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const envPath = path.resolve(__dirname, "..", ".env")

// Load .env if it exists (local development)
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
} else {
  // Otherwise load from current directory or environment
  dotenv.config()
}

const { default: app } = await import("./app.js")

const PORT = app.get("port") || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})