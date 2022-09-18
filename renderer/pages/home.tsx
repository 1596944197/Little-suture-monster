import styles from "@/public/style/home.module.scss";
import { useRef } from "react";

function Home() {
  const files = useRef<HTMLInputElement>();

  const beforeUpload = async () => {
    const target = files.current;
    const fileList = target.files;
    for (let i = 0; i < fileList.length; i++) {
      const fromData = new FormData();
      fromData.append("file", fileList[i], fileList[i].name);
      const data: {
        code: string;
        path: string;
      } = await fetch("http://127.0.0.1:3000/upload", {
        method: "post",
        body: fromData,
      }).then(async (s) => s.json());

      const img = new Image();
      img.src = data.path;
      files.current.insertAdjacentElement("afterend", img);
    }
  };

  return (
    <section className={styles.container}>
      <input
        ref={files}
        type="file"
        placeholder="请选择文件"
        onChange={beforeUpload}
        multiple
        accept="image/*,video/*"
      />
    </section>
  );
}

export default Home;
