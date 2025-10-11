import posthog from "posthog-js";
// PostHog initialization NEXT_PUBLIC_POSTHOG_KEY
posthog.init('phc_DCvNPIvppVcLFFmJ9iMAjcp8D8EQOHtL2a4acP3G2Ci', {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  defaults: '2025-05-24',
  capture_exceptions: true, // This enables capturing exceptions using Error Tracking
  debug: process.env.NODE_ENV === "development",
});