import Link from 'next/link'
import { Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-ink">
            Chase<span className="text-primary">Pay</span>
          </h1>
          <p className="text-sm text-ink-muted mt-1">Automated debt recovery for Nigerian businesses</p>
        </div>

        <Card className="border-stroke shadow-sm">
          <CardHeader className="pb-4">
            <h2 className="text-lg font-semibold text-ink">Sign in to your account</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-ink">Email address</Label>
              <Input id="email" type="email" placeholder="amaka@business.com" className="border-stroke focus:ring-primary" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium text-ink">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="border-stroke focus:ring-primary" />
            </div>
            <Link href="/" className="block w-full">
              <Button className="w-full bg-primary hover:bg-primary-hover text-white font-medium">
                Sign in
              </Button>
            </Link>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stroke" /></div>
              <div className="relative flex justify-center text-xs text-ink-subtle bg-surface px-2">or</div>
            </div>
            <Button variant="outline" className="w-full border-stroke text-ink-muted">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </Button>
            <p className="text-center text-sm text-ink-muted">
              Don&apos;t have an account?{' '}
              <span className="text-primary font-medium cursor-not-allowed">Sign up</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
