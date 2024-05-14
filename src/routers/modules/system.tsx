import {
    // BgColorsOutlined,
    // FileDoneOutlined,
    // DesktopOutlined, 
    // FontSizeOutlined,
    FundOutlined,
    // FundViewOutlined, GoldOutlined,
    // HddOutlined,
    // HighlightOutlined,
    // InfoCircleOutlined,
    SettingOutlined,
    // UnorderedListOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";
// import lazyLoad from "../lazyLoad";
// import React, {lazy} from "react";
import {MenuRouteObject} from "../router";
import OrderInfo from "../../pages/OrderInfo";
import UserInfo from "../../pages/UserInfo";
// import Error403 from "../../pages/Error403";
// import Error404 from "../../pages/Error404";
// import ResultSuccess from "../../pages/ResultSuccess";
// import ResultFail from "../../pages/ResultFail";

const system: MenuRouteObject = {
    path: "system",
    label: "系统管理",
    icon: <SettingOutlined/>,
    children: [
        // {
        //     path: "params",
        //     label: "系统参数",
        //     icon: <UnorderedListOutlined/>,
        //     element: lazyLoad(lazy(() => import("../../pages/Page3")))
        // },
        // {
        //     path: "dict",
        //     label: "数据字典",
        //     icon: <FontSizeOutlined/>,
        //     element: <Page3/>
        // },
        // {
        //     path: "log",
        //     label: "日志管理",
        //     icon: <InfoCircleOutlined/>,
        //     children: [
        //         {
        //             path: "action",
        //             label: "操作日志",
        //             icon: <HighlightOutlined/>,
        //             element: <Page3/>
        //         },
        //         {
        //             path: "login",
        //             label: "登录日志",
        //             icon: <DesktopOutlined/>,
        //             element: <Page3/>
        //         },
        //     ] as MenuRouteObject[]
        // },
        {
            label: "通道账号",
            path: "manager",
            icon: <FundOutlined/>,
            children: [
                {
                    path: "users",
                    label: "账号信息",
                    icon: <UserSwitchOutlined/>,
                    element: <UserInfo/>
                },
            ] as MenuRouteObject[]
        },
        {
            label: "订单管理",
            path: "order",
            icon: <FundOutlined/>,
            element: <OrderInfo/>
        }
        // {
        //     label: "开发示例",
        //     path: "dev",
        //     icon: <BgColorsOutlined/>,
        //     children: [
        //         {
        //             path: "success",
        //             label: "操作成功",
        //             icon: <FileDoneOutlined/>,
        //             element: <ResultSuccess/>
        //         },
        //         {
        //             path: "fail",
        //             label: "操作失败",
        //             icon: <FileDoneOutlined/>,
        //             element: <ResultFail/>
        //         },
        //         {
        //             path: "403",
        //             label: "403 页面",
        //             icon: <FileDoneOutlined/>,
        //             element: <Error403/>
        //         },
        //         {
        //             path: "404",
        //             label: "404 页面",
        //             icon: <FileDoneOutlined/>,
        //             element: <Error404/>
        //         },

        //     ] as MenuRouteObject[]
        // }
    ] as MenuRouteObject[]
}
export default system