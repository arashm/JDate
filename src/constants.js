export const MONTH_NAMES = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'امرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

export const ABBR_DAYS = ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش'];

export const DAYS_NAMES = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];

// Extended Arabic-Indic digits, indexed by their ASCII value: PERSIAN_DIGITS[7]
// is '۷'. These are the Persian forms at U+06F0..U+06F9, a different block from
// the Arabic-Indic digits at U+0660..U+0669 — all ten code points differ, though
// only 4, 5 and 6 look different, which is what makes a mix-up easy to miss.
export const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export const GREGORIAN_EPOCH = 1;

export const PERSIAN_EPOCH = 226896;

export const PERSIAN_CYCLE_DAYS = 12053;

export const NON_LEAP_CORRECTION = [
  1502,
  1601, 1634, 1667,
  1700, 1733, 1766, 1799,
  1832, 1865, 1898,
  1931, 1964, 1997,
  2030, 2059, 2063, 2096,
  2129, 2158, 2162, 2191, 2195,
  2224, 2228, 2257, 2261, 2290, 2294,
  2323, 2327, 2356, 2360, 2389, 2393,
  2422, 2426, 2455, 2459, 2488, 2492,
  2521, 2525, 2554, 2558, 2587, 2591,
  2620, 2624, 2653, 2657, 2686, 2690,
  2719, 2723, 2748, 2752, 2756, 2781, 2785, 2789,
  2818, 2822, 2847, 2851, 2855, 2880, 2884, 2888,
  2913, 2917, 2921, 2946, 2950, 2954, 2979, 2983, 2987
];
