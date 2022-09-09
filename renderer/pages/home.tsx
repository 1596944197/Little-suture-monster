import { useScalableBox } from "@/hooks/useScalableBox";
import styles from "@/public/style/home.module.scss";
import { useRef } from "react";

function Home() {
  const aside = useRef<HTMLDivElement>();
  useScalableBox(aside);

  return (
    <>
      <aside ref={aside} className={styles.container}></aside>
    </>
  );
}

export default Home;
