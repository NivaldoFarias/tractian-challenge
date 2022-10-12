import { useState } from "react";
import { sidenav } from "../utils/home.util";
import * as styled from "../Layout/Home";
import Authentication from "../components/Authentication";

export default function Home() {
  const [content, setContent] = useState<string | JSX.Element>("To Be Implemented");
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
    return (
      <>
        <styled.Content className="mode-default">
          <styled.Layout className="site-layout-background">
            <styled.Sider>
              <styled.Menu
                mode="inline"
                multiple={true}
                items={sidenav}
                defaultOpenKeys={["authentication", "users", "assets", "units", "companies"]}
                onClick={handleClick}
                onSelect={handleSelect}
                selectedKeys={[current]}
              />
            </styled.Sider>
            <styled.Content className="mode-forms">{content}</styled.Content>
          </styled.Layout>
          <styled.Content></styled.Content>
        </styled.Content>
      </>
    );

    function handleClick(e: any) {
      setCurrent(e.key);
    }

    function handleSelect(info: any) {
      console.log("select", info);

      switch (info.key) {
        case "sign-in":
          return setContent(<Authentication />);
        case "sign-out":
          return setContent("To Be Implemented");
        default:
          return setContent("To Be Implemented");
      }
    }
  }
}
