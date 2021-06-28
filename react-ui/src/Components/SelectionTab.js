import styled from "styled-components";

const Link = styled.a`
  padding: 0.5rem 0.5rem;
`;

export const SelectionTab = ({ selectedTab, setSelectedTab, name, text }) => {
  const selectedClass = selectedTab === name ? "active" : "";

  return (
    <li className="nav-item">
      <Link
        className={"nav-link " + selectedClass}
        onClick={() => setSelectedTab(name)}
      >
        {text}
      </Link>
    </li>
  );
};
