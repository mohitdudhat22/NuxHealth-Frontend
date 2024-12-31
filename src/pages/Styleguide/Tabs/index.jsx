import { NHTabs } from "@/components";
import Icons from "@/constants/Icons";

export const Tabs = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
      icon: Icons.AllDepartments,
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
      icon: Icons.AllDepartments,
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
      icon: Icons.AllDepartments,
    },
  ];
  return (
    <div>
      <NHTabs defaultActiveKey="2" onChange={onChange} items={items} />
    </div>
  );
};
