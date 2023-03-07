import { useState } from "react";
import { Button, Form, Icon, InputNumber, Space } from "shared/ui";
import { onFormSubmit } from "./model";

export type FormProps = {
  x: { min: number; max: number };
  y: { min: number; max: number };
  r: { min: number; max: number };
};

export const SelectViaForm = ({ x, y, r }: FormProps) => {
  const [result, setResult] = useState<boolean | null>(null);
  return (
    <>
      <Form
        name="x"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={(values) => {
          setResult(onFormSubmit(values));
        }}
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
            onChange={(value: number | null) => {
              setResult(null);
            }}
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
            onChange={(value: number | null) => {
              setResult(null);
            }}
          />
        </Form.Item>

        <Form.Item
          name="r"
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
              onChange={(value: number | null) => {
                setResult(null);
              }}
            />
          </Space.Compact>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit point
          </Button>
          {result !== null && result ? (
            <Icon.CheckCircleOutlined color="green" />
          ) : (
            <Icon.ClockCircleOutlined color="red" />
          )}
        </Form.Item>
      </Form>
    </>
  );
};
