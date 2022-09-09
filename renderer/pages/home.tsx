import styles from "@/public/style/home.module.scss";
import { useEffect, useRef } from "react";

let isDraping = false;
function Home() {
  const aside = useRef<HTMLDivElement>();
  useEffect(() => {
    document.documentElement.onmousedown = ({ target, clientX }) => {
      if (target === aside.current) {
        const that = aside.current;
        that.clientWidth - clientX <= 50 && (isDraping = true);
      }
    };
    document.documentElement.onmousemove = ({
      clientX,
      target,
    }: MouseEvent) => {
      const that: HTMLDivElement = aside.current;
      if (target === that && that.clientWidth - clientX <= 50)
        that.style.cursor = "e-resize";
      requestAnimationFrame(() => {
        if (isDraping) {
          that.style.width = clientX + "px";
        }
      });
    };
    document.documentElement.onmouseup = () => (isDraping = false);
  }, []);
  return (
    <>
      <aside ref={aside} className={styles.container}>
        <h2>测试</h2>
      </aside>
    </>
  );
}

export default Home;
