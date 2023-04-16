import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';
import users from "../routes/users";


const UserSchema = new Schema(
    {
            displayName: String,
            emailAddress: String,
            username: String,
            created: {
                    type: Date,
                    default: Date.now()
            },
            updated: {
                    type: Date,
                    default: Date.now()
            }
    },
        {
                collection: "users"
        }

    );
declare global
{
        export type UserDocument = mongoose.Document &
            {
                    username: string,
                    EmailAddress: string,
                    DisplayName: string
            }
}

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);