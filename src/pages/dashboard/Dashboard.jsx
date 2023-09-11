import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import { getDashboardData } from "../../services";
import { useGloblePermission } from "../../services/globelState";
import { Box } from "@mantine/core";
import dayjs from "dayjs";

const Dashboard = () => {
  const accountDetails = useGloblePermission();
  const [value, setValue] = useState([
    dayjs(new Date()).toDate(),
    dayjs(new Date()).add(7, "day").toDate(),
  ]);

  const dates = [dayjs(value[0]).format(), dayjs(value[1]).format()];

  const { data, isLoading } = useQuery({
    enabled:
      !!accountDetails?.data?.data?.data &&
      accountDetails?.data?.data?.data === "success",
    queryKey: ["dashboard", dates],
    queryFn: getDashboardData,
  });

  return (
    <div>
      <AppBar name="Dashboard" />
      <Box>
        <DatePickerInput
          icon={<IconCalendar size="1.1rem" stroke={1.5} />}
          type="range"
          // label="Select date"
          locale=""
          placeholder="Select dates"
          value={value}
          onChange={(d) => setValue(d)}
          ml="auto"
          maw={315}
        />
      </Box>
      <Box>Dashboard</Box>
    </div>
  );
};

export default Dashboard;
