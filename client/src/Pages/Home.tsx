import { useState } from "react";
import { sidenav } from "../utils/home.util";
import * as styled from "../Layout/Home";

export default function Home() {
  const [current, setCurrent] = useState("1");
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
    return (
      <>
        <styled.Content className="mode-default">
          <styled.Layout className="site-layout-background">
            <styled.Sider>
              <styled.Menu
                mode="inline"
                items={sidenav}
                onClick={handleClick}
                selectedKeys={[current]}
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
  }
}
