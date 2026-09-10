import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4174', trace: 'on-first-retry' },
  webServer: [
    {
      command: 'npm.cmd run build && npm.cmd run start:api',
      url: 'http://127.0.0.1:3002/api/health',
      reuseExistingServer: true,
      env: { EMAIL_TRANSPORT: 'mock', PORT: '3002' },
    },
    {
      command: 'npm.cmd run dev:web -- --host 127.0.0.1 --port 4174 --strictPort',
      url: 'http://127.0.0.1:4174',
      reuseExistingServer: true,
      env: { VITE_API_PORT: '3002' },
    },
  ],
  projects: [
    { name: 'api', testMatch: /.*\.api\.spec\.ts/ },
    {
      name: 'desktop-chromium',
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], channel: 'msedge' },
    },
    {
      name: 'mobile-chromium',
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices['Pixel 7'], channel: 'msedge' },
    },
  ],
})
