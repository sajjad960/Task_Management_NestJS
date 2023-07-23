import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthControllerDto } from "./dto/auth.dto";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authCredentialsDto: AuthControllerDto): Promise<void> {
    const { userName, password } = authCredentialsDto;
    
    const user = new User();
    user.userName = userName;
    user.password = password;
    await user.save();
  
  }
}