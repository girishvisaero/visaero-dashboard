import { Box, Card, Progress, RingProgress, Table, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

const DashboardDetailsCard = ({ data, headerColumnsKey }) => {
  const renderList = (arr) =>
    arr.map((element, i) => (
      <tr key={i}>
        <td>{element?._id}</td>
        <td align="center">{element?.value}</td>
      </tr>
    ));

  let LimitData = (data ?? []).slice(0, 5);

  const rows = renderList(LimitData);

  let moreItems = (data ?? []).length - 5;

  const openViewMore = () => {

    modals.open({
    //   title: "Please confirm your action",
      children: renderList(data),
      labels: { confirm: "Confirm", cancel: "Cancel" },
    });
  };

  const renderHeader = (headerArr = []) => {
    return headerArr.map((header, i) => (
      <th key={i}>
        <Text component="h1" m="0" px="5px">
          {header}
        </Text>
      </th>
    ));
  };

  const header = renderHeader(headerColumnsKey);

  return (
    <Card mih={300} withBorder shadow="md">
      <Card.Section>
        <Table horizontalSpacing="sm" verticalSpacing="sm">
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody>{rows}</tbody>
          {moreItems > 1 && (
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <Text
                    align="end"
                    sx={{
                      fontSize: "0.8rem",
                      textDecoration: "underline",
                    }}
                    color="dimmed"
                    m="0"
                    px="5px"
                  >
                    <Box sx={{cursor:'pointer'}} onClick={() => openViewMore()}>{moreItems} More</Box>
                  </Text>
                </td>
              </tr>
            </tfoot>
          )}
        </Table>
      </Card.Section>
    </Card>
  );
};

export default DashboardDetailsCard;
