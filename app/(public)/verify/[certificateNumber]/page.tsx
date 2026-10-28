import { Metadata } from 'next'
import { verifyCertificate } from '@/lib/lms/certificate-service'
import { Award, CheckCircle2, XCircle, ShieldCheck, Calendar, User, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/brand/logo'

export const metadata: Metadata = {
  title: 'Certificate Verification — TalentXcel Academy',
  description: 'Verify official completion certificate authenticity.',
}

export default async function CertificateVerificationPage({
  params,
}: {
  params: Promise<{ certificateNumber: string }>
}) {
  const { certificateNumber } = await params
  const certificate = verifyCertificate(certificateNumber)

  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="text-primary border-primary/30">
            Official Registry
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Certificate Verification
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            Record ID: {certificateNumber}
          </p>
        </div>

        {certificate ? (
          <Card className="border-2 border-green-500/30 shadow-lg bg-card">
            <CardHeader className="bg-green-500/5 pb-4 border-b border-green-500/20 text-center">
              <div className="flex justify-center mb-4">
                <Logo size="md" variant="full" href="/" />
              </div>
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <Badge variant="success" className="mx-auto mb-1">
                Verified Authentic
              </Badge>
              <CardTitle className="text-xl font-bold text-foreground">
                Certificate of Milestone Completion
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold">Awarded To</div>
                    <div className="font-bold text-base text-foreground">{certificate.learnerName}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold">Programme Title</div>
                    <div className="font-bold text-foreground">{certificate.programmeTitle}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold">Date of Issuance</div>
                    <div className="font-medium text-foreground">{certificate.issuedAt}</div>
                  </div>
                </div>

                {certificate.totalScore !== undefined && (
                  <div className="pt-3 border-t border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Evaluated Rubric Score
                      </span>
                      <span className="text-base font-black text-emerald-600 font-mono">
                        {certificate.totalScore} / 100
                      </span>
                    </div>

                    {certificate.rubricBreakdown && (
                      <div className="grid grid-cols-2 gap-2 text-xs bg-muted/30 p-3 rounded-xl border border-border/50">
                        <div>
                          <span className="text-muted-foreground block text-[11px]">Timetable Precision:</span>
                          <span className="font-semibold text-foreground">{certificate.rubricBreakdown.timetableAccuracy} / 40 pts</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[11px]">Weight Band:</span>
                          <span className="font-semibold text-foreground">{certificate.rubricBreakdown.weightBand} / 20 pts</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[11px]">Ergonomic Placement:</span>
                          <span className="font-semibold text-foreground">{certificate.rubricBreakdown.placement} / 15 pts</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-[11px]">Socratic Reflection:</span>
                          <span className="font-semibold text-foreground">{certificate.rubricBreakdown.reasoning} / 25 pts</span>
                        </div>
                      </div>
                    )}

                    <div className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-2.5 rounded-lg leading-relaxed">
                      <strong>Educational Credential</strong>: Digital simulation performance only. Not a medical guarantee of carrying comfort or spinal health.
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl border bg-muted/40 text-xs text-muted-foreground leading-relaxed">
                <strong>Credential Notice</strong>: This credential represents platform-verified course and assessment completion issued by TalentXcel Academy. It does not constitute a statutory university degree or regulated occupational license.
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-destructive/30 shadow-lg bg-card text-center p-8 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-destructive dark:bg-red-950/50">
              <XCircle className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Certificate Record Not Found</h2>
              <p className="text-sm text-muted-foreground mt-1">
                The identifier <code className="font-mono font-bold">{certificateNumber}</code> could not be matched against our issued certificate registry.
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Please verify the certificate serial number on your credential or contact our verification office at <a href="mailto:admissions@talentxcel.net" className="text-primary underline">admissions@talentxcel.net</a>.
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
