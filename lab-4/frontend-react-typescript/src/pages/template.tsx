import { PropsWithChildren } from "react";
import { Layout, Typography } from "shared/ui";

type PageTemplateProps = PropsWithChildren & {
  header?: React.ReactNode;
};

export const PageTemplate = ({ header, children }: PageTemplateProps) => {
  return (
    <Layout>
      <Layout.Header>{header}</Layout.Header>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};
