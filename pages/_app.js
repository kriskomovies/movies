import Layout from "@/components/layout/Layout";
import { Provider } from "react-redux";
import store from "../stores/store";
import WrapperComponent from "@/components/wrapperComponent/WrapperComponent";
import "./globals.css";

export const runtime = 'experimental-edge'
export default function App({Component, pageProps}) {
    return (
        <Layout>
            <Provider store={store}>
                <WrapperComponent Component={Component} pageProps={pageProps}/>
            </Provider>
        </Layout>
    )
}