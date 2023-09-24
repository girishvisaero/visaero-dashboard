import { Box, Paper, Text, useMantineTheme } from "@mantine/core";

const OfferCard = ({ isSelected, setIsSelected, index }) => {
  const theme = useMantineTheme();
  const isActive = index === isSelected;
  return (
    <Paper
      withBorder={!isActive}
      radius="sm"
      sx={{
        transition: "all 0.15s ease-in-out",
        overflow: "hidden",
        ...(isActive && {
          border: `1px solid ${theme.colors[theme.primaryColor][0]}`,
          boxShadow: `${
            theme.colors[theme.primaryColor][0]
          } 0px 2.26371px 15px`,
        }),
      }}
      onClick={() => setIsSelected(index)}
    >
      <Box bg={theme.colors[theme.primaryColor][0] + "40"} fz='sm' p="sm">
        Lorem ipsum dolor sit amet.
      </Box>
      <Box p="sm" fz={'.7rem'}>
        <Text color="dimmed" mb='.5rem' >
         Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Text>
        <Text color="dimmed" mb='.5rem'>
         Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Text>
        <Text color="dimmed" mb='.5rem'>
         Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Text>
        <Text color="dimmed" mb='.5rem'>
         Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Text>
      </Box>
      <Box bg={theme.primaryColor} fz='sm' sx={{ color: "#fff" }} p="sm">
        Lorem ipsum dolor sit amet.
      </Box>
    </Paper>
  );
};

export default OfferCard;
