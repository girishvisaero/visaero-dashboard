import { Autocomplete, Group, Image, Text } from "@mantine/core";
import React, { memo, useEffect, useState } from "react";

const AutoSelectCountry = ({
  data = [],
  defaultCountryName = "",
  label = "",
  setPayload,
  setIsCorRequired,
}) => {
  const [value, setValue] = useState("");
  const [countryObj, setCountryObj] = useState({});

  // console.log("data", data);

  let key = (label ?? "").toLocaleLowerCase().split(" ").join("_");

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
    // console.log(defaultValue)
    if (!defaultValue) return;
    let prev = data?.find((o) => o.name === defaultValue);
    // setPayloadData(prev);
    setCountryObj((prevState) => prev);
  };

  const setPayloadData = (countryData) => {
    if (key === "travelling_to" && setIsCorRequired) {
      setIsCorRequired(!!countryData?.cor_required);
    }
    setPayload((prev) => ({ ...prev, [key]: { ...countryData } }));
  };

  useEffect(() => {
    setPayloadData(countryObj);
  }, [countryObj?.name]);

  useEffect(() => {
    let dfObj = {};
    if (defaultCountryName) {
      dfObj = data.find((o) => o?.name === defaultCountryName);
    } else {
      dfObj = data[0];
    }
    // debugger
    // setPayloadData(dfObj);
    setCountryObj({ ...dfObj });
    setValue(dfObj?.name ?? "");
  }, [data, defaultCountryName]);

  return (
    <Autocomplete
      maxDropdownHeight={350}
      value={value ?? ""}
      limit={data?.length ?? 17}
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
        } else {
          setValue(countryObj?.name);
        }
      }}
      onFocus={() => setValue("")}
      // onOptionSubmit={value => console.log('value', value)}
      label={label}
      placeholder={`Select a ${label}`}
      shadow="md"
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
