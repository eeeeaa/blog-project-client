export class Comment {
  constructor(comment = null, createdAt = null, postId = null) {
    this.comment = comment;
    this.createdAt = createdAt;
    this.postId = postId;
  }
}
