import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, ShieldAlert, Clock, MessageSquare } from 'lucide-react'
import { EnquiryForm } from '@/components/public/enquiry-form'

export const metadata: Metadata = {
  title: 'Contact & Grievance Redressal — TalentXcel Academy',
  description: 'Reach our admissions, student support, and statutory Grievance Officer.',
  alternates: {
    canonical: 'https://talentxcel.net/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-3 text-primary border-primary/30">
            Get in Touch
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact & Grievance Support
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Whether you have admissions enquiries, need technical assistance, or wish to reach our Grievance Officer, we are here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information & Grievance */}
          <div className="space-y-6">
            <Card className="border shadow-xs">
              <CardHeader>
                <CardTitle className="text-lg font-bold">General Enquiries & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Email Admissions</div>
                    <div className="text-xs text-muted-foreground">admissions@talentxcel.net</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Helpline</div>
                    <div className="text-xs text-muted-foreground">+91 9717161809 (Mon–Fri, 10:00 AM – 6:00 PM IST)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">WhatsApp Support</div>
                    <a
                      href="https://wa.me/919717161809"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Chat on WhatsApp (+91 9717161809)
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Operating Address</div>
                    <div className="text-xs text-muted-foreground">TalentXcel Services, Pavilion Court, Noida, Gautam Buddha Nagar, Uttar Pradesh 201301, India</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statutory Grievance Redressal Card */}
            <Card className="border border-primary/30 bg-primary/5 shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base font-bold">Statutory Grievance Officer</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">
                  In accordance with the Information Technology Act 2000 and Digital Personal Data Protection Act 2023.
                </p>
              </CardHeader>
              <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                <div>
                  <strong className="text-foreground">Officer Name: </strong>Grievance Redressal Officer
                </div>
                <div>
                  <strong className="text-foreground">Email: </strong>
                  <a href="mailto:grievance@talentxcel.net" className="text-primary underline">
                    grievance@talentxcel.net
                  </a>
                </div>
                <div>
                  <strong className="text-foreground">Response Timetable: </strong>
                  Acknowledgement within 48 hours; resolution within 30 days of grievance receipt.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl border p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-foreground mb-1">Send an Enquiry</h3>
            <p className="text-xs text-muted-foreground mb-6">
              Our team will respond to your enquiry within 2 business days.
            </p>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </div>
  )
}
