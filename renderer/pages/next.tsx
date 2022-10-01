import Tree from "@/components/Tree";

import { useState } from "react";
import { Tree as ATree } from "@arco-design/web-react";

function renderId() {
  return Math.random() + "";
}

const customData = [
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
];
const TreeData = [
  {
    title: "Trunk 0-0",
    key: "0-0",
    children: [
      {
        title: "Branch 0-0-2",
        key: "0-0-2",
        selectable: false,
        children: [
          {
            title: "Leaf",
            key: "0-0-2-1",
          },
        ],
      },
    ],
  },
  {
    title: "Trunk 0-1",
    key: "0-1",
  },
];

function App() {
  const [treeData] = useState(TreeData);
  return (
    <div className="tree">
      <Tree list={customData} />
      <hr />
      <ATree defaultSelectedKeys={["0-0-1"]} treeData={treeData} />
    </div>
  );
}

export default App;
