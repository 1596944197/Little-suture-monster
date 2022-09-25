import Tree from "@/components/Tree";

function App() {
  function renderId() {
    return Math.random() + "";
  }
  return (
    <div className="tree">
      <Tree
        list={[
          {
            title: "第一级",
            id: renderId(),
            children: [
              {
                title: "第二级",
                id: renderId(),
                children: [{ title: "操", id: renderId() }],
              },
              {
                title: "第二级222",
                id: renderId(),
                children: [
                  { title: "操", id: renderId() },
                  {
                    title: "大学生",
                    id: renderId(),
                    children: [
                      {
                        title: "大妹子",
                        id: renderId(),
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: "第一级2",
            id: renderId(),
            children: [
              {
                title: "罗小欸",
                id: "lll",
              },
            ],
          },
          {
            title: "第一级3",
            id: renderId(),
            children: [],
          },
        ]}
      />
    </div>
  );
}

export default App;
