import { ReactNode } from "react"


interface MainContainerProps {
    children: ReactNode
}

const MainContainer = ({ children }: MainContainerProps) => {
    return (
        <div className="md:p-10 px-1 max-w-360 mx-auto relative">
            {children}
        </div>
    )
}

export default MainContainer