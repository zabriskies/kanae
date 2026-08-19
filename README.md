# Studio Note — Astro + Netlify + Decap CMS スターター

ブログ（Decap CMSで更新可）・将来のショップ・Instagram連携の土台を含む、
Astroの雛形です。

## ローカルで動かす

```bash
npm install
npm run dev
```

`http://localhost:4321` で確認できます。

## デプロイ手順（Netlify）

1. このプロジェクトをGitHubに新規リポジトリとしてpush
2. Netlifyにログイン →「Add new site」→「Import an existing project」
3. さきほどのリポジトリを選択（ビルドコマンド・publishディレクトリは
   `netlify.toml` に書いてあるので自動で読み込まれます）
4. 「Deploy site」をクリックすると数十秒〜数分で公開されます

## ブログをCMSから更新できるようにする（Decap CMS）

1. Netlifyのサイト管理画面 →「Site configuration」→「Identity」→
   「Enable Identity」をクリック
2. Identityの設定画面で「Registration」を「Invite only」に変更
   （誰でも自由に登録できないようにするため）
3. 同じ画面の「Services」→「Git Gateway」で「Enable Git Gateway」を押す
4. 「Identity」タブから自分をユーザーとして招待（Invite users）→
   届いたメールのリンクからパスワードを設定
5. 公開されたサイトの `/admin/` にアクセスしてログイン
6. ログインすると管理画面が開き、「Journal（ブログ）」から
   記事の作成・編集ができます。保存するとGitHubに自動でコミットされ、
   Netlifyが自動で再ビルド・公開します

記事のフィールドは `public/admin/config.yml` で定義しています。
項目を増やしたい場合はここと `src/content.config.ts` の両方を
揃えて編集してください。

## 将来のショップ機能

`src/pages/shop.astro` にプレースホルダーがあります。

1. [Stripe](https://stripe.com) でアカウントを作成
2. 商品ごとに「Payment Links（決済リンク）」を発行
3. `shop.astro` 内の `products` 配列に `name` / `price` / `url` を追加

商品数が増えて本格的なカートが欲しくなったら
[Snipcart](https://snipcart.com)（月商$500まで無料）への移行を検討してください。

## Instagram最新投稿の表示

`src/components/InstagramSection.astro` にプレースホルダーがあります。
2026年時点、個人アカウントではAPI経由の投稿取得ができないため、
まずInstagramのアカウントを「プロアカウント」に切り替える必要があります
（無料）。

- **簡単な方法**：SnapWidget や Elfsight など無料の埋め込みウィジェット
  サービスに登録し、発行されたコードを `InstagramSection.astro` に貼り付ける
- **本格的な方法**：プロアカウント化 → Facebookページと連携 →
  Meta for Developersでアプリ登録 → アクセストークンを取得 →
  Netlify Functions（無料枠あり）でトークンを使い最新投稿を取得して表示
  （トークンには有効期限があるため、更新の仕組みも必要）

## ディレクトリ構成

```
src/
  content/blog/       ← ブログ記事（Markdown）
  content.config.ts   ← 記事のスキーマ定義
  layouts/Layout.astro
  components/         ← PostCard, InstagramSection など
  pages/
    index.astro
    blog/index.astro
    blog/[id]/index.astro
    shop.astro
public/
  admin/              ← Decap CMSの管理画面設定
```
