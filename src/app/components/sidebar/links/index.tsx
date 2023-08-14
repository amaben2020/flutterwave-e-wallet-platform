const LinkIcon = ({ categoryName, title, children }: any) => {
  return (
    <>
      <h3 className="text-white ">{categoryName}</h3>

      <div className="flex gap-5">
        <div>{children}</div>
        <p className="text-white">{title}</p>
      </div>
    </>
  );
};

export default LinkIcon;
