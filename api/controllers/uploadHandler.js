module.exports = {
    uploadImage: (req, res, next) => {
        const {
            file,
            body: { name },
        } = req;
        console.log(file);
        res.send('File uploaded');
    },
};