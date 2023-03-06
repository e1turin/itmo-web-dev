import { useAuthContext } from "entities/auth";
import { useState } from "react";
import { Input, Form, Button, Checkbox } from "shared/ui";
import { Icon } from "shared/ui";
import { onFinish } from "./model";

export const Login = () => {
  const { signIn } = useAuthContext();
  const [error, setError] = useState(null);
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={(values) => {
        onFinish(values);
        signIn(values).then((err) => {
          setError(err.message);
        });
      }}
    >
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
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
        Or <a href="/register">register now!</a>
      </Form.Item>
      {!!error ? <Form.Item>{error}</Form.Item> : ""}
    </Form>
  );
};
