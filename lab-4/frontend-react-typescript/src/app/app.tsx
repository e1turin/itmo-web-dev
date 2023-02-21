import { Divider, Layout, Space } from "antd";
import { UserCard } from "entities/user";
import { User } from "shared/api";
import { Login } from "features/auth/login";
import { Logout } from "features/auth/logout";
import { Register } from "features/auth/register";

const user1: User = { username: "lol", bio: "some about me" };
const user2: User = { username: "omg" };

export const App = () => {
  return (
    <>
      <Layout>
        <Layout.Sider />
        <Layout.Content>
          <Register />
          <Divider />
          <Login />
          <Divider />
          <UserCard data={user1} />
          <Divider />
          <Logout />
        </Layout.Content>
        <Layout.Sider />
      </Layout>
    </>
  );
};
