import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/how-it-works',
    '/pricing',
    '/subjects',
    '/subjects/maths-tutoring',
    '/subjects/science-tutoring',
    '/subjects/english-tutoring',
    '/subjects/chemistry-tutoring',
    '/subjects/physics-tutoring',
    '/subjects/biology-tutoring',
    '/subjects/arabic-tutoring',
    '/levels/primary-tutors',
    '/levels/secondary-tutors/ks3',
    '/levels/secondary-tutors/gcse',
    '/levels/secondary-tutors/igcse',
    '/levels/secondary-tutors/a-level',
    '/university-admissions',
    '/admissions-abroad',
    '/exam-preparation',
    '/tutors-in-dubai',
    '/tutors-in-abu-dhabi',
    '/tutors-in-sharjah',
    '/for-schools',
    '/activities/martial-arts',
    '/activities/music',
    '/activities/chess',
    '/activities/football',
    '/about',
    '/contact',
    '/become-a-tutor',
    '/faqs',
    '/parents',
    '/safety-and-trust',
    '/safeguarding',
    '/privacy-policy',
    '/cookie-policy',
    '/terms-and-conditions',
    '/student-code-of-conduct',
    '/tutor-code-of-conduct',
  ].flatMap((route) => {
    const url_en = `${siteConfig.url}/ae-en${route}`;
    const url_ar = `${siteConfig.url}/ae-ar${route}`;
    const alternates = {
      languages: {
        'en-AE': url_en,
        'ar-AE': url_ar,
        'x-default': url_en,
      },
    };

    return [
      {
        url: url_en,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
        alternates,
      },
      {
        url: url_ar,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
        alternates,
      },
    ];
  });

  return routes;
}
