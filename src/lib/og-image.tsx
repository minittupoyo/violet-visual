import { createElement } from "react";
import { render } from "takumi-js";
import { googleFonts } from "takumi-js/helpers";
import stylesheet from "@/styles/global.css?inline";
import { loadDefaultJapaneseParser } from 'budoux';
const parser = loadDefaultJapaneseParser();

const WIDTH = 1200;
const HEIGHT = 630;

// Takumi maps the Unicode ranges returned by Google Fonts to the matching
// glyphs, so Japanese titles render without bundling a multi-megabyte font.
const fonts = googleFonts([
    { name: "Inter", weight: [400, 700] },
    { name: "JetBrains Mono", weight: [400, 700] },
    { name: "Noto Sans JP", weight: [400, 700] },
]);

interface OgImageOptions {
    title: string;
    description?: string;
    label?: string;
    date?: Date;
}

export async function createOgImage({
    title,
    description,
    label = "BLOG",
    date
}: OgImageOptions) {
    return render(
        <div className="bg-white flex items-center w-full h-full">
            <div className="mx-auto w-full max-w-5xl px-6">
                {date && (
                    <p className="font-[JetBrains_Mono] text-lg text-blue-600 mb-4">{date.toLocaleDateString("ja-JP")}</p>
                )}
                <h2 className="text-5xl font-bold line-clamp-3 break-all">{parser.parse(title)}</h2>
                {description && (
                    <p className="text-2xl line-clamp-2 text-zinc-600 mt-6 break-all">{parser.parse(description)}</p>
                )}
            </div>
        </div>,
        { fonts: await fonts, height: HEIGHT, width: WIDTH, css: stylesheet },
    );
}
