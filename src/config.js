require("dotenv").config({
  path: require("path").join(process.cwd(), ".env"),
})

const {
  ARTICLE_REQUEST_THROTTLE_MS,
  BIDDER_POSITION_MAX_BID_AMOUNT_CENTS_LIMIT,
  CACHE_LIFETIME_IN_SECONDS,
  CONVECTION_API_BASE,
  CONVECTION_APP_ID,
  CONVECTION_GEMINI_TEMPLATE,
  DD_TRACER_HOSTNAME,
  DD_TRACER_SERVICE_NAME,
  DELTA_API_BASE,
  DIFFUSION_API_BASE,
  DIFFUSION_TOKEN,
  DIFFUSION_REQUEST_THROTTLE_MS,
  EMBEDLY_ENDPOINT,
  EMBEDLY_KEY,
  ENABLE_ASYNC_STACK_TRACES,
  ENABLE_QUERY_TRACING,
  ENABLE_REQUEST_LOGGING,
  ENABLE_SCHEMA_STITCHING,
  GALAXY_API_BASE,
  GALAXY_TOKEN,
  GEMINI_API_BASE,
  GEMINI_ENDPOINT,
  GOOGLE_CSE_API_BASE,
  GOOGLE_CSE_CX,
  GOOGLE_CSE_KEY,
  GRAVITY_API_BASE,
  GRAVITY_GRAPHQL_ENDPOINT,
  GRAVITY_API_URL,
  GRAVITY_ID,
  GRAVITY_SECRET,
  HMAC_SECRET,
  IMPULSE_API_BASE,
  IMPULSE_APPLICATION_ID,
  LEWITT_API_BASE,
  METAPHYSICS_STAGING_ENDPOINT,
  METAPHYSICS_PRODUCTION_ENDPOINT,
  NODE_ENV,
  PORT,
  POSITRON_API_BASE,
  PREDICTION_ENDPOINT,
  QUERY_DEPTH_LIMIT,
  REDIS_URL,
  REQUEST_THROTTLE_MS,
  REQUEST_TIMEOUT_MS,
  RESIZING_SERVICE,
  SENTRY_PRIVATE_DSN,
} = process.env

const mustHave = {
  // Runtime Deps
  REDIS_URL,

  // Reliant Artsy Services
  CONVECTION_API_BASE,
  CONVECTION_APP_ID,
  DELTA_API_BASE,
  GEMINI_API_BASE,
  GEMINI_ENDPOINT,
  GRAVITY_API_BASE,
  GRAVITY_GRAPHQL_ENDPOINT,
  GRAVITY_API_URL,
  GRAVITY_ID,
  GRAVITY_SECRET,
  IMPULSE_API_BASE,
  IMPULSE_APPLICATION_ID,
  LEWITT_API_BASE,
  POSITRON_API_BASE,
}

Object.keys(mustHave).forEach((key) => {
  if (!mustHave[key]) {
    throw new Error(`You need to have the ENV var ${key} set up.`)
  }
})

export default {
  ARTICLE_REQUEST_THROTTLE_MS: Number(ARTICLE_REQUEST_THROTTLE_MS) || 600000,
  BIDDER_POSITION_MAX_BID_AMOUNT_CENTS_LIMIT:
    Number(BIDDER_POSITION_MAX_BID_AMOUNT_CENTS_LIMIT) ||
    Number.MAX_SAFE_INTEGER,
  CACHE_LIFETIME_IN_SECONDS: Number(CACHE_LIFETIME_IN_SECONDS) || 2592000, // 30 days
  CONVECTION_API_BASE,
  CONVECTION_APP_ID,
  CONVECTION_GEMINI_TEMPLATE,
  DD_TRACER_HOSTNAME: DD_TRACER_HOSTNAME || "localhost",
  DD_TRACER_SERVICE_NAME: DD_TRACER_SERVICE_NAME || "metaphysics-k8s",
  DELTA_API_BASE,
  DIFFUSION_API_BASE,
  DIFFUSION_TOKEN,
  DIFFUSION_REQUEST_THROTTLE_MS:
    Number(DIFFUSION_REQUEST_THROTTLE_MS) || 600000, // 5 minutes
  EMBEDLY_ENDPOINT,
  EMBEDLY_KEY,
  ENABLE_ASYNC_STACK_TRACES,
  ENABLE_QUERY_TRACING,
  ENABLE_REQUEST_LOGGING,
  ENABLE_SCHEMA_STITCHING,
  GALAXY_API_BASE,
  GALAXY_TOKEN,
  GEMINI_API_BASE,
  GEMINI_ENDPOINT,
  GOOGLE_CSE_API_BASE,
  GOOGLE_CSE_CX,
  GOOGLE_CSE_KEY,
  GRAVITY_API_BASE,
  GRAVITY_GRAPHQL_ENDPOINT,
  GRAVITY_API_URL,
  GRAVITY_ID,
  GRAVITY_SECRET,
  HMAC_SECRET,
  IMPULSE_API_BASE,
  IMPULSE_APPLICATION_ID,
  LEWITT_API_BASE,
  METAPHYSICS_STAGING_ENDPOINT,
  METAPHYSICS_PRODUCTION_ENDPOINT,
  NODE_ENV: NODE_ENV || "development",
  PORT: Number(PORT) || 3000,
  POSITRON_API_BASE,
  PREDICTION_ENDPOINT,
  QUERY_DEPTH_LIMIT,
  REDIS_URL,
  REQUEST_THROTTLE_MS: Number(REQUEST_THROTTLE_MS) || 5000,
  REQUEST_TIMEOUT_MS: Number(REQUEST_TIMEOUT_MS) || 5000,
  RESIZING_SERVICE,
  SENTRY_PRIVATE_DSN,
}
