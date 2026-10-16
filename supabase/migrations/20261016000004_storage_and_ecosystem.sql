-- Storage Buckets Configuration & Access Policies
-- Buckets: course-materials, learner-submissions, application-documents

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('course-materials', 'course-materials', true, 52428800, ARRAY['application/pdf', 'video/mp4', 'image/png', 'image/jpeg', 'application/zip']),
  ('learner-submissions', 'learner-submissions', false, 20971520, ARRAY['application/pdf', 'application/zip', 'text/plain', 'image/png', 'image/jpeg']),
  ('application-documents', 'application-documents', false, 10485760, ARRAY['application/pdf', 'image/png', 'image/jpeg'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage Policies: course-materials (public read, staff upload)
CREATE POLICY "course_materials: public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-materials');

CREATE POLICY "course_materials: staff manage"
ON storage.objects FOR ALL
USING (
  bucket_id = 'course-materials' AND
  get_user_role(auth.uid()) IN ('content_editor', 'academy_admin', 'super_admin')
);

-- Storage Policies: learner-submissions (own submission access, instructors read)
CREATE POLICY "submissions: own access"
ON storage.objects FOR ALL
USING (
  bucket_id = 'learner-submissions' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "submissions: instructor read"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'learner-submissions' AND
  get_user_role(auth.uid()) IN ('instructor', 'evaluator', 'academy_admin', 'super_admin')
);

-- Storage Policies: application-documents (prospect own access, admissions read)
CREATE POLICY "app_docs: applicant access"
ON storage.objects FOR ALL
USING (
  bucket_id = 'application-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "app_docs: admissions read"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'application-documents' AND
  get_user_role(auth.uid()) IN ('admissions_counsellor', 'academy_admin', 'super_admin')
);
