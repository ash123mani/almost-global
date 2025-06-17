import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
      <main className={styles.main}>
         <Link href="/search">Search Country Details by country name</Link>
          <Link href="/search">Search Country Details by country phone code</Link>
          <Link href="/search">Search Country Details by country code</Link>
      </main>
  );
}
