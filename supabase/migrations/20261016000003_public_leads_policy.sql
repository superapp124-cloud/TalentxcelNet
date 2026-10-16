-- Allow anonymous and authenticated visitors to submit enquiries into leads table
CREATE POLICY "leads: public insert" ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
