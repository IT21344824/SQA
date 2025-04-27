export function formatCurrency(
    amount: number,
    currencyCode: string = "LKR"
): string {
    try {
        return new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: currencyCode.toUpperCase(),
        }).format(amount);
    } catch (error) {
        // fallback formatting if currency code is invalid
        console.error("invalid currency code:", currencyCode, error);
        return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
    }
}
