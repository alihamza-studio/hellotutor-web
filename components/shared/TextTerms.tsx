import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';

interface TextTermsProps {
  title: string;
  items: { title: string; desc: string }[];
}

export function TextTerms({ title, items }: TextTermsProps) {
  return (
    <Section className="bg-surface">
      <Container>
        <h2 className="text-h2 text-content mb-8">{title}</h2>
        <ul className="list-disc ps-5 space-y-4 text-body-base text-content max-w-5xl">
          {items.map((item) => (
            <li key={item.title}>
              <strong className="font-semibold">{item.title}.</strong> {item.desc}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
