import { useState } from "react";
import { useDispatch } from "react-redux";
import { defaultPoint, R_values } from "shared/api/types";
import { Button, Form, Icon, InputNumber, Radio } from "shared/ui";
import { onFormSubmit } from "./model";
import { Point } from "shared/api/types";
import { selectR } from "entities/attempt";

export type FormProps = {
  x: { min: number; max: number };
  y: { min: number; max: number };
  r: { min: number; max: number };
};

export const SelectViaForm = ({ x, y, r }: FormProps) => {
  const [result, setResult] = useState<boolean | null>(null);
  const dispatch = useDispatch<any>();

  const onFormValuesChange = ({ r }: Point) => {
    dispatch(selectR(r));
  };

  return (
    <>
      <Form
        name="x"
        className="login-form"
        initialValues={defaultPoint}
        onValuesChange={onFormValuesChange}
        onFinish={onFormSubmit(dispatch)}
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
          <Radio.Group>
            {R_values.map((value: number) => {
              return <Radio.Button value={value}>{value}</Radio.Button>;
            })}
          </Radio.Group>
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
