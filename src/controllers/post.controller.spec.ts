import { PostController } from "./post.controller";
import { Request, Response } from "express";
import { PostService } from "../services/post.service";
import { UserRole } from "../entity/User.entity";
import { Post } from "../entity/Post.entity";
import { Pagination } from "../utils/responseWrapper";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { zParse } from "../utils/zParse";
import { ZodObject } from "zod";

jest.mock("../services/post.service");
const mockSchema = {
  parseAsync: jest.fn()
} as unknown as ZodObject<never>;

describe("Posts Controller", () => {
  let postService: jest.Mocked<PostService>;
  let controller: PostController;
  let request: Partial<Request>;
  let response: Partial<Response>;

  const user = {
    id: 1,
    roles: [UserRole.USER],
    iat: 123,
    exp: 123
  };
  const createdPost = {
    id: 1,
    title: "Test title",
    content: "Test Content",
    tags: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: null,
    userId: user.id,
    comments: []
  } satisfies Post;

  beforeEach(() => {
    jest.clearAllMocks();

    (PostService as jest.MockedClass<typeof PostService>).mockClear();
    postService = new PostService() as jest.Mocked<PostService>;

    controller = new PostController(postService);

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe("Create Post", () => {
    const payload = {
      title: "Test title",
      content: "Test content"
    };

    const expectedResponse = {
      data: createdPost,
      meta: undefined,
      message: "Post Created Successfully",
      status: 201
    };

    beforeEach(() => {
      jest.spyOn(postService, "createPost").mockResolvedValue(createdPost);
    });

    it("should create post successfully", async () => {
      request = { body: payload, user };
      await controller.createPost(request as Request, response as Response);

      expect(postService.createPost).toHaveBeenCalledWith({
        ...payload,
        userId: user.id
      });
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(expectedResponse);
    });

    it("should throw validation error when required field is missing", async () => {
      request = { body: { content: "This is content" }, user };

      await expect(
        controller.createPost(request as Request, response as Response)
      ).rejects.toThrow();
    });
  });

  describe("Get All Posts", () => {
    let posts: Post[];
    const meta: Pagination = {
      limit: 10,
      total: 10,
      page: 1,
      totalPages: 1
    };

    beforeEach(() => {
      posts = [createdPost];
      jest.spyOn(postService, "getPosts").mockResolvedValue({ posts, meta });
    });

    it("should return a list of posts", async () => {
      request = {
        query: {
          limit: "10",
          offset: "0",
          q: ""
        }
      };
      const expectedResponse = {
        data: posts,
        meta: meta,
        status: 200,
        message: "Posts Fetched Successfully"
      };

      await controller.getPosts(request as Request, response as Response);

      expect(postService.getPosts).toHaveBeenCalledWith(request.query);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("Get A Post", () => {
    it("should return a post when provided with valid Post ID", async () => {
      jest.spyOn(postService, "getPostById").mockResolvedValue(createdPost);

      request = {
        params: { id: "1" }
      };
      const expectedResponse = {
        data: createdPost,
        status: 200,
        message: "Post Fetched Successfully"
      };

      await controller.getPostById(request as Request, response as Response);

      expect(postService.getPostById).toHaveBeenCalledWith(request.params.id);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(expectedResponse);
    });

    it("should throw an error when provided with invalid post ID", async () => {
      jest
        .spyOn(postService, "getPostById")
        .mockRejectedValue(new NotFoundError({ message: "Post not found" }));

      request = {
        params: { id: "100" }
      };

      await expect(
        controller.getPostById(request as Request, response as Response)
      ).rejects.toThrow();

      expect(postService.getPostById).toHaveBeenCalled();
      expect(postService.getPostById).toHaveBeenCalledWith(request.params.id);
    });
  });

  describe("Update a Post", () => {
    it("should throw an error when user is not provided", async () => {
      request = {
        body: { title: "This is a title" }
      };

      (mockSchema.parseAsync as jest.Mock).mockRejectedValue(
        new BadRequestError({ message: "User is required" })
      );

      await expect(zParse(request as Request, mockSchema)).rejects.toThrow();
      expect(postService.getPostById).not.toHaveBeenCalled();
    });

    it("should throw an error when no payload is provided", async () => {
      request = { body: {} };
      jest
        .spyOn(postService, "updatePost")
        .mockRejectedValue(
          new BadRequestError({ message: "Payload is required" })
        );

      await expect(
        controller.updatePost(request as Request, response as Response)
      ).rejects.toThrow();
    });

    it("should throw an error when Post ID is not found", async () => {
      request = { params: { id: "100" } };
      jest
        .spyOn(postService, "updatePost")
        .mockRejectedValue(new NotFoundError({ message: "Post not found" }));

      await expect(
        controller.updatePost(request as Request, response as Response)
      ).rejects.toThrow();
    });

    it("should update the post", async () => {
      request = {
        params: { id: "1" },
        body: { title: "This is a title" },
        user
      };
      jest.spyOn(postService, "updatePost").mockResolvedValue(createdPost);

      await controller.updatePost(request as Request, response as Response);

      expect(postService.updatePost).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });
});
