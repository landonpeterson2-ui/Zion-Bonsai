import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// No R2 incremental cache: the only pages that needed ISR now render per request.
export default defineCloudflareConfig({})
