import {
  Box,
  Button,
  Divider,
  Grid,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Select,
  Text,
  useMantineTheme,
} from "@mantine/core";

import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import CountriesSelectCard from "../../components/CountriesSelectCard";
import DatePickerComponent from "../../components/DatePickerComponent";
import FooterButtonCard from "../../components/FooterButtonCard";
import OfferCard from "../../components/OfferCard";
import UploadDragImage from "../../components/UploadDragImage";
import { getSupportedCurrencies, getVisaOffers } from "../../services";
import { useLocalDetails } from "../../services/globelState";

const NewVisa = () => {
  const { data: ipData } = useLocalDetails();
  const [currency, setCurrency] = useState("");
  const [isSelected, setIsSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data: currenciesDataObj } = useQuery({
    queryKey: ["supported-currencies"],
    queryFn: getSupportedCurrencies,
  });
  const { data: visaOffers, mutate, isLoading:isVisaOfferLoading } = useMutation(getVisaOffers);
  
  // const { data: visaOffers } = useQuery({
  //   queryKey: ["visa-offers"],
  //   queryFn: getSupportedCurrencies,
  // });

  const getData = (data) => {
    console.log("data >>", data)
    mutate(currency, data)
  };

  let currenciesArr = currenciesDataObj?.data?.dataobj?.currencies ?? [];
  let currenciesData = currenciesArr.map((c) => c?.currency);

  // console.log(currenciesData);
  const loader = (
    <Box>
      <Loader />
    </Box>
  );

  useEffect(() => {
    let curr  = ipData?.currency ?? 'USD'
    setCurrency(curr);
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
              nothingFound="Nothing found..."
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
      {/* loading overlay */}
      <LoadingOverlay visible={isLoading} loader={loader} />
      {/* footer section */}
      <FooterButtonCard>
        <Button onClick={() => setIsLoading(true)}>Proceed</Button>
      </FooterButtonCard>
    </div>
  );
};

export default NewVisa;

const Loader = () => {
  const theme = useMantineTheme();
  const [state, setState] = useState("Please wait...");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let msgArr = [
    "Documents are being extracted...",
    "Documents are extracted!",
    "Creating an application...",
    "Wait a while...",
  ];

  useEffect(() => {
    for (let i = 0, p = Promise.resolve(); i < msgArr.length; i++) {
      p = p.then(() => delay(1500)).then(() => setState(msgArr[i]));
    }
  }, []);

  return (
    <>
      <Box component="span" bg={theme.primaryColor} className="custom-loader" />
      <Text>{state}</Text>
    </>
  );
};
