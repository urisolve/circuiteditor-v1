import React, { useState } from 'react';

// Custom components
import BugReport from './BugReport';
import Import from './Import';
import Settings from './Settings';

// Material-UI
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import BugReportIcon from '@material-ui/icons/BugReport';

// Include Draw2D
import 'import-jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import jquery from 'jquery';
import draw2d from 'draw2d';
window.$ = window.jQuery = jquery;

function ExternalTools({ canvas, toggleTheme }) {
  const [bugReportOpen, setBugReportOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const tools = [
    {
      name: 'Report a Bug',
      icon: <BugReportIcon />,
      onClick: () => setBugReportOpen(true),
    },
    {
      name: 'Import',
      icon: <PublishIcon />,
      onClick: () => setImportOpen(true),
    },
    {
      name: 'Export',
      icon: <GetAppIcon />,
      onClick: () => {
        let writer = new draw2d.io.json.Writer();
        writer.marshal(canvas.current, (json) => {
          console.log(json);
        });
      },
    },
    {
      name: 'Settings',
      icon: <SettingsIcon />,
      onClick: () => setSettingsOpen(true),
    },
  ];

  return (
    <>
      {tools.map((tool) => (
        <Tooltip key={tool.name} title={tool.name} arrow>
          <IconButton
            onClick={tool.onClick}
            aria-label={tool.name}
            disabled={tool.disabled || false}
          >
            {React.cloneElement(tool.icon, { style: { color: 'white' } })}
          </IconButton>
        </Tooltip>
      ))}

      <BugReport open={bugReportOpen} onClose={() => setBugReportOpen(false)} />
      <Import open={importOpen} onClose={() => setImportOpen(false)} />
      <Settings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        toggleTheme={toggleTheme}
      />
    </>
  );
}

export default ExternalTools;
