import Image from 'next/image';

/** The compact avatar-and-divider proof pattern used across subject heroes. */
export function HeroProof({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <div className="flex shrink-0 -space-x-2 rtl:space-x-reverse" aria-hidden="true">
        {[1, 2, 3].map((image) => (
          <div
            key={image}
            className="relative w-10 h-10 rounded-full border-2 border-surface overflow-hidden"
          >
            <Image
              src={`https://pub-c1e8cebadf004f2fb0c59e13ab317896.r2.dev/web/hero-base/${image}.webp`}
              alt=""
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-x-5 text-body-base font-semibold text-content">
        {items.map((item, index) => (
          <li key={item} className="flex items-center gap-5">
            {index > 0 && (
              <span aria-hidden="true" className="hidden sm:inline font-normal text-content">
                /
              </span>
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
