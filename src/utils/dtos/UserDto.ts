class UserDto {
  public user_id: string;
  public name: string;
  public email: string;

  constructor(model: any) {
    // Mongoose stores the primary key as `_id`
    this.user_id = (model?._id ?? model?.id ?? model?.user_id)?.toString();
    this.name = model.name;
    this.email = model.email;
  }
}

export default UserDto;
