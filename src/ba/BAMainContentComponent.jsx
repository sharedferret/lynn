import React, { useState, useCallback } from 'react';

import BALogosRecommender from './BALogosRecommenderWorkflow';

export default function BAMainContentComponent() {
  /**
   * Component State
   */
  const [workflow, setWorkflow] = useState({
    role: null,
    tray: null,
  });
  const [plates, setPlates] = useState(null);

  const handleWorkflowUpdate = useCallback((e, data) => {
    setWorkflow({
      role: data.role,
      tray: data.tray,
    });
    setPlates(data.plates);
  }, [setWorkflow, setPlates]);

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
