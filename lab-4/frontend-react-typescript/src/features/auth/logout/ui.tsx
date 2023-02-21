import { Button, Form, Icon } from "shared/ui";
import { onFinish } from "./model";

export const Logout = () => {
  return (
    <Form onFinish={onFinish}>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<Icon.LogoutOutlined />}
          size={"middle"}
        >
          Logout
        </Button>
      </Form.Item>
    </Form>
  );
};

export {};
