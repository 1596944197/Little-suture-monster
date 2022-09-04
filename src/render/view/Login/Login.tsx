import { login, register } from "@/render/api/account/account";
import { Form, Input, Button, Message } from "@arco-design/web-react";
import React, { useState } from "react";
const FormItem = Form.Item;

const App = () => {
  const [form] = Form.useForm();
  const [loginState, setLoginState] = useState(false);
  const [registerState, setRegisterState] = useState(false);
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");

  const onRegisterClick = async () => {
    try {
      await form.validate();
      setRegisterState(true);
      const { success, msg } = await register({ account, password });
      setRegisterState(false);
      success ? Message.success(msg) : Message.error(msg);
    } catch (error) {
      console.warn(error);
    }
  };

  const onLoginClick = async () => {
    try {
      await form.validate();
      setLoginState(true);
      login({ account, password });
      setLoginState(false);
    } catch (error) {
      console.warn(error);
    }
  };

  const generateItems = () => {
    interface ItemType {
      label?: string;
      field?: string;
      required?: boolean;
      rules?: AnyArray;
      childrenComponent: () => JSX.Element;
    }
    const itemList: ItemType[] = [
      {
        label: "账号",
        field: "account",
        required: true,
        rules: [{ required: true }],
        childrenComponent: () => (
          <Input defaultValue="ces" onChange={setAccount} placeholder="请输入账号" />
        ),
      },
      {
        label: "密码",
        required: true,
        field: "password",
        rules: [
          {
            validator(value, cb: (str?: any) => void) {
              if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/.test(value)) {
                return cb("密码需包含字母和数字");
              }
              return cb();
            },
            required: true,
          },
        ],
        childrenComponent: () => (
          <Input.Password
            defaultValue="abc123"
            onChange={setPassword}
            placeholder="请输入密码"
          />
        ),
      },
      {
        childrenComponent: () => (
          <>
            <Button
              loading={loginState}
              onClick={onLoginClick}
              type="primary"
              style={{ marginRight: 40, marginTop: 20 }}
            >
              登录
            </Button>
            <Button loading={registerState} onClick={onRegisterClick} status="success">
              注册
            </Button>
          </>
        ),
      },
    ];
    return itemList.map(({ label, required, childrenComponent, rules, field }, index) => {
      if (index !== 2) {
        return (
          <FormItem
            key={index}
            label={label}
            required={required}
            rules={rules}
            field={field}
          >
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
        form={form}
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
