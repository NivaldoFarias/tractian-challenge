import styled from "styled-components";
import { Layout as AntLayout, Menu as AntMenu, Breadcrumb as AntBreadcrumb } from "antd";

const { Header: AntHeader, Content: AntContent, Footer: AntFooter, Sider: AntSider } = AntLayout;
const { Item: AntItem } = AntBreadcrumb;

export const Layout = styled(AntLayout as any)`
  position: relative;
  left: 0;
  right: 0;

  margin: 20px auto 0;
  height: 100%;
  width: calc(100% - 80px);

  outline: 1px solid ${({ theme }) => theme.colors.altTertiary};
  border-radius: 10px;

  .site-layout-background {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    outline: 2px solid ${({ theme }) => theme.colors.altTertiary};
  }
`;

export const Header = styled(AntHeader as any)`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const Content = styled(AntContent as any)`
  &.mode-default {
    padding: 0;
  }
  &.mode-display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 3rem;

    padding: 0 12px;
    min-height: 780px;
    height: 100%;
    width: 100%;
  }
`;

export const Sider = styled(AntSider as any)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding-top: 30px;
  min-height: 280px;
  min-width: 280px !important;
  height: 100%;
  width: 100% !important;

  background: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.styles.borderRadius};
`;

export const Footer = styled(AntFooter as any)`
  text-align: center;
  font-family: "Kumbh Sans", sans-serif;

  sub {
    color: ${({ theme }) => theme.colors.altTertiary};
    font-size: 1rem;
  }
`;

export const Menu = styled(AntMenu as any)`
  display: flex;
  flex-direction: ${(props) => (props.mode === "horizontal" ? "row" : "column")};
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;

  min-height: 780px;
  min-width: 300px;
  height: 100%;
  width: 100%;

  div.ant-menu-submenu-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;

    font-size: 1.5rem;
    width: 100%;

    > svg {
      font-size: 1.7rem;
    }
  }

  > li:nth-child(1) > div > svg {
    font-size: 1.8rem;
  }

  > li:nth-child(3) > div > svg {
    font-size: 1.8rem;
  }
`;

export const Breadcrumb = styled(AntBreadcrumb as any)`
  margin: 16px 0;
  width: 100%;

  > &:first-child {
    display: flex;
    flex-direction: row;
  }
`;

export const Item = styled(AntItem as any)`
  color: ${({ theme }) => theme.colors.altTertiary};
`;
