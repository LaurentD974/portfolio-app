import React, { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  const baseUrl = "http://localhost:1337";

  async function getProjects() {
    const request = await fetch(baseUrl + "/api/projects?populate=cover");
    const response = await request.json();
    setProjects(response.data);
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <h1>MES PROJETS</h1>
      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h2>{project.title}</h2>
            <img src={baseUrl + project.cover.url} alt={project.title} />
            <p className="project-description">{project.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              Voir sur GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
