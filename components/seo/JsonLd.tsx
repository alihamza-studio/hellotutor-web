interface JsonLdProps {
  type?: 'WebSite' | 'Organization' | 'LocalBusiness' | 'BreadcrumbList' | 'FAQPage' | 'Service' | (string & {});
  data?: Record<string, unknown>;
}

export function JsonLd({ type = 'Organization', data }: JsonLdProps) {
  const defaultOrganizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HelloTutor',
    url: 'https://www.hellotutor.me',
    logo: 'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/home/hero-main.png',
    sameAs: [
      'https://www.google.com/maps/place/Hello+Tutor/@24.3539913,53.9104664,14z/data=!4m10!1m2!2m1!1sHello+Tutor!3m6!1s0x248270d4e799dc09:0x868c30dbd675629e!8m2!3d24.3539913!4d53.9485752!15sCgtIZWxsbyBUdXRvcloNIgtoZWxsbyB0dXRvcpIBDXByaXZhdGVfdHV0b3KaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnhzV0ZveU1VeGpNR2Q2WlcxU2JscEdTbXRaYTA0MVpFaG9VbHBzUlJBQuABAPoBBAgAED0!16s%2Fg%2F11ymlxstww?hl=en-AE&entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D',
      'https://share.google/gbdB1DLWRqTSr31CH',
      'https://www.linkedin.com/company/hello-tutor/',
      'https://www.instagram.com/joinhellotutor/',
      'https://www.facebook.com/people/Hello-Tutor/61590255156692/',
      'https://www.tiktok.com/@joinhellotutor',
    ],
    areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Arabic'],
    },
  };

  const finalData = data
    ? {
        '@context': 'https://schema.org',
        ...data,
      }
    : defaultOrganizationData;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(finalData) }}
    />
  );
}
