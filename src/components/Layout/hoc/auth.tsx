const withAuthLayout = (Component: any, mode: "register" | "login") => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    return (
      <div className="py-6 mx-auto max-w-3xl">
        <h1 className="text-center text-4xl font-bold">
          {" "}
          {mode === "login" ? "Login" : "Register"}{" "}
        </h1>

        <div className="border m-6 p-10 rounded">
          <Component {...props} />
        </div>
      </div>
    );
  };
};

export default withAuthLayout;
