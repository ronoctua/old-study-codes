import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight, FiSearch, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import {
  Topbar,
  Content,
  Sidebar,
  Logo,
  Form,
  Repositories,
  RepositoryInfo,
  Error,
} from './styles';

interface Repository {
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  full_name: string;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  size: number;
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositoryToShow, setRepositoryToShow] = useState<string | null>(null);
  const [repositoryData, setRepositoryData] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GitHubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleShowRepository(repositoryName: string): Promise<void> {
    api.get(`repos/${repositoryName}`).then((response) => {
      setRepositoryData(response.data);
    });

    api.get(`repos/${repositoryName}/issues`).then((response) => {
      setIssues(response.data);
    });
  }

  useEffect(() => {
    if (repositoryToShow !== null) {
      handleShowRepository(repositoryToShow);
    }
  }, [repositoryToShow]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('You need type: author/repository_name!');
      return;
    }

    try {
      const response = await api.get<Repository>(`/repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Error in finding this repository.');
    }
  }

  function handleRemoveRepository(repositoryFullName: string): void {
    let newRepositories: Repository[] = [];
    repositories.forEach((repository) => {
      if (repository.full_name !== repositoryFullName) {
        newRepositories = [...newRepositories, repository];
      }
    });
    setRepositories(newRepositories);
    setRepositoryData(null);
  }

  return (
    <>
      <Topbar>
        <Logo>
          <img src={logoImg} alt="GitHub Explorer" />
        </Logo>

        <Form hasError={!!inputError} onSubmit={handleAddRepository}>
          <input
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
            placeholder="Type the repository name here"
          />
          <button type="submit">
            <FiSearch size={20} />
          </button>
        </Form>

        {inputError && <Error>{inputError}</Error>}
      </Topbar>

      <Content>
        <Sidebar>
          <Repositories>
            {repositories.map((repository) => (
              <button
                type="submit"
                key={repository.full_name}
                onClick={() => setRepositoryToShow(repository.full_name)}
              >
                <img
                  src={repository.owner.avatar_url}
                  alt={repository.owner.login}
                />
                <div>
                  <strong>{repository.full_name}</strong>
                  <p>{repository.description}</p>
                </div>

                <FiChevronRight size={20} />
              </button>
            ))}
          </Repositories>
        </Sidebar>

        <RepositoryInfo>
          {repositoryData !== null && (
            <div className="all-content">
              <div className="repository-bar">
                <div className="navigation-address-box">
                  <a href={repositoryData.owner.html_url}>
                    {repositoryData.owner.login}
                  </a>
                  <strong>
                    <span> ❱ </span>
                    <a href={repositoryData.html_url}>{repositoryData.name}</a>
                  </strong>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={() => {
                      handleRemoveRepository(repositoryData.full_name);
                    }}
                  >
                    <FiTrash2 size={23} />
                  </button>
                </div>
              </div>
              <div className="box-info-and-avatar">
                <div className="repository-info">
                  <p>
                    <strong>Repository: </strong>
                    {repositoryData.name}
                  </p>
                  <p>
                    <strong>Owner: </strong>
                    {repositoryData.owner.login}
                  </p>
                  <p>
                    <strong>Size: </strong>
                    {(repositoryData.size / 1000).toFixed(2)} MB
                  </p>
                  <p>
                    <strong>Stars: </strong>
                    {repositoryData.stargazers_count}
                  </p>
                  <p>
                    <strong>Forks: </strong>
                    {repositoryData.forks_count}
                  </p>
                  <p>
                    <strong>Open issues: </strong>
                    {repositoryData.open_issues_count}
                  </p>
                  <p>
                    <strong>Predominant language: </strong>
                    {repositoryData.language}
                  </p>
                </div>
                <div className="avatar">
                  <a href={repositoryData.owner.html_url}>
                    <img
                      src={repositoryData.owner.avatar_url}
                      alt={repositoryData.owner.login}
                    />
                  </a>
                </div>
              </div>
              <div className="description">
                <p>
                  <strong>DESCRIPTION</strong>
                </p>
                <p className="description-text">
                  <span>{repositoryData.description}</span>
                </p>
              </div>
              <div className="issues">
                <p>
                  <strong>ISSUES </strong>
                </p>
                {issues.map((issue) => (
                  <a key={issue.id} href={issue.html_url}>
                    <div>
                      <strong>{issue.title}</strong>
                      <p>{issue.user.login}</p>
                    </div>

                    <FiChevronRight size={20} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </RepositoryInfo>
      </Content>
    </>
  );
};

export default Dashboard;
