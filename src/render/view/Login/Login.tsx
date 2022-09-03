import { Form, Input, Button } from "@arco-design/web-react";
import React, { useState } from "react";
const FormItem = Form.Item;

const App = () => {
  const [loginState, setLoginState] = useState(false);
  const [registerState, setRegisterState] = useState(false);

  const generateItems = () => {
    interface ItemType {
      label?: string;
      required?: boolean;
      childrenComponent: () => JSX.Element;
    }
    const itemList: ItemType[] = [
      {
        label: "账号",
        required: true,
        childrenComponent: () => <Input placeholder="请输入账号" />,
      },
      {
        label: "密码",
        required: true,
        childrenComponent: () => <Input.Password placeholder="请输入密码" />,
      },
      {
        childrenComponent: () => (
          <>
            <Button
              loading={loginState}
              onClick={() => setLoginState(true)}
              type="primary"
              style={{ marginRight: 40 }}
            >
              登录
            </Button>
            <Button
              loading={registerState}
              onClick={() => setRegisterState(true)}
              status="success"
            >
              注册
            </Button>
          </>
        ),
      },
    ];
    return itemList.map(({ label, required, childrenComponent }, index) => {
      if (index !== 2) {
        return (
          <FormItem key={index} label={label} required={required}>
            {childrenComponent()}
          </FormItem>
        );
      } else {
        return (
          <FormItem key={index} wrapperCol={{ offset: 5 }}>
            {childrenComponent()}
          </FormItem>
        );
      }
    });
  };
  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        style={{
          width: 550,
        }}
        autoComplete="off"
      >
        {generateItems()}
      </Form>
    </section>
  );
};

export default App;
