import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { GraduationCap, BookOpen, Award, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false },
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = (await supabase
    .from('profiles')
    .select('full_name, display_name, avatar_url')
    .eq('id', user.id)
    .single()) as {
    data: {
      full_name: string
      display_name: string | null
      avatar_url: string | null
    } | null
  }

  const { data: enrolments } = await supabase
    .from('learning_enrolments')
    .select('*, programmes(title, thumbnail_url)')
    .eq('learner_id', user.id)
    .eq('status', 'active')

  const displayName = profile?.display_name || profile?.full_name || user.email

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, {displayName?.split(' ')[0]}!</h1>
              <p className="text-muted-foreground mt-1">Here&apos;s an overview of your learning journey.</p>
            </div>
            <Link href="/programmes">
              <Button variant="outline" size="sm">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Programmes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{enrolments?.length ?? 0}</div>
                  <div className="text-sm text-muted-foreground">Active Enrolments</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Certificates</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">0h</div>
                  <div className="text-sm text-muted-foreground">Learning Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolments */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Courses</h2>
          {enrolments && enrolments.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {enrolments.map((enrolment: any) => (
                <Card key={enrolment.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{enrolment.programmes?.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{enrolment.progress_percentage}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary transition-all"
                            style={{ width: `${enrolment.progress_percentage}%` }}
                            role="progressbar"
                            aria-valuenow={enrolment.progress_percentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                      <Link href={`/courses/${enrolment.programme_id}`}>
                        <Button size="sm" className="w-full">
                          Continue Learning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No active courses yet</h3>
                <p className="text-muted-foreground mb-6">
                  Apply for a programme to start your learning journey.
                </p>
                <Link href="/apply">
                  <Button>Apply Now</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
