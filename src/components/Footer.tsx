/**
 * Renders the compact studio and policy footer.
 */
export function Footer(): React.JSX.Element {
  return (
    <footer className="site-footer" id="studio">
      <div>
        <strong>MORPH Studio</strong>
        <span>Copenhagen, DK</span>
      </div>
      <div>
        <a href="#collection">Info</a>
        <a href="#collection">Shipping &amp; returns</a>
        <a href="#materials">Care &amp; maintenance</a>
      </div>
      <div id="journal">
        <a href="#top">Journal</a>
        <a href="#materials">Material notes</a>
        <a href="#studio">Studio diaries</a>
      </div>
      <div>
        <span>© MORPH Studio 2026</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}
