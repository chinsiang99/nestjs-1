import { ProfileRepository } from 'src/entities/Profile.entity';
import { PostRepository } from 'src/entities/Posts.entity';
import { UserRepository } from "./User.entity";

export {UserRepository, PostRepository, ProfileRepository}

const entities = [UserRepository, PostRepository, ProfileRepository]

export default entities;