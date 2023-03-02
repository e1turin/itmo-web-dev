import { Space } from "antd";
import { Register } from "features/auth/register";
import { PageTemplate } from "pages/template";
import { Typography } from "shared/ui";

export const RegisterPage = () => {
  return (
    <PageTemplate
      header={<Typography.Title level={1}>Registration</Typography.Title>}
    >
      <Space align="center" direction="vertical">
        <Register />
      </Space>
    </PageTemplate>
  );
};
