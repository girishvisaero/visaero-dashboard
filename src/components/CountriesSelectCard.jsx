import { Box, Grid, Paper } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { memo, useMemo, useState } from "react";
import { getNationalities, getOrigin, getTravellingTo } from "../services";
import { useLocalDetails } from "../services/globelState";
import AutoSelectCountry from "./AutoSelectCountry";

const CountriesSelectCard = ({ getData }) => {
  const { data: ipData } = useLocalDetails();
  const [isCorRequired, setIsCorRequired] = useState(false);
  const [payload, setPayload] = useState({
    nationality: {},
    travelling_to: {},
    country_of_origin: {},
  });

  const { data: nationalitiesData } = useQuery({
    queryKey: ["nationalities"],
    queryFn: getNationalities,
  });
  const { data: travellingToData } = useQuery({
    enabled: nationalitiesData && nationalitiesData?.data?.data === "success",
    queryKey: ["travellintTo", {}],
    queryFn: getTravellingTo,
  });
  const { data: originData } = useQuery({
    queryKey: ["origin"],
    queryFn: getOrigin,
  });

  const nationalityArr = nationalitiesData?.data?.dataobj?.data ?? [];
  const travellingToArr = travellingToData?.data?.dataobj?.data ?? [];
  const originArr = originData?.data?.dataobj?.data ?? [];

  useMemo(() => getData(payload), [payload]);

  return (
    <Box>
      <Paper shadow="xs" radius="md" p="xl" mb="md">
        <Grid>
          <Grid.Col span={4}>
            <AutoSelectCountry
              defaultCountryName={ipData?.country_name}
              data={nationalityArr ?? []}
              label="Nationality"
              setPayload={setPayload}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <AutoSelectCountry
              data={travellingToArr ?? []}
              label="Travelling to"
              setPayload={setPayload}
              setIsCorRequired={setIsCorRequired}
            />
          </Grid.Col>
          <Grid.Col span={4} display={isCorRequired && "none"}>
            <AutoSelectCountry
              defaultCountryName={ipData?.country_name}
              data={originArr ?? []}
              label="Country of Origin"
              setPayload={setPayload}
            />
          </Grid.Col>
        </Grid>
      </Paper>
    </Box>
  );
};

export default memo(CountriesSelectCard);
