import { useAuthContext } from "entities/auth";
import { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "shared/ui";
import { Icon } from "shared/ui";
import { onFinish, onFinishFailed } from "./model";

export const Register = () => {
  const { signUp } = useAuthContext();
  const [error, setError] = useState("");

  const [api, contextHolder] = notification.useNotification();
  const notify = ({
    message,
    description = "",
    icon = <Icon.WarningOutlined />,
  }: {
    message: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
  }) => {
    api.info({
      message: message,
      description: description,
      placement: "top",
      icon: icon,
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
          signUp(values).then((err) => {
            if (!!err) {
              notify({
                message: "Sorry, error occured while signing up",
                description: err.response.data.error,
                icon: <Icon.WarningTwoTone twoToneColor="#ff2323" />,
              });
            } else {
              notify({
                message: "You have successfully signed up!",
                description: (
                  <>
                    <Button href="/">Log In now!</Button>
                  </>
                ),
                icon: <Icon.CheckCircleTwoTone twoToneColor="#52c41a" />,
              });
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
          name="name"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<Icon.UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
