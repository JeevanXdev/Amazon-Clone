export function FormatCurrency (priceCents) {
return (priceCents / 100 ).toFixed(2);
}

export default FormatCurrency;