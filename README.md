# Portfólio — Arthur Pietro

Portfólio pessoal construído com Next.js (App Router) + TypeScript + CSS
Modules + Framer Motion, sem Tailwind.

## Estrutura do projeto

```
src/
  app/            → rotas do Next.js (layout, página inicial, SEO)
  components/     → peças reutilizáveis (Navbar, Footer, ProjectCard, TechBadge,
                    CustomCursor, RevealOnScroll, SplineScene)
  sections/       → cada seção da página (Hero, About, Projects, Technologies,
                    Process, GithubCTA, Contact) — uma pasta por seção, com
                    o .tsx e o .module.css juntos
  data/           → conteúdo editável: profile.ts, projects.ts, technologies.ts,
                    process.ts
  lib/            → hooks utilitários (useReducedMotion, isTouchDevice)
  styles/         → variables.css com os tokens de design (cores, fontes,
                    espaçamentos)
public/
  projects/       → imagens de preview dos projetos
```

`app/page.tsx` apenas importa e organiza as seções — para reordenar a página,
basta mudar a ordem ali.

## Bibliotecas utilizadas

- **Next.js 14** (App Router) — framework React, SSR/SSG, roteamento e SEO
- **TypeScript** — tipagem em todo o projeto
- **CSS Modules** — estilos isolados por componente, sem Tailwind
- **Framer Motion** — animações (entrada suave dos elementos, reveal no
  scroll com `whileInView`, transições do menu mobile)
- `next/font/google` para carregar **Space Grotesk** (títulos) e **Inter**
  (corpo de texto) sem custo de layout shift

Todas as animações respeitam `prefers-reduced-motion` (via CSS global e via
o hook `useReducedMotion`).

## Como adicionar um novo projeto

Edite `src/data/projects.ts` e adicione um objeto ao array `projects`:

```ts
{
  slug: "novo-projeto",
  title: "Nome do Projeto",
  description: "Descrição curta do que o projeto faz.",
  category: "Categoria (ex: Web App, IoT, Mobile)",
  technologies: ["Next.js", "TypeScript"],
  image: "/projects/novo-projeto.png", // opcional
  github: "https://github.com/Arthur-macaubas/repo",
  demo: "https://...", // opcional
}
```

Nenhum componente precisa ser alterado — o card é gerado automaticamente.

## Como trocar imagens

Coloque o arquivo em `public/projects/` e referencie o caminho (começando
com `/`) no campo `image` do projeto correspondente em `projects.ts`. O
favicon fica em `public/favicon.ico` (adicione o seu arquivo ali).

## Como configurar o Spline (cena 3D da Hero)

O componente `src/components/SplineScene/SplineScene.tsx` hoje mostra um
placeholder leve (uma grade com dois pontos pulsando) e já documenta, em
comentário no topo do arquivo, o passo a passo para trocar pela cena real:

1. Exporte a cena no Spline e copie a URL pública (`.../scene.splinecode`).
2. `npm install @splinetool/react-spline`
3. Substitua o conteúdo do arquivo pelo componente `<Spline scene="..." />`
   (o comentário no arquivo já traz o código pronto para colar).
4. Carregue com `next/dynamic` e `ssr: false` para não pesar o carregamento
   inicial da página.

Assim o resto do layout continua funcionando normalmente enquanto a cena
real não estiver pronta.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

> Nota: durante `npm run build`, o Next.js baixa as fontes do Google Fonts
> na hora da build — isso exige acesso à internet no ambiente que roda o
> build (funciona normalmente na Vercel).

## Como publicar na Vercel

1. Suba o projeto para um repositório no GitHub (ex: dentro da sua conta
   `Arthur-macaubas`).
2. Acesse vercel.com, clique em "Add New… → Project" e importe o
   repositório.
3. A Vercel detecta automaticamente que é um projeto Next.js — não é
   necessário configurar nada manualmente (build command e output ficam
   no padrão).
4. Clique em "Deploy". Em poucos minutos o site estará no ar em um domínio
   `.vercel.app`.

## Como configurar um domínio próprio depois

1. No painel do projeto na Vercel, vá em **Settings → Domains**.
2. Adicione o domínio que você comprou (ex: `arthurpietro.dev`).
3. A Vercel mostra os registros DNS necessários (geralmente um registro
   `A` ou `CNAME`) — cadastre-os no painel do seu provedor de domínio.
4. Depois de propagado o DNS, atualize a constante `siteUrl` em
   `src/app/layout.tsx`, `src/app/sitemap.ts` e `src/app/robots.ts` para o
   domínio final, e faça um novo deploy.
