import { PropsWithChildren } from "react";
import { Layout, Typography } from "shared/ui";
import { Header } from "widgets/header";

type PageTemplateProps = PropsWithChildren & {
  header?: React.ReactNode;
};

export const PageTemplate = ({ header, children }: PageTemplateProps) => {
  return (
    <Layout>
      <Layout.Header>{/* <Header /> */ header && ""}</Layout.Header>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};
