"use strict";
const MenuOption = (props) => {
    const { toggled } = React.useContext(AppContext);
    const className = `menu-${props.type}-option`, delay = toggled ? 200 : 0;
    const styles = {
        transitionDelay: `${delay + (50 * props.index)}ms`
    };
    return (React.createElement("button", { type: "button", className: className, disabled: !toggled, style: styles },
        React.createElement("i", { className: props.icon }),
        React.createElement("h3", { className: props.type === "quick" ? "tooltip" : "label" }, props.label)));
};
const Menu = () => {
    const { toggled } = React.useContext(AppContext);
    const profileImage = "./img/bg.jpg";
    const getOptions = (options, type) => {
        return options.map((option, index) => (React.createElement(MenuOption, { key: option.label, icon: option.icon, index: index, label: option.label, type: type })));
    };
    const getQuickOptions = () => {
        return getOptions([{
                icon: "fa-solid fa-bell", label: "通知"
            }, {
                icon: "fa-solid fa-gear", label: "设置"
            }, {
                icon: "fa-solid fa-moon", label: "主题"
            }], "quick");
    };
    const getFullOptions = () => {
        return getOptions([{
                icon: "fa-solid fa-house", label: "首页"
            }, {
                icon: "fa-solid fa-user", label: "我的"
            }, {
                icon: "fa-solid fa-chart-line", label: "走势"
            }, {
                icon: "fa-solid fa-heart", label: "订阅"
            }, {
                icon: "fa-solid fa-wallet", label: "钱包", onclick : "window.location.href='https://www.iarc.top/'"
            }], "full");
    };
    return (React.createElement("div", { id: "menu", className: classNames({ toggled }) },
        React.createElement("div", { id: "menu-background-wrapper" },
            React.createElement("div", { id: "menu-background" })),
        React.createElement("img", { id: "menu-profile-image", src: profileImage }),
        React.createElement("div", { id: "menu-quick-options" }, getQuickOptions()),
        React.createElement("div", { id: "menu-full-options" }, getFullOptions())));
};
const AppContext = React.createContext(null);
const App = () => {
    const [toggled, setToggledTo] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => setToggledTo(true), 1000);
    }, []);
    const handleOnClick = () => setToggledTo(!toggled);
    return (React.createElement(AppContext.Provider, { value: { toggled } },
        React.createElement("div", { id: "app" },
            React.createElement(Menu, null),
            React.createElement("button", { id: "menu-toggle", type: "button", onClick: handleOnClick },
                React.createElement("i", { className: toggled ? "fa-solid fa-xmark-large" : "fa-solid fa-bars-staggered" })),
            React.createElement("a", { id: "jsdaima-link", href: "https://www.iarc.top", target: "_blank" },
                React.createElement("i", { className: "fa-solid fa-home" }),
                React.createElement("span", null, " 网站首页")))));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));