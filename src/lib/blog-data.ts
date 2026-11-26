export interface BlogPostImage {
  src: string;
  alt: string;
}

export type BlogCategory = "Visas & money" | "IELTS & PTE" | "Applications" | "Countries";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  quickAnswer: string;
  content: string;
  category: BlogCategory;
  date: string;
  dateISO: string;
  /** The date the figures and links were last checked. */
  checkedDate: string;
  checkedISO: string;
  author: string;
  reviewedBy: string;
  image: BlogPostImage;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "study-in-canada-from-nepal-2026",
    title: "Study in Canada from Nepal in 2026: Steps, Proof of Funds and PAL",
    excerpt:
      "The 2026 steps to a Canadian study permit from Nepal: proof of funds (CAD 23,448 from 1 Sep 2026), PAL, English tests and common mistakes.",
    quickAnswer:
      "Choose a Designated Learning Institution, get a Letter of Acceptance, obtain a PAL/TAL if required, show proof of funds (CAD 23,448 for a single applicant outside Québec from 1 Sep 2026, plus tuition and travel) and apply to IRCC online.",
    category: "Visas & money",
    date: "10 April 2026",
    dateISO: "2026-04-10",
    checkedDate: "2 Nov 2026",
    checkedISO: "2026-11-02",
    author: "Rajesh Poudel",
    reviewedBy: "Rajesh Poudel",
    image: {
      src: "/images/photos/blog-canada-1200.webp",
      alt: "Aerial view of Toronto's waterfront and skyline at sunset",
    },
    content: `
      <h2>Step 1 – Choose a DLI and a programme</h2>
      <p>Only Designated Learning Institutions (DLIs) can host international students. Pick programmes with a clear link to your past study and plans, and check the institution is on the current <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html" target="_blank" rel="noopener noreferrer">DLI list</a>. The course should make sense to a visa officer reading your file for the first time.</p>

      <h2>Step 2 – Take your English test</h2>
      <p>The institution sets the score — often IELTS 6.0–6.5 overall. Book early, because results take time and you need the result before you apply for admission. PTE is accepted by many institutions, but check each course page rather than assuming.</p>

      <h2>Step 3 – Apply and get your Letter of Acceptance</h2>
      <p>Submit transcripts, certificates, your English result and a statement of purpose. Keep the deadlines for the September, January and May intakes in view. Once you meet the conditions and pay the deposit, the institution issues your Letter of Acceptance.</p>

      <h2>Step 4 – Get your PAL/TAL if you need one</h2>
      <p>Most applicants need a Provincial or Territorial Attestation Letter. Master's and PhD students at public institutions are exempt from 1 Jan 2026. Your institution usually requests the letter after you accept the offer; confirm your own case on IRCC.</p>

      <h2>Step 5 – Show your money</h2>
      <p>Show CAD 23,448 for living costs if you are a single applicant outside Québec applying on or after 1 Sep 2026. Add first-year tuition and travel. Each extra family member needs CAD 6,318. Use documents IRCC accepts: bank statements, a GIC, a loan sanction or sponsor documents. If the programme is longer than a year, explain how you will pay the rest.</p>

      <h2>Step 6 – Apply, biometrics and medical</h2>
      <p>Apply online through IRCC. Book biometrics at VFS Kathmandu and use an IRCC panel physician if a medical is requested. The Student Direct Stream closed on 8 Nov 2024, so ignore older guides that still mention it.</p>

      <h2>Three mistakes that cause refusals</h2>
      <ul>
        <li><strong>Unclear funds.</strong> Amounts that don't match the documents, or money that appeared recently without an explanation.</li>
        <li><strong>A study plan that doesn't fit.</strong> A course that has no connection to your past study or your plans.</li>
        <li><strong>Inconsistent documents.</strong> Different dates, names or amounts across your forms, transcripts and bank papers.</li>
      </ul>

      <p>Rules change often. Last checked 2 Nov 2026. <a href="/countries/canada">Read the full Canada guide</a> for the current snapshot, or <a href="/contact">book a free session</a> and we will check your plan against today's rules. We can't guarantee a study permit.</p>

      <h2>Sources</h2>
      <ul>
        <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html" target="_blank" rel="noopener noreferrer">IRCC – Study in Canada</a></li>
        <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/financial-support.html" target="_blank" rel="noopener noreferrer">IRCC – Proof of financial support</a></li>
        <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html" target="_blank" rel="noopener noreferrer">IRCC – Work off campus</a></li>
      </ul>
    `,
  },
  {
    slug: "ielts-tips-for-a-higher-band-score",
    title: "5 IELTS Tips for a Higher Band Score",
    excerpt:
      "Five practical IELTS tips from Reasons Education's lead trainer in Kathmandu: know the format, practise daily, build vocabulary, manage time and get feedback.",
    quickAnswer:
      "Learn the format, practise a little every day, use timed mock tests, build vocabulary in context and get feedback on writing and speaking.",
    category: "IELTS & PTE",
    date: "5 April 2026",
    dateISO: "2026-04-05",
    checkedDate: "2 Nov 2026",
    checkedISO: "2026-11-02",
    author: "Anita Shrestha",
    reviewedBy: "Anita Shrestha",
    image: {
      src: "/images/photos/blog-ielts-1200.webp",
      alt: "Hand writing IELTS practice notes at a study desk",
    },
    content: `
      <h2>1. Know the format</h2>
      <p>There are four modules: Listening, Reading, Writing and Speaking. Writing has Task 1, where you describe data, and Task 2, where you write an essay. Listening is played once. Knowing what each section asks of you removes surprises on test day.</p>

      <h2>2. Practise daily with a plan</h2>
      <p>A little every day beats a long session once a week. Work on your weakest module first, and use official practice material rather than random online tests. Keep a simple record of what you did and what you got wrong.</p>

      <h2>3. Build vocabulary in context</h2>
      <p>Read news, reports and essays and note how words are used in a sentence. Learn phrases, not isolated lists. In Writing and Speaking, accurate use of a smaller range of words scores better than a memorised list used badly.</p>

      <h2>4. Manage your time</h2>
      <p>In Writing, try about 20 minutes for Task 1 and 40 for Task 2, leaving a few minutes to check. In Reading, practise skimming for the main idea and scanning for specific details. Use timed mock tests so the clock is not new on the day.</p>

      <h2>5. Get feedback</h2>
      <p>You cannot hear your own writing the way an examiner reads it. A trainer can spot repeated grammar patterns, weak task response and speaking habits you have stopped noticing. Our classes include written feedback and a timed mock test.</p>

      <h2>A note on Speaking</h2>
      <p>Speak naturally. You can ask the examiner to repeat a question if you did not understand it. Memorised answers usually sound memorised, so practise talking about your own study, work and plans instead.</p>

      <p>Class details and fees are on the <a href="/ielts">IELTS &amp; PTE page</a>. The exam fee is paid to the test provider and is separate from the class fee. Last checked 2 Nov 2026.</p>
    `,
  },
  {
    slug: "visa-sop-writing-guide-nepal",
    title: "How to Write a Statement of Purpose for a Student Visa (Nepal)",
    excerpt:
      "A clear structure for your SOP: your background, why this course and country, how you'll pay, and your plans in Nepal. Written in your own words.",
    quickAnswer:
      "A good SOP explains your past study, why this course and country, how you'll pay, and what you'll do next. It is written in your own voice and matches the rest of your file.",
    category: "Applications",
    date: "28 March 2026",
    dateISO: "2026-03-28",
    checkedDate: "2 Nov 2026",
    checkedISO: "2026-11-02",
    author: "Rajesh Poudel",
    reviewedBy: "Rajesh Poudel",
    image: {
      src: "/images/photos/blog-sop-1200.webp",
      alt: "Writing a statement of purpose at a desk",
    },
    content: `
      <h2>1. Be yourself</h2>
      <p>Write in your own words. Templates are easy to spot, and a statement that could belong to anyone says nothing about you. You do not need dramatic language; you need clear, specific reasons.</p>

      <h2>2. Connect the dots</h2>
      <p>Show how this course follows from your past study or work. If you are changing field, explain what led to the change and what you have already done to prepare. A reader should be able to follow the line from then to now to next.</p>

      <h2>3. Be specific about the course and the place</h2>
      <p>Name modules, facilities or teaching approaches you will use, and say why that country is the right place for this subject. Avoid generic lines about “global exposure” that could be copied into any application.</p>

      <h2>4. Explain gaps or weak points honestly</h2>
      <p>If you have an academic gap, a low semester or a previous refusal, address it briefly and factually. Say what happened and what you did next. Hiding it does not make it disappear from your documents.</p>

      <h2>5. Show your plan, including your future in Nepal</h2>
      <p>Name realistic roles, sectors or further study you are aiming for, and how this qualification connects to them. Be careful not to promise a job you cannot know you will get.</p>

      <h2>6. Check consistency</h2>
      <p>Dates, amounts, course names and institution names must match your transcripts, offer letter and financial documents. Read the whole file together before you submit, not each document on its own.</p>

      <p><strong>Our role:</strong> we review and coach. We do not write the statement for you — it has to be yours. If you want help with the rest of the application, see our <a href="/services">application support</a>. Last checked 2 Nov 2026.</p>
    `,
  },
];

export const blogCategories: BlogCategory[] = [
  "Visas & money",
  "IELTS & PTE",
  "Applications",
  "Countries",
];
