import { User } from 'src/shared/entity/User';
import { UserDto } from '../dto/UserDto';

export class UserMapper {
    public static toDomain(dto: UserDto) : User {
        let user = new User();
        user.login = dto.login;
        user.email = dto.email;
        user.name = dto.name;

        return user;
    };

    public static toDto(user: User[]) : UserDto[] {
        return user.map(u => {
            let dto = new UserDto();
            dto.email = u.email;
            dto.login = u.login;
            dto.name = u.name;

            return dto;
        });
    };
}
