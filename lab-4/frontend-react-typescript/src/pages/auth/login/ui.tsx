import { Icon, notification, Space, Typography } from "shared/ui";
import { Login } from "features/auth/login";
import { PageTemplate } from "pages/template";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const LoginPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const authFailed = useSelector((state: any) => state.attempts.authFailed);

  const notifyAuthFailed = () => {
    api.info({
      message: "Auth Failed",
      description:
        "You was signed out because of your authentication token is not valid enough. Please, sign in again.",
      placement: "top",
      icon: <Icon.WarningFilled color="red" />,
    });
  };
  useEffect(() => {
    authFailed ? notifyAuthFailed() : null;
  });

  return (
    <>
      {contextHolder}
      <PageTemplate header={<Typography.Title>Log In</Typography.Title>}>
        <Space align="center">
          <Login />
        </Space>
      </PageTemplate>
    </>
  );
};
