import Link from "next/link";

import styles from './styles.module.css';

export default function Header() {
    return (
        <nav className={styles.header}>
            <Link href="/">Almost Cosmic</Link>
        </nav>
    )
}