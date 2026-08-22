export interface NavItem {
  titleKey: string;
  href?: string;
  children?: NavItem[];
  external?: boolean;
}

/**
 * Main navigation items — used by Header.
 * \`titleKey\` maps to messages/[locale].json via \`nav.*\` or \`subjects.*\` etc.
 */
export const mainNav: NavItem[] = [
  { titleKey: 'nav.howItWorks', href: '/how-it-works' },
  { titleKey: 'nav.pricing', href: '/pricing' },
  {
    titleKey: 'nav.subjects',
    children: [
      { titleKey: 'subjects.mathsTutoring', href: '/subjects/maths-tutoring' },
      { titleKey: 'subjects.englishTutoring', href: '/subjects/english-tutoring' },
      {
        titleKey: 'subjects.scienceTutoring',
        children: [
          { titleKey: 'subjects.scienceCombined', href: '/subjects/science-tutoring' },
          { titleKey: 'subjects.physicsTutoring', href: '/subjects/physics-tutoring' },
          { titleKey: 'subjects.chemistryTutoring', href: '/subjects/chemistry-tutoring' },
          { titleKey: 'subjects.biologyTutoring', href: '/subjects/biology-tutoring' },
        ],
      },
      { titleKey: 'subjects.arabicTutoring', href: '/subjects/arabic-tutoring' },
      { titleKey: 'subjects.examPreparation', href: '/exam-preparation' },
      { titleKey: 'subjects.allSubjects', href: '/subjects' },
    ],
  },
  {
    titleKey: 'nav.levels',
    children: [
      { titleKey: 'levels.primaryTutors', href: '/levels/primary-tutors' },
      {
        titleKey: 'levels.secondaryTutors',
        children: [
          { titleKey: 'levels.ks3Tutors', href: '/levels/secondary-tutors/ks3' },
          { titleKey: 'levels.gcseTutors', href: '/levels/secondary-tutors/gcse' },
          { titleKey: 'levels.igcseTutors', href: '/levels/secondary-tutors/igcse' },
          { titleKey: 'levels.aLevelTutors', href: '/levels/secondary-tutors/a-level' },
        ],
      },
      {
        titleKey: 'levels.universities',
        children: [
          { titleKey: 'levels.universityAdmissions', href: '/university-admissions' },
          // { titleKey: 'levels.admissionsAbroad', href: '/admissions-abroad' },
        ],
      },
    ],
  },
  {
    titleKey: 'nav.activities',
    children: [
      { titleKey: 'nav.martialArts', href: '/activities/martial-arts' },
      { titleKey: 'nav.music', href: '/activities/music' },
      { titleKey: 'nav.chess', href: '/activities/chess' },
      { titleKey: 'nav.football', href: '/activities/football' },
    ],
  },
  {
    titleKey: 'nav.about',
    children: [
      { titleKey: 'about.forParents', href: '/parents' },
      { titleKey: 'about.aboutUs', href: '/about' },
      { titleKey: 'about.safetyAndTrust', href: '/safety-and-trust' },
      { titleKey: 'about.allFaqs', href: '/faqs' },
    ],
  },
  { titleKey: 'nav.becomeATutor', href: '/become-a-tutor' },
];

/**
 * Footer Top Navigation (Right Side)
 */
export const footerTopNav: { titleKey: string; items: NavItem[] }[] = [
  {
    titleKey: 'footer.helloTutor',
    items: [
      { titleKey: 'about.aboutUs', href: '/about' },
      { titleKey: 'nav.contact', href: '/contact' },
      { titleKey: 'footer.parentsFaqs', href: '/faqs?tab=parents' },
      { titleKey: 'nav.howItWorks', href: '/how-it-works' },
      { titleKey: 'subjects.allSubjects', href: '/subjects' },
    ],
  },
  {
    titleKey: 'footer.resources',
    items: [
      { titleKey: 'nav.forSchools', href: '/for-schools' },
      { titleKey: 'footer.safeguarding', href: '/safeguarding' },
      { titleKey: 'footer.tutorsInDubai', href: '/tutors-in-dubai' },
      { titleKey: 'footer.tutorsInAbuDhabi', href: '/tutors-in-abu-dhabi' },
      { titleKey: 'footer.tutorsInSharjah', href: '/tutors-in-sharjah' },
    ],
  },
];

/**
 * Footer Bottom Navigation (Right Side)
 */
export const footerBottomNav: { titleKey: string; items: NavItem[] }[] = [
  {
    titleKey: 'footer.tutors',
    items: [
      { titleKey: 'nav.becomeATutor', href: '/become-a-tutor' },
      { titleKey: 'footer.tutorCodeOfConduct', href: '/tutor-code-of-conduct' },
      { titleKey: 'footer.tutorsFaqs', href: '/faqs?tab=tutors' },
    ],
  },
  {
    titleKey: 'footer.students',
    items: [
      { titleKey: 'footer.studentsFaqs', href: '/faqs?tab=students' },
      { titleKey: 'footer.studentCodeOfConduct', href: '/student-code-of-conduct' },
    ],
  },
];

/**
 * Footer Legal Navigation (Bottom Row)
 */
export const footerLegalNav: NavItem[] = [
  { titleKey: 'footer.privacyPolicy', href: '/privacy-policy' },
  { titleKey: 'footer.cookiePolicy', href: '/cookie-policy' },
  { titleKey: 'footer.termsAndConditions', href: '/terms-and-conditions' },
];
