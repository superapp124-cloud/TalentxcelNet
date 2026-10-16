export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole =
  | 'public'
  | 'prospect'
  | 'learner'
  | 'parent_guardian'
  | 'instructor'
  | 'mentor'
  | 'admissions_counsellor'
  | 'support_agent'
  | 'content_editor'
  | 'finance_ops'
  | 'academy_admin'
  | 'super_admin'

export type ProgrammeStatus = 'draft' | 'waitlist' | 'published' | 'archived'

export type LeadStatus =
  | 'new_enquiry'
  | 'contact_attempted'
  | 'qualified'
  | 'counselling_scheduled'
  | 'counselling_completed'
  | 'application_started'
  | 'application_submitted'
  | 'offer_pending'
  | 'admitted'
  | 'payment_pending'
  | 'enrolled'
  | 'not_proceeding'
  | 'waitlisted'

export type EnrolmentStatus =
  | 'pending'
  | 'active'
  | 'suspended'
  | 'completed'
  | 'withdrawn'
  | 'expired'

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'
  | 'cancelled'

export type OrderStatus =
  | 'draft'
  | 'confirmed'
  | 'payment_pending'
  | 'paid'
  | 'cancelled'
  | 'refunded'

export type LessonType =
  | 'video'
  | 'text'
  | 'code'
  | 'pdf'
  | 'quiz'
  | 'assignment'
  | 'live_session'
  | 'project'

export type AssessmentType =
  | 'quiz'
  | 'assignment'
  | 'project'
  | 'peer_review'
  | 'practical'

export type TicketStatus =
  | 'open'
  | 'in_progress'
  | 'waiting_learner'
  | 'resolved'
  | 'closed'

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'

export type CertificateStatus = 'issued' | 'revoked'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          display_name: string | null
          phone: string | null
          date_of_birth: string | null
          gender: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          state: string | null
          country: string
          timezone: string
          preferred_language: string
          is_minor: boolean
          guardian_profile_id: string | null
          account_status: 'active' | 'suspended' | 'deleted' | 'pending_verification'
          last_active_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & {
          id: string
          email: string
          full_name: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: UserRole
          granted_by: string | null
          granted_at: string
          expires_at: string | null
          is_active: boolean
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['user_roles']['Row']> & {
          user_id: string
          role: UserRole
        }
        Update: Partial<Database['public']['Tables']['user_roles']['Row']>
        Relationships: []
      }
      programmes: {
        Row: {
          id: string
          slug: string
          title: string
          subtitle: string | null
          description: string | null
          short_description: string | null
          status: ProgrammeStatus
          category: string | null
          duration_months: number | null
          workload_hours_per_week: number | null
          level: 'beginner' | 'intermediate' | 'advanced' | 'foundation' | null
          language: string
          thumbnail_url: string | null
          preview_video_url: string | null
          is_downloadable_content_available: boolean
          has_hardware_included: boolean
          meta_title: string | null
          meta_description: string | null
          created_by: string | null
          published_at: string | null
          archived_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['programmes']['Row']> & {
          slug: string
          title: string
        }
        Update: Partial<Database['public']['Tables']['programmes']['Row']>
        Relationships: []
      }
      modules: {
        Row: {
          id: string
          programme_id: string
          title: string
          description: string | null
          position: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['modules']['Row']> & {
          programme_id: string
          title: string
        }
        Update: Partial<Database['public']['Tables']['modules']['Row']>
        Relationships: []
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          title: string
          description: string | null
          lesson_type: LessonType
          content_url: string | null
          content_body: string | null
          duration_minutes: number | null
          position: number
          is_published: boolean
          is_preview: boolean
          is_downloadable: boolean
          transcript: string | null
          captions_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['lessons']['Row']> & {
          module_id: string
          title: string
          lesson_type: LessonType
        }
        Update: Partial<Database['public']['Tables']['lessons']['Row']>
        Relationships: []
      }
      learning_enrolments: {
        Row: {
          id: string
          learner_id: string
          programme_id: string
          status: EnrolmentStatus
          enrolled_at: string | null
          expires_at: string | null
          completed_at: string | null
          progress_percentage: number
          order_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['learning_enrolments']['Row']> & {
          learner_id: string
          programme_id: string
        }
        Update: Partial<Database['public']['Tables']['learning_enrolments']['Row']>
        Relationships: []
      }
      learner_progress: {
        Row: {
          id: string
          enrolment_id: string
          lesson_id: string
          is_completed: boolean
          completed_at: string | null
          time_spent_seconds: number
          last_position_seconds: number | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['learner_progress']['Row']> & {
          enrolment_id: string
          lesson_id: string
        }
        Update: Partial<Database['public']['Tables']['learner_progress']['Row']>
        Relationships: []
      }
      bookmarks: {
        Row: {
          id: string
          learner_id: string
          lesson_id: string
          note: string | null
          position_seconds: number | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['bookmarks']['Row']> & {
          learner_id: string
          lesson_id: string
        }
        Update: Partial<Database['public']['Tables']['bookmarks']['Row']>
        Relationships: []
      }
      learner_notes: {
        Row: {
          id: string
          learner_id: string
          lesson_id: string
          content: string
          is_private: boolean
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['learner_notes']['Row']> & {
          learner_id: string
          lesson_id: string
          content: string
        }
        Update: Partial<Database['public']['Tables']['learner_notes']['Row']>
        Relationships: []
      }
      assessments: {
        Row: {
          id: string
          programme_id: string | null
          module_id: string | null
          lesson_id: string | null
          title: string
          description: string | null
          assessment_type: AssessmentType
          max_attempts: number
          time_limit_minutes: number | null
          pass_score_percentage: number
          is_published: boolean
          due_at: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['assessments']['Row']> & {
          title: string
          assessment_type: AssessmentType
        }
        Update: Partial<Database['public']['Tables']['assessments']['Row']>
        Relationships: []
      }
      questions: {
        Row: {
          id: string
          assessment_id: string
          question_text: string
          question_type: 'multiple_choice' | 'short_answer' | 'code' | 'file_upload' | 'true_false'
          options: Json | null
          correct_answer: Json | null
          points: number
          explanation: string | null
          position: number
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['questions']['Row']> & {
          assessment_id: string
          question_text: string
          question_type: 'multiple_choice' | 'short_answer' | 'code' | 'file_upload' | 'true_false'
        }
        Update: Partial<Database['public']['Tables']['questions']['Row']>
        Relationships: []
      }
      assessment_attempts: {
        Row: {
          id: string
          assessment_id: string
          learner_id: string
          enrolment_id: string | null
          status: 'in_progress' | 'submitted' | 'graded' | 'appealed'
          started_at: string
          submitted_at: string | null
          graded_at: string | null
          score: number | null
          max_score: number | null
          percentage: number | null
          is_passed: boolean | null
          graded_by: string | null
          feedback: string | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['assessment_attempts']['Row']> & {
          assessment_id: string
          learner_id: string
        }
        Update: Partial<Database['public']['Tables']['assessment_attempts']['Row']>
        Relationships: []
      }
      assessment_responses: {
        Row: {
          id: string
          attempt_id: string
          question_id: string
          response_value: Json | null
          file_url: string | null
          score: number | null
          is_correct: boolean | null
          feedback: string | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['assessment_responses']['Row']> & {
          attempt_id: string
          question_id: string
        }
        Update: Partial<Database['public']['Tables']['assessment_responses']['Row']>
        Relationships: []
      }
      leads: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string | null
          profile_id: string | null
          programme_interest: string | null
          status: LeadStatus
          source: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          utm_content: string | null
          assigned_to: string | null
          notes: string | null
          is_duplicate: boolean
          duplicate_of: string | null
          city: string | null
          state: string | null
          education_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['leads']['Row']> & {
          email: string
          full_name: string
        }
        Update: Partial<Database['public']['Tables']['leads']['Row']>
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          order_number: string
          learner_id: string
          programme_id: string
          price_id: string | null
          status: OrderStatus
          subtotal: number
          discount_amount: number
          tax_amount: number
          total_amount: number
          currency: string
          coupon_code: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['orders']['Row']> & {
          order_number: string
          learner_id: string
          programme_id: string
          subtotal: number
          discount_amount: number
          tax_amount: number
          total_amount: number
          currency: string
        }
        Update: Partial<Database['public']['Tables']['orders']['Row']>
        Relationships: []
      }
      payment_transactions: {
        Row: {
          id: string
          order_id: string
          provider: string
          provider_order_id: string | null
          provider_payment_id: string | null
          provider_signature: string | null
          amount: number
          currency: string
          status: PaymentStatus
          failure_reason: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['payment_transactions']['Row']> & {
          order_id: string
          provider: string
          amount: number
          currency: string
        }
        Update: Partial<Database['public']['Tables']['payment_transactions']['Row']>
        Relationships: []
      }
      programme_prices: {
        Row: {
          id: string
          programme_id: string
          currency: string
          base_price: number
          upfront_amount: number | null
          monthly_amount: number | null
          instalment_months: number | null
          tax_rate_percentage: number
          is_active: boolean
          valid_from: string
          valid_until: string | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['programme_prices']['Row']> & {
          programme_id: string
          currency: string
          base_price: number
        }
        Update: Partial<Database['public']['Tables']['programme_prices']['Row']>
        Relationships: []
      }
      support_tickets: {
        Row: {
          id: string
          ticket_number: string
          submitter_id: string
          assigned_to: string | null
          subject: string
          category: string | null
          status: TicketStatus
          priority: TicketPriority
          programme_id: string | null
          enrolment_id: string | null
          resolved_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['support_tickets']['Row']> & {
          ticket_number: string
          submitter_id: string
          subject: string
        }
        Update: Partial<Database['public']['Tables']['support_tickets']['Row']>
        Relationships: []
      }
      certificates: {
        Row: {
          id: string
          certificate_number: string
          learner_id: string
          enrolment_id: string
          programme_id: string
          status: CertificateStatus
          issued_at: string
          revoked_at: string | null
          revocation_reason: string | null
          issued_by: string | null
          verification_url: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['certificates']['Row']> & {
          certificate_number: string
          learner_id: string
          enrolment_id: string
          programme_id: string
        }
        Update: Partial<Database['public']['Tables']['certificates']['Row']>
        Relationships: []
      }
      ai_conversations: {
        Row: {
          id: string
          user_id: string
          agent_type: string
          context_type: string | null
          context_id: string | null
          title: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['ai_conversations']['Row']> & {
          user_id: string
          agent_type: string
        }
        Update: Partial<Database['public']['Tables']['ai_conversations']['Row']>
        Relationships: []
      }
      ai_messages: {
        Row: {
          id: string
          conversation_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          metadata: Json | null
          tokens_used: number | null
          model_used: string | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['ai_messages']['Row']> & {
          conversation_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
        }
        Update: Partial<Database['public']['Tables']['ai_messages']['Row']>
        Relationships: []
      }
      ai_usage_events: {
        Row: {
          id: string
          user_id: string | null
          agent_type: string
          model: string
          provider: string
          prompt_tokens: number
          completion_tokens: number
          total_tokens: number
          latency_ms: number | null
          success: boolean
          error_type: string | null
          cost_usd: number | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['ai_usage_events']['Row']> & {
          agent_type: string
          model: string
          provider: string
          prompt_tokens: number
          completion_tokens: number
          total_tokens: number
        }
        Update: Partial<Database['public']['Tables']['ai_usage_events']['Row']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      get_user_role: {
        Args: { uid: string }
        Returns: UserRole
      }
      is_admin_or_above: {
        Args: { uid: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: UserRole
      programme_status: ProgrammeStatus
      lead_status: LeadStatus
      enrolment_status: EnrolmentStatus
      payment_status: PaymentStatus
      order_status: OrderStatus
      lesson_type: LessonType
      assessment_type: AssessmentType
      ticket_status: TicketStatus
      ticket_priority: TicketPriority
      certificate_status: CertificateStatus
    }
    CompositeTypes: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]
