import styles from "./page.module.css";
import ClientComponent from "@/components/client-component";
import ServerComponent from "@/components/ServerComponent";

export default function Home() {
  return (
    <div className={styles.page}>
      <ClientComponent>
        <ServerComponent/>
      </ClientComponent>
      인덱스 페이지
    </div>
  );
}
