import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGuidedProject } from '@/lib/lms/project-service'
import { ProjectWorkspace } from '@/components/academy/project-workspace'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>
}): Promise<Metadata> {
  const { projectId } = await params
  const project = getGuidedProject(projectId)
  return {
    title: `${project.title} — Project Workspace`,
    description: project.summary,
    robots: { index: false },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const project = getGuidedProject(projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-muted/10 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProjectWorkspace project={project} />
      </div>
    </div>
  )
}
