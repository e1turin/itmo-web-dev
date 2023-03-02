import { Space } from "antd";
import { Register } from "features/auth/register";
import { PageTemplate } from "pages/template";

export const RegisterPage = () => {
  return (
    <PageTemplate>
      <Space align="center" direction="vertical">
        <Register />
      </Space>
    </PageTemplate>
  );
};
