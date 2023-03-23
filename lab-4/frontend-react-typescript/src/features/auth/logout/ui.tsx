import { useAuthContext } from "entities/auth";
import { useState } from "react";
import { Button, Icon, notification } from "shared/ui";

export const Logout = () => {
  const { signOut } = useAuthContext();
  const [api, contextHolder] = notification.useNotification();

  const notify = ({
    message,
    description = "",
  }: {
    message: React.ReactNode;
    description?: React.ReactNode;
  }) => {
    api.info({
      message: message,
      description: description,
      placement: "top",
      icon: <Icon.WarningTwoTone twoToneColor="#ff2323" />,
    });
  };

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        htmlType="submit"
        icon={<Icon.LogoutOutlined />}
        size={"middle"}
        onClick={(e) => {
          signOut().then((err) => {
            if (!!err) {
              notify({
                message: "Sorry, error occured while signing out",
                description: err.response.data.error,
              });
            } else {
              notify({
                message: "You have successfully signed out!",
              });
            }
          });
        }}
      >
        Logout
      </Button>
    </>
  );
};
