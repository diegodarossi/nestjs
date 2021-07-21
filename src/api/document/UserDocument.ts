import j2s from 'joi-to-swagger';
import { UserDtoSchema } from "src/application/schema/UserDtoSchema";
import { IDocumentOptions } from "../infrastructure/IDocumentOptions";

export class UserDocument {
    static post: IDocumentOptions = {
        ApiBody: {
            schema: j2s(UserDtoSchema).swagger,
        },
    }

    static read: IDocumentOptions = {
        ApiOkResponse: {
            description: 'Consultation performed successfully!',
            schema: { type: 'array', items: j2s(UserDtoSchema).swagger }
        },
    }
}