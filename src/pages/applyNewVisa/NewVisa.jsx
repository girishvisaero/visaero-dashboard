import {
  Box,
  Divider,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import CountiesSelectCard from "../../components/CountiesSelectCard";
import { getNationalities } from "../../services";
import { useLocalDetails } from "../../services/globelState";

const NewVisa = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(true);

  return (
    <div>
      {/* app bar */}
      <AppBar name="NewVisa" />
      {/* selection dropdown */}
      <CountiesSelectCard />
      {/* visa offers  */}
      <Grid>
        <Grid.Col span={8}>
          <Paper radius="md" shadow="sm">
            <ScrollArea type="always" offsetScrollbars p="xl" h={500}>
              <Grid>
                {new Array(7).fill("").map((obj, i) => (
                  <Grid.Col span={6} key={i}>
                    <OfferCard opened={opened} setOpened={setOpened} />
                  </Grid.Col>
                ))}
              </Grid>
            </ScrollArea>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper shadow="sm" radius="md">
            <ScrollArea mx="-xs" type="always" p="xl" h={500}>
              <Box>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                iusto a cum labore dolorum accusamus adipisci praesentium
                quibusdam velit modi omnis veritatis, repudiandae, soluta
                numquam eveniet molestiae. Officiis, harum quaerat?
              </Box>
              <Divider my="sm" variant="dashed" />
              <UploadImage />
            </ScrollArea>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default NewVisa;

const UploadImage = (props) => {
  return (
    <Dropzone
      onDrop={(files) => console.log("accepted files", files)}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};

const OfferCard = ({ opened, setOpened }) => {
  const theme = useMantineTheme();
  return (
    <Paper
      shadow="xs"
      withBorder
      radius="md"
      sx={{ overflow: "hidden" }}
      onClick={() => setOpened(!opened)}
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
