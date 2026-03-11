import Link from 'next/link'
import { Separator } from '@/shared/ui/shadcn/ui/separator'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">VIDE Marketplace</h3>
            <p className="text-sm text-muted-foreground">
              A trusted marketplace for used computer hardware components.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Marketplace</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/catalog" className="hover:text-primary">
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-primary">
                  Sell Items
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-primary">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 VIDE Marketplace. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link href="/status" className="hover:text-primary">
              Status
            </Link>
            <Link href="/docs" className="hover:text-primary">
              Docs
            </Link>
            <Link href="/api" className="hover:text-primary">
              API
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
