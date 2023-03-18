import Typography from "antd/es/typography/Typography";
import { useAuthContext } from "entities/auth";
import { useState } from "react";
import { Input, Form, Button, Checkbox, notification } from "shared/ui";
import { Icon } from "shared/ui";
import { onFinish } from "./model";

export const Login = () => {
  const { signIn } = useAuthContext();
  const [error, setError] = useState(null);

  const [api, contextHolder] = notification.useNotification();
  const notify = ({
    message,
    description = "",
  }: {
    message: React.ReactNode;
    description?: React.ReactNode;
  }) => {
    api.info({
      message: message,
      description: description,
      placement: "top",
      icon: <Icon.WarningTwoTone twoToneColor="#ff2323" />,
    });
  };

  return (
    <>
      {contextHolder}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={(values) => {
          onFinish(values);
          signIn(values).then((err) => {
            if (!!err) {
              notify({
                message: "Sorry, error occured while signing up",
                description: err.response.data.error,
              });
            } else {
              notify({
                message: "You have successfully signed up!",
                description: <Button href="/">Log In now!</Button>,
              });
            }
          });
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
      </Form>
    </>
  );
};
