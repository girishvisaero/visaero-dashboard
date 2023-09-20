import { Box, Grid, Paper } from "@mantine/core";
import React, { useMemo } from "react";
import AutoSelectCountry from "./AutoSelectCountry";
import { getNationalities, getOrigin } from "../services";
import { useLocalDetails } from "../services/globelState";
import { useQuery } from "@tanstack/react-query";

const CountiesSelectCard = () => {
  const { data: ipData } = useLocalDetails();

  const { data: nationalitiesData } = useQuery({
    queryKey: ["nationalities"],
    queryFn: getNationalities,
  });
  const { data: originData } = useQuery({
    queryKey: ["origin"],
    queryFn: getOrigin,
  });

  const nationalityArr = nationalitiesData?.data?.dataobj?.data ?? [];
  const travellingToArr = nationalitiesData?.data?.dataobj?.data ?? [];
  const originArr = originData?.data?.dataobj?.data ?? [];



  return (
    <Box>
      <Paper shadow="xs" radius="md" p="xl" mb="md">
        <Grid>
          <Grid.Col span={4}>
            <AutoSelectCountry
              defaultCountryName={ipData?.country_name}
              data={nationalityArr ?? []}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <AutoSelectCountry data={originArr ?? []} />
          </Grid.Col>
          <Grid.Col span={4}>
            <AutoSelectCountry data={[]} />
          </Grid.Col>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CountiesSelectCard;
