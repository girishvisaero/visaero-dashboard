import {
  Box,
  Group,
  Text,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconLogout2,
  IconNews,
  IconNotification,
  IconPresentationAnalytics,
  IconUserCircle,
  IconWorld,
} from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import LinksGroup from "./LinksGroup";

const data = [
  { label: "News & Updates", icon: IconNews, link: "/news-and-updates" },
  { label: "Notifications", icon: IconNotification, link: "/notifications" },
  { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
  {
    label: "Apply New Visa",
    icon: IconWorld,
    initiallyOpened: true,
    group: [
      { label: "Visa", link: "/new-visa" },
      { label: "Track Visa", link: "/track-visa" },
    ],
  },
  {
    label: "Visa Offer Config",
    icon: IconCalendarStats,
    group: [
      { label: "Visa Offers", link: "/visa-offers" },
      { label: "Document Rule Engine", link: "/document-rule-engine" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics, link: "/analytics" },
  { label: "Contracts", icon: IconFileAnalytics, link: "/contracts" },
  { label: "Settings", icon: IconAdjustments, link: "/settings" },
  {
    label: "Security",
    icon: IconLock,
    group: [
      { label: "Enable 2FA", link: "/2fa-security" },
      { label: "Change password", link: "/change-password" },
      { label: "Recovery codes", link: "/recovery-codes" },
    ],
  },
];

function MainLinks() {
  const links = data.map((link) => <LinksGroup {...link} key={link.label} />);
  return <div>{links}</div>;
}

export default MainLinks;

export function User() {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const handleSignout = () => {
    localStorage.setItem("session_id", "");
    localStorage.setItem("user_id", "");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.black,
          backgroundColor: theme.colors.gray[1],
          "&:hover": {
            backgroundColor: theme.colors.gray[3],
          },
        }}
      >
        <Group>
          {/* <Image
            src={
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            }
            height={50}
            width={50}
            radius={"50%"}
            fit="cover"
          /> */}
          <IconUserCircle
            fill={theme.colors.gray[2]}
            strokeWidth={"1px"}
            height="45px"
            width="45px"
          />

          <Box sx={{ flexGrow: 1 }} mt="sm">
            <Text color="dimmed" size="xs">
              Girish Chaudhari
            </Text>
            <Text size="sm" weight={500} color={theme.primaryColor}>
              Super Admin
            </Text>
          </Box>

          <IconLogout2 onClick={handleSignout} />
        </Group>
      </UnstyledButton>
      <Text color={"dimmed"} size="xs" align="center">
        Version 1.2.0
      </Text>
      {/* <Box sx={{ display: "flex", justifyContent: "center" }} mt="sm">
        <Box>
          <Text color="dimmed" size="xs" align="center">
            Version 1.2.0
          </Text>
          <Text
            size="sm"
            weight={500}
            align="center"
            color={theme.primaryColor}
          >
            Powered By Visaero
          </Text>
        </Box>
      </Box> */}
    </Box>
  );
}
