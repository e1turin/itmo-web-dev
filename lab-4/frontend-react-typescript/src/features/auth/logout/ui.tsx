import { useAuthContext } from "entities/auth";
import { Button, Form, Icon } from "shared/ui";

export const Logout = () => {
  const { signOut } = useAuthContext();
  return (
    <Button
      type="primary"
      htmlType="submit"
      icon={<Icon.LogoutOutlined />}
      size={"middle"}
      onClick={(e) => {
        signOut().then((err) => {
          console.error(err);
        });
      }}
    >
      Logout
    </Button>
  );
};

export {};
