import { NavigationMenu } from "@/widgets/NavigationMenu/NavigationMenu";
import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
    return (
        <>
            <div className="flex flex-col h-screen">
                <main className="flex-grow overflow-y-auto pb-16">{children}</main>
                <NavigationMenu />
            </div>
        </>
    )
}