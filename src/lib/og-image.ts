import { createElement } from "react";
import { render } from "takumi-js";
import { googleFonts } from "takumi-js/helpers";

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
}

export async function createOgImage({
    title,
    description,
    label = "BLOG",
}: OgImageOptions) {
    return render(
        createElement(
            "div",
            {
                style: {
                    backgroundColor: "#ffffff",
                    color: "#1f2937",
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "Inter, Noto Sans JP",
                    height: "100%",
                    position: "relative",
                    width: "100%",
                },
            },
            createElement("div", {
                style: {
                    backgroundColor: "#3151d4",
                    height: "8px",
                    left: "76px",
                    position: "absolute",
                    top: "116px",
                    width: "64px",
                },
            }),
            createElement(
                "div",
                {
                    style: {
                        alignItems: "center",
                        color: "#3151d4",
                        display: "flex",
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "20px",
                        fontWeight: 700,
                        left: "76px",
                        letterSpacing: "0.16em",
                        position: "absolute",
                        top: "148px",
                    },
                },
                label,
            ),
            createElement(
                "div",
                {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        left: "76px",
                        position: "absolute",
                        right: "76px",
                        top: "198px",
                    },
                },
                createElement(
                    "div",
                    {
                        style: {
                            display: "flex",
                            fontSize: "60px",
                            fontWeight: 700,
                            letterSpacing: "-0.04em",
                            lineHeight: 1.3,
                            maxHeight: "234px",
                            overflow: "hidden",
                        },
                    },
                    title,
                ),
                description &&
                    createElement(
                        "div",
                        {
                            style: {
                                color: "#4b5563",
                                display: "flex",
                                fontSize: "28px",
                                lineHeight: 1.5,
                                marginTop: "28px",
                                maxHeight: "84px",
                                overflow: "hidden",
                            },
                        },
                        description,
                    ),
            ),
        ),
        { fonts: await fonts, height: HEIGHT, width: WIDTH },
    );
}
