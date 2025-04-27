export const COUPON_CODE = {
    BFRIDAY: "BFRIDAY",
    XMAS2021: "XMAS2021",
    NY2022: "XMAS2021",
} as const;

export type CouponCode = keyof typeof COUPON_CODE;