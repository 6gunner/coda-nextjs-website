// `app/page.tsx` is the UI for the `/` URL
import { Button, ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";

export default function Page() {
  return (
    <ConfigProvider theme={theme}>
      <div className="App">
        <h1>Hello, Home page!</h1>;<Button type="primary">Button</Button>
      </div>
    </ConfigProvider>
  );
}
