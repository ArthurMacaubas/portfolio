import styles from "./TechBadge.module.css";

export default function TechBadge({ label }: { label: string }) {
  return <span className={styles.badge}>{label}</span>;
}
