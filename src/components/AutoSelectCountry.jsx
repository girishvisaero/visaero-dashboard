import { Autocomplete, Group, Image, Text } from "@mantine/core";
import React, { memo, useMemo, useState } from "react";

const AutoSelectCountry = ({ data = [], defaultCountryName = "" }) => {
  const [value, setValue] = useState("");
  const [countryObj, setCountryObj] = useState({});

  // console.log("data", data);
  //   filter for Autoselect
  const optionsFilter = (value, item) => {
    let filterItem = item.name
      .toLowerCase()
      .includes(value.toLowerCase().trim());

    return filterItem;
  };
  //   Data modification for label
  const countryData = (data ?? []).map((item) => ({
    ...item,
    value: item?.name ?? "",
  }));

  const handleCountryChange = (e) => {
    const { defaultValue } = e.target;
    setCountryObj((prev) => {
      prev = data?.find((o) => o.name === defaultValue);
      return prev;
    });
    // console.log("nationality>>", defaultValue);
  };

  useMemo(() => {
    let dfObj = {};
    if (defaultCountryName) {
      dfObj = data.find((o) => o?.name === defaultCountryName);
    } else {
      dfObj = data[0];
    }

    setCountryObj({ ...dfObj });
    setValue(dfObj?.name ?? "");
  }, [data, defaultCountryName]);

  return (
    <Autocomplete
      maxDropdownHeight={350}
      value={value ?? ""}
      limit={data?.length ?? 17}
      highlightQuery
      nothingFound="Nothing found..."
      itemComponent={AutoCompleteItem}
      icon={
        countryObj?.flag && (
          <Image src={countryObj?.flag} height={15} width={25} />
        )
      }
      onBlur={() => {
        if (!countryObj || Object.keys(countryObj).length <= 0) {
          setValue("");
        }
      }}
      // onOptionSubmit={value => console.log('value', value)}
      label="Nationality"
      placeholder="Select a Nationality"
      onSelect={handleCountryChange}
      onChange={setValue}
      filter={optionsFilter}
      data={countryData}
    />
  );
};

export default memo(AutoSelectCountry);

function AutoCompleteItem({ flag, name, ...others }) {
  return (
    <div {...others}>
      <Group>
        <Image src={flag} height={15} width={25} />
        <div>
          <Text>{name}</Text>
        </div>
      </Group>
    </div>
  );
}
