import { Select, Present } from "features/points";
import { PageTemplate } from "pages/template";
import { Space } from "shared/ui";

export const MainPage = () => {
  return (
    <PageTemplate>
      <Space direction={"horizontal"} wrap>
        <Select.ViaGraph />
        <Select.ViaForm
          x={{ min: 0, max: 0 }}
          y={{ min: 0, max: 0 }}
          r={{ min: 0, max: 0 }}
        />
        <Present.ViaTable />
      </Space>
    </PageTemplate>
  );
};
