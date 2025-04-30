import { Link, useNavigate } from 'react-router-dom'
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
import { useForm } from 'react-hook-form'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE
} from '~/utilities/validators'
import { toast } from 'react-toastify' 
import { registerUserAPI } from '~/apis'

function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()
  const submitRegister = (data) => {
    const { email, password } = data
    toast.promise(
      registerUserAPI({ email, password }),
      { pending: 'Registering...' }
    ).then(user => {
      navigate(`/login?registeredEmail=${user.email}`)
    })
  }

  return (
    <form onSubmit={handleSubmit(submitRegister)}>
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
            Create Account
          </Typography>
          <Box sx={{ marginTop: '0.5em', display: 'flex', justifyContent: 'center', color: theme => theme.palette.grey[500] }}>
            Author: Casani
          </Box>
          <Box sx={{ padding: '0 1.5em 1.5em' }}>
            <Box sx={{ marginTop: '1.5em' }}>
              <TextField
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
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Enter Password Confirmation..."
                type="password"
                variant="outlined"
                error={!!errors['password_confirmation']}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
                {...register('password_confirmation', {
                  validate: (value) => {
                    if (value === watch('password')) return true
                    return PASSWORD_CONFIRMATION_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password_confirmation'} />
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
              Register
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1.5em 1.5em', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Already have an account?</Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body1" sx={{ 
                fontWeight: 'bold',
                color: 'primary.main', 
                '&:hover': { 
                  color: '#ffbb39' 
                } 
              }}>
                Log in!
              </Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default RegisterForm