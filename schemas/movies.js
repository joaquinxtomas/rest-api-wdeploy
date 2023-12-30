const z = require('zod')

const movieSchema = z.object({
    title:z.string({
        invalid_type_error:'Movie title must be a string',
        required_error:'Movie title is required.'
    }), 
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().min(20),
    rate: z.number().min(0).max(10).default(0),
    poster: z.string().url({
        message:'Poster dont be a valid url'
    }),
    genre: z.array(
        z.enum(['Action','Crime', 'Adventure','Comedy','Drama','Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
        {
            required_error: 'Movie genre is required.',
            invalid_type_error:'Movie genre must be an array of genres'
        }
    )
})

function validateMovie(object) {
    return movieSchema.safeParse(object)
}

function validatePartialMovie(input) {
    return movieSchema.partial().safeParse(input)
}

module.exports ={
    validateMovie,
    validatePartialMovie
}