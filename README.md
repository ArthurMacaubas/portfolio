# Portfólio — Arthur Pietro

Portfólio pessoal construído com Next.js (App Router) + TypeScript + CSS
Modules + Framer Motion + three.js (React Three Fiber), sem Tailwind.

Visual minimalista escuro com cenas 3D em tempo real, scroll suave,
preloader, cursor customizado e várias transições guiadas pelo scroll.

## Estrutura do projeto

```
src/
  app/            → rotas do Next.js (layout, página inicial, SEO)
  components/     → peças reutilizáveis
    Scene3D/      → cenas 3D (HeroScene, ChipScene, TechSphere, WaveScene)
                    e o LazyCanvas, que só cria o canvas perto da tela e
                    pausa a renderização fora dela
    SmoothScroll/ → scroll suave com Lenis (também nos links #âncora)
    Preloader/    → contador de entrada com cortina
    CustomCursor/ → cursor em duas camadas (use data-cursor="Texto" para
                    mostrar um rótulo ao passar o mouse)
    SplitReveal/  → revela títulos palavra por palavra
    ScrollWords/  → parágrafo que "acende" conforme o scroll
    Marquee/      → faixa infinita que reage à velocidade do scroll
    Magnetic/, Counter/, ProjectCard/, Navbar/, Footer/
  sections/       → Hero, About, Projects, Technologies, Process, Contact
  data/           → conteúdo editável: profile.ts, projects.ts,
                    technologies.ts, process.ts
  lib/            → hooks utilitários
  styles/         → variables.css com os tokens de design
public/
  projects/       → imagens de preview dos projetos
```

`app/page.tsx` apenas importa e organiza as seções — para reordenar a página,
basta mudar a ordem ali.

## Efeitos e cenas 3D

- **Hero:** nó de vidro com refração e aberração cromática
  (`MeshTransmissionMaterial`), órbitas e partículas; segue o mouse e gira
  ao rolar a página.
- **Sobre:** microchip procedural com dados fluindo pelas trilhas; gira com
  o scroll.
- **Projetos:** no desktop a seção fica presa e o scroll vertical move os
  cards na horizontal; cards com inclinação 3D e holofote no mouse.
- **Tecnologias:** esfera de tecnologias (arraste para girar no desktop).
- **Contato:** onda de partículas em shader que reage ao mouse.

Todas as cenas são geradas por código — nenhum modelo ou textura é baixado.
Com `prefers-reduced-motion` ativo, o scroll suave, o preloader, o cursor e
as animações contínuas são desligados.

## Bibliotecas utilizadas

- **Next.js 14** (App Router) — framework React, SSG e SEO
- **TypeScript** — tipagem em todo o projeto
- **CSS Modules** — estilos isolados por componente
- **Framer Motion** — animações e transições ligadas ao scroll
- **three.js + @react-three/fiber + @react-three/drei** — cenas 3D
- **Lenis** — scroll suave
- `next/font/google` para **Space Grotesk**, **Inter** e **JetBrains Mono**

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
  github: "https://github.com/ArthurMacaubas/repo",
  demo: "https://...", // opcional
}
```

Nenhum componente precisa ser alterado — o card é gerado automaticamente.

## Como trocar imagens

Coloque o arquivo em `public/projects/` e referencie o caminho (começando
com `/`) no campo `image` do projeto correspondente em `projects.ts`. O
favicon fica em `public/favicon.ico` (adicione o seu arquivo ali).

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
   `ArthurMacaubas`).
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
