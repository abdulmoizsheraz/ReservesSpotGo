import { Card, CardHeader, CardTitle } from "./ui/card";

const ShowTables = ({ tableno, onClick }: { tableno: number; onClick: () => void }) => {
  return (
    <Card className="cursor-pointer" onClick={onClick}>
      <CardHeader>
        <CardTitle>{tableno}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ShowTables;
