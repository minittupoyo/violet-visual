# みにっつ

[みにっつ](https://xn--j9jct3f.jp)の個人ブログです。Web、Linux、AI、自作 PC、ゲーム、音楽などについて書いています。

Astro で静的サイトを生成し、Cloudflare Workers から配信します。ブログ記事は Markdown で管理し、ローカル開発時には Keystatic の管理画面も利用できます。

## 技術構成

- [Astro](https://astro.build/) 7
- Tailwind CSS 4 / daisyUI
- Keystatic（ローカル記事編集）
- Satteri（Markdown 処理・リンクカード）
- Cloudflare Workers（静的アセット配信と ListenBrainz API のプロキシ）

## 必要環境

- [Bun](https://bun.sh/)
- Node.js 22.12.0 以降（`package.json` の `engines` に準拠）

## セットアップと開発

```sh
bun install
bun dev
```

開発サーバーは通常 `http://localhost:4321` で起動します。Keystatic は開発時のみ有効で、`/keystatic` から記事を編集できます。

本リポジトリの開発環境でバックグラウンド起動する場合は、次を使います。

```sh
astro dev --background
```

状態確認・ログ確認・停止はそれぞれ `astro dev status`、`astro dev logs`、`astro dev stop` です。

## コマンド

| コマンド | 内容 |
| --- | --- |
| `bun dev` | 開発サーバーを起動 |
| `bun run build` | 本番用ファイルを `dist/` に出力 |
| `bun run preview` | ビルド結果をローカルで確認 |
| `bun astro …` | Astro CLI を実行 |

## 記事の追加

記事は `content/blog/<slug>/index.md` に置きます。先頭に以下の frontmatter を記載してください。

```md
---
title: 記事タイトル
description: 記事の説明
date: 2026-09-10
tags:
  - Astro
draft: false
---

本文
```

`draft: true` の記事は公開一覧から除外されます。画像は `content/assets/images/blog/` に配置し、記事から相対パスで参照します。Keystatic を使う場合は `/keystatic` から同じ内容を編集できます。

## デプロイ

最初に静的ファイルをビルドします。

```sh
bun run build
```

`wrangler.jsonc` は `dist/` を Cloudflare Workers のアセットとして配信し、`/api/listenbrainz/*` のみを Worker で処理します。カバーアート取得を有効にするには、Worker 環境変数 `LISTENBRAINZ_TOKEN` に ListenBrainz のトークンを設定してください。

## ライセンス

ソースコードは [MIT License](LICENSE) です。

特記がない限り、`content/blog/` 内のオリジナル記事は [CC BY 4.0](CONTENT-LICENSE.md) です。画像、動画、引用、埋め込みコンテンツなど第三者に権利があるものは対象外です。
