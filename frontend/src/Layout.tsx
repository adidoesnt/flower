import { useTheme } from "./hooks/useTheme";

function Layout({ children }: { children?: React.ReactNode }) {
    const { theme } = useTheme();

    const className =
        theme === "dark"
            ? "flex w-[100dvw] h-[100dvh] flex-col bg-bg-700 text-primary-000"
            : "flex w-[100dvw] h-[100dvh] flex-col bg-bg-000 text-primary-900";

    return <div className={className}>
        {children}
    </div>;
}

export default Layout;
