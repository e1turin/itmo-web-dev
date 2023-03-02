import { Graph } from "entities/graph";
import { ListOfPoints, SelectByForm, SelectByGraph } from "features/points";
import { PageTemplate } from "pages/template";
import { Space } from "shared/ui";

export const MainPage = () => {
  return (
    <PageTemplate>
      <Space direction={"horizontal"} wrap>
        {/* <Space direction={"horizontal"}> */}
        <SelectByGraph />
        <SelectByForm
          x={{ min: 0, max: 0 }}
          y={{ min: 0, max: 0 }}
          r={{ min: 0, max: 0 }}
        />
        {/* </Space> */}
        <ListOfPoints />
      </Space>
    </PageTemplate>
  );
};
