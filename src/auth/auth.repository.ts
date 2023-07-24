import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthControllerDto } from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authCredentialsDto: AuthControllerDto): Promise<void> {
    const { userName, password } = authCredentialsDto;
    
    const salt = await bcrypt.genSalt();
    const user = new User();
    user.userName = userName;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);

    try {
      
      await user.save();
    } catch (error) {
      console.log(error)
      if(error.errno === 1062) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException()
      }
    }
  
  }

  async validateUserPassword(authCredentialsDto: AuthControllerDto): Promise<string> {
    const { userName, password } = authCredentialsDto;

    const user = await this.findOne({where: {userName}});
    if(user && await user.validatePassword(password)) {
      return user.userName
    } else {
      return null;
    }
  }
  

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  } 
}