import React, { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [selectValue, setSelectValue] = useState("0");
  const [copyProjects, setCopyProjects] = useState([]);
  const baseUrl = "http://localhost:1337";

  async function getProjects() {
    const request = await fetch(
      baseUrl +
        "/api/projects?populate=cover&populate=technologies&populate=technologies.icon"
    );
    const response = await request.json();
    setProjects(response.data);
    setCopyProjects(response.data);
  }
  async function getTechnologies() {
    const request = await fetch(baseUrl + "/api/technologies?populate=icon");
    const response = await request.json();
    setTechnologies(response.data);
  }

  useEffect(() => {
    getProjects();
    getTechnologies();
  }, []);

  useEffect(() => {
    var data = [...copyProjects];
    if (selectValue != "0")
      data = data.filter((project) =>
        project.technologies.some((techno) => techno.id == selectValue)
      );
    setProjects(data);
  }, [selectValue]);

  return (
    <div>
      <h1>MES PROJETS</h1>
      <select onChange={(e) => setSelectValue(e.target.value)}>
        <option value="0">Sélectionner une techno</option>
        {technologies.map((techno) => (
          <option key={techno.id} value={techno.id}>
            {techno.name}
          </option>
        ))}
      </select>
      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h2>{project.title}</h2>

            {project.technologies.map((techno) => (
              <img
                key={techno.id}
                src={baseUrl + techno.icon.url}
                width={"30px"}
              />
            ))}

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
