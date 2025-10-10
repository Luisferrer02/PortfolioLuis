import { render, screen, fireEvent } from '@testing-library/react'
import ProjectCard from '@/components/ProjectCard'

test('renders project card and fires Details', ()=>{
  const project = { title: 'Demo', tags:['Next.js'], description:'desc', links:{ github:'#', demo:'#' }, hasDemo: true }
  const onOpen = jest.fn()
  render(<ProjectCard project={project} onOpen={onOpen} />)
  expect(screen.getByText('Demo')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Details'))
  expect(onOpen).toHaveBeenCalled()
})

test('shows demo button only when hasDemo is true', ()=>{
  const projectWithDemo = { 
    title: 'Project with Demo', 
    tags:['React'], 
    description:'Has demo', 
    links:{ github:'#', demo:'#' }, 
    hasDemo: true 
  }
  const projectWithoutDemo = { 
    title: 'Project without Demo', 
    tags:['Vue'], 
    description:'No demo', 
    links:{ github:'#', demo:'#' }, 
    hasDemo: false 
  }
  
  const onOpen = jest.fn()
  
  const { rerender } = render(<ProjectCard project={projectWithDemo} onOpen={onOpen} />)
  expect(screen.getByText('Demo')).toBeInTheDocument()
  
  rerender(<ProjectCard project={projectWithoutDemo} onOpen={onOpen} />)
  expect(screen.queryByText('Demo')).not.toBeInTheDocument()
})
