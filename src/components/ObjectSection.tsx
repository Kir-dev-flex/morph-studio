import type { CollectionObject } from '../content/objects';

export interface ObjectSectionProps {
  object: CollectionObject;
}

/**
 * Renders a monumental collection entry and its production details.
 */
export function ObjectSection({ object }: ObjectSectionProps): React.JSX.Element {
  const sectionClassName = object.isReversed
    ? 'object-section object-section--reversed'
    : 'object-section';

  return (
    <article className={sectionClassName} id={object.index === '01' ? 'collection' : object.id}>
      <div className="object-visual">
        <img src={object.imageSrc} alt={object.imageAlt} loading="lazy" />
        <span className="measure measure--vertical">{object.measure}</span>
      </div>
      <div className="object-copy" id={object.index === '01' ? 'materials' : undefined}>
        <span className="object-index">{object.index}</span>
        <h2>{object.name}</h2>
        <p className="object-description">{object.description}</p>
        <dl className="object-details">
          {object.details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
        <p className="availability">{object.availability}</p>
      </div>
      <div className="measure-line" aria-hidden="true" />
    </article>
  );
}
