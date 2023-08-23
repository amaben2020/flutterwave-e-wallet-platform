interface TUserInfo {
  name: string;
  imageUrl?: string;
}

const UserInfo = ({ name, imageUrl }: TUserInfo) => {
  return (
    <div className="flex items-center border-gray-400 p-5">
      <p className="mr-2 text-white">Welcome {name}</p>

      <img
        src={imageUrl ?? "https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
        className="w-20 rounded-full"
        alt="Avatar"
      />
    </div>
  );
};

export default UserInfo;
