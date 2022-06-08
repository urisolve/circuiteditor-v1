import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useBoolean, useRelativeTime } from '../../hooks';
import { constants } from '../../constants';

export function CircuitCard({ circuit, onDelete, onDownload, onStar }) {
  const { t } = useTranslation();
  const relativeTime = useRelativeTime(circuit.createdAt);
  const dialog = useBoolean(false);

  return (
    <>
      <Card
        variant='outlined'
        sx={{
          width: constants.CARD_WIDTH,
          height: constants.CARD_HEIGHT,
          backgroundColor: 'grey.50',
        }}
      >
        <CardActionArea
          component={Link}
          to={`/editor/${circuit._id}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <CardMedia
            image={circuit.thumbnail}
            src={circuit.name}
            sx={{
              flexGrow: 1,
              width: constants.CARD_WIDTH,
              height: constants.CARD_HEIGHT / 2,
              backgroundColor: 'gray',
              objectPosition: '50% 50%',
            }}
          />

          <CardHeader
            title={circuit.name}
            titleTypographyProps={{ noWrap: true }}
            subheader={t('common.createdAtRelativeTime', { relativeTime })}
          />
        </CardActionArea>

        <CardActions>
          <Tooltip title={t('common.download')} arrow>
            <IconButton onClick={onDownload}>
              <GetAppIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('common.delete')} arrow>
            <IconButton onClick={dialog.on}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip
            title={
              circuit.isStared
                ? t('page.circuits.action.unfavorite')
                : t('page.circuits.action.favorite')
            }
            arrow
          >
            <IconButton onClick={onStar}>
              {circuit.isStared ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      <Dialog open={dialog.value} onClose={dialog.off}>
        <DialogTitle>{t('dialog.deleteCircuit.title')}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {t('dialog.deleteCircuit.description')}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={dialog.off} color='primary'>
            {t('form.action.cancel')}
          </Button>
          <Button onClick={onDelete} color='primary'>
            {t('form.action.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
