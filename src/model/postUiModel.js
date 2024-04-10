export class Post {
  constructor(
    title = null,
    content = null,
    createdAt = null,
    updatedAt = null,
    postStatus = null
  ) {
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.postStatus = postStatus;
  }
}
