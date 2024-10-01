const AdminProfile = () => {
  const userdata =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData") || "null");
  const { name, email, city } = userdata;
  return (
    <div>
      <h1>Admin Profile:</h1>
      <div>
        <p>{name}</p>
        <p>{email}</p>
        <p>{city}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
