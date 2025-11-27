import MovieModel from "../models/movieModel.js";


//READ
export const movies = async (req,res) => {
    try {
        const movies = await MovieModel.find({
            createdBy : req.user?.user_id
        }).sort({ createdAt : -1});

        return res.status(200).json({
            message : "Daftar semua Movie",
            data : movies
        })
    } catch (error) {
        res.status(500).json({
            message : "Terjadi kesalahan pada server",
            error: error.message,
            data : null
        })
    }
}


//CREATE
export const addNewMovie = async (req,res) => {
    try {
        const { judul, tahunRilis, sutradara } = req.body;

        if (!judul || !tahunRilis || !sutradara) {
            return res.status(400).json({
                message: "Semua field (judul, tahunRilis, sutradara) wajib diisi",
                data: null
            });
        }

        //Menyimpan user_id pembuat ke database
        const movie = await MovieModel.create({judul, tahunRilis, sutradara, createdBy: req.user?.user_id});

        res.status(201).json({
            message: "Berhasil menambahkan movie baru",
            data: movie,
        });
    } catch (error) {
        res.status(500).json({
        message: "Gagal menambahkan movie",
        error: error.message,
        data: null,
        });
    }
};

//DETAIL MOVIE
export const detailMovie = async (req,res) => {
    try {
        const { id } = req.params;

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "ID tidak valid", data: null});
        }

        const movie = await MovieModel.findOne({
            _id : id,
            createdBy : req.user?.user_id
        });

        if(!movie){
            return res.status(404).json({ message: "Movie tidak ditemukan", data: null});
        }

        return res.status(200).json({ message: "Detail Movie", data: movie});
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error : error.message,
            data : null
        })
    }
}

//UPDATE
export const updateMovie = async (req,res) => {
    try {
        const { id } = req.params;
        const { judul, tahunRilis, sutradara } = req.body;

        if(!id || mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "ID tidak valid", data: null });
        }

        //Update hanya jika ID cocok DAN user pembuat cocok
        const updatedMovie = await MovieModel.findOneAndUpdate(
            {
                _id : id,
                createdBy : req.user?.user_id
            },
            {judul, tahunRilis, sutradara},
            {new: true}
        );

        if(!updatedMovie){
            return res.status(404).json({ message: "Movie tidak ditemukan atau akses ditolak", data: null})
        }

        return res.status(200).json({
            message: "Berhasil mengupdate movie",
            data: updatedMovie
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error : error.message,
            data : null
        })
    }
}

//DELETE
export const deleteMovie = async (req,res) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ message: "ID tidak valid", data: null});
        }

        //Hapus hanya jika ID cocok DAN user pembuat cocok
        const deletedMovie = await MovieModel.findOneAndDelete({
            _id : id,
            createdBy : req.user?.user_id
        });

        if(!deletedMovie){
            return res.status(404).json({ message: "Movie tidak ditemukan atau akses ditolak", data: null });
        }

        return res.status(200).json({
                message: "Berhasil menghapus movie",
                data: deletedMovie
            })

    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error : error.message,
            data : null
        })
    }
}