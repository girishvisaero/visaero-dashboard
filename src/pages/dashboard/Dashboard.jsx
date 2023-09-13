import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import { priceFormat } from "../../lib/utils";
import { getDashboardData } from "../../services";
import { useGloblePermission } from "../../services/globelState";
import DashboardTopListCard from "../../components/DashboardTopListCard";

// <============= icons ================>
import { ReactComponent as RpaBotIcon } from "../../assets/rpaIcon.svg";
import { ReactComponent as RpaProcessIcon } from "../../assets/rpaProcessIcon.svg";
import { ReactComponent as DecistionTakenIcon } from "../../assets/decisionTakenIcon.svg";
import { ReactComponent as FileIcon } from "../../assets/fileIcon.svg";
import { ReactComponent as HeldIcon } from "../../assets/heldIcon.svg";
import { ReactComponent as PendingIcon } from "../../assets/pendingIcon.svg";
import { ReactComponent as ArchiveIcon } from "../../assets/archiveIcon.svg";
import { ReactComponent as BotIcon } from "../../assets/botIcon.svg";
import DashboardPieChart from "../../components/DashboardPieChart";

const elements = [
  { position: 6, name: "Carbon" },
  { position: 7, name: "Nitrogen" },
  { position: 39, name: "Yttrium" },
  { position: 56, name: "Barium" },
  { position: 58, name: "Cerium" },
];

const Dashboard = () => {
  const theme = useMantineTheme();
  const accountDetails = useGloblePermission();
  const [value, setValue] = useState([
    dayjs(new Date()).toDate(),
    dayjs(new Date()).add(7, "day").toDate(),
  ]);

  const dates = [dayjs(value[0]).format(), dayjs(value[1]).format()];

  const start_date = dates[0];
  const end_date = dates[1];

  const isValidDates =
    !start_date ||
    !end_date ||
    start_date == "Invalid Date" ||
    end_date == "Invalid Date";

  const { data, isLoading } = useQuery({
    enabled:
      !!accountDetails?.data?.data?.data &&
      accountDetails?.data?.data?.data === "success" &&
      !isValidDates,
    queryKey: ["dashboard", dates],
    queryFn: getDashboardData,
  });

  const rows = (elements ?? []).slice(0, 5).map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
    </tr>
  ));

  const dataObj = data?.data?.dataobj ?? {};

  const businessHealth = dataObj?.business_health ?? {};
  const applicationsStatData = dataObj?.dt_range_statistics ?? {};

  //
  const progressData = {
    applicationsData: [
      {
        icon: FileIcon,
        label: "In Draft",
        total: applicationsStatData?.draft_applications ?? 0,
        action: () => console.log("working1"),
      },
      {
        icon: PendingIcon,
        label: "Pending Submission",
        total: applicationsStatData?.pending_submission ?? 0,
        action: () => console.log("working2"),
      },
      {
        icon: HeldIcon,
        label: "Held Applicaiton",
        total: applicationsStatData?.held_applications ?? 0,
        action: () => console.log("working"),
      },
      {
        icon: ArchiveIcon,
        label: "Archived",

        total: applicationsStatData?.archived_applications ?? 0,
        action: () => console.log("working"),
      },
    ],
    applicationsSubmittedData: [
      {
        icon: BotIcon,
        label: "Submitted to RPA",
        total: applicationsStatData?.submitted_to_rpa ?? 0,
        action: () => console.log("working1"),
      },
      {
        icon: RpaBotIcon,
        label: "RPA Queue",
        total: applicationsStatData?.in_rpa_queue ?? 0,
        action: () => console.log("working2"),
      },
      {
        icon: RpaProcessIcon,
        label: "RPA Processed",
        total: applicationsStatData?.rpa_processed ?? 0,
        action: () => console.log("working"),
      },
      {
        icon: DecistionTakenIcon,
        label: "Decision Taken",

        total: applicationsStatData?.decision_taken ?? 0,
        action: () => console.log("working"),
      },
    ],
  };

  const statisticButton = ({ icon: Icon, label, total, action }, i) => (
    <Grid.Col
      key={i}
      span={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        component="h3"
        ta={"center"}
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Icon />
        {total}
      </Box>
      <Button onClick={action}>{label}</Button>
    </Grid.Col>
  );

  const statisticCard = (
    <Card
      shadow="md"
      mih={300}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Card.Section>
        <Grid justify="center">
          {progressData?.applicationsData.map(statisticButton)}
        </Grid>
      </Card.Section>
      <Divider size="md" bg={theme.primaryColor} />
      <Card.Section>
        <Grid justify="center">
          {progressData?.applicationsSubmittedData.map(statisticButton)}
        </Grid>
      </Card.Section>
    </Card>
  );

  return (
    <div>
      <AppBar name="Dashboard" />
      <Box>
        <DatePickerInput
          icon={<IconCalendar size="1.1rem" stroke={1.5} />}
          type="range"
          numberOfColumns={2}
          // label="Select date"
          locale=""
          placeholder="Select dates"
          value={value}
          onChange={(d) => setValue(d)}
          ml="auto"
          maw={315}
        />
      </Box>
      <Box>
        <Text size="xl" fw={700} mb={"md"} color="dimmed">
          Statistics
        </Text>

        <Grid>
          <Grid.Col span={4}>
            <Card
              shadow="md"
              mih={300}
              bg={theme.primaryColor}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Text
                component="h1"
                sx={{ fontSize: "2rem", color: "#fff" }}
                align="center"
              >
                {priceFormat(businessHealth?.all_applications)}
              </Text>
              <Card.Section>
                <Text
                  component="h1"
                  sx={{ fontSize: "1.6rem", color: "#e5e5e5" }}
                  align="center"
                >
                  Total Applications
                </Text>
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col span={8}>{statisticCard}</Grid.Col>
          <Grid.Col span={4}>
            <DashboardPieChart />
          </Grid.Col>
          <Grid.Col span={4}>
            <DashboardTopListCard rows={rows} />
          </Grid.Col>
          <Grid.Col span={4}>
            <DashboardTopListCard rows={rows} />
          </Grid.Col>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
