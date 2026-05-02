import { useState, useEffect, useCallback, useRef } from "react";

// ============================================================
// PEAK TOOLS HUB — v2.0 Production Utility Platform
// Global-first, SEO-optimised, clean URL routing
// ============================================================

// ─── TOOL REGISTRY ──────────────────────────────────────────
const TOOLS = {
  finance: [
    { id: "salary", name: "Salary Calculator", desc: "Global net pay: pension, social security & income tax", icon: "💼", global: true },
    { id: "loan", name: "Loan & Mortgage Calculator", desc: "Monthly repayment, total interest & amortization", icon: "🏠", global: true },
    { id: "compound", name: "Compound Interest Calculator", desc: "Investment growth with monthly contributions", icon: "📈", global: true },
    { id: "income-tax", name: "Income Tax Calculator", desc: "Annual tax estimation with deductions", icon: "🧾", global: true },
    { id: "credit-card", name: "Credit Card Interest Calculator", desc: "Balance payoff timeline & total interest", icon: "💳", global: true },
    { id: "inflation", name: "Inflation Calculator", desc: "Real purchasing power & value over time", icon: "📉", global: true },
    { id: "profit-margin", name: "Profit Margin Calculator", desc: "Revenue, cost, margin & markup analysis", icon: "💰", global: true },
    { id: "zakat", name: "Zakat Calculator", desc: "Zakat on savings, income & business assets", icon: "☪️", tag: "MY" },
    { id: "sst", name: "SST Calculator", desc: "Malaysia Sales & Service Tax (6% / 10%)", icon: "🧮", tag: "MY" },
    { id: "ptptn", name: "PTPTN Loan Calculator", desc: "Study loan monthly repayment plan", icon: "🎓", tag: "MY" },
  ],
  datetime: [
    { id: "age", name: "Age Calculator", desc: "Exact age in years, months and days", icon: "🎂", global: true },
    { id: "date-diff", name: "Date Difference Calculator", desc: "Days, weeks and months between two dates", icon: "📅", global: true },
    { id: "working-days", name: "Working Days Calculator", desc: "Business days between dates (Mon–Fri)", icon: "📆", global: true },
    { id: "countdown", name: "Countdown Timer", desc: "Live countdown to any future event or date", icon: "⏳", global: true },
    { id: "timezone", name: "Time Zone Converter", desc: "Convert time across world time zones", icon: "🌍", global: true },
    { id: "public-holiday", name: "Public Holiday Calendar", desc: "Official holidays by country & year", icon: "📋", global: true },
    { id: "long-weekend", name: "Long Weekend Planner", desc: "Find extended weekends & bridge holidays", icon: "🏖️", global: true },
    { id: "leave-optimizer", name: "Annual Leave Optimizer", desc: "Maximize days off with strategic leave planning", icon: "✈️", global: true },
  ],
  converters: [
    { id: "currency", name: "Currency Converter", desc: "Live exchange rates — 170+ world currencies", icon: "💱", badge: "LIVE", global: true },
    { id: "length", name: "Length Converter", desc: "Metric, imperial, nautical & more", icon: "📏", global: true },
    { id: "weight", name: "Weight Converter", desc: "kg, lbs, stones, grams, ounces & more", icon: "⚖️", global: true },
    { id: "temperature", name: "Temperature Converter", desc: "Celsius, Fahrenheit & Kelvin", icon: "🌡️", global: true },
    { id: "data", name: "Data Storage Converter", desc: "Bytes, KB, MB, GB, TB & PB", icon: "💾", global: true },
    { id: "speed", name: "Speed Converter", desc: "km/h, mph, m/s, knots & ft/s", icon: "🏎️", global: true },
    { id: "cooking", name: "Cooking Units Converter", desc: "Cups, tbsp, tsp, ml, oz & more", icon: "🍳", global: true },
  ],
  daily: [
    { id: "discount", name: "Discount Calculator", desc: "Sale price, savings & original price", icon: "🏷️", global: true },
    { id: "tip", name: "Tip & Bill Splitter", desc: "Split bills with custom tip percentage", icon: "🍽️", global: true },
    { id: "fuel", name: "Fuel Cost Calculator", desc: "Trip fuel cost by distance & consumption", icon: "⛽", global: true },
    { id: "electricity", name: "Electricity Bill Calculator", desc: "Estimate monthly electricity cost", icon: "⚡", global: true },
    { id: "password", name: "Password Generator", desc: "Cryptographically secure random passwords", icon: "🔐", global: true },
    { id: "percentage", name: "Percentage Calculator", desc: "X% of Y, percentage change & ratio", icon: "%", global: true },
    { id: "moving-cost", name: "Moving Cost Estimator", desc: "Estimate relocation costs by distance & volume", icon: "📦", global: true },
    { id: "cost-of-living", name: "Cost of Living Comparator", desc: "Compare living costs between cities worldwide", icon: "🏙️", global: true },
  ],
  health: [
    { id: "bmi", name: "BMI Calculator", desc: "Body Mass Index with WHO classifications", icon: "⚕️", global: true },
    { id: "calories", name: "Calorie & TDEE Calculator", desc: "Daily calorie needs & macro targets", icon: "🥗", global: true },
    { id: "bodyfat", name: "Body Fat Calculator", desc: "Navy formula body fat percentage", icon: "💪", global: true },
    { id: "ideal-weight", name: "Ideal Weight Calculator", desc: "Healthy weight range — 4 clinical methods", icon: "🎯", global: true },
    { id: "water", name: "Water Intake Calculator", desc: "Daily hydration goal by weight & activity", icon: "💧", global: true },
  ],
  home: [
    { id: "rent-vs-buy", name: "Rent vs Buy Calculator", desc: "True long-term cost comparison", icon: "🏡", global: true },
    { id: "renovation", name: "Renovation Budget Calculator", desc: "Cost estimate by area, room type & grade", icon: "🔨", global: true },
    { id: "road-tax", name: "Road Tax Calculator", desc: "Malaysia vehicle road tax by engine capacity", icon: "🚗", tag: "MY" },
  ],
};

const ALL_TOOLS = Object.values(TOOLS).flat();

const CATEGORY_META = {
  finance:   { label: "Finance",       color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  datetime:  { label: "Date & Time",   color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  converters:{ label: "Converters",    color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
  daily:     { label: "Daily Tools",   color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  health:    { label: "Health",        color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  home:      { label: "Home & Living", color: "#06b6d4", bg: "rgba(6,182,212,0.1)" },
};

// ─── SEO: 10 FAQs per tool ──────────────────────────────────
const TOOL_FAQS = {
  salary: [
    { q: "How is net salary calculated?", a: "Net salary = Gross salary minus all mandatory deductions: income tax withholding, employee pension contributions, social security, and any additional funds like EIS or Zakat." },
    { q: "What is the EPF contribution rate in Malaysia?", a: "The standard EPF employee rate is 11% of gross salary. Employer contributes 13% for wages ≤ RM5,000 and 12% for wages above RM5,000." },
    { q: "What is PCB in a Malaysian payslip?", a: "PCB (Potongan Cukai Berjadual) is the monthly tax withholding deducted by employers under LHDN's progressive tax schedule, ranging from 1% to 24.5%." },
    { q: "What is SOCSO?", a: "SOCSO (Social Security Organisation) provides employment injury and invalidity protection. The employee contributes 0.5% of wages, capped at RM4,000 monthly salary." },
    { q: "What is EIS contribution?", a: "EIS (Employment Insurance System) provides income replacement if you lose your job. Both employee and employer contribute 0.2% each, capped at RM4,000 wages." },
    { q: "How is CPF calculated in Singapore?", a: "CPF (Central Provident Fund) employee rate is 20% for those under 55 years old, while employer contributes 17%. Rates decrease progressively with age." },
    { q: "What is the US Social Security tax rate?", a: "US Social Security tax is 6.2% for employees, matched by 6.2% from employers, up to the annual wage base limit (~$168,600 in 2024). Medicare adds 1.45% each." },
    { q: "How do I calculate take-home pay in the UK?", a: "UK take-home pay = Gross salary minus Income Tax (PAYE), National Insurance (employee 8%), and any pension contributions. The personal allowance is £12,570 per year." },
    { q: "Can I change contribution rates in this calculator?", a: "Yes. All pension, social security, EIS and additional fund rates are fully editable from 0% to 30%, allowing you to model any custom scenario for any country." },
    { q: "What is Zakat on income?", a: "Zakat Pendapatan is obligatory for eligible Muslims earning above the Nisab threshold (~RM22,600/year). The rate is 2.5% of annual income. Zakat paid can offset PCB tax payable." },
  ],
  currency: [
    { q: "How often are exchange rates updated?", a: "Exchange rates are fetched from Open Exchange Rates API and updated every hour automatically. The timestamp of the last update is displayed below the result." },
    { q: "Which currencies does this converter support?", a: "The converter supports 170+ world currencies including USD, EUR, GBP, MYR, SGD, JPY, AUD, CAD, CHF, CNY, HKD, INR, KRW, THB and all major global currencies." },
    { q: "How accurate are the exchange rates?", a: "Rates are sourced from a professional FX data provider and reflect mid-market rates. They are indicative rates — bank rates may differ by 1–3% due to spreads and fees." },
    { q: "What is the mid-market exchange rate?", a: "The mid-market rate is the midpoint between buy and sell rates in global currency markets. It is the fairest rate, often displayed by Google and XE.com." },
    { q: "Why is my bank rate different?", a: "Banks add a margin (spread) to the mid-market rate as their profit. This margin typically ranges from 1% to 5% depending on the currency pair and bank." },
    { q: "What is USD to MYR today?", a: "The USD to MYR rate fluctuates daily based on market forces. The live rate is shown in this calculator — click Convert to fetch the latest data." },
    { q: "How do I convert EUR to MYR?", a: "Select EUR as the From currency and MYR as the To currency, enter your amount, and click Convert. The calculator fetches live rates and shows the converted amount." },
    { q: "What is the SGD to MYR exchange rate?", a: "SGD to MYR is approximately 3.3–3.4 historically. Use this converter for the live rate updated every hour." },
    { q: "Does this calculator work offline?", a: "When live data is unavailable, the calculator uses approximate fallback rates and displays a warning. Always use live mode for accurate conversions." },
    { q: "What is a cross rate?", a: "A cross rate is an exchange rate between two currencies where neither is USD. For example, EUR/MYR is calculated via EUR/USD × USD/MYR as both cross through the US dollar." },
  ],
  bmi: [
    { q: "What is BMI?", a: "BMI (Body Mass Index) is calculated as weight (kg) divided by height squared (m²). It is a widely used screening tool to categorise weight status." },
    { q: "What is a healthy BMI range?", a: "WHO classifies BMI 18.5–24.9 as Normal Weight, below 18.5 as Underweight, 25–29.9 as Overweight, and 30+ as Obese." },
    { q: "Is BMI accurate for everyone?", a: "BMI does not account for muscle mass, bone density, fat distribution, or ethnicity. Athletes may have high BMI despite low body fat. It is a screening tool, not a diagnosis." },
    { q: "What BMI is considered obese?", a: "A BMI of 30 or above is classified as Obese Class I (30–34.9), Class II (35–39.9), or Class III (40+). Each carries progressively higher health risks." },
    { q: "How is BMI calculated in imperial units?", a: "Imperial BMI = (weight in pounds × 703) / (height in inches)². This calculator accepts both metric (kg/cm) and imperial (lbs/in) inputs." },
    { q: "What is the ideal BMI for Asians?", a: "WHO recommends lower BMI thresholds for Asian populations: overweight is defined as BMI ≥ 23 and obese as ≥ 27.5, due to higher metabolic risk at lower BMI values." },
    { q: "Does BMI differ for men and women?", a: "The BMI formula is the same for men and women, but interpretation differs. Women naturally have higher body fat percentage at the same BMI due to physiological differences." },
    { q: "What is a healthy BMI for women?", a: "A BMI of 18.5 to 24.9 is healthy for adult women. However, female athletes may have higher muscle mass resulting in a BMI above 25 without excess fat." },
    { q: "How can I lower my BMI?", a: "BMI is reduced by decreasing body weight through a calorie deficit (eating less than you burn) and increasing physical activity. Sustainable changes of 0.5–1 kg/week are recommended." },
    { q: "Is BMI a good predictor of health?", a: "BMI is a useful population-level screening tool but is limited at the individual level. Waist circumference, body fat percentage, and metabolic markers give a more complete picture." },
  ],
  loan: [
    { q: "How is a mortgage payment calculated?", a: "Monthly payment = P × r(1+r)^n / ((1+r)^n−1), where P is the loan amount, r is the monthly interest rate, and n is the total number of payments." },
    { q: "What is amortization?", a: "Amortization is the process of paying off a loan through regular payments. Early payments are mostly interest; later payments are mostly principal as the balance decreases." },
    { q: "What is a good interest rate for a home loan?", a: "Home loan rates vary by country and economic conditions. In Malaysia, rates are typically 3.5–5% p.a. In the US, 30-year fixed rates have ranged from 3% to 8% in recent years." },
    { q: "How does loan term affect total interest?", a: "A longer term reduces monthly payments but significantly increases total interest paid. A 30-year loan at 5% typically pays over double the principal in total interest." },
    { q: "What is the difference between flat rate and reducing balance?", a: "Flat rate charges interest on the original principal throughout. Reducing balance charges interest only on the outstanding balance, resulting in lower total interest." },
    { q: "How much loan can I afford?", a: "A common guideline is that total debt repayments should not exceed 35–40% of gross monthly income. Banks in Malaysia use DSR (Debt Service Ratio) to assess affordability." },
    { q: "What happens if I make extra payments?", a: "Extra principal payments reduce your outstanding balance, which lowers future interest charges and can shorten your loan term significantly." },
    { q: "What is LTV (Loan-to-Value)?", a: "LTV is the loan amount as a percentage of the property value. Malaysian banks typically lend up to 90% LTV for the first two properties (70% for the third)." },
    { q: "What is a fixed vs variable rate loan?", a: "Fixed rate loans have a constant interest rate throughout the term. Variable rate loans fluctuate with market benchmark rates (like OPR in Malaysia or SOFR in the US)." },
    { q: "How is car loan interest calculated?", a: "Car loans in Malaysia typically use the flat rate method. Total interest = principal × flat rate × years. The monthly payment = (principal + total interest) / months." },
  ],
  compound: [
    { q: "What is compound interest?", a: "Compound interest is earned on both the principal and previously accumulated interest, causing exponential growth over time — unlike simple interest which only earns on the principal." },
    { q: "How often should interest compound?", a: "The more frequent the compounding, the greater the returns. Daily compounding yields slightly more than monthly, which yields more than annual compounding." },
    { q: "What is the Rule of 72?", a: "The Rule of 72 estimates how many years to double an investment: divide 72 by the annual return rate. At 8% p.a., an investment doubles in approximately 9 years." },
    { q: "What is CAGR?", a: "CAGR (Compound Annual Growth Rate) is the rate at which an investment grows from start to end value, as if it grew at a steady annual rate. It smooths out year-to-year volatility." },
    { q: "How does monthly contribution affect compound growth?", a: "Regular contributions dramatically amplify compound growth. Adding RM500/month to a RM10,000 investment at 8% for 20 years grows to over RM320,000 vs RM46,600 without contributions." },
    { q: "What return should I expect from unit trusts?", a: "Malaysian unit trusts have historically returned 6–12% p.a. for equity funds over long periods. Past performance does not guarantee future results." },
    { q: "How does inflation affect investment returns?", a: "Real return = nominal return minus inflation. If your investment returns 8% p.a. but inflation is 3%, your real purchasing power grows at only 5%." },
    { q: "What is the difference between ROI and CAGR?", a: "ROI (Return on Investment) is the total percentage gain. CAGR annualises it. A 100% ROI over 10 years is a CAGR of about 7.2%." },
    { q: "Is compound interest better than simple interest?", a: "Yes. Compound interest grows exponentially while simple interest grows linearly. The difference becomes dramatic over long periods (20+ years)." },
    { q: "What investments use compound interest?", a: "Fixed deposits, savings accounts, unit trusts, ETFs, bonds, ASB, and most investment vehicles compound returns. The compounding frequency varies by product." },
  ],
  age: [
    { q: "How is exact age calculated?", a: "Exact age is calculated by counting complete years, then remaining months, then remaining days from your date of birth to today's date, accounting for varying month lengths." },
    { q: "How many days old am I?", a: "Your total age in days equals the number of days between your date of birth and today. This calculator shows days, weeks, months, and years simultaneously." },
    { q: "Does the age calculator account for leap years?", a: "Yes. The calculator uses JavaScript's Date object which correctly handles all leap years, ensuring accurate day counts across decades." },
    { q: "What is the legal age of majority globally?", a: "The legal age of majority varies: 18 in most countries, 19 in South Korea and some US states, 20 in Japan, and 21 in some countries. This calculator shows your current age for reference." },
    { q: "How do I calculate my age in months?", a: "Total months = (years × 12) + remaining months. This calculator shows both the breakdown (e.g., 32 years, 4 months, 12 days) and total months." },
    { q: "What day of the week was I born?", a: "The calculator determines your birth date, and you can cross-reference with a calendar. Future versions will display the day of week directly." },
    { q: "How is age calculated for newborns?", a: "For babies under 2 years, age is expressed in months and days. This calculator shows all units, making it suitable for tracking infant milestones." },
    { q: "Can I calculate someone else's age?", a: "Yes. Simply enter any date of birth in the date field and the calculator will compute the exact age of any person or entity from that date to today." },
    { q: "How is retirement age calculated?", a: "Enter your date of birth and your country's retirement age (e.g., 60 in Malaysia, 65–67 in UK/US) to find how many years remain until retirement." },
    { q: "What is chronological age vs biological age?", a: "Chronological age is the time since birth (what this calculator measures). Biological age reflects your body's actual health and cellular ageing, which can differ significantly." },
  ],
  calories: [
    { q: "What is TDEE?", a: "TDEE (Total Daily Energy Expenditure) is the total calories your body burns daily, including Basal Metabolic Rate (BMR) plus calories burned through activity and digestion." },
    { q: "How is BMR calculated?", a: "This calculator uses the Mifflin-St Jeor equation, widely considered the most accurate: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age + 5 (men) or −161 (women)." },
    { q: "How many calories should I eat to lose weight?", a: "A deficit of 500 calories/day below your TDEE typically produces ~0.5 kg of fat loss per week, considered a safe and sustainable rate." },
    { q: "What are macronutrients?", a: "Macronutrients are protein (4 kcal/g), carbohydrates (4 kcal/g), and fat (9 kcal/g). This calculator provides recommended macro targets based on your TDEE." },
    { q: "How many calories does exercise burn?", a: "Exercise adds to your TDEE. Activities like running burn ~8–10 kcal/min, while walking burns ~3–5 kcal/min depending on body weight and intensity." },
    { q: "What is a caloric surplus?", a: "A caloric surplus (eating more than TDEE) is required for muscle gain. A modest surplus of 200–300 calories is recommended to minimise fat gain." },
    { q: "How much protein do I need daily?", a: "General recommendation: 1.6–2.2g protein per kg bodyweight for active individuals. Higher intakes support muscle retention during weight loss." },
    { q: "What activity level should I choose?", a: "Sedentary = desk job, little exercise. Light = exercise 1–3 days/week. Moderate = 3–5 days/week. Active = 6–7 days/week. Very Active = athlete or physical labour job." },
    { q: "Does age affect calorie needs?", a: "Yes. BMR decreases approximately 2–3% per decade after age 20 due to decreased muscle mass and metabolic rate changes, meaning calorie needs decrease as you age." },
    { q: "Are calorie calculators accurate?", a: "TDEE calculators provide estimates within ±10–15% for most people. Individual factors like genetics, gut microbiome, and hormones affect actual energy expenditure." },
  ],
  "date-diff": [
    { q: "How are days between dates calculated?", a: "The calculator finds the absolute difference in milliseconds between two dates and converts to days, weeks, months, and years." },
    { q: "Does the calculation include both start and end dates?", a: "The total days count includes the start date. For example, Jan 1 to Jan 3 returns 2 days (the duration), not 3 days." },
    { q: "How are months calculated between dates?", a: "Months are approximated as days divided by 30.44 (average days per month). For exact month counting, the calculator also shows complete calendar months." },
    { q: "Can I calculate past and future dates?", a: "Yes. The calculator handles any direction — past to present, present to future, or any two dates regardless of order. It always returns the absolute difference." },
    { q: "Does it account for leap years?", a: "Yes. JavaScript's Date object correctly handles leap years, ensuring accurate day counts even across February 29th boundaries." },
    { q: "How do I calculate age from a date?", a: "Use the Age Calculator for precise age with years, months and days. The Date Difference tool is better for arbitrary date spans like project durations." },
    { q: "How many weeks are in a year?", a: "A standard year has 52 weeks and 1 day (365 days). A leap year has 52 weeks and 2 days (366 days)." },
    { q: "How do I count working days between dates?", a: "Use the Working Days Calculator on this site, which counts only Monday–Friday between any two dates." },
    { q: "How many days until Christmas?", a: "Use the Countdown Timer on this site to get a live countdown to Christmas (December 25) or any other date." },
    { q: "Can I calculate the difference between times, not just dates?", a: "This tool calculates date differences in whole days. For time-of-day differences, the Time Zone Converter on this site handles time comparisons across zones." },
  ],
  discount: [
    { q: "How do I calculate a discount percentage?", a: "Discount % = ((Original Price − Sale Price) / Original Price) × 100. This calculator automatically computes the discount amount and final price." },
    { q: "How do I find the original price before discount?", a: "Original Price = Sale Price / (1 − Discount%). Switch to 'Find original' mode in this calculator to reverse-calculate." },
    { q: "How do I stack multiple discounts?", a: "Stacked discounts are multiplicative, not additive. A 20% then 10% discount = 1 − (0.8 × 0.9) = 28% total, not 30%." },
    { q: "What is the difference between discount and rebate?", a: "A discount reduces the price at the point of sale. A rebate is a refund given after purchase, often requiring claim submission." },
    { q: "How do I calculate 30% off a price?", a: "Sale price = Original × 0.70. For RM199, a 30% discount gives RM199 × 0.70 = RM139.30, saving RM59.70." },
    { q: "What is a markdown vs markup?", a: "Markdown reduces price from the retail price. Markup increases price from cost. This calculator handles both percentage-off and fixed-amount discounts." },
    { q: "How do I calculate tax after discount?", a: "Apply the discount first to get the discounted price, then apply tax to that discounted price. Tax on discounted amount = Discounted Price × Tax Rate." },
    { q: "What is a clearance sale discount?", a: "Clearance discounts typically range from 30–80% off original retail price. Retailers use them to clear excess inventory at end of season." },
    { q: "How do I calculate savings in percentage?", a: "Savings % = (Amount Saved / Original Price) × 100. This calculator shows both the cash savings amount and the percentage saved." },
    { q: "Is a higher discount always better?", a: "Not always. Compare the final prices across stores — a 50% discount on an overpriced item may cost more than a 10% discount on a fairly priced one." },
  ],
  fuel: [
    { q: "How is fuel cost calculated?", a: "Fuel cost = (Distance ÷ 100) × Fuel consumption (L/100km) × Fuel price per litre." },
    { q: "What is the average fuel consumption of a car?", a: "Most modern sedans consume 7–12 litres per 100km. SUVs use 9–15 L/100km. Hybrid vehicles can achieve 4–6 L/100km." },
    { q: "What is the fuel price in Malaysia?", a: "RON 95 petrol in Malaysia is regulated at RM2.05/litre for eligible vehicles (as of 2024). RON 97 and diesel are market-priced and change weekly." },
    { q: "How do I convert MPG to L/100km?", a: "L/100km = 235.21 ÷ MPG. For example, 35 MPG = 235.21 ÷ 35 = 6.72 L/100km. This calculator accepts L/100km as input." },
    { q: "How does driving speed affect fuel consumption?", a: "Fuel efficiency peaks around 80–90 km/h for most vehicles. Highway speeds above 110 km/h significantly increase fuel consumption due to aerodynamic drag." },
    { q: "How much does a Kuala Lumpur to Singapore trip cost in fuel?", a: "The KL–Singapore distance is approximately 350 km. At 8 L/100km and RM2.05/litre, the fuel cost is about 350 × 0.08 × 2.05 = RM57.40 one way." },
    { q: "How do I reduce my fuel costs?", a: "Drive at steady speeds, maintain correct tyre pressure, avoid excessive air-conditioning, and reduce unnecessary weight in the vehicle." },
    { q: "Does carrying extra weight increase fuel use?", a: "Yes. Every 50 kg of extra weight increases fuel consumption by approximately 1–2%. Remove unnecessary items from your boot for better efficiency." },
    { q: "How is fuel efficiency measured in different countries?", a: "The US uses MPG (miles per gallon). Most countries use L/100km. UK uses both MPG and L/100km. This calculator uses L/100km as the standard unit." },
    { q: "What is idling fuel consumption?", a: "A typical car idles at 0.5–1 litre per hour. Turning off your engine rather than idling for more than 1 minute saves fuel and reduces emissions." },
  ],
  tip: [
    { q: "How much should I tip?", a: "Tipping customs vary by country. In the US, 15–20% is standard at restaurants. In Malaysia, service charge is usually included (10%). In Japan, tipping is not customary." },
    { q: "How do I calculate a 15% tip?", a: "Multiply the bill by 0.15. On a RM200 bill, a 15% tip = RM30, making the total RM230. This calculator does the maths instantly." },
    { q: "How do I split a bill equally?", a: "Total including tip ÷ number of people. This calculator handles any number of diners and any tip percentage." },
    { q: "Should I tip on pre-tax or post-tax amount?", a: "In the US, most people tip on the pre-tax bill amount. In other countries, tipping on the total displayed is standard." },
    { q: "How do I split a bill unevenly?", a: "This calculator provides the equal split with tip. For custom unequal splits, use the per-person amount and adjust manually for individual items." },
    { q: "What is a service charge?", a: "A service charge is a mandatory addition (e.g., 10% in Malaysia) pre-added by the restaurant. Unlike a tip, it may not go directly to the server." },
    { q: "Is it rude not to tip?", a: "This depends on local customs. In North America and some European countries, not tipping is considered rude. In East Asia, tipping is often unnecessary or even declined." },
    { q: "How do I tip with multiple payment methods?", a: "Calculate the total per person including tip using this calculator, then each person pays their share via whatever method they choose." },
    { q: "Should I tip on a buffet?", a: "A smaller tip of 5–10% is common for buffet service where staff still bring drinks and clear plates." },
    { q: "What is the GST/SST tip rule in Malaysia?", a: "In Malaysia, many restaurants add 10% service charge + 6% SST. You should check if service charge is already included before adding an extra tip." },
  ],
  password: [
    { q: "How secure is this password generator?", a: "This generator uses the Web Cryptography API (crypto.getRandomValues()), which provides cryptographically strong random values certified for security applications." },
    { q: "What makes a password strong?", a: "A strong password has: minimum 12 characters, a mix of uppercase, lowercase, numbers and symbols, no dictionary words, and is unique to each account." },
    { q: "How long should my password be?", a: "Security experts recommend at least 16 characters. Each additional character exponentially increases the time required to crack it by brute force." },
    { q: "Is it safe to use an online password generator?", a: "This generator creates passwords entirely in your browser using JavaScript — no passwords are sent to any server, logged, or stored anywhere." },
    { q: "Should I use a password manager?", a: "Yes. A password manager (like Bitwarden, 1Password, or iCloud Keychain) stores unique, complex passwords for every site, so you only need to remember one master password." },
    { q: "What is entropy in password security?", a: "Entropy measures password randomness in bits. A 16-character password using all character types has ~95 bits of entropy — effectively uncrackable by brute force." },
    { q: "What are common password mistakes?", a: "Using personal information (birthdays, names), reusing passwords across sites, using simple substitutions (p@ssw0rd), and passwords under 12 characters." },
    { q: "What is two-factor authentication (2FA)?", a: "2FA adds a second verification step (usually a code from an authenticator app or SMS) after your password, significantly increasing account security." },
    { q: "How often should I change my passwords?", a: "Current NIST guidelines recommend changing passwords only when you suspect a breach, rather than on a fixed schedule, as frequent changes lead to weaker choices." },
    { q: "Can someone guess a randomly generated password?", a: "A 16-character random password with mixed characters has over 10^31 possible combinations — billions of years to crack even with supercomputers." },
  ],
  percentage: [
    { q: "How do I calculate 20% of 500?", a: "Multiply 500 by 0.20 to get 100. Or: 500 × 20 ÷ 100 = 100. This calculator handles this instantly in 'X% of Y' mode." },
    { q: "How do I calculate percentage increase?", a: "% Increase = ((New Value − Old Value) / Old Value) × 100. Use 'Percentage Change' mode in this calculator." },
    { q: "What is the formula for percentage decrease?", a: "% Decrease = ((Old Value − New Value) / Old Value) × 100. The result will be negative if the value increased." },
    { q: "How do I find what percentage X is of Y?", a: "X is what % of Y = (X / Y) × 100. Enter the values in 'X is ?% of Y' mode and the calculator shows the answer instantly." },
    { q: "How do I reverse a percentage increase?", a: "If a value increased by N%, the original = New Value / (1 + N/100). For a 20% increase to 120, the original was 120 / 1.20 = 100." },
    { q: "How do I calculate GST/VAT from a price?", a: "If GST is 6%: Tax amount = Price × 0.06. Price before tax = Total / 1.06. This calculator can be used in 'X% of Y' mode for this." },
    { q: "What is a percentage point vs a percentage?", a: "A percentage point is an absolute difference between two percentages. If interest rises from 3% to 5%, it rose 2 percentage points, but 66.7% relative increase." },
    { q: "How do I calculate a tip percentage?", a: "Tip % = (Tip Amount / Bill Amount) × 100. Use the Tip Calculator on this site for full bill-splitting with tip calculation." },
    { q: "How do I calculate exam scores as percentages?", a: "Score % = (Marks Obtained / Total Marks) × 100. Enter your marks as X and total marks as Y in 'X is ?% of Y' mode." },
    { q: "What is compound percentage growth?", a: "Compound growth applies percentage growth repeatedly. 10% growth for 3 years = 1.10 × 1.10 × 1.10 = 1.331, a total 33.1% increase." },
  ],
  "working-days": [
    { q: "What counts as a working day?", a: "Working days (also called business days) are Monday to Friday, excluding Saturday and Sunday. This calculator counts only Mon–Fri days." },
    { q: "Are public holidays excluded from working days?", a: "This calculator excludes weekends. For country-specific public holiday deduction, use it alongside the Public Holiday Calendar tool on this site." },
    { q: "How do I calculate working days for a contract?", a: "Enter the contract start and end dates. The calculator returns the exact number of working days (Mon–Fri) in that period." },
    { q: "How many working days are in a month?", a: "Typically 20–23 working days per month (4–5 weeks × 5 days). February has the fewest; months with 31 days may have 23." },
    { q: "How many working days are in a year?", a: "A standard year has 260–262 working days (365 days minus 104 weekend days). Public holidays reduce this to typically 240–250 depending on the country." },
    { q: "How do I add working days to a date?", a: "Enter your start date and the number of months/period you need. The calculator shows the end date after the specified number of working days." },
    { q: "What is SLA calculation?", a: "SLA (Service Level Agreement) deadlines are often measured in business days. Enter the ticket date and SLA days to find the due date." },
    { q: "How are working days counted in Malaysia?", a: "In Malaysia, working days are Mon–Fri for most sectors. However, Kelantan, Terengganu, and Kedah have Fri–Sat weekends, with Sunday as a working day in some areas." },
    { q: "What is a business day vs a calendar day?", a: "A calendar day counts all 7 days of the week. A business day counts only Mon–Fri. Contract terms often specify which applies." },
    { q: "Can I calculate working hours between dates?", a: "This calculator returns working days. For working hours, multiply by your daily working hours (e.g., 8 hours for a standard full-time role)." },
  ],
  water: [
    { q: "How much water should I drink per day?", a: "A general guideline is 35ml per kg of body weight. A 70kg person needs approximately 2.45 litres daily, more if active or in a hot climate." },
    { q: "Does the 8 glasses a day rule hold?", a: "The '8×8' rule (eight 250ml glasses = 2 litres) is a rough guide but not scientifically precise. Actual needs vary by body weight, activity, and climate." },
    { q: "Does tea and coffee count toward water intake?", a: "Yes. While caffeinated drinks have mild diuretic effects, research shows coffee and tea still contribute positively to daily fluid intake." },
    { q: "Does food contribute to water intake?", a: "Yes. Fruits and vegetables (especially cucumber, watermelon, lettuce) are 90–95% water. Diet typically provides 20–30% of daily water needs." },
    { q: "How does activity level affect water needs?", a: "Physical activity increases water needs significantly. Add 500–1000ml for every hour of moderate exercise, more in hot weather or for intense activity." },
    { q: "What are signs of dehydration?", a: "Early signs: dark yellow urine, thirst, dry mouth. Moderate: headache, dizziness, fatigue. Severe dehydration requires immediate medical attention." },
    { q: "Can you drink too much water?", a: "Yes. Overhydration (hyponatremia) can occur if excessive water dilutes blood sodium levels. This is rare but can occur during endurance sports." },
    { q: "Does climate affect how much water I need?", a: "Hot and humid climates increase sweat rate, requiring more water. The calculator applies a 15% increase for hot climates to recommended daily intake." },
    { q: "How do I track water intake?", a: "Use a water bottle with volume markings, a hydration tracking app, or set hourly reminders. This calculator converts your daily goal to number of 250ml glasses." },
    { q: "Do I need more water when pregnant?", a: "Pregnant women need approximately 2.3 litres/day; breastfeeding women need 3.1 litres/day. Consult your healthcare provider for personalised guidance." },
  ],
  "rent-vs-buy": [
    { q: "Is it better to rent or buy a house?", a: "It depends on your financial situation, market conditions, and life plans. Buying builds equity but requires capital. Renting offers flexibility without large upfront costs." },
    { q: "What is the price-to-rent ratio?", a: "P/R ratio = Property Price / Annual Rent. Below 15 favours buying; 15–20 is neutral; above 20 favours renting. In Kuala Lumpur, P/R ratios are typically 25–35." },
    { q: "What hidden costs of buying are often overlooked?", a: "Stamp duty, legal fees, valuation fees, maintenance fees, sinking fund, property tax, renovation costs, and opportunity cost of the down payment." },
    { q: "What is the opportunity cost of a down payment?", a: "If your 10% down payment is RM50,000, that money could alternatively be invested. At 8% returns, it could grow to over RM230,000 in 20 years." },
    { q: "How much down payment is required for a house in Malaysia?", a: "Minimum 10% for the first two residential properties, 30% for the third and subsequent properties under Bank Negara Malaysia guidelines." },
    { q: "Does renting build wealth?", a: "Renting itself does not build wealth directly, but the money saved vs buying (lower monthly cost, no down payment) can be invested to build wealth." },
    { q: "What is property appreciation?", a: "Property appreciation is the increase in property value over time. Malaysian residential property has historically appreciated 3–7% p.a. in key markets." },
    { q: "What break-even year means in rent vs buy?", a: "The break-even year is when cumulative buying costs (including equity built) equal cumulative renting costs. Buying typically becomes better after 7–10 years." },
    { q: "How does loan tenure affect rent vs buy decision?", a: "Longer loan tenure = lower monthly cost but more total interest. Compare 20-year vs 30-year scenarios to find the optimal tenure for your situation." },
    { q: "What is RPGT in Malaysia?", a: "RPGT (Real Property Gains Tax) is taxed on property sale profits. Rates reduce with holding period: 30% if sold within 3 years, 0% after 5 years for Malaysian citizens." },
  ],
  temperature: [
    { q: "How do you convert Celsius to Fahrenheit?", a: "°F = (°C × 9/5) + 32. For example, 25°C = (25 × 1.8) + 32 = 77°F. This calculator converts between all three scales instantly." },
    { q: "How do you convert Fahrenheit to Celsius?", a: "°C = (°F − 32) × 5/9. For example, 98.6°F = (98.6 − 32) × 5/9 = 37°C (normal body temperature)." },
    { q: "What is 0 degrees Celsius in Fahrenheit?", a: "0°C = 32°F (the freezing point of water). 100°C = 212°F (the boiling point of water at sea level)." },
    { q: "What is absolute zero in Celsius?", a: "Absolute zero is −273.15°C (or 0 Kelvin), the theoretical lowest possible temperature where all molecular motion stops." },
    { q: "What is normal body temperature?", a: "Normal human body temperature is 37°C (98.6°F). A fever is typically defined as above 38°C (100.4°F)." },
    { q: "What temperature does water boil and freeze?", a: "Water freezes at 0°C (32°F) and boils at 100°C (212°F) at sea level. Boiling point decreases at high altitudes due to lower atmospheric pressure." },
    { q: "What is the Kelvin scale used for?", a: "Kelvin is the SI unit of temperature used in science and physics. Unlike Celsius and Fahrenheit, Kelvin has no negative values — 0K is absolute zero." },
    { q: "What is room temperature in Celsius and Fahrenheit?", a: "Room temperature is typically 20–22°C (68–72°F). In scientific contexts, standard room temperature is defined as 25°C (77°F)." },
    { q: "What is Malaysia's average temperature?", a: "Malaysia has a tropical climate with average temperatures of 27–30°C (80–86°F) year-round. The Cameron Highlands are cooler at 12–25°C." },
    { q: "What is the hottest temperature ever recorded on Earth?", a: "The highest reliably recorded temperature was 56.7°C (134°F) at Furnace Creek, Death Valley, USA in 1913." },
  ],
  bodyfat: [
    { q: "How is body fat percentage measured?", a: "Methods include DEXA scan (most accurate), hydrostatic weighing, skinfold calipers, BIA (bioelectrical impedance), and the US Navy circumference method used in this calculator." },
    { q: "What is a healthy body fat percentage?", a: "For men: essential fat 2–5%, athlete 6–13%, fitness 14–17%, acceptable 18–24%, obese 25%+. For women: essential 10–13%, athlete 14–20%, fitness 21–24%, acceptable 25–31%, obese 32%+." },
    { q: "How accurate is the Navy body fat formula?", a: "The US Navy method has an accuracy of ±3–4% compared to DEXA scans. It is suitable for tracking changes over time, not for precise single measurements." },
    { q: "What measurements are needed for the Navy formula?", a: "Men need neck and waist circumference plus height. Women additionally need hip circumference. All measurements in centimetres at specific body locations." },
    { q: "Where do I measure waist circumference?", a: "Measure at the narrowest point of the waist (for men, at the navel level). For women, measure at the narrowest point above the navel. Measure after exhaling." },
    { q: "Does BMI tell you about body fat?", a: "BMI does not directly measure body fat. Two people with the same BMI can have very different body fat percentages, especially athletes vs sedentary individuals." },
    { q: "What is visceral fat?", a: "Visceral fat is fat stored around internal organs in the abdominal cavity. High visceral fat is linked to greater cardiovascular disease risk than subcutaneous fat." },
    { q: "How do I reduce body fat percentage?", a: "Consistent caloric deficit (500 cal/day below TDEE), adequate protein intake (1.6–2.2g/kg), resistance training to preserve muscle, and patience — sustainable fat loss is 0.5–1%/month." },
    { q: "What is the difference between body fat and BMI?", a: "BMI estimates weight relative to height. Body fat % measures the actual proportion of fat in your body. Body fat is a better indicator of metabolic health." },
    { q: "Can body fat percentage be too low?", a: "Yes. Essential fat (below ~5% men, 13% women) is required for hormonal function, organ protection, and survival. Extremely low body fat causes serious health complications." },
  ],
  "ideal-weight": [
    { q: "What is the ideal weight for my height?", a: "Ideal weight varies by formula, gender, and frame size. This calculator shows four clinical formula results: Devine, Miller, Hamwi, and the BMI-22 method." },
    { q: "What is the Devine formula?", a: "Devine (1974): Men = 50 + 2.3kg per inch over 5 feet. Women = 45.5 + 2.3kg per inch over 5 feet. Originally designed for medication dosing." },
    { q: "What is the Hamwi method?", a: "Hamwi (1964): Men = 48kg + 2.7kg per inch over 5 feet. Women = 45.4kg + 2.27kg per inch over 5 feet. Used clinically for nutritional assessment." },
    { q: "What is the Miller formula for ideal weight?", a: "Miller (1983): Men = 56.2 + 1.41kg per inch over 5 feet. Women = 53.1 + 1.36kg per inch over 5 feet. Tends to give slightly higher values than Devine." },
    { q: "Which ideal weight formula is most accurate?", a: "No single formula is definitively superior for individuals. Research suggests the average of multiple formulas provides a reasonable target range." },
    { q: "Is there an ideal weight for athletes?", a: "Athletes may weigh more than standard formulas suggest due to muscle mass. For athletes, body composition (body fat %) is more relevant than scale weight." },
    { q: "What is a healthy weight range for a 170cm woman?", a: "Using BMI 18.5–24.9: ideal weight for 170cm = 53.5–71.9kg. Devine formula gives 61.8kg. The range accounts for natural variation in body composition." },
    { q: "Should I aim for the lowest ideal weight?", a: "No. Aim for the middle of your healthy weight range. Being at the very low end may not be sustainable and could compromise strength and energy levels." },
    { q: "Does age affect ideal weight?", a: "Most formulas do not factor in age. Some research suggests slightly higher body weight may be acceptable in older adults (65+) for overall health outcomes." },
    { q: "How is ideal weight different from goal weight?", a: "Ideal weight is a health-based target. Goal weight is personal and may differ. Ensure your goal weight falls within the healthy BMI range for your height." },
  ],
  inflation: [
    { q: "What is inflation?", a: "Inflation is the rate at which the general level of prices for goods and services rises over time, eroding purchasing power of money." },
    { q: "How is inflation calculated?", a: "Inflation is measured using a Consumer Price Index (CPI), which tracks price changes of a basket of commonly purchased goods and services over time." },
    { q: "What is Malaysia's average inflation rate?", a: "Malaysia's average CPI inflation has been 2–4% annually over the past decade, with higher readings in 2022–2023 due to global supply chain disruptions." },
    { q: "How does inflation affect savings?", a: "If your savings account earns 2% interest but inflation is 4%, your real purchasing power decreases by 2% each year — your money buys less even as the balance grows." },
    { q: "What is the rule of 70 for inflation?", a: "Divide 70 by the inflation rate to estimate how many years it takes for prices to double. At 3.5% inflation, prices double in approximately 20 years." },
    { q: "What is hyperinflation?", a: "Hyperinflation is extremely rapid inflation, typically defined as over 50% per month. Historical examples include Zimbabwe (2008) and Germany (1923)." },
    { q: "How does the central bank control inflation?", a: "Central banks raise interest rates to reduce borrowing and spending, which slows economic demand and moderates price increases." },
    { q: "What is real vs nominal value?", a: "Nominal value is the face value of money. Real value adjusts for inflation to reflect true purchasing power. This calculator shows both nominal future value and real value." },
    { q: "What inflation rate should I use for projections?", a: "For conservative financial planning, use 3–4% for general expenses. Use 5–7% for healthcare and education costs, which typically inflate faster than CPI." },
    { q: "How does inflation affect retirement planning?", a: "RM1,000,000 today at 3% inflation will only have the purchasing power of RM552,000 in 20 years. Retirement planning must account for inflation to avoid shortfalls." },
  ],
  "profit-margin": [
    { q: "What is gross profit margin?", a: "Gross profit margin = (Revenue − Cost of Goods Sold) / Revenue × 100. It shows how efficiently a company produces its products after direct costs." },
    { q: "What is the difference between margin and markup?", a: "Margin = Profit / Revenue × 100. Markup = Profit / Cost × 100. A 50% markup equals a 33.3% margin. Markup is always higher than margin for the same profit." },
    { q: "What is a good profit margin by industry?", a: "Software/SaaS: 70–90%. Retail: 2–5%. Restaurants: 3–9%. Manufacturing: 5–20%. Professional services: 20–40%. Margins vary widely by sector." },
    { q: "How do I calculate net profit margin?", a: "Net profit margin = Net Profit (after all expenses, tax, interest) / Revenue × 100. This calculator focuses on gross margin; deduct overhead for net margin." },
    { q: "How does pricing strategy affect profit margin?", a: "Premium pricing increases margin but may reduce volume. Competitive pricing lowers margin but increases volume. The optimal strategy balances both." },
    { q: "What is contribution margin?", a: "Contribution margin = Revenue − Variable Costs. It shows how much each sale contributes to covering fixed costs and generating profit." },
    { q: "How do I improve profit margin?", a: "Increase prices (if market allows), reduce COGS through better sourcing, improve operational efficiency, and reduce overheads." },
    { q: "What is EBITDA?", a: "EBITDA = Earnings Before Interest, Tax, Depreciation and Amortisation. It measures core operating profitability, removing non-cash items and financing effects." },
    { q: "What is break-even point?", a: "Break-even = Fixed Costs / (Price per unit − Variable Cost per unit). At this point, total revenue equals total costs and profit is zero." },
    { q: "How do I calculate profit margin for a product?", a: "Enter the selling price as Revenue and production/purchase cost as Cost in this calculator. It will show gross profit, margin percentage, and markup." },
  ],
  timezone: [
    { q: "How do I convert time zones?", a: "Select your source city and time zone, enter the time, then select the target time zone. The calculator converts and adjusts for DST automatically." },
    { q: "What is UTC?", a: "UTC (Coordinated Universal Time) is the primary time standard. All time zones are expressed as UTC offsets (e.g., Malaysia is UTC+8, UK standard time is UTC+0)." },
    { q: "What is GMT?", a: "GMT (Greenwich Mean Time) is practically identical to UTC but is a historical time standard. UTC is the modern successor used in computing and aviation." },
    { q: "What is Daylight Saving Time (DST)?", a: "DST advances clocks 1 hour during summer months in regions that observe it (USA, Europe, Australia). Malaysia, Singapore and Japan do NOT observe DST." },
    { q: "What time zone is Malaysia in?", a: "Malaysia Standard Time (MST) is UTC+8. It does not observe Daylight Saving Time. Malaysia Time is the same as Singapore Time (SGT) and China Standard Time (CST)." },
    { q: "What is the time difference between KL and London?", a: "Kuala Lumpur (UTC+8) is 8 hours ahead of London (UTC+0 GMT). During UK Summer Time (BST, UTC+1), the difference is 7 hours." },
    { q: "How many time zones does the USA have?", a: "The continental US has 4 time zones: Eastern (UTC−5), Central (UTC−6), Mountain (UTC−7), Pacific (UTC−8). Alaska (UTC−9) and Hawaii (UTC−10) add two more." },
    { q: "What is IST (Indian Standard Time)?", a: "India Standard Time is UTC+5:30. India uses a single time zone for the entire country and does not observe Daylight Saving Time." },
    { q: "How do I schedule an international meeting?", a: "Use this Time Zone Converter to find overlapping business hours. A good overlap for US/Europe/Asia meetings is often around 8–9 AM in the US East Coast." },
    { q: "What time zone is used for international flights?", a: "Aviation uses UTC (Zulu time) for all scheduling. Flight times shown in booking systems are in local time of departure and arrival cities." },
  ],
  countdown: [
    { q: "How does a countdown timer work?", a: "The countdown calculates the difference between the target date and the current date/time, displaying the remaining days, hours, minutes, and seconds." },
    { q: "How many days until New Year?", a: "Use this countdown timer — set the date to January 1 of the next year and it will show the live countdown in days, hours, minutes and seconds." },
    { q: "How many days until Hari Raya 2025?", a: "Hari Raya Aidilfitri (Eid al-Fitr) date varies each year based on the Islamic lunar calendar. Set the confirmed date in the countdown for an accurate countdown." },
    { q: "Can I use this for a wedding countdown?", a: "Yes. Enter your wedding date and the calculator displays a live countdown. Share the URL with guests for real-time anticipation." },
    { q: "How many days until Christmas 2025?", a: "Enter December 25, 2025 into the countdown timer to see the live days, hours, minutes and seconds remaining until Christmas." },
    { q: "How many days are in a year?", a: "A standard year has 365 days. A leap year (divisible by 4, except centuries not divisible by 400) has 366 days. The countdown handles leap years automatically." },
    { q: "Can I count down to a specific time?", a: "The current version counts down to midnight of the target date. For specific times, note the hours remaining from the countdown display." },
    { q: "How do I calculate how many weeks until a date?", a: "The Date Difference calculator shows exact weeks. The Countdown Timer shows a real-time breakdown. Both tools are on this site." },
    { q: "What is the most popular countdown event?", a: "New Year's Eve, Christmas, Eid al-Fitr, Chinese New Year, and personal events like weddings and birthdays are the most common countdown targets." },
    { q: "How many days until my birthday?", a: "Enter your next birthday date into the countdown timer to see how many days, hours, minutes and seconds remain." },
  ],
  sst: [
    { q: "What is SST in Malaysia?", a: "SST (Sales and Service Tax) replaced GST in September 2018. Service Tax is charged on B2B taxable services, while Sales Tax applies to manufactured and imported goods." },
    { q: "What is the Service Tax rate in Malaysia?", a: "From March 1, 2024, Service Tax increased from 6% to 8% for most services. F&B and telecommunications services remain at 6%." },
    { q: "What is the Sales Tax rate?", a: "Sales Tax applies at 5% (basic necessities) or 10% (most other goods). Some goods are exempt or zero-rated." },
    { q: "What services are subject to 8% Service Tax?", a: "Professional services, IT services, management services, accounting, legal, advertising, and most B2B services now attract 8% Service Tax." },
    { q: "What services remain at 6% Service Tax?", a: "Food and beverages, telecommunications services, and some other essential services remain at the 6% rate after the 2024 increase." },
    { q: "Is SST charged on food in Malaysia?", a: "Service Tax of 6% applies at food service establishments with annual turnover above RM1.5 million. Most small hawker stalls and food courts do not charge SST." },
    { q: "How is SST different from GST?", a: "GST was a broad-based consumption tax at 6% on all goods and services. SST is narrower, with Sales Tax on goods at point of manufacture/import, and Service Tax on specific services." },
    { q: "Do I need to register for SST?", a: "Service Tax registration is required if your taxable service revenue exceeds RM500,000/year. Sales Tax registration threshold is RM500,000 in annual sales." },
    { q: "How do I calculate price inclusive of SST?", a: "Price before SST = Inclusive Price / 1.06 (for 6%) or / 1.08 (for 8%). The SST amount = Inclusive Price − Price before SST." },
    { q: "What is SST on imported goods?", a: "Imported goods are subject to Sales Tax at the point of customs clearance. The applicable rate (5% or 10%) depends on the HS code classification of the goods." },
  ],
  zakat: [
    { q: "What is Zakat?", a: "Zakat is one of the Five Pillars of Islam. It is an obligatory annual payment of 2.5% on qualifying assets by Muslims whose wealth exceeds the Nisab threshold." },
    { q: "What is Nisab in 2024?", a: "Nisab is the minimum wealth threshold triggering Zakat obligation. It equals the value of 85 grams of gold (~RM22,000–RM25,000 in 2024, varying with gold prices)." },
    { q: "What is Zakat on income (Zakat Pendapatan)?", a: "Zakat Pendapatan is 2.5% of annual employment income (net after deductions) for Muslims earning above the Nisab. It may be paid monthly at 2.5% of monthly income." },
    { q: "What is Haul in Zakat?", a: "Haul is the condition that wealth must have been held for one complete lunar year (354 days) before Zakat becomes due on it." },
    { q: "Can Zakat offset income tax in Malaysia?", a: "Yes. Zakat paid to a state Zakat authority can be deducted from assessed income tax (PCB) ringgit-for-ringgit, up to the full tax amount payable." },
    { q: "What types of wealth are Zakat-liable?", a: "Zakat is payable on gold and silver, savings and investments, business stock and profits, agriculture produce, livestock, and employment income (Zakat Pendapatan)." },
    { q: "What is Zakat Fitrah?", a: "Zakat Fitrah is a fixed annual payment per person during Ramadan, set annually by state Islamic authorities. In 2024, it is RM7 per person in most Malaysian states." },
    { q: "Where do I pay Zakat in Malaysia?", a: "Zakat is administered by state Islamic religious councils (LHDN for some categories). Online payment is available via Lembaga Zakat Selangor, MAIWP, and other state bodies." },
    { q: "Is Zakat on EPF savings required?", a: "There are differing scholarly opinions. Some state Zakat authorities require Zakat on EPF savings above Nisab if held for one year, while others exempt it until withdrawal." },
    { q: "What is Zakat on gold?", a: "Gold jewellery above 85g of gold content is subject to 2.5% Zakat after holding for one year. The calculation is based on the current market value of the gold." },
  ],
  ptptn: [
    { q: "What is PTPTN?", a: "PTPTN (Perbadanan Tabung Pendidikan Tinggi Nasional) is Malaysia's national higher education fund providing study loans to Malaysian students." },
    { q: "What is the PTPTN interest rate?", a: "PTPTN charges a service charge of 1% per annum on the outstanding loan balance — one of the lowest study loan rates available." },
    { q: "When do I start repaying PTPTN?", a: "Repayment begins 12 months after graduating or leaving the institution, regardless of employment status." },
    { q: "How much PTPTN discount for early settlement?", a: "Full early settlement receives a 10% discount on outstanding balance. Consistent monthly repayment track record qualifies for a 20% discount on early settlement." },
    { q: "What happens if I don't repay PTPTN?", a: "PTPTN can take legal action, blacklist borrowers from renewing passports, and report to credit agencies. Defaults also affect national student loan funds for future students." },
    { q: "Can I defer PTPTN payments?", a: "Yes. PTPTN offers deferment for borrowers facing genuine financial hardship, unemployment, or continuing postgraduate studies. Apply through the PTPTN website." },
    { q: "What is the maximum PTPTN loan amount?", a: "Loan amounts vary by institution type, programme, and duration. Public university students typically receive RM7,500–RM20,000/year; private universities may receive more." },
    { q: "Does PTPTN cover full tuition?", a: "PTPTN covers tuition fees and living allowances but may not cover the full cost at private institutions. Top students may receive full loans (pinjaman penuh)." },
    { q: "How do I check my PTPTN balance?", a: "Log in to ptptn.gov.my with your MyKad number to view outstanding balance, repayment history, and monthly installment amount." },
    { q: "What is SSPN?", a: "SSPN (Skim Simpanan Pendidikan Nasional) is PTPTN's education savings scheme. Deposits earn dividends and qualify for up to RM12,000/year income tax relief." },
  ],
  "road-tax": [
    { q: "How is road tax calculated in Malaysia?", a: "Road tax (cukai jalan) is calculated based on the vehicle's engine cubic capacity (cc) and type (saloon vs non-saloon). Larger engines pay progressively higher rates." },
    { q: "What is the road tax for a 1500cc car in Malaysia?", a: "A 1500cc saloon pays RM90/year in base road tax. Non-saloon vehicles of 1400–1600cc pay RM56. This calculator shows the exact amount." },
    { q: "Where do I pay road tax in Malaysia?", a: "Road tax can be renewed at JPJ offices, post offices, Pos Malaysia, MyEG portal (online), and selected banks." },
    { q: "What is the road tax for a 2000cc SUV?", a: "A 2000cc non-saloon vehicle pays RM90 base road tax. For saloon at 2000cc: RM280 + (200cc × RM0.50) = RM380/year." },
    { q: "Can I drive with expired road tax in Malaysia?", a: "No. Driving with expired road tax is illegal and carries fines of RM300–RM2,000 under the Road Transport Act 1987." },
    { q: "How long is Malaysia road tax valid?", a: "Road tax is typically renewed annually (1 year). 6-month and some other periods may be available at JPJ offices." },
    { q: "Do electric vehicles pay road tax in Malaysia?", a: "EV road tax was revised in 2024. EVs above 75kW motor power are subject to road tax. Smaller EVs may qualify for reduced rates under government EV incentives." },
    { q: "What is the road tax for a motorcycle in Malaysia?", a: "Motorcycle road tax starts from RM2/year for engines under 150cc and increases up to RM114/year for motorcycles above 500cc." },
    { q: "Is road tax included in Takaful/insurance?", a: "No. Road tax and car insurance/Takaful are separate payments. Many agents offer bundled renewal services but the payments go to different bodies (JPJ vs insurer)." },
    { q: "How do I calculate road tax for a Perodua Myvi?", a: "Perodua Myvi has a 1,300cc engine. As a saloon, road tax is RM70/year. Enter 1300cc and Saloon type in the calculator to confirm." },
  ],
  renovation: [
    { q: "How much does it cost to renovate a house in Malaysia?", a: "Renovation costs in Malaysia range from RM60–100/sqft for basic works, RM100–180/sqft for mid-range, and RM200–350+/sqft for luxury finishes in the Klang Valley." },
    { q: "What is included in basic renovation?", a: "Basic renovation typically covers flooring, painting, basic kitchen cabinets, ceiling works, bathroom fittings, and electrical/plumbing updates without high-end materials." },
    { q: "How do I estimate renovation budget by room?", a: "Kitchen: RM15,000–50,000. Master bathroom: RM8,000–25,000. Living/dining: RM5,000–20,000. Each bedroom: RM3,000–10,000. These vary widely by material quality." },
    { q: "Should I get multiple renovation quotes?", a: "Yes. Get at least 3 quotes from different contractors. Significant price differences (>30%) may indicate varying material quality or scope differences." },
    { q: "What is the difference between ID (Interior Design) and contractor?", a: "An ID firm provides design consultation, 3D planning, and project management. A direct contractor builds to your specifications. ID adds 20–40% cost but provides design expertise." },
    { q: "How long does a full home renovation take?", a: "A full renovation of a typical 3-bedroom terrace house takes 3–6 months depending on scope and contractor efficiency. Delays for custom materials are common." },
    { q: "Does renovation require permit in Malaysia?", a: "Structural changes, adding rooms, and works affecting the building exterior typically require local authority (Majlis Perbandaran) approval. Internal cosmetic works usually do not." },
    { q: "What renovation works have the best ROI?", a: "Kitchen and bathroom renovations consistently provide the best ROI when reselling. Curb appeal improvements and adding a bedroom also yield strong returns." },
    { q: "How do I finance a home renovation?", a: "Options include savings, personal loan (4–8% p.a.), home equity loan, renovation loan (some banks offer these), or BNPL renovation financing schemes." },
    { q: "What is the true cost of renovation including hidden costs?", a: "Add 10–15% contingency to any quote for unforeseen structural issues, material price changes, or design changes. Appliances, furniture, and curtains are typically separate." },
  ],
  "moving-cost": [
    { q: "How much does it cost to move house?", a: "Moving costs depend on distance, volume of belongings, and service type. Local moves within a city typically cost RM300–1,500; interstate moves RM800–3,000+." },
    { q: "How do movers calculate cost?", a: "Most movers price based on volume (cubic feet/lorry trips), distance, number of workers, floor level, and whether packing services are included." },
    { q: "What is the average cost to move from KL to Penang?", a: "An interstate move from KL to Penang for a 3-bedroom house typically costs RM1,200–2,500 including transport and labour, depending on volume and company." },
    { q: "What does a professional moving service include?", a: "Basic: transport and labour only. Full service: packing, wrapping, transport, unpacking, and sometimes storage. Full service costs 2–3× basic moving." },
    { q: "How do I save money on moving costs?", a: "Declutter before moving (sell/donate items), move mid-week/month (lower demand), pack yourself, compare at least 3 quotes, and avoid peak holiday periods." },
    { q: "What is the cost to move internationally?", a: "International moves vary enormously: KL to Singapore ~RM2,000–5,000 for a partial container. To Europe or USA, expect USD 3,000–8,000+ for a 20-foot container." },
    { q: "How much should I tip movers?", a: "Tipping movers is appreciated but not mandatory in Malaysia. For a half-day job, RM10–20/worker is considerate. For a full stressful day, RM30–50/worker is generous." },
    { q: "What insurance do I need when moving?", a: "Ask your mover if they carry goods-in-transit insurance. For valuable items, consider purchasing separate insurance. Movers' liability is often limited." },
    { q: "When is the cheapest time to hire movers?", a: "Mid-week (Tuesday–Thursday) and mid-month are typically 10–20% cheaper than weekends and month-end. Avoid school holidays and festive seasons." },
    { q: "How do I estimate the volume of my belongings?", a: "A furnished 3-bedroom house is approximately 800–1,200 cubic feet. A studio is 200–400 cubic feet. This calculator estimates based on bedroom count and home type." },
  ],
  "cost-of-living": [
    { q: "What factors make up cost of living?", a: "Cost of living includes housing (rent/mortgage), food, transportation, utilities, healthcare, education, entertainment, and personal care costs in a given city." },
    { q: "How does Kuala Lumpur compare to Singapore for cost of living?", a: "KL is significantly cheaper than Singapore — roughly 40–50% lower overall. Housing in Singapore is 3–4× more expensive; food and transport are also much higher." },
    { q: "Which is the cheapest city to live in Southeast Asia?", a: "Based on Numbeo data, cities like Yangon, Phnom Penh, and Ho Chi Minh City consistently rank as the most affordable in SEA. KL and Bangkok are mid-range." },
    { q: "What is the cost of living index?", a: "The Cost of Living Index compares expenses relative to New York City (index 100). A city with index 50 is 50% cheaper than NYC for comparable lifestyle." },
    { q: "How much do I need to earn to live comfortably in KL?", a: "A comfortable single lifestyle in KL requires approximately RM4,000–6,000/month. A family of 4 with children in international school needs RM12,000–20,000+/month." },
    { q: "How much is rent in Kuala Lumpur?", a: "KL City Centre condos: RM2,000–5,000/month. Suburbs (Petaling Jaya, Subang): RM1,200–2,500/month. More affordable areas: RM800–1,500/month." },
    { q: "Is London more expensive than New York?", a: "Overall, NYC is slightly more expensive than London, particularly for rent. However, UK healthcare is largely free through the NHS, significantly lowering total costs for residents." },
    { q: "What is purchasing power parity (PPP)?", a: "PPP adjusts for differences in price levels between countries to compare real standards of living. A salary of USD 50,000 in KL buys more than in NYC due to lower prices." },
    { q: "How much does food cost per month in major cities?", a: "Groceries for one person: KL ~RM400–600, Singapore ~RM600–900, London ~£200–300, NYC ~$300–450. Eating out is 2–5× more expensive in Singapore/London/NYC vs KL." },
    { q: "How do I use this tool to plan relocation?", a: "Select your current city and target city. The tool shows index comparisons for housing, food, transport, and utilities — helping you estimate the salary you need to maintain your lifestyle." },
  ],
  "public-holiday": [
    { q: "What are the national public holidays in Malaysia?", a: "Malaysia has 12 federal public holidays including New Year's Day, Chinese New Year (2 days), Hari Raya Puasa (2 days), Wesak Day, Hari Merdeka, Malaysia Day, Deepavali, and Christmas." },
    { q: "How many public holidays does Malaysia have per year?", a: "Malaysia has 12 federal public holidays plus additional state-level holidays. Total holidays vary by state: e.g., Selangor has about 16, Kelantan about 18." },
    { q: "Do state holidays differ across Malaysia?", a: "Yes. Each state has additional holidays for the Sultan's birthday, state founder's day, and local religious observances. Selangor, Kuala Lumpur, and Putrajaya have different sets." },
    { q: "What is a gazetted public holiday?", a: "A gazetted holiday is officially declared under the Holidays Act 1951. Employees are entitled to these days off at full pay, or overtime pay if required to work." },
    { q: "What are the public holidays in Singapore?", a: "Singapore has 11 public holidays including New Year's Day, Chinese New Year (2 days), Good Friday, Labour Day, Vesak Day, Hari Raya Puasa, National Day, Hari Raya Haji, Deepavali, and Christmas." },
    { q: "How many public holidays are there in the UK?", a: "England and Wales have 8 bank holidays. Scotland has 9. Northern Ireland has 10. These include New Year, Easter, May Bank Holiday, Christmas, and Boxing Day." },
    { q: "What happens when a public holiday falls on a weekend?", a: "In Malaysia and many countries, if a public holiday falls on a Sunday, the following Monday is declared a replacement holiday. Some countries substitute the previous Friday." },
    { q: "Are public holidays paid in Malaysia?", a: "Yes. Under the Employment Act 1955, employees are entitled to paid leave on all 11 gazetted public holidays per year." },
    { q: "What is the Islamic calendar's impact on Malaysian holidays?", a: "Islamic holidays (Hari Raya Puasa, Hari Raya Haji, Nuzul Quran, Maulidur Rasul) shift earlier by approximately 11 days each year as they follow the lunar Hijri calendar." },
    { q: "How can I plan around public holidays?", a: "Use this Public Holiday Calendar alongside the Long Weekend Planner to identify bridge days and optimal annual leave timing for extended breaks." },
  ],
  "long-weekend": [
    { q: "What is a long weekend?", a: "A long weekend occurs when a public holiday falls on a Friday or Monday (or adjacent to a weekend), creating 3 or more consecutive days off." },
    { q: "What is a bridge day?", a: "A bridge day is a working day between a public holiday and a weekend. Taking leave on that day creates a 4+ day mini-break without using many leave days." },
    { q: "How many long weekends are there in Malaysia 2025?", a: "Malaysia typically has 4–7 long weekends per year depending on when public holidays fall on the calendar. Use this planner to see exact dates for any year." },
    { q: "How do I plan the most efficient use of annual leave?", a: "Identify public holidays adjacent to weekends, then use 1–2 days annual leave to create 4–5 day breaks. The Annual Leave Optimizer on this site automates this." },
    { q: "What is the best month to take a holiday in Malaysia?", a: "March–April and October–November generally have the most long weekend opportunities. School holidays in June and December are popular family travel periods." },
    { q: "How do I find long weekends in other countries?", a: "Select your country in this planner. The tool loads official public holidays and identifies all long weekend opportunities for your selected year." },
    { q: "Can I plan 4-day weekends with minimum leave?", a: "Yes. A public holiday on Thursday + 1 day leave on Friday = 4-day weekend. A public holiday on Tuesday + Monday leave = 4-day weekend. This planner highlights all such opportunities." },
    { q: "What months have the most Malaysian public holidays?", a: "January–February (Chinese New Year), April–May (Hari Raya Puasa), and August (Merdeka) tend to cluster the most public holidays in Malaysia." },
    { q: "How does this differ from the Public Holiday Calendar?", a: "The Public Holiday Calendar lists all holidays. The Long Weekend Planner specifically identifies which holidays create extended weekend opportunities and shows the bridge day strategy." },
    { q: "Can I export the long weekend plan?", a: "Results can be copied from the tool. Future updates will support calendar export (.ics) for Google Calendar and Outlook integration." },
  ],
  "leave-optimizer": [
    { q: "What is annual leave optimization?", a: "Annual leave optimization is strategically placing leave days around public holidays and weekends to maximize total days off while using the fewest leave days." },
    { q: "How many days off can I get with 20 days leave in Malaysia?", a: "With 20 days leave strategically placed around Malaysia's public holidays and weekends, you can potentially create 40–50 total days off — effectively doubling your time off." },
    { q: "What is a leave bridge strategy?", a: "A leave bridge means taking 1–2 days annual leave between a public holiday and a weekend to create an extended break of 4–5 days using only 1–2 leave days." },
    { q: "How far in advance should I plan my leave?", a: "Plan at least 3–6 months ahead for popular periods like school holidays, Hari Raya, and Christmas. Submit leave requests early as popular dates fill up quickly." },
    { q: "What is the best use of annual leave in Malaysia 2025?", a: "This optimizer calculates the highest-efficiency leave placements for any year, showing which 1–2 day bridges yield the most total days off." },
    { q: "How many days annual leave is standard in Malaysia?", a: "Under the Employment Act: 8 days for <2 years service, 12 days for 2–5 years, 16 days for >5 years. Most professional roles offer 14–21 days." },
    { q: "Should I save leave for school holidays?", a: "If you have children, school holiday alignment is important. This optimizer can prioritise school holiday periods in its recommendations." },
    { q: "What is carry-forward leave?", a: "Many companies allow unused leave to be carried forward to the next year, up to a maximum (often 50% of entitlement). Check your employment contract for your company's policy." },
    { q: "How does this tool calculate efficiency?", a: "Efficiency = Total days off gained ÷ Leave days used. A single leave day yielding 4 days off has 400% efficiency. The optimizer ranks all opportunities by efficiency." },
    { q: "Can the leave optimizer account for company blackout dates?", a: "Enter your company blackout periods (dates leave cannot be taken) and the optimizer will exclude them from its recommendations." },
  ],
  "length": [
    { q: "How do I convert metres to feet?", a: "1 metre = 3.28084 feet. Multiply metres by 3.28084 to get feet. This converter handles the calculation instantly." },
    { q: "How many centimetres are in an inch?", a: "1 inch = 2.54 centimetres exactly. So 12 inches (1 foot) = 30.48 cm." },
    { q: "How do I convert km to miles?", a: "1 km = 0.621371 miles. Multiply kilometres by 0.621371. For a quick estimate, multiply by 0.6 (about 4% underestimate)." },
    { q: "What is a nautical mile?", a: "A nautical mile = 1,852 metres or 1.15078 statute miles. It is used in maritime and aviation navigation." },
    { q: "How do I convert height from cm to feet and inches?", a: "Divide cm by 30.48 for feet (whole number), then multiply the decimal remainder by 12 for inches. E.g., 170cm ÷ 30.48 = 5.577 feet = 5 feet 6.9 inches." },
    { q: "What is a light-year?", a: "A light-year is the distance light travels in one year: approximately 9.461 × 10^15 metres or about 5.879 trillion miles." },
    { q: "How many mm in a cm?", a: "There are exactly 10 millimetres in 1 centimetre. 100cm = 1 metre. 1000mm = 1 metre." },
    { q: "What unit does the USA use for length?", a: "The USA primarily uses the imperial system: inches, feet, yards, and miles. Scientific and engineering fields use metric (SI) units globally." },
    { q: "How do I convert yards to metres?", a: "1 yard = 0.9144 metres exactly. Multiply yards by 0.9144 to convert to metres." },
    { q: "What is the difference between UK and US miles?", a: "The statute mile (1,609.344m) is used in both the UK and USA. The nautical mile (1,852m) is different and used in navigation." },
  ],
  "weight": [
    { q: "How do I convert kg to lbs?", a: "1 kg = 2.20462 lbs. Multiply kilograms by 2.20462 to get pounds. For quick mental math, multiply kg by 2.2." },
    { q: "How do I convert lbs to kg?", a: "1 lb = 0.453592 kg. Divide pounds by 2.205 to approximate. For exact values, use this converter." },
    { q: "What is a stone in kg?", a: "1 stone = 14 pounds = 6.35029 kg. The stone is used mainly in the UK and Ireland for body weight." },
    { q: "How many grams in an ounce?", a: "1 ounce = 28.3495 grams. For cooking, 1 ounce ≈ 28g is sufficient precision." },
    { q: "What is the difference between weight and mass?", a: "Mass is the amount of matter (measured in kg). Weight is the force of gravity on that mass (measured in Newtons). In everyday use, 'weight' typically means mass." },
    { q: "How do I convert metric tons to kg?", a: "1 metric tonne = 1,000 kg. Not to be confused with the US short ton (907.185 kg) or the UK long ton (1,016.05 kg)." },
    { q: "What is the difference between troy ounce and regular ounce?", a: "A troy ounce (31.1035g) is used for precious metals. A regular ounce (28.3495g) is used for everything else. Gold prices are quoted per troy ounce." },
    { q: "How many kg is 100 lbs?", a: "100 lbs = 45.3592 kg. Using this converter, enter 100 in the value field and select lbs to see all equivalent values." },
    { q: "What is milligrams used for?", a: "Milligrams (0.001g) are used for measuring medicine dosages, vitamins, minerals, and very small quantities in chemistry and food labelling." },
    { q: "How do pharmacies measure medicine weight?", a: "Medicines are measured in milligrams (mg) and micrograms (mcg/µg). 1 mg = 1,000 mcg. Always follow prescribed dosages precisely." },
  ],
  "data": [
    { q: "How many bytes are in a megabyte?", a: "1 MB = 1,048,576 bytes (binary, base-2) used by operating systems, or 1,000,000 bytes (decimal, base-10) used by storage manufacturers." },
    { q: "How many GB in a TB?", a: "1 TB = 1,024 GB in binary (used by OS), or 1,000 GB in decimal (used on hard drive boxes). This is why a 1TB drive shows as ~931 GB on your computer." },
    { q: "What is the difference between MB and MiB?", a: "MB (megabyte) can mean 10^6 or 2^20 bytes depending on context. MiB (mebibyte) is precisely 2^20 = 1,048,576 bytes. IEC units (MiB, GiB) are unambiguous." },
    { q: "How big is a typical movie file?", a: "A 1080p HD movie: 4–8 GB. A 4K HDR movie: 20–80 GB. A SD 480p movie: 0.7–1.5 GB. Streaming compresses these significantly." },
    { q: "How many photos can a 256GB phone hold?", a: "A 12MP photo is approximately 3–5 MB. A 256 GB phone can hold approximately 50,000–85,000 standard photos." },
    { q: "What is bandwidth vs storage?", a: "Storage (GB, TB) measures how much data you can hold. Bandwidth (Mbps, Gbps) measures how fast data transfers over a network." },
    { q: "How fast is 1 Gbps internet?", a: "1 Gbps = 1,000 Mbps = 125 MB/s theoretical maximum. In practice, 600–900 Mbps is typical real-world speed. This can download a 1 GB file in approximately 8 seconds." },
    { q: "What is a petabyte used for?", a: "1 petabyte = 1,024 TB. Petabytes are used to describe large-scale data centre storage, global internet traffic (exabytes), and big data analytics." },
    { q: "How much data does a 4K video use?", a: "Streaming 4K Netflix uses approximately 7 GB/hour. 4K YouTube uses 5–17 GB/hour depending on HDR and frame rate settings." },
    { q: "What is the largest unit of data storage?", a: "Common units: KB → MB → GB → TB → PB (petabyte) → EB (exabyte) → ZB (zettabyte) → YB (yottabyte). Global internet traffic is measured in exabytes per month." },
  ],
  "speed": [
    { q: "How do I convert km/h to mph?", a: "Divide km/h by 1.60934. For quick mental math: mph ≈ km/h × 0.62. E.g., 100 km/h = 62.1 mph." },
    { q: "How do I convert mph to km/h?", a: "Multiply mph by 1.60934. E.g., 60 mph × 1.60934 = 96.56 km/h. Most speed limits outside the US and UK use km/h." },
    { q: "What is a knot in km/h?", a: "1 knot = 1.852 km/h. Knots are used in maritime and aviation. A ship travelling at 20 knots moves at 37 km/h." },
    { q: "How fast is Mach 1?", a: "Mach 1 (speed of sound) = approximately 340 m/s = 1,225 km/h = 761 mph at sea level and 15°C. It varies with altitude and temperature." },
    { q: "What is the speed of light in km/h?", a: "The speed of light = 299,792,458 m/s ≈ 1.08 billion km/h (1.079×10^9 km/h). Nothing with mass can reach this speed." },
    { q: "What is the average human walking speed?", a: "Average walking speed is 4–5 km/h (2.5–3.1 mph). Jogging is 8–12 km/h; running is 12–20 km/h; elite sprinters reach 40+ km/h." },
    { q: "How fast does commercial aircraft fly?", a: "Commercial jets cruise at 800–920 km/h (500–570 mph) at altitude. The Concorde flew at 2,179 km/h (Mach 2.04)." },
    { q: "What is the speed limit in Malaysia?", a: "Malaysia speed limits: 110 km/h on highways, 90 km/h on main roads, 60 km/h in urban areas, and 30–40 km/h in school zones and residential areas." },
    { q: "How do I convert m/s to km/h?", a: "Multiply m/s by 3.6. E.g., 10 m/s × 3.6 = 36 km/h. This is because 1 km = 1,000 m and 1 hour = 3,600 seconds." },
    { q: "What is terminal velocity?", a: "Terminal velocity is the maximum speed a falling object reaches when drag force equals gravitational force. For a skydiver in freefall it is approximately 195 km/h (120 mph)." },
  ],
  "cooking": [
    { q: "How many tablespoons in a cup?", a: "1 US cup = 16 tablespoons = 48 teaspoons = 240 ml. This converter handles all cooking unit conversions." },
    { q: "How many ml in a tablespoon?", a: "1 tablespoon = 14.787 ml (US). In metric countries, 1 tablespoon is often rounded to 15 ml for cooking purposes." },
    { q: "How many teaspoons in a tablespoon?", a: "1 tablespoon = 3 teaspoons. This applies in both the US and metric measurement systems." },
    { q: "How do I convert cups to grams?", a: "Cups to grams depends on the ingredient density. 1 cup flour ≈ 120g. 1 cup sugar ≈ 200g. 1 cup butter = 227g. 1 cup water = 240g." },
    { q: "What is a fluid ounce?", a: "1 US fluid ounce = 29.574 ml. 1 UK fluid ounce = 28.413 ml. This converter uses the US fluid ounce as standard." },
    { q: "How many cups in a litre?", a: "1 litre = 4.227 US cups, or approximately 4 cups for cooking purposes." },
    { q: "How do I halve a recipe?", a: "Halve all ingredients proportionally. Use this converter to recalculate cup/tbsp/tsp amounts. E.g., 1/3 cup halved = 1/6 cup ≈ 2 tbsp + 2 tsp." },
    { q: "What is a metric cup?", a: "A metric cup = 250 ml, used in Australia, Canada, and New Zealand. A US cup = 240 ml. The 10ml difference matters for precise baking." },
    { q: "How many ml is a pint?", a: "1 US pint = 473.176 ml. 1 UK (imperial) pint = 568.261 ml. The UK pint is about 20% larger than the US pint." },
    { q: "Why do US and UK measurements differ?", a: "The US retained colonial measurements when they diverged from British units in the 19th century. The UK later adopted metric while the US did not, creating ongoing differences." },
  ],
  "income-tax": [
    { q: "How is income tax calculated?", a: "Income tax is calculated on your chargeable income (gross income minus approved deductions and reliefs) using progressive tax rate bands." },
    { q: "What are the income tax rates in Malaysia?", a: "Malaysia's resident personal tax rates range from 0% (income below RM5,000) to 24.5% (income above RM1,000,000). Most working adults fall in the 1–24% range." },
    { q: "What reliefs can I claim in Malaysia?", a: "Common reliefs: personal (RM9,000), EPF (RM4,000), life insurance (RM3,000), medical expenses (RM8,000), education (RM7,000), SSPN (RM8,000), and more." },
    { q: "What is the difference between tax relief and tax rebate?", a: "Tax relief reduces your chargeable income (the amount taxed). Tax rebate directly reduces the tax payable. Rebates apply after tax is calculated." },
    { q: "What is the personal income tax deadline in Malaysia?", a: "Malaysian resident individuals must file Form BE by April 30 each year. If e-filing (recommended), the deadline is May 15." },
    { q: "Who needs to file income tax in Malaysia?", a: "Any resident with annual income above RM34,000 (after EPF deduction) must file. This includes employment income, business income, and rental income." },
    { q: "What is tax residency in Malaysia?", a: "You are a Malaysian tax resident if you reside in Malaysia for 182 days or more in a calendar year. Residents benefit from lower progressive rates and reliefs." },
    { q: "What is the difference between PCB and actual tax?", a: "PCB (monthly withholding) is an estimate. Actual tax is calculated when you file your annual return. If PCB exceeded actual tax, you get a refund. If less, you pay the difference." },
    { q: "What is e-Filing (e-BE)?", a: "e-Filing is LHDN's online platform for submitting your tax return. It is available from March 1 each year. Using e-Filing entitles you to a 15-day extension beyond the paper deadline." },
    { q: "What are the US federal income tax brackets?", a: "US 2024 brackets (single): 10% up to $11,600; 12% up to $47,150; 22% up to $100,525; 24% up to $191,950; 32% up to $243,725; 35% up to $609,350; 37% above." },
  ],
  "credit-card": [
    { q: "How is credit card interest calculated?", a: "Credit card interest = Outstanding balance × (APR ÷ 365) × days. Most cards compound daily. A RM5,000 balance at 18% APR accrues about RM2.47 in interest per day." },
    { q: "What is the minimum payment on a credit card?", a: "Minimum payment is typically 5% of outstanding balance or RM50 (whichever is higher) in Malaysia. Paying only the minimum dramatically extends payoff time." },
    { q: "What is a credit card APR?", a: "APR (Annual Percentage Rate) is the yearly interest rate charged on unpaid balances. In Malaysia, Bank Negara caps credit card rates at 18% p.a. for timely payers." },
    { q: "How long will it take to pay off my credit card?", a: "This depends on balance, interest rate, and monthly payment. At minimum payment on a RM5,000 balance at 18% APR, it takes over 10 years and costs RM3,000+ in interest." },
    { q: "What is the avalanche vs snowball debt method?", a: "Avalanche: pay off highest-interest debt first (mathematically optimal). Snowball: pay off smallest balance first (psychologically motivating). Avalanche saves more money." },
    { q: "What is a balance transfer?", a: "A balance transfer moves your credit card debt to a new card offering 0% interest for a promotional period (typically 6–24 months), helping you pay down principal faster." },
    { q: "What is a credit utilisation ratio?", a: "Credit utilisation = Total credit used ÷ Total credit limit × 100%. Keeping utilisation below 30% is recommended for a good credit score." },
    { q: "How do I avoid credit card interest?", a: "Pay the full statement balance by the due date each month. This gives you an interest-free period (typically 20–50 days) and charges no interest whatsoever." },
    { q: "What is a cashback vs rewards credit card?", a: "Cashback cards return a percentage of spending as cash (e.g., 1–5%). Rewards cards give points redeemable for travel, merchandise, or vouchers." },
    { q: "What is the credit card late payment penalty in Malaysia?", a: "In Malaysia, late payment charges are capped at 1% of the outstanding balance per month or RM10 minimum, plus the standard 18% APR continues to accrue." },
  ],
  "electricity": [
    {q:"How is the electricity bill calculated in Malaysia?",a:"Malaysia uses TNB's tiered tariff: 21.8 sen/kWh for first 200kWh, 33.4 sen for 201–300kWh, 51.6 sen for 301–600kWh, and 54.6 sen above 600kWh."},
    {q:"What is a kWh?",a:"A kilowatt-hour (kWh) is the energy used by a 1,000-watt (1 kW) device running for one hour. Most appliances are rated in watts; multiply by hours to get watt-hours, then divide by 1,000."},
    {q:"How do I calculate my electricity usage?",a:"Multiply appliance wattage by hours of use per day, then by 30 for monthly kWh. E.g., a 100W light bulb used 8 hours/day = 0.8 kWh/day = 24 kWh/month."},
    {q:"What is the average household electricity usage in Malaysia?",a:"A typical Malaysian household uses 300–600 kWh per month. Heavily air-conditioned homes can exceed 1,000 kWh."},
    {q:"How do I use a custom rate for other countries?",a:"Select 'Custom rate' and enter your local utility rate per kWh. This applies a flat rate across all usage."},
    {q:"How do I reduce my electricity bill?",a:"Set air-con to 24–26°C, use LED lighting, unplug devices on standby, and use inverter appliances which adjust power based on demand."},
    {q:"What is TNB's fuel cost adjustment?",a:"TNB's tariff may include an Imbalance Cost Pass-Through (ICPT) surcharge or rebate depending on fuel prices. The base tiered rates are used in this calculator."},
    {q:"Does electricity SST apply in Malaysia?",a:"Electricity for domestic use below RM100/month is SST-exempt. Above RM100/month, 6% SST applies to the excess."},
    {q:"What appliances use the most electricity?",a:"Air conditioning (1,000–2,500W), water heaters (3,000–4,500W), washing machines (500–1,000W), and refrigerators (100–400W) are the biggest consumers."},
    {q:"What is the custom rate for Singapore?",a:"Singapore's SP Group residential tariff is approximately SGD 0.2898/kWh (as of 2024, Q4). Rates vary quarterly."},
  ],
};;


// ─── ENGINES (all validated formulas) ───────────────────────
const engines = {

  salary: ({ gross=0,bonus=0,country="MY",taxCat="single",resident=true,calcFor="salary",
             epfEmpRate=11,epfEmrRate=13,socsoEmpRate=0.5,socsoEmrRate=1.75,
             eisRate=0.2,deduction=0,zakat=0 }) => {
    const META = {
      MY:{name:"Malaysia",flag:"🇲🇾",currency:"MYR",penLabel:"EPF",ssLabel:"SOCSO",taxLabel:"PCB/MTD",nonResRate:30},
      SG:{name:"Singapore",flag:"🇸🇬",currency:"SGD",penLabel:"CPF",ssLabel:"CPF (emr)",taxLabel:"Income Tax",nonResRate:15},
      GB:{name:"United Kingdom",flag:"🇬🇧",currency:"GBP",penLabel:"Pension",ssLabel:"Nat. Insurance",taxLabel:"PAYE",nonResRate:20},
      AU:{name:"Australia",flag:"🇦🇺",currency:"AUD",penLabel:"Superannuation",ssLabel:"Medicare",taxLabel:"Income Tax",nonResRate:32.5},
      US:{name:"United States",flag:"🇺🇸",currency:"USD",penLabel:"Social Security",ssLabel:"Medicare",taxLabel:"Federal Tax",nonResRate:30},
      IN:{name:"India",flag:"🇮🇳",currency:"INR",penLabel:"EPF",ssLabel:"ESI",taxLabel:"TDS",nonResRate:30},
      ID:{name:"Indonesia",flag:"🇮🇩",currency:"IDR",penLabel:"BPJS TK",ssLabel:"BPJS Kesehatan",taxLabel:"PPh 21",nonResRate:20},
      PH:{name:"Philippines",flag:"🇵🇭",currency:"PHP",penLabel:"SSS",ssLabel:"PhilHealth",taxLabel:"BIR WHT",nonResRate:25},
      TH:{name:"Thailand",flag:"🇹🇭",currency:"THB",penLabel:"Prov. Fund",ssLabel:"Social Security",taxLabel:"PIT",nonResRate:15},
      DE:{name:"Germany",flag:"🇩🇪",currency:"EUR",penLabel:"Rentenversicherung",ssLabel:"Krankenversicherung",taxLabel:"Lohnsteuer",nonResRate:25},
      FR:{name:"France",flag:"🇫🇷",currency:"EUR",penLabel:"Retraite",ssLabel:"Assurance maladie",taxLabel:"IRPP",nonResRate:20},
      CA:{name:"Canada",flag:"🇨🇦",currency:"CAD",penLabel:"CPP",ssLabel:"EI",taxLabel:"Federal Tax",nonResRate:25},
      JP:{name:"Japan",flag:"🇯🇵",currency:"JPY",penLabel:"Kousei Nenkin",ssLabel:"Kenko Hoken",taxLabel:"Shotokuzei",nonResRate:20.42},
      KR:{name:"South Korea",flag:"🇰🇷",currency:"KRW",penLabel:"Nat. Pension",ssLabel:"Health Insurance",taxLabel:"Soduktax",nonResRate:20},
      AE:{name:"UAE",flag:"🇦🇪",currency:"AED",penLabel:"GPSSA",ssLabel:"None",taxLabel:"No income tax",nonResRate:0},
      ZA:{name:"South Africa",flag:"🇿🇦",currency:"ZAR",penLabel:"UIF",ssLabel:"Skills levy",taxLabel:"PAYE",nonResRate:25},
      BR:{name:"Brazil",flag:"🇧🇷",currency:"BRL",penLabel:"INSS",ssLabel:"FGTS",taxLabel:"IRRF",nonResRate:25},
      NG:{name:"Nigeria",flag:"🇳🇬",currency:"NGN",penLabel:"Pension",ssLabel:"None",taxLabel:"PAYE",nonResRate:10},
      OTHER:{name:"Custom",flag:"🌐",currency:"",penLabel:"Pension (emp)",ssLabel:"Social Security",taxLabel:"Income Tax",nonResRate:20},
    };
    const m = META[country]||META.MY;
    const incS = calcFor==="salary"||calcFor==="both";
    const incB = calcFor==="bonus"||calcFor==="both";
    const s = incS?(parseFloat(gross)||0):0;
    const b = incB?(parseFloat(bonus)||0):0;
    const g = s+b; if(g<=0) return null;
    const eeAmt=g*(epfEmpRate/100), erAmt=g*(epfEmrRate/100);
    const ssEmp=s*(socsoEmpRate/100), ssEmr=s*(socsoEmrRate/100);
    const eisEmp=s*(eisRate/100), eisEmr=s*(eisRate/100);
    const relief = country==="MY"?({single:9000,married_both:9000,married_one:13000,married_child:14000}[taxCat]||9000):0;
    const annualG=g*12;
    const annualC=Math.max(0,annualG-relief-eeAmt*12-(parseFloat(deduction)||0)*12);
    let annTax=0;
    if(!resident){annTax=annualC*(m.nonResRate/100);}
    else if(country==="MY"){
      const bands=[[5000,.01],[15000,.03],[15000,.08],[15000,.13],[20000,.21],[30000,.24],[Infinity,.245]];
      let rem=annualC; for(const[bw,r]of bands){const t=Math.min(rem,bw);annTax+=t*r;rem-=t;if(rem<=0)break;}
      if(taxCat==="married_one"||taxCat==="married_child")annTax=Math.max(0,annTax-(annualC<=35000?400:0));
    }else if(country==="SG"){
      const bands=[[20000,0],[10000,.02],[10000,.035],[40000,.07],[40000,.115],[40000,.15],[40000,.18],[40000,.19],[40000,.195],[40000,.2],[Infinity,.22]];
      let rem=annualC; for(const[bw,r]of bands){const t=Math.min(rem,bw);annTax+=t*r;rem-=t;if(rem<=0)break;}
    }else if(country==="GB"){
      const t=Math.max(0,annualC-12570);
      annTax=t<=37700?t*.20:t<=125140?37700*.20+(t-37700)*.40:37700*.20+87440*.40+(t-125140)*.45;
    }else if(country==="US"){
      const t=Math.max(0,annualC-14600);
      const bands=[[11600,.10],[35550,.12],[54800,.22],[103350,.24],[197300,.32],[243725,.35],[Infinity,.37]];
      let rem=t; for(const[bw,r]of bands){const s=Math.min(rem,bw);annTax+=s*r;rem-=s;if(rem<=0)break;}
    }else if(country==="AU"){
      if(annualC<=18200)annTax=0;
      else if(annualC<=45000)annTax=(annualC-18200)*.19;
      else if(annualC<=120000)annTax=5092+(annualC-45000)*.325;
      else if(annualC<=180000)annTax=29467+(annualC-120000)*.37;
      else annTax=51667+(annualC-180000)*.45;
      annTax+=annualC*.02;
    }else if(country==="IN"){
      if(annualC>500000){const bands=[[300000,0],[300000,.05],[300000,.10],[300000,.15],[300000,.20],[Infinity,.30]];let rem=annualC;for(const[bw,r]of bands){const t=Math.min(rem,bw);annTax+=t*r;rem-=t;if(rem<=0)break;}annTax*=1.04;}
    }else{annTax=annualC*(annualC<20000?.05:annualC<50000?.15:annualC<100000?.20:.25);}
    const mTax=Math.max(0,annTax/12);
    const zakatAmt=parseFloat(zakat)||0;
    const zakatOff=country==="MY"?Math.min(zakatAmt,mTax):0;
    const taxNet=mTax-zakatOff;
    const totalDed=eeAmt+ssEmp+eisEmp+taxNet+zakatAmt;
    const net=g-totalDed;
    return { grossIncome:g,baseSalary:s,baseBonus:b,epfEmpAmt:eeAmt,epfEmrAmt:erAmt,
      socsoEmpAmt:ssEmp,socsoEmrAmt:ssEmr,eisEmpAmt:eisEmp,eisEmrAmt:eisEmr,
      monthlyTax:mTax,zakatOffset:zakatOff,zakatAmt,taxAfterZakat:taxNet,
      totalEmpDed:totalDed,net,totalEmrCost:g+erAmt+ssEmr+eisEmr,
      takeHomeRate:g>0?((net/g)*100).toFixed(1):0,
      currency:m.currency,countryName:m.name,flag:m.flag,
      penLabel:m.penLabel,ssLabel:m.ssLabel,taxLabel:m.taxLabel,
      epfEmpRate,epfEmrRate,socsoEmpRate,socsoEmrRate,eisRate };
  },

  loan: ({principal,rate,years}) => {
    const P=parseFloat(principal)||0, r=(parseFloat(rate)||0)/100/12, n=(parseFloat(years)||0)*12;
    if(!r||!n) return null;
    const monthly=(P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    const total=monthly*n, interest=total-P;
    let balance=P; const schedule=[];
    for(let i=1;i<=Math.min(n,360);i++){
      const ip=balance*r, pp=monthly-ip; balance=Math.max(0,balance-pp);
      if(i<=12||i%12===0) schedule.push({month:i,payment:monthly,interest:ip,principal:pp,balance});
    }
    return {monthly,total,interest,principal:P,schedule};
  },

  compound: ({principal,rate,years,compounds=12,monthly=0}) => {
    const P=parseFloat(principal)||0, r=(parseFloat(rate)||0)/100;
    const n=parseFloat(compounds)||12, t=parseFloat(years)||0, pmt=parseFloat(monthly)||0;
    const fvL=P*Math.pow(1+r/n,n*t);
    const fvP=r>0?pmt*((Math.pow(1+r/n,n*t)-1)/(r/n)):pmt*n*t;
    const total=fvL+fvP, contributed=P+pmt*12*t, earned=total-contributed;
    const data=[];
    for(let y=1;y<=t;y++){
      const v=P*Math.pow(1+r/n,n*y)+(r>0?pmt*((Math.pow(1+r/n,n*y)-1)/(r/n)):pmt*n*y);
      data.push({year:y,value:v,contributed:P+pmt*12*y});
    }
    return {total,contributed,earned,roi:contributed>0?((earned/contributed)*100).toFixed(1):0,data};
  },

  bmi: ({weight,height,unit="metric"}) => {
    let w=parseFloat(weight),h=parseFloat(height);
    if(!w||!h) return null;
    if(unit==="imperial"){w*=0.453592;h*=0.0254;} else h/=100;
    const bmi=w/(h*h);
    const cat=bmi<18.5?"Underweight":bmi<25?"Normal weight":bmi<30?"Overweight":"Obese";
    const col=bmi<18.5?"#3b82f6":bmi<25?"#22c55e":bmi<30?"#f59e0b":"#ef4444";
    return {bmi:bmi.toFixed(1),category:cat,color:col};
  },

  calories: ({weight,height,age,gender,activity}) => {
    const w=parseFloat(weight),h=parseFloat(height),a=parseFloat(age);
    if(!w||!h||!a) return null;
    const bmr=gender==="male"?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;
    const factors={sedentary:1.2,light:1.375,moderate:1.55,active:1.725,veryActive:1.9};
    const tdee=bmr*(factors[activity]||1.55);
    return {bmr:Math.round(bmr),tdee:Math.round(tdee),cut:Math.round(tdee-500),bulk:Math.round(tdee+300),
      protein:Math.round(w*2.0),fat:Math.round(tdee*.25/9),carbs:Math.round(tdee*.50/4)};
  },

  age: ({dob}) => {
    const birth=new Date(dob), now=new Date();
    let y=now.getFullYear()-birth.getFullYear(),mo=now.getMonth()-birth.getMonth(),d=now.getDate()-birth.getDate();
    if(d<0){mo--;d+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
    if(mo<0){y--;mo+=12;}
    const totalDays=Math.floor((now-birth)/86400000);
    return {years:y,months:mo,days:d,totalDays,totalWeeks:Math.floor(totalDays/7)};
  },

  dateDiff: ({from,to}) => {
    const d1=new Date(from),d2=new Date(to);
    const days=Math.floor(Math.abs(d2-d1)/86400000);
    return {days,weeks:Math.floor(days/7),months:Math.floor(days/30.44),years:(days/365.25).toFixed(2)};
  },

  workingDays: ({from,to}) => {
    let d1=new Date(from),d2=new Date(to),count=0,total=0;
    const cur=new Date(d1);
    while(cur<=d2){total++;const day=cur.getDay();if(day!==0&&day!==6)count++;cur.setDate(cur.getDate()+1);}
    return {workingDays:count,total};
  },

  discount: ({original,discount,type="percent"}) => {
    const o=parseFloat(original),d=parseFloat(discount);
    if(!o||isNaN(d)) return null;
    const saving=type==="percent"?o*(d/100):d;
    return {original:o,saving,final:o-saving,percent:type==="percent"?d:((d/o)*100).toFixed(1)};
  },

  tip: ({bill,tipPct,people}) => {
    const b=parseFloat(bill),t=parseFloat(tipPct),p=parseInt(people)||1;
    const tip=b*(t/100),total=b+tip;
    return {bill:b,tip,total,perPerson:total/p,tipPer:tip/p};
  },

  temperature: ({value,from}) => {
    const v=parseFloat(value);
    let c,f,k;
    if(from==="C"){c=v;f=v*9/5+32;k=v+273.15;}
    else if(from==="F"){c=(v-32)*5/9;f=v;k=c+273.15;}
    else{k=v;c=v-273.15;f=c*9/5+32;}
    return {C:c.toFixed(2),F:f.toFixed(2),K:k.toFixed(2)};
  },

  password: (length=16,opts={}) => {
    const{upper=true,lower=true,numbers=true,symbols=true}=opts;
    let chars="";
    if(upper)chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(lower)chars+="abcdefghijklmnopqrstuvwxyz";
    if(numbers)chars+="0123456789";
    if(symbols)chars+="!@#$%^&*()-_=+[]{}|;:,.<>?";
    if(!chars)chars="abcdefghijklmnopqrstuvwxyz";
    const arr=new Uint32Array(length);
    crypto.getRandomValues(arr);
    return Array.from(arr,x=>chars[x%chars.length]).join("");
  },

  fuel: ({distance,consumption,fuelPrice}) => {
    const d=parseFloat(distance),c=parseFloat(consumption),p=parseFloat(fuelPrice);
    if(!d||!c||!p) return null;
    const liters=(d/100)*c, cost=liters*p;
    return {liters:liters.toFixed(2),cost:cost.toFixed(2),costPer100:((100/d)*cost).toFixed(2)};
  },

  zakat: ({savings,gold,business,income}) => {
    const nisab=22600;
    const s=parseFloat(savings)||0,g=parseFloat(gold)||0,b=parseFloat(business)||0,inc=parseFloat(income)||0;
    const totalAssets=s+g+b;
    const zakatAssets=totalAssets>=nisab?totalAssets*0.025:0;
    const zakatIncome=inc*12>=nisab?inc*0.025:0;
    return {totalAssets,zakatAssets,zakatIncome,total:zakatAssets+zakatIncome,nisab};
  },

  sst: ({amount,type="service8"}) => {
    const a=parseFloat(amount)||0;
    const rates={service8:0.08,service6:0.06,sales6:0.06,sales10:0.10};
    const rate=rates[type]||0.08;
    const tax=a*rate;
    return {amount:a,tax,total:a+tax,rate:rate*100};
  },

  roadTax: ({cc,type="saloon"}) => {
    const c=parseInt(cc)||0; let base=0;
    if(type==="saloon"){
      if(c<=1000)base=20; else if(c<=1200)base=55; else if(c<=1400)base=70;
      else if(c<=1600)base=90; else if(c<=1800)base=200+(c-1600)*0.4;
      else if(c<=2000)base=280+(c-1800)*0.5; else if(c<=2500)base=380+(c-2000)*1.0;
      else if(c<=3000)base=880+(c-2500)*2.5; else base=2130+(c-3000)*4.5;
    }else{
      if(c<=1000)base=20; else if(c<=1400)base=44; else if(c<=1600)base=56;
      else if(c<=2000)base=90; else if(c<=2500)base=200; else base=400;
    }
    return {cc:c,base:base.toFixed(2),withFee:(base*1.03).toFixed(2)};
  },

  ptptn: ({amount,years=10}) => {
    const P=parseFloat(amount)||0,r=0.01/12,n=(parseFloat(years)||10)*12;
    const monthly=(P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    const total=monthly*n;
    return {principal:P,monthly:monthly.toFixed(2),total:total.toFixed(2),interest:(total-P).toFixed(2)};
  },

  profitMargin: ({revenue,cost}) => {
    const r=parseFloat(revenue),c=parseFloat(cost); if(!r||!c) return null;
    const profit=r-c;
    return {revenue:r,cost:c,profit,margin:((profit/r)*100).toFixed(2),markup:((profit/c)*100).toFixed(2)};
  },

  inflation: ({amount,from,to,rate=3}) => {
    const a=parseFloat(amount),years=(parseInt(to)||2025)-(parseInt(from)||2000),r=(parseFloat(rate)||3)/100;
    const future=a*Math.pow(1+r,years),pv=a/Math.pow(1+r,years);
    return {original:a,future:future.toFixed(2),presentValue:pv.toFixed(2),years,rate};
  },

  percentage: ({a,b,mode}) => {
    const x=parseFloat(a),y=parseFloat(b);
    if(mode==="of") return {result:((x/100)*y).toFixed(4),label:`${x}% of ${y}`};
    if(mode==="change") return {result:(((y-x)/x)*100).toFixed(2),label:`% change from ${x} to ${y}`};
    if(mode==="is") return {result:((x/y)*100).toFixed(2),label:`${x} is what % of ${y}`};
    return null;
  },

  water: ({weight,activity="moderate",climate="temperate"}) => {
    const w=parseFloat(weight)||70; let base=w*0.033;
    if(activity==="active")base*=1.2; if(activity==="veryActive")base*=1.4;
    if(climate==="hot")base*=1.15;
    return {liters:base.toFixed(1),glasses:Math.ceil(base*1000/250),ml:Math.round(base*1000)};
  },

  electricity: ({kwh,country="MY",customRate=0}) => {
    const k=parseFloat(kwh)||0;
    if(customRate>0){const cost=k*(parseFloat(customRate)||0);return{kwh:k,cost:cost.toFixed(2),avgDaily:(cost/30).toFixed(2),tariff:customRate};}
    // MY tiered TNB
    let cost=0;
    if(k<=200)cost=k*.218; else if(k<=300)cost=200*.218+(k-200)*.334;
    else if(k<=600)cost=200*.218+100*.334+(k-300)*.516;
    else cost=200*.218+100*.334+300*.516+(k-600)*.546;
    return{kwh:k,cost:cost.toFixed(2),avgDaily:(cost/30).toFixed(2),tariff:"Tiered (MY TNB)"};
  },

  bodyfat: ({neck,waist,hips,height,gender}) => {
    const n=parseFloat(neck),w=parseFloat(waist),h=parseFloat(height),hi=parseFloat(hips);
    if(!n||!w||!h) return null;
    let bf;
    if(gender==="male")bf=86.01*Math.log10(w-n)-70.041*Math.log10(h)+36.76;
    else bf=163.205*Math.log10(w+hi-n)-97.684*Math.log10(h)-78.387;
    const cat=bf<10?"Essential":bf<20?"Athletic":bf<25?"Fitness":bf<31?"Acceptable":"Obese";
    return{bf:bf.toFixed(1),category:cat};
  },

  idealWeight: ({height,gender}) => {
    const h=parseFloat(height),hIn=h/2.54,o60=hIn-60;
    const devine=gender==="male"?50+2.3*o60:45.5+2.3*o60;
    const miller=gender==="male"?56.2+1.41*o60:53.1+1.36*o60;
    const hamwi=gender==="male"?48+2.7*o60:45.4+2.27*o60;
    const bmi22=22*Math.pow(h/100,2);
    return{devine:devine.toFixed(1),miller:miller.toFixed(1),hamwi:hamwi.toFixed(1),bmi22:bmi22.toFixed(1)};
  },

  length: ({value,from}) => {
    const v=parseFloat(value)||0;
    const toM={mm:.001,cm:.01,m:1,km:1000,in:.0254,ft:.3048,yd:.9144,mi:1609.344,nmi:1852};
    const base=v*toM[from];
    return Object.fromEntries(Object.entries(toM).map(([k,f])=>[k,(base/f).toFixed(6)]));
  },

  weight2: ({value,from}) => {
    const v=parseFloat(value)||0;
    const toKg={mg:.000001,g:.001,kg:1,t:1000,oz:.028349,lb:.453592,st:6.35029};
    const base=v*toKg[from];
    return Object.fromEntries(Object.entries(toKg).map(([k,f])=>[k,(base/f).toFixed(6)]));
  },

  speed: ({value,from}) => {
    const v=parseFloat(value)||0;
    const toMs={ms:1,kmh:.277778,mph:.44704,knot:.514444,fts:.3048};
    const base=v*toMs[from];
    return Object.fromEntries(Object.entries(toMs).map(([k,f])=>[k,(base/f).toFixed(4)]));
  },

  data: ({value,from}) => {
    const v=parseFloat(value)||0;
    const toB={B:1,KB:1024,MB:1048576,GB:1073741824,TB:1099511627776,PB:1125899906842624};
    const base=v*toB[from];
    return Object.fromEntries(Object.entries(toB).map(([k,f])=>[k,(base/f).toFixed(6)]));
  },

  cooking: ({value,from}) => {
    const v=parseFloat(value)||0;
    const toMl={ml:1,l:1000,tsp:4.92892,tbsp:14.7868,cup:236.588,floz:29.5735,pint:473.176,qt:946.353,gal:3785.41};
    const base=v*toMl[from];
    return Object.fromEntries(Object.entries(toMl).map(([k,f])=>[k,(base/f).toFixed(4)]));
  },

  rentVsBuy: ({rent,price,down,rate,years,appreciation=3}) => {
    const r=parseFloat(rent)*12,p=parseFloat(price),d=parseFloat(down)/100;
    const loan=p*(1-d),lRate=(parseFloat(rate)||4.5)/100/12,n=(parseFloat(years)||30)*12;
    if(!lRate||!n) return null;
    const monthly=(loan*lRate*Math.pow(1+lRate,n))/(Math.pow(1+lRate,n)-1);
    const totalBuy=monthly*n+p*d, totalRent=r*(parseFloat(years)||30);
    const propVal=p*Math.pow(1+(parseFloat(appreciation)||3)/100,(parseFloat(years)||30));
    return{monthly:monthly.toFixed(0),totalBuy:totalBuy.toFixed(0),totalRent:totalRent.toFixed(0),propertyValue:propVal.toFixed(0)};
  },

  renovation: ({area,type="basic",currency="USD"}) => {
    const a=parseFloat(area)||0;
    // Rates per sqft in local currency approximations
    const rates={basic:{USD:60,MYR:80,GBP:55,AUD:90,SGD:80},mid:{USD:120,MYR:150,GBP:110,AUD:160,SGD:150},luxury:{USD:250,MYR:300,GBP:230,AUD:300,SGD:280}};
    const r=(rates[type]||rates.basic)[currency]||(rates[type]||rates.basic).USD;
    const cost=a*r;
    return{area:a,rate:r,min:(cost*.8).toFixed(0),max:(cost*1.2).toFixed(0),estimate:cost.toFixed(0),currency};
  },

  movingCost: ({bedrooms,distance,service,currency="USD"}) => {
    const b=parseInt(bedrooms)||1,d=parseFloat(distance)||0;
    const baseRates={studio:200,1:300,2:500,3:800,4:1200,5:1800};
    const base=(baseRates[b]||baseRates[3]);
    const distMult=d>500?1.8:d>200?1.4:d>50?1.1:1;
    const serviceMult=service==="full"?2.2:service==="packing"?1.5:1;
    const estimate=base*distMult*serviceMult;
    // Rough currency adjustment
    const fx={USD:1,MYR:4.5,GBP:0.79,AUD:1.53,SGD:1.35,EUR:0.92};
    const rate=fx[currency]||1;
    return{estimate:(estimate*rate).toFixed(0),min:(estimate*.75*rate).toFixed(0),max:(estimate*1.35*rate).toFixed(0),currency};
  },

  costOfLiving: ({city1,city2}) => {
    // Index relative to New York = 100
    const INDEX={
      "New York":100,"London":89,"Singapore":82,"Sydney":81,"Hong Kong":86,
      "Tokyo":78,"Paris":87,"Berlin":72,"Amsterdam":79,"Zurich":107,
      "Dubai":74,"Toronto":72,"Vancouver":75,"Melbourne":79,"Auckland":80,
      "Kuala Lumpur":42,"Bangkok":45,"Jakarta":36,"Manila":38,"Ho Chi Minh City":35,
      "Mumbai":31,"Delhi":28,"Seoul":78,"Beijing":58,"Shanghai":65,
      "São Paulo":44,"Mexico City":40,"Nairobi":38,"Lagos":35,"Cairo":26,
      "Istanbul":41,"Warsaw":50,"Prague":58,"Lisbon":64,"Madrid":69,
    };
    const i1=INDEX[city1]||60,i2=INDEX[city2]||60;
    const diff=((i2-i1)/i1*100).toFixed(1);
    return{city1,city2,index1:i1,index2:i2,difference:diff,
      rent:{c1:Math.round(i1*18),c2:Math.round(i2*18)},
      food:{c1:Math.round(i1*4),c2:Math.round(i2*4)},
      transport:{c1:Math.round(i1*1.5),c2:Math.round(i2*1.5)},
    };
  },

  publicHolidays: (country,year) => {
    const MY2025=[
      {date:`${year}-01-01`,name:"New Year's Day"},{date:`${year}-01-29`,name:"Chinese New Year"},
      {date:`${year}-01-30`,name:"Chinese New Year (2nd day)"},{date:`${year}-02-01`,name:"Federal Territory Day"},
      {date:`${year}-03-30`,name:"Hari Raya Puasa"},{date:`${year}-03-31`,name:"Hari Raya Puasa (2nd day)"},
      {date:`${year}-04-18`,name:"Nuzul Al-Quran"},{date:`${year}-05-01`,name:"Labour Day"},
      {date:`${year}-05-12`,name:"Wesak Day"},{date:`${year}-06-02`,name:"Yang di-Pertuan Agong Birthday"},
      {date:`${year}-06-07`,name:"Hari Raya Haji"},{date:`${year}-06-28`,name:"Awal Muharram"},
      {date:`${year}-08-31`,name:"National Day"},{date:`${year}-09-05`,name:"Prophet's Birthday"},
      {date:`${year}-09-16`,name:"Malaysia Day"},{date:`${year}-10-20`,name:"Deepavali"},
      {date:`${year}-12-25`,name:"Christmas Day"},
    ];
    const SG2025=[
      {date:`${year}-01-01`,name:"New Year's Day"},{date:`${year}-01-29`,name:"Chinese New Year"},
      {date:`${year}-01-30`,name:"Chinese New Year (2nd day)"},{date:`${year}-03-30`,name:"Hari Raya Puasa"},
      {date:`${year}-04-18`,name:"Good Friday"},{date:`${year}-05-01`,name:"Labour Day"},
      {date:`${year}-05-12`,name:"Vesak Day"},{date:`${year}-06-07`,name:"Hari Raya Haji"},
      {date:`${year}-08-09`,name:"National Day"},{date:`${year}-10-20`,name:"Deepavali"},
      {date:`${year}-12-25`,name:"Christmas Day"},
    ];
    const GB2025=[
      {date:`${year}-01-01`,name:"New Year's Day"},{date:`${year}-04-18`,name:"Good Friday"},
      {date:`${year}-04-21`,name:"Easter Monday"},{date:`${year}-05-05`,name:"Early May Bank Holiday"},
      {date:`${year}-05-26`,name:"Spring Bank Holiday"},{date:`${year}-08-25`,name:"Summer Bank Holiday"},
      {date:`${year}-12-25`,name:"Christmas Day"},{date:`${year}-12-26`,name:"Boxing Day"},
    ];
    const US2025=[
      {date:`${year}-01-01`,name:"New Year's Day"},{date:`${year}-01-20`,name:"Martin Luther King Jr. Day"},
      {date:`${year}-02-17`,name:"Presidents' Day"},{date:`${year}-05-26`,name:"Memorial Day"},
      {date:`${year}-06-19`,name:"Juneteenth"},{date:`${year}-07-04`,name:"Independence Day"},
      {date:`${year}-09-01`,name:"Labor Day"},{date:`${year}-10-13`,name:"Columbus Day"},
      {date:`${year}-11-11`,name:"Veterans Day"},{date:`${year}-11-27`,name:"Thanksgiving"},
      {date:`${year}-12-25`,name:"Christmas Day"},
    ];
    const AU2025=[
      {date:`${year}-01-01`,name:"New Year's Day"},{date:`${year}-01-27`,name:"Australia Day"},
      {date:`${year}-04-18`,name:"Good Friday"},{date:`${year}-04-19`,name:"Easter Saturday"},
      {date:`${year}-04-20`,name:"Easter Sunday"},{date:`${year}-04-21`,name:"Easter Monday"},
      {date:`${year}-04-25`,name:"ANZAC Day"},{date:`${year}-06-09`,name:"King's Birthday"},
      {date:`${year}-12-25`,name:"Christmas Day"},{date:`${year}-12-26`,name:"Boxing Day"},
    ];
    const ALL={MY:MY2025,SG:SG2025,GB:GB2025,US:US2025,AU:AU2025};
    const list=ALL[country]||MY2025;
    // Find long weekends (holiday touching Friday or Monday)
    const longWeekends=list.filter(h=>{
      const d=new Date(h.date),dow=d.getDay();
      return dow===1||dow===5; // Monday or Friday
    });
    return{holidays:list,longWeekends,country,year};
  },

  leaveOptimizer: (country,year,leaveDays) => {
    const{holidays}=engines.publicHolidays(country,year);
    const opps=[];
    holidays.forEach(h=>{
      const d=new Date(h.date),dow=d.getDay();
      if(dow===2){// Tuesday — take Monday
        const bridge=new Date(d); bridge.setDate(d.getDate()-1);
        opps.push({holiday:h.name,holidayDate:h.date,bridgeDate:bridge.toISOString().split("T")[0],
          daysOff:4,leaveUsed:1,efficiency:"4 days off for 1 leave day",type:"bridge_monday"});
      }else if(dow===4){// Thursday — take Friday
        const bridge=new Date(d); bridge.setDate(d.getDate()+1);
        opps.push({holiday:h.name,holidayDate:h.date,bridgeDate:bridge.toISOString().split("T")[0],
          daysOff:4,leaveUsed:1,efficiency:"4 days off for 1 leave day",type:"bridge_friday"});
      }else if(dow===3){// Wednesday — take Thu+Fri or Mon+Tue
        opps.push({holiday:h.name,holidayDate:h.date,bridgeDate:"Thu+Fri or Mon+Tue",
          daysOff:5,leaveUsed:2,efficiency:"5 days off for 2 leave days",type:"bridge_both"});
      }
    });
    opps.sort((a,b)=>b.daysOff/b.leaveUsed-a.daysOff/a.leaveUsed);
    return{opportunities:opps.slice(0,leaveDays||10),total:opps.length};
  },
};

// ─── CURRENCY CACHE ─────────────────────────────────────────
let _rateCache={rates:null,base:null,ts:0};
async function fetchRates(base="USD"){
  const now=Date.now();
  if(_rateCache.base===base&&_rateCache.rates&&now-_rateCache.ts<3600000) return{rates:_rateCache.rates,source:"cached",ts:_rateCache.ts};
  try{
    const res=await fetch(`https://open.er-api.com/v6/latest/${base}`);
    if(!res.ok) throw new Error("HTTP "+res.status);
    const data=await res.json();
    if(data.result!=="success") throw new Error("API error");
    _rateCache={rates:data.rates,base,ts:Date.now()};
    return{rates:data.rates,source:"live",ts:data.time_last_update_utc,nextUpdate:data.time_next_update_utc};
  }catch(e){
    const FALLBACK={USD:1,EUR:0.921,GBP:0.789,JPY:149.5,AUD:1.532,CAD:1.362,CHF:0.895,CNY:7.24,HKD:7.824,
      MYR:4.47,SGD:1.348,INR:83.4,KRW:1330,THB:35.1,IDR:15750,PHP:56.8,VND:24500,BND:1.348,
      TWD:31.8,PKR:278,BDT:110,LKR:300,NPR:133,AED:3.673,SAR:3.751,QAR:3.641,KWD:0.308,
      BHD:0.377,OMR:0.385,JOD:0.709,ILS:3.68,TRY:32.0,ZAR:18.6,EGP:48.5,NGN:1550,KES:130,
      GHS:15.8,TZS:2540,ETB:56.0,MXN:17.2,BRL:5.0,ARS:870,CLP:940,COP:3900,PEN:3.75,
      CZK:22.8,PLN:3.95,HUF:358,RON:4.6,DKK:6.89,SEK:10.4,NOK:10.6,NZD:1.63,
    };
    const bRate=FALLBACK[base]||1;
    const rates=Object.fromEntries(Object.entries(FALLBACK).map(([k,v])=>[k,v/bRate]));
    return{rates,source:"fallback",ts:"Approximate rates (live unavailable)"};
  }
}

const CURRENCIES=[
  {code:"USD",name:"US Dollar",flag:"🇺🇸"},{code:"EUR",name:"Euro",flag:"🇪🇺"},
  {code:"GBP",name:"British Pound",flag:"🇬🇧"},{code:"MYR",name:"Malaysian Ringgit",flag:"🇲🇾"},
  {code:"SGD",name:"Singapore Dollar",flag:"🇸🇬"},{code:"JPY",name:"Japanese Yen",flag:"🇯🇵"},
  {code:"AUD",name:"Australian Dollar",flag:"🇦🇺"},{code:"CAD",name:"Canadian Dollar",flag:"🇨🇦"},
  {code:"CHF",name:"Swiss Franc",flag:"🇨🇭"},{code:"CNY",name:"Chinese Yuan",flag:"🇨🇳"},
  {code:"HKD",name:"Hong Kong Dollar",flag:"🇭🇰"},{code:"INR",name:"Indian Rupee",flag:"🇮🇳"},
  {code:"KRW",name:"South Korean Won",flag:"🇰🇷"},{code:"THB",name:"Thai Baht",flag:"🇹🇭"},
  {code:"IDR",name:"Indonesian Rupiah",flag:"🇮🇩"},{code:"PHP",name:"Philippine Peso",flag:"🇵🇭"},
  {code:"VND",name:"Vietnamese Dong",flag:"🇻🇳"},{code:"BND",name:"Brunei Dollar",flag:"🇧🇳"},
  {code:"TWD",name:"New Taiwan Dollar",flag:"🇹🇼"},{code:"PKR",name:"Pakistani Rupee",flag:"🇵🇰"},
  {code:"AED",name:"UAE Dirham",flag:"🇦🇪"},{code:"SAR",name:"Saudi Riyal",flag:"🇸🇦"},
  {code:"QAR",name:"Qatari Riyal",flag:"🇶🇦"},{code:"KWD",name:"Kuwaiti Dinar",flag:"🇰🇼"},
  {code:"TRY",name:"Turkish Lira",flag:"🇹🇷"},{code:"ZAR",name:"South African Rand",flag:"🇿🇦"},
  {code:"EGP",name:"Egyptian Pound",flag:"🇪🇬"},{code:"NGN",name:"Nigerian Naira",flag:"🇳🇬"},
  {code:"MXN",name:"Mexican Peso",flag:"🇲🇽"},{code:"BRL",name:"Brazilian Real",flag:"🇧🇷"},
  {code:"NZD",name:"New Zealand Dollar",flag:"🇳🇿"},{code:"SEK",name:"Swedish Krona",flag:"🇸🇪"},
  {code:"NOK",name:"Norwegian Krone",flag:"🇳🇴"},{code:"DKK",name:"Danish Krone",flag:"🇩🇰"},
  {code:"PLN",name:"Polish Zloty",flag:"🇵🇱"},{code:"CZK",name:"Czech Koruna",flag:"🇨🇿"},
];

const COUNTRY_DEFAULTS={
  MY:{epfEmp:11,epfEmr:13,socsoEmp:0.5,socsoEmr:1.75,eis:0.2},
  SG:{epfEmp:20,epfEmr:17,socsoEmp:0,socsoEmr:0,eis:0},
  GB:{epfEmp:8,epfEmr:3,socsoEmp:8,socsoEmr:13.8,eis:0},
  AU:{epfEmp:0,epfEmr:11,socsoEmp:0,socsoEmr:0,eis:0},
  US:{epfEmp:6.2,epfEmr:6.2,socsoEmp:1.45,socsoEmr:1.45,eis:0},
  IN:{epfEmp:12,epfEmr:12,socsoEmp:0.75,socsoEmr:3.25,eis:0},
  ID:{epfEmp:2,epfEmr:3.7,socsoEmp:1,socsoEmr:0.24,eis:0},
  PH:{epfEmp:4.5,epfEmr:8.5,socsoEmp:3,socsoEmr:5,eis:0},
  TH:{epfEmp:5,epfEmr:5,socsoEmp:5,socsoEmr:5,eis:0},
  DE:{epfEmp:9.3,epfEmr:9.3,socsoEmp:7.3,socsoEmr:7.3,eis:1.5},
  FR:{epfEmp:7.3,epfEmr:16.5,socsoEmp:0.75,socsoEmr:13.1,eis:0.5},
  CA:{epfEmp:5.9,epfEmr:5.9,socsoEmp:1.66,socsoEmr:2.32,eis:0},
  JP:{epfEmp:9.15,epfEmr:9.15,socsoEmp:4.99,socsoEmr:4.99,eis:0.3},
  KR:{epfEmp:4.5,epfEmr:4.5,socsoEmp:3.43,socsoEmr:3.43,eis:0.9},
  AE:{epfEmp:0,epfEmr:0,socsoEmp:0,socsoEmr:0,eis:0},
  ZA:{epfEmp:1,epfEmr:1,socsoEmp:1,socsoEmr:1,eis:0},
  BR:{epfEmp:7.5,epfEmr:8,socsoEmp:0,socsoEmr:20,eis:0},
  NG:{epfEmp:8,epfEmr:10,socsoEmp:0,socsoEmr:0,eis:0},
  OTHER:{epfEmp:10,epfEmr:10,socsoEmp:0,socsoEmr:0,eis:0},
};

const COUNTRIES_LIST=[
  {code:"MY",label:"🇲🇾 Malaysia"},{code:"SG",label:"🇸🇬 Singapore"},
  {code:"GB",label:"🇬🇧 United Kingdom"},{code:"AU",label:"🇦🇺 Australia"},
  {code:"US",label:"🇺🇸 United States"},{code:"IN",label:"🇮🇳 India"},
  {code:"ID",label:"🇮🇩 Indonesia"},{code:"PH",label:"🇵🇭 Philippines"},
  {code:"TH",label:"🇹🇭 Thailand"},{code:"DE",label:"🇩🇪 Germany"},
  {code:"FR",label:"🇫🇷 France"},{code:"CA",label:"🇨🇦 Canada"},
  {code:"JP",label:"🇯🇵 Japan"},{code:"KR",label:"🇰🇷 South Korea"},
  {code:"AE",label:"🇦🇪 UAE"},{code:"ZA",label:"🇿🇦 South Africa"},
  {code:"BR",label:"🇧🇷 Brazil"},{code:"NG",label:"🇳🇬 Nigeria"},
  {code:"OTHER",label:"🌐 Other / Custom"},
];

function buildRateOpts(){
  const specials=[0.2,0.4,0.5,0.75,1.45,1.66,2.32,3.25,3.43,4.99,5.9,6.2,7.3,8.5,9.15,9.3,11.5,13.1,13.8,16.5];
  const all=[...specials];
  for(let i=1;i<=30;i++) if(!all.includes(i)) all.push(i);
  all.sort((a,b)=>a-b);
  return [{value:"0",label:"0% — Not applicable"},...all.map(v=>({value:String(v),label:`${v}%`}))];
}
const RATE_OPTIONS=buildRateOpts();

// ─── SHARED UI PRIMITIVES ────────────────────────────────────
const fmt=(n,dec=2)=>new Intl.NumberFormat("en",{minimumFractionDigits:dec,maximumFractionDigits:dec}).format(n);
const fmtC=(n,cur="USD")=>{try{return new Intl.NumberFormat("en",{style:"currency",currency:cur,minimumFractionDigits:2}).format(n);}catch{return`${cur} ${fmt(n)}`;}}

const s_input={display:"flex",alignItems:"center",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,overflow:"hidden"};
const s_field_input={flex:1,padding:"11px 14px",background:"transparent",border:"none",outline:"none",color:"#f9fafb",fontSize:14,fontFamily:"inherit"};
const s_label={display:"block",fontSize:11,fontWeight:600,color:"#9ca3af",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:5};
const s_affix={padding:"0 12px",color:"#6b7280",fontSize:13,background:"rgba(255,255,255,0.03)"};
const s_select={width:"100%",padding:"11px 14px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#f9fafb",fontSize:14,outline:"none",cursor:"pointer",fontFamily:"inherit"};
const s_card_hi={padding:"16px 20px",borderRadius:12,background:"linear-gradient(135deg,rgba(34,197,94,.15),rgba(34,197,94,.05))",border:"1px solid rgba(34,197,94,.3)",marginBottom:10};
const s_card_sm={padding:"14px 16px",borderRadius:10,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",marginBottom:8};
const s_divider={height:1,background:"rgba(255,255,255,.06)",margin:"16px 0"};
const s_section_lbl={fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".1em",marginBottom:10,marginTop:4};

function Inp({label,value,onChange,type="text",placeholder,suffix,prefix,min,max,step}){
  return(
    <div style={{marginBottom:14}}>
      {label&&<label style={s_label}>{label}</label>}
      <div style={s_input}>
        {prefix&&<span style={{...s_affix,borderRight:"1px solid rgba(255,255,255,.08)"}}>{prefix}</span>}
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} min={min} max={max} step={step} style={s_field_input}/>
        {suffix&&<span style={{...s_affix,borderLeft:"1px solid rgba(255,255,255,.08)"}}>{suffix}</span>}
      </div>
    </div>
  );
}
function Sel({label,value,onChange,options}){
  return(
    <div style={{marginBottom:14}}>
      {label&&<label style={s_label}>{label}</label>}
      <select value={value} onChange={e=>onChange(e.target.value)} style={s_select}>
        {options.map(o=><option key={o.value} value={o.value} style={{background:"#1a1a2e"}}>{o.label}</option>)}
      </select>
    </div>
  );
}
function ResHi({label,value}){
  return(
    <div style={s_card_hi}>
      <div style={{fontSize:11,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".1em",marginBottom:4}}>{label}</div>
      <div style={{fontSize:26,fontWeight:800,color:"#22c55e",fontFamily:"'Space Grotesk',sans-serif"}}>{value}</div>
    </div>
  );
}
function ResSm({label,value,color}){
  return(
    <div style={s_card_sm}>
      <div style={{fontSize:11,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".08em",marginBottom:3}}>{label}</div>
      <div style={{fontSize:17,fontWeight:700,color:color||"#f9fafb"}}>{value}</div>
    </div>
  );
}
function Bar({value,max,color="#22c55e"}){
  return(
    <div style={{height:6,background:"rgba(255,255,255,.08)",borderRadius:3,overflow:"hidden",marginTop:6}}>
      <div style={{width:`${Math.min(100,(value/max)*100)}%`,height:"100%",background:color,borderRadius:3,transition:"width .5s ease"}}/>
    </div>
  );
}
function Grid2({children}){return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:2}}>{children}</div>;}
function Div(){return <div style={s_divider}/>;}
function SecLbl({t}){return <div style={s_section_lbl}>{t}</div>;}
function GenderBtn({gender,setGender}){
  return(
    <div style={{display:"flex",gap:8,marginBottom:14}}>
      {["male","female"].map(g=>(
        <button key={g} onClick={()=>setGender(g)} style={{flex:1,padding:"11px",background:gender===g?"rgba(239,68,68,.15)":"rgba(255,255,255,.05)",border:`1px solid ${gender===g?"#ef4444":"rgba(255,255,255,.1)"}`,borderRadius:10,color:gender===g?"#ef4444":"#9ca3af",cursor:"pointer",fontFamily:"inherit",fontWeight:600,textTransform:"capitalize",fontSize:14}}>
          {g==="male"?"♂ Male":"♀ Female"}
        </button>
      ))}
    </div>
  );
}

// ─── TOOL COMPONENTS ────────────────────────────────────────

function SalaryTool(){
  const[country,setCountry]=useState("MY");
  const[gross,setGross]=useState("5000");
  const[bonus,setBonus]=useState("");
  const[taxCat,setTaxCat]=useState("single");
  const[resident,setResident]=useState("yes");
  const[calcFor,setCalcFor]=useState("salary");
  const[epfEmpRate,setEpfEmpRate]=useState("11");
  const[epfEmrRate,setEpfEmrRate]=useState("13");
  const[socsoEmpRate,setSocsoEmpRate]=useState("0.5");
  const[socsoEmrRate,setSocsoEmrRate]=useState("1.75");
  const[eisRate,setEisRate]=useState("0.2");
  const[deduction,setDeduction]=useState("");
  const[zakat,setZakat]=useState("");
  const onCountry=c=>{setCountry(c);const d=COUNTRY_DEFAULTS[c]||COUNTRY_DEFAULTS.OTHER;setEpfEmpRate(String(d.epfEmp));setEpfEmrRate(String(d.epfEmr));setSocsoEmpRate(String(d.socsoEmp));setSocsoEmrRate(String(d.socsoEmr));setEisRate(String(d.eis));};
  const r=engines.salary({gross,bonus,country,taxCat,resident:resident==="yes",calcFor,epfEmpRate:parseFloat(epfEmpRate)||0,epfEmrRate:parseFloat(epfEmrRate)||0,socsoEmpRate:parseFloat(socsoEmpRate)||0,socsoEmrRate:parseFloat(socsoEmrRate)||0,eisRate:parseFloat(eisRate)||0,deduction,zakat});
  const fc=n=>{if(!r)return"";try{return fmtC(n,r.currency||"USD");}catch{return`${r.currency||""} ${fmt(n)}`;}}
  return(
    <div>
      <div style={{marginBottom:14,padding:"12px 14px",background:"rgba(59,130,246,.08)",border:"1px solid rgba(59,130,246,.2)",borderRadius:12}}>
        <label style={s_label}>Country</label>
        <select value={country} onChange={e=>onCountry(e.target.value)} style={{...s_select,background:"transparent",border:"none",padding:"4px 0"}}>
          {COUNTRIES_LIST.map(c=><option key={c.code} value={c.code} style={{background:"#1a1a2e"}}>{c.label}</option>)}
        </select>
      </div>
      <Grid2><Inp label="Gross salary (monthly)" value={gross} onChange={setGross} type="number" placeholder="5000"/><Inp label="Bonus (one-time)" value={bonus} onChange={setBonus} type="number" placeholder="Optional"/></Grid2>
      <Div/><SecLbl t="Tax settings"/>
      <Grid2>
        <Sel label="Tax category" value={taxCat} onChange={setTaxCat} options={[{value:"single",label:"Single"},{value:"married_both",label:"Married (both working)"},{value:"married_one",label:"Married (one income)"},{value:"married_child",label:"Married + children"}]}/>
        <Sel label="Tax resident" value={resident} onChange={setResident} options={[{value:"yes",label:"Yes — resident rates"},{value:"no",label:"No — non-resident flat rate"}]}/>
        <Sel label="Calculate for" value={calcFor} onChange={setCalcFor} options={[{value:"salary",label:"Salary only"},{value:"both",label:"Salary + Bonus"},{value:"bonus",label:"Bonus only"}]}/>
        <Inp label="Allowable deduction (monthly)" value={deduction} onChange={setDeduction} type="number" placeholder="0"/>
      </Grid2>
      <Div/><SecLbl t="Contribution rates (editable 0–30%)"/>
      <Grid2>
        <Sel label="Employee pension rate" value={epfEmpRate} onChange={setEpfEmpRate} options={RATE_OPTIONS}/>
        <Sel label="Employer pension rate" value={epfEmrRate} onChange={setEpfEmrRate} options={RATE_OPTIONS}/>
        <Sel label="Employee social security" value={socsoEmpRate} onChange={setSocsoEmpRate} options={RATE_OPTIONS}/>
        <Sel label="Employer social security" value={socsoEmrRate} onChange={setSocsoEmrRate} options={RATE_OPTIONS}/>
        <Sel label="EIS / unemployment fund" value={eisRate} onChange={setEisRate} options={RATE_OPTIONS}/>
        <Inp label={country==="MY"?"Muslim Zakat (monthly)":"Extra fund (monthly)"} value={zakat} onChange={setZakat} type="number" placeholder="0"/>
      </Grid2>
      {r&&(<div style={{marginTop:6}}>
        <div style={{...s_card_hi,textAlign:"center"}}>
          <div style={{fontSize:11,color:"#9ca3af",textTransform:"uppercase",letterSpacing:".1em",marginBottom:4}}>{r.flag} {r.countryName} — Net Take-Home Pay</div>
          <div style={{fontSize:30,fontWeight:800,color:"#22c55e",fontFamily:"'Space Grotesk',sans-serif"}}>{fc(r.net)}</div>
          <div style={{fontSize:13,color:"#6b7280",marginTop:3}}>{r.takeHomeRate}% of {fc(r.grossIncome)} gross</div>
          <Bar value={parseFloat(r.takeHomeRate)} max={100} color="#22c55e"/>
        </div>
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,overflow:"hidden",marginBottom:10}}>
          <div style={{padding:"9px 16px",background:"rgba(255,255,255,.04)",fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".08em"}}>Employee Deductions</div>
          {[[`${r.penLabel} (${r.epfEmpRate}%)`,r.epfEmpAmt,r.epfEmpAmt>0],[`${r.ssLabel} (${r.socsoEmpRate}%)`,r.socsoEmpAmt,r.socsoEmpAmt>0],[`EIS (${r.eisRate}%)`,r.eisEmpAmt,r.eisEmpAmt>0],[`${r.taxLabel}`,r.monthlyTax,true],r.zakatOffset>0&&["  Zakat offset",-r.zakatOffset,true],r.zakatAmt>0&&[country==="MY"?"Zakat Fund":"Extra fund",r.zakatAmt,true]].filter(x=>x&&x[2]).map(([lbl,val],i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"9px 16px",borderTop:"1px solid rgba(255,255,255,.05)",fontSize:13}}>
              <span style={{color:String(lbl).startsWith(" ")?"#6b7280":"#d1d5db"}}>{String(lbl).trim()}</span>
              <span style={{color:val<0?"#22c55e":"#f87171"}}>- {fc(Math.abs(val))}</span>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderTop:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.04)",fontWeight:600,fontSize:13}}>
            <span style={{color:"#f9fafb"}}>Total deductions</span><span style={{color:"#f87171"}}>- {fc(r.totalEmpDed)}</span>
          </div>
        </div>
        <div style={{background:"rgba(59,130,246,.04)",border:"1px solid rgba(59,130,246,.15)",borderRadius:12,overflow:"hidden"}}>
          <div style={{padding:"9px 16px",background:"rgba(59,130,246,.08)",fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".08em"}}>Employer Contributions (not from your pay)</div>
          {[[`${r.penLabel} employer (${r.epfEmrRate}%)`,r.epfEmrAmt,r.epfEmrAmt>0],[`${r.ssLabel} employer (${r.socsoEmrRate}%)`,r.socsoEmrAmt,r.socsoEmrAmt>0],[`EIS employer (${r.eisRate}%)`,r.eisEmrAmt,r.eisEmrAmt>0]].filter(x=>x[2]).map(([lbl,val],i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"9px 16px",borderTop:"1px solid rgba(59,130,246,.1)",fontSize:13}}>
              <span style={{color:"#d1d5db"}}>{lbl}</span><span style={{color:"#60a5fa"}}>{fc(val)}</span>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderTop:"1px solid rgba(59,130,246,.15)",background:"rgba(59,130,246,.08)",fontWeight:600,fontSize:13}}>
            <span style={{color:"#f9fafb"}}>Total employer cost</span><span style={{color:"#60a5fa"}}>{fc(r.totalEmrCost)}</span>
          </div>
        </div>
        <div style={{fontSize:11,color:"#4b5563",marginTop:8,lineHeight:1.6}}>Rates auto-loaded for {r.countryName}. All rates are editable (0–30%). Tax model is simplified — consult a local professional for exact figures.</div>
      </div>)}
    </div>
  );
}

function LoanTool(){
  const[principal,setPrincipal]=useState("300000");
  const[rate,setRate]=useState("4.5");
  const[years,setYears]=useState("30");
  const[currency,setCurrency]=useState("USD");
  const r=engines.loan({principal,rate,years});
  const fc=n=>fmtC(n,currency);
  return(
    <div>
      <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,12).map(c=>({value:c.code,label:`${c.flag} ${c.code} — ${c.name}`}))}/>
      <Inp label="Loan amount" value={principal} onChange={setPrincipal} type="number"/>
      <Grid2><Inp label="Annual interest rate" value={rate} onChange={setRate} suffix="%" type="number" step="0.1"/><Inp label="Loan term" value={years} onChange={setYears} suffix="years" type="number"/></Grid2>
      {r&&(<div>
        <ResHi label="Monthly Payment" value={fc(r.monthly)}/>
        <Grid2><ResSm label="Total Payment" value={fc(r.total)}/><ResSm label="Total Interest" value={fc(r.interest)} color="#f87171"/></Grid2>
        <div style={{padding:"12px 16px",background:"rgba(239,68,68,.06)",borderRadius:10,border:"1px solid rgba(239,68,68,.15)"}}>
          <div style={{fontSize:11,color:"#9ca3af",marginBottom:4}}>Interest burden</div>
          <Bar value={r.interest} max={r.total} color="#ef4444"/>
          <div style={{fontSize:13,color:"#ef4444",marginTop:4}}>{((r.interest/r.total)*100).toFixed(1)}% of total payments is interest</div>
        </div>
      </div>)}
    </div>
  );
}

function CompoundTool(){
  const[principal,setPrincipal]=useState("10000");
  const[rate,setRate]=useState("8");
  const[years,setYears]=useState("20");
  const[monthly,setMonthly]=useState("500");
  const[currency,setCurrency]=useState("USD");
  const r=engines.compound({principal,rate,years,monthly});
  const fc=n=>fmtC(n,currency);
  return(
    <div>
      <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,12).map(c=>({value:c.code,label:`${c.flag} ${c.code}`}))}/>
      <Inp label="Initial investment" value={principal} onChange={setPrincipal} type="number"/>
      <Grid2><Inp label="Annual return rate" value={rate} onChange={setRate} suffix="%" type="number" step="0.1"/><Inp label="Monthly contribution" value={monthly} onChange={setMonthly} type="number"/></Grid2>
      <Inp label="Time period" value={years} onChange={setYears} suffix="years" type="number"/>
      {r&&(<div>
        <ResHi label="Future Value" value={fc(r.total)}/>
        <Grid2><ResSm label="Total Contributed" value={fc(r.contributed)}/><ResSm label="Interest Earned" value={fc(r.earned)} color="#22c55e"/></Grid2>
        <ResSm label="Return on Investment" value={`${r.roi}%`} color="#a855f7"/>
      </div>)}
    </div>
  );
}

function CurrencyTool(){
  const[amount,setAmount]=useState("100");
  const[from,setFrom]=useState("USD");
  const[to,setTo]=useState("MYR");
  const[rates,setRates]=useState(null);
  const[loading,setLoading]=useState(false);
  const[info,setInfo]=useState(null);
  const[error,setError]=useState(null);
  const[allPairs,setAllPairs]=useState([]);

  const loadRates=useCallback(async(base)=>{
    setLoading(true);setError(null);
    const res=await fetchRates(base);
    setRates(res.rates);
    setInfo({source:res.source,ts:res.ts,nextUpdate:res.nextUpdate});
    setLoading(false);
  },[]);

  useEffect(()=>{loadRates(from);},[from]);

  useEffect(()=>{
    if(rates){
      const amt=parseFloat(amount)||1;
      const mainPairs=["EUR","GBP","JPY","AUD","SGD","CAD","CHF","CNY","MYR","HKD","INR","THB","IDR","PHP","AED","KRW"];
      const pairs=mainPairs.filter(c=>c!==from).map(c=>({code:c,rate:rates[c],result:(amt*rates[c]).toFixed(4),flag:CURRENCIES.find(x=>x.code===c)?.flag||""}));
      setAllPairs(pairs);
    }
  },[rates,amount,from,to]);

  const result=rates&&rates[to]?parseFloat(amount)*rates[to]:null;
  const inverseRate=rates&&rates[to]?1/rates[to]:null;
  const currOpts=CURRENCIES.map(c=>({value:c.code,label:`${c.flag} ${c.code} — ${c.name}`}));

  return(
    <div>
      <Inp label="Amount" value={amount} onChange={setAmount} type="number"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"end",marginBottom:14}}>
        <Sel label="From" value={from} onChange={v=>{setFrom(v);}} options={currOpts}/>
        <button onClick={()=>{const tmp=from;setFrom(to);setTo(tmp);}} style={{padding:"11px 14px",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,color:"#9ca3af",cursor:"pointer",marginBottom:0,fontSize:18,lineHeight:1}}>⇄</button>
        <Sel label="To" value={to} onChange={setTo} options={currOpts}/>
      </div>
      <button onClick={()=>loadRates(from)} disabled={loading} style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#a855f7,#7c3aed)",border:"none",borderRadius:10,color:"white",fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:14,opacity:loading?.7:1}}>
        {loading?"⟳ Fetching live rates…":"↻ Get Live Rate"}
      </button>
      {result!==null&&(<div>
        <div style={{padding:"20px",borderRadius:14,background:"linear-gradient(135deg,rgba(168,85,247,.15),rgba(168,85,247,.05))",border:"1px solid rgba(168,85,247,.3)",marginBottom:12,textAlign:"center"}}>
          <div style={{fontSize:13,color:"#c4b5fd",marginBottom:4}}>{amount} {from} equals</div>
          <div style={{fontSize:34,fontWeight:900,color:"#f9fafb",fontFamily:"'Space Grotesk',sans-serif"}}>{fmt(result,4)} <span style={{color:"#a855f7"}}>{to}</span></div>
          <div style={{fontSize:13,color:"#9ca3af",marginTop:8}}>1 {from} = <strong style={{color:"#e2e8f0"}}>{fmt(rates[to],6)}</strong> {to}</div>
          <div style={{fontSize:13,color:"#9ca3af"}}>1 {to} = <strong style={{color:"#e2e8f0"}}>{fmt(inverseRate,6)}</strong> {from}</div>
        </div>
        {info&&(<div style={{padding:"10px 14px",borderRadius:10,background:info.source==="live"?"rgba(34,197,94,.08)":"rgba(245,158,11,.08)",border:`1px solid ${info.source==="live"?"rgba(34,197,94,.25)":"rgba(245,158,11,.25)"}`,marginBottom:12,fontSize:12}}>
          <div style={{color:info.source==="live"?"#22c55e":"#f59e0b",fontWeight:600}}>
            {info.source==="live"?"✓ Live rates":"⚠ Approximate fallback rates"}
          </div>
          {info.ts&&<div style={{color:"#6b7280",marginTop:2}}>Updated: {info.ts}</div>}
          {info.nextUpdate&&<div style={{color:"#6b7280"}}>Next update: {info.nextUpdate}</div>}
        </div>)}
        <SecLbl t="Quick comparison — major currencies"/>
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,overflow:"hidden"}}>
          {allPairs.map((p,i)=>(
            <div key={p.code} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderTop:i>0?"1px solid rgba(255,255,255,.05)":"none",cursor:"pointer"}} onClick={()=>setTo(p.code)}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:16}}>{p.flag}</span>
                <span style={{fontSize:13,color:p.code===to?"#a855f7":"#d1d5db",fontWeight:p.code===to?700:400}}>{p.code}</span>
              </div>
              <span style={{fontSize:14,fontWeight:600,color:p.code===to?"#a855f7":"#f9fafb",fontVariantNumeric:"tabular-nums"}}>{fmt(parseFloat(p.result),4)}</span>
            </div>
          ))}
        </div>
      </div>)}
    </div>
  );
}

function BMITool(){
  const[weight,setWeight]=useState("70");
  const[height,setHeight]=useState("170");
  const[unit,setUnit]=useState("metric");
  const r=engines.bmi({weight,height,unit});
  return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[["metric","Metric (kg/cm)"],["imperial","Imperial (lbs/in)"]].map(([v,l])=>(
          <button key={v} onClick={()=>setUnit(v)} style={{flex:1,padding:"11px",background:unit===v?"rgba(59,130,246,.15)":"rgba(255,255,255,.05)",border:`1px solid ${unit===v?"#3b82f6":"rgba(255,255,255,.1)"}`,borderRadius:10,color:unit===v?"#3b82f6":"#9ca3af",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:13}}>{l}</button>
        ))}
      </div>
      <Grid2>
        <Inp label={unit==="metric"?"Weight (kg)":"Weight (lbs)"} value={weight} onChange={setWeight} type="number"/>
        <Inp label={unit==="metric"?"Height (cm)":"Height (inches)"} value={height} onChange={setHeight} type="number"/>
      </Grid2>
      {r&&(<div>
        <div style={{textAlign:"center",padding:"20px 0"}}>
          <div style={{fontSize:60,fontWeight:900,color:r.color,fontFamily:"'Space Grotesk',sans-serif",lineHeight:1}}>{r.bmi}</div>
          <div style={{fontSize:14,color:r.color,marginTop:6,fontWeight:600,letterSpacing:".05em"}}>{r.category}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginTop:4}}>
          {[["<18.5","Under","#3b82f6"],["18.5–24.9","Normal","#22c55e"],["25–29.9","Over","#f59e0b"],["≥30","Obese","#ef4444"]].map(([range,lbl,col])=>(
            <div key={lbl} style={{padding:"10px 6px",borderRadius:8,background:`${col}12`,border:`1px solid ${col}30`,textAlign:"center"}}>
              <div style={{fontSize:10,color:col,fontWeight:700}}>{lbl}</div>
              <div style={{fontSize:10,color:"#6b7280",marginTop:2}}>{range}</div>
            </div>
          ))}
        </div>
      </div>)}
    </div>
  );
}

function CaloriesTool(){
  const[w,setW]=useState("70");const[h,setH]=useState("170");
  const[age,setAge]=useState("30");const[gender,setGender]=useState("male");
  const[activity,setActivity]=useState("moderate");
  const r=engines.calories({weight:w,height:h,age,gender,activity});
  return(
    <div>
      <GenderBtn gender={gender} setGender={setGender}/>
      <Grid2><Inp label="Weight (kg)" value={w} onChange={setW} type="number"/><Inp label="Height (cm)" value={h} onChange={setH} type="number"/></Grid2>
      <Inp label="Age" value={age} onChange={setAge} suffix="yrs" type="number"/>
      <Sel label="Activity level" value={activity} onChange={setActivity} options={[{value:"sedentary",label:"Sedentary (desk job)"},{value:"light",label:"Light exercise (1–3 days/week)"},{value:"moderate",label:"Moderate (3–5 days/week)"},{value:"active",label:"Active (6–7 days/week)"},{value:"veryActive",label:"Very active / athlete"}]}/>
      {r&&(<div>
        <ResHi label="Daily Calories (TDEE)" value={`${fmt(r.tdee,0)} kcal`}/>
        <Grid2><ResSm label="BMR (base metabolic)" value={`${fmt(r.bmr,0)} kcal`}/><ResSm label="Weight loss (−500)" value={`${fmt(r.cut,0)} kcal`} color="#3b82f6"/></Grid2>
        <Grid2><ResSm label="Protein target" value={`${r.protein}g`}/><ResSm label="Carbs / Fat" value={`${r.carbs}g / ${r.fat}g`}/></Grid2>
      </div>)}
    </div>
  );
}

function AgeTool(){
  const[dob,setDob]=useState("1990-01-01");
  const r=dob?engines.age({dob}):null;
  return(
    <div>
      <Inp label="Date of birth" value={dob} onChange={setDob} type="date"/>
      {r&&(<div>
        <div style={{textAlign:"center",padding:"20px 0"}}>
          <div style={{fontSize:56,fontWeight:900,color:"#3b82f6",fontFamily:"'Space Grotesk',sans-serif",lineHeight:1}}>{r.years}</div>
          <div style={{fontSize:13,color:"#9ca3af",marginTop:4}}>years old</div>
          <div style={{fontSize:18,color:"#f9fafb",marginTop:6}}>{r.months} months, {r.days} days</div>
        </div>
        <Grid2><ResSm label="Total days" value={fmt(r.totalDays,0)}/><ResSm label="Total weeks" value={fmt(r.totalWeeks,0)}/></Grid2>
      </div>)}
    </div>
  );
}

function DateDiffTool(){
  const today=new Date().toISOString().split("T")[0];
  const[from,setFrom]=useState("2024-01-01");
  const[to,setTo]=useState(today);
  const r=engines.dateDiff({from,to});
  return(
    <div>
      <Grid2><Inp label="From date" value={from} onChange={setFrom} type="date"/><Inp label="To date" value={to} onChange={setTo} type="date"/></Grid2>
      {r&&(<div>
        <ResHi label="Total Days" value={fmt(r.days,0)}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <ResSm label="Weeks" value={fmt(r.weeks,0)}/><ResSm label="Months" value={fmt(r.months,0)}/><ResSm label="Years" value={r.years}/>
        </div>
      </div>)}
    </div>
  );
}

function WorkingDaysTool(){
  const[from,setFrom]=useState("2025-01-01");
  const[to,setTo]=useState("2025-12-31");
  const r=engines.workingDays({from,to});
  return(
    <div>
      <Grid2><Inp label="Start date" value={from} onChange={setFrom} type="date"/><Inp label="End date" value={to} onChange={setTo} type="date"/></Grid2>
      {r&&(<div>
        <ResHi label="Working Days (Mon–Fri)" value={fmt(r.workingDays,0)}/>
        <ResSm label="Total calendar days" value={fmt(r.total,0)}/>
      </div>)}
    </div>
  );
}

function CountdownTool(){
  const[target,setTarget]=useState(()=>{const d=new Date();d.setFullYear(d.getFullYear()+1);return d.toISOString().split("T")[0];});
  const[now,setNow]=useState(new Date());
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t);},[]);
  const diff=new Date(target)-now;
  const d=Math.floor(diff/86400000),hr=Math.floor((diff%86400000)/3600000),mn=Math.floor((diff%3600000)/60000),sc=Math.floor((diff%60000)/1000);
  return(
    <div>
      <Inp label="Target date" value={target} onChange={setTarget} type="date"/>
      {diff>0&&(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginTop:12}}>
        {[[d,"Days"],[hr,"Hours"],[mn,"Mins"],[sc,"Secs"]].map(([v,l])=>(
          <div key={l} style={{textAlign:"center",padding:"16px 8px",background:"rgba(59,130,246,.1)",borderRadius:12,border:"1px solid rgba(59,130,246,.2)"}}>
            <div style={{fontSize:28,fontWeight:800,color:"#3b82f6",fontFamily:"'Space Grotesk',sans-serif"}}>{String(v).padStart(2,"0")}</div>
            <div style={{fontSize:11,color:"#6b7280",marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>)}
    </div>
  );
}

function TimezoneTool(){
  const ZONES=["UTC","America/New_York","America/Chicago","America/Denver","America/Los_Angeles","America/Toronto","America/Vancouver","America/Sao_Paulo","Europe/London","Europe/Paris","Europe/Berlin","Europe/Madrid","Europe/Amsterdam","Europe/Zurich","Europe/Moscow","Asia/Dubai","Asia/Karachi","Asia/Kolkata","Asia/Dhaka","Asia/Bangkok","Asia/Kuala_Lumpur","Asia/Singapore","Asia/Shanghai","Asia/Hong_Kong","Asia/Tokyo","Asia/Seoul","Australia/Sydney","Australia/Melbourne","Pacific/Auckland","Pacific/Honolulu","Africa/Cairo","Africa/Lagos","Africa/Nairobi"];
  const[now,setNow]=useState(new Date());
  const[refZone,setRefZone]=useState("Asia/Kuala_Lumpur");
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t);},[]);
  const formatTime=tz=>{try{return new Intl.DateTimeFormat("en",{timeZone:tz,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false,weekday:"short",day:"numeric",month:"short"}).format(now);}catch{return "—";}};
  const getOffset=tz=>{try{const s=new Intl.DateTimeFormat("en",{timeZone:tz,timeZoneName:"short"}).format(now);const m=s.match(/GMT([+-]\d+(?::\d+)?)?/);return m?m[0]:"UTC";}catch{return "";}};
  const popular=["America/New_York","Europe/London","Asia/Dubai","Asia/Kolkata","Asia/Kuala_Lumpur","Asia/Singapore","Asia/Tokyo","Australia/Sydney"];
  return(
    <div>
      <Sel label="Reference time zone" value={refZone} onChange={setRefZone} options={ZONES.map(z=>({value:z,label:z.replace(/_/g," ")+" ("+getOffset(z)+")"}))}/>
      <div style={{padding:"14px 16px",background:"rgba(59,130,246,.1)",borderRadius:12,border:"1px solid rgba(59,130,246,.2)",marginBottom:14,textAlign:"center"}}>
        <div style={{fontSize:11,color:"#9ca3af",marginBottom:4}}>{refZone} — Current time</div>
        <div style={{fontSize:22,fontWeight:700,color:"#3b82f6",fontFamily:"'Space Grotesk',sans-serif"}}>{formatTime(refZone)}</div>
      </div>
      <SecLbl t="World clock"/>
      <div style={{background:"rgba(255,255,255,.03)",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden"}}>
        {popular.map((tz,i)=>(
          <div key={tz} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderTop:i>0?"1px solid rgba(255,255,255,.05)":"none"}}>
            <span style={{fontSize:13,color:"#d1d5db"}}>{tz.split("/")[1]?.replace(/_/g," ")||tz} <span style={{fontSize:11,color:"#6b7280"}}>({getOffset(tz)})</span></span>
            <span style={{fontSize:13,fontWeight:600,color:"#f9fafb",fontVariantNumeric:"tabular-nums"}}>{formatTime(tz)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PublicHolidayTool(){
  const[country,setCountry]=useState("MY");
  const[year,setYear]=useState("2025");
  const r=engines.publicHolidays(country,parseInt(year)||2025);
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return(
    <div>
      <Grid2>
        <Sel label="Country" value={country} onChange={setCountry} options={[{value:"MY",label:"🇲🇾 Malaysia"},{value:"SG",label:"🇸🇬 Singapore"},{value:"GB",label:"🇬🇧 United Kingdom"},{value:"US",label:"🇺🇸 United States"},{value:"AU",label:"🇦🇺 Australia"}]}/>
        <Sel label="Year" value={year} onChange={setYear} options={["2024","2025","2026"].map(y=>({value:y,label:y}))}/>
      </Grid2>
      <div style={{fontSize:12,color:"#9ca3af",marginBottom:10}}>{r.holidays.length} public holidays · {r.longWeekends.length} long weekends</div>
      <div style={{background:"rgba(255,255,255,.03)",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden",maxHeight:400,overflowY:"auto"}}>
        {r.holidays.map((h,i)=>{
          const d=new Date(h.date),dow=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];
          const isLW=d.getDay()===1||d.getDay()===5;
          return(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderTop:i>0?"1px solid rgba(255,255,255,.05)":"none",background:isLW?"rgba(34,197,94,.04)":"transparent"}}>
              <div style={{width:52,textAlign:"center",flexShrink:0}}>
                <div style={{fontSize:16,fontWeight:700,color:isLW?"#22c55e":"#f9fafb"}}>{d.getDate()}</div>
                <div style={{fontSize:10,color:"#6b7280"}}>{months[d.getMonth()]}</div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,color:"#f9fafb"}}>{h.name}</div>
                <div style={{fontSize:11,color:d.getDay()===0||d.getDay()===6?"#f59e0b":isLW?"#22c55e":"#6b7280"}}>{dow}{isLW?" — Long weekend! 🎉":""}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LongWeekendTool(){
  const[country,setCountry]=useState("MY");
  const[year,setYear]=useState("2025");
  const r=engines.publicHolidays(country,parseInt(year)||2025);
  const allOpps=r.holidays.flatMap(h=>{
    const d=new Date(h.date),dow=d.getDay();
    if(dow===1) return[{...h,type:"Take Friday before",days:3,tip:"Holiday Mon → take Fri for 4-day weekend"}];
    if(dow===5) return[{...h,type:"Take Monday after",days:3,tip:"Holiday Fri → take Mon for 4-day weekend"}];
    if(dow===2) return[{...h,type:"Bridge — take Monday",days:4,tip:"Holiday Tue → 1 leave day = 4 days off",bridge:true}];
    if(dow===4) return[{...h,type:"Bridge — take Friday",days:4,tip:"Holiday Thu → 1 leave day = 4 days off",bridge:true}];
    return[];
  });
  return(
    <div>
      <Grid2>
        <Sel label="Country" value={country} onChange={setCountry} options={[{value:"MY",label:"🇲🇾 Malaysia"},{value:"SG",label:"🇸🇬 Singapore"},{value:"GB",label:"🇬🇧 United Kingdom"},{value:"US",label:"🇺🇸 United States"},{value:"AU",label:"🇦🇺 Australia"}]}/>
        <Sel label="Year" value={year} onChange={setYear} options={["2024","2025","2026"].map(y=>({value:y,label:y}))}/>
      </Grid2>
      {allOpps.length===0&&<div style={{textAlign:"center",padding:"30px",color:"#6b7280"}}>No long weekend opportunities found for selected year.</div>}
      {allOpps.map((op,i)=>(
        <div key={i} style={{padding:"14px 16px",background:op.bridge?"rgba(34,197,94,.08)":"rgba(59,130,246,.08)",borderRadius:12,border:`1px solid ${op.bridge?"rgba(34,197,94,.25)":"rgba(59,130,246,.25)"}`,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"#f9fafb"}}>{op.name}</div>
              <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{op.date} · {op.type}</div>
            </div>
            {op.bridge&&<span style={{fontSize:10,padding:"3px 8px",background:"rgba(34,197,94,.2)",color:"#22c55e",borderRadius:100,fontWeight:700,whiteSpace:"nowrap"}}>1 leave day</span>}
          </div>
          <div style={{fontSize:12,color:op.bridge?"#22c55e":"#60a5fa",marginTop:6}}>💡 {op.tip}</div>
        </div>
      ))}
    </div>
  );
}

function LeaveOptimizerTool(){
  const[country,setCountry]=useState("MY");
  const[year,setYear]=useState("2025");
  const[leaveDays,setLeaveDays]=useState("16");
  const r=engines.leaveOptimizer(country,parseInt(year)||2025,parseInt(leaveDays)||10);
  return(
    <div>
      <Grid2>
        <Sel label="Country" value={country} onChange={setCountry} options={[{value:"MY",label:"🇲🇾 Malaysia"},{value:"SG",label:"🇸🇬 Singapore"},{value:"GB",label:"🇬🇧 United Kingdom"},{value:"US",label:"🇺🇸 United States"},{value:"AU",label:"🇦🇺 Australia"}]}/>
        <Inp label="Annual leave days" value={leaveDays} onChange={setLeaveDays} type="number"/>
      </Grid2>
      <Sel label="Year" value={year} onChange={setYear} options={["2024","2025","2026"].map(y=>({value:y,label:y}))}/>
      <div style={{fontSize:12,color:"#9ca3af",marginBottom:12}}>Showing top {r.opportunities.length} high-efficiency leave opportunities out of {r.total} found</div>
      {r.opportunities.map((op,i)=>(
        <div key={i} style={{padding:"14px 16px",background:"rgba(168,85,247,.07)",borderRadius:12,border:"1px solid rgba(168,85,247,.2)",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"#f9fafb"}}>{op.holiday}</div>
              <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{op.holidayDate}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:18,fontWeight:800,color:"#a855f7"}}>{op.daysOff} days</div>
              <div style={{fontSize:10,color:"#9ca3af"}}>{op.leaveUsed} leave used</div>
            </div>
          </div>
          <div style={{marginTop:6,padding:"6px 10px",background:"rgba(168,85,247,.12)",borderRadius:8}}>
            <div style={{fontSize:11,color:"#c084fc"}}>✓ Bridge: take leave on {op.bridgeDate}</div>
            <div style={{fontSize:11,color:"#a855f7",marginTop:2}}>📊 {op.efficiency}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DiscountTool(){
  const[original,setOriginal]=useState("199");
  const[discount,setDiscount]=useState("30");
  const[currency,setCurrency]=useState("USD");
  const r=engines.discount({original,discount});
  const fc=n=>fmtC(n,currency);
  return(
    <div>
      <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,16).map(c=>({value:c.code,label:`${c.flag} ${c.code}`}))}/>
      <Grid2><Inp label="Original price" value={original} onChange={setOriginal} type="number"/><Inp label="Discount" value={discount} onChange={setDiscount} suffix="%" type="number"/></Grid2>
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        {[10,15,20,25,30,50].map(p=>(
          <button key={p} onClick={()=>setDiscount(String(p))} style={{padding:"7px 14px",background:discount===String(p)?"rgba(245,158,11,.2)":"rgba(255,255,255,.05)",border:`1px solid ${discount===String(p)?"#f59e0b":"rgba(255,255,255,.1)"}`,borderRadius:8,color:discount===String(p)?"#f59e0b":"#9ca3af",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600}}>{p}% off</button>
        ))}
      </div>
      {r&&(<div>
        <ResHi label="Sale Price" value={fc(r.final)}/>
        <ResSm label="You save" value={fc(r.saving)} color="#22c55e"/>
      </div>)}
    </div>
  );
}

function TipTool(){
  const[bill,setBill]=useState("150");
  const[tip,setTip]=useState("10");
  const[people,setPeople]=useState("4");
  const[currency,setCurrency]=useState("USD");
  const r=engines.tip({bill,tipPct:tip,people});
  const fc=n=>fmtC(n,currency);
  return(
    <div>
      <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,16).map(c=>({value:c.code,label:`${c.flag} ${c.code}`}))}/>
      <Inp label="Bill amount" value={bill} onChange={setBill} type="number"/>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[5,10,15,18,20].map(p=>(
          <button key={p} onClick={()=>setTip(String(p))} style={{flex:1,padding:"10px",background:tip===String(p)?"rgba(245,158,11,.2)":"rgba(255,255,255,.05)",border:`1px solid ${tip===String(p)?"#f59e0b":"rgba(255,255,255,.1)"}`,borderRadius:8,color:tip===String(p)?"#f59e0b":"#9ca3af",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600}}>{p}%</button>
        ))}
      </div>
      <Inp label="Split between" value={people} onChange={setPeople} suffix="people" type="number" min="1"/>
      {r&&(<div>
        <ResHi label="Per Person" value={fc(r.perPerson)}/>
        <Grid2><ResSm label="Total bill" value={fc(r.total)}/><ResSm label="Tip amount" value={fc(r.tip)} color="#f59e0b"/></Grid2>
      </div>)}
    </div>
  );
}

function FuelTool(){
  const[dist,setDist]=useState("300");
  const[cons,setCons]=useState("8");
  const[price,setPrice]=useState("2.05");
  const[currency,setCurrency]=useState("MYR");
  const r=engines.fuel({distance:dist,consumption:cons,fuelPrice:price});
  const fc=n=>fmtC(n,currency);
  return(
    <div>
      <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,16).map(c=>({value:c.code,label:`${c.flag} ${c.code}`}))}/>
      <Inp label="Distance" value={dist} onChange={setDist} suffix="km" type="number"/>
      <Grid2><Inp label="Fuel consumption" value={cons} onChange={setCons} suffix="L/100km" type="number" step="0.1"/><Inp label="Fuel price" value={price} onChange={setPrice} suffix="/L" type="number" step="0.01"/></Grid2>
      {r&&(<div>
        <ResHi label="Total Fuel Cost" value={fc(parseFloat(r.cost))}/>
        <Grid2><ResSm label="Fuel needed" value={`${r.liters} litres`}/><ResSm label="Cost per 100km" value={fc(parseFloat(r.costPer100))}/></Grid2>
      </div>)}
    </div>
  );
}

function ElectricityTool(){
  const[kwh,setKwh]=useState("500");
  const[country,setCountry]=useState("MY");
  const[customRate,setCustomRate]=useState("");
  const[currency,setCurrency]=useState("MYR");
  const r=engines.electricity({kwh,country,customRate:parseFloat(customRate)||0});
  const fc=n=>fmtC(n,currency);
  return(
    <div>
      <Grid2>
        <Sel label="Country / tariff" value={country} onChange={v=>{setCountry(v);setCustomRate("");}} options={[{value:"MY",label:"🇲🇾 Malaysia (TNB tiered)"},{value:"custom",label:"🌐 Custom rate"}]}/>
        <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,16).map(c=>({value:c.code,label:`${c.flag} ${c.code}`}))}/>
      </Grid2>
      <Inp label="Monthly usage" value={kwh} onChange={setKwh} suffix="kWh" type="number"/>
      {country==="custom"&&<Inp label="Custom tariff rate" value={customRate} onChange={setCustomRate} suffix="/kWh" type="number" step="0.01" placeholder="e.g. 0.12"/>}
      {country==="MY"&&<div style={{fontSize:12,color:"#9ca3af",marginBottom:10,padding:"8px 12px",background:"rgba(255,255,255,.03)",borderRadius:8}}>MY TNB tiered: 21.8 sen (≤200kWh) → 33.4 sen (≤300) → 51.6 sen (≤600)</div>}
      {r&&(<div>
        <ResHi label="Estimated Monthly Bill" value={fc(parseFloat(r.cost))}/>
        <ResSm label="Average daily cost" value={fc(parseFloat(r.avgDaily))}/>
      </div>)}
    </div>
  );
}

function PasswordTool(){
  const[length,setLength]=useState(16);
  const[opts,setOpts]=useState({upper:true,lower:true,numbers:true,symbols:true});
  const[pwd,setPwd]=useState(()=>engines.password(16));
  const[copied,setCopied]=useState(false);
  const gen=()=>setPwd(engines.password(length,opts));
  const copy=()=>{navigator.clipboard.writeText(pwd);setCopied(true);setTimeout(()=>setCopied(false),1500);};
  const strength=[opts.upper,opts.lower,opts.numbers,opts.symbols].filter(Boolean).length;
  const strCol=["","#ef4444","#f59e0b","#3b82f6","#22c55e"][strength];
  const strLbl=["","Weak","Fair","Good","Strong"][strength];
  return(
    <div>
      <div style={{padding:"14px 16px",background:"rgba(255,255,255,.03)",borderRadius:10,border:"1px solid rgba(255,255,255,.1)",marginBottom:14,fontFamily:"monospace",fontSize:14,color:"#f9fafb",wordBreak:"break-all",lineHeight:1.7}}>{pwd}</div>
      <Grid2>
        <button onClick={gen} style={{padding:"11px",background:"linear-gradient(135deg,#22c55e,#16a34a)",border:"none",borderRadius:10,color:"white",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>↻ Generate</button>
        <button onClick={copy} style={{padding:"11px",background:copied?"rgba(34,197,94,.2)":"rgba(255,255,255,.05)",border:`1px solid ${copied?"#22c55e":"rgba(255,255,255,.1)"}`,borderRadius:10,color:copied?"#22c55e":"#9ca3af",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{copied?"✓ Copied":"Copy"}</button>
      </Grid2>
      <div style={{marginBottom:14}}>
        <label style={{...s_label,display:"flex",justifyContent:"space-between"}}>Length <span style={{color:"#f9fafb"}}>{length}</span></label>
        <input type="range" min="8" max="64" value={length} onChange={e=>setLength(Number(e.target.value))} style={{width:"100%",accentColor:"#22c55e"}}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {Object.entries({upper:"Uppercase",lower:"Lowercase",numbers:"Numbers",symbols:"Symbols"}).map(([k,lbl])=>(
          <label key={k} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",background:opts[k]?"rgba(34,197,94,.1)":"rgba(255,255,255,.03)",border:`1px solid ${opts[k]?"rgba(34,197,94,.3)":"rgba(255,255,255,.1)"}`,borderRadius:8,cursor:"pointer"}}>
            <input type="checkbox" checked={opts[k]} onChange={()=>setOpts(p=>({...p,[k]:!p[k]}))} style={{accentColor:"#22c55e"}}/>
            <span style={{fontSize:13,color:"#d1d5db"}}>{lbl}</span>
          </label>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <Bar value={strength} max={4} color={strCol}/>
        <span style={{fontSize:12,color:strCol,whiteSpace:"nowrap",fontWeight:600}}>{strLbl}</span>
      </div>
    </div>
  );
}

function PercentageTool(){
  const[a,setA]=useState("25");
  const[b,setB]=useState("200");
  const[mode,setMode]=useState("of");
  const r=engines.percentage({a,b,mode});
  return(
    <div>
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {[["of","X% of Y"],["change","% Change"],["is","X is ?% of Y"]].map(([m,l])=>(
          <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"10px 6px",background:mode===m?"rgba(245,158,11,.15)":"rgba(255,255,255,.05)",border:`1px solid ${mode===m?"#f59e0b":"rgba(255,255,255,.1)"}`,borderRadius:8,color:mode===m?"#f59e0b":"#9ca3af",cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600}}>{l}</button>
        ))}
      </div>
      <Grid2>
        <Inp label={mode==="of"?"Percentage (%)":mode==="change"?"From value":"Value"} value={a} onChange={setA} type="number"/>
        <Inp label={mode==="of"?"Of value":mode==="change"?"To value":"Of value"} value={b} onChange={setB} type="number"/>
      </Grid2>
      {r&&<ResHi label={r.label} value={fmt(parseFloat(r.result),4)}/>}
    </div>
  );
}

function TemperatureTool(){
  const[value,setValue]=useState("25");
  const[from,setFrom]=useState("C");
  const r=engines.temperature({value,from});
  return(
    <div>
      <Inp label="Temperature" value={value} onChange={setValue} type="number"/>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {["C","F","K"].map(u=>(
          <button key={u} onClick={()=>setFrom(u)} style={{flex:1,padding:"12px",background:from===u?"rgba(168,85,247,.2)":"rgba(255,255,255,.05)",border:`1px solid ${from===u?"#a855f7":"rgba(255,255,255,.1)"}`,borderRadius:10,color:from===u?"#a855f7":"#9ca3af",cursor:"pointer",fontFamily:"inherit",fontSize:16,fontWeight:600}}>°{u}</button>
        ))}
      </div>
      {r&&([["Celsius","C","°C"],["Fahrenheit","F","°F"],["Kelvin","K","K"]].map(([lbl,key,unit])=>(
        <ResSm key={key} label={lbl} value={`${r[key]}${unit}`} color={key===from?"#a855f7":undefined}/>
      )))}
    </div>
  );
}

function LengthTool(){
  const[value,setValue]=useState("1");
  const[from,setFrom]=useState("m");
  const units=[["mm","Millimetre"],["cm","Centimetre"],["m","Metre"],["km","Kilometre"],["in","Inch"],["ft","Foot"],["yd","Yard"],["mi","Mile"],["nmi","Nautical Mile"]];
  const r=engines.length({value,from});
  return(
    <div>
      <Grid2><Inp label="Value" value={value} onChange={setValue} type="number"/><Sel label="From unit" value={from} onChange={setFrom} options={units.map(([v,l])=>({value:v,label:l}))}/></Grid2>
      <div style={{background:"rgba(255,255,255,.03)",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden"}}>
        {units.filter(([k])=>k!==from).map(([k,lbl],i)=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderTop:i>0?"1px solid rgba(255,255,255,.05)":"none"}}>
            <span style={{fontSize:13,color:"#9ca3af"}}>{lbl} ({k})</span>
            <span style={{fontSize:14,color:"#f9fafb",fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmt(parseFloat(r[k]),6)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeightTool(){
  const[value,setValue]=useState("1");
  const[from,setFrom]=useState("kg");
  const units=[["mg","Milligram"],["g","Gram"],["kg","Kilogram"],["t","Metric Tonne"],["oz","Ounce"],["lb","Pound"],["st","Stone"]];
  const r=engines.weight2({value,from});
  return(
    <div>
      <Grid2><Inp label="Value" value={value} onChange={setValue} type="number"/><Sel label="From unit" value={from} onChange={setFrom} options={units.map(([v,l])=>({value:v,label:l}))}/></Grid2>
      <div style={{background:"rgba(255,255,255,.03)",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden"}}>
        {units.filter(([k])=>k!==from).map(([k,lbl],i)=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderTop:i>0?"1px solid rgba(255,255,255,.05)":"none"}}>
            <span style={{fontSize:13,color:"#9ca3af"}}>{lbl}</span>
            <span style={{fontSize:14,color:"#f9fafb",fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmt(parseFloat(r[k]),6)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpeedTool(){
  const[value,setValue]=useState("100");
  const[from,setFrom]=useState("kmh");
  const units=[["ms","m/s"],["kmh","km/h"],["mph","mph"],["knot","Knots"],["fts","ft/s"]];
  const r=engines.speed({value,from});
  return(
    <div>
      <Grid2><Inp label="Value" value={value} onChange={setValue} type="number"/><Sel label="From unit" value={from} onChange={setFrom} options={units.map(([v,l])=>({value:v,label:l}))}/></Grid2>
      <div style={{background:"rgba(255,255,255,.03)",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden"}}>
        {units.filter(([k])=>k!==from).map(([k,lbl],i)=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderTop:i>0?"1px solid rgba(255,255,255,.05)":"none"}}>
            <span style={{fontSize:13,color:"#9ca3af"}}>{lbl}</span>
            <span style={{fontSize:14,color:"#f9fafb",fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmt(parseFloat(r[k]),4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataTool(){
  const[value,setValue]=useState("1");
  const[from,setFrom]=useState("GB");
  const units=[["B","Bytes"],["KB","Kilobytes"],["MB","Megabytes"],["GB","Gigabytes"],["TB","Terabytes"],["PB","Petabytes"]];
  const r=engines.data({value,from});
  return(
    <div>
      <Grid2><Inp label="Value" value={value} onChange={setValue} type="number"/><Sel label="From unit" value={from} onChange={setFrom} options={units.map(([v,l])=>({value:v,label:l}))}/></Grid2>
      <div style={{background:"rgba(255,255,255,.03)",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden"}}>
        {units.filter(([k])=>k!==from).map(([k,lbl],i)=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderTop:i>0?"1px solid rgba(255,255,255,.05)":"none"}}>
            <span style={{fontSize:13,color:"#9ca3af"}}>{lbl}</span>
            <span style={{fontSize:14,color:"#f9fafb",fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmt(parseFloat(r[k]),4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CookingTool(){
  const[value,setValue]=useState("1");
  const[from,setFrom]=useState("cup");
  const units=[["ml","Millilitre"],["l","Litre"],["tsp","Teaspoon"],["tbsp","Tablespoon"],["cup","Cup"],["floz","Fluid oz"],["pint","Pint"],["qt","Quart"],["gal","Gallon"]];
  const r=engines.cooking({value,from});
  return(
    <div>
      <Grid2><Inp label="Value" value={value} onChange={setValue} type="number"/><Sel label="From unit" value={from} onChange={setFrom} options={units.map(([v,l])=>({value:v,label:l}))}/></Grid2>
      <div style={{background:"rgba(255,255,255,.03)",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden"}}>
        {units.filter(([k])=>k!==from).map(([k,lbl],i)=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderTop:i>0?"1px solid rgba(255,255,255,.05)":"none"}}>
            <span style={{fontSize:13,color:"#9ca3af"}}>{lbl}</span>
            <span style={{fontSize:14,color:"#f9fafb",fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmt(parseFloat(r[k]),4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BodyFatTool(){
  const[neck,setNeck]=useState("38");
  const[waist,setWaist]=useState("85");
  const[hips,setHips]=useState("95");
  const[height,setHeight]=useState("170");
  const[gender,setGender]=useState("male");
  const r=engines.bodyfat({neck,waist,hips,height,gender});
  return(
    <div>
      <GenderBtn gender={gender} setGender={setGender}/>
      <Grid2><Inp label="Neck (cm)" value={neck} onChange={setNeck} type="number"/><Inp label="Waist (cm)" value={waist} onChange={setWaist} type="number"/></Grid2>
      {gender==="female"&&<Inp label="Hips (cm)" value={hips} onChange={setHips} type="number"/>}
      <Inp label="Height (cm)" value={height} onChange={setHeight} type="number"/>
      {r&&(<div>
        <ResHi label="Body Fat %" value={`${r.bf}%`}/>
        <ResSm label="Category" value={r.category}/>
      </div>)}
    </div>
  );
}

function IdealWeightTool(){
  const[height,setHeight]=useState("170");
  const[gender,setGender]=useState("male");
  const r=engines.idealWeight({height,gender});
  return(
    <div>
      <GenderBtn gender={gender} setGender={setGender}/>
      <Inp label="Height (cm)" value={height} onChange={setHeight} type="number"/>
      {r&&(<div>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:10}}>Ideal weight comparison (kg)</div>
        {[["Devine Formula",r.devine],["Miller Formula",r.miller],["Hamwi Formula",r.hamwi],["BMI 22 Method",r.bmi22]].map(([lbl,val])=>(
          <div key={lbl} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",background:"rgba(255,255,255,.03)",borderRadius:8,marginBottom:6,border:"1px solid rgba(255,255,255,.07)"}}>
            <span style={{fontSize:13,color:"#d1d5db"}}>{lbl}</span>
            <span style={{fontSize:16,fontWeight:700,color:"#f9fafb"}}>{val} kg</span>
          </div>
        ))}
      </div>)}
    </div>
  );
}

function WaterTool(){
  const[weight,setWeight]=useState("70");
  const[activity,setActivity]=useState("moderate");
  const[climate,setClimate]=useState("temperate");
  const r=engines.water({weight,activity,climate});
  return(
    <div>
      <Inp label="Body weight (kg)" value={weight} onChange={setWeight} type="number"/>
      <Grid2>
        <Sel label="Activity level" value={activity} onChange={setActivity} options={[{value:"sedentary",label:"Sedentary"},{value:"moderate",label:"Moderate"},{value:"active",label:"Active"},{value:"veryActive",label:"Very active"}]}/>
        <Sel label="Climate" value={climate} onChange={setClimate} options={[{value:"temperate",label:"Temperate"},{value:"hot",label:"Hot / tropical"}]}/>
      </Grid2>
      {r&&(<div>
        <ResHi label="Daily Water Intake" value={`${r.liters} litres`}/>
        <Grid2><ResSm label="In millilitres" value={`${r.ml} ml`}/><ResSm label="250 ml glasses" value={`${r.glasses} glasses`}/></Grid2>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:8}}>
          {Array.from({length:Math.min(r.glasses,16)}).map((_,i)=><span key={i} style={{fontSize:20}}>💧</span>)}
          {r.glasses>16&&<span style={{fontSize:13,color:"#6b7280",alignSelf:"center"}}>+{r.glasses-16} more</span>}
        </div>
      </div>)}
    </div>
  );
}

function ZakatTool(){
  const[savings,setSavings]=useState("50000");
  const[income,setIncome]=useState("5000");
  const[gold,setGold]=useState("");
  const[business,setBusiness]=useState("");
  const r=engines.zakat({savings,gold,business,income});
  return(
    <div>
      <div style={{padding:"10px 14px",background:"rgba(245,158,11,.08)",borderRadius:10,border:"1px solid rgba(245,158,11,.2)",marginBottom:14,fontSize:12,color:"#9ca3af"}}>
        Nisab threshold 2025: <span style={{color:"#f59e0b",fontWeight:600}}>RM {fmt(r.nisab,0)}</span> (≈85g gold equivalent)
      </div>
      <Grid2><Inp label="Total savings & investments (RM)" value={savings} onChange={setSavings} type="number"/><Inp label="Monthly income (RM)" value={income} onChange={setIncome} type="number"/></Grid2>
      <Grid2><Inp label="Gold value (RM) — optional" value={gold} onChange={setGold} type="number" placeholder="0"/><Inp label="Business assets (RM) — optional" value={business} onChange={setBusiness} type="number" placeholder="0"/></Grid2>
      <ResHi label="Total Annual Zakat" value={`RM ${fmt(r.total,2)}`}/>
      <Grid2><ResSm label="Zakat on assets (2.5%)" value={`RM ${fmt(r.zakatAssets,2)}`}/><ResSm label="Zakat on income" value={`RM ${fmt(r.zakatIncome,2)}`}/></Grid2>
    </div>
  );
}

function SSTTool(){
  const[amount,setAmount]=useState("1000");
  const[type,setType]=useState("service8");
  const r=engines.sst({amount,type});
  return(
    <div>
      <Inp label="Amount before SST (RM)" value={amount} onChange={setAmount} type="number"/>
      <Sel label="SST type" value={type} onChange={setType} options={[{value:"service8",label:"Service Tax 8% (most services from Mar 2024)"},{value:"service6",label:"Service Tax 6% (F&B, telco)"},{value:"sales6",label:"Sales Tax 6%"},{value:"sales10",label:"Sales Tax 10%"}]}/>
      <ResHi label={`Total with ${r.rate}% SST`} value={`RM ${fmt(r.total,2)}`}/>
      <ResSm label="SST amount" value={`RM ${fmt(r.tax,2)}`} color="#f59e0b"/>
    </div>
  );
}

function RoadTaxTool(){
  const[cc,setCc]=useState("1500");
  const[type,setType]=useState("saloon");
  const r=engines.roadTax({cc,type});
  return(
    <div>
      <Inp label="Engine capacity" value={cc} onChange={setCc} suffix="cc" type="number"/>
      <Sel label="Vehicle type" value={type} onChange={setType} options={[{value:"saloon",label:"Saloon / Sedan"},{value:"nonSaloon",label:"Non-Saloon (SUV, MPV, pickup)"}]}/>
      <ResHi label="Road Tax (Annual)" value={`RM ${r.base}`}/>
      <ResSm label="With JPJ processing fee (~3%)" value={`RM ${r.withFee}`}/>
    </div>
  );
}

function PTPTNTool(){
  const[amount,setAmount]=useState("30000");
  const[years,setYears]=useState("10");
  const r=engines.ptptn({amount,years});
  return(
    <div>
      <Inp label="PTPTN loan amount (RM)" value={amount} onChange={setAmount} type="number"/>
      <Inp label="Repayment period" value={years} onChange={setYears} suffix="years" type="number"/>
      <div style={{fontSize:12,color:"#9ca3af",marginBottom:12,padding:"8px 12px",background:"rgba(255,255,255,.03)",borderRadius:8}}>Interest: 1% p.a. service charge (standard PTPTN rate)</div>
      <ResHi label="Monthly Repayment" value={`RM ${r.monthly}`}/>
      <Grid2><ResSm label="Total repayment" value={`RM ${fmt(parseFloat(r.total),2)}`}/><ResSm label="Total interest" value={`RM ${fmt(parseFloat(r.interest),2)}`} color="#f87171"/></Grid2>
    </div>
  );
}

function ProfitMarginTool(){
  const[revenue,setRevenue]=useState("100000");
  const[cost,setCost]=useState("65000");
  const[currency,setCurrency]=useState("USD");
  const r=engines.profitMargin({revenue,cost});
  const fc=n=>fmtC(n,currency);
  return(
    <div>
      <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,12).map(c=>({value:c.code,label:`${c.flag} ${c.code}`}))}/>
      <Grid2><Inp label="Revenue" value={revenue} onChange={setRevenue} type="number"/><Inp label="Total cost" value={cost} onChange={setCost} type="number"/></Grid2>
      {r&&(<div>
        <ResHi label="Net Profit" value={fc(r.profit)}/>
        <Grid2><ResSm label="Profit margin" value={`${r.margin}%`} color="#22c55e"/><ResSm label="Markup %" value={`${r.markup}%`} color="#a855f7"/></Grid2>
        <div style={{padding:"12px 16px",background:"rgba(34,197,94,.06)",borderRadius:10,border:"1px solid rgba(34,197,94,.15)"}}>
          <div style={{fontSize:11,color:"#9ca3af",marginBottom:4}}>Gross margin</div>
          <Bar value={parseFloat(r.margin)} max={100} color="#22c55e"/>
          <div style={{fontSize:12,color:"#22c55e",marginTop:4}}>{r.margin}% of revenue is profit</div>
        </div>
      </div>)}
    </div>
  );
}

function InflationTool(){
  const[amount,setAmount]=useState("100000");
  const[from,setFrom]=useState("2000");
  const[to,setTo]=useState("2025");
  const[rate,setRate]=useState("3");
  const[currency,setCurrency]=useState("USD");
  const r=engines.inflation({amount,from,to,rate});
  const fc=n=>fmtC(n,currency);
  return(
    <div>
      <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,12).map(c=>({value:c.code,label:`${c.flag} ${c.code}`}))}/>
      <Inp label="Amount" value={amount} onChange={setAmount} type="number"/>
      <Grid2><Inp label="From year" value={from} onChange={setFrom} type="number"/><Inp label="To year" value={to} onChange={setTo} type="number"/></Grid2>
      <Inp label="Average inflation rate" value={rate} onChange={setRate} suffix="% p.a." type="number" step="0.1"/>
      {r&&(<div>
        <ResHi label={`Value in ${to}`} value={fc(parseFloat(r.future))}/>
        <ResSm label="Purchasing power lost" value={`${(((parseFloat(r.original)-parseFloat(r.presentValue))/parseFloat(r.original))*100).toFixed(1)}%`} color="#f87171"/>
      </div>)}
    </div>
  );
}

function RentBuyTool(){
  const[rent,setRent]=useState("2000");
  const[price,setPrice]=useState("500000");
  const[down,setDown]=useState("10");
  const[rate,setRate]=useState("4.5");
  const[years,setYears]=useState("30");
  const[currency,setCurrency]=useState("USD");
  const r=engines.rentVsBuy({rent,price,down,rate,years});
  const fc=n=>fmtC(n,currency);
  return(
    <div>
      <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,12).map(c=>({value:c.code,label:`${c.flag} ${c.code}`}))}/>
      <Grid2><Inp label="Monthly rent" value={rent} onChange={setRent} type="number"/><Inp label="Property price" value={price} onChange={setPrice} type="number"/></Grid2>
      <Grid2><Inp label="Down payment" value={down} onChange={setDown} suffix="%" type="number"/><Inp label="Interest rate" value={rate} onChange={setRate} suffix="% p.a." type="number" step="0.1"/></Grid2>
      <Inp label="Time horizon" value={years} onChange={setYears} suffix="years" type="number"/>
      {r&&(<div>
        <Grid2>
          <div style={{padding:16,background:"rgba(59,130,246,.1)",borderRadius:12,border:"1px solid rgba(59,130,246,.2)"}}>
            <div style={{fontSize:11,color:"#9ca3af",marginBottom:4}}>TOTAL RENTING</div>
            <div style={{fontSize:20,fontWeight:700,color:"#3b82f6"}}>{fc(parseInt(r.totalRent))}</div>
          </div>
          <div style={{padding:16,background:"rgba(34,197,94,.1)",borderRadius:12,border:"1px solid rgba(34,197,94,.2)"}}>
            <div style={{fontSize:11,color:"#9ca3af",marginBottom:4}}>TOTAL BUYING</div>
            <div style={{fontSize:20,fontWeight:700,color:"#22c55e"}}>{fc(parseInt(r.totalBuy))}</div>
          </div>
        </Grid2>
        <ResHi label="Property value after" value={fc(parseInt(r.propertyValue))}/>
        <ResSm label="Monthly mortgage" value={fc(parseInt(r.monthly))}/>
      </div>)}
    </div>
  );
}

function RenovationTool(){
  const[area,setArea]=useState("1000");
  const[type,setType]=useState("basic");
  const[currency,setCurrency]=useState("USD");
  const r=engines.renovation({area,type,currency});
  const fc=n=>{try{return fmtC(n,currency);}catch{return `${currency} ${fmt(n,0)}`;}}
  return(
    <div>
      <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,12).map(c=>({value:c.code,label:`${c.flag} ${c.code}`}))}/>
      <Grid2>
        <Inp label="Floor area" value={area} onChange={setArea} suffix="sqft" type="number"/>
        <Sel label="Renovation grade" value={type} onChange={setType} options={[{value:"basic",label:"Basic (~60–80/sqft)"},{value:"mid",label:"Mid-range (~120–150/sqft)"},{value:"luxury",label:"Luxury (~250–300/sqft)"}]}/>
      </Grid2>
      <div style={{padding:"16px",background:"rgba(6,182,212,.08)",borderRadius:12,border:"1px solid rgba(6,182,212,.2)",marginTop:6}}>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:6}}>Estimated budget range</div>
        <div style={{fontSize:22,fontWeight:700,color:"#06b6d4"}}>{fc(parseInt(r.min))} — {fc(parseInt(r.max))}</div>
        <div style={{fontSize:13,color:"#9ca3af",marginTop:4}}>Midpoint estimate: {fc(parseInt(r.estimate))}</div>
        <div style={{fontSize:11,color:"#6b7280",marginTop:4}}>Rate: {currency} {r.rate}/sqft · {r.area} sqft</div>
      </div>
    </div>
  );
}

function MovingCostTool(){
  const[bedrooms,setBedrooms]=useState("3");
  const[distance,setDistance]=useState("50");
  const[service,setService]=useState("basic");
  const[currency,setCurrency]=useState("USD");
  const r=engines.movingCost({bedrooms,distance,service,currency});
  const fc=n=>{try{return fmtC(n,currency);}catch{return`${currency} ${fmt(n,0)}`;}}
  return(
    <div>
      <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,12).map(c=>({value:c.code,label:`${c.flag} ${c.code}`}))}/>
      <Grid2>
        <Sel label="Home size" value={bedrooms} onChange={setBedrooms} options={[{value:"studio",label:"Studio"},{value:"1",label:"1 Bedroom"},{value:"2",label:"2 Bedrooms"},{value:"3",label:"3 Bedrooms"},{value:"4",label:"4 Bedrooms"},{value:"5",label:"5+ Bedrooms"}]}/>
        <Inp label="Moving distance" value={distance} onChange={setDistance} suffix="km" type="number"/>
      </Grid2>
      <Sel label="Service type" value={service} onChange={setService} options={[{value:"basic",label:"Basic (transport + labour only)"},{value:"packing",label:"Packing + transport + labour"},{value:"full",label:"Full service (pack, move, unpack)"}]}/>
      <div style={{padding:"16px",background:"rgba(245,158,11,.08)",borderRadius:12,border:"1px solid rgba(245,158,11,.2)",marginTop:6}}>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:6}}>Estimated moving cost</div>
        <div style={{fontSize:22,fontWeight:700,color:"#f59e0b"}}>{fc(parseInt(r.min))} — {fc(parseInt(r.max))}</div>
        <div style={{fontSize:13,color:"#9ca3af",marginTop:4}}>Best estimate: {fc(parseInt(r.estimate))}</div>
        <div style={{fontSize:11,color:"#6b7280",marginTop:4}}>Prices vary by city, season and provider — get 3+ quotes</div>
      </div>
    </div>
  );
}

const COL_CITIES=["New York","London","Singapore","Sydney","Hong Kong","Tokyo","Paris","Berlin","Amsterdam","Zurich","Dubai","Toronto","Vancouver","Melbourne","Auckland","Kuala Lumpur","Bangkok","Jakarta","Manila","Ho Chi Minh City","Mumbai","Delhi","Seoul","Beijing","Shanghai","São Paulo","Mexico City","Nairobi","Lagos","Cairo","Istanbul","Warsaw","Prague","Lisbon","Madrid"];

function CostOfLivingTool(){
  const[city1,setCity1]=useState("Kuala Lumpur");
  const[city2,setCity2]=useState("Singapore");
  const r=engines.costOfLiving({city1,city2});
  const diff=parseFloat(r.difference);
  return(
    <div>
      <Grid2>
        <Sel label="Your current city" value={city1} onChange={setCity1} options={COL_CITIES.map(c=>({value:c,label:c}))}/>
        <Sel label="Compare with" value={city2} onChange={setCity2} options={COL_CITIES.map(c=>({value:c,label:c}))}/>
      </Grid2>
      <div style={{padding:"16px",borderRadius:12,background:diff>0?"rgba(239,68,68,.1)":"rgba(34,197,94,.1)",border:`1px solid ${diff>0?"rgba(239,68,68,.3)":"rgba(34,197,94,.3)"}`,textAlign:"center",marginBottom:12}}>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:4}}>{city2} is</div>
        <div style={{fontSize:28,fontWeight:800,color:diff>0?"#ef4444":"#22c55e"}}>{Math.abs(diff)}% {diff>0?"more expensive":"cheaper"}</div>
        <div style={{fontSize:12,color:"#9ca3af",marginTop:4}}>than {city1}</div>
      </div>
      <div style={{background:"rgba(255,255,255,.03)",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden"}}>
        <div style={{padding:"9px 16px",background:"rgba(255,255,255,.04)",fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".08em",display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
          <span>Category</span><span style={{textAlign:"right"}}>{city1}</span><span style={{textAlign:"right"}}>{city2}</span>
        </div>
        {[["Cost Index (NYC=100)",r.index1,r.index2,""],["Rent (monthly, USD)",r.rent.c1,r.rent.c2,"$"],["Food (monthly, USD)",r.food.c1,r.food.c2,"$"],["Transport (monthly, USD)",r.transport.c1,r.transport.c2,"$"]].map(([lbl,v1,v2,pre],i)=>(
          <div key={lbl} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"10px 16px",borderTop:"1px solid rgba(255,255,255,.05)",fontSize:13}}>
            <span style={{color:"#d1d5db"}}>{lbl}</span>
            <span style={{textAlign:"right",color:"#f9fafb",fontWeight:600}}>{pre}{fmt(v1,0)}</span>
            <span style={{textAlign:"right",color:v2>v1?"#f87171":"#22c55e",fontWeight:600}}>{pre}{fmt(v2,0)}</span>
          </div>
        ))}
      </div>
      <div style={{fontSize:11,color:"#4b5563",marginTop:8}}>Based on Numbeo-style indices. Numbers are relative estimates — verify with local sources for relocation decisions.</div>
    </div>
  );
}

function IncomeTaxTool(){
  const[income,setIncome]=useState("60000");
  const[country,setCountry]=useState("MY");
  const[taxCat,setTaxCat]=useState("single");
  const[deductions,setDeductions]=useState("9000");
  const taxCountries=[{value:"MY",label:"🇲🇾 Malaysia"},{value:"SG",label:"🇸🇬 Singapore"},{value:"GB",label:"🇬🇧 United Kingdom"},{value:"US",label:"🇺🇸 United States"},{value:"AU",label:"🇦🇺 Australia"},{value:"IN",label:"🇮🇳 India"}];
  const r=engines.salary({gross:parseFloat(income)/12||0,country,taxCat,resident:true,calcFor:"salary",epfEmpRate:0,epfEmrRate:0,socsoEmpRate:0,socsoEmrRate:0,eisRate:0,deduction:parseFloat(deductions)/12||0});
  return(
    <div>
      <Sel label="Country" value={country} onChange={setCountry} options={taxCountries}/>
      <Inp label="Annual gross income" value={income} onChange={setIncome} type="number"/>
      <Grid2>
        <Sel label="Tax category" value={taxCat} onChange={setTaxCat} options={[{value:"single",label:"Single"},{value:"married_both",label:"Married (both working)"},{value:"married_one",label:"Married (one income)"},{value:"married_child",label:"Married + children"}]}/>
        <Inp label="Total annual deductions/reliefs" value={deductions} onChange={setDeductions} type="number"/>
      </Grid2>
      {r&&(<div>
        <ResHi label="Annual Tax" value={fmtC(r.monthlyTax*12,r.currency||"USD")}/>
        <Grid2><ResSm label="Monthly tax" value={fmtC(r.monthlyTax,r.currency||"USD")}/><ResSm label="Effective rate" value={`${((r.monthlyTax*12/(parseFloat(income)||1))*100).toFixed(1)}%`}/></Grid2>
      </div>)}
    </div>
  );
}

function CreditCardTool(){
  const[balance,setBalance]=useState("5000");
  const[apr,setApr]=useState("18");
  const[payment,setPayment]=useState("200");
  const[currency,setCurrency]=useState("USD");
  const b=parseFloat(balance)||0,r=(parseFloat(apr)||0)/100/12,p=parseFloat(payment)||0;
  const minPay=Math.max(b*0.05,50);
  const months=r>0&&p>b*r?Math.ceil(-Math.log(1-b*r/p)/Math.log(1+r)):999;
  const totalPaid=months<999?p*months:0;
  const totalInterest=months<999?totalPaid-b:0;
  const fc=n=>fmtC(n,currency);
  return(
    <div>
      <Sel label="Currency" value={currency} onChange={setCurrency} options={CURRENCIES.slice(0,12).map(c=>({value:c.code,label:`${c.flag} ${c.code}`}))}/>
      <Inp label="Outstanding balance" value={balance} onChange={setBalance} type="number"/>
      <Grid2><Inp label="Annual interest rate (APR)" value={apr} onChange={setApr} suffix="%" type="number" step="0.1"/><Inp label="Monthly payment" value={payment} onChange={setPayment} type="number"/></Grid2>
      <div style={{fontSize:12,color:"#9ca3af",marginBottom:12,padding:"8px 12px",background:"rgba(255,255,255,.03)",borderRadius:8}}>Suggested minimum payment: {fc(minPay.toFixed(2))}/month</div>
      {p>0&&(<div>
        {months<999?(<div>
          <ResHi label="Months to pay off" value={`${months} months (${(months/12).toFixed(1)} yrs)`}/>
          <Grid2><ResSm label="Total paid" value={fc(totalPaid.toFixed(2))}/><ResSm label="Total interest" value={fc(totalInterest.toFixed(2))} color="#f87171"/></Grid2>
        </div>):(<div style={{padding:"16px",background:"rgba(239,68,68,.1)",borderRadius:12,border:"1px solid rgba(239,68,68,.3)",color:"#ef4444",fontSize:14,fontWeight:600}}>⚠ Payment too low — interest exceeds payment. Increase monthly payment above {fc((b*r).toFixed(2))}.</div>)}
      </div>)}
    </div>
  );
}

// ─── TOOL REGISTRY ───────────────────────────────────────────
const TOOL_COMPONENTS={
  salary:SalaryTool, loan:LoanTool, compound:CompoundTool, bmi:BMITool,
  currency:CurrencyTool, age:AgeTool, discount:DiscountTool, tip:TipTool,
  temperature:TemperatureTool, password:PasswordTool, calories:CaloriesTool,
  zakat:ZakatTool, fuel:FuelTool, percentage:PercentageTool, sst:SSTTool,
  "road-tax":RoadTaxTool, water:WaterTool, electricity:ElectricityTool,
  "date-diff":DateDiffTool, "working-days":WorkingDaysTool, countdown:CountdownTool,
  length:LengthTool, weight:WeightTool, speed:SpeedTool, data:DataTool,
  cooking:CookingTool, bodyfat:BodyFatTool, "ideal-weight":IdealWeightTool,
  inflation:InflationTool, renovation:RenovationTool, ptptn:PTPTNTool,
  "profit-margin":ProfitMarginTool, "rent-vs-buy":RentBuyTool,
  "income-tax":IncomeTaxTool, "credit-card":CreditCardTool,
  timezone:TimezoneTool, "public-holiday":PublicHolidayTool,
  "long-weekend":LongWeekendTool, "leave-optimizer":LeaveOptimizerTool,
  "moving-cost":MovingCostTool, "cost-of-living":CostOfLivingTool,
};


// ─── MAIN APP — clean URL routing, no hash ─────────────────
export default function PeakToolsHub({initialToolId=null,embedded=false}={}){
  const[page,setPage]=useState(()=>{
    // When embedded in Next.js, use initialToolId directly — skip URL parsing
    if(initialToolId) return{view:"tool",toolId:initialToolId,category:null};
    // Standalone: read initial route from pathname (clean URLs, no hash)
    if(typeof window==="undefined") return{view:"home",toolId:null,category:null};
    const path=window.location.pathname.replace(/\/$/,"");
    const parts=path.split("/").filter(Boolean);
    if(parts[0]==="tools"&&parts[1]) return{view:"tool",toolId:parts[1],category:null};
    if(parts[0]==="category"&&parts[1]) return{view:"category",toolId:null,category:parts[1]};
    return{view:"home",toolId:null,category:null};
  });
  const[search,setSearch]=useState("");
  const[activeCategory,setActiveCategory]=useState("all");

  // Push clean URL state without hash (skip when embedded in Next.js)
  const navigate=(view,toolId=null,cat=null)=>{
    if(!embedded){
      const path=view==="tool"?`/tools/${toolId}`:view==="category"?`/category/${cat}`:"/";
      if(typeof window!=="undefined") window.history.pushState({view,toolId,cat},"",path);
    }
    setPage({view,toolId,category:cat});
    if(typeof window!=="undefined"&&!embedded) window.scrollTo({top:0,behavior:"smooth"});
  };

  useEffect(()=>{
    const onPop=e=>{
      const s=e.state||{view:"home",toolId:null,cat:null};
      setPage({view:s.view||"home",toolId:s.toolId||null,category:s.cat||null});
    };
    window.addEventListener("popstate",onPop);
    return()=>window.removeEventListener("popstate",onPop);
  },[]);

  const activeTool=page.toolId?ALL_TOOLS.find(t=>t.id===page.toolId):null;
  const ToolComponent=activeTool?TOOL_COMPONENTS[activeTool.id]:null;
  const activeCat=activeTool?Object.entries(TOOLS).find(([,v])=>v.find(t=>t.id===activeTool.id))?.[0]:null;
  const toolFaqs=activeTool?TOOL_FAQS[activeTool.id]||[]:[];

  const filteredTools=ALL_TOOLS.filter(t=>{
    const inCat=activeCategory==="all"||Object.entries(TOOLS).find(([k,v])=>k===activeCategory&&v.includes(t));
    const inSearch=!search||t.name.toLowerCase().includes(search.toLowerCase())||t.desc.toLowerCase().includes(search.toLowerCase());
    return inCat&&inSearch;
  });

  return(
    <div style={{minHeight:"100vh",background:"#0a0a14",color:"#f9fafb",fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap');
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px;}
        input[type=date]::-webkit-calendar-picker-indicator{filter:invert(.6);cursor:pointer;}
        select option{background:#1a1a2e;}
        input[type=range]{-webkit-appearance:none;height:4px;background:rgba(255,255,255,.1);border-radius:2px;outline:none;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;background:#22c55e;border-radius:50%;cursor:pointer;}
        .tc:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3);}
        .tc{transition:transform .15s ease,box-shadow .15s ease;}
        @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .fi{animation:fi .25s ease;}
        a{color:inherit;text-decoration:none;}
        /* FAQ accordion */
        .faq-item{border-bottom:1px solid rgba(255,255,255,.06);}
        .faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:16px 0;background:none;border:none;color:#f9fafb;cursor:pointer;font-family:inherit;font-size:14px;font-weight:500;text-align:left;gap:12px;}
        .faq-a{font-size:13px;color:#9ca3af;line-height:1.7;padding:0 0 14px;margin:0;}
      `}</style>

      {/* ── HEADER ── */}
      <header style={{position:"sticky",top:0,zIndex:100,background:"rgba(10,10,20,.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,.07)",padding:"0 20px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",height:58,gap:14}}>
          <a href="/" onClick={e=>{e.preventDefault();navigate("home");setSearch("");setActiveCategory("all");}} style={{display:"flex",alignItems:"center",gap:9,textDecoration:"none",flexShrink:0}}>
            <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#22c55e,#16a34a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>⚡</div>
            <span style={{fontSize:17,fontWeight:800,background:"linear-gradient(135deg,#fff,#9ca3af)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"'Space Grotesk',sans-serif",whiteSpace:"nowrap"}}>Peak Tools Hub</span>
          </a>
          <div style={{flex:1,position:"relative"}}>
            <input value={search} onChange={e=>{setSearch(e.target.value);if(page.view!=="home")navigate("home");}} placeholder="Search 40+ tools…"
              style={{width:"100%",padding:"8px 14px 8px 36px",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:9,color:"#f9fafb",fontSize:13,outline:"none",fontFamily:"inherit"}}/>
            <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"#6b7280",fontSize:13}}>🔍</span>
          </div>
          <span style={{fontSize:12,color:"#6b7280",whiteSpace:"nowrap",display:"none"}} className="hide-sm">{ALL_TOOLS.length} tools</span>
        </div>
      </header>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 20px"}}>

        {/* ── HOME PAGE ── */}
        {page.view==="home"&&(
          <>
            {!search&&(
              <div style={{textAlign:"center",padding:"32px 0 36px"}}>
                <div style={{display:"inline-block",padding:"5px 14px",background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.25)",borderRadius:100,fontSize:11,color:"#22c55e",fontWeight:700,marginBottom:16,letterSpacing:".08em"}}>
                  🌍 Global Free Utility Calculator Suite
                </div>
                <h1 style={{fontSize:"clamp(26px,5vw,46px)",fontWeight:900,margin:"0 0 12px",fontFamily:"'Space Grotesk',sans-serif",lineHeight:1.1}}>
                  Every Calculator<br/>
                  <span style={{background:"linear-gradient(135deg,#22c55e,#3b82f6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>You'll Ever Need</span>
                </h1>
                <p style={{fontSize:15,color:"#9ca3af",margin:"0 auto",maxWidth:460,lineHeight:1.65}}>
                  {ALL_TOOLS.length}+ free tools for finance, health, conversions & daily life. Global-ready, real-time data, no sign-up.
                </p>
              </div>
            )}

            {/* Category filters */}
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:22,scrollbarWidth:"none"}}>
              {[["all","All Tools","#22c55e"],...Object.entries(CATEGORY_META).map(([k,v])=>[k,v.label,v.color])].map(([k,l,col])=>(
                <button key={k} onClick={()=>{setActiveCategory(k);setSearch("");}} style={{padding:"7px 15px",background:activeCategory===k?col:"rgba(255,255,255,.05)",border:"none",borderRadius:100,color:activeCategory===k?"white":"#9ca3af",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,whiteSpace:"nowrap",transition:"all .2s",flexShrink:0}}>{l}</button>
              ))}
            </div>

            {/* Tools grid */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:10}}>
              {filteredTools.map(tool=>{
                const cat=Object.entries(TOOLS).find(([,v])=>v.includes(tool))?.[0];
                const cm=CATEGORY_META[cat]||CATEGORY_META.finance;
                return(
                  <a key={tool.id} href={`/tools/${tool.id}`} onClick={e=>{e.preventDefault();navigate("tool",tool.id);}} className="tc"
                    style={{padding:"16px",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:13,cursor:"pointer",textAlign:"left",fontFamily:"inherit",color:"inherit",display:"block",position:"relative",overflow:"hidden",textDecoration:"none"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:cm.color,opacity:.6}}/>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:9}}>
                      <span style={{fontSize:22}}>{tool.icon}</span>
                      <div style={{display:"flex",gap:4}}>
                        {tool.badge&&<span style={{fontSize:9,padding:"2px 6px",background:"rgba(34,197,94,.15)",color:"#22c55e",borderRadius:100,fontWeight:700}}>{tool.badge}</span>}
                        {tool.tag&&<span style={{fontSize:9,padding:"2px 6px",background:cm.bg,color:cm.color,borderRadius:100,fontWeight:700}}>{tool.tag}</span>}
                        {tool.global&&<span style={{fontSize:9,padding:"2px 6px",background:"rgba(59,130,246,.12)",color:"#60a5fa",borderRadius:100,fontWeight:700}}>GLOBAL</span>}
                      </div>
                    </div>
                    <div style={{fontSize:13,fontWeight:700,color:"#f9fafb",marginBottom:3}}>{tool.name}</div>
                    <div style={{fontSize:11,color:"#6b7280",lineHeight:1.4}}>{tool.desc}</div>
                  </a>
                );
              })}
            </div>

            {filteredTools.length===0&&(
              <div style={{textAlign:"center",padding:"60px 20px",color:"#6b7280"}}>
                <div style={{fontSize:36,marginBottom:10}}>🔍</div>
                <div style={{fontSize:15}}>No tools found for "{search}"</div>
              </div>
            )}

            {/* Stats */}
            {!search&&(
              <div style={{marginTop:48,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:14}}>
                {[["40+","Free Tools"],["170+","Currencies"],["19","Countries"],["0","Sign-ups needed"]].map(([v,l])=>(
                  <div key={l} style={{textAlign:"center",padding:"20px 14px",background:"rgba(255,255,255,.02)",borderRadius:12,border:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{fontSize:26,fontWeight:800,color:"#f9fafb",fontFamily:"'Space Grotesk',sans-serif"}}>{v}</div>
                    <div style={{fontSize:11,color:"#6b7280",marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── TOOL PAGE ── */}
        {page.view==="tool"&&activeTool&&(
          <div className="fi">
            {/* Breadcrumb — schema-friendly */}
            <nav aria-label="Breadcrumb" style={{display:"flex",alignItems:"center",gap:6,marginBottom:22,fontSize:13,color:"#6b7280"}}>
              <a href="/" onClick={e=>{e.preventDefault();navigate("home");}} style={{color:"#9ca3af",textDecoration:"none"}}>Home</a>
              <span>/</span>
              <a href={`/category/${activeCat}`} onClick={e=>{e.preventDefault();navigate("category",null,activeCat);}} style={{color:"#9ca3af",textDecoration:"none",textTransform:"capitalize"}}>{activeCat}</a>
              <span>/</span>
              <span style={{color:"#f9fafb"}}>{activeTool.name}</span>
            </nav>

            <div style={{display:"grid",gridTemplateColumns:"1fr min(360px,100%)",gap:22,alignItems:"start"}}>

              {/* Left column: tool + FAQ */}
              <div>
                {/* Tool header — H1 for SEO */}
                <div style={{marginBottom:20}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
                    <span style={{fontSize:30}}>{activeTool.icon}</span>
                    <div>
                      <h1 style={{margin:0,fontSize:24,fontWeight:800,fontFamily:"'Space Grotesk',sans-serif",color:"#f9fafb"}}>{activeTool.name}</h1>
                      <p style={{margin:"3px 0 0",fontSize:13,color:"#9ca3af"}}>{activeTool.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Calculator widget */}
                <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,padding:"22px",marginBottom:24}}>
                  {ToolComponent?<ToolComponent/>:(
                    <div style={{textAlign:"center",padding:"40px",color:"#6b7280"}}>
                      <div style={{fontSize:30,marginBottom:10}}>🔧</div>
                      <div>Coming soon!</div>
                    </div>
                  )}
                </div>

                {/* FAQ Section — min 10 per tool, rich snippet eligible */}
                {toolFaqs.length>0&&(
                  <section aria-label="Frequently asked questions">
                    <h2 style={{fontSize:18,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",marginBottom:16,color:"#f9fafb"}}>
                      Frequently Asked Questions — {activeTool.name}
                    </h2>
                    <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,overflow:"hidden",padding:"0 20px"}}>
                      {toolFaqs.map((faq,i)=><FAQItem key={i} q={faq.q} a={faq.a}/>)}
                    </div>
                  </section>
                )}
              </div>

              {/* Right column: related + trust */}
              <div style={{position:"sticky",top:76}}>
                {/* Related tools */}
                <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"18px",marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".1em",marginBottom:12}}>Related Tools</div>
                  {(TOOLS[activeCat]||[]).filter(t=>t.id!==activeTool.id).slice(0,5).map(t=>(
                    <a key={t.id} href={`/tools/${t.id}`} onClick={e=>{e.preventDefault();navigate("tool",t.id);}}
                      style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:8,marginBottom:2,color:"inherit",textDecoration:"none",transition:"background .15s"}}
                      onMouseOver={e=>e.currentTarget.style.background="rgba(255,255,255,.05)"}
                      onMouseOut={e=>e.currentTarget.style.background="transparent"}>
                      <span style={{fontSize:17}}>{t.icon}</span>
                      <div>
                        <div style={{fontSize:12,fontWeight:600,color:"#f9fafb"}}>{t.name}</div>
                        <div style={{fontSize:10,color:"#6b7280"}}>{t.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Trust signals */}
                <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"18px"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".1em",marginBottom:12}}>About This Tool</div>
                  <div style={{fontSize:12,color:"#9ca3af",lineHeight:1.7,marginBottom:12}}>
                    {activeTool.name} provides accurate, instant calculations using validated formulas. Results are for estimation and planning purposes only.
                  </div>
                  {[["✓","Validated formulas"],["✓","Free forever"],["✓","No sign-up needed"],["✓","Real-time data"],["✓","Global currencies"]].map(([icon,label])=>(
                    <div key={label} style={{fontSize:11,color:"#22c55e",fontWeight:600,marginBottom:3}}>{icon} {label}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        <footer style={{marginTop:56,paddingTop:28,borderTop:"1px solid rgba(255,255,255,.06)",textAlign:"center"}}>
          <div style={{fontSize:13,color:"#6b7280",marginBottom:6}}>
            <strong style={{color:"#9ca3af"}}>Peak Tools Hub</strong> — Free online calculators for everyone, everywhere
          </div>
          <div style={{fontSize:11,color:"#374151",marginBottom:16}}>
            Finance · Health · Converters · Daily Life · {ALL_TOOLS.length}+ Tools · Real-time Data
          </div>
          {/* Footer nav for internal linking — SEO */}
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            {Object.entries(CATEGORY_META).map(([k,v])=>(
              <a key={k} href={`/category/${k}`} onClick={e=>{e.preventDefault();navigate("category",null,k);}}
                style={{fontSize:11,color:"#4b5563",textDecoration:"none",textTransform:"capitalize"}}
                onMouseOver={e=>e.currentTarget.style.color="#9ca3af"}
                onMouseOut={e=>e.currentTarget.style.color="#4b5563"}>
                {v.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

// ─── FAQ ACCORDION ────────────────────────────────────────────
function FAQItem({q,a}){
  const[open,setOpen]=useState(false);
  return(
    <div className="faq-item">
      <button className="faq-q" onClick={()=>setOpen(o=>!o)} aria-expanded={open}>
        <span>{q}</span>
        <span style={{fontSize:18,color:"#6b7280",flexShrink:0,transform:open?"rotate(180deg)":"none",transition:"transform .2s"}}>⌄</span>
      </button>
      {open&&<p className="faq-a">{a}</p>}
    </div>
  );
}
