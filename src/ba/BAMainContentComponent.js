import React from 'react';

import BALogosRecommender from './BALogosRecommenderWorkflow';
import { useState } from 'react';

export default function BAMainContentComponent() {
  /**
   * Component State
   */
  const [workflow, setWorkflow] = useState({
    role: null,
    tray: null
  });
  const [plates, setPlates] = useState(null);

  function handleWorkflowUpdate(e, data) {
    setWorkflow({
      role: data.role,
      tray: data.tray
    });
    setPlates(data.plates);
  }

  /**
   * Render Logic
   */
  return (
    <BALogosRecommender
      workflow={workflow}
      plates={plates}
      handleWorkflowUpdate={handleWorkflowUpdate}
    />
  );
}
