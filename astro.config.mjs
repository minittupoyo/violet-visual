// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import { satteri } from "@astrojs/markdown-satteri";
import { satteriBreaks } from "@minittupoyo/satteri-breaks";

// https://astro.build/config
export default defineConfig({
    site: "https://blog.minittu.net",
    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [
        icon(),
        react(),
        ...(import.meta.env.PROD ? [] : [keystatic()]),
    ],
    markdown: {
        processor: satteri({
            mdastPlugins: [satteriBreaks],
        }),
    },
});
