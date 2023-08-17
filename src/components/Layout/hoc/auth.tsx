const withAuthLayout = (Component: any, mode: "register" | "login") => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    return (
      <div className="max-w-3xl py-6 mx-auto">
        <h1 className="text-4xl font-bold text-center">
          {mode === "login" ? "Login" : "Register"}
        </h1>

        <div className="p-10 m-6 border rounded">
          <Component {...props} />
        </div>
      </div>
    );
  };
};

export default withAuthLayout;
