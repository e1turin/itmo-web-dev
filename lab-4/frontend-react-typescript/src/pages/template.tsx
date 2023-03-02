import { PropsWithChildren } from "react";
import { Layout } from "shared/ui";
import { Header } from "widgets/header";

export const PageTemplate = (props: PropsWithChildren) => {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>{props.children}</Layout.Content>
    </Layout>
  );
};
