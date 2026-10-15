const whatsappFormatted = '+971 58 538 7861';
const whatsappNumber = whatsappFormatted.replace(/\D/g, '');

export const siteConfig = {
  name: 'HelloTutor',
  description: "Expert online tutoring tailored to your child's needs. We connect students with top tutors in Maths, Science, English, and more to build confidence and deliver results.",
  url: 'https://www.hellotutor.me',
  ogImage: 'https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/home/hero-main.png',
  locale: 'ae-en',
  loginUrl: 'https://app.hellotutor.me',
  tutorSignupUrl: 'https://app.hellotutor.me/signup',
  whatsappNumber,
  whatsappFormatted,
  phoneUrl: `tel:+${whatsappNumber}`,
  whatsappUrl: `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text&type=phone_number&app_absent=0`,
  links: {
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: '',
  },
} as const;
