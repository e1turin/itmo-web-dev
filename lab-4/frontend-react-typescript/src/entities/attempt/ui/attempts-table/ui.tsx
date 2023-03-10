import { Attempt, Point } from "shared/api/types";
import { ColumnsType, Table, Spin } from "shared/ui";

const columns: ColumnsType<Attempt<Point>> = [
  {
    title: "X",
    dataIndex: "x",
  },
  {
    title: "Y",
    dataIndex: "y",
  },
  {
    title: "R",
    dataIndex: "r",
  },
];

type AttemptsTableProps = {
  data: Attempt<Point>[];
};

export const AttemptsTable = ({ data }: AttemptsTableProps) => {
  return <Table columns={columns} dataSource={data} />;
};
