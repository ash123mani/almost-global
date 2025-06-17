import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
      <main className={styles.main}>
          <fieldset>
              <legend>
                  Query country by
              </legend>
              <div>
                  <Link href="/search">Search Country Details by country name</Link>
              </div>
              <div>

              <Link href="/search">Search Country Details by country phone code</Link>
          </div>
              <div>

          <Link href="/search">Search Country Details by country code</Link>
      </div>

</fieldset>
      </main>
  );
}
