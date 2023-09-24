import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  ScrollArea,
  Select,
} from "@mantine/core";

import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import CountriesSelectCard from "../../components/CountriesSelectCard";
import DatePickerComponent from "../../components/DatePickerComponent";
import FooterButtonCard from "../../components/FooterButtonCard";
import OfferCard from "../../components/OfferCard";
import UploadDragImage from "../../components/UploadDragImage";
import { getSupportedCurrencies } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { useLocalDetails } from "../../services/globelState";

const NewVisa = () => {
  const { data: ipData } = useLocalDetails();
  const [currency, setCurrency] = useState("");
  const [isSelected, setIsSelected] = useState(0);

  const { data: currenciesDataObj } = useQuery({
    queryKey: ["supported-currencies"],
    queryFn: getSupportedCurrencies,
  });
  // const { data: visaOffers } = useQuery({
  //   queryKey: ["visa-offers"],
  //   queryFn: getSupportedCurrencies,
  // });

  const getData = (data) => console.log("data >>", data);

  let currenciesArr = currenciesDataObj?.data?.dataobj?.currencies ?? [];
  let currenciesData = currenciesArr.map((c) => c?.currency);

  // console.log(currenciesData);

  useEffect(() => {
    setCurrency(ipData?.currency ?? "USD");
  }, [ipData]);

  const SECTION_HEIGHT = 410;
  return (
    <div>
      {/* app bar */}
      <AppBar name="NewVisa" />
      {/* selection dropdown */}
      <CountriesSelectCard getData={getData} />
      {/* visa offers  */}
      <Grid>
        <Grid.Col span={8}>
          <Box
            display={"flex"}
            sx={{ justifyContent: "space-between" }}
            mb="md"
          >
            <Select
              value={currency}
              onChange={(c) => setCurrency(c)}
              placeholder="Select a Currency"
              data={currenciesData}
              searchable
            />
            <DatePickerComponent />
          </Box>
          <Paper radius="md" shadow="sm">
            <ScrollArea type="always" offsetScrollbars h={SECTION_HEIGHT}>
              <Grid p={"sm"}>
                {new Array(7).fill("").map((obj, i) => (
                  <Grid.Col span={6} key={i}>
                    <OfferCard
                      index={i}
                      isSelected={isSelected}
                      setIsSelected={setIsSelected}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </ScrollArea>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper shadow="sm" radius="md">
            <ScrollArea mx="-xs" type="always" p="xl" h={SECTION_HEIGHT + 50}>
              <Box>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                iusto a cum labore dolorum accusamus adipisci praesentium
                quibusdam velit modi omnis veritatis, repudiandae, soluta
                numquam eveniet molestiae. Officiis, harum quaerat?
              </Box>
              <Divider my="sm" variant="dashed" />
              <UploadDragImage />
            </ScrollArea>
          </Paper>
        </Grid.Col>
      </Grid>

      <FooterButtonCard>
        <Button onClick={() => console.log("working")}>Proceed</Button>
      </FooterButtonCard>
    </div>
  );
};

export default NewVisa;
