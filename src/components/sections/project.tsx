import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IProject } from '../../content';

const Project = ({ project }: { project: IProject }) => {
  const { title, description, github, keywords } = project;

  return (
    <div>
      <div className="">
        <h4>{title}</h4>
        <ul className="">
          {github && (
            <li>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          )}
        </ul>
      </div>
      <p>{description}</p>
      <ul className="">{keywords && keywords.map((item) => <li key={item.toString()}>{item}</li>)}</ul>
    </div>
  );
};

export default Project;
