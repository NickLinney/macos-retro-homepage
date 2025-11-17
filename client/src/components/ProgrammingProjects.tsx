import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  type: string;
  language: string;
  status: string;
  description: string;
  technologies: string[];
  completion: number;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Web Framework',
    type: 'Library',
    language: 'JavaScript',
    status: 'Active',
    description: 'A lightweight, modern web framework built from scratch with virtual DOM diffing and component lifecycle management. Focuses on simplicity and performance.',
    technologies: ['Virtual DOM', 'ES6+', 'Webpack', 'JSX Transform'],
    completion: 75,
  },
  {
    id: '2',
    name: 'Game Engine',
    type: 'Application',
    language: 'C++',
    status: 'In Progress',
    description: '2D game engine with entity-component system architecture. Includes sprite rendering, physics simulation, and audio management.',
    technologies: ['OpenGL', 'SDL2', 'Box2D', 'FMOD'],
    completion: 45,
  },
  {
    id: '3',
    name: 'CLI Tool',
    type: 'Utility',
    language: 'Python',
    status: 'Complete',
    description: 'Command-line productivity tool for managing development environments and automating common workflows. Supports plugins and custom scripts.',
    technologies: ['Click', 'Poetry', 'Rich', 'YAML'],
    completion: 100,
  },
  {
    id: '4',
    name: '3D Renderer',
    type: 'Research',
    language: 'C++/GLSL',
    status: 'Experimental',
    description: 'Real-time 3D renderer exploring advanced techniques like ray marching, signed distance fields, and procedural generation.',
    technologies: ['OpenGL', 'GLSL Shaders', 'Math Libraries'],
    completion: 30,
  },
  {
    id: '5',
    name: 'Parser Library',
    type: 'Library',
    language: 'Rust',
    status: 'Planning',
    description: 'Parser combinator library with zero-copy parsing and error recovery. Designed for building custom programming languages and DSLs.',
    technologies: ['Rust', 'nom', 'Procedural Macros'],
    completion: 15,
  },
];

export default function ProgrammingProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div>
      <h3>Programming Projects</h3>
      <div className="field-row" style={{ marginTop: '12px' }}>
        <table className="interactive" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Language</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                onClick={() => setSelectedProject(project)}
                style={{ cursor: 'pointer' }}
                data-testid={`project-row-${project.id}`}
              >
                <td>📁 {project.name}</td>
                <td>{project.language}</td>
                <td>{project.status}</td>
                <td>
                  <progress value={project.completion} max="100" style={{ width: '80px' }}>
                    {project.completion}%
                  </progress>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProject && (
        <div style={{ marginTop: '16px' }}>
          <fieldset>
            <legend>{selectedProject.name}</legend>
            <div className="field-row-stacked">
              <label><strong>Type:</strong> {selectedProject.type}</label>
              <label><strong>Language:</strong> {selectedProject.language}</label>
              <label><strong>Status:</strong> {selectedProject.status}</label>
              <label><strong>Completion:</strong> {selectedProject.completion}%</label>
            </div>
            <p style={{ marginTop: '8px', fontSize: '11px' }}>{selectedProject.description}</p>
            <div style={{ marginTop: '8px' }}>
              <strong style={{ fontSize: '11px' }}>Technologies:</strong>
              <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {selectedProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      border: '1px solid #000',
                      background: '#fff',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <button className="btn" onClick={() => setSelectedProject(null)} data-testid="button-close-details">
                Close
              </button>
            </div>
          </fieldset>
        </div>
      )}

      <p style={{ marginTop: '12px', fontSize: '10px' }}>
        Click on a project to view details
      </p>
    </div>
  );
}
