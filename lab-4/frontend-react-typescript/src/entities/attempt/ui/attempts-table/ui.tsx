import { selectAllAttempts } from "entities/attempt";
import { useSelector } from "react-redux";
import { Attempt, Point } from "shared/api/types";
import { ColumnsType, Table, Icon, Typography } from "shared/ui";

const columns: ColumnsType<Attempt<Point>> = [
  {
    title: "X",
    dataIndex: "x",
    render: (it) => <Typography.Text>{it}</Typography.Text>,
  },
  {
    title: "Y",
    dataIndex: "y",
    render: (it) => it,
  },
  {
    title: "R",
    dataIndex: "r",
    render: (it) => it,
  },
  {
    title: "Is Inside Area",
    dataIndex: "isInsideArea",
    render: (flag) =>
      flag ? <Icon.CheckCircleFilled /> : <Icon.CloseCircleFilled />,
  },
  {
    title: "Creation Date Time",
    dataIndex: "creationDateTime",
    render: (it) => it,
  },
];

type AttemptsTableProps = {
  data: Attempt<Point>[];
};

export const AttemptsTable = ({}: AttemptsTableProps) => {
  const data = useSelector(selectAllAttempts);
  return <Table columns={columns} dataSource={data} />;
};
