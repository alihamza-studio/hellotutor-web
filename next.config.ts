import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * Helper to generate redirect rules for both localized (e.g. /ae-en/... and /ae-ar/...)
 * and bare/unprefixed URLs (which default to /ae-en/...).
 */
function createRedirectPair(sourcePath: string, destinationPath: string, permanent = true) {
  return [
    {
      source: `/:locale(ae-en|ae-ar)${sourcePath}`,
      destination: `/:locale${destinationPath}`,
      permanent,
    },
    {
      source: sourcePath,
      destination: `/ae-en${destinationPath}`,
      permanent,
    },
  ];
}

const legacyRedirectPairs: [string, string][] = [
  // Bare "levels" slugs — old Figma URLs
  ['/ks3-tutors', '/levels/secondary-tutors/ks3'],
  ['/gcse-tutors', '/levels/secondary-tutors/gcse'],
  ['/igcse-tutors', '/levels/secondary-tutors/igcse'],
  ['/a-level-tutors', '/levels/secondary-tutors/a-level'],
  ['/primary-tutors', '/levels/primary-tutors'],
  ['/secondary-tutors', '/levels/secondary-tutors/ks3'],

  // Old /levels/ prefixed URLs
  ['/levels/gcse-tutors', '/levels/secondary-tutors/gcse'],
  ['/levels/igcse-tutors', '/levels/secondary-tutors/igcse'],
  ['/levels/a-level-tutors', '/levels/secondary-tutors/a-level'],
  ['/levels/ks3-tutors', '/levels/secondary-tutors/ks3'],
  ['/levels/secondary-tutors', '/levels/secondary-tutors/ks3'],
  ['/levels/university-admissions', '/university-admissions'],
  ['/levels/admissions-abroad', '/admissions-abroad'],
  ['/levels', ''],

  // Subject slugs — old Figma URLs
  ['/maths-tutoring', '/subjects/maths-tutoring'],
  ['/science-tutoring', '/subjects/science-tutoring'],
  ['/english-tutoring', '/subjects/english-tutoring'],
  ['/arabic-tutoring', '/subjects/arabic-tutoring'],
  ['/chemistry-tutoring', '/subjects/chemistry-tutoring'],
  ['/physics-tutoring', '/subjects/physics-tutoring'],
  ['/biology-tutoring', '/subjects/biology-tutoring'],
  ['/subjects/exam-preparation', '/exam-preparation'],
  ['/exam-prep', '/exam-preparation'],

  // About, Parents, Safety, and Info pages
  ['/about/all-faqs', '/faqs'],
  ['/about/for-parents', '/parents'],
  ['/about/safety-and-trust', '/safety-and-trust'],
  ['/about-us', '/about'],
  ['/for-parents', '/parents'],
  ['/all-faqs', '/faqs'],
  ['/safety', '/safety-and-trust'],

  // FAQ tab shortcuts
  ['/students-faqs', '/faqs?tab=students'],
  ['/tutors-faqs', '/faqs?tab=tutors'],
  ['/parents-faqs', '/faqs?tab=parents'],
  ['/student-faqs', '/faqs?tab=students'],
  ['/tutor-faqs', '/faqs?tab=tutors'],
  ['/parent-faqs', '/faqs?tab=parents'],

  // Location aliases & typos
  ['/tutors-in-abuDhabi', '/tutors-in-abu-dhabi'],
  ['/tutors-in-abudhabi', '/tutors-in-abu-dhabi'],
  ['/dubai', '/tutors-in-dubai'],
  ['/abu-dhabi', '/tutors-in-abu-dhabi'],
  ['/sharjah', '/tutors-in-sharjah'],

  // Activities
  ['/activities', ''],
  ['/martial-arts', '/activities/martial-arts'],
  ['/music', '/activities/music'],
  ['/chess', '/activities/chess'],
  ['/football', '/activities/football'],

  // Schools
  ['/schools', '/for-schools'],
  ['/school', '/for-schools'],
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev',
      },
    ],
  },
  async redirects() {
    return [
      // Legacy /en and /ar locale redirects
      { source: '/en', destination: '/ae-en', permanent: true },
      { source: '/ar', destination: '/ae-ar', permanent: true },
      { source: '/en/:path*', destination: '/ae-en/:path*', permanent: true },
      { source: '/ar/:path*', destination: '/ae-ar/:path*', permanent: true },

      // Generated locale-aware and bare legacy URL redirects
      ...legacyRedirectPairs.flatMap(([source, destination]) =>
        createRedirectPair(source, destination),
      ),
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
