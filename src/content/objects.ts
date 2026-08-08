export interface ObjectDetail {
  label: string;
  value: string;
}

export interface CollectionObject {
  id: string;
  index: string;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  details: ObjectDetail[];
  availability: string;
  measure: string;
  isReversed: boolean;
}

export const collectionObjects: CollectionObject[] = [
  {
    id: 'fold-lamp',
    index: '01',
    name: 'Fold Lamp',
    description:
      'Sculptural floor lamp composed of hand-formed ceramic folds and a diffused inner light.',
    imageSrc: '/assets/fold-lamp.png',
    imageAlt: 'Fold Lamp with bone ceramic and dark metal fins',
    details: [
      { label: 'Material', value: 'Ceramic, linen, LED' },
      { label: 'Finish', value: 'Bone' },
      { label: 'Dimensions', value: 'H 1200 × Ø 420 mm' },
      { label: 'Edition', value: '15 + 3 AP' },
    ],
    availability: '12 of 15 available',
    measure: '1200 mm',
    isReversed: false,
  },
  {
    id: 'mass-vessel',
    index: '02',
    name: 'Mass Vessel',
    description:
      'Cast metal vessel with a grounded presence and a softly contoured rim.',
    imageSrc: '/assets/mass-vessel.png',
    imageAlt: 'Mass Vessel in raw hand-cast aluminum',
    details: [
      { label: 'Material', value: 'Cast aluminium' },
      { label: 'Finish', value: 'Raw mineral' },
      { label: 'Dimensions', value: 'H 240 × Ø 280 mm' },
      { label: 'Edition', value: '20 + 4 AP' },
    ],
    availability: '17 of 20 available',
    measure: '240 mm',
    isReversed: true,
  },
];
