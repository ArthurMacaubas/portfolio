import RevealOnScroll from "@/components/RevealOnScroll/RevealOnScroll";
import { profile } from "@/data/profile";
import styles from "./GithubCTA.module.css";

// Integração futura: esta seção está isolada e recebe apenas `profile.github`,
// então pode futuramente ser trocada por uma versão que consome a API pública
// do GitHub (ex: GET https://api.github.com/users/Arthur-macaubas/repos)
// para listar repositórios automaticamente, sem alterar o restante do layout.
export default function GithubCTA() {
  return (
    <section className={`section ${styles.github}`}>
      <div className="container">
        <RevealOnScroll>
          <h2 className={styles.heading}>Mais projetos, experimentos e código.</h2>
          <p className={styles.text}>Tudo o que não cabe no portfólio está no GitHub.</p>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Visitar GitHub
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
