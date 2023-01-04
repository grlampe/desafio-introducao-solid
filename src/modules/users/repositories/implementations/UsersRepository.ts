import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    return this.users.find((users) => users.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((users) => users.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const userFind = this.users.find(
      (users) => users.email === receivedUser.email
    );

    userFind.admin = true;
    userFind.updated_at = new Date();

    return userFind;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
