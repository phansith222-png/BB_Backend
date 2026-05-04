import { ZodError } from "zod";


export default function (err,req,res,next) {
    if (process.env.NODE_ENV !== 'production') console.log(err)
    if(err instanceof ZodError){
        return res.status(400).json({
            success: false,
            errors: err.flatten().fieldErrors
        })
    }
    res.status(err.status || 500)
    res.json({
        status:err.status || 500,
        message: err.message
    })
}