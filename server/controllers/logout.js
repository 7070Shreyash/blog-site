

const logout =  (req,res) => {
    res.cookie('token', '').json('ok');
}

export default logout;