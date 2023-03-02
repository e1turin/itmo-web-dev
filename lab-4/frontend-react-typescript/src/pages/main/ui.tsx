import { Graph } from "entities/graph";
import { ListOfPoints, SelectByForm, SelectByGraph } from "features/points";
import { PageTemplate } from "pages/template";
import { Space } from "shared/ui";

export const MainPage = () => {
  return (
    <PageTemplate>
      <Space direction={"vertical"}>
        {/* <Space direction={"horizontal"}> */}
        <SelectByGraph />
        <SelectByForm />
        {/* </Space> */}
        <ListOfPoints />
      </Space>
    </PageTemplate>
  );
};
