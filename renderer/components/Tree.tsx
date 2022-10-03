import styles from "@/public/style/tree.module.scss";
import { useEffect, useRef, useState } from "react";

type TreeData = Array<{
  title: string;
  id: string;
  children?: TreeData;
}>;

function Tree({
  list,
  onClick = () => 1,
  checkable,
  onChange = () => 1,
  ...props
}: {
  list: TreeData;
  onClick?: Function;
  checkable?: boolean;
  onChange?: Function;
}) {
  const [hiddenList, setHiddenList] = useState<string[]>([]);

  const [currentFocus, setCurrentFocus] = useState<string>();

  const [checkboxList, setCheckboxList] = useState<string[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const isHidden = (id: string) => hiddenList.includes(id);

  const getKeys = ({ id, children }: TreeData["0"], result: string[] = []) => {
    id && result.push(id);
    children?.forEach?.((item) => {
      getKeys(item, result);
    });
    return result;
  };

  useEffect(() => {
    setIsFirstLoad(false);
    !isFirstLoad && onChange(checkboxList);
  }, [checkboxList]);

  const renderElementByTreeData = (list: TreeData = []) => {
    return (
      <>
        {list.map((item) => (
          <section key={item.id} className={styles["tree-node"]}>
            {/* 控件图标 */}
            {item.children && !isHidden(item.id) ? (
              <svg
                onClick={() => setHiddenList([...hiddenList, item.id])}
                className={!item.children.length ? styles["no-child"] : null}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
              >
                <path d="M512 714.666667c-8.533333 0-17.066667-2.133333-23.466667-8.533334l-341.333333-341.333333c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.866667 317.866667-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333333 704c-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z"></path>
              </svg>
            ) : item.children ? (
              <svg
                onClick={() =>
                  setHiddenList(hiddenList.filter((t) => t !== item.id))
                }
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
              >
                <path d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z"></path>
              </svg>
            ) : null}
            <span
              className={isHidden(item.id) ? styles.hidden : null}
              key={item.id}
              onClick={(event) => {
                event.stopPropagation();
                if (!(event.target instanceof HTMLElement)) return 0;
                const target = event.target;
                if (target.localName === "svg") return 0;
                else if (target.className.includes("title")) {
                  if (currentFocus === item.id) {
                    setCurrentFocus("");
                    onClick({
                      id: item.id,
                      focus: false,
                    });
                  } else {
                    setCurrentFocus(item.id);
                    onClick({
                      id: item.id,
                      focus: true,
                    });
                  }
                }
              }}
            >
              {/* 多选框 */}
              <input
                type={"checkbox"}
                style={isHidden(item.id) ? { display: "block" } : {}}
                checked={!!checkboxList.includes(item.id)}
                onChange={() => {
                  if (checkboxList.includes(item.id)) {
                    setCheckboxList(() => {
                      const filterList = getKeys(item);
                      return checkboxList.filter(
                        (c) => !filterList.includes(c)
                      );
                    });
                  } else {
                    setCheckboxList(checkboxList.concat(getKeys(item)));
                  }
                }}
                className={styles.checkBox}
              ></input>
              <span
                style={{
                  display: isHidden(item.id) ? "block" : null,
                  color: currentFocus === item.id ? "rgb(22,93,255)" : null,
                }}
                className={styles.title}
              >
                {item.title}
              </span>
              {item.children ? renderElementByTreeData(item.children) : null}
            </span>
          </section>
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
