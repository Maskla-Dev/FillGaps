import Loader from "../atoms/Loader.tsx";

const LoadingApp = () => {
    return (
        <div className={"w-full h-full flex flex-col items-center justify-center"}>
            <h1>Loading...</h1>
            <Loader/>
        </div>
    )
}

export default LoadingApp;