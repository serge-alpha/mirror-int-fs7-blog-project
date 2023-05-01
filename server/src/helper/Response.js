const succesMessage=(res,status,mes,data)=>{
    res.status(status).json({
        message:mes,
        ok:true,
        data
    })
}

module.exports={succesMessage};