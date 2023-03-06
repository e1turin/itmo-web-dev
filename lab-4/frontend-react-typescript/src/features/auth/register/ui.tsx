import { useAuthContext } from "entities/auth";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from "shared/ui";
import { Icon } from "shared/ui";
import { onFinish, onFinishFailed } from "./model";

export const Register = () => {
  const { signUp } = useAuthContext();
  const [error, setError] = useState("");
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={(values) => {
        onFinish(values);
        signUp(values).then((err) => {
          if (!!err) {
            setError(err.message);
          }
        });
      }}
      onFinishFailed={(values) => {
        onFinishFailed(values);
      }}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<Icon.MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<Icon.UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<Icon.LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
      </Form.Item>
      {!!error ? <Form.Item>{error}</Form.Item> : ""}
    </Form>
  );
};
