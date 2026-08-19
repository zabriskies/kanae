// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://example.com', // ← 独自ドメインが決まったら変更してください
  integrations: [mdx()],
});
