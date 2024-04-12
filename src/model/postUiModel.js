export class Post {
  constructor(
    postId = null,
    title = null,
    content = null,
    createdAt = null,
    updatedAt = null,
    postStatus = null
  ) {
    this.postId = postId;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.postStatus = postStatus;
  }
}
