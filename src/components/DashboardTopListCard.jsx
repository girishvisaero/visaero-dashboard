import { Card, Table, Text } from "@mantine/core";
import React from "react";

const DashboardTopListCard = ({ rows }) => {
  return (
    <Card mih={300} withBorder shadow="md">
      <Card.Section>
        <Table horizontalSpacing="sm" verticalSpacing="sm">
          <thead>
            <tr>
              <th colSpan={2}>
                <Text component="h1" m="0" px="5px">
                  Top 5 Destinations
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
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
                  3 More
                </Text>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Card.Section>
    </Card>
  );
};

export default DashboardTopListCard;
