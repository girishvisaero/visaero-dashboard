import {
  Box,
  Card,
  Progress,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

const DashboardTopListCard = ({ data, header }) => {
  const theme = useMantineTheme();

  const noDataFoundRow = (
    <td colSpan={2}>
      <Box
        component="h1"
        sx={{ textAlign: "center", color: "#cdc6c6" }}
        fz={"md"}
        color="dimmed"
      >
        Nothing Found
      </Box>
    </td>
  );

  const renderBody = (data ?? []).slice(0, 5).map((element, i, arr) => {
    let percent = (element.value / arr[0].value) * 100;
    return (
      <Box
        component="tr"
        sx={{
          "&:hover": {
            backgroundColor: theme.colors.gray[1],
          },
        }}
        key={i}
      >
        <td>{element?._id}</td>
        <td>{element?.value}</td>
        <td style={{ width: 100 }}>
          <Progress value={percent ?? 0} />
        </td>
      </Box>
    );
  });
  const rows = data?.length > 0 ? renderBody : noDataFoundRow;

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
