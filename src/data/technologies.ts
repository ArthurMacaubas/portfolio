export type TechCategory = {
  label: string;
  items: string[];
};

export const technologies: TechCategory[] = [
  { label: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"] },
  { label: "Backend", items: ["Node.js", "NestJS", "Express"] },
  { label: "Banco de dados", items: ["PostgreSQL", "SQL", "Prisma"] },
  { label: "Hardware", items: ["Arduino", "ESP32", "ESP8266"] },
  { label: "Ferramentas", items: ["Git", "GitHub"] },
];
