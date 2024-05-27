import { useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns, createNewColumn, createNewCard }) {
  const [openNewColumnForm, setopenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setopenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Column title is required')
      return
    }

    // Tạo mới dữ liệu column
    const newColumnData = { title: newColumnTitle }


    await createNewColumn(newColumnData)
    // Đóng trạng thái thêm Column mới và reset title
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* Box 1 */}
        {columns?.map(column => <Column key={column._id} column={column} createNewCard={createNewCard}/> )}

        {/* Box Add new Column */}
        {!openNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: (theme) => (theme.palette.bgColumn.hold)
          }}
          >
            <Button startIcon={<PlaylistAddIcon />}
              sx={{
                color: (theme) => (theme.palette.mode === 'light' ? '#315E8B' : '#A5917B'),
                bgcolor: (theme) => (theme.palette.button.background),
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
            >
              Add new column
            </Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: (theme) => (theme.palette.bgColumn.background),
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title"
              type="text"
              size='small'
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: (theme) => (theme.palette.input.color) },
                '& input': { color: (theme) => (theme.palette.input.color) },
                '& label.Mui-focused': { color: (theme) => (theme.palette.input.color) },
                '& .MuiOutlinedInput-root':{
                  '& fieldset': {
                    borderColor: (theme) => (theme.palette.input.borderColor)
                  },
                  '&:hover fieldset': {
                    borderColor: (theme) => (theme.palette.input.borderColor)
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: (theme) => (theme.palette.input.borderColor)
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant='contained'
                size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0,5px solid',
                  color: '#F2F2F2',
                  bgcolor: (theme) => (theme.palette.mode === 'light' ? '#315E8B' : '#315E8B'),
                  '&:hover': { bgcolor: (theme) => (theme.palette.mode === 'light' ? '#363857' : '#6D8590') }
                }}
              >Add Column</Button>
              <CloseIcon
                fontSize='small'
                sx={{ color: '#212121', cursor: 'pointer',
                  '&:hover': { color: (theme) => (theme.palette.close.warning) }
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns