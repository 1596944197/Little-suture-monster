import styles from "@/public/style/tree.module.scss";
import { useEffect, useRef } from "react";

type TreeData = Array<{
  title: string;
  id: string;
  children?: TreeData;
}>;

function Tree({ list, ...props }: { list: TreeData }) {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    const container = ref.current;
    container.childNodes.forEach((item: HTMLDivElement) => {
      item.style.marginBottom =
        (item.nextElementSibling as HTMLDivElement)?.clientHeight + "px";
    });
  }, []);

  const renderElementByTreeData = (list: TreeData = []) => {
    return (
      <>
        {list.map((item) => (
          <div className={styles["tree-node"]} key={item.id}>
            <span className={styles.title}>{item.title}</span>
            {item.children ? renderElementByTreeData(item.children) : null}
          </div>
        ))}
      </>
    );
  };
  return (
    <div className={styles["tree-content"]} ref={ref}>
      {renderElementByTreeData(list)}
    </div>
  );
}

export default Tree;
