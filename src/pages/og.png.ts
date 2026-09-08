import type { APIRoute } from "astro";

import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import { createOgImage } from "@/lib/og-image";

export const prerender = true;

export const GET: APIRoute = async () =>
    new Response(
        await createOgImage({
            title: SITE_TITLE,
            description: SITE_DESCRIPTION,
            label: "MINITTUPOYO",
        }),
        { headers: { "Content-Type": "image/png" } },
    );
