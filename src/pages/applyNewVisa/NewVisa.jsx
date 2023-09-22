import { Box, Button, Card, Divider, Grid, Paper, ScrollArea } from "@mantine/core";

import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import CountriesSelectCard from "../../components/CountriesSelectCard";
import OfferCard from "../../components/OfferCard";
import UploadDragImage from "../../components/UploadDragImage";
import FooterButtonCard from "../../components/FooterButtonCard";

const NewVisa = () => {
  const [isSelected, setIsSelected] = useState(0);

  const getData = (data) => console.log("data >>", data);

  const SECTION_HEIGHT = 460
  return (
    <div>
      {/* app bar */}
      <AppBar name="NewVisa" />
      {/* selection dropdown */}
      <CountriesSelectCard getData={getData} />
      {/* visa offers  */}
      <Grid>
        <Grid.Col span={8}>
          <Paper radius="md" shadow="sm">
            <ScrollArea type="always" offsetScrollbars  h={SECTION_HEIGHT}>
              <Grid p={'sm'}>
                {new Array(7).fill("").map((obj, i) => (
                  <Grid.Col span={6}  key={i}>
                    <OfferCard index={i} isSelected={isSelected} setIsSelected={setIsSelected} />
                  </Grid.Col>
                ))}
              </Grid>
            </ScrollArea>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper shadow="sm" radius="md">
            <ScrollArea mx="-xs" type="always" p="xl" h={SECTION_HEIGHT}>
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
