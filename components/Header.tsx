import Link from 'next/link';

export default function Header() {
  return (
    <header role="banner" className="site-head">
      <div className="wrapper">
        <div className="site-head__inner">
          <Link href="/">
            <a>BranName</a>
          </Link>
          <div className="site-head__navigation">
            <nav aria-label="primary" id="primary-navigation" tabIndex={-1}>
              <ul className="[ nav ] [ fs-300 weight-medium ]" role="list">
                <li>
                  <Link href="/blog">
                    <a>blog</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
