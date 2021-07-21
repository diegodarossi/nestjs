import { Company } from 'src/shared/entity/Company';
import { CompanyDto } from '../dto/CompanyDto';

export class CompanyMapper {
    public static toDomain(dto: CompanyDto) : Company {
        let company = new Company();
        company.code = dto.code;
        company.corporateName = dto.corporateName;

        return company;
    };

    public static toDto(company: Company[]) : CompanyDto[] {
        return company.map(u => {
            let dto = new CompanyDto();
            dto.code = u.code;
            dto.corporateName = u.corporateName;

            return dto;
        });
    };
}
