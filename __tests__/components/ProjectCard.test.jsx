import { render, screen, fireEvent } from '@testing-library/react'
import ProjectCard from '@/components/ProjectCard'

test('renders project card and fires Details', ()=>{
  const project = { title: 'Demo', tags:['Next.js'], description:'desc', links:{ github:'#', demo:'#' } }
  const onOpen = jest.fn()
  render(<ProjectCard project={project} onOpen={onOpen} />)
  expect(screen.getByText('Demo')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Details'))
  expect(onOpen).toHaveBeenCalled()
})
