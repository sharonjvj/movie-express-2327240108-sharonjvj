import MovieModel from "../models/movieModel.js";


//READ
export const movieList = async (req,res) => {
    try {
        const data = await MovieModel.find({})

        res.status(200).json({
            message : "Movie List",
            data : data
        })
    } catch (error) {
        res.status(500).json({
            message : error.message,
            data : null
        })
    }
}


//CREATE
export const addMovie = async (req,res) => {
    try {
        const newMovie = await MovieModel.create(req.body);

        res.status(201).json({
        message: "Movie berhasil ditambahkan",
        data: newMovie,
        });
    } catch (error) {
        res.status(500).json({
        message: error.message,
        data: null,
        });
    }
};


//UPDATE
export const updateMovie = async (req,res) => {
    try {
        const id = req.params?.id
        const request = req.body

        if(!id){
            return res.status(500).json({
                movies : "Id wajib diisi",
                data : null
            })
        }

        const response = await MovieModel.findByIdAndUpdate(id, {
            judul : request.judul,
            tahunRilis : request.tahunRilis,
            sutradara : request.sutradara
         })

        if(!response){
            return res.status(500).json({
                movies : "Data gagal diupdate",
                data : null
            })
        }

        return res.status(200).json({
            movies: "Data berhasil diupdate"
        })

    } catch (error) {
        res.status(500).json({
            movies : error,
            data : null
        })
    }
}

//DELETE
export const deleteMovie = async (req,res) => {
    try {
        const id = req.params.id

        if(!id){
            return res.status(500).json({
                movies : "Id wajib diisi",
                data : null
            })
        }

        const response = await MovieModel.findByIdAndDelete(id);

        if(response){
            return res.status(200).json({
                movies : "Data berhasil dihapus",
                data : null
            })
        }

        return res.status(404).json({
                movies : "Data tidak ditemukan!",
                data : null
            })

    } catch (error) {
        res.status(500).json({
            movies : error.message,
            data : null
        })
    }
}