import { Card } from "shared/ui/card";
import { User } from "shared/api";

export type UserCardProps = {
  data: User;
  /*...*/
};

export const UserCard = ({ data }: UserCardProps) => {
  return (
    <Card title={data.username} size="small">
      {data.bio || ">no info<"}
    </Card>
  );
};
