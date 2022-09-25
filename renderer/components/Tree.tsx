import styles from "@/public/style/tree.module.scss";

type TreeData = Array<{
  title: string;
  id: string;
  children?: TreeData;
}>;

function Tree({ list, ...props }: { list: TreeData }) {
  const renderElementByTreeData = (list: TreeData = []) => {
    return (
      <>
        {list.map((item) => (
          <div className={styles["tree-node"]} key={item.id}>
            <div className={styles.title}>{item.title}</div>
            {item.children ? renderElementByTreeData(item.children) : null}
          </div>
        ))}
      </>
    );
  };
  return (
    <div className={styles["tree-content"]}>
      {renderElementByTreeData(list)}
    </div>
  );
}

export default Tree;
