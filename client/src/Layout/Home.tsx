import styled from "styled-components";
import { Layout as AntLayout, Menu as AntMenu, Breadcrumb as AntBreadcrumb } from "antd";

const { Header: AntHeader, Content: AntContent, Footer: AntFooter, Sider: AntSider } = AntLayout;

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
  &.mode-forms {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 6rem;

    padding: 0 12px;
    min-height: 820px;
    height: 100%;
    width: 100%;
  }

  #vertical-forms {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;

    min-height: 300px;
    height: 100%;

    .ant-input-affix-wrapper {
      position: relative;

      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      gap: 10px;

      min-width: 100px;
      width: 100%;

      font-size: 1.4rem;
      font-family: "Kumbh Sans", sans-serif !important;

      svg {
        font-size: 2.4rem;
      }

      input {
        display: block;
        padding: 10px 10px 6px 5px;
        width: 285px;

        color: rgb(253, 235, 220);
        font-size: 1.2rem;
        text-overflow: ellipsis;
        text-shadow: $font-shadow;

        border: none;
        background-color: transparent;
        border-bottom: 1px solid ${({ theme }) => theme.colors.altTertiary};

        &::placeholder {
          color: ${({ theme }) => theme.colors.text};
        }

        &:disabled {
          border-left: 2px solid ${({ theme }) => theme.colors.lowContrastSecondary};
        }
        &:hover {
          cursor: text;
        }
        &--active {
          outline: none;

          /* active state */
          ~ .bar:before,
          ~ .bar:after {
            width: 50%;
          }
          ~ .highlight {
            animation: input-highlighter 0.3s ease;
          }
        }
        /* active state */
        &--active ~ .label-text,
        &:valid ~ .label-text,
        &:autofill ~ .label-text,
        &:-webkit-autofill ~ .label-text {
          top: -18px;
          color: $tertiary;
        }
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active,
        &:-webkit-autofill:first-line {
          transition: background-color 50000s ease-in-out 0s;
          -webkit-text-fill-color: rgb(253, 235, 220) !important;
        }
        #placeholder {
          transition: background-color 50000s ease-in-out 0s;
          -webkit-text-fill-color: rgb(253, 235, 220) !important;
        }
      }
      .label-text {
        position: absolute;
        top: 10px;
        left: 10px;

        color: rgb(253, 235, 220);
        font-weight: 400;
        text-shadow: $font-shadow;

        pointer-events: none;
        transition: 0.2s ease all;

        span {
          font-weight: bold;
        }
      }
      .bar {
        position: relative;
        display: block;
        width: 285px;
        border-top: 1px solid rgb(253, 235, 220);

        &:before,
        &:after {
          position: absolute;
          bottom: 1px;

          height: 2px;
          width: 0;

          content: "";
          background: rgb(250, 126, 97);
        }
        &:before {
          left: 50%;
        }
        &:after {
          right: 50%;
        }
      }
      .highlight {
        position: absolute;
        top: 25%;
        left: 0;

        height: 60%;
        width: 100px;

        opacity: 0.5;
        pointer-events: none;
      }
      @keyframes input-highlighter {
        from {
          background: $tertiary;
        }
        to {
          width: 0;
          background: transparent;
        }
      }
    }
    div.ant-form-item-explain-error {
      margin: 10px 0 20px;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.lowContrastSecondary};
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 10px 30px;
      min-height: 30px;
      min-width: 100px;

      height: 100%;
      width: 100%;

      font-size: 1.1rem;
      font-weight: 600;
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.barPrimary};

      border: none;
      border-radius: 5px;
      outline: none;
      appearance: none;

      span {
        letter-spacing: 2px;
      }
      &:disabled {
        background-color: ${({ theme }) => theme.colors.altSecondary};
      }
    }
  }
  #route {
    margin-top: 30px;
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.lowContrastSecondary};
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
  gap: 20px;

  min-height: 820px;
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

  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    padding: 10px 15px 0;
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

export const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  height: min-content;
  width: 100%;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;

  width: 100%;
`;
