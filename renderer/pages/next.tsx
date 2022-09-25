import Tree from "@/components/Tree";

function App() {
  return (
    <div className="tree">
      <Tree
        list={[
          {
            title: "第一级",
            id: Math.random() + "",
            children: [
              {
                title: "第二级",
                id: Math.random() + "",
                children: [{ title: "操", id: Math.random() + "" }],
              },
            ],
          },
          {
            title: "第一级2",
            id: Math.random() + "",
            children: [
              {
                title: "罗小欸",
                id: "lll",
              },
            ],
          },
          {
            title: "第一级3",
            id: Math.random() + "",
            children: [],
          },
        ]}
      />
    </div>
  );
}

export default App;
