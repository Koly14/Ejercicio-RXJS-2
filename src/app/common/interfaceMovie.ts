// Para cargar todas las peliculas
export interface ApiResponseMovies {
  status: string
  data: Movie[]
  info: Info
}

// Para cargar una pelicula
export interface ApiResponseMovie {
  status: string
  data: Movie
}

export interface Movie {
  _id: string
  title: string
  year: number
  director: string
  plot: string
  poster: string
  genres?: any[]
}

export interface Info {
  total: number
  pageSize: string
  page: string
}

export interface StatusMessage {
  message: string
  error: string
  statusCode: number
}
