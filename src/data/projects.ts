// Campos opcionais ficam ausentes quando ainda nao ha evidencia publica suficiente.
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
      "Software para criacao, organizacao e execucao de campanhas de RPG.",
    longDescription:
      "O README descreve uma aplicacao com campanhas, arquivos, sistemas de RPG, linha do tempo, quadro de investigacao, modo jogador, importacao e exportacao e autenticacao propria.",
    objective: "Centralizar a preparacao e a execucao de campanhas de RPG em uma unica aplicacao.",
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
      "Aplicacao em TypeScript com cliente, servidor, dados locais e firmware para Arduino.",
    longDescription:
      "O repositorio publico organiza a aplicacao em cliente, servidor, codigo compartilhado, Drizzle e firmware para a Barraca Agostina. Nao ha descricao publica adicional no GitHub.",
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
      "O README descreve uma arquitetura hibrida: o Arduino atua como controlador e o processamento de reconhecimento facial acontece em um computador.",
    objective: "Combinar controle por hardware com processamento de visao computacional em um computador.",
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
    title: "Nacoes Sob Fogo",
    description: "Projeto de Ensino Continuo sobre geopolitica e o conflito entre Russia e Ucrania.",
    category: ["Web", "Acadêmico"],
    technologies: ["HTML", "CSS"],
    github: "https://github.com/ArthurMacaubas/Nacoes-Sob-Fogo",
    demo: "https://arthurmacaubas.github.io/Nacoes-Sob-Fogo/",
    status: "Academico",
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
  {
    slug: "rpg-campaign-studio",
    title: "RPG Campaign Studio",
    description: "",
    category: ["Web", "Full Stack"],
    technologies: [],
    published: false,
  },
];
