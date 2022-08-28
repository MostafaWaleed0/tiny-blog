import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="[ site-foot ] [ region ] [ text-center ]"
      role="contentinfo"
    >
      <div className="wrapper flow">
        <div className="[ site-foot__navigation ] [ margin-inline-auto ]">
          <nav aria-label="secondary" tabIndex={-1}>
            <ul
              className="[ nav ] [ fs-300 weight-medium ] [ flex-wrap ]"
              role="list"
            >
              <li>
                <Link href={''}>
                  <a>about</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="fs-300 weight-bold margin-inline-auto">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
