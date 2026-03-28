class UserResponseDto {
    public user_id: string;
    public phone: string;
    public name: string;

    constructor(model: any) {
        this.user_id = model._id.toString();
        this.phone = model.phone;
        this.name = model.nickname;
    }
}

export default UserResponseDto;
