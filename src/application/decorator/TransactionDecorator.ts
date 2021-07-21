import { BaseAppService } from "../app-service/BaseAppService";

export const Transaction = (autoCommit: boolean = true): MethodDecorator => {
    return (
        target: Object,
        key: string | symbol,
        descriptor: PropertyDescriptor,
    ) => {
        const method = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            if (!(this instanceof BaseAppService)) {
                return await method.apply(this, args);
            }

            let base = this as BaseAppService;

            try {
                await base.unitOfWork.startTransaction();
                let retorno = await method.apply(this, args);

                if (autoCommit) {
                    await base.unitOfWork.commit();
                }

                return retorno;
            } catch (error) {
                await base.unitOfWork.rollback();
                throw error;
            } finally {
                await base.unitOfWork.releaseConnection();
            }
        };

        return descriptor;
    };
};