import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Caravan, EmekaAmadiFound, Logicgraph, Yiieldy } from '../Assets'
import { Footer, Nav } from '../UI'

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://iamkavod-portfolio.vercel.app/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching the projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main>
      {/* Nav */}
      <Nav />

      {/* Projects Done */}
      <section>
        <div className="px-4 py-16 mx-auto max-w-screen-[1443px] md:px-24 lg:px-8 lg:py-20">
          <div className="projects-list flex flex-col justify-center items-center max-w-screen-[1443px]">
            {/* Render project with ID 1 */}
            {projects
              .filter(project => project.id === 1)
              .map(project => (
                <div key={project.id} className="project-card overflow-hidden transition-shadow duration-300 flex justify-center max-w-screen-[1443px]">
                  <a href={`https://www.yiieldy.com/`} target="_blank" rel="noopener noreferrer">
                    <img src={project.image_url} alt={project.name} className="custom-image-class lg:w-[90vw]" />
                  </a>
                </div>
              ))}

            <div className="grid gap-8 lg:grid-cols-2 justify-center mt-20 mx-auto">
              {projects
                .filter(project => project.id === 2 || project.id === 3)
                .map(project => (
                  <div key={project.id} className="project-card special-design-2-3 flex m-5 px-10">
                    <a href={project.id === 2 ? "https://logicgraph.io/" : "https://emekaamadifoundation.org/"} target="_blank" rel="noopener noreferrer">
                      <img src={project.image_url} alt={project.name} className="special-image-class w-full" />
                    </a>
                  </div>
                ))}
            </div>

            {projects
              .filter(project => project.id === 4)
              .map(project => (
                <div key={project.id} className="project-card overflow-hidden transition-shadow duration-300 flex justify-center max-w-screen-[1443px] mt-10">
                  <a href={`https://caravan.ng/`} target="_blank" rel="noopener noreferrer">
                    <img src={project.image_url} alt={project.name} className="custom-image-class lg:w-[90vw]" />
                  </a>
                </div>
              ))}

            {projects
              .filter(project => ![1, 2, 3, 4].includes(project.id))
              .map(project => (
                <div key={project.id} className="project-card">
                  <a href={``} target="_blank" rel="noopener noreferrer">
                    <img src={project.image_url} alt={project.name} className="default-image-class" />
                  </a>
                </div>
              ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </section>
    </main>
  )
}
