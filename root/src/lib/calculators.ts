/**
 * Peak Tools Hub — Calculator Engine Library v3
 * Updated to match PeakToolsHub.jsx engines exactly
 */

// ─── GLOBAL SALARY (19 countries) ────────────────────────────────────────────
export interface SalaryInput {
  gross: number; bonus?: number; country: string; taxCat?: string;
  resident?: boolean; calcFor?: string;
  empR?: number; emrR?: number; ssEmp?: number; ssEmr?: number; eis?: number;
  deduction?: number; zakat?: number;
}

export interface SalaryResult {
  grossIncome: number; baseSalary: number; baseBonus: number;
  epfEmpAmt: number; epfEmrAmt: number;
  socsoEmpAmt: number; socsoEmrAmt: number;
  eisEmpAmt: number; eisEmrAmt: number;
  monthlyTax: number; zakatOffset: number; zakatAmt: number; taxAfterZakat: number;
  totalEmpDed: number; net: number; totalEmrCost: number;
  takeHomeRate: number; currency: string; countryName: string; flag: string;
  penLabel: string; ssLabel: string; taxLabel: string;
  empR: number; emrR: number; ssEmp: number; ssEmr: number; eis: number;
}

const COUNTRY_META: Record<string, { name:string; flag:string; cur:string; pen:string; ss:string; tax:string; nr:number }> = {
  MY:{name:"Malaysia",flag:"🇲🇾",cur:"MYR",pen:"EPF",ss:"SOCSO",tax:"PCB/MTD",nr:30},
  SG:{name:"Singapore",flag:"🇸🇬",cur:"SGD",pen:"CPF",ss:"CPF (emr)",tax:"Income Tax",nr:15},
  GB:{name:"United Kingdom",flag:"🇬🇧",cur:"GBP",pen:"Pension",ss:"Nat. Insurance",tax:"PAYE",nr:20},
  AU:{name:"Australia",flag:"🇦🇺",cur:"AUD",pen:"Superannuation",ss:"Medicare",tax:"Income Tax",nr:32.5},
  US:{name:"United States",flag:"🇺🇸",cur:"USD",pen:"Social Security",ss:"Medicare",tax:"Federal Tax",nr:30},
  IN:{name:"India",flag:"🇮🇳",cur:"INR",pen:"EPF",ss:"ESI",tax:"TDS",nr:30},
  ID:{name:"Indonesia",flag:"🇮🇩",cur:"IDR",pen:"BPJS TK",ss:"BPJS Kesehatan",tax:"PPh 21",nr:20},
  PH:{name:"Philippines",flag:"🇵🇭",cur:"PHP",pen:"SSS",ss:"PhilHealth",tax:"BIR WHT",nr:25},
  TH:{name:"Thailand",flag:"🇹🇭",cur:"THB",pen:"Prov. Fund",ss:"Social Security",tax:"PIT",nr:15},
  DE:{name:"Germany",flag:"🇩🇪",cur:"EUR",pen:"Rentenversicherung",ss:"Krankenversicherung",tax:"Lohnsteuer",nr:25},
  FR:{name:"France",flag:"🇫🇷",cur:"EUR",pen:"Retraite",ss:"Assurance maladie",tax:"IRPP",nr:20},
  CA:{name:"Canada",flag:"🇨🇦",cur:"CAD",pen:"CPP",ss:"EI",tax:"Federal Tax",nr:25},
  JP:{name:"Japan",flag:"🇯🇵",cur:"JPY",pen:"Kousei Nenkin",ss:"Kenko Hoken",tax:"Shotokuzei",nr:20.42},
  KR:{name:"South Korea",flag:"🇰🇷",cur:"KRW",pen:"Nat. Pension",ss:"Health Insurance",tax:"Soduktax",nr:20},
  AE:{name:"UAE",flag:"🇦🇪",cur:"AED",pen:"GPSSA",ss:"None",tax:"No income tax",nr:0},
  ZA:{name:"South Africa",flag:"🇿🇦",cur:"ZAR",pen:"UIF",ss:"Skills levy",tax:"PAYE",nr:25},
  BR:{name:"Brazil",flag:"🇧🇷",cur:"BRL",pen:"INSS",ss:"FGTS",tax:"IRRF",nr:25},
  NG:{name:"Nigeria",flag:"🇳🇬",cur:"NGN",pen:"Pension",ss:"None",tax:"PAYE",nr:10},
  OTHER:{name:"Custom",flag:"🌐",cur:"",pen:"Pension",ss:"Social Security",tax:"Income Tax",nr:20},
};

export function calcSalaryGlobal(input: SalaryInput): SalaryResult | null {
  const {
    gross=0, bonus=0, country="MY", taxCat="single", resident=true, calcFor="salary",
    empR=11, emrR=13, ssEmp=0.5, ssEmr=1.75, eis=0.2, deduction=0, zakat=0
  } = input;

  const m = COUNTRY_META[country] ?? COUNTRY_META.MY;
  const s = (calcFor==="salary"||calcFor==="both") ? (gross||0) : 0;
  const b = (calcFor==="bonus"||calcFor==="both") ? (bonus||0) : 0;
  const g = s + b;
  if (g <= 0) return null;

  const eeP=g*(empR/100), erP=g*(emrR/100);
  const ssE=s*(ssEmp/100), ssEr=s*(ssEmr/100);
  const eisE=s*(eis/100), eisEr=s*(eis/100);
  const relief = country==="MY" ? ({single:9000,married_both:9000,married_one:13000,married_child:14000}[taxCat]??9000) : 0;
  const annC = Math.max(0, g*12 - relief - eeP*12 - (deduction||0)*12);

  let annTax = 0;
  if (!resident) {
    annTax = annC * (m.nr/100);
  } else if (country==="MY") {
    const bands:Array<[number,number]>=[[5000,.01],[15000,.03],[15000,.08],[15000,.13],[20000,.21],[30000,.24],[Infinity,.245]];
    let rem=annC; for(const[bw,r] of bands){const t=Math.min(rem,bw);annTax+=t*r;rem-=t;if(rem<=0)break;}
    if(taxCat==="married_one"||taxCat==="married_child")annTax=Math.max(0,annTax-(annC<=35000?400:0));
  } else if (country==="SG") {
    const bands:Array<[number,number]>=[[20000,0],[10000,.02],[10000,.035],[40000,.07],[40000,.115],[40000,.15],[40000,.18],[40000,.19],[40000,.195],[40000,.2],[Infinity,.22]];
    let rem=annC; for(const[bw,r] of bands){const t=Math.min(rem,bw);annTax+=t*r;rem-=t;if(rem<=0)break;}
  } else if (country==="GB") {
    const t=Math.max(0,annC-12570);
    annTax=t<=37700?t*.20:t<=125140?37700*.20+(t-37700)*.40:37700*.20+87440*.40+(t-125140)*.45;
  } else if (country==="US") {
    const t=Math.max(0,annC-14600);
    const bands:Array<[number,number]>=[[11600,.10],[35550,.12],[54800,.22],[103350,.24],[197300,.32],[243725,.35],[Infinity,.37]];
    let rem=t; for(const[bw,r] of bands){const s2=Math.min(rem,bw);annTax+=s2*r;rem-=s2;if(rem<=0)break;}
  } else if (country==="AU") {
    if(annC<=18200)annTax=0;
    else if(annC<=45000)annTax=(annC-18200)*.19;
    else if(annC<=120000)annTax=5092+(annC-45000)*.325;
    else if(annC<=180000)annTax=29467+(annC-120000)*.37;
    else annTax=51667+(annC-180000)*.45;
    annTax+=annC*.02; // Medicare levy
  } else if (country==="IN") {
    if(annC>500000){
      const bands:Array<[number,number]>=[[300000,0],[300000,.05],[300000,.10],[300000,.15],[300000,.20],[Infinity,.30]];
      let rem=annC; for(const[bw,r] of bands){const t=Math.min(rem,bw);annTax+=t*r;rem-=t;if(rem<=0)break;}
      annTax*=1.04; // cess
    }
  } else {
    annTax = annC * (annC<20000?.05 : annC<50000?.15 : annC<100000?.20 : .25);
  }

  const mTax = Math.max(0, annTax/12);
  const zakatAmt = zakat||0;
  const zakatOff = country==="MY" ? Math.min(zakatAmt, mTax) : 0;
  const totalDed = eeP + ssE + eisE + (mTax-zakatOff) + zakatAmt;
  const net = g - totalDed;

  return {
    grossIncome:g, baseSalary:s, baseBonus:b,
    epfEmpAmt:eeP, epfEmrAmt:erP, socsoEmpAmt:ssE, socsoEmrAmt:ssEr, eisEmpAmt:eisE, eisEmrAmt:eisEr,
    monthlyTax:mTax, zakatOffset:zakatOff, zakatAmt, taxAfterZakat:mTax-zakatOff,
    totalEmpDed:totalDed, net, totalEmrCost:g+erP+ssEr+eisEr,
    takeHomeRate:g>0?(net/g)*100:0,
    currency:m.cur, countryName:m.name, flag:m.flag,
    penLabel:m.pen, ssLabel:m.ss, taxLabel:m.tax,
    empR, emrR, ssEmp, ssEmr, eis,
  };
}

// Legacy MY-only alias for backward compat
export function calcSalary(gross: number, epfRate: number = 11) {
  const r = calcSalaryGlobal({ gross, country:"MY", empR:epfRate });
  if (!r) return null;
  return {
    gross: r.grossIncome, epfEmployee: r.epfEmpAmt, epfEmployer: r.epfEmrAmt,
    socsoEmployee: r.socsoEmpAmt, eis: r.eisEmpAmt, pcb: r.monthlyTax,
    net: r.net, totalDeductions: r.totalEmpDed, takeHomePercent: r.takeHomeRate,
  };
}

// ─── LOAN ──────────────────────────────────────────────────────────────────
export interface AmortizationRow { month: number; payment: number; interest: number; principal: number; balance: number; }
export interface LoanResult { monthly: number; total: number; interest: number; principal: number; schedule: AmortizationRow[]; }

export function calcLoan(principal: number, annualRate: number, years: number): LoanResult {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return { monthly: principal/n, total: principal, interest: 0, principal, schedule: [] };
  const monthly = (principal * r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1);
  const total = monthly * n, interest = total - principal;
  let balance = principal;
  const schedule: AmortizationRow[] = [];
  for (let i = 1; i <= n; i++) {
    const ip = balance * r, pp = monthly - ip;
    balance = Math.max(0, balance - pp);
    if (i <= 12 || i % 12 === 0) schedule.push({ month:i, payment:monthly, interest:ip, principal:pp, balance });
  }
  return { monthly, total, interest, principal, schedule };
}

// ─── COMPOUND ──────────────────────────────────────────────────────────────
export interface CompoundResult { total: number; contributed: number; earned: number; roi: number; yearlyData: { year: number; value: number; contributed: number }[]; }

export function calcCompound(principal: number, annualRate: number, years: number, compoundsPerYear: number = 12, monthlyContribution: number = 0): CompoundResult {
  const r = annualRate / 100, n = compoundsPerYear, t = years, pmt = monthlyContribution;
  const fvL = principal * Math.pow(1+r/n, n*t);
  const fvP = r > 0 ? pmt * ((Math.pow(1+r/n,n*t)-1)/(r/n)) : pmt*n*t;
  const total = fvL + fvP, contributed = principal + pmt*12*t, earned = total - contributed;
  const yearlyData = Array.from({length:t},(_,i)=>{const y=i+1;const v=principal*Math.pow(1+r/n,n*y)+(r>0?pmt*((Math.pow(1+r/n,n*y)-1)/(r/n)):pmt*n*y);return{year:y,value:v,contributed:principal+pmt*12*y};});
  return { total, contributed, earned, roi: contributed>0?(earned/contributed)*100:0, yearlyData };
}

// ─── ZAKAT ──────────────────────────────────────────────────────────────────
export interface ZakatResult { totalAssets: number; zakatAssets: number; zakatIncome: number; monthlyZakat: number; total: number; nisab: number; }

export function calcZakat(savings: number, gold: number, business: number, monthlyIncome: number): ZakatResult {
  const NISAB = 22600;
  const totalAssets = savings + gold + business;
  const zakatAssets = totalAssets >= NISAB ? totalAssets * 0.025 : 0;
  const annualIncome = monthlyIncome * 12;
  const zakatIncome = annualIncome >= NISAB ? annualIncome * 0.025 / 12 : 0;
  return { totalAssets, zakatAssets, zakatIncome, monthlyZakat: zakatIncome, total: zakatAssets + zakatIncome * 12, nisab: NISAB };
}

// ─── BMI ───────────────────────────────────────────────────────────────────
export interface BMIResult { bmi: number; category: string; colorClass: string; risk: string; healthyMin: number; healthyMax: number; }

export function calcBMI(weightKg: number, heightCm: number): BMIResult {
  const h = heightCm / 100, bmi = weightKg / (h * h);
  let category: string, colorClass: string, risk: string;
  if (bmi < 18.5) { category="Underweight"; colorClass="text-blue-400"; risk="Moderate"; }
  else if (bmi < 25) { category="Normal Weight"; colorClass="text-green-400"; risk="Low"; }
  else if (bmi < 30) { category="Overweight"; colorClass="text-amber-400"; risk="Moderate"; }
  else if (bmi < 35) { category="Obese Class I"; colorClass="text-red-400"; risk="High"; }
  else { category="Obese Class II+"; colorClass="text-red-600"; risk="Very High"; }
  return { bmi, category, colorClass, risk, healthyMin: 18.5*h*h, healthyMax: 24.9*h*h };
}

// ─── CALORIES ──────────────────────────────────────────────────────────────
export interface CalorieResult { bmr: number; tdee: number; cut: number; bulk: number; maintain: number; protein: number; carbs: number; fat: number; }

export function calcCalories(weightKg: number, heightCm: number, age: number, gender: "male"|"female", activityLevel: string): CalorieResult {
  const bmr = gender==="male" ? 10*weightKg+6.25*heightCm-5*age+5 : 10*weightKg+6.25*heightCm-5*age-161;
  const factors: Record<string,number> = { sedentary:1.2, light:1.375, moderate:1.55, active:1.725, veryActive:1.9 };
  const tdee = bmr * (factors[activityLevel] ?? 1.55);
  return {
    bmr:Math.round(bmr), tdee:Math.round(tdee),
    cut:Math.round(tdee-500), bulk:Math.round(tdee+300), maintain:Math.round(tdee),
    protein:Math.round(weightKg*2.0), carbs:Math.round(tdee*.50/4), fat:Math.round(tdee*.25/9),
  };
}

// ─── CONVERTERS ────────────────────────────────────────────────────────────
export const CONVERSION_FACTORS = {
  length: { mm:0.001, cm:0.01, m:1, km:1000, in:0.0254, ft:0.3048, yd:0.9144, mi:1609.344, nmi:1852 },
  weight: { mg:0.000001, g:0.001, kg:1, t:1000, oz:0.028349, lb:0.453592, st:6.35029 },
  speed:  { ms:1, kmh:0.277778, mph:0.44704, knot:0.514444, fts:0.3048 },
  data:   { B:1, KB:1024, MB:1048576, GB:1073741824, TB:1099511627776, PB:1125899906842624 },
  cooking:{ ml:1, l:1000, tsp:4.92892, tbsp:14.7868, cup:236.588, floz:29.5735, pint:473.176, qt:946.353, gal:3785.41 },
};

export function convertUnit(value: number, from: string, category: keyof typeof CONVERSION_FACTORS): Record<string, number> {
  const factors = CONVERSION_FACTORS[category] as Record<string, number>;
  const base = value * factors[from];
  return Object.fromEntries(Object.entries(factors).map(([k,f])=>[k, base/f]));
}

export function convertTemperature(value: number, from: "C"|"F"|"K"): { C: number; F: number; K: number } {
  let c: number;
  if (from==="C") c=value;
  else if (from==="F") c=(value-32)*5/9;
  else c=value-273.15;
  return { C:c, F:c*9/5+32, K:c+273.15 };
}

// ─── DATE / TIME ───────────────────────────────────────────────────────────
export interface AgeResult { years: number; months: number; days: number; totalDays: number; totalWeeks: number; totalMonths: number; }

export function calcAge(dob: Date): AgeResult {
  const now = new Date();
  let years=now.getFullYear()-dob.getFullYear(), months=now.getMonth()-dob.getMonth(), days=now.getDate()-dob.getDate();
  if (days < 0) { months--; days+=new Date(now.getFullYear(),now.getMonth(),0).getDate(); }
  if (months < 0) { years--; months+=12; }
  const totalDays = Math.floor((now.getTime()-dob.getTime())/86400000);
  return { years, months, days, totalDays, totalWeeks:Math.floor(totalDays/7), totalMonths:years*12+months };
}

export interface WorkingDaysResult { workingDays: number; weekends: number; total: number; }

export function countWorkingDays(from: Date, to: Date): WorkingDaysResult {
  let working=0, total=0;
  const cur = new Date(from);
  while (cur <= to) {
    total++;
    const day = cur.getDay();
    if (day !== 0 && day !== 6) working++;
    cur.setDate(cur.getDate()+1);
  }
  return { workingDays:working, weekends:total-working, total };
}

// ─── MALAYSIA-SPECIFIC ──────────────────────────────────────────────────────
export interface RoadTaxResult { cc: number; base: number; withJPJFee: number; }

export function calcRoadTax(cc: number, type: "saloon"|"nonSaloon"): RoadTaxResult {
  let base: number;
  if (type === "saloon") {
    if(cc<=1000)base=20; else if(cc<=1200)base=55; else if(cc<=1400)base=70;
    else if(cc<=1600)base=90; else if(cc<=1800)base=200+(cc-1600)*0.40;
    else if(cc<=2000)base=280+(cc-1800)*0.50; else if(cc<=2500)base=380+(cc-2000)*1.00;
    else if(cc<=3000)base=880+(cc-2500)*2.50; else base=2130+(cc-3000)*4.50;
  } else {
    if(cc<=1000)base=20; else if(cc<=1400)base=44; else if(cc<=1600)base=56;
    else if(cc<=2000)base=90; else if(cc<=2500)base=200; else base=400;
  }
  return { cc, base, withJPJFee: base * 1.03 };
}

export interface SSTResult { amount: number; rate: number; tax: number; total: number; }

// Updated to include service8 (8% — effective March 2024)
export function calcSST(amount: number, type: "service8"|"service6"|"sales6"|"sales10"): SSTResult {
  const rates: Record<string,number> = { service8:0.08, service6:0.06, sales6:0.06, sales10:0.10 };
  const rate = rates[type] ?? 0.08;
  const tax = amount * rate;
  return { amount, rate:rate*100, tax, total:amount+tax };
}

export interface ElectricityResult { kwh: number; cost: number; monthlyAvg: number; sstAmount: number; totalWithSST: number; }

// Updated to support custom rate (for non-MY users)
export function calcElectricity(kwh: number, customRatePerKwh: number = 0): ElectricityResult {
  let cost: number;
  if (customRatePerKwh > 0) {
    cost = kwh * customRatePerKwh;
  } else {
    // MY TNB tiered tariff
    if(kwh<=200)cost=kwh*.218;
    else if(kwh<=300)cost=200*.218+(kwh-200)*.334;
    else if(kwh<=600)cost=200*.218+100*.334+(kwh-300)*.516;
    else cost=200*.218+100*.334+300*.516+(kwh-600)*.546;
  }
  return { kwh, cost, monthlyAvg:cost/30, sstAmount:cost*0.06, totalWithSST:cost*1.06 };
}

// ─── CURRENCY ──────────────────────────────────────────────────────────────
let rateCache: { rates: Record<string,number>; base: string; timestamp: number } | null = null;
const CACHE_DURATION = 3600 * 1000;

export async function fetchExchangeRates(base: string = "USD"): Promise<{ rates: Record<string,number>; source: string; ts?: string }> {
  if (rateCache && rateCache.base === base && Date.now()-rateCache.timestamp < CACHE_DURATION) {
    return { rates: rateCache.rates, source: "cached" };
  }
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    if (!res.ok) throw new Error("HTTP "+res.status);
    const data = await res.json();
    if (data.result !== "success") throw new Error("API error");
    rateCache = { rates: data.rates, base, timestamp: Date.now() };
    return { rates: data.rates, source: "live", ts: data.time_last_update_utc };
  } catch {
    const FB: Record<string,number> = {
      USD:1, EUR:.921, GBP:.789, JPY:149.5, AUD:1.532, CAD:1.362, CHF:.895, CNY:7.24, HKD:7.824,
      MYR:4.47, SGD:1.348, INR:83.4, KRW:1330, THB:35.1, IDR:15750, PHP:56.8, VND:24500, AED:3.673,
      SAR:3.751, QAR:3.641, KWD:.308, TRY:32.0, ZAR:18.6, EGP:48.5, NGN:1550, MXN:17.2, BRL:5.0,
      NZD:1.63, SEK:10.4, NOK:10.6, DKK:6.89, PLN:3.95, CZK:22.8, TWD:31.8, BND:1.348, PKR:278,
    };
    const bR = FB[base] ?? 1;
    return { rates: Object.fromEntries(Object.entries(FB).map(([k,v])=>[k,v/bR])), source: "fallback" };
  }
}

export function convertCurrency(amount: number, fromRate: number, toRate: number): number {
  return (amount / fromRate) * toRate;
}

// ─── ADDITIONAL ENGINES ────────────────────────────────────────────────────
export interface RentVsBuyResult { monthly: number; totalBuy: number; totalRent: number; propertyValue: number; }

export function calcRentVsBuy(rent: number, price: number, downPct: number, rate: number, years: number, appreciation: number = 3): RentVsBuyResult | null {
  const r = rent*12, p = price, d = downPct/100, loan = p*(1-d);
  const lR = rate/100/12, n = years*12;
  if (!lR || !n) return null;
  const monthly = (loan*lR*Math.pow(1+lR,n))/(Math.pow(1+lR,n)-1);
  return {
    monthly, totalBuy:monthly*n+p*d, totalRent:r*years,
    propertyValue:p*Math.pow(1+appreciation/100,years),
  };
}

export interface InflationResult { original: number; future: number; presentValue: number; years: number; }

export function calcInflation(amount: number, fromYear: number, toYear: number, rate: number = 3): InflationResult {
  const years = toYear - fromYear, r = rate/100;
  return {
    original:amount, future:amount*Math.pow(1+r,years),
    presentValue:amount/Math.pow(1+r,years), years,
  };
}

export interface ProfitMarginResult { revenue: number; cost: number; profit: number; margin: number; markup: number; }

export function calcProfitMargin(revenue: number, cost: number): ProfitMarginResult | null {
  if (!revenue || !cost) return null;
  const profit = revenue - cost;
  return { revenue, cost, profit, margin:(profit/revenue)*100, markup:(profit/cost)*100 };
}
