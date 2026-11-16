// Campos opcionais ficam ausentes quando ainda não há evidência pública suficiente.
export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  objective?: string;
  category: string[];
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
  status?: string;
  featured?: boolean;
  published?: boolean;
};

export const projects: Project[] = [
  {
    slug: "rpg-studio",
    title: "RPG Campaign Studio",
    description:
      "Software para criação, organização e execução de campanhas de RPG.",
    longDescription:
      "O README descreve uma aplicação com campanhas, arquivos, sistemas de RPG, linha do tempo, quadro de investigação, modo jogador, importação e exportação e autenticação própria.",
    objective: "Centralizar a preparação e a execução de campanhas de RPG em uma única aplicação.",
    category: ["Web", "Full Stack"],
    technologies: ["Next.js", "TypeScript", "CSS Modules", "Node.js", "Prisma", "PostgreSQL"],
    github: "https://github.com/ArthurMacaubas/RPG-Studio",
    demo: "https://rpg-studio-rho.vercel.app/",
    status: "Em desenvolvimento",
    featured: true,
    published: true,
  },
  {
    slug: "barraca-edinfo",
    title: "BarracaEdinfo",
    description:
      "Aplicação em TypeScript com cliente, servidor, dados locais e firmware para Arduino.",
    longDescription:
      "O repositório público organiza a aplicação em cliente, servidor, código compartilhado, Drizzle e firmware para a Barraca Agostina. Não há descrição pública adicional no GitHub.",
    category: ["Full Stack", "Hardware", "Automação"],
    technologies: ["TypeScript", "JavaScript", "CSS", "Arduino"],
    github: "https://github.com/ArthurMacaubas/BarracaEdinfo",
    status: "Em desenvolvimento",
    published: true,
  },
  {
    slug: "biometry-cam",
    title: "BiometryCam",
    description:
      "Sistema de reconhecimento facial com Arduino e um computador externo.",
    longDescription:
      "O README descreve uma arquitetura híbrida: o Arduino atua como controlador e o processamento de reconhecimento facial acontece em um computador.",
    objective: "Combinar controle por hardware com processamento de visão computacional em um computador.",
    category: ["Hardware", "Automação", "Experimentos"],
    technologies: ["Arduino", "Python", "OpenCV", "pySerial", "NumPy", "face_recognition"],
    github: "https://github.com/ArthurMacaubas/BiometryCam",
    status: "Experimental",
    published: true,
  },
  {
    slug: "jogo-da-velha",
    title: "Jogo da Velha",
    description:
      "Um simples jogo da velha publicado para a web.",
    category: ["Web", "Frontend", "Experimentos"],
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/ArthurMacaubas/Jogo-da-Velha",
    demo: "https://arthurmacaubas.github.io/Jogo-da-Velha/",
    status: "Publicado",
    published: true,
  },
  {
    slug: "nacoes-sob-fogo",
    title: "Nações Sob Fogo",
    description: "Projeto de Ensino Contínuo sobre geopolítica e o conflito entre Rússia e Ucrânia.",
    category: ["Web", "Acadêmico"],
    technologies: ["HTML", "CSS"],
    github: "https://github.com/ArthurMacaubas/Nacoes-Sob-Fogo",
    demo: "https://arthurmacaubas.github.io/Nacoes-Sob-Fogo/",
    status: "Acadêmico",
    published: true,
  },
  {
    slug: "edusense",
    title: "EduSense",
    description: "",
    category: ["Web", "Hardware", "Automação"],
    technologies: [],
    published: false,
  },
  {
    slug: "barraca-agostina",
    title: "Barraca Agostina",
    description: "",
    category: ["Full Stack", "Hardware", "Automação"],
    technologies: [],
    published: false,
  },
  {
    slug: "personalfit",
    title: "PersonalFit",
    description: "",
    category: ["Web", "Frontend", "Backend"],
    technologies: [],
    published: false,
  },
];
