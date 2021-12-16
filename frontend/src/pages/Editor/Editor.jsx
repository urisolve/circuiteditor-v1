// Custom hooks & components
import { useBoolean, useSchematic } from '../../hooks';
import { CompLib, ToolsMenu, SourceView } from '../../components/UI';
import { Schematic } from '../../components/Electrical';
import { voltageDivider as defaultCircuit } from '../../templates';

// Material-UI
import { Stack } from '@mui/material';

export function Editor({ ...rest }) {
  const { schematic, history, selection } = useSchematic(defaultCircuit);

  const compLib = useBoolean(true);
  const sourceView = useBoolean(false);

  return (
    <Stack direction='row' sx={{ flexGrow: 1 }}>
      <CompLib
        addToSchematic={schematic.add}
        open={compLib.value}
        onClose={compLib.off}
      />
      <Stack direction='column' sx={{ flexGrow: 1 }}>
        <ToolsMenu
          schematic={schematic}
          history={history}
          selection={selection}
          toggleSourceView={sourceView.toggle}
          toggleCompLib={compLib.toggle}
        />
        <Stack
          alignItems='center'
          justifyContent='center'
          sx={{ width: 3000, height: 3000 }}
        >
          <Schematic schematic={schematic} selection={selection} {...rest} />
        </Stack>
      </Stack>
      <SourceView
        code={schematic?.data}
        open={sourceView.value}
        onClose={sourceView.off}
      />
    </Stack>
  );
}
