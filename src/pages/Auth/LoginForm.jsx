import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/casani.svg'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utilities/validators'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { loginUserAPI } from '~/redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  let [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitLogin = (data) => {
    const { email, password } = data
    toast.promise(
      dispatch(loginUserAPI({ email, password })),
      { pending: 'Logging in...' }
    ).then(res => {
      // Phải kiểm tra xem res.error có tồn tại hay không, nếu không tồn tại thì mới chuyển hướng trang
      if (!res.error) navigate('/')
    })
  }

  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard 
          sx={{ 
            minWidth: 500, 
            maxWidth: 400, 
            marginTop: '6em',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box sx={{
            margin: '1.5em 1em 1em',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main', 
                width: 56, 
                height: 56,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
              }}
            >
              <LockIcon fontSize="large" />
            </Avatar>
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main', 
                width: 56, 
                height: 56,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
              }}
            >
              <TrelloIcon />
            </Avatar>
          </Box>
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ 
              textAlign: 'center', 
              fontWeight: 'bold', 
              mt: 2,
              color: 'primary.main'
            }}
          >
            Sign In
          </Typography>
          <Box sx={{ marginTop: '0.5em', display: 'flex', justifyContent: 'center', color: theme => theme.palette.grey[500] }}>
            Author: Casani
          </Box>
          <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 1.5em' }}>
            {verifiedEmail &&
            <Alert severity="success" sx={{ 
              '.MuiAlert-message': { overflow: 'hidden' },
              mb: 2
            }}>
              Your email&nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{verifiedEmail}</Typography>
              &nbsp;has been verified.<br />Now you can login to enjoy our services! Have a good day!
            </Alert>
            }
            {registeredEmail &&
            <Alert severity="info" sx={{ 
              '.MuiAlert-message': { overflow: 'hidden' },
              mb: 2
            }}>
              An email has been sent to&nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{registeredEmail}</Typography>
              <br />Please check and verify your account before logging in!
            </Alert>
            }
          </Box>
          <Box sx={{ padding: '0 1.5em 1.5em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                autoFocus
                fullWidth
                label="Enter Email..."
                type="text"
                variant="outlined"
                error={!!errors['email']}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'email'} />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Enter Password..."
                type="password"
                variant="outlined"
                error={!!errors['password']}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password'} />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1.5em 1.5em' }}>
            <Button
              className="interceptor-loading"
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ 
                borderRadius: '8px', 
                padding: '10px 0',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0,0,0,0.25)'
                }
              }}
            >
              Login
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1.5em 1.5em', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>New to Cassani?</Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography variant="body1" sx={{ 
                fontWeight: 'bold',
                color: 'primary.main', 
                '&:hover': { 
                  color: '#ffbb39' 
                } 
              }}>
                Create account!
              </Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm