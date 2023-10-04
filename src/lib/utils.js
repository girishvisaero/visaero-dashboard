import { keys } from "@mantine/utils";
import dayjs from "dayjs";
import theme from "../config/theme";

export function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  });
}

export function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

export function sortData(data, payload) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export const dateFormat = (date) =>
  dayjs(date ?? new Date()).format("DD/MM/YYYY hh:mm A");

export function paginate(array = [], page_number = 1, page_size = 10) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export function priceFormat(x = 0) {
  if (!x) x = 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const setupTheme = (
  brand_color = "#663785",
  secondary_color = "#f07821"
) => {
  let colorObj = { brand: brand_color, secondary_color };
  let isRenderFirst = false;
  // if render second time then exit
  // if (isRenderFirst) return;
  // check if color exist from enterprise
  if (brand_color && secondary_color) {
    let keys = ["brand", "secondary_color"];
    keys.forEach((key) => {
      new Array(10).fill("").forEach((element) => {
        element = colorObj[key];
        theme.colors[key].push(element);
        // console.log("element>>", element);
      });
    });
  } else{
    setupTheme("#f07821", "#663785");

  }

  isRenderFirst = true;
};


export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


export function hexToRGB(hex) {
  // Remove the '#' character if it exists
  hex = hex.replace(/^#/, '');

  // Check if the hex code is 8 digits
  if (hex.length !== 8) {
    throw new Error('Invalid 8-digit hex color code');
  }

  // Extract individual components
  const redHex = hex.slice(2, 4);
  const greenHex = hex.slice(4, 6);
  const blueHex = hex.slice(6, 8);

  // Convert hex values to decimal
  const red = parseInt(redHex, 16);
  const green = parseInt(greenHex, 16);
  const blue = parseInt(blueHex, 16);

  // Return the RGB color
  return `rgb(${red}, ${green}, ${blue})`;
}

// Example usage:
// const hexColor = "#7F00FF80"; // 8-digit hex color with alpha
// const rgbColor = hexToRGB(hexColor);
// console.log(rgbColor); // Output: "rgb(127, 0, 255)"
