import { config, fields, collection } from "@keystatic/core";

export default config({
    storage: {
        kind: "local",
    },
    ui: {
        brand: {
            name: "みにっつ",
        },
    },
    collections: {
        blog: collection({
            label: "ブログ",
            path: "content/blog/*/",
            slugField: "title",
            format: { contentField: "content" },
            entryLayout: "content",
            columns: ["title", "date"],
            schema: {
                title: fields.slug({ name: { label: "タイトル" } }),
                description: fields.text({ label: "説明", multiline: false }),
                date: fields.date({
                    label: "日時",
                    defaultValue: { kind: "today" },
                }),
                tags: fields.array(fields.text({ label: "タグ" }), {
                    label: "タグ",
                    itemLabel: (props) => props.value,
                }),
                draft: fields.checkbox({
                    label: "下書き",
                    defaultValue: false,
                }),
                content: fields.mdx({
                    label: "本文",
                    extension: "md",
                    options: {
                        image: {
                            directory: "content/blog",
                            publicPath: "../",
                            transformFilename(filename) {
                                const ext = filename.split(".").pop();
                                const random = crypto
                                    .randomUUID()
                                    .replaceAll("-", "")
                                    .slice(0, 12);
                                return ext ? `${random}.${ext}` : random;
                            },
                        },
                    },
                }),
            },
        }),
    },
});
