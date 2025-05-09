import React, { useEffect, useState } from "react";
import ContactForm from "./contactForm.jsx";
import "./index.css";

/**
 * Composant principal de l'application.
 * Il affiche une liste de projets filtrables par technologies.
 */
function App() {
  /** @type {Array} Liste des projets récupérés depuis l'API */
  const [projects, setProjects] = useState([]);
  /** @type {Array} Liste des technologies récupérées depuis l'API */
  const [technologies, setTechnologies] = useState([]);
  /** @type {string} Identifiant de la technologie sélectionnée */
  const [selectValue, setSelectValue] = useState("0");
  /** @type {Array} Copie des projets pour gérer les filtres */
  const [copyProjects, setCopyProjects] = useState([]);
  /** @type {string} URL de base pour les requêtes API */
  const baseUrl = "http://localhost:1337";

  /**
   * Récupère les projets depuis l'API et les stocke.
   * @async
   */
  async function getProjects() {
    const request = await fetch(
      `${baseUrl}/api/projects?populate=cover&populate=technologies&populate=technologies.icon`
    );
    const response = await request.json();
    setProjects(response.data);
    setCopyProjects(response.data);
  }

  /**
   * Récupère les technologies depuis l'API et les stocke.
   * @async
   */
  async function getTechnologies() {
    const request = await fetch(`${baseUrl}/api/technologies?populate=icon`);
    const response = await request.json();
    setTechnologies(response.data);
  }

  /**
   * Effectue la récupération des données au montage du composant.
   */
  useEffect(() => {
    getProjects();
    getTechnologies();
  }, []);

  /**
   * Filtre les projets en fonction de la technologie sélectionnée.
   */
  useEffect(() => {
    let data = [...copyProjects];
    if (selectValue !== "0") {
      data = data.filter((project) =>
        project.technologies.some((techno) => techno.id === selectValue)
      );
    }
    setProjects(data);
  }, [selectValue]);

  return (
    <div>
      <h1>MES PROJETS</h1>

      {/* Sélecteur pour filtrer les projets par technologie */}
      <select onChange={(e) => setSelectValue(e.target.value)}>
        <option value="0">Sélectionner une techno</option>
        {technologies.map((techno) => (
          <option key={techno.id} value={techno.id}>
            {techno.name}
          </option>
        ))}
      </select>

      {/* Conteneur des projets */}
      <div className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h2>{project.title}</h2>

            {/* Affichage des icônes des technologies du projet */}
            {project.technologies.map((techno) => (
              <img
                key={techno.id}
                src={`${baseUrl}${techno.icon.url}`}
                width="30px"
              />
            ))}

            {/* Image de couverture du projet */}
            <img src={`${baseUrl}${project.cover.url}`} alt={project.title} />

            {/* Description du projet */}
            <p className="project-description">{project.description}</p>

            {/* Lien vers le projet sur GitHub */}
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

      {/* Section contact */}
      <section id="contact" className="sectionContact">
        <ContactForm />
      </section>

      {/* Pied de page */}
      <br />
      <footer className="footer">
        <p>2025 Porte Folio</p>
      </footer>
    </div>
  );
}

export default App;
