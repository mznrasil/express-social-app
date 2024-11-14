import {
  IUserRepository,
  UserRepository
} from "../repositories/user.repository";
import { User } from "../entity/User.entity";
import { ConflictError } from "../utils/errors";
import { Post } from "../entity/Post.entity";
import { PostService } from "./post.service";
import { Pagination } from "../utils/responseWrapper";

export class UserService {
  private userRepository: IUserRepository;
  private postService: PostService;

  constructor() {
    this.userRepository = new UserRepository();
    this.postService = new PostService();
  }

  async followUser(userId: number, followedUserId: string) {
    if (userId === parseInt(followedUserId)) {
      throw new ConflictError({ message: "User cannot follow themselves" });
    }
    await this.userRepository.followUser(userId, parseInt(followedUserId));
  }

  async unfollowUser(userId: number, unfollowedUserId: string) {
    if (userId === parseInt(unfollowedUserId)) {
      throw new ConflictError({ message: "User cannot unfollow themselves" });
    }
    await this.userRepository.unfollowUser(userId, parseInt(unfollowedUserId));
  }

  async getFollowers(userId: number): Promise<User[]> {
    return await this.userRepository.getFollowers(userId);
  }

  async getFollowing(userId: number): Promise<User[]> {
    return await this.userRepository.getFollowing(userId);
  }

  async getFeed(userId: number): Promise<{ posts: Post[]; meta: Pagination }> {
    const { posts, meta } = await this.postService.getUserFeed(userId, {
      limit: "10",
      offset: "0",
      q: ""
    });
    return { posts, meta };
  }
}
