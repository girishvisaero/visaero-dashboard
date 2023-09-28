import { Box, Paper, Text, useMantineTheme } from "@mantine/core";
import { IconCircleChevronRight } from "@tabler/icons-react";

const OfferCard = ({ isSelected, setIsSelected, index, data }) => {
  const theme = useMantineTheme();
  const isActive = index === isSelected;

  const is_insurance = !!data?.is_visaero_insurance_bundled;

  let visaDetails = data?.visa_details;
  let insuranceDetails = data?.insurance_details;

  const insuranceItem = (obj, i) => (
    <Text color="dimmed" mb=".5rem" key={i}>
      {obj?.name}:{" "}
      {obj?.value}{" "}
    </Text>
  )
  return (
    <Paper
      withBorder={!isActive}
      radius="sm"
      h='100%'
      sx={{
        transition: "all 0.15s ease-in-out",
        position:'relative',
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
      <Box bg={theme.colors[theme.primaryColor][0] + "40"} fz="sm" p="sm">
        <Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 15 }}
          >
            <Box>{visaDetails?.duration_display} </Box>
            <Box>
              {visaDetails?.fees?.currency} {visaDetails?.fees?.adult_govt_fee}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box p="sm" fz={".7rem"} mb='45px' >
        <Text color="dimmed" mb=".5rem">
          Visa Validity: {visaDetails?.visa_validity}
        </Text>
        <Text color="dimmed" mb=".5rem">
          Stay Validity: {visaDetails?.stay_validity}
        </Text>
        <Text color="dimmed" mb=".5rem">
          Processing Time: {visaDetails?.processing_time}
        </Text>
        {is_insurance && insuranceDetails?.insurance_coverage.map(insuranceItem)}
      </Box>
      <Box
        bg={theme.primaryColor}
        fz="sm"
        sx={{
          position:'absolute',
          bottom:0,
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width:'100%'
        }}
        p="sm"
      >
        <Box sx={{ textDecoration: "underline", cursor: "pointer" }}>
          More Details
        </Box>
        <IconCircleChevronRight height={20} width={20} />
      </Box>
    </Paper>
  );
};

export default OfferCard;
