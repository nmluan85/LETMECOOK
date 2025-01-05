export const desktopOS = [
    {
        label: "Fat",
        value: 72.72,
    },
    {
        label: "OS X",
        value: 16.38,
    },
    {
        label: "Linux",
        value: 3.83,
    },
    {
        label: "Chrome OS",
        value: 2.42,
    },
    {
        label: "Other",
        value: 4.65,
    },
];

export const mobileOS = [
    {
        label: "Calories",
        value: 72.48,
    },
    {
        label: "Carbs",
        value: 28.8,
    },
    {
        label: "Protein",
        value: 0.71,
    },
];

export const platforms = [
    {
        label: "Mobile",
        value: 59.12,
    },
    {
        label: "Desktop",
        value: 40.88,
    },
];

const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2));

export const mobileAndDesktopOS = [
    ...mobileOS.map((v) => ({
        ...v,
        label: v.label === "Other" ? "Other (Mobile)" : v.label,
        value: normalize(v.value, platforms[0].value),
    })),
    ...desktopOS.map((v) => ({
        ...v,
        label: v.label === "Other" ? "Other (Desktop)" : v.label,
        value: normalize(v.value, platforms[1].value),
    })),
];

export const valueFormatter = (item) => `${item.value}%`;
