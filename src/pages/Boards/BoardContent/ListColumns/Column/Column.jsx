import AddCardIcon from '@mui/icons-material/AddCard'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import ListCards from './ListCards/ListCards'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useConfirm } from 'material-ui-confirm'
import { toast } from 'react-toastify'

import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { createNewCardAPI, deleteColumnDetailsAPI } from '~/apis'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'

function Column({ column }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })
  const dntKitColumnStyles = {
    // touchAction: 'none', // dành cho sensor default dạng PointerSensor
    // https://github.com/clauderic/dnd-kit/issues/117
    // Sử dụng Translate thay vì transform để kích thước column không bị thay đổi
    transform: CSS.Translate.toString(transform),
    transition,
    // Chiều cao phải luôn max 100% nếu không lỗi lúc kéo column ngắn qua một column dài thì phải kéo ở khu vực giữa (đây là bug)
    // Lưu ý: phải kết hợp với {...listeners} nằm ở trong Box thay vì ở ngoài div để tránh trường hợp lắng nghe vùng div xanh bên ngoài
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Card đã được sắp xếp ở component cha cao nhất (board/_id.jsx)
  const orderedCards = column.cards

  const [openNewCardForm, setopenNewCardForm] = useState(false)
  const toggleNewCardForm = () => setopenNewCardForm(!openNewCardForm)

  const [newCardTitle, setNewCardTitle] = useState('')

  const board = useSelector(selectCurrentActiveBoard)
  const dispatch = useDispatch()

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Card title is required')
      return
    }

    // Tạo mới dữ liệu column
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cập nhật dữ liệu State Board
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      // Nếu column rỗng (chỉ chứa placeholder-card) thì xoá placeholder-card đi
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        // Ngược lại Column đã có card thì thêm card mới vào cuối mảng
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    dispatch(updateCurrentActiveBoard(newBoard))

    // Đóng trạng thái thêm Card mới và reset title
    toggleNewCardForm()
    setNewCardTitle('')
  }

  // Xử lý xóa column
  const confirmDeleteColumn = useConfirm()
  const handlerDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete column?',
      description: 'This action will permanently delete this column and tag, you cannot undo it, please confirm if you want to do it!!',
      confirmationText: 'Delete',
      cancellationText: 'Cancel'
      // content: 'test content',

      // allowClose: false,
      // confirmationButtonProps: { color: 'error', variant: 'outlined' },
      // cancellationButtonProps: { color: 'inherit', variant: 'outlined' }
    }).then(() => {
      // Cập nhật dữ liệu State Board
      const newBoard = cloneDeep(board)
      newBoard.columns = newBoard.columns.filter(column => column._id !== column._id)
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)
      dispatch(updateCurrentActiveBoard(newBoard))

      // Gọi API để xoá column
      deleteColumnDetailsAPI(column._id).then(res => {
        toast.success(res?.deleteResult)
      })
    }).catch(() => {})
  }
  return (
    // Bọc div để fix chiều cao của column khi kéo thả
    <div
      ref={setNodeRef}
      style={dntKitColumnStyles}
      {...attributes}
    >
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          // bgcolor: (theme) => (theme.palette.mode === 'light' ? '#F1E7D8' : '#A5917B'),
          bgcolor: (theme) => (theme.palette.bgColumn.background),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.casani.boardContentHeight} - ${theme.spacing(5)})`
        }}>
        {/* Box Column Header */}
        <Box sx={{
          height: (theme) => theme.casani.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h6" sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#111111',
            cursor: 'pointer'
          }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More option'>
              <ExpandMoreIcon
                sx={{
                  color: '#111111',
                  cursor: 'pointer'
                }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem
                onClick={toggleNewCardForm}
                sx = {{
                  '&:hover': {
                    color: 'primary.dark',
                    '& .add-card-icon': {
                      color: 'primary.dark'
                    }
                  }
                }}
              >
                <ListItemIcon><AddCardIcon className="add-card-icon" fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              {/* <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem> */}
              <Divider />
              <MenuItem
                onClick={handlerDeleteColumn}
                sx = {{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-icon': {
                      color: 'warning.dark'
                    }
                  }
                }}
              >
                <ListItemIcon><DeleteIcon className="delete-icon" fontSize="small" /></ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
              {/* <MenuItem>
                <ListItemIcon><BookmarkBorderIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem> */}
            </Menu>
          </Box>
        </Box>
        {/* Box List Card */}
        <ListCards cards={orderedCards}/>
        {/* Box Column Footer */}
        <Box sx={{
          height: (theme) => theme.casani.columFooterHeight,
          p: 2
        }}>
          {!openNewCardForm
            ?
            <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button sx={{
                color: (theme) => (theme.palette.mode === 'light' ? '#315E8B' : '#C7E0FE')
              }}
              startIcon={<AddCardIcon />} onClick={toggleNewCardForm}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }}/>
              </Tooltip>
            </Box>
            : <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <TextField
                label="Enter card title"
                type="text"
                size='small'
                variant='outlined'
                autoFocus
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  '& label': { color: '#111111' },
                  '& input': {
                    color: (theme) => (theme.palette.input.color),
                    bgcolor: (theme) => (theme.palette.input.bgColor)
                  },
                  '& label.Mui-focused': { color: (theme) => theme.palette.input.color },
                  '& .MuiOutlinedInput-root':{
                    '& fieldset': { borderColor: (theme) => (theme.palette.input.borderColor) },
                    '&:hover fieldset': { borderColor: (theme) => (theme.palette.input.borderColor) },
                    '&.Mui-focused fieldset': { borderColor: (theme) => (theme.palette.input.borderColor) }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  onClick={addNewCard}
                  variant='contained'
                  size='small'
                  data-no-dnd="true"
                  sx={{
                    boxShadow: 'none',
                    border: '0,5px solid',
                    color: '#F2F2F2',
                    bgcolor: (theme) => (theme.palette.mode === 'light' ? '#315E8B' : '#315E8B'),
                    '&:hover': { bgcolor: (theme) => (theme.palette.mode === 'light' ? '#363857' : '#6D8590') }
                  }}
                >Add</Button>
                <CloseIcon
                  fontSize='small'
                  data-no-dnd="true"
                  sx={{ color: '#212121', cursor: 'pointer',
                    '&:hover': { color: (theme) => (theme.palette.close.warning) }
                  }}
                  onClick={toggleNewCardForm}
                />
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column