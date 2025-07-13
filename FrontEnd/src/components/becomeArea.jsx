import {
  ArrowForward as NextIcon,
  ArrowBack as PrevIcon,
} from '@mui/icons-material'
import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { useIsMobile } from '../contexts/isMobileContext'

export default function BecomeArea() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { isAuthenticated, userType } = useAuth()
  const { theme } = useIsMobile()

  const slides = [
    {
      image: '/carousel-1.jpg',
      subtitle: 'Solar Energy',
      title: 'Innovative Solar Solution',
    },
    {
      image: '/carousel-2.jpg',
      subtitle: 'Solar Energy',
      title: 'Let The Sun Work',
    },
  ]

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const slidesList = slides.map((slide, index) => (
    <Box
      key={index}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: activeIndex === index ? 1 : 0,
        transition: 'opacity 0.5s ease',
        zIndex: activeIndex === index ? 1 : 0,
      }}
    >
      <Box
        component="img"
        src={slide.image}
        alt={`Slide ${index + 1}`}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
        }}
      />

      {/* Caption */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 2,
          px: 2,
        }}
      >
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            maxWidth: 900,
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              letterSpacing: 3,
              mb: 2,
              textTransform: 'uppercase',
              fontWeight: 400,
              color: 'white',
              fontSize: { xs: '1rem', md: '1.5rem' },
            }}
          >
            {slide.subtitle}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3.5rem' },
              fontFamily: theme.typography.fontFamily,
              color: 'white',
              lineHeight: { xs: 1.2, md: 1.5 },
            }}
          >
            {slide.title}
          </Typography>

          {isAuthenticated ? (
            <Button
              component={Link}
              to={userType === 'admin' ? '/admin' : '/leader'}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 1,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
              }}
              href=""
            >
              Go to Dashboard
            </Button>
          ) : (
            ''
          )}
        </Paper>
      </Box>
    </Box>
  ))

  return (
    <Box
      id="home"
      sx={{
        width: '100%',
        height: { xs: '70vh', sm: '80vh', md: '100vh' },
        minHeight: 400,
        position: 'relative',
        overflow: 'hidden',
        mb: 5,
        pb: 5,
      }}
    >
      {/* Slides */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {slidesList}
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: { xs: 5, md: 20 },
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          width: { xs: 48, md: 68 },
          height: { xs: 48, md: 68 },
          zIndex: 3,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
          '& svg': {
            fontSize: { xs: '1.5rem', md: '2rem' },
          },
        }}
      >
        <PrevIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: { xs: 5, md: 20 },
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          width: { xs: 48, md: 68 },
          height: { xs: 48, md: 68 },
          zIndex: 3,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
          '& svg': {
            fontSize: { xs: '1.5rem', md: '2rem' },
          },
        }}
      >
        <NextIcon />
      </IconButton>

      {/* Indicators for mobile */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 3,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setActiveIndex(index)}
            sx={{
              width: { xs: 10, md: 12 },
              height: { xs: 10, md: 12 },
              borderRadius: '50%',
              bgcolor: activeIndex === index ? 'primary.main' : 'grey.400',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
