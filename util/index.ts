import express,{Request, Response, NextFunction} from "express";

export function UserDisplayName(req : Request) : String
{
    if (req.user){
        let user = req.user as UserDocument;
        return user.DisplayName.toString();
    }
    return '';

}

export function AuthGaurd(req: Request, res: Response, next: NextFunction): void
{
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next();
}