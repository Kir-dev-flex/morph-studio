import { Footer } from './components/Footer';
import { ObjectSection } from './components/ObjectSection';
import { Hero } from './components/hero/Hero';
import { collectionObjects } from './content/objects';

/**
 * Renders the MORPH studio landing page.
 */
export function App(): React.JSX.Element {
  return (
    <main>
      <Hero />
      {collectionObjects.map((object) => (
        <ObjectSection key={object.id} object={object} />
      ))}
      <Footer />
    </main>
  );
}
