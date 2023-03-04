import { Points } from "features/index.";
import { PageTemplate } from "pages/template";
import { Space } from "shared/ui";

const { FormSelector, GraphSelector, ListPresenter } = Points;
const { SelectByForm } = FormSelector;
const { SelectByGraph } = GraphSelector;
const { ListOfPoints } = ListPresenter;

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
