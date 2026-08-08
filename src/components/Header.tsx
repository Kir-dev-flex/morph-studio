const NAVIGATION = [
  { label: 'Collection', href: '#collection' },
  { label: 'Studio', href: '#studio' },
  { label: 'Materials', href: '#materials' },
  { label: 'Journal', href: '#journal' },
] as const;

/**
 * Renders the persistent MORPH brand navigation.
 */
export function Header(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="MORPH home">
        MORPH
      </a>
      <nav
        aria-label="Primary navigation"
        className={isMenuOpen ? 'primary-nav primary-nav--open' : 'primary-nav'}
      >
        <ul className="nav-list">
          {NAVIGATION.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="header-meta">
        <span className="edition-status">Limited editions</span>
        <button className="cart-button" type="button" aria-label="Open cart">
          Cart <span aria-hidden="true">(0)</span>
        </button>
      </div>
      <button
        className="menu-button"
        type="button"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((previousValue) => !previousValue)}
      >
        {isMenuOpen ? <X size={24} /> : <List size={24} />}
      </button>
    </header>
  );
}
import { List, X } from '@phosphor-icons/react';
import { useState } from 'react';
