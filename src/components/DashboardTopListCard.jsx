import { Card, Progress, RingProgress, Table, Text } from "@mantine/core";
import React from "react";

const DashboardTopListCard = ({ data, header }) => {
  const rows = (data ?? []).slice(0, 5).map((element, i, arr) => {
    let percent = (element.value / arr[0].value) * 100
    return (
      <tr key={i}>
        <td>{element?._id}</td>
        <td>{element?.value}</td>
        <td style={{ width: 100 }}>
          <Progress value={percent ?? 0} />
        </td>
      </tr>
    );
  });

  // const rows = getRowsData();

  return (
    <Card mih={300} withBorder shadow="md">
      <Card.Section>
        <Table horizontalSpacing="sm" verticalSpacing="sm">
          <thead>
            <tr>
              <th colSpan={3}>
                <Text component="h1" m="0" px="5px">
                  {header}
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card.Section>
    </Card>
  );
};

export default DashboardTopListCard;
