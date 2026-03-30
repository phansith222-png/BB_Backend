export default function (req,res,next) {
    res.status(404).json({
        message : 'This path have no service'
    })
}