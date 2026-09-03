const YEAR = 2026;

export default function SiteFooter() {
  return (
    <footer className="border-t border-lime bg-void">
      <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <p className="font-display text-h3 text-bone">HustleHome</p>
            <p className="mt-2 max-w-xs text-body-sm text-ash">
              Verified vendors, unban guides, and a receipt generator.
              Everything a serious reseller needs, delivered instantly.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              <span className="font-mono text-meta uppercase tracking-wide text-ash">Shop</span>
              <a href="/products" className="font-mono text-meta text-bone hover:text-lime">
                All products
              </a>
              <a href="/reviews" className="font-mono text-meta text-bone hover:text-lime">
                Reviews
              </a>
              <a href="/contact" className="font-mono text-meta text-bone hover:text-lime">
                Contact
              </a>
            </nav>

            <nav aria-label="Social" className="flex flex-col gap-3">
              <span className="font-mono text-meta uppercase tracking-wide text-ash">Elsewhere</span>
              <a
                href="https://www.tiktok.com/@hustlehome.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-meta text-bone hover:text-lime"
              >
                TikTok
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-iron pt-6">
          <p className="font-mono text-meta text-ash">
            © {YEAR} HustleHome. Digital products. All sales final. Delivered
            by email within 1 hour of purchase.
          </p>
        </div>
      </div>
    </footer>
  );
}
