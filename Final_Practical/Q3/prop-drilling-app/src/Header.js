import Icon from "./Icon";

function Header({ username }) {
  return (
    <div>
      <h2>Header Section</h2>
      <Icon username={username} />
    </div>
  );
}

export default Header;
