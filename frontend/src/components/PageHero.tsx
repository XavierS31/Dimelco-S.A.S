import { ReactNode } from 'react';

type Props = { eyebrow?: string; title: string; description: string; image?: string; children?: ReactNode; tone?: 'dark' | 'light' };

export default function PageHero({ eyebrow, title, description, image, children, tone = 'dark' }: Props) {
  return (
    <section className={`page-hero page-hero--${tone}`}>
      {image && <img className="page-hero__image" src={image} alt="" />}
      <div className="page-hero__shade" />
      <div className="container page-hero__content">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p className="page-hero__description">{description}</p>
        {children && <div className="page-hero__actions">{children}</div>}
      </div>
    </section>
  );
}
