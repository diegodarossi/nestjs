import { applyDecorators } from "@nestjs/common";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { IDocumentOptions } from "../IDocumentOptions";

export const Document = (document: IDocumentOptions) => {
    let retorno:MethodDecorator[] = [];

    if (document.ApiParam != null) {
        document.ApiParam.forEach(param => retorno.push(ApiParam(param)));
    }

    if (document.ApiBody != null) {
        retorno.push(ApiBody(document.ApiBody));
    }

    if (document.ApiOkResponse != null) {
        retorno.push(ApiOkResponse(document.ApiOkResponse));
    }

    if (document.ApiAcceptedResponse != null) {
        retorno.push(ApiAcceptedResponse(document.ApiAcceptedResponse))
    }

    if (document.ApiNotFoundResponse != null) {
        retorno.push(ApiNotFoundResponse(document.ApiNotFoundResponse));
    }

    if (document.ApiBadRequestResponse != null) {
        retorno.push(ApiBadRequestResponse(document.ApiBadRequestResponse));
    }

    if (document.ApiUnprocessableEntityResponse != null) {
        retorno.push(ApiUnprocessableEntityResponse(document.ApiUnprocessableEntityResponse));
    }

    return applyDecorators(...retorno);
};

