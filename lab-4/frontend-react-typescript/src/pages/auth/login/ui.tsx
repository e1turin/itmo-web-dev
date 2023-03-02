import { Space, Typography } from "shared/ui";
import { Login } from "features/auth/login";
import { PageTemplate } from "pages/template";

export const LoginPage = () => {
  return (
    <PageTemplate header={<Typography.Title>Log In</Typography.Title>}>
      <Space align="center">
        <Login />
      </Space>
    </PageTemplate>
  );
};
