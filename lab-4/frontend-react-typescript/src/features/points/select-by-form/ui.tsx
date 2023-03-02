import { Button, Form, Icon, Input, InputNumber } from "shared/ui";
import { onFinish } from "./model";

export const SelectByForm = () => {
  return (
    <>
      <Form
        name="x"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="x"
          rules={[{ required: true, message: "Input X coordinate!" }]}
        >
          <InputNumber
            prefix={<Icon.UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="z"
          rules={[{ required: true, message: "Input Y coordinate!" }]}
        >
          <InputNumber
            prefix={<Icon.UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="y"
          rules={[{ required: true, message: "Input R parameter!" }]}
        >
          <InputNumber
            prefix={<Icon.UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit point
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
