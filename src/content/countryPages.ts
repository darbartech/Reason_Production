export interface CountrySnapshotRow {
  label: string;
  value: string;
}

export interface CountryFaq {
  q: string;
  a: string;
}

export interface CountrySource {
  label: string;
  url: string;
}

export interface CountryPageData {
  slug: string;
  country: string;
  title: string;
  description: string;
  h1: string;
  overview: string;
  quickAnswer: string;
  snapshot: CountrySnapshotRow[];
  suits: string[];
  thinkTwice: string;
  requirements: string[];
  visaSteps: string[];
  moneyTitle: string;
  moneyParagraphs: string[];
  refusalReasons: string[];
  faqs: CountryFaq[];
  sources: CountrySource[];
  /** Two nearby destinations to compare. */
  related: string[];
  note?: string;
  photo: string;
  photoAlt: string;
}

const TUITION_SET_BY_INSTITUTION =
  "Set by each institution and course. Ask us for a written cost estimate for your shortlist.";

export const countryPages: Record<string, CountryPageData> = {
  usa: {
    slug: "usa",
    country: "USA",
    title: "Study in the USA from Nepal: Costs & F-1 Visa (2026)",
    description:
      "F-1 visa steps, I-20, SEVIS and the fixed stay period from 15 Sep 2026 for Nepali students. Costs, intakes and English tests.",
    h1: "Study in the USA from Nepal: costs, intakes and visa steps",
    overview:
      "The USA offers a very wide choice of courses, and some universities give scholarships and assistantships. Visa rules and fees have been changing, so check each item's date.",
    quickAnswer:
      "You apply for an F-1 visa after a SEVP-approved school issues your Form I-20. You pay the SEVIS fee, complete the DS-160, and attend an interview at the US Embassy in Kathmandu. Since 15 Sep 2026 — unless a court has paused it, so check — F-1 students are admitted until a fixed date matching the programme length (up to 4 years, plus a 30-day grace period) instead of “duration of status”.",
    snapshot: [
      { label: "Typical tuition per year", value: TUITION_SET_BY_INSTITUTION },
      {
        label: "Proof of funds",
        value:
          "The I-20 shows the school's estimated total cost for year one, and you must show you can pay it (SEVP / US Embassy).",
      },
      { label: "Main intakes", value: "August (Fall) · January (Spring)" },
      {
        label: "Work while studying",
        value:
          "On-campus work up to 20 hours a week in term (confirm on Study in the States). Off-campus work only through CPT or OPT.",
      },
      {
        label: "After you graduate",
        value: "OPT, with a 24-month STEM extension for eligible degrees.",
      },
      {
        label: "English tests",
        value:
          "IELTS, TOEFL, PTE or Duolingo, depending on the university. Each institution sets its own score.",
      },
    ],
    suits: [
      "Students with a clear course and a funded first year",
      "Students who want research-focused or STEM programmes",
    ],
    thinkTwice:
      "your funds are thin, your finances can't be shown clearly, or you can't explain how the course fits your plans.",
    requirements: [
      "Admission and Form I-20 from a SEVP-approved school",
      "English test — and SAT/ACT or GRE/GMAT where the programme asks",
      "SEVIS fee payment and receipt",
      "DS-160 confirmation page and appointment",
      "Passport valid for the required period",
      "Proof of funds and sponsor documents",
      "Transcripts and a study plan you can explain",
    ],
    visaSteps: [
      "Shortlist SEVP-approved schools",
      "Take English and any required tests",
      "Apply; receive admission and the I-20",
      "Pay the SEVIS fee; complete the DS-160",
      "Pay the visa fee and book an appointment in Kathmandu",
      "Attend the interview",
      "Decision and pre-departure briefing",
    ],
    moneyTitle: "Know your fixed stay",
    moneyParagraphs: [
      "Your admit-until date follows your programme length. If you need longer, you apply for an extension with USCIS (Form I-539). Plan your course length realistically.",
      "Fees: the SEVIS fee is US$350 and the visa fee is US$185. A US$250 visa integrity fee was enacted in 2025 — confirm whether and when it applies to F-1 on travel.state.gov.",
    ],
    refusalReasons: [
      "Not showing strong ties and clear plans (Section 214(b))",
      "Funds that can't be traced or explained",
      "Answers at interview that don't match the file",
    ],
    faqs: [
      {
        q: "What is the I-20?",
        a: "The Form I-20 is issued by a SEVP-approved school. You need it to pay the SEVIS fee and apply for the F-1 visa.",
      },
      {
        q: "What changed on 15 Sep 2026?",
        a: "The “duration of status” rule was replaced with a fixed admission period — your programme length, up to 4 years — plus a 30-day grace period. Check Study in the States for the latest, including any court decisions.",
      },
      {
        q: "Are scholarships available to Nepali students?",
        a: "Some universities give merit awards and graduate assistantships. Check each university's page; we help you find ones you can apply for.",
      },
      {
        q: "How long is the interview wait?",
        a: "It varies by season. Check appointment availability on the US travel site and book as early as your I-20 allows.",
      },
    ],
    sources: [
      {
        label: "travel.state.gov – Student visa",
        url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
      },
      { label: "Study in the States (DHS)", url: "https://studyinthestates.dhs.gov/" },
      { label: "US Embassy Nepal – Visas", url: "https://np.usembassy.gov/visas/" },
    ],
    related: ["canada", "uk"],
    photo: "dest-usa",
    photoAlt: "A university campus in the United States",
  },

  canada: {
    slug: "canada",
    country: "Canada",
    title: "Study in Canada from Nepal: Costs & Visa (2026)",
    description:
      "Canada study permit proof of funds is CAD 23,448 from 1 Sep 2026. Intakes, English tests, PAL and visa steps for Nepali students.",
    h1: "Study in Canada from Nepal: costs, intakes and visa steps",
    overview:
      "Canada offers public colleges and universities, multicultural cities and a post-graduation work permit for eligible graduates. Rules changed a lot in 2024–2026, so check the dates.",
    quickAnswer:
      "To apply for a Canadian study permit from Nepal you need an acceptance letter from a Designated Learning Institution (DLI), a Provincial or Territorial Attestation Letter (PAL/TAL) in most cases, and proof of funds. From 1 Sep 2026, a single applicant outside Québec must show CAD 23,448 for living costs, plus first-year tuition and travel.",
    snapshot: [
      { label: "Typical tuition per year", value: TUITION_SET_BY_INSTITUTION },
      {
        label: "Proof of funds",
        value:
          "CAD 23,448 for living costs, single applicant outside Québec, applications on or after 1 Sep 2026. Each extra family member: CAD 6,318. Plus first-year tuition and travel. Source: IRCC.",
      },
      { label: "Main intakes", value: "September (largest) · January · May" },
      {
        label: "Work while studying",
        value:
          "Up to 24 hours a week off campus during term; full-time in scheduled breaks (IRCC).",
      },
      {
        label: "After you graduate",
        value:
          "Post-Graduation Work Permit (PGWP) if the programme and institution qualify. Language: CLB 7 for a degree, CLB 5 for a diploma.",
      },
      {
        label: "English tests",
        value:
          "IELTS or PTE for admission. Each institution sets the score; often IELTS 6.0–6.5 overall.",
      },
    ],
    suits: [
      "Students with a clear course and a funded first year",
      "Students who accept that work and PR rules change often",
    ],
    thinkTwice:
      "you can't show the full funds, your course doesn't match your past study, or you rely on part-time work to pay tuition.",
    requirements: [
      "Letter of Acceptance from a DLI",
      "PAL/TAL for most applicants — master's and PhD students at public institutions are exempt from 1 Jan 2026 (confirm on IRCC)",
      "English test result at the institution's minimum",
      "Proof of funds covering the current figure, tuition and travel",
      "Passport, transcripts and a statement of purpose",
      "Police certificate and medical exam, when requested",
      "Biometrics — fingerprints and photo",
    ],
    visaSteps: [
      "Shortlist DLI programmes that fit your results and budget",
      "Take your English test",
      "Apply and receive the Letter of Acceptance",
      "Obtain the PAL/TAL — the institution usually requests it",
      "Pay the deposit and gather proof of funds",
      "Apply online to IRCC; give biometrics; complete the medical if asked",
      "Decision, then pre-departure briefing",
    ],
    moneyTitle: "Show funds you can explain",
    moneyParagraphs: [
      "Show the amount above plus first-year tuition and travel, in documents IRCC accepts — bank statements, a GIC, a loan sanction or sponsor documents. If your programme is longer than a year, explain how you will pay the rest.",
      "Fees: the study permit is CAD 150 and biometrics CAD 85 (IRCC). The Student Direct Stream closed on 8 Nov 2024 — ignore guides that still mention it.",
    ],
    refusalReasons: [
      "Funds not shown clearly, or documents that don't match",
      "A study plan that doesn't fit your background or career plan",
      "Missing or inconsistent documents",
    ],
    faqs: [
      {
        q: "Can I work while studying in Canada?",
        a: "Yes. Up to 24 hours a week off campus during term, and full-time during scheduled breaks, if you meet IRCC conditions.",
      },
      {
        q: "Do I need a PAL?",
        a: "Most applicants do. Master's and PhD students at public institutions are exempt from 1 Jan 2026. Your institution tells you which applies.",
      },
      {
        q: "How much money must I show?",
        a: "CAD 23,448 for living costs for a single applicant outside Québec (from 1 Sep 2026), plus first-year tuition and travel.",
      },
      {
        q: "Is the SDS still available?",
        a: "No. The Student Direct Stream closed on 8 Nov 2024.",
      },
    ],
    sources: [
      {
        label: "IRCC – Study in Canada",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
      },
      {
        label: "IRCC – Proof of financial support",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/financial-support.html",
      },
      {
        label: "IRCC – Work off campus",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html",
      },
      {
        label: "Designated Learning Institutions list",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html",
      },
    ],
    related: ["usa", "australia"],
    photo: "dest-canada",
    photoAlt: "Aerial view of Toronto's waterfront and skyline at sunset, Canada",
  },

  uk: {
    slug: "uk",
    country: "United Kingdom",
    title: "Study in the UK from Nepal: Costs & Visa (2026)",
    description:
      "UK Student visa funds rise to £1,570/month in London from 30 Nov 2026. Intakes, English tests, CAS and Graduate route changes for Nepali students.",
    h1: "Study in the UK from Nepal: costs, intakes and visa steps",
    overview:
      "The UK has shorter degrees — most master's courses take one year — and a long-established university sector. Rules on funds and post-study work are changing, so read the dates.",
    quickAnswer:
      "Apply for a UK Student visa after you hold a Confirmation of Acceptance for Studies (CAS). You must show tuition plus living costs held for 28 days. For applications from 30 Nov 2026 that is £1,570 per month in London and £1,203 elsewhere, for up to 9 months.",
    snapshot: [
      {
        label: "Typical tuition per year",
        value:
          "Set by each university and course. One-year master's courses are common. Ask us for a written estimate for your shortlist.",
      },
      {
        label: "Proof of funds",
        value:
          "Applications until 29 Nov 2026: £1,529/month in London, £1,171 elsewhere, up to 9 months. From 30 Nov 2026: £1,570 and £1,203, up to 9 months. Plus first-year tuition, less any amount already paid. The application date decides. Source: gov.uk.",
      },
      { label: "Main intakes", value: "September · January" },
      {
        label: "Work while studying",
        value:
          "Limited hours in term, set by your visa. Check gov.uk; typically 20 hours a week at degree level.",
      },
      {
        label: "After you graduate",
        value:
          "Graduate route: 2 years now, 3 for a PhD. For bachelor's and master's applications from 1 Jan 2027 it is 18 months. The 28 Oct 2026 Budget announced 2 years for graduates of “high-compliance” universities; criteria and start date are not yet published.",
      },
      {
        label: "English tests",
        value:
          "IELTS or PTE; some courses need a UKVI-approved test. The university sets the score.",
      },
    ],
    suits: [
      "Students who want a shorter, focused degree",
      "Students who can show funds held for 28 days",
    ],
    thinkTwice:
      "you rely on post-study work to repay costs — the rules are changing and the outcome is uncertain.",
    requirements: [
      "Offer from a UKVI-licensed sponsor and a CAS",
      "English test at the university's score; UKVI-approved where required",
      "Proof of funds: tuition plus maintenance, held for 28 days",
      "Passport, transcripts and a statement of purpose",
      "TB test from an approved clinic in Nepal",
      "Immigration Health Surcharge, paid in the application",
      "Identity check with the UKVI ID Check app and biometrics",
    ],
    visaSteps: [
      "Choose a course at a UKVI-licensed institution",
      "Take your English test",
      "Apply to the university and receive an offer",
      "Meet conditions, pay the deposit and request your CAS",
      "Apply for the Student visa online and pay the IHS",
      "Verify identity and give biometrics",
      "Decision. Your immigration status is held online as an eVisa, not as a BRP card",
    ],
    moneyTitle: "Plan around the 30 Nov 2026 date",
    moneyParagraphs: [
      "The funds figure depends on the date you apply, not your CAS date. Ask us which applies to you. Funds must normally be held for 28 consecutive days.",
      "Your immigration status is held online as an eVisa; BRP cards are being replaced. Check gov.uk before you travel.",
    ],
    refusalReasons: [
      "Funds not held for the full 28 days, or documents in the wrong format",
      "A study plan or progression that doesn't make sense",
      "A missing TB certificate, or one from an unapproved clinic",
    ],
    faqs: [
      {
        q: "What is a CAS?",
        a: "A reference number your university issues once you meet its conditions. You need it to apply for the Student visa.",
      },
      {
        q: "How long can I stay after graduating?",
        a: "Currently 2 years on the Graduate route, or 3 for a PhD. For applications from 1 Jan 2027 it is 18 months for bachelor's and master's graduates, though the government has announced 2 years for graduates of some universities. Check gov.uk.",
      },
      {
        q: "Is the BRP still issued?",
        a: "No. BRPs are being replaced by eVisas. You verify identity with the UKVI ID Check app.",
      },
      {
        q: "How much money do I need?",
        a: "First-year tuition plus £1,570 per month in London or £1,203 elsewhere, up to 9 months, for applications from 30 Nov 2026. Before that date: £1,529 and £1,171.",
      },
    ],
    sources: [
      { label: "gov.uk – Student visa", url: "https://www.gov.uk/student-visa" },
      { label: "gov.uk – Money you need", url: "https://www.gov.uk/student-visa/money-you-need" },
      { label: "gov.uk – Graduate visa", url: "https://www.gov.uk/graduate-visa" },
      { label: "British Council Nepal", url: "https://www.britishcouncil.org.np/" },
    ],
    note:
      "The lower figures of £1,529 in London and £1,171 elsewhere apply to applications made until 29 Nov 2026. From 30 Nov 2026 the higher figures apply.",
    related: ["germany", "canada"],
    photo: "dest-uk",
    photoAlt: "A historic university building in the United Kingdom",
  },

  australia: {
    slug: "australia",
    country: "Australia",
    title: "Study in Australia from Nepal: Costs & Visa (2026)",
    description:
      "Australia Student visa 500: AUD 29,710 living costs, AUD 2,000 fee, Genuine Student rule and intakes for Nepali students. Free counselling.",
    h1: "Study in Australia from Nepal: costs, intakes and visa steps",
    overview:
      "Australia has a large university sector with campuses in cities and regions. Student numbers are managed through a planning level, so apply early and choose a provider carefully.",
    quickAnswer:
      "You apply for a Student visa (subclass 500) after receiving a Confirmation of Enrolment (CoE). You must meet the Genuine Student requirement, show AUD 29,710 for 12 months of living costs plus tuition and travel, and hold health cover (OSHC).",
    snapshot: [
      { label: "Typical tuition per year", value: TUITION_SET_BY_INSTITUTION },
      {
        label: "Proof of funds",
        value:
          "AUD 29,710 for 12 months of living costs (since 10 May 2024), plus first-year tuition and travel. Partner AUD 10,394; child AUD 4,449; school-age child AUD 13,502. Source: Home Affairs.",
      },
      { label: "Main intakes", value: "February · July (also October at some providers)" },
      {
        label: "Work while studying",
        value:
          "Limited hours during term and more in breaks. Confirm the current cap on Home Affairs before you rely on it.",
      },
      {
        label: "After you graduate",
        value:
          "Temporary Graduate visa (subclass 485). Duration and age limits apply.",
      },
      {
        label: "English tests",
        value:
          "IELTS or PTE. The result must be dated within 12 months of applying.",
      },
    ],
    suits: [
      "Students with a genuine, well-explained study plan",
      "Students comfortable with a higher cost of living",
    ],
    thinkTwice:
      "your plan changes course or level without a clear reason, or your funds can't be shown for 12 months.",
    requirements: [
      "Offer and CoE from a CRICOS-registered provider",
      "Genuine Student statement",
      "English test result",
      "Proof of funds: living costs, tuition and travel",
      "OSHC health cover for the visa period",
      "Passport, transcripts and a statement of purpose",
      "Health and character checks when requested",
    ],
    visaSteps: [
      "Choose a course at a CRICOS-registered provider",
      "Take your English test",
      "Apply and receive a Letter of Offer",
      "Accept; pay the deposit and OSHC",
      "Receive the CoE",
      "Apply for the subclass 500 online, with your GS statement and funds",
      "Complete health checks if requested; decision",
    ],
    moneyTitle: "The Genuine Student statement matters",
    moneyParagraphs: [
      "Genuine Student replaced the old GTE statement for applications from 23 Mar 2024. Explain your reasons for this course, this provider and Australia, in your own words, consistent with your past study and work.",
      "Fees: the visa application charge is AUD 2,000 — confirm the current amount on Home Affairs. OSHC is compulsory for the visa period. The 2026 planning level is 295,000 new student places; providers closer to their limits may be slower, so apply early.",
    ],
    refusalReasons: [
      "A study plan that doesn't match your background or plans",
      "Funds that can't be traced or explained",
      "Inconsistent answers across the application",
    ],
    faqs: [
      {
        q: "What is the Genuine Student requirement?",
        a: "It is an assessment of whether you are coming to Australia for a genuine course of study. It replaced the GTE statement from 23 Mar 2024.",
      },
      {
        q: "Can I stay after graduation?",
        a: "You may be able to apply for a Temporary Graduate visa (subclass 485). Duration and age limits apply; check Home Affairs.",
      },
      {
        q: "What is OSHC?",
        a: "Overseas Student Health Cover is compulsory health insurance for student visa holders.",
      },
      {
        q: "Why do processing times differ by university?",
        a: "The government uses a planning level and priority tiers. Ask us how your shortlist providers are placed.",
      },
    ],
    sources: [
      {
        label: "Home Affairs – Student visa (500)",
        url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
      },
      {
        label: "Genuine Student requirement",
        url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-student-requirement",
      },
      { label: "Study Australia", url: "https://www.studyaustralia.gov.au/" },
    ],
    related: ["new-zealand", "canada"],
    photo: "dest-australia",
    photoAlt: "A city skyline and harbour in Australia",
  },

  "new-zealand": {
    slug: "new-zealand",
    country: "New Zealand",
    title: "Study in New Zealand from Nepal: Costs & Visa (2026)",
    description:
      "New Zealand student visa: NZ$20,000 living costs, 25 hours work a week, post-study work and intakes for Nepali students. Free counselling.",
    h1: "Study in New Zealand from Nepal: costs, intakes and visa steps",
    overview:
      "New Zealand has a smaller university sector with structured student support. Rules on work and post-study visas changed from November 2025.",
    quickAnswer:
      "Apply for a fee-paying student visa after you hold an Offer of Place and have paid the fees. You must show NZ$20,000 per year for living costs for courses of a year or more. Since 3 Nov 2025, students can work up to 25 hours a week in term.",
    snapshot: [
      { label: "Typical tuition per year", value: TUITION_SET_BY_INSTITUTION },
      {
        label: "Proof of funds",
        value: "NZ$20,000 per year for living costs, plus tuition (Immigration NZ).",
      },
      {
        label: "Main intakes",
        value: "February · July",
      },
      {
        label: "Work while studying",
        value:
          "Up to 25 hours a week in term from 3 Nov 2025; full-time in scheduled breaks for qualifying courses.",
      },
      {
        label: "After you graduate",
        value:
          "Post-Study Work visa. Level 7+ qualifications make it easier to qualify.",
      },
      {
        label: "English tests",
        value: "IELTS or PTE. Each institution sets its own score.",
      },
    ],
    suits: [
      "Students who prefer smaller cities and campus support",
      "Students targeting Level 7+ qualifications",
    ],
    thinkTwice:
      "you plan to rely on work hours to cover costs, or you may switch provider or level — a new visa is often needed.",
    requirements: [
      "Offer of Place from an approved provider",
      "English test result",
      "Proof of tuition payment and living costs",
      "Passport, transcripts and a statement of purpose",
      "Medical and police certificates when requested",
      "Biometrics",
    ],
    visaSteps: [
      "Choose a course and provider",
      "Take your English test",
      "Apply and receive an Offer of Place",
      "Pay tuition fees, or arrange a deposit as required",
      "Prepare your financial documents",
      "Apply online; complete the medical and biometrics",
      "Decision and pre-departure briefing",
    ],
    moneyTitle: "Switching provider usually means a new visa",
    moneyParagraphs: [
      "Switching provider or lowering your study level usually needs a new student visa. Plan your course choice before you apply, not after you arrive.",
      "Check the current visa fee and work conditions on Immigration NZ before you budget; both change. Existing visa holders may need to apply for a variation to use the 25-hour rule.",
    ],
    refusalReasons: [
      "Funds that don't match the plan in your application",
      "A late application close to the start date",
      "Inconsistent documents or a study plan that doesn't explain your choices",
    ],
    faqs: [
      {
        q: "What are the work rights?",
        a: "Up to 25 hours a week during term from 3 Nov 2025, and full-time during scheduled breaks for qualifying courses. Existing visa holders may need to apply for a variation.",
      },
      {
        q: "Is there a post-study work visa?",
        a: "Yes. Level 7+ qualifications make it easier to qualify; conditions apply.",
      },
      {
        q: "How much is the cost of living?",
        a: "Immigration New Zealand asks you to show NZ$20,000 per year for courses of a year or more.",
      },
      {
        q: "Can I change my course after arriving?",
        a: "It depends on the change. It can affect your visa, so talk to us before you switch.",
      },
    ],
    sources: [
      { label: "Immigration NZ – Study", url: "https://www.immigration.govt.nz/study/" },
      {
        label: "Working on a student visa",
        url: "https://www.immigration.govt.nz/study/once-you-have-a-student-visa/working-on-a-student-visa/",
      },
    ],
    related: ["australia", "uk"],
    photo: "dest-new-zealand",
    photoAlt: "A lake and mountains in New Zealand",
  },

  germany: {
    slug: "germany",
    country: "Germany",
    title: "Study in Germany from Nepal: Costs & Visa (2026)",
    description:
      "Germany student visa: €11,904 blocked account, Type D visa steps, language and English requirements for Nepali students. Free counselling in Kathmandu.",
    h1: "Study in Germany from Nepal: costs, intakes and visa steps",
    overview:
      "Many German public universities charge little or no tuition, but you must show living costs in a blocked account and meet language or English requirements.",
    quickAnswer:
      "You apply for a national (Type D) student visa, not a Schengen tourist visa. For 2026 you must show €11,904 for 12 months — €992 per month — normally in a blocked account.",
    snapshot: [
      {
        label: "Typical tuition per year",
        value:
          "Mostly none or low at public universities, plus a semester contribution. Some states charge non-EU students, so check the state (DAAD).",
      },
      {
        label: "Proof of funds",
        value:
          "€11,904 per year (€992 per month) for 2026, normally in a blocked account (German Federal Foreign Office).",
      },
      { label: "Main intakes", value: "October (winter) · April (summer)" },
      {
        label: "Work while studying",
        value:
          "Limited days or hours per year for non-EU students. Confirm the current rule before you rely on it.",
      },
      {
        label: "After you graduate",
        value: "Up to 18 months to look for work in your field.",
      },
      {
        label: "English tests",
        value:
          "German-taught courses usually need B2 or higher. English-taught courses use IELTS or TOEFL, and the university sets the score.",
      },
    ],
    suits: [
      "Students who want low-tuition public universities",
      "Students who can study in German or find an English-taught programme — and can plan 12+ months ahead",
    ],
    thinkTwice:
      "you need to start within a few months, or you cannot meet the language requirement.",
    requirements: [
      "Admission letter, through uni-assist or the university",
      "Proof of language: German or English",
      "Blocked account confirmation",
      "Health insurance",
      "Passport, certified transcripts, CV and motivation letter — confirm any extra verification for Nepali documents",
      "National visa application and interview at the German embassy",
    ],
    visaSteps: [
      "Choose a programme and check the language route",
      "Prepare transcripts and certificates",
      "Apply to the university",
      "Receive admission",
      "Open the blocked account and arrange health insurance",
      "Apply for the national visa",
      "After arrival: register your address, then apply for a residence permit",
    ],
    moneyTitle: "A blocked account, not a tourist visa",
    moneyParagraphs: [
      "The blocked account is how you show you can pay living costs. The 2026 figure is €11,904 for 12 months. Check the German mission's current document list before you pay anything.",
      "For degree study you apply for a national Type D visa and then a residence permit. A 90-day Schengen tourist visa is not for study. Some states charge non-EU students tuition, so check the state as well as the university.",
    ],
    refusalReasons: [
      "Applying for a Schengen tourist visa instead of a national student visa",
      "A language level below the course requirement",
      "A blocked account or insurance that doesn't meet the required form",
    ],
    faqs: [
      {
        q: "Do I need a Schengen visa?",
        a: "No. For degree study you apply for a national Type D visa and then a residence permit.",
      },
      {
        q: "Is study free in Germany?",
        a: "Many public universities charge no tuition, but you pay a semester contribution, and some states charge non-EU students. Living costs still apply.",
      },
      {
        q: "How much do I need in the blocked account?",
        a: "€11,904 for 12 months — €992 per month — in 2026.",
      },
      {
        q: "Can I work while studying?",
        a: "Non-EU students can work a limited number of days or hours per year. Confirm the current rule with the German mission or your university before you rely on it.",
      },
    ],
    sources: [
      { label: "Federal Foreign Office – Study visa", url: "https://www.auswaertiges-amt.de/en" },
      { label: "DAAD – Study in Germany", url: "https://www.daad.de/en/" },
      { label: "uni-assist", url: "https://www.uni-assist.de/en/" },
    ],
    related: ["uk", "japan"],
    photo: "dest-europe",
    photoAlt: "A European city street with historic university buildings",
  },

  japan: {
    slug: "japan",
    country: "Japan",
    title: "Study in Japan from Nepal: Costs & Visa (2026)",
    description:
      "Japan student visa: Certificate of Eligibility, language requirements, work limits and intakes for Nepali students. Free counselling in Kathmandu.",
    h1: "Study in Japan from Nepal: costs, intakes and visa steps",
    overview:
      "Japan has universities, vocational colleges and Japanese-language schools. Many students start with a language course, and entry rules differ by pathway.",
    quickAnswer:
      "Your school applies for a Certificate of Eligibility (COE) in Japan. With the COE you apply for the student visa at the embassy. Tuition and proof-of-funds figures depend on the school, so ask for them in writing before you commit.",
    snapshot: [
      {
        label: "Typical tuition per year",
        value:
          "Set by your school. Ask for the current tuition and fees in writing.",
      },
      {
        label: "Proof of funds",
        value:
          "Set by the school and Japan's immigration rules. Ask for the current figure in writing.",
      },
      { label: "Main intakes", value: "April · October (some schools also January and July)" },
      {
        label: "Work while studying",
        value:
          "Up to 28 hours a week with permission, and up to 40 hours during long breaks. Confirm with your school and the Immigration Services Agency.",
      },
      {
        label: "After you graduate",
        value: "It depends on your status and job offer; rules vary.",
      },
      {
        label: "English tests",
        value:
          "Usually a Japanese test such as JLPT or NAT-TEST for language schools. Some universities use EJU or JLPT. Each school sets its own requirement.",
      },
    ],
    suits: [
      "Students who want to start with a Japanese-language course",
      "Students who are ready to prepare language tests before applying",
    ],
    thinkTwice:
      "you need an English-taught degree route, or you cannot show funds in the form the school asks for.",
    requirements: [
      "Admission to a Japanese school or university",
      "COE — the school applies on your behalf",
      "Passport and visa application",
      "Proof of funds at the school's current requirement",
      "Academic transcripts and certificates",
      "Japanese language proof where required",
    ],
    visaSteps: [
      "Choose a school and pathway: language school, vocational college or university",
      "Prepare Japanese language study and tests",
      "Apply for admission",
      "Take EJU or JLPT where the course requires it",
      "The school applies for the COE",
      "Apply for the visa with the COE",
      "After arrival: collect your Residence Card at the airport and register your address",
    ],
    moneyTitle: "Ask for the school's own cost sheet",
    moneyParagraphs: [
      "The school applies for your COE and sets the financial documents it wants. Ask for the current cost sheet and the proof-of-funds requirement before you pay an agent or a school.",
      "Our old page quoted monthly living costs and a tuition range that we could not confirm against an official source. We removed them rather than publish figures we can't date and link.",
    ],
    refusalReasons: [
      "A study plan or language level that doesn't match the course",
      "Funds or sponsor documents that can't be explained",
      "Inconsistent documents across the COE and visa application",
    ],
    faqs: [
      {
        q: "What is the COE?",
        a: "The Certificate of Eligibility is issued by Japan's Immigration Services Agency, usually applied for by your school. It speeds up your visa application.",
      },
      {
        q: "Can I work?",
        a: "Yes, with permission: up to 28 hours a week in term, and up to 40 hours during long breaks.",
      },
      {
        q: "What is the EJU?",
        a: "A standard test some Japanese universities use for international applicants.",
      },
      {
        q: "Did the rules change in 2026?",
        a: "Reports mention tighter document and financial checks. We confirm the current list with your school before you apply.",
      },
    ],
    sources: [
      { label: "JASSO – Study in Japan", url: "https://www.studyinjapan.go.jp/en/" },
      { label: "MOFA – Visa information", url: "https://www.mofa.go.jp/j_info/visit/visa/index.html" },
      { label: "Immigration Services Agency of Japan", url: "https://www.moj.go.jp/isa/" },
    ],
    related: ["germany", "australia"],
    photo: "dest-japan",
    photoAlt: "A Japanese street with traditional and modern buildings",
  },
};
