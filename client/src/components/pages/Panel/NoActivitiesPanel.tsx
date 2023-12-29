import building from "../../../assets/building.svg";

const NoActivitiesPanel = () => {
    return (
        <>
            <div className={"flex flex-col h-full w-full items-center justify-between py-10 px-12 text-center"}>
                <h1 className={"uppercase text-3xl text-blue-600"}>Building features...</h1>
                <img src={building} alt={"Building Icon"} className={"w-full h-full"}/>
                <h2 className={"text-xl text-blue-600"}>Use Chat for your current activities :)</h2>
            </div>
        </>
    );
}

export default NoActivitiesPanel;