import type { APIRoute } from "astro";

import { getPosts } from "@/lib/posts";
import { createOgImage } from "@/lib/og-image";

export const prerender = true;

export async function getStaticPaths() {
    const posts = await getPosts();
    return posts.map((entry) => ({
        params: { slug: entry.id },
        props: { entry },
    }));
}

export const GET: APIRoute = async ({ props }) => {
    const { entry } = props;
    return new Response(
        await createOgImage({
            title: entry.data.title,
            description: entry.data.description,
        }),
        { headers: { "Content-Type": "image/png" } },
    );
};
