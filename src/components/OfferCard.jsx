import { Box, Paper, useMantineTheme } from "@mantine/core";

const OfferCard = ({ isSelected, setIsSelected, index }) => {
  const theme = useMantineTheme();
  const isActive = index === isSelected;
  return (
    <Paper
      withBorder={!isActive}
      radius="sm"
      sx={{ 
        transition:'all 0.2s ease-in-out',
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
      <Box bg={theme.colors[theme.primaryColor][0] + "40"} p="sm">
        Lorem ipsum dolor sit amet.
      </Box>
      <Box p="sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
        maxime molestias tenetur dolore, quibusdam facere esse, iure, ullam
        quaerat maiores illo quasi quisquam error? Recusandae asperiores laborum
        autem ratione eos!
      </Box>
      <Box bg={theme.primaryColor} sx={{ color: "#fff" }} p="sm">
        Lorem ipsum dolor sit amet.
      </Box>
    </Paper>
  );
};

export default OfferCard;
