import { ApiBodyOptions, ApiParamOptions, ApiResponseOptions } from "@nestjs/swagger";

export interface IDocumentOptions {
    ApiParam?: ApiParamOptions[];

    ApiBody?: ApiBodyOptions;

    ApiOkResponse?: ApiResponseOptions;

    ApiAcceptedResponse?: ApiResponseOptions;

    ApiNotFoundResponse?: ApiResponseOptions;

    ApiBadRequestResponse?: ApiResponseOptions;

    ApiUnprocessableEntityResponse?: ApiResponseOptions;
}