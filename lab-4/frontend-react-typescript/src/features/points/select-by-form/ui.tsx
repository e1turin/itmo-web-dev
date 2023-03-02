import { Button, Form, Icon, InputNumber, Space } from "shared/ui";
import { onFinish } from "./model";

type SelectByFormProps = {
  x: { min: number; max: number };
  y: { min: number; max: number };
  r: { min: number; max: number };
};

export const SelectByForm = ({ x, y, r }: SelectByFormProps) => {
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
            prefix={"X"}
            placeholder={`${x.min}≤ x ≤${x.max}`}
            style={{ width: "100%" }}
            min={x.min}
            max={x.max}
            step={0.01}
          />
        </Form.Item>

        <Form.Item
          name="y"
          rules={[{ required: true, message: "Input Y coordinate!" }]}
        >
          <InputNumber
            prefix={"Y"}
            placeholder={`${y.min}≤ y ≤${y.max}`}
            style={{ width: "100%" }}
            min={y.min}
            max={y.max}
            step={0.01}
          />
        </Form.Item>

        <Form.Item
          name="y"
          rules={[{ required: true, message: "Input R parameter!" }]}
        >
          <Space.Compact block>
            <InputNumber
              prefix={"R"}
              placeholder={`${r.min}≤ r ≤${r.max}`}
              style={{ width: "100%" }}
              min={r.min}
              max={r.max}
              step={1}
              addonBefore={
                <Button type="primary">
                  <Icon.MinusOutlined />
                </Button>
              }
              addonAfter={
                <Button type="primary" danger>
                  <Icon.PlusOutlined />
                </Button>
              }
            />
          </Space.Compact>
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
