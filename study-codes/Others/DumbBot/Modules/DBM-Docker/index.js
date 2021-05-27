import React, { useState } from 'react';

import { Container, TitleBar, List, Active, Inactive } from './styles';

import {
  listAllConteiners,
  listActiveContainers,
  startOrStopContainer,
} from './docker';

const getAllContainersList = () => {
  let newAllContainerList = listAllConteiners();
  return newAllContainerList;
};

const getActiveContainersList = () => {
  let newActiveContainerList = listActiveContainers();
  return newActiveContainerList;
};

const listOfContainersWithStatus = () => {
  let newContainerList = getAllContainersList();
  let newActiveContainerList = getActiveContainersList();
  let containterListWithStatus = [];

  newContainerList.forEach((container) => {
    if (newActiveContainerList.includes(container)) {
      containterListWithStatus = [
        ...containterListWithStatus,
        {
          id: `${container.split(' ')[0]}`,
          status: 'active',
          icon: '✔',
          name: `${container.split(' ').splice(-1)[0]}`,
        },
      ];
    } else {
      containterListWithStatus = [
        ...containterListWithStatus,
        {
          id: `${container.split(' ')[0]}`,
          status: 'inactive',
          icon: '✖',
          name: `${container.split(' ').splice(-1)[0]}`,
        },
      ];
    }
  });

  return containterListWithStatus;
};

export default function DBMDocker() {
  const [containerList, setContainerList] = useState(
    listOfContainersWithStatus,
  );

  function handleUpdateContainers() {
    let newContainerList = listOfContainersWithStatus();
    setContainerList(newContainerList);
  }

  function handleStartStopContainer(containerCurrentStatus, containerId) {
    startOrStopContainer(containerCurrentStatus, containerId);
    handleUpdateContainers();
  }

  return (
    <Container>
      <TitleBar>
        <button onClick={() => handleUpdateContainers()}>↻</button>
        <h1>Containers</h1>
      </TitleBar>
      <List>
        {containerList.map((container) =>
          container.status === 'active' ? (
            <Active
              key={container.id}
              onClick={() =>
                handleStartStopContainer(container.status, container.id)
              }
            >
              <span>{container.icon}</span> {container.name}
            </Active>
          ) : (
            <Inactive
              key={container.id}
              onClick={() =>
                handleStartStopContainer(container.status, container.id)
              }
            >
              <span>{container.icon}</span> {container.name}
            </Inactive>
          ),
        )}
      </List>
    </Container>
  );
}
