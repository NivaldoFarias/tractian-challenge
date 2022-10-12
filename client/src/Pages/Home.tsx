import { useState } from "react";
import { sidenav } from "../utils/home.util";
import * as styled from "../Layout/Home";

export default function Home() {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [current, setCurrent] = useState([]);
  const layout = buildLayout();

  return (
    <>
      <styled.Layout>{layout}</styled.Layout>
      <styled.Footer>
        TRACTIAN Challenge POC <sub>@Nivaldo Farias</sub>
      </styled.Footer>
    </>
  );

  function buildLayout() {
    console.log(openKeys);

    return (
      <>
        <styled.Content className="mode-default">
          <styled.Layout className="site-layout-background">
            <styled.Sider>
              <styled.Menu
                mode="inline"
                multiple={true}
                items={sidenav}
                defaultOpenKeys={["sidenav1", "sidenav2", "sidenav3", "sidenav4", "sidenav5"]}
                onClick={handleClick}
                onSelect={handleSelect}
                selectedKeys={[current]}
                onOpenChange={handleOpenChange}
              />
            </styled.Sider>
            <styled.Content className="mode-display">To Be Implemented</styled.Content>
          </styled.Layout>
          <styled.Content></styled.Content>
        </styled.Content>
      </>
    );

    function handleClick(e: any) {
      setCurrent(e.key);
    }

    function handleOpenChange(openKeys: any) {
      setOpenKeys(openKeys);
    }

    function handleSelect(info: any) {
      console.log(info);
    }
  }
}
