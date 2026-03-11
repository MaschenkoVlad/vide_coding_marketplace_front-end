'use client'

import { PageContainer } from '@/shared/ui/app/page-container'
import { Button } from '@/shared/ui/shadcn/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/shadcn/ui/card'
import { Cpu, Monitor, HardDrive, Package, ArrowRight } from 'lucide-react'

const categories = [
  { name: 'CPU', icon: Cpu, description: 'Processors and CPUs' },
  { name: 'GPU', icon: Monitor, description: 'Graphics cards' },
  { name: 'Storage', icon: HardDrive, description: 'SSDs, HDDs, and more' },
  { name: 'All Components', icon: Package, description: 'Browse all categories' },
]

export default function HomePage() {
  return (
    <PageContainer>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 py-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">VIDE Marketplace</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Your trusted marketplace for quality used computer hardware. Buy and sell components with confidence.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/catalog">
              <Button size="lg">
                Browse Catalog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Browse Categories</h2>
            <p className="mt-2 text-muted-foreground">Find exactly what you&apos;re looking for</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Card key={category.name} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <category.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/catalog">
                    <Button variant="ghost" className="w-full">
                      Browse {category.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Verified Sellers</CardTitle>
              <CardDescription>All sellers are verified to ensure you get quality components</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure Transactions</CardTitle>
              <CardDescription>Safe and secure payment processing with buyer protection</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Driven</CardTitle>
              <CardDescription>Join a community of PC enthusiasts and hardware experts</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
